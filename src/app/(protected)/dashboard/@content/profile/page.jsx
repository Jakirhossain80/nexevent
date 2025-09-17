import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard/profile");

  // Try to read freshest info from DB; fall back to session
  const db = await getDb();
  let dbUser = null;
  try {
    if (session.user?.id) {
      dbUser = await db
        .collection("users")
        .findOne(
          { _id: new ObjectId(session.user.id) },
          { projection: { password: 0, passwordHash: 0 } }
        );
    }
  } catch {
    // If ObjectId cast fails or DB not reachable, just ignore and use session values
  }

  const user = {
    name: dbUser?.name ?? session.user?.name ?? "",
    email: dbUser?.email ?? session.user?.email ?? "",
    image: dbUser?.image ?? session.user?.image ?? null,
    provider: dbUser?.provider ?? "credentials",
    createdAt: dbUser?.createdAt ? new Date(dbUser.createdAt) : null,
  };

  return (
    <section className="p-6 md:p-8">
      <h1
        className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Profile
      </h1>
      <p
        className="mt-2 text-slate-600 dark:text-slate-300"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Manage your account information.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
            <Image
              src={user.image || "/avatar-placeholder.png"}
              alt={user.name ? `${user.name} profile photo` : "User profile photo"}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
              {user.name || "User"}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
              {user.email}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-slate-500 dark:text-slate-400">Provider</dt>
            <dd className="mt-1 text-slate-900 dark:text-slate-100 capitalize">
              {user.provider}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500 dark:text-slate-400">Member since</dt>
            <dd className="mt-1 text-slate-900 dark:text-slate-100">
              {user.createdAt ? user.createdAt.toLocaleString() : "—"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}