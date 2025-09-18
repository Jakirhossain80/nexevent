// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise, getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

// ✅ Use the adapter for users/accounts (Google linking, etc.)
// ✅ Use JWT sessions for reliability in serverless (no DB lookups per request)
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login", // your custom login page
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

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

          // Find a credentials user. (Google users typically have no passwordHash)
          const user = await users.findOne({ email });
          if (!user) return null;

          const storedHash = user.passwordHash || user.password; // support legacy 'password'
          if (!storedHash) {
            // likely a Google-only account
            return null;
          }

          const ok = await bcrypt.compare(password, storedHash);
          if (!ok) return null;

          // Minimal safe object; NEVER include password fields
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
    // Called when a JWT is created/updated
    async jwt({ token, user, account }) {
      // On first sign in, attach user fields to the token
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

    // Make session.user contain our minimal profile (from token)
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
    // When a user is created via OAuth, tag their provider as 'google'
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
