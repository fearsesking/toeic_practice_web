import type { BlueprintItem, Choice, ChoiceId, PartNumber, Question } from "@/lib/types";

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

type SetId = "set-a" | "set-b";

const choices = (items: [ChoiceId, string][]): Choice[] => items.map(([id, text]) => ({ id, text }));
const choiceId = (index: number) => String.fromCharCode(65 + index) as ChoiceId;

const names = {
  "set-a": ["Mina", "Daniel", "Grace", "Owen", "Nadia", "Leo", "Priya", "Victor", "Hana", "Marco"],
  "set-b": ["Alicia", "Ben", "Carla", "Derek", "Elena", "Felix", "Iris", "Jonah", "Keiko", "Samir"],
};

const companies = {
  "set-a": ["Harbor Foods", "Metroline Design", "Northstar Bank", "BrightPath Training", "Cedar Hotel"],
  "set-b": ["Summit Office Supply", "Riverside Events", "Greenline Logistics", "Oak & Stone Cafe", "Pioneer Medical"],
};

const places = {
  "set-a": ["conference room", "warehouse", "reception desk", "train station", "copy center", "sales office"],
  "set-b": ["training room", "shipping counter", "hotel lobby", "service desk", "cafeteria", "parking entrance"],
};

const part1Scenes: Record<SetId, Array<{ options: string[]; answer: ChoiceId; alt: string }>> = {
  "set-a": [
    {
      options: [
        "A woman is arranging folders on a desk.",
        "Some customers are waiting outside a shop.",
        "A printer is being repaired by a technician.",
        "Several boxes are stacked near a doorway.",
      ],
      answer: "A",
      alt: "A woman arranging folders on an office desk",
    },
    {
      options: [
        "Two people are reviewing a chart together.",
        "A man is watering plants by a window.",
        "The chairs have been placed upside down.",
        "A vehicle is parked beside a loading dock.",
      ],
      answer: "A",
      alt: "Two office workers reviewing a chart in a meeting room",
    },
    {
      options: [
        "A worker is carrying a tray through a hallway.",
        "People are seated around a meeting table.",
        "A sign has been attached to a glass door.",
        "The shelves are completely empty.",
      ],
      answer: "A",
      alt: "A worker carrying a tray through an office hallway",
    },
    {
      options: [
        "A person is typing on a laptop.",
        "A package is being weighed on a scale.",
        "The lamps are hanging above the counter.",
        "Some bicycles are lined up near a fence.",
      ],
      answer: "A",
      alt: "A person typing on a laptop at a clean desk",
    },
    {
      options: [
        "A man is pointing at a screen.",
        "The curtains have been pulled closed.",
        "Several tools are spread across the floor.",
        "A woman is paying at a register.",
      ],
      answer: "A",
      alt: "A man pointing at a blank presentation screen",
    },
    {
      options: [
        "A suitcase is standing next to a bench.",
        "Two workers are unloading a truck.",
        "A ladder is leaning against a wall.",
        "The tables are covered with tablecloths.",
      ],
      answer: "A",
      alt: "A suitcase standing next to a bench in a lobby",
    },
  ],
  "set-b": [
    {
      options: [
        "A woman is paying at a register.",
        "A suitcase is standing next to a bench.",
        "A man is pointing at a screen.",
        "Several tables are covered with tablecloths.",
      ],
      answer: "A",
      alt: "A woman paying at a shop register",
    },
    {
      options: [
        "Several boxes are stacked near a doorway.",
        "A worker is watering plants.",
        "A package is being weighed on a scale.",
        "People are seated around a meeting table.",
      ],
      answer: "A",
      alt: "Cardboard boxes stacked near a warehouse doorway",
    },
    {
      options: [
        "A technician is repairing a printer.",
        "A ladder is leaning against a wall.",
        "A woman is arranging folders.",
        "Two people are reviewing a chart.",
      ],
      answer: "A",
      alt: "A technician repairing an office printer",
    },
    {
      options: [
        "The tables are covered with tablecloths.",
        "The printer is being repaired.",
        "Some boxes are being loaded onto a truck.",
        "A person is typing on a laptop.",
      ],
      answer: "A",
      alt: "Restaurant tables covered with clean tablecloths",
    },
    {
      options: [
        "Two workers are unloading a truck.",
        "A sign has been attached to a door.",
        "A suitcase is standing next to a bench.",
        "The chairs have been placed upside down.",
      ],
      answer: "A",
      alt: "Two workers unloading boxes from a delivery truck",
    },
    {
      options: [
        "A ladder is leaning against a wall.",
        "A man is watering plants by a window.",
        "A package is being weighed on a scale.",
        "A worker is carrying a tray through a hallway.",
      ],
      answer: "A",
      alt: "A ladder leaning against an office corridor wall",
    },
  ],
};

