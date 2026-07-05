import { examBlueprint } from "@/lib/exam-data";
import type { Choice, ChoiceId, Question } from "@/lib/types";

export type AnswerMap = Record<string, ChoiceId>;
export type QuestionStatus = "unanswered" | "answered" | "correct" | "wrong";

function seededRandom(seed: number) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const random = seededRandom(seed);
  const output = [...items];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

function hashString(value: string) {
  return value.split("").reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0);
}

function relabelChoices(choices: Choice[]): Choice[] {
  return choices.map((choice, index) => ({ ...choice, id: String.fromCharCode(65 + index) as ChoiceId }));
}

export function shuffleQuestionChoices(question: Question, seed: number): Question {
  const correctText = question.choices.find((choice) => choice.id === question.answer)?.text;
  if (!correctText) return question;

  const shuffledChoices = relabelChoices(shuffleWithSeed(question.choices, seed + hashString(question.id)));
  const answer = shuffledChoices.find((choice) => choice.text === correctText)?.id ?? question.answer;
  const audioScript = [1, 2].includes(question.part)
    ? `${question.part === 2 ? `Question: ${question.prompt}\n` : ""}${shuffledChoices
        .map((choice) => `${choice.id}. ${choice.text}`)
        .join("\n")}`
    : question.audioScript;

  return {
    ...question,
    choices: shuffledChoices,
    answer,
    audioScript,
  };
}

export function buildExam(pool: Question[], seed: number): Question[] {
  return examBlueprint.flatMap((blueprint, index) => {
    const questions = pool.filter((question) => question.part === blueprint.part);
    return shuffleWithSeed(questions, seed + index)
      .slice(0, blueprint.count)
      .map((question, questionIndex) => shuffleQuestionChoices(question, seed + index * 1000 + questionIndex));
  });
}

export function countByPart(questions: Question[]) {
  return questions.reduce(
    (accumulator, question) => {
      accumulator[question.section] += 1;
      accumulator.parts[question.part] = (accumulator.parts[question.part] ?? 0) + 1;
      return accumulator;
    },
    { listening: 0, reading: 0, parts: {} as Record<number, number> },
  );
}

export function getQuestionStatus(question: Question, selected: ChoiceId | undefined, submitted: boolean): QuestionStatus {
  if (!selected) return "unanswered";
  if (!submitted) return "answered";
  return selected === question.answer ? "correct" : "wrong";
}
