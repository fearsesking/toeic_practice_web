"use client";

import { BookOpen, CheckCircle2, Clock3, Library, RotateCcw, Shuffle, TimerReset } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { allQuestions, examBlueprint, partLabels } from "@/lib/exam-data";
import { scoreExam } from "@/lib/scoring";
import { buildExam, countByPart, getQuestionStatus, type AnswerMap } from "@/lib/session";
import type { ChoiceId, ExamMode, PartNumber, Question } from "@/lib/types";

const modeCards: Array<{
  mode: ExamMode;
  title: string;
  description: string;
  icon: typeof Clock3;
}> = [
  {
    mode: "exam",
    title: "จำลองสอบจริง",
    description: "ครบ 200 ข้อ จับเวลา 120 นาที ซ่อนเฉลยจนส่งข้อสอบ",
    icon: Clock3,
  },
  {
    mode: "practice",
    title: "ฝึกทีละข้อ",
    description: "สุ่มโจทย์ ทำทีละข้อ แล้วเปิดเฉลยได้ทันที",
    icon: BookOpen,
  },
  {
    mode: "library",
    title: "คลังข้อสอบ",
    description: "ดูข้อสอบทั้งหมด แยกตามพาร์ทและสถานะคำตอบ",
    icon: Library,
  },
];

const defaultPartFilter: PartNumber | "all" = "all";