function buildPart1(setId: SetId): Question[] {
  return part1Scenes[setId].map((scene, index) => ({
    id: `${setId}-p1-${index + 1}`,
    setId,
    part: 1,
    section: "listening",
    prompt: `Look at photograph ${index + 1}. Which statement best describes it?`,
    imageSrc: `/images/part1/${setId}-${String(index + 1).padStart(2, "0")}.jpg`,
    imageAlt: scene.alt,
    audioScript: scene.options.map((text, optionIndex) => `${choiceId(optionIndex)}. ${text}`).join("\n"),
    choices: choices(scene.options.map((text, optionIndex) => [choiceId(optionIndex), text])),
    answer: scene.answer,
    explanation: "เลือกประโยคที่อธิบายภาพได้ตรงที่สุด ระวังตัวเลือกที่กล่าวถึงสิ่งของหรือการกระทำที่ไม่ได้อยู่ในภาพ",
  }));
}

function buildPart2(setId: SetId): Question[] {
  const stems = setId === "set-a"
    ? [
        ["When will the budget report be ready?", "By Thursday afternoon.", "In the accounting folder.", "Because the price changed.", "A"],
        ["Who is meeting the new client today?", "The conference room is upstairs.", "Sofia from marketing.", "It starts at ten.", "B"],
        ["Could you reserve a larger table?", "Sure, I will call the restaurant.", "The table is made of wood.", "No, I did not read it.", "A"],
        ["Where should I leave these invoices?", "At the end of the month.", "In the tray beside the scanner.", "They were approved yesterday.", "B"],
        ["Why was the shipment delayed?", "The storm closed the highway.", "At the loading entrance.", "Twenty cartons arrived.", "A"],
      ]
    : [
        ["How often is the staff newsletter sent?", "Every Friday morning.", "In the break room.", "Because it was revised.", "A"],
        ["Where can I pick up my visitor badge?", "At the front desk.", "The guest arrived early.", "For about two hours.", "A"],
        ["Who approved the travel request?", "Ms. Patel did.", "The flight leaves at six.", "In the online calendar.", "A"],
        ["Would you like me to print the agenda?", "Yes, ten copies, please.", "It is on the second floor.", "The printer was purchased last year.", "A"],
        ["Why is the cafe closing early today?", "The staff has a training session.", "At the corner table.", "No, I ordered tea.", "A"],
      ];

  return Array.from({ length: 25 }, (_, index) => {
    const item = stems[index % stems.length];
    return {
      id: `${setId}-p2-${index + 1}`,
      setId,
      part: 2,
      section: "listening",
      prompt: item[0],
      audioScript: `Question: ${item[0]}\nA. ${item[1]}\nB. ${item[2]}\nC. ${item[3]}`,
      choices: choices([
        ["A", item[1]],
        ["B", item[2]],
        ["C", item[3]],
      ]),
      answer: item[4] as ChoiceId,
      explanation: "คำตอบต้องสัมพันธ์กับชนิดคำถาม เช่น when ตอบเวลา, where ตอบสถานที่, who ตอบบุคคล และ why ตอบเหตุผล",
    };
  });
}

