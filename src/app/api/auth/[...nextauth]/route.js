import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise, getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "database" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email?.toLowerCase().trim();
          const password = credentials?.password ?? "";
          if (!email || !password) {
            console.error("[AUTH] Missing email or password in authorize");
            return null;
          }

          const db = await getDb();
          const users = db.collection("users");
          const user = await users.findOne({ email });

          if (!user) {
            console.error(`[AUTH] No user found for email: ${email}`);
            return null;
          }

          const storedHash = user?.passwordHash || user?.password;
          if (!storedHash) {
            console.error(
              `[AUTH] User ${email} exists but has no password hash (Google-only account?)`
            );
            return null;
          }

          const ok = await bcrypt.compare(password, storedHash);
          if (!ok) {
            console.error(`[AUTH] Password mismatch for user ${email}`);
            return null;
          }

          console.log(`[AUTH] Login success for user: ${email}`);
          return {
            id: String(user._id),
            name: user.name ?? "",
            email: user.email ?? email,
            image: user.image ?? null,
            role: user.role ?? "user",
          };
        } catch (err) {
          console.error("[AUTH] Error in authorize:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session?.user && user) {
        session.user.id = String(user.id || user._id);
        session.user.role = user.role || "user";
        session.user.name = user.name ?? session.user.name ?? "";
        session.user.email = user.email ?? session.user.email ?? "";
        session.user.image = user.image ?? session.user.image ?? null;
      }
      return session;
    },
  },

  events: {
    async createUser({ user }) {
      console.log("[AUTH] User created:", user.email);
      try {
        const db = await getDb();
        const _id = user?.id ? new ObjectId(user.id) : null;
        if (_id) {
          await db.collection("users").updateOne(
            { _id },
            { $set: { provider: "google" } },
            { upsert: false }
          );
        }
      } catch (err) {
        console.error("[AUTH] Error tagging provider for user:", err);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
