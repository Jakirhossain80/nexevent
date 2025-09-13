// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "@/lib/mongodb";
import { connectMongoose } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise), // users/sessions/accounts in MongoDB
  session: {
    strategy: "database", // persist sessions in DB
    // maxAge: 30 * 24 * 60 * 60, // optional
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // redirect URIs are inferred from NEXTAUTH_URL
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      // Called on signIn('credentials', { email, password })
      authorize: async (credentials) => {
        await connectMongoose();
        const { email, password } = credentials || {};
        if (!email || !password) return null;

        const user = await User.findOne({ email }).lean();
        if (!user || !user.passwordHash) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        // Minimal user for NextAuth. Must include an "id" string.
        return {
          id: String(user._id),
          name: user.name || "",
          email: user.email || "",
          image: user.image || null,
        };
      },
    }),
  ],

  callbacks: {
    // Put minimal profile in the session
    async session({ session, user }) {
      // "user" here is adapter user when using database strategy
      if (session?.user && user) {
        session.user.id = String(user.id || user._id);
        session.user.name = user.name || session.user.name;
        session.user.image = user.image || session.user.image;
        session.user.email = user.email || session.user.email;
      }
      return session;
    },
    // For JWT strategy you'd also implement jwt() to include id.
  },

  events: {
    // When a user is created (e.g., first-time Google login)
    async createUser({ user }) {
      await connectMongoose();
      // Ensure provider field is set for Google signups
      await User.updateOne(
        { _id: user.id },
        {
          $setOnInsert: {
            name: user.name || "",
            email: user.email || null,
            image: user.image || null,
            provider: "google",
          },
        },
        { upsert: true }
      );
    },
  },

  // cookies: { } // (optional) custom cookie names; in prod ensure `__Secure-` on HTTPS
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
