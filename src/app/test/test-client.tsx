"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TestWizard from "@/components/TestWizard";
import type { Lang } from "@/lib/i18n";
import type { AnswersMap } from "@/lib/scoring";
import Dino, { FloatingDino } from "@/components/Dino";

export default function TestClient() {
  const router = useRouter();

  const [lang, setLang] = React.useState<Lang>("uz");
  const [age, setAge] = React.useState<number>(4); // default
  const [started, setStarted] = React.useState(false);

  const [error, setError] = React.useState<string>("");

  // ✅ Har gal /test ga kirganda eski natijani tozalaymiz (statik natija bo‘lmasin)
  React.useEffect(() => {
    try {
      sessionStorage.removeItem("asds_answers");
      sessionStorage.removeItem("asds_age");
      sessionStorage.removeItem("asds_lang");
    } catch {}
  }, []);

  function validateAge(a: number) {
    if (Number.isNaN(a)) return false;
    if (a < 2 || a > 7) return false;
    return true;
  }

  function startTest() {
    if (!validateAge(age)) {
      setError(lang === "ru" ? "Возраст должен быть от 2 до 7 лет." : "Yosh 2 dan 7 gacha bo‘lishi kerak.");
      return;
    }
    setError("");
    setStarted(true);
  }

  function onComplete(answers: AnswersMap) {
    try {
      sessionStorage.setItem("asds_answers", JSON.stringify(answers));
      sessionStorage.setItem("asds_age", String(age));
      sessionStorage.setItem("asds_lang", lang);
    } catch {}

    router.push("/result");
  }

  if (started) {
    return <TestWizard childAgeYears={age} lang={lang} onComplete={onComplete} />;
  }

  const labels =
    lang === "ru"
      ? {
          title: "Скрининг 2–7 лет",
          subtitle:
            "Пожалуйста, выберите возраст ребёнка. Это не диагноз — результат поможет понять, на что обратить внимание.",
          ageLabel: "Возраст (лет)",
          start: "Начать тест",
          tipTitle: "Как отвечать?",
          tipText:
            "Оценивайте по поведению за последние 2–4 недели. Если сомневаетесь — выбирайте «Иногда».",
        }
      : {
          title: "2–7 yosh skrining",
          subtitle:
            "Iltimos, bola yoshini tanlang. Bu tashxis emas — natija sizga nimaga e’tibor berishni ko‘rsatadi.",
          ageLabel: "Yosh (yil)",
          start: "Testni boshlash",
          tipTitle: "Qanday javob berish?",
          tipText:
            "Oxirgi 2–4 hafta kuzatuvingiz bo‘yicha belgilang. Ikki o‘rtada bo‘lsa — «Ba’zan» ni tanlang.",
        };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 pt-10 pb-10">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100">
              {labels.title}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{labels.subtitle}</p>
          </div>
          <FloatingDino type="happy" size="md" />

          {/* Lang switch */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLang("uz")}
              className={`rounded-xl px-4 py-2 text-xs font-bold ring-1 transition-all ${
                lang === "uz" 
                  ? "bg-indigo-600 text-white ring-indigo-200 shadow-md" 
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              UZ
            </button>
            <button
              type="button"
              onClick={() => setLang("ru")}
              className={`rounded-xl px-4 py-2 text-xs font-bold ring-1 transition-all ${
                lang === "ru" 
                  ? "bg-indigo-600 text-white ring-indigo-200 shadow-md" 
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              RU
            </button>
          </div>
        </div>

        {/* Age input */}
        <div className="mt-5 rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 ring-1 ring-slate-200/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Dino type="thinking" size="sm" />
            <label className="text-xs font-bold text-slate-900">{labels.ageLabel}</label>
          </div>
          <input
            type="number"
            min={2}
            max={7}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-300 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          />
          {error ? <div className="mt-2 text-xs font-semibold text-red-600">{error}</div> : null}
        </div>

        {/* Tips */}
        <div className="mt-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white p-4 ring-1 ring-indigo-100 shadow-sm">
          <div className="flex items-center gap-2">
            <Dino type="excited" size="sm" />
            <div className="text-xs font-bold text-indigo-900">{labels.tipTitle}</div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{labels.tipText}</p>
        </div>

        {/* Start button */}
        <button
          type="button"
          onClick={startTest}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Dino type="excited" size="sm" />
          {labels.start}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          {lang === "ru"
            ? "Примечание: этот скрининг не заменяет консультацию специалиста."
            : "Eslatma: bu skrining mutaxassis konsultatsiyasini almashtirmaydi."}
        </p>
      </div>
    </div>
  );
}
