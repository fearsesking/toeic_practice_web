import type { BlueprintItem, Choice, ChoiceId, PartNumber, Question, SectionName } from "@/lib/types";

export const examBlueprint: BlueprintItem[] = [
  { part: 1, section: "listening", count: 6 },
  { part: 2, section: "listening", count: 25 },
  { part: 3, section: "listening", count: 39 },
  { part: 4, section: "listening", count: 30 },
  { part: 5, section: "reading", count: 30 },
  { part: 6, section: "reading", count: 16 },
  { part: 7, section: "reading", count: 54 },
];

export const partLabels: Record<PartNumber, string> = {
  1: "Photographs",
  2: "Question-Response",
  3: "Conversations",
  4: "Short Talks",
  5: "Incomplete Sentences",
  6: "Text Completion",
  7: "Reading Comprehension",
};

const choices = (items: [ChoiceId, string][]): Choice[] => items.map(([id, text]) => ({ id, text }));

const names = ["Mina", "Daniel", "Grace", "Owen", "Nadia", "Leo", "Priya", "Victor", "Hana", "Marco"];
const companies = ["Harbor Foods", "Metroline Design", "Northstar Bank", "BrightPath Training", "Cedar Hotel"];
const places = ["conference room", "warehouse", "reception desk", "train station", "copy center", "sales office"];