function buildGroupedListening(setId: SetId, part: 3 | 4, groups: number, questionsPerGroup: number): Question[] {
  const result: Question[] = [];
  for (let group = 1; group <= groups; group += 1) {
    const speaker = names[setId][group % names[setId].length];
    const company = companies[setId][group % companies[setId].length];
    const place = places[setId][group % places[setId].length];
    const isConversation = part === 3;
    const script = isConversation
      ? setId === "set-a"
        ? `${speaker}: Good morning. I am checking whether the projector in the ${place} is ready for today's client presentation.\nManager: It was tested this morning, but the adapter is at the front desk.\n${speaker}: Great. I will pick it up before the visitors from ${company} arrive.`
        : `${speaker}: I noticed the reservation for the ${place} was moved to 2 P.M.\nCoordinator: Yes, the morning workshop ran longer than expected, so we changed the room setup.\n${speaker}: Thanks. I will update the invitation and ask ${company} to arrive a little later.`
      : setId === "set-a"
        ? `This is an announcement for employees at ${company}. The maintenance team will inspect the ${place} this Friday morning. Please remove personal items by Thursday evening and contact facilities if you need temporary storage.`
        : `Attention customers of ${company}. The service desk will close at 4 P.M. today while staff install a new appointment system. Customers with urgent requests should use the online form or visit the ${place} tomorrow morning.`;

    const prompts = isConversation
      ? setId === "set-a"
        ? [
            ["What is the speaker preparing for?", "A client presentation", "A staff vacation", "A budget audit", "A product delivery", "A"],
            ["Where is the adapter now?", "In the warehouse", "At the front desk", "Inside the projector case", "At the restaurant", "B"],
            ["What will the speaker probably do next?", "Cancel a meeting", "Call a supplier", "Pick up equipment", "Print invoices", "C"],
          ]
        : [
            ["What changed about the reservation?", "The time", "The price", "The menu", "The speaker", "A"],
            ["Why was the room setup changed?", "A workshop took longer than expected", "A guest canceled a flight", "The projector broke", "The office closed early", "A"],
            ["What will the speaker probably do next?", "Update an invitation", "Inspect a truck", "Order new chairs", "Pay an invoice", "A"],
          ]
      : setId === "set-a"
        ? [
            ["What is the purpose of the announcement?", "To describe a maintenance inspection", "To introduce a new employee", "To advertise a seminar", "To change a menu", "A"],
            ["When should items be removed?", "By Monday morning", "By Thursday evening", "During lunch", "After the inspection", "B"],
            ["Who should employees contact for storage?", "Human resources", "Facilities", "Accounting", "Security", "B"],
          ]
        : [
            ["What is the announcement mainly about?", "A temporary service-desk closure", "A new product launch", "A price increase", "A weather delay", "A"],
            ["Why will the service desk close early?", "Staff will install a new system", "The lobby is being painted", "A manager is traveling", "The cafe is hosting a meeting", "A"],
            ["What are urgent customers advised to do?", "Use the online form", "Wait until next month", "Call the cafeteria", "Pick up a badge", "A"],
          ];

    Array.from({ length: questionsPerGroup }, (_, localIndex) => prompts[localIndex % prompts.length]).forEach((item, localIndex) => {
      result.push({
        id: `${setId}-p${part}-${group}-${localIndex + 1}`,
        setId,
        part,
        section: "listening",
        prompt: item[0],
        audioScript: script,
        choices: choices([
          ["A", item[1]],
          ["B", item[2]],
          ["C", item[3]],
          ["D", item[4]],
        ]),
        answer: item[5] as ChoiceId,
        explanation: "ฟังบริบทโดยรวมก่อน แล้วจับข้อมูลเฉพาะ เช่น จุดประสงค์ เหตุผล เวลา สถานที่ และสิ่งที่ผู้พูดจะทำต่อ",
      });
    });
  }
  return result;
}

