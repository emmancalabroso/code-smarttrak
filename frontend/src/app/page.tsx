export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-[2rem] border border-white/60 bg-white/70 p-10 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
          SmartTrak
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-stone-900">
          Hello World
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
          This starter app uses Next.js with React and Tailwind on the frontend,
          with Django ready to serve backend APIs.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900">
            Next.js
          </span>
          <span className="rounded-full bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900">
            React
          </span>
          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900">
            Tailwind CSS
          </span>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900">
            Django API
          </span>
        </div>
      </section>
    </main>
  );
}
