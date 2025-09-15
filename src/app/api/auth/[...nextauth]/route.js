import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise, getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";


export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "database",
  },

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
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";
        if (!email || !password) return null;

        const db = await getDb();
        const users = db.collection("users");
        const user = await users.findOne({ email });

        // Accept either canonical `passwordHash` or legacy `password`
        const storedHash = user?.passwordHash || user?.password;
        if (!user || !storedHash) return null;

        const ok = await bcrypt.compare(password, storedHash);
        if (!ok) return null;

        return {
          id: String(user._id),
          name: user.name ?? "",
          email: user.email ?? email,
          image: user.image ?? null,
          role: user.role ?? "user",
        };
      },
    }),
  ],

  callbacks: {
    // Enrich session with stable id/role using database session strategy
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
  }, // ← ✅ end callbacks (no stray bracket)

  events: {
    // Mark provider when a Google user is created
    async createUser({ user }) {
      try {
        const db = await getDb();
        const _id = user?.id ? new ObjectId(user.id) : null;
        if (_id) {
          await db.collection("users").updateOne(
            { _id },
            { $set: { provider: "google" } },
            { upsert: false }
          );
        } else if (user?.email) {
          await db.collection("users").updateOne(
            { email: user.email.toLowerCase() },
            { $set: { provider: "google" } }
          );
        }
      } catch {
        // non-fatal
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
