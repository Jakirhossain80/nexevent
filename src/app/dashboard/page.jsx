import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login"); // server redirect: no flicker

  return (
    <section>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p>Welcome, {session.user?.name || session.user?.email}</p>
    </section>
  );
}

