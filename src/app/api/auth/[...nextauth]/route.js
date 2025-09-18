// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise, getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";


// Ensure Node runtime (Mongoose/native driver & NextAuth need Node, not Edge)
export const runtime = "nodejs";


export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  // ✅ Middleware-compatible session strategy
  session: { strategy: "jwt" },

  // ✅ Custom sign-in page
  pages: { signIn: "/login" },
  trustHost: true, 
  debug: process.env.NODE_ENV === "development",

  // ✅ Required secret
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // --- Google OAuth ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    // --- Email + Password (Credentials) ---
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email?.toLowerCase().trim();
          const password = credentials?.password ?? "";
          if (!email || !password) return null;

          const db = await getDb();
          const users = db.collection("users");

          // Find the user by email
          const user = await users.findOne({ email });
          if (!user) return null;

          // Prefer passwordHash (MVP schema), fallback to legacy `password`
          const storedHash = user.passwordHash || user.password;
          if (!storedHash) {
            // Likely an OAuth-only account (no password set)
            return null;
          }

          const ok = await bcrypt.compare(password, storedHash);
          if (!ok) return null;

          // Return a safe, minimal user object (never include password fields)
          return {
            id: String(user._id),
            name: user.name || email,
            email: user.email || email,
            image: user.image || null,
            role: user.role || "user",
            provider: user.provider || "credentials",
          };
        } catch (err) {
          console.error("[AUTH] Credentials authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    /**
     * Put user/account info onto the token when a session is created/updated.
     * Runs on sign-in and subsequent token refreshes.
     */
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || token.name;
        token.email = user.email || token.email;
        token.picture = user.image || token.picture || null;
        token.role = user.role || "user";
        token.provider = user.provider || account?.provider || token.provider || null;
      }
      return token;
    },

    /**
     * Expose only the necessary fields on the session object.
     * This is what you read via useSession()/getServerSession().
     */
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.id;
        session.user.name = token.name || session.user.name || "";
        session.user.email = token.email || session.user.email || "";
        session.user.image = token.picture || session.user.image || null;
        session.user.role = token.role || "user";
        session.user.provider = token.provider || null;
      }
      return session;
    },
  },

  events: {
    /**
     * When an OAuth user is created (e.g., Google sign-in), tag provider in the users collection.
     */
    async createUser({ user }) {
      try {
        const db = await getDb();
        const _id = user?.id ? new ObjectId(user.id) : null;
        if (_id) {
          await db
            .collection("users")
            .updateOne({ _id }, { $set: { provider: "google" } }, { upsert: false });
        }
      } catch (err) {
        console.error("[AUTH] createUser event error:", err);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
