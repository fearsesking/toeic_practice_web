import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { allQuestions, examBlueprint } from "@/lib/exam-data";
import { rawToScaled, scoreExam } from "@/lib/scoring";
import { buildExam } from "@/lib/session";
import type { AnswerMap } from "@/lib/session";

describe("exam data", () => {
  it("contains three complete 200-question sets with the TOEIC-style blueprint", () => {
    expect(allQuestions).toHaveLength(600);
    for (const item of examBlueprint) {
      expect(allQuestions.filter((question) => question.part === item.part)).toHaveLength(item.count * 3);
    }
  });

  it("has valid answers, choices, and grouped context", () => {
    for (const question of allQuestions) {
      expect(question.choices.length).toBeGreaterThanOrEqual(3);
      expect(question.choices.some((choice) => choice.id === question.answer)).toBe(true);
      expect(question.explanation.length).toBeGreaterThan(0);
      if (question.part === 1) {
        expect(question.imageSrc).toBeTruthy();
        expect(fs.existsSync(path.join(process.cwd(), "public", question.imageSrc!.replace(/^\//, "")))).toBe(true);
      }
      if ([3, 4].includes(question.part)) expect(question.audioScript).toBeTruthy();
      if ([6, 7].includes(question.part)) expect(question.passage).toBeTruthy();
    }
  });

  it("keeps randomization within the required part counts", () => {
    const exam = buildExam(allQuestions, 12345);
    expect(exam).toHaveLength(200);
    for (const item of examBlueprint) {
      expect(exam.filter((question) => question.part === item.part)).toHaveLength(item.count);
    }
  });

  it("shuffles choice labels so correct answers are not fixed to A", () => {
    const exam = buildExam(allQuestions, 12345);
    const partOneAnswers = exam.filter((question) => question.part === 1).map((question) => question.answer);
    expect(new Set(partOneAnswers).size).toBeGreaterThan(1);

    const nextExam = buildExam(allQuestions, 67890);
    const firstRunAnswers = exam.map((question) => `${question.id}:${question.answer}`).join("|");
    const secondRunAnswers = nextExam.map((question) => `${question.id}:${question.answer}`).join("|");
    expect(firstRunAnswers).not.toBe(secondRunAnswers);
  });
});

describe("scoring", () => {
  it("scales raw section scores into the 5-495 range", () => {
    expect(rawToScaled(0)).toBe(5);
    expect(rawToScaled(100)).toBe(495);
  });

  it("returns a 990 total for all-correct answers", () => {
    const answers: AnswerMap = Object.fromEntries(allQuestions.map((question) => [question.id, question.answer]));
    expect(scoreExam(allQuestions, answers).totalScaled).toBe(990);
  });

  it("scores shuffled exam choices using their displayed answer labels", () => {
    const exam = buildExam(allQuestions, 12345);
    const answers: AnswerMap = Object.fromEntries(exam.map((question) => [question.id, question.answer]));
    expect(scoreExam(exam, answers).totalScaled).toBe(990);
  });
});
