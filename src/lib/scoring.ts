// src/lib/scoring.ts
import { BlockId, QUESTIONS, ageToBand } from "./questions";

export type AnswerValue = 0 | 1 | 2;

export type AnswersMap = Record<string, AnswerValue>; // questionId -> 0/1/2

export type BlockScore = {
  score: number; // 0..20 (10 savol × 0..2)
  status: "Normal" | "Kuzatuv" | "Kuchli";
  topFlags: string[];
};

export type Summary = {
  childAgeYears: number;
  childAgeMonths: number;
  ageBand: "2-3" | "4-5" | "6-7";
  answeredCount: number;
  totalCount: number;
  answerCompletion: number; // %
  blocks: Record<BlockId, BlockScore>;
  overallScore: number; // 0..100 normalized
  overallRisk: "Past" | "O‘rtacha" | "Yuqori";
};

const BLOCK_WEIGHTS: Record<BlockId, number> = {
  social: 0.30,
  speech: 0.25,
  repetitive: 0.20,
  sensory: 0.15,
  emotional: 0.10,
};

function blockStatus(score0to20: number): BlockScore["status"] {
  if (score0to20 <= 6) return "Normal";
  if (score0to20 <= 12) return "Kuzatuv";
  return "Kuchli";
}

export function computeSummary(childAgeYears: number, answers: AnswersMap): Summary {
  const ageBand = ageToBand(childAgeYears);
  const totalCount = QUESTIONS.length;

  let answeredCount = 0;
  for (const q of QUESTIONS) {
    if (answers[q.id] !== undefined) answeredCount += 1;
  }
  const answerCompletion = Math.round((answeredCount / totalCount) * 100);

  // block aggregation
  const blocks: Summary["blocks"] = {
    social: { score: 0, status: "Normal", topFlags: [] },
    speech: { score: 0, status: "Normal", topFlags: [] },
    repetitive: { score: 0, status: "Normal", topFlags: [] },
    sensory: { score: 0, status: "Normal", topFlags: [] },
    emotional: { score: 0, status: "Normal", topFlags: [] },
  };

  // each block has exactly 10 questions in our bank
  for (const b of Object.keys(blocks) as BlockId[]) {
    const qs = QUESTIONS.filter((q) => q.block === b);
    let sum = 0;
    const flags: { text: string; value: number; isCore: boolean }[] = [];

    for (const q of qs) {
      const v = answers[q.id] ?? 0;
      sum += v;
      // top flags: yuqori ball + core flag + age band relevance
      const isCore = q.isCoreFlag === true && q.bands.includes(ageBand);
      if (v >= 1) {
        flags.push({ text: q.text, value: v, isCore });
      }
    }

    flags.sort((a, b) => (b.isCore ? 10 : 0) + b.value - ((a.isCore ? 10 : 0) + a.value));

    blocks[b] = {
      score: sum, // 0..20
      status: blockStatus(sum),
      topFlags: flags.slice(0, 3).map((f) => f.text),
    };
  }

  // weighted score (0..20 each), map to 0..100
  const weighted0to20 =
    blocks.social.score * BLOCK_WEIGHTS.social +
    blocks.speech.score * BLOCK_WEIGHTS.speech +
    blocks.repetitive.score * BLOCK_WEIGHTS.repetitive +
    blocks.sensory.score * BLOCK_WEIGHTS.sensory +
    blocks.emotional.score * BLOCK_WEIGHTS.emotional;

  const overallScore = Math.round((weighted0to20 / 20) * 100);

  let overallRisk: Summary["overallRisk"] = "Past";
  if (overallScore >= 65) overallRisk = "Yuqori";
  else if (overallScore >= 40) overallRisk = "O‘rtacha";

  // age months (approx)
  const childAgeMonths = Math.round(childAgeYears * 12);

  return {
    childAgeYears,
    childAgeMonths,
    ageBand,
    answeredCount,
    totalCount,
    answerCompletion,
    blocks,
    overallScore,
    overallRisk,
  };
}
