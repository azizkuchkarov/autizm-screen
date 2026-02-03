"use client";

import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DonutRisk, RadarBlocks } from "@/components/Charts";
import { computeSummary } from "@/lib/scoring";

type AiOut = {
  summary: string;
  strengths: string[];
  challenges: string[];
  why_possible: string[];
  why_not_sure: string[];
  specialists: string[];
  urgency: string;
  next_steps: string[];
  disclaimer: string;
};

function toStringArray(x: unknown): string[] {
  if (Array.isArray(x)) return x.filter(Boolean).map(String);
  if (typeof x === "string") {
    return x.split(/\n|•|- /g).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function normalizeAi(data: any): AiOut {
  return {
    summary: typeof data?.summary === "string" ? data.summary : "AI javobi noto‘g‘ri formatda keldi.",
    strengths: toStringArray(data?.strengths),
    challenges: toStringArray(data?.challenges),
    why_possible: toStringArray(data?.why_possible),
    why_not_sure: toStringArray(data?.why_not_sure),
    specialists: toStringArray(data?.specialists),
    urgency: typeof data?.urgency === "string" ? data.urgency : "Mutaxassis bilan maslahat",
    next_steps: toStringArray(data?.next_steps),
    disclaimer:
      typeof data?.disclaimer === "string"
        ? data.disclaimer
        : "Eslatma: Ushbu skrining tashxis emas. Tashxis faqat mutaxassis tomonidan yuzma-yuz baholash orqali qo‘yiladi.",
  };
}

function profileLabel(p: "A" | "B" | "C") {
  if (p === "A") return "Normaga yaqin";
  if (p === "B") return "Rivojlanish farqlari";
  return "ASDga yaqin bo‘lishi mumkin";
}

function profileChipStyle(p: "A" | "B" | "C") {
  if (p === "A") return "bg-emerald-100 text-emerald-800 ring-emerald-200";
  if (p === "B") return "bg-amber-100 text-amber-800 ring-amber-200";
  return "bg-rose-100 text-rose-800 ring-rose-200";
}

export default function ResultClient() {
  const [loadingAi, setLoadingAi] = React.useState(false);
  const [ai, setAi] = React.useState<AiOut | null>(null);
  const [summary, setSummary] = React.useState<ReturnType<typeof computeSummary> | null>(null);

  React.useEffect(() => {
    const rawA = sessionStorage.getItem("asds_answers");
    const rawAge = sessionStorage.getItem("asds_age");
    if (!rawA || !rawAge) return;

    const answers = JSON.parse(rawA);
    const age = Number(rawAge);
    setSummary(computeSummary(age, answers));
  }, []);

  async function generatePdf() {
    const el = document.getElementById("report");
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    let remaining = imgHeight;

    while (remaining > 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      remaining -= pageHeight;
      position -= pageHeight;
      if (remaining > 0) pdf.addPage();
    }

    pdf.save("autism-screening-report.pdf");
  }

  async function fetchAi() {
    if (!summary) return;
    setLoadingAi(true);
    try {
      const res = await fetch("/api/ai-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summary),
      });
      const data = await res.json();
      setAi(normalizeAi(data));
    } finally {
      setLoadingAi(false);
    }
  }

  if (!summary) {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-sky-50 via-white to-emerald-50 p-6">
        <div className="mx-auto max-w-md rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5">
          <div className="text-sm text-slate-600">Natija topilmadi. Testdan o‘ting.</div>
        </div>
      </div>
    );
  }

  const chip = profileChipStyle(summary.profile);
  const radar = [
    { label: "Ijtimoiy", value: summary.blocks.social.score },
    { label: "Nutq", value: summary.blocks.speech.score },
    { label: "Takroriy", value: summary.blocks.repetitive.score },
    { label: "Sensor", value: summary.blocks.sensory.score },
    { label: "Emots.", value: summary.blocks.emotional.score },
  ];

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-50 via-white to-emerald-50 pb-16">
      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5" id="report">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">Skrining natijasi</h1>
              <p className="mt-1 text-sm text-slate-600">
                Yoshi: <span className="font-semibold">{summary.childAgeYears}</span> (band: {summary.ageBand})
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Eslatma: bu skrining — tashxis emas. Natija yo‘naltirish uchun.
              </p>
            </div>
            <div className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ring-1 ${chip}`}>
              {profileLabel(summary.profile)}
            </div>
          </div>

          <div className="mt-3 grid gap-4">
            <div className="rounded-3xl bg-white p-4 ring-1 ring-black/5">
              <DonutRisk value={summary.levelScore} />
              <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                <span>Profil darajasi</span>
                <span className="font-semibold">{summary.levelScore}%</span>
              </div>
              <div className="mt-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-700 ring-1 ring-black/5">
                <div className="font-bold text-slate-900">Tavsiya:</div>
                <div className="mt-1">{summary.urgency}</div>
                <div className="mt-2 font-semibold text-slate-900">Mutaxassislar:</div>
                <ul className="mt-1 list-disc pl-5">
                  {summary.suggestedSpecialists.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 ring-1 ring-black/5">
              <div className="text-sm font-extrabold text-slate-900">Rivojlanish profili</div>
              <p className="mt-1 text-xs text-slate-600">Yuqori qiymat — shu sohada yordam ehtiyoji ko‘proq bo‘lishi mumkin.</p>
              <RadarBlocks points={radar} />
            </div>

            <div className="rounded-3xl bg-white p-4 ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">AI xulosa</div>
                  <div className="text-xs text-slate-600">Profilga mos, qat’iy qoidalar asosida</div>
                </div>
                <button
                  onClick={fetchAi}
                  disabled={loadingAi}
                  className="rounded-2xl px-4 py-2 text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: "#FF6B6B" }}
                >
                  {loadingAi ? "Yuklanmoqda..." : ai ? "Qayta yaratish" : "AI xulosa"}
                </button>
              </div>

              {!ai ? (
                <p className="mt-3 text-sm text-slate-600">“AI xulosa” tugmasini bosing.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  <Section title="Umumiy xulosa" items={[ai.summary]} />
                  <Section title="Kuchli tomonlar" items={ai.strengths} />
                  <Section title="Qiyinchiliklar" items={ai.challenges} />
                  <Section title="Nega ASDga yaqin bo‘lishi mumkin?" items={ai.why_possible} />
                  <Section title="Nega ASD bo‘lmasligi ham mumkin?" items={ai.why_not_sure} />
                  <Section title="Mutaxassislar" items={ai.specialists} />
                  <Section title="Keyingi qadamlar" items={ai.next_steps} />
                  <p className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-600 ring-1 ring-black/5">
                    {ai.disclaimer}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={generatePdf}
              className="w-full rounded-3xl px-5 py-4 text-sm font-extrabold text-white shadow-sm"
              style={{ backgroundColor: "#38BDF8" }}
            >
              PDF yuklab olish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  const safeItems = Array.isArray(items) ? items : [];
  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
      <div className="text-xs font-extrabold text-slate-900">{title}</div>
      <ul className="mt-2 space-y-1 text-sm text-slate-700">
        {safeItems.map((t, i) => (
          <li key={i} className="leading-snug">{t}</li>
        ))}
      </ul>
    </div>
  );
}
