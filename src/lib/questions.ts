// src/lib/questions.ts
export type BlockId = "social" | "speech" | "repetitive" | "sensory" | "emotional";

export type AgeBand = "2-3" | "4-5" | "6-7";

export type Question = {
  id: string;
  block: BlockId;
  text: string;
  // Qaysi yosh oralig‘ida eng muhimligi (AI ham shundan foydalanadi)
  bands: AgeBand[];
  // “Red flag” bo‘lishi mumkin bo‘lgan savollarni belgilab qo‘yamiz
  isCoreFlag?: boolean;
};

export const BLOCKS: { id: BlockId; title: string; subtitle: string }[] = [
  { id: "social", title: "Ijtimoiy muloqot", subtitle: "Ko‘z kontakt, chaqiriqqa javob, bo‘lishish" },
  { id: "speech", title: "Nutq va muloqot", subtitle: "Nutq sifati, tushunish, imo-ishora" },
  { id: "repetitive", title: "Takroriy xatti-harakatlar", subtitle: "Rutina, takrorlash, qiziqishlar" },
  { id: "sensory", title: "Sensor sezuvchanlik", subtitle: "Tovush, kiyim, ovqat, yorug‘lik" },
  { id: "emotional", title: "Emotsional va xulq", subtitle: "Meltdown, moslashuv, o‘zini boshqarish" },
];

