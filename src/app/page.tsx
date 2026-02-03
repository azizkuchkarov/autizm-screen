import Link from "next/link";
import HeroPreviewCharts from "@/components/HeroPreviewCharts";
import Dino, { FloatingDino, DinoGroup } from "@/components/Dino";

export default function Home() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <main className="mx-auto max-w-md px-4 pb-16 pt-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-indigo-100/50">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100">
                2–7 yosh • 5 blok • 50 savol
                <span className="ml-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-indigo-700 ring-1 ring-indigo-200">
                  Premium
                </span>
              </div>
              <FloatingDino type="waving" size="md" />
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900">
              Bola rivojlanishi bo‘yicha <span className="text-indigo-600">zamonaviy</span> skrining
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              Bu test <b>tashxis emas</b>. Maqsad — ota-onaga erta kuzatish asosida{" "}
              <b>tushunarli yo‘l xarita</b> berish: grafik profil, AI izoh ("Nega mumkin / mumkin emas")
              va PDF hisobot.
            </p>

            <div className="mt-6 grid gap-4">
              <Link
                href="/test"
                className="group inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Testni boshlash
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <div className="grid grid-cols-3 gap-3">
                <InfoChip title="Grafik" subtitle="profil" icon={<Dino type="thinking" size="sm" />} />
                <InfoChip title="UZ/RU" subtitle="til" icon={<Dino type="happy" size="sm" />} />
                <InfoChip title="PDF" subtitle="hisobot" icon={<Dino type="excited" size="sm" />} />
              </div>

              <TrustStrip />
            </div>
          </div>
        </section>

        {/* IMPORTANT TEXTS */}
        <section className="mt-4 grid gap-3">
          <Card title="Ota-onalar uchun muhim eslatma" icon={<Dino type="thinking" size="sm" />}>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Har bir bola individual. Ba’zi farqlar normal bo‘lishi mumkin.</li>
              <li>• Biz “xavf” emas, “kuzatish uchun belgilar”ni tartiblaymiz.</li>
              <li>• Natija “qo‘rqitish” uchun emas — <b>keyingi qadamni aniq qilish</b> uchun.</li>
            </ul>
          </Card>

          <Card title="Qizil flaglar (yumshoq tilda)" icon={<Dino type="excited" size="sm" />}>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Quyidagi belgilar uzoq vaqt davom etsa, bu skriningda yuqoriroq ball chiqishi mumkin:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>Ismiga javob bermaslik</Pill>
              <Pill>Ko‘z kontakt kamligi</Pill>
              <Pill>Imo-ishora kam</Pill>
              <Pill>Nutq juda kechikishi</Pill>
              <Pill>Rutina o‘zgarsa kuchli bezovtalik</Pill>
              <Pill>Takroriy harakatlar</Pill>
              <Pill>Sensor sezuvchanlik</Pill>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Eslatma: Bitta belgi bilan xulosa qilinmaydi. Biz belgilar “kombinatsiyasi”ni ko‘ramiz.
            </p>
          </Card>

          <Card title="Keyingi qadamlar (natijaga qarab)" icon={<Dino type="waving" size="sm" />}>
            <div className="mt-3 grid gap-2">
              <Step
                title="48 soat ichida"
                text="Natijani xotirjam ko‘rib chiqing, bolaning kundalik muloqotini kuzating (o‘yin, ko‘z kontakt, ko‘rsatma tushunish)."
              />
              <Step
                title="1–2 hafta"
                text="Agar belgilar ko‘p bo‘lsa, pediatr/psixolog yoki ABA terapevt bilan qisqa maslahat rejalashtiring."
              />
              <Step
                title="1–3 oy"
                text="Rivojlantiruvchi mashqlar (muloqot, o‘yin, sensor) bilan rejali ishlash. Takroriy skrining bilan dinamikani ko‘ring."
              />
            </div>
          </Card>
        </section>

        {/* PREVIEW */}
        <section className="mt-4">
          <HeroPreviewCharts />
        </section>

        {/* FAQ */}
        <section className="mt-4">
          <Card title="FAQ (tez-tez so'raladigan savollar)" icon={<Dino type="thinking" size="sm" />}>
            <FAQ />
          </Card>
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">
          Bu platforma skrining uchun. Tashxis faqat mutaxassis ko‘rigi asosida qo‘yiladi.
        </p>
      </main>
    </div>
  );
}

function InfoChip({ title, subtitle, icon }: { title: string; subtitle: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-slate-50 p-3 text-center ring-1 ring-slate-200/50 shadow-sm transition-all hover:shadow-md hover:ring-indigo-200">
      {icon && <div className="mb-1 flex justify-center">{icon}</div>}
      <div className="text-sm font-bold text-slate-900">{title}</div>
      <div className="text-xs font-medium text-slate-600">{subtitle}</div>
    </div>
  );
}

function Card({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200/50">
      <div className="flex items-center gap-2">
        {icon && icon}
        <div className="text-base font-bold text-slate-900">{title}</div>
      </div>
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200/50">
      {children}
    </span>
  );
}

function Step({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 ring-1 ring-slate-200/50 shadow-sm">
      <div className="text-xs font-bold text-indigo-700">{title}</div>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}

function TrustStrip() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-white p-4 ring-1 ring-indigo-100 shadow-sm">
      <div className="flex items-center gap-2">
        <Dino type="happy" size="sm" />
        <div className="text-xs font-bold text-indigo-900">Nega ishonchli?</div>
      </div>
      <ul className="mt-2.5 space-y-1.5 text-sm text-slate-700">
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
          <span>5 blok: ijtimoiy muloqot, nutq, takroriy xulq, sensor, emotsiya.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
          <span>Natija: grafik profil + AI izoh (yumshoq, qo‘rqitmaydi).</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
          <span>Tavsiya: keyingi qadamlar reja ko‘rinishida.</span>
        </li>
      </ul>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: "Bu tashxismi?",
      a: "Yo‘q. Bu skrining. Tashxis faqat mutaxassis ko‘rigi asosida qo‘yiladi.",
    },
    {
      q: "AI xulosa nimani beradi?",
      a: "AI natijani tushuntiradi: “Nega mumkin / mumkin emas” deb izohlaydi va yumshoq tavsiya beradi.",
    },
    {
      q: "Natija nega o‘zgarishi mumkin?",
      a: "Bola rivojlanadi, sharoit o‘zgaradi. 1–3 oyda qayta skrining dinamikani ko‘rsatadi.",
    },
    {
      q: "Qaysi holatda mutaxassisga murojaat qilamiz?",
      a: "Agar bir nechta belgilar muntazam davom etsa yoki kundalik hayotga ta’sir qilsa — maslahat foydali bo‘ladi.",
    },
  ];

  return (
    <div className="mt-3 space-y-2">
      {items.map((x) => (
        <details key={x.q} className="group rounded-xl bg-white p-4 ring-1 ring-slate-200/50 shadow-sm transition-all hover:shadow-md">
          <summary className="cursor-pointer text-sm font-bold text-slate-900 transition-colors hover:text-indigo-700">{x.q}</summary>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-700">{x.a}</p>
        </details>
      ))}
    </div>
  );
}
