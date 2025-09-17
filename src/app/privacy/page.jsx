// app/privacy/page.jsx
export const metadata = {
  title: "Privacy Policy — NexEvent",
  description: "Read about how NexEvent handles and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen bg-gray-50 dark:bg-slate-900 
                 text-slate-800 dark:text-slate-100 
                 transition-all duration-500 px-6 py-12"
    >
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-3xl font-semibold text-indigo-700 dark:text-indigo-300"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Privacy Policy
        </h1>
        <p
          className="mt-4 text-slate-600 dark:text-slate-300"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          This is a placeholder for your Privacy Policy. Add your actual policy
          content here (data collection, cookies, third-party services, etc.).
        </p>
      </div>
    </main>
  );
}
