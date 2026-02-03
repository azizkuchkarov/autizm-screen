"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TestWizard from "@/components/TestWizard";

export default function TestClient() {
  const router = useRouter();
  const [age, setAge] = React.useState<number>(4);

  function start(answers: Record<string, 0 | 1 | 2>) {
    // answers ni sessionStorage ga qo‘yamiz
    sessionStorage.setItem("asds_answers", JSON.stringify(answers));
    sessionStorage.setItem("asds_age", String(age));
    router.push("/result");
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-50 via-white to-emerald-50">
      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
          <h1 className="text-xl font-bold text-slate-900">Autizm skrining testi (2–7 yosh)</h1>
          <p className="mt-2 text-sm text-slate-600">
            5 blok, 50 savol. Javoblar asosida grafik natija va AI izoh beriladi.
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
        </div>
      </div>

      <TestWizard childAgeYears={age} onComplete={start} />
    </div>
  );
}
