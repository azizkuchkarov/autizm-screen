export default function Home() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-50 via-white to-emerald-50 p-6">
      <div className="mx-auto max-w-md rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-2xl font-extrabold text-slate-900">Autizm skrining</h1>
        <p className="mt-2 text-sm text-slate-600">
          2–7 yosh uchun mobile-first test. Natija: grafik + AI izoh + PDF.
        </p>
        <a
          href="/test"
          className="mt-5 inline-flex w-full items-center justify-center rounded-3xl px-5 py-4 text-sm font-extrabold text-white shadow-sm"
          style={{ backgroundColor: "#38BDF8" }}
        >
          Testni boshlash
        </a>
      </div>
    </div>
  );
}