export default function Home() {
  const [mode, setMode] = useState<ExamMode>("exam");
  const [seed, setSeed] = useState(20260705);
  const [examQuestions, setExamQuestions] = useState<Question[]>(() => buildExam(allQuestions, seed));
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(120 * 60);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false);
  const [partFilter, setPartFilter] = useState<PartNumber | "all">(defaultPartFilter);

  useEffect(() => {
    const stored = window.localStorage.getItem("toeic-practice-state");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as {
        answers?: AnswerMap;
        seed?: number;
        submitted?: boolean;
        activeIndex?: number;
      };
      if (parsed.seed) {
        setSeed(parsed.seed);
        setExamQuestions(buildExam(allQuestions, parsed.seed));
      }
      if (parsed.answers) setAnswers(parsed.answers);
      if (parsed.submitted) setSubmitted(parsed.submitted);
      if (typeof parsed.activeIndex === "number") setActiveIndex(parsed.activeIndex);
    } catch {
      window.localStorage.removeItem("toeic-practice-state");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "toeic-practice-state",
      JSON.stringify({ answers, seed, submitted, activeIndex }),
    );
  }, [answers, seed, submitted, activeIndex]);

  useEffect(() => {
    if (mode !== "exam" || submitted || secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [mode, secondsLeft, submitted]);

  useEffect(() => {
    if (secondsLeft === 0 && mode === "exam") setSubmitted(true);
  }, [mode, secondsLeft]);

  const currentQuestions = mode === "library" ? allQuestions : examQuestions;
  const filteredQuestions = useMemo(() => {
    if (mode === "library" && partFilter !== "all") {
      return allQuestions.filter((question) => question.part === partFilter);
    }
    return currentQuestions;
  }, [currentQuestions, mode, partFilter]);

  const activeQuestion = filteredQuestions[Math.min(activeIndex, filteredQuestions.length - 1)];
  const score = useMemo(() => scoreExam(examQuestions, answers), [answers, examQuestions]);
  const counts = countByPart(examQuestions);

  function resetSession(nextMode = mode) {
    const nextSeed = Date.now();
    setSeed(nextSeed);
    setExamQuestions(buildExam(allQuestions, nextSeed));
    setAnswers({});
    setSubmitted(false);
    setActiveIndex(0);
    setSecondsLeft(120 * 60);
    setShowPracticeAnswer(false);
    setPartFilter(defaultPartFilter);
    setMode(nextMode);
  }

  function chooseMode(nextMode: ExamMode) {
    setMode(nextMode);
    setActiveIndex(0);
    setShowPracticeAnswer(false);
  }

  function answerQuestion(questionId: string, choiceId: ChoiceId) {
    if (mode === "exam" && submitted) return;
    setAnswers((value) => ({ ...value, [questionId]: choiceId }));
  }

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="flex flex-col gap-4 rounded-lg border border-orange-100 bg-white/78 p-5 shadow-soft backdrop-blur md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-700">TOEIC Listening & Reading</p>
            <h1 className="mt-1 text-2xl font-bold tracking-normal text-ink sm:text-3xl">TOEIC Practice Lab</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">
              ข้อสอบ original สำหรับฝึกซ้อมตามรูปแบบ TOEIC พร้อมคะแนนประมาณการ ไม่ใช่คะแนน official ETS
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:min-w-80">
            <Stat label="ข้อสอบ" value={`${allQuestions.length}`} />
            <Stat label="Listening" value={`${counts.listening}`} />
            <Stat label="Reading" value={`${counts.reading}`} />
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          {modeCards.map((card) => {
            const Icon = card.icon;
            const selected = mode === card.mode;
            return (
              <button
                key={card.mode}
                type="button"
                onClick={() => chooseMode(card.mode)}
                className={`focus-ring rounded-lg border p-4 text-left transition ${
                  selected
                    ? "border-orange-500 bg-orange-50 text-orange-950 shadow-soft"
                    : "border-orange-100 bg-white/75 hover:border-orange-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-md bg-white text-orange-700">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <span className="font-semibold">{card.title}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-700">{card.description}</p>
              </button>
            );
          })}
        </section>

        {mode === "exam" && (
          <ExamToolbar
            secondsLeft={secondsLeft}
            submitted={submitted}
            score={score}
            answered={Object.keys(answers).length}
            onSubmit={() => setSubmitted(true)}
            onReset={() => resetSession("exam")}
          />
        )}

        {mode === "library" && (
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-orange-100 bg-white/75 p-3">
            <label className="text-sm font-medium text-stone-700" htmlFor="part-filter">
              เลือกพาร์ท
            </label>
            <select
              id="part-filter"
              value={partFilter}
              onChange={(event) => {
                setPartFilter(event.target.value === "all" ? "all" : Number(event.target.value) as PartNumber);
                setActiveIndex(0);
              }}
              className="focus-ring rounded-md border border-orange-200 bg-white px-3 py-2 text-sm"
            >
              <option value="all">ทั้งหมด</option>
              {examBlueprint.map((part) => (
                <option key={part.part} value={part.part}>
                  Part {part.part}: {partLabels[part.part]}
                </option>
              ))}
            </select>
          </div>
        )}

        <section className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <QuestionNavigator
            questions={filteredQuestions}
            answers={answers}
            activeIndex={activeIndex}
            submitted={submitted || mode === "library"}
            onSelect={(index) => {
              setActiveIndex(index);
              setShowPracticeAnswer(false);
            }}
          />

          <QuestionPanel
            mode={mode}
            question={activeQuestion}
            selected={activeQuestion ? answers[activeQuestion.id] : undefined}
            submitted={submitted || mode === "library" || showPracticeAnswer}
            onAnswer={answerQuestion}
            onReveal={() => setShowPracticeAnswer(true)}
            onNext={() => {
              setActiveIndex((value) => Math.min(filteredQuestions.length - 1, value + 1));
              setShowPracticeAnswer(false);
            }}
            onPrevious={() => {
              setActiveIndex((value) => Math.max(0, value - 1));
              setShowPracticeAnswer(false);
            }}
            canNext={activeIndex < filteredQuestions.length - 1}
            canPrevious={activeIndex > 0}
          />
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-orange-100 bg-white px-3 py-2">
      <div className="text-base font-bold text-orange-700">{value}</div>
      <div className="text-stone-600">{label}</div>
    </div>
  );
}

function ExamToolbar({
  secondsLeft,
  submitted,
  score,
  answered,
  onSubmit,
  onReset,
}: {
  secondsLeft: number;
  submitted: boolean;
  score: ReturnType<typeof scoreExam>;
  answered: number;
  onSubmit: () => void;
  onReset: () => void;
}) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="sticky top-3 z-10 flex flex-col gap-3 rounded-lg border border-orange-200 bg-white/95 p-3 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-md bg-orange-50 px-3 py-2 font-semibold text-orange-800">
          <TimerReset size={18} aria-hidden="true" />
          {minutes}:{seconds}
        </span>
        <span className="text-sm text-stone-700">ตอบแล้ว {answered}/200 ข้อ</span>
        {submitted && (
          <span className="text-sm font-semibold text-orange-800">
            คะแนนประมาณการ {score.totalScaled}/990 (L {score.listeningScaled}, R {score.readingScaled})
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReset}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-orange-200 bg-white px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-orange-50"
        >
          <RotateCcw size={17} aria-hidden="true" />
          เริ่มใหม่
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitted}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          <CheckCircle2 size={17} aria-hidden="true" />
          ส่งข้อสอบ
        </button>
      </div>
    </div>
  );
}

function QuestionNavigator({
  questions,
  answers,
  activeIndex,
  submitted,
  onSelect,
}: {
  questions: Question[];
  answers: AnswerMap;
  activeIndex: number;
  submitted: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <aside className="rounded-lg border border-orange-100 bg-white/76 p-3 shadow-soft lg:max-h-[calc(100vh-220px)] lg:overflow-auto">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-stone-800">Question Navigator</h2>
        <Shuffle size={17} className="text-orange-700" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-8 gap-1.5 lg:grid-cols-5">
        {questions.map((question, index) => {
          const status = getQuestionStatus(question, answers[question.id], submitted);
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`focus-ring aspect-square rounded-md border text-xs font-semibold transition ${
                activeIndex === index
                  ? "border-orange-600 bg-orange-600 text-white"
                  : status === "correct"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : status === "wrong"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : status === "answered"
                        ? "border-orange-300 bg-orange-50 text-orange-800"
                        : "border-orange-100 bg-white text-stone-700"
              }`}
              title={`Part ${question.part} Question ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function QuestionPanel({
  mode,
  question,
  selected,
  submitted,
  onAnswer,
  onReveal,
  onNext,
  onPrevious,
  canNext,
  canPrevious,
}: {
  mode: ExamMode;
  question?: Question;
  selected?: string;
  submitted: boolean;
  onAnswer: (questionId: string, choiceId: ChoiceId) => void;
  onReveal: () => void;
  onNext: () => void;
  onPrevious: () => void;
  canNext: boolean;
  canPrevious: boolean;
}) {
  if (!question) {
    return <div className="rounded-lg border border-orange-100 bg-white p-6">ไม่พบข้อสอบ</div>;
  }

  return (
    <article className="rounded-lg border border-orange-100 bg-white/86 p-4 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-stone-600">
        <span className="rounded-md bg-orange-50 px-2.5 py-1 font-semibold text-orange-800">Part {question.part}</span>
        <span>{partLabels[question.part]}</span>
        <span className="rounded-md border border-orange-100 px-2.5 py-1">{question.section}</span>
      </div>

      {question.audioScript && (
        <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-orange-800">Listening script placeholder</p>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-800">{question.audioScript}</p>
        </div>
      )}

      {question.passage && (
        <div className="mt-4 rounded-lg border border-stone-200 bg-white p-4 text-sm leading-7 text-stone-800">
          <p className="whitespace-pre-line">{question.passage}</p>
        </div>
      )}

      <h2 className="mt-5 text-lg font-bold leading-7 text-ink">{question.prompt}</h2>

      <div className="mt-4 grid gap-2">
        {question.choices.map((choice) => {
          const isSelected = selected === choice.id;
          const isCorrect = submitted && question.answer === choice.id;
          const isWrong = submitted && isSelected && question.answer !== choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onAnswer(question.id, choice.id)}
              className={`focus-ring rounded-lg border p-3 text-left text-sm leading-6 transition ${
                isCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                  : isWrong
                    ? "border-red-300 bg-red-50 text-red-900"
                    : isSelected
                      ? "border-orange-500 bg-orange-50 text-orange-950"
                      : "border-orange-100 bg-white hover:border-orange-300 hover:bg-orange-50"
              }`}
            >
              <span className="mr-2 font-bold">{choice.id}.</span>
              {choice.text}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="mt-5 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm leading-6 text-stone-800">
          <p className="font-semibold text-orange-900">เฉลย: {question.answer}</p>
          <p className="mt-1">{question.explanation}</p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          className="focus-ring rounded-md border border-orange-200 bg-white px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-orange-50 disabled:cursor-not-allowed disabled:text-stone-300"
        >
          ก่อนหน้า
        </button>
        <div className="flex gap-2">
          {mode === "practice" && !submitted && (
            <button
              type="button"
              onClick={onReveal}
              className="focus-ring rounded-md border border-orange-200 bg-white px-3 py-2 text-sm font-semibold text-orange-800 hover:bg-orange-50"
            >
              ดูเฉลย
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="focus-ring rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </article>
  );
}
