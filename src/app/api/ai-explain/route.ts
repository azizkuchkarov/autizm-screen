// src/app/api/ai-explain/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // jsPDF/html2canvas clientda, AI route nodejs bo‘lsin

type AiNormalized = {
  summary: string;
  strengths: string[];
  challenges: string[];
  why_possible: string[];
  why_not_sure: string[];
  next_steps: string[];
  disclaimer: string;
};

function toArr(x: any): string[] {
  if (Array.isArray(x)) return x.map(String).filter(Boolean);
  if (typeof x === "string") {
    return x
      .split(/\n|•|- /g)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function fallbackAi(message?: string): AiNormalized {
  return {
    summary:
      message ??
      "AI xulosasi hozircha tayyor bo‘lmadi. Skrining natijalarini saqlab qo‘ydik va keyinroq qayta urinib ko‘rishingiz mumkin.",
    strengths: [],
    challenges: [],
    why_possible: [],
    why_not_sure: [],
    next_steps: [
      "48 soat: 2–3 belgini kuzating va qayd qiling (qachon, qaysi vaziyatda).",
      "1–2 hafta: logoped/ABA mutaxassisi yoki nevrolog bilan maslahat oling.",
      "1–3 oy: uy mashqlari va rivojlantiruvchi rejani yo‘lga qo‘ying.",
    ],
    disclaimer: "Eslatma: Ushbu skrining tashxis emas. Tashxis faqat mutaxassis tomonidan qo‘yiladi.",
  };
}

function normalize(parsed: any): AiNormalized {
  const out: AiNormalized = {
    summary: typeof parsed?.summary === "string" ? parsed.summary : "AI xulosasi tayyor.",
    strengths: toArr(parsed?.strengths),
    challenges: toArr(parsed?.challenges),
    why_possible: toArr(parsed?.why_possible),
    why_not_sure: toArr(parsed?.why_not_sure),
    next_steps: toArr(parsed?.next_steps).slice(0, 3),
    disclaimer:
      typeof parsed?.disclaimer === "string"
        ? parsed.disclaimer
        : "Eslatma: Ushbu skrining tashxis emas. Tashxis faqat mutaxassis tomonidan qo‘yiladi.",
  };

  // next_steps bo‘sh bo‘lib qolsa, fallback beramiz
  if (!out.next_steps || out.next_steps.length === 0) {
    out.next_steps = fallbackAi().next_steps;
  }

  return out;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(fallbackAi("OPENAI_API_KEY topilmadi. .env.local ga kalitni qo‘ying."), { status: 200 });
    }

    const summary = await req.json();

    // SYSTEM prompt: qat’iy format va xavfsiz til
    const system = `
Sen 2–7 yoshdagi bola rivojlanishi bo‘yicha skrining natijasini ota-onaga tushuntiruvchi yordamchisan.

QOIDALAR:
- Tashxis qo‘ymagin (“ASD bor” deb aytma).
- Qo‘rqitmaydigan, yumshoq va ishonchli tilda yoz.
- 2–7 yoshni hisobga ol.
- Bloklar o‘rtasidagi bog‘liqlikni tushuntir.
- Har doim quyidagi JSON strukturani qaytar:

{
  "summary": "string",
  "strengths": ["string", "..."],
  "challenges": ["string", "..."],
  "why_possible": ["string", "..."],
  "why_not_sure": ["string", "..."],
  "next_steps": ["string", "string", "string"],
  "disclaimer": "string"
}

Talablar:
- summary: 2–4 gap.
- strengths: 2–4 punkt.
- challenges: 2–4 punkt.
- why_possible: 2–4 punkt.
- why_not_sure: 2–3 punkt.
- next_steps: aynan 3 punkt (48 soat / 1–2 hafta / 1–3 oy).
- disclaimer doim bo‘lsin: “Bu skrining tashxis emas…”
`.trim();

    const user = `Mana skrining summary (JSON): ${JSON.stringify(summary)}`;

    // Chat Completions orqali chaqiramiz (sening oldingi kodingga mos)
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.35,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        // JSON qaytarishga harakat qiladi (ba’zi hollarda model baribir buzishi mumkin, shuning uchun normalize bor)
        response_format: { type: "json_object" },
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json(
        fallbackAi(`AI xizmatida xatolik: ${resp.status}. Qayta urinib ko‘ring.`),
        { status: 200 }
      );
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      return NextResponse.json(fallbackAi("AI javobi bo‘sh keldi. Qayta urinib ko‘ring."), { status: 200 });
    }

    // AI JSON bo‘lib kelmasa ham, ushlab qolamiz
    try {
      const parsed = JSON.parse(content);
      return NextResponse.json(normalize(parsed), { status: 200 });
    } catch {
      // JSON parse bo‘lmadi -> fallback
      return NextResponse.json(
        fallbackAi("AI javobi JSON formatda kelmadi. “AI xulosa”ni qayta bosing."),
        { status: 200 }
      );
    }
  } catch (e: any) {
    return NextResponse.json(fallbackAi("Serverda kutilmagan xatolik bo‘ldi. Qayta urinib ko‘ring."), { status: 200 });
  }
}