function buildPart5(setId: SetId): Question[] {
  const templates = setId === "set-a"
    ? [
        ["The manager asked the team to submit the proposal _____ noon.", "by", "between", "during", "inside", "A", "by ใช้กับกำหนดส่งหรือ deadline"],
        ["All visitors must wear badges while _____ are in the building.", "they", "them", "their", "theirs", "A", "ตำแหน่งประธานของประโยคย่อยต้องใช้ they"],
        ["The new software is more _____ than the previous version.", "reliable", "reliably", "reliance", "rely", "A", "หลัง more ต้องใช้ adjective เพื่อเปรียบเทียบคุณสมบัติ"],
        ["Please contact Ms. Rivera if you have _____ questions about the schedule.", "any", "each", "much", "every", "A", "questions เป็นคำนามพหูพจน์ ใช้ any ได้เป็นธรรมชาติ"],
        ["The training session was postponed _____ the instructor was ill.", "because", "although", "unless", "despite", "A", "because เชื่อมเหตุผลกับประโยคสมบูรณ์"],
      ]
    : [
        ["The quarterly sales figures were reviewed _____ the board meeting.", "during", "between", "inside", "onto", "A", "during ใช้บอกช่วงเวลาที่เหตุการณ์เกิดขึ้น"],
        ["Employees should submit expense forms _____ than Friday.", "no later", "not late", "latest", "lateness", "A", "no later than เป็นสำนวนแปลว่าไม่เกินวันที่กำหนด"],
        ["The renovated lobby looks _____ than it did last year.", "brighter", "brightly", "brightness", "brighten", "A", "than ต้องใช้รูป comparative adjective"],
        ["The technician explained the problem very _____.", "clearly", "clear", "clearness", "clarify", "A", "ขยายกริยา explained ต้องใช้ adverb"],
        ["Several applicants were invited _____ a second interview.", "for", "at", "of", "beside", "A", "invited for ใช้กับเหตุผล/กิจกรรมที่เชิญไป"],
      ];

  return Array.from({ length: 30 }, (_, index) => {
    const item = templates[index % templates.length];
    return {
      id: `${setId}-p5-${index + 1}`,
      setId,
      part: 5,
      section: "reading",
      prompt: `${item[0]} (${companies[setId][index % companies[setId].length]})`,
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

function buildPart6(setId: SetId): Question[] {
  const result: Question[] = [];
  for (let group = 1; group <= 4; group += 1) {
    const company = companies[setId][group % companies[setId].length];
    const passage = setId === "set-a"
      ? `To all staff,\n\n${company} will update its visitor check-in process next month. Guests will receive a digital badge after confirming their appointment at reception. The change is intended to reduce waiting time and improve building security.\n\nPlease review the short guide before Monday. Department assistants should collect feedback and send it to operations by Wednesday.`
      : `Memo\n\n${company} will begin using reusable shipping containers for local deliveries next quarter. The containers will be collected after each delivery and returned to the warehouse for cleaning. This program should reduce packaging waste and lower supply costs.\n\nTeam leaders should attend a twenty-minute briefing on Tuesday and share the new procedure with their staff.`;
    const items = setId === "set-a"
      ? [
          ["What is being updated?", "The visitor check-in process", "The vacation policy", "The company logo", "The cafeteria menu", "A"],
          ["Why is the change being made?", "To reduce waiting time", "To close the office", "To hire assistants", "To replace all computers", "A"],
          ["Who should collect feedback?", "Department assistants", "New visitors", "Security guards", "Clients", "A"],
          ["When is feedback due?", "By Wednesday", "By next year", "During the weekend", "After the holiday", "A"],
        ]
      : [
          ["What will the company begin using?", "Reusable shipping containers", "New uniforms", "Digital badges", "Updated invoices", "A"],
          ["What is one expected benefit?", "Lower supply costs", "Longer lunch breaks", "More parking spaces", "Earlier store hours", "A"],
          ["Who should attend the briefing?", "Team leaders", "Local customers", "Delivery drivers only", "Receptionists only", "A"],
          ["When is the briefing scheduled?", "On Tuesday", "On Friday evening", "Next quarter", "After each delivery", "A"],
        ];
    items.forEach((item, index) => {
      result.push({
        id: `${setId}-p6-${group}-${index + 1}`,
        setId,
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
        explanation: "อ่านทั้ง passage เพื่อจับว่าใครทำอะไร ทำไปเพื่ออะไร และมี deadline หรือ action item ใดบ้าง",
      });
    });
  }
  return result;
}

function buildPart7(setId: SetId): Question[] {
  const result: Question[] = [];
  const groups = 18;
  for (let group = 1; group <= groups; group += 1) {
    const company = companies[setId][group % companies[setId].length];
    const name = names[setId][group % names[setId].length];
    const passage = setId === "set-a"
      ? `Email\nFrom: ${name}\nTo: Operations Team\nSubject: Updated delivery schedule\n\nThe shipment from ${company} will now arrive at 9:30 A.M. on Tuesday instead of Monday afternoon. The carrier reported that one truck required inspection before leaving the regional center. Please keep the loading area clear and notify the reception desk when the driver arrives.\n\nA revised invoice will be sent after the delivery is confirmed.`
      : `Notice\n\n${company} is expanding its weekday customer-support hours starting next month. The phone line will open at 8 A.M., one hour earlier than the current schedule. This change follows feedback from clients who begin work before regular business hours.\n\nSupervisors will post the revised rotation by Friday. Employees who need to trade shifts should submit a request through the scheduling portal.`;
    const items = setId === "set-a"
      ? [
          ["What is the email mainly about?", "A changed delivery time", "A new hiring plan", "A customer survey", "A cancelled invoice", "A"],
          ["Why was the delivery changed?", "A truck needed inspection", "The office was closed", "The driver was unavailable", "The invoice was incorrect", "A"],
          ["What are employees asked to do?", "Keep the loading area clear", "Prepare lunch orders", "Call every customer", "Replace the reception desk", "A"],
        ]
      : [
          ["What is the notice mainly about?", "Expanded support hours", "A new office address", "A product discount", "A canceled portal", "A"],
          ["Why is the change being made?", "Clients requested earlier support", "Supervisors are traveling", "The phone system failed", "A supplier changed prices", "A"],
          ["What should employees do to trade shifts?", "Submit a request through the portal", "Call every client", "Visit the warehouse", "Send a revised invoice", "A"],
        ];
    items.forEach((item, index) => {
      result.push({
        id: `${setId}-p7-${group}-${index + 1}`,
        setId,
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
        explanation: "คำตอบมาจากรายละเอียดใน notice/email ให้จับ main idea เหตุผล และขั้นตอนที่ผู้อ่านต้องทำ",
      });
    });
  }
  return result;
}

function buildSet(setId: SetId): Question[] {
  return [
    ...buildPart1(setId),
    ...buildPart2(setId),
    ...buildGroupedListening(setId, 3, 13, 3),
    ...buildGroupedListening(setId, 4, 10, 3),
    ...buildPart5(setId),
    ...buildPart6(setId),
    ...buildPart7(setId),
  ];
}

export const allQuestions: Question[] = [...buildSet("set-a"), ...buildSet("set-b")];