// 50 ta savol: 5 blok × 10
export const QUESTIONS: Question[] = [
  // ---------------- SOCIAL (10) ----------------
  { id: "S1", block: "social", text: "Bola ismiga chaqirilganda odatda javob beradi.", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "S2", block: "social", text: "Bola ko‘z bilan aloqani (ko‘zga qarashni) tabiiy qiladi.", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "S3", block: "social", text: "Bola qiziqqan narsasini sizga ko‘rsatadi (barmog‘i bilan ko‘rsatish yoki olib kelish).", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "S4", block: "social", text: "Bola “birga o‘ynash”ga harakat qiladi (o‘yinga sizni qo‘shadi).", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "S5", block: "social", text: "Bola tengdosh bolalarga qiziqadi (yoniga boradi, kuzatadi, o‘ynashga urinadi).", bands: ["4-5", "6-7"], isCoreFlag: true },
  { id: "S6", block: "social", text: "Bola his-tuyg‘uni bo‘lishadi (kulsa sizga qaraydi, hayron bo‘lsa sizni chaqiradi).", bands: ["2-3", "4-5", "6-7"] },
  { id: "S7", block: "social", text: "Bola yordam so‘ray oladi (imo, so‘z, yoki sizni yetaklab).", bands: ["2-3", "4-5", "6-7"] },
  { id: "S8", block: "social", text: "Bola o‘zini yomon his qilsa sizdan taskin izlaydi (yoningizga keladi).", bands: ["2-3", "4-5", "6-7"] },
  { id: "S9", block: "social", text: "Bola oddiy navbat kutish / navbatga moslashishni o‘rganib boryapti.", bands: ["4-5", "6-7"] },
  { id: "S10", block: "social", text: "Bola boshqa odamning yuz ifodasini sezadi (xursand/ranjiganini farqlaydi).", bands: ["4-5", "6-7"] },

  // ---------------- SPEECH (10) ----------------
  { id: "P1", block: "speech", text: "Bola siz aytgan oddiy ko‘rsatmalarni bajaradi (masalan: “kel”, “ol”, “ber”).", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "P2", block: "speech", text: "Bola o‘z ehtiyojini bildira oladi (so‘z/imo bilan: suv, ovqat, hojat, og‘riq).", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "P3", block: "speech", text: "Bola so‘zlarni ma’noli ishlatadi (faqat takrorlash emas).", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "P4", block: "speech", text: "Bola savolga mos javob berishga urinadi (hatto qisqa bo‘lsa ham).", bands: ["4-5", "6-7"], isCoreFlag: true },
  { id: "P5", block: "speech", text: "Bola imo-ishoradan foydalanadi (ko‘rsatish, bosh irg‘ash, “yo‘q” qilish).", bands: ["2-3", "4-5"], isCoreFlag: true },
  { id: "P6", block: "speech", text: "Bola so‘zlarni ko‘p takrorlaydi (echolalia) yoki gapni aynan qaytaradi.", bands: ["2-3", "4-5", "6-7"] },
  { id: "P7", block: "speech", text: "Bola suhbatni boshlay oladi (savol beradi yoki o‘zi gap ochadi).", bands: ["4-5", "6-7"] },
  { id: "P8", block: "speech", text: "Bola “men/sen” yoki “u” olmoshlarini tez-tez adashtiradi.", bands: ["2-3", "4-5"] },
  { id: "P9", block: "speech", text: "Bolaning nutqi juda monoton yoki noodatiy ohangda bo‘lishi kuzatiladi.", bands: ["4-5", "6-7"] },
  { id: "P10", block: "speech", text: "Bola hikoya qilib bera oladi (kun qanday o‘tdi, nimani ko‘rdi).", bands: ["6-7"] },

  // ---------------- REPETITIVE (10) ----------------
  { id: "R1", block: "repetitive", text: "Bola qo‘l silkitish, aylanib yurish, tebranib turish kabi takroriy harakatlarni qiladi.", bands: ["2-3", "4-5", "6-7"] },
  { id: "R2", block: "repetitive", text: "Bola buyumlarni tartib bilan terishni juda yaxshi ko‘radi va buzilsa bezovta bo‘ladi.", bands: ["2-3", "4-5", "6-7"] },
  { id: "R3", block: "repetitive", text: "Bola juda bir xil o‘yin bilan uzoq vaqt band bo‘lib qoladi (doim bir xil ssenariy).", bands: ["2-3", "4-5", "6-7"] },
  { id: "R4", block: "repetitive", text: "Rutina o‘zgarsa (yo‘l, kiyim, ovqat, tartib) juda qiyin qabul qiladi.", bands: ["4-5", "6-7"], isCoreFlag: true },
  { id: "R5", block: "repetitive", text: "Bola g‘ayrioddiy qiziqishga qattiq berilib ketadi (masalan: ventilyator, harf/raqamlar).", bands: ["4-5", "6-7"] },
  { id: "R6", block: "repetitive", text: "Bola buyumning bir qismini aylantirish/ochib-yopish bilan ko‘p shug‘ullanadi.", bands: ["2-3", "4-5", "6-7"] },
  { id: "R7", block: "repetitive", text: "Bola ma’lum mavzuda qayta-qayta gapiradi yoki savol beradi.", bands: ["4-5", "6-7"] },
  { id: "R8", block: "repetitive", text: "Bola o‘yinchoqni maqsadiga mos o‘ynashdan ko‘ra, detallariga “qotib” qoladi.", bands: ["2-3", "4-5"] },
  { id: "R9", block: "repetitive", text: "Bola bir xil kiyim/ovqatni qat’iy tanlaydi, yangisini sinash qiyin.", bands: ["4-5", "6-7"] },
  { id: "R10", block: "repetitive", text: "Bola o‘ziga yoqqan narsani juda ko‘p marta qaytaradi (bir xil video/sherik).", bands: ["2-3", "4-5", "6-7"] },

  // ---------------- SENSORY (10) ----------------
  { id: "N1", block: "sensory", text: "Bola baland tovushlardan (changyutgich, blender) kuchli bezovta bo‘ladi.", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "N2", block: "sensory", text: "Bola quloqlarini tez-tez yopadi yoki shovqindan qochadi.", bands: ["2-3", "4-5", "6-7"] },
  { id: "N3", block: "sensory", text: "Kiyim tegishi (etiketka, jun, tor kiyim) bezovta qiladi.", bands: ["2-3", "4-5", "6-7"] },
  { id: "N4", block: "sensory", text: "Bola ovqat teksturasiga juda sezgir (ba’zi teksturani umuman yemaydi).", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "N5", block: "sensory", text: "Bola yorug‘likka sezgir yoki ko‘zni qisib yuradi.", bands: ["4-5", "6-7"] },
  { id: "N6", block: "sensory", text: "Soch oldirish / tirnoq olish jarayoni juda qiyin kechadi.", bands: ["2-3", "4-5", "6-7"] },
  { id: "N7", block: "sensory", text: "Bola og‘riqqa noodatiy munosabat bildiradi (juda befarq yoki haddan tashqari).", bands: ["2-3", "4-5", "6-7"] },
  { id: "N8", block: "sensory", text: "Bola ma’lum hidlardan kuchli bezovta bo‘ladi.", bands: ["4-5", "6-7"] },
  { id: "N9", block: "sensory", text: "Bola qum/loy/bo‘yoq kabi narsalarga qo‘l tekkizishni yoqtirmaydi.", bands: ["2-3", "4-5"] },
  { id: "N10", block: "sensory", text: "Bola ba’zan o‘zini “sensor izlash” qiladi (devorga ishqalash, sakrash, bosim istash).", bands: ["4-5", "6-7"] },

  // ---------------- EMOTIONAL (10) ----------------
  { id: "E1", block: "emotional", text: "Bola o‘zgarish yoki cheklov bo‘lsa juda kuchli yig‘laydi / jahl qiladi (meltdown).", bands: ["2-3", "4-5", "6-7"], isCoreFlag: true },
  { id: "E2", block: "emotional", text: "Bola o‘zini tinchlantirish qiyin (uzoq vaqt tinchimaydi).", bands: ["2-3", "4-5", "6-7"] },
  { id: "E3", block: "emotional", text: "Bola stressda qotib qoladi yoki vaziyatdan “uzilib” qoladi.", bands: ["4-5", "6-7"] },
  { id: "E4", block: "emotional", text: "Bola o‘ziga zarar yetkazadigan harakatlar qiladi (urish, bosh urish, tishlash).", bands: ["2-3", "4-5", "6-7"] },
  { id: "E5", block: "emotional", text: "Bola yangi joy yoki yangi odamga moslashishi qiyin.", bands: ["2-3", "4-5", "6-7"] },
  { id: "E6", block: "emotional", text: "Bola ko‘p qo‘rquvli (oddiy narsalardan ham cho‘chiydi) yoki xavotir kuchli.", bands: ["4-5", "6-7"] },
  { id: "E7", block: "emotional", text: "Bola uyqu bilan muammoga ega (uxlash qiyin, tez uyg‘onadi).", bands: ["2-3", "4-5", "6-7"] },
  { id: "E8", block: "emotional", text: "Bola diqqatni ushlash qiyin (tez chalg‘iydi, faol).", bands: ["2-3", "4-5", "6-7"] },
  { id: "E9", block: "emotional", text: "Bola qoidaga bo‘ysunish/kelishuvni qiyin qabul qiladi (qarshilik ko‘rsatadi).", bands: ["4-5", "6-7"] },
  { id: "E10", block: "emotional", text: "Bola jamoat joyida hissiy portlashlar tez-tez bo‘ladi.", bands: ["4-5", "6-7"] },
];

export function ageToBand(ageYears: number): AgeBand {
  if (ageYears <= 3) return "2-3";
  if (ageYears <= 5) return "4-5";
  return "6-7";
}

export function getQuestionsForAge(ageYears: number) {
  const band = ageToBand(ageYears);
  // 2–7 yosh: baribir 50 savolni beramiz (to‘liq), lekin band bo‘yicha “core” tahlilda ishlatamiz
  return { band, questions: QUESTIONS };
}