function buildPart1(): Question[] {
  const scenes = [
    ["A woman is arranging folders on a desk.", "Some customers are waiting outside a shop.", "A printer is being repaired by a technician.", "Several boxes are stacked near a doorway."],
    ["Two people are reviewing a chart together.", "A man is watering plants by a window.", "The chairs have been placed upside down.", "A vehicle is parked beside a loading dock."],
    ["A worker is carrying a tray through a hallway.", "People are seated around a meeting table.", "A sign has been attached to a glass door.", "The shelves are completely empty."],
    ["A person is typing on a laptop.", "A package is being weighed on a scale.", "The lamps are hanging above the counter.", "Some bicycles are lined up near a fence."],
    ["A man is pointing at a screen.", "The curtains have been pulled closed.", "Several tools are spread across the floor.", "A woman is paying at a register."],
    ["A suitcase is standing next to a bench.", "Two workers are unloading a truck.", "A ladder is leaning against a wall.", "The tables are covered with tablecloths."],
  ];

  return scenes.map((options, index) => ({
    id: `set-a-p1-${index + 1}`,
    setId: "set-a",
    part: 1,
    section: "listening",
    prompt: `Look at the picture placeholder ${index + 1}. Which statement best describes it?`,
    imageAlt: `Workplace photo placeholder ${index + 1}`,
    audioScript: options.map((text, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${text}`).join("\n"),
    choices: choices(options.map((text, optionIndex) => [String.fromCharCode(65 + optionIndex) as ChoiceId, text])),
    answer: ["A", "B", "C", "D", "A", "B"][index] as ChoiceId,
    explanation: "เลือกประโยคที่ตรงกับภาพ placeholder มากที่สุด ใน V1 ใช้คำบรรยายแทนไฟล์ภาพ/เสียงจริงเพื่อรอเติม asset ภายหลัง",
  }));
}

function buildPart2(): Question[] {
  const stems = [
    ["When will the budget report be ready?", "By Thursday afternoon.", "In the accounting folder.", "Because the price changed."],
    ["Who is meeting the new client today?", "The conference room is upstairs.", "Sofia from marketing.", "It starts at ten."],
    ["Could you reserve a larger table?", "Sure, I will call the restaurant.", "The table is made of wood.", "No, I did not read it."],
    ["Where should I leave these invoices?", "At the end of the month.", "In the tray beside the scanner.", "They were approved yesterday."],
    ["Why was the shipment delayed?", "The storm closed the highway.", "At the loading entrance.", "Twenty cartons arrived."],
  ];

  return Array.from({ length: 25 }, (_, index) => {
    const base = stems[index % stems.length];
    const answer = (["A", "B", "A", "B", "A"] as ChoiceId[])[index % stems.length];
    return {
      id: `set-a-p2-${index + 1}`,
      setId: "set-a",
      part: 2,
      section: "listening",
      prompt: base[0],
      audioScript: `Question: ${base[0]}\nA. ${base[1]}\nB. ${base[2]}\nC. ${base[3]}`,
      choices: choices([
        ["A", base[1]],
        ["B", base[2]],
        ["C", base[3]],
      ]),
      answer,
      explanation: "คำตอบที่ถูกต้องต้องตอบชนิดคำถามให้ตรง เช่น when ตอบเวลา, who ตอบบุคคล, where ตอบสถานที่ หรือ why ตอบเหตุผล",
    };
  });
}

function buildGroupedListening(part: 3 | 4, groups: number, questionsPerGroup: number): Question[] {
  const section: SectionName = "listening";
  const result: Question[] = [];
  for (let group = 1; group <= groups; group += 1) {
    const speaker = names[group % names.length];
    const company = companies[group % companies.length];
    const place = places[group % places.length];
    const isConversation = part === 3;
    const script = isConversation
      ? `${speaker}: Good morning. I am checking whether the projector in the ${place} is ready for today's client presentation.\nManager: It was tested this morning, but the adapter is at the front desk.\n${speaker}: Great. I will pick it up before the visitors from ${company} arrive.`
      : `This is an announcement for employees at ${company}. The maintenance team will inspect the ${place} this Friday morning. Please remove personal items by Thursday evening and contact facilities if you need temporary storage.`;
    const prompts = isConversation
      ? [
          ["What is the speaker preparing for?", "A client presentation", "A staff vacation", "A budget audit", "A product delivery", "A"],
          ["Where is the adapter now?", "In the warehouse", "At the front desk", "Inside the projector case", "At the restaurant", "B"],
          ["What will the speaker probably do next?", "Cancel a meeting", "Call a supplier", "Pick up equipment", "Print invoices", "C"],
        ]
      : [
          ["What is the purpose of the announcement?", "To describe a maintenance inspection", "To introduce a new employee", "To advertise a seminar", "To change a menu", "A"],
          ["When should items be removed?", "By Monday morning", "By Thursday evening", "During lunch", "After the inspection", "B"],
          ["Who should employees contact for storage?", "Human resources", "Facilities", "Accounting", "Security", "B"],
        ];
    const selectedPrompts = Array.from({ length: questionsPerGroup }, (_, idx) => prompts[idx % prompts.length]);
    selectedPrompts.forEach((item, localIndex) => {
      result.push({
        id: `set-a-p${part}-${group}-${localIndex + 1}`,
        setId: "set-a",
        part,
        section,
        prompt: item[0],
        audioScript: script,
        choices: choices([
          ["A", item[1]],
          ["B", item[2]],
          ["C", item[3]],
          ["D", item[4]],
        ]),
        answer: item[5] as ChoiceId,
        explanation: "ฟังจุดประสงค์ เวลา สถานที่ และการกระทำถัดไปจากบทสนทนา/ประกาศ แล้วเลือกตัวเลือกที่ตรงกับข้อมูลในสคริปต์",
      });
    });
  }
  return result;
}

function buildPart5(): Question[] {
  const templates = [
    ["The manager asked the team to submit the proposal _____ noon.", "by", "between", "during", "inside", "A", "by ใช้กับ deadline"],
    ["All visitors must wear badges while _____ are in the building.", "they", "them", "their", "theirs", "A", "ตำแหน่งประธานของประโยคย่อยต้องใช้ they"],
    ["The new software is more _____ than the previous version.", "reliable", "reliably", "reliance", "rely", "A", "หลัง more ต้องใช้ adjective เพื่อเปรียบเทียบคุณสมบัติ"],
    ["Please contact Ms. Rivera if you have _____ questions about the schedule.", "any", "each", "much", "every", "A", "questions เป็นคำนามพหูพจน์ ใช้ any ได้เป็นธรรมชาติ"],
    ["The training session was postponed _____ the instructor was ill.", "because", "although", "unless", "despite", "A", "because เชื่อมเหตุผลกับประโยคสมบูรณ์"],
  ];
  return Array.from({ length: 30 }, (_, index) => {
    const item = templates[index % templates.length];
    return {
      id: `set-a-p5-${index + 1}`,
      setId: "set-a",
      part: 5,
      section: "reading",
      prompt: `${item[0]} (${companies[index % companies.length]})`,
      choices: choices([
        ["A", item[1]],
        ["B", item[2]],
        ["C", item[3]],
        ["D", item[4]],
      ]),
      answer: item[5] as ChoiceId,
      explanation: item[6],
    };
  });
}

function buildPart6(): Question[] {
  const result: Question[] = [];
  for (let group = 1; group <= 4; group += 1) {
    const company = companies[group % companies.length];
    const passage = `To all staff,\n\n${company} will update its visitor check-in process next month. Guests will receive a digital badge after confirming their appointment at reception. The change is intended to reduce waiting time and improve building security.\n\nPlease review the short guide before Monday. Department assistants should collect feedback and send it to operations by Wednesday.`;
    const items = [
      ["What is being updated?", "The visitor check-in process", "The vacation policy", "The company logo", "The cafeteria menu", "A"],
      ["Why is the change being made?", "To reduce waiting time", "To close the office", "To hire assistants", "To replace all computers", "A"],
      ["Who should collect feedback?", "Department assistants", "New visitors", "Security guards", "Clients", "A"],
      ["When is feedback due?", "By Wednesday", "By next year", "During the weekend", "After the holiday", "A"],
    ];
    items.forEach((item, index) => {
      result.push({
        id: `set-a-p6-${group}-${index + 1}`,
        setId: "set-a",
        part: 6,
        section: "reading",
        passage,
        prompt: item[0],
        choices: choices([
          ["A", item[1]],
          ["B", item[2]],
          ["C", item[3]],
          ["D", item[4]],
        ]),
        answer: item[5] as ChoiceId,
        explanation: "อ่านอีเมลทั้งย่อหน้าเพื่อจับใจความ จุดประสงค์ ผู้รับผิดชอบ และกำหนดเวลา",
      });
    });
  }
  return result;
}

function buildPart7(): Question[] {
  const result: Question[] = [];
  const groups = 18;
  for (let group = 1; group <= groups; group += 1) {
    const company = companies[group % companies.length];
    const name = names[group % names.length];
    const passage = `Email\nFrom: ${name}\nTo: Operations Team\nSubject: Updated delivery schedule\n\nThe shipment from ${company} will now arrive at 9:30 A.M. on Tuesday instead of Monday afternoon. The carrier reported that one truck required inspection before leaving the regional center. Please keep the loading area clear and notify the reception desk when the driver arrives.\n\nA revised invoice will be sent after the delivery is confirmed.`;
    const items = [
      ["What is the email mainly about?", "A changed delivery time", "A new hiring plan", "A customer survey", "A cancelled invoice", "A"],
      ["Why was the delivery changed?", "A truck needed inspection", "The office was closed", "The driver was unavailable", "The invoice was incorrect", "A"],
      ["What are employees asked to do?", "Keep the loading area clear", "Prepare lunch orders", "Call every customer", "Replace the reception desk", "A"],
    ];
    items.forEach((item, index) => {
      result.push({
        id: `set-a-p7-${group}-${index + 1}`,
        setId: "set-a",
        part: 7,
        section: "reading",
        passage,
        prompt: item[0],
        choices: choices([
          ["A", item[1]],
          ["B", item[2]],
          ["C", item[3]],
          ["D", item[4]],
        ]),
        answer: item[5] as ChoiceId,
        explanation: "คำตอบอยู่ในอีเมลโดยตรง ให้จับ main idea เหตุผลของการเปลี่ยนแปลง และ action item ที่ผู้รับต้องทำ",
      });
    });
  }
  return result;
}

export const allQuestions: Question[] = [
  ...buildPart1(),
  ...buildPart2(),
  ...buildGroupedListening(3, 13, 3),
  ...buildGroupedListening(4, 10, 3),
  ...buildPart5(),
  ...buildPart6(),
  ...buildPart7(),
];
