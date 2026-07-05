export type PartNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type SectionName = "listening" | "reading";
export type ChoiceId = "A" | "B" | "C" | "D";
export type ExamMode = "exam" | "practice" | "library";

export type Choice = {
  id: ChoiceId;
  text: string;
};

export type Question = {
  id: string;
  setId: string;
  part: PartNumber;
  section: SectionName;
  prompt: string;
  choices: Choice[];
  answer: ChoiceId;
  explanation: string;
  passage?: string;
  audioScript?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type BlueprintItem = {
  part: PartNumber;
  section: SectionName;
  count: number;
};
