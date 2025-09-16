export const dynamic = "force-dynamic";

export default function DashboardLayout({ children, sidebar, content, modal }) {
 
  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] grid grid-cols-12 gap-0">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-slate-200 dark:border-slate-800">
          {sidebar}
        </aside>
        <section className="col-span-12 md:col-span-9 lg:col-span-10">
          {content || children}
        </section>
      </div>

      {/* Render @modal slot so intercepting modal routes work within Dashboard */}
      {modal}
    </>
  );
}
