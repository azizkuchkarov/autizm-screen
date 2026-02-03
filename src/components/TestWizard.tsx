"use client";

import React from "react";
import { QUESTIONS, BLOCKS, type BlockId } from "@/lib/questions";
import { computeSummary, type AnswersMap } from "@/lib/scoring";
import BlockIntroLoader from "@/components/BlockIntroLoader";
import { tBlock, type Lang } from "@/lib/i18n";
import Dino, { FloatingDino } from "@/components/Dino";

type Props = {
  childAgeYears: number;
  lang: Lang;
  onComplete: (answers: AnswersMap) => void;
};

export default function TestWizard({ childAgeYears, lang, onComplete }: Props) {
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<AnswersMap>({});

  /** ===== INTRO STATE ===== */
  const [showIntro, setShowIntro] = React.useState(false);
  const [introBlock, setIntroBlock] = React.useState<BlockId>("social");

  /**
   * 🔑 MUHIM:
   * StrictMode/dev’da effect cleanup timer’ni bekor qilib yuborishi mumkin.
   * Shuning uchun intro’ni yopish uchun "failsafe" timer ishlatamiz
   * va timer’larni cleanup’da clear qilmaymiz (qotib qolmasin).
   */
  const hasShownFirstIntroRef = React.useRef(false);
  const lastBlockRef = React.useRef<BlockId | null>(null);

  const q = QUESTIONS[idx];

  /** ===== BLOCK INTRO TRIGGER ===== */
  React.useEffect(() => {
    const currentBlock = q.block;

    // 1) birinchi kirishda 1 marta
    if (!hasShownFirstIntroRef.current) {
      hasShownFirstIntroRef.current = true;
      lastBlockRef.current = currentBlock;

      setIntroBlock(currentBlock);
      setShowIntro(true);

      // ✅ FAILSAFE: cleanup’da clear qilmaymiz
      window.setTimeout(() => setShowIntro(false), 2000);
      return;
    }

    // 2) keyingi bloklarga o‘tganda
    if (lastBlockRef.current !== currentBlock) {
      lastBlockRef.current = currentBlock;

      setIntroBlock(currentBlock);
      setShowIntro(true);

      // ✅ FAILSAFE
      window.setTimeout(() => setShowIntro(false), 2000);
      return;
    }
  }, [q.block]);

  /** ===== INTRO RENDER ===== */
  if (showIntro) {
    const meta = tBlock(lang, introBlock);
    return <BlockIntroLoader title={meta.title} desc={meta.desc} focus={meta.focus} />;
  }

  /** ===== PROGRESS ===== */
  const total = QUESTIONS.length;
  const progress = Math.round(((idx + 1) / total) * 100);
  const currentValue: 0 | 1 | 2 = (answers[q.id] ?? 0) as 0 | 1 | 2;

  /** ===== SUMMARY (SAFE) ===== */
  const summary = React.useMemo(() => {
    return computeSummary(childAgeYears, answers);
  }, [answers, childAgeYears]);

  const s: any = summary;
  const overallRisk = s?.overallRisk ?? s?.risk ?? "—";
  const overallScore = s?.overallScore ?? s?.score ?? 0;

  /** ===== HANDLERS ===== */
  function setAnswer(v: 0 | 1 | 2) {
    setAnswers((p) => ({ ...p, [q.id]: v }));
  }

  function prev() {
    if (idx > 0) setIdx((x) => x - 1);
  }

  function next() {
    // ✅ current savol javobi ham albatta kiradi
    const merged: AnswersMap = { ...answers, [q.id]: currentValue };
    if (idx < total - 1) setIdx((x) => x + 1);
    else onComplete(merged);
  }

  /** ===== LABELS ===== */
  const labels =
    lang === "ru"
      ? {
          yes: "Да / часто",
          sometimes: "Иногда",
          no: "Нет / редко",
          back: "Назад",
          next: "Далее",
          finish: "Завершить",
          q: "Вопрос",
          block: "Блок",
          score: "Общий риск",
          note: "Это скрининг, не диагноз.",
        }
      : {
          yes: "Ha / ko‘pincha",
          sometimes: "Ba’zan",
          no: "Yo‘q / kam",
          back: "Orqaga",
          next: "Keyingi",
          finish: "Yakunlash",
          q: "Savol",
          block: "Blok",
          score: "Umumiy risk",
          note: "Bu skrining, tashxis emas.",
        };

  const blockIndex = BLOCKS.findIndex((b) => b.id === q.block);
  const blockTitle = BLOCKS[blockIndex]?.title ?? "";

  return (
    <div className="min-h-dvh bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 pt-6 pb-10">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200/50">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Dino type="thinking" size="sm" />
              <div className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100">
                {labels.block}: {blockTitle}
              </div>
            </div>
            <div className="mt-1.5 text-xs font-semibold text-slate-600">
              {labels.q} {idx + 1} / {total}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FloatingDino type="happy" size="sm" />
            <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-white px-3 py-2 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100 shadow-sm">
              {progress}%
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 shadow-sm" style={{ width: `${progress}%` }} />
        </div>

        {/* QUESTION */}
        <div className="mt-4 rounded-xl bg-gradient-to-br from-white to-slate-50 p-5 ring-1 ring-slate-200/50 shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <Dino type="thinking" size="md" />
            <div className="text-base font-bold leading-relaxed text-slate-900 flex-1">{q.text}</div>
          </div>

          <div className="mt-5 grid gap-3">
            <Answer label={labels.yes} active={currentValue === 2} onClick={() => setAnswer(2)} />
            <Answer label={labels.sometimes} active={currentValue === 1} onClick={() => setAnswer(1)} />
            <Answer label={labels.no} active={currentValue === 0} onClick={() => setAnswer(0)} />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={idx === 0}
            className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-300 transition-all hover:bg-slate-50 hover:ring-slate-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {labels.back}
          </button>

          <button
            type="button"
            onClick={next}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg"
          >
            {idx === total - 1 ? labels.finish : labels.next}
          </button>
        </div>

        {/* PREVIEW */}
        <div className="mt-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white p-4 ring-1 ring-indigo-100 shadow-sm">
          <div className="flex items-center gap-2">
            <Dino type={progress > 75 ? "celebrating" : progress > 50 ? "excited" : "happy"} size="sm" />
            <div className="flex-1">
              <div className="text-xs font-bold text-indigo-900">{labels.score}</div>
              <div className="mt-1 text-base font-bold text-slate-900">{overallRisk}</div>
              <div className="text-xs text-slate-600">{overallScore} pts</div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">{labels.note}</p>
      </div>
    </div>
  );
}

function Answer({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-3.5 text-left text-sm font-semibold ring-1 transition-all ${
        active
          ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white ring-indigo-200 shadow-md shadow-indigo-500/20"
          : "bg-white text-slate-700 ring-slate-300 hover:bg-slate-50 hover:ring-slate-400"
      }`}
    >
      {label}
    </button>
  );
}
