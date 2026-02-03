"use client";

import React from "react";
import { QUESTIONS, BLOCKS } from "@/lib/questions";
import type { AnswersMap } from "@/lib/scoring";

type Props = {
  childAgeYears: number;
  onComplete: (answers: AnswersMap) => void;
  allowResume?: boolean;
};

const OPTIONS: { label: string; value: 0 | 1 | 2 }[] = [
  { label: "Yo‘q", value: 0 },
  { label: "Ba’zan", value: 1 },
  { label: "Ko‘pincha", value: 2 },
];

const LS_KEY = "asds_progress_v1";

export default function TestWizard({ childAgeYears, onComplete, allowResume = true }: Props) {
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<AnswersMap>({});

  // Resume load
  React.useEffect(() => {
    if (!allowResume) return;
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (typeof parsed?.idx === "number") setIdx(parsed.idx);
      if (parsed?.answers && typeof parsed.answers === "object") setAnswers(parsed.answers);
    } catch {}
  }, [allowResume]);

  // Save progress
  React.useEffect(() => {
    if (!allowResume) return;
    localStorage.setItem(LS_KEY, JSON.stringify({ idx, answers }));
  }, [idx, answers, allowResume]);

  const q = QUESTIONS[idx];
  const progress = Math.round(((idx + 1) / QUESTIONS.length) * 100);
  const blockMeta = BLOCKS.find((b) => b.id === q.block);

  function setAnswer(v: 0 | 1 | 2) {
    setAnswers((prev) => ({ ...prev, [q.id]: v }));
  }

  function next() {
    const current = answers[q.id] ?? 0;
    const merged = { ...answers, [q.id]: current };

    if (idx < QUESTIONS.length - 1) {
      setAnswers(merged);
      setIdx((x) => x + 1);
    } else {
      localStorage.removeItem(LS_KEY);
      onComplete(merged);
    }
  }

  function prev() {
    if (idx > 0) setIdx((x) => x - 1);
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-6">
      <div className="rounded-3xl bg-white/80 shadow-sm ring-1 ring-black/5">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Yosh: <span className="font-semibold">{childAgeYears}</span>
            </div>
            <div className="text-sm font-semibold text-sky-700">{progress}%</div>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-sky-400 transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              {blockMeta?.title}
            </div>

            <h1 className="mt-3 text-lg font-semibold leading-snug text-slate-900">{q.text}</h1>
            <p className="mt-2 text-sm text-slate-600">Javobni tanlang.</p>

            <div className="mt-4 grid gap-3">
              {OPTIONS.map((o) => {
                const active = answers[q.id] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setAnswer(o.value)}
                    className={[
                      "w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ring-1 ring-black/5",
                      active ? "bg-sky-500 text-white shadow-sm" : "bg-white hover:bg-slate-50 text-slate-900",
                    ].join(" ")}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={idx === 0}
              className="w-1/3 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-40"
            >
              Orqaga
            </button>

            <button
              type="button"
              onClick={next}
              className="w-2/3 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm"
              style={{ backgroundColor: "#FF6B6B" }}
            >
              {idx < QUESTIONS.length - 1 ? "Keyingi" : "Natijani ko‘rish"}
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Eslatma: Bu skrining. Tashxis faqat mutaxassis tomonidan qo‘yiladi.
          </p>
        </div>
      </div>
    </div>
  );
}
