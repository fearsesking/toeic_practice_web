import type { Question } from "@/lib/types";
import type { AnswerMap } from "@/lib/session";

export const conversionTable = Array.from({ length: 101 }, (_, raw) => {
  if (raw === 0) return 5;
  return Math.min(495, Math.max(5, Math.round((raw / 100) * 490 / 5) * 5 + 5));
});

export function rawToScaled(raw: number) {
  return conversionTable[Math.max(0, Math.min(100, raw))];
}

export function scoreExam(questions: Question[], answers: AnswerMap) {
  const listeningRaw = questions.filter((question) => question.section === "listening" && answers[question.id] === question.answer).length;
  const readingRaw = questions.filter((question) => question.section === "reading" && answers[question.id] === question.answer).length;
  const listeningScaled = rawToScaled(listeningRaw);
  const readingScaled = rawToScaled(readingRaw);
  return {
    listeningRaw,
    readingRaw,
    listeningScaled,
    readingScaled,
    totalScaled: listeningScaled + readingScaled,
  };
}
