"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TestWizard from "@/components/TestWizard";

const LS_KEY = "asds_progress_v1";

export default function TestClient() {
  const router = useRouter();
  const [age, setAge] = React.useState<number>(4);
  const [mode, setMode] = React.useState<"choose" | "new" | "resume">("choose");
  const [hasResume, setHasResume] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    setHasResume(Boolean(saved));
    setMode(saved ? "choose" : "new");

    // session result har doim yangi bo‘lsin:
    sessionStorage.removeItem("asds_answers");
    sessionStorage.removeItem("asds_age");
  }, []);

  function start(answers: Record<string, 0 | 1 | 2>) {
    sessionStorage.setItem("asds_answers", JSON.stringify(answers));
    sessionStorage.setItem("asds_age", String(age));
    router.push("/result");
  }

  function startNew() {
    localStorage.removeItem(LS_KEY);
    setMode("new");
  }

  function resume() {
    setMode("resume");
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-50 via-white to-emerald-50">
      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
          <h1 className="text-xl font-bold text-slate-900">Autizm skrining testi (2–7 yosh)</h1>
          <p className="mt-2 text-sm text-slate-600">
            5 blok, 50 savol. Natija: grafik + AI izoh + PDF.
          </p>

          <label className="mt-4 block text-sm font-semibold text-slate-700">Bolaning yoshi (2–7)</label>
          <input
            type="number"
            min={2}
            max={7}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-200"
          />

          {mode === "choose" && hasResume && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5">
              <div className="text-sm font-semibold text-slate-900">Oldingi test topildi</div>
              <div className="mt-1 text-xs text-slate-600">Davom ettirasizmi yoki yangidan boshlaysizmi?</div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={resume}
                  className="w-1/2 rounded-2xl bg-sky-500 px-4 py-3 text-xs font-bold text-white"
                >
                  Davom ettirish
                </button>
                <button
                  onClick={startNew}
                  className="w-1/2 rounded-2xl bg-white px-4 py-3 text-xs font-bold text-slate-900 ring-1 ring-black/10"
                >
                  Yangidan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(mode === "new" || mode === "resume") && (
        <TestWizard childAgeYears={age} onComplete={start} allowResume={mode === "resume"} />
      )}
    </div>
  );
}
