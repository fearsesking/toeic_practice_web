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

type SetId = "set-a" | "set-b" | "set-c";

const choices = (items: [ChoiceId, string][]): Choice[] => items.map(([id, text]) => ({ id, text }));
const choiceId = (index: number) => String.fromCharCode(65 + index) as ChoiceId;

const names = {
  "set-a": ["Mina", "Daniel", "Grace", "Owen", "Nadia", "Leo", "Priya", "Victor", "Hana", "Marco"],
  "set-b": ["Alicia", "Ben", "Carla", "Derek", "Elena", "Felix", "Iris", "Jonah", "Keiko", "Samir"],
  "set-c": ["Lena", "Marcus", "Nora", "Ethan", "Sofia", "Caleb", "Yuna", "Ravi", "Talia", "Noah"],
};

const companies = {
  "set-a": ["Harbor Foods", "Metroline Design", "Northstar Bank", "BrightPath Training", "Cedar Hotel"],
  "set-b": ["Summit Office Supply", "Riverside Events", "Greenline Logistics", "Oak & Stone Cafe", "Pioneer Medical"],
  "set-c": ["BluePeak Consulting", "Maple Travel", "Silverline Fitness", "Westbridge Labs", "Juniper Books"],
};

const places = {
  "set-a": ["conference room", "warehouse", "reception desk", "train station", "copy center", "sales office"],
  "set-b": ["training room", "shipping counter", "hotel lobby", "service desk", "cafeteria", "parking entrance"],
  "set-c": ["main lobby", "storage room", "fitness studio", "research office", "bookshop", "customer lounge"],
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
  "set-c": [
    {
      options: [
        "A man is watering plants by a window.",
        "Several shelves are completely empty.",
        "A package is being weighed on a scale.",
        "The chairs have been placed upside down.",
      ],
      answer: "A",
      alt: "A man watering potted plants beside an office window",
    },
    {
      options: [
        "People are seated around a meeting table.",
        "A sign has been attached to a glass door.",
        "A suitcase is standing next to a bench.",
        "Two workers are unloading a truck.",
      ],
      answer: "A",
      alt: "Several people seated around a meeting table",
    },
    {
      options: [
        "A sign has been attached to a glass door.",
        "A person is typing on a laptop.",
        "A technician is repairing a printer.",
        "Some customers are waiting outside a shop.",
      ],
      answer: "A",
      alt: "A blank notice sign attached to a glass office door",
    },
    {
      options: [
        "A package is being weighed on a scale.",
        "A woman is arranging folders on a desk.",
        "A man is pointing at a screen.",
        "The tables are covered with tablecloths.",
      ],
      answer: "A",
      alt: "A package being weighed on a shipping counter scale",
    },
    {
      options: [
        "The chairs have been placed upside down.",
        "A ladder is leaning against a wall.",
        "A worker is carrying a tray through a hallway.",
        "Several boxes are stacked near a doorway.",
      ],
      answer: "A",
      alt: "Chairs placed upside down on tables in a clean office lounge",
    },
    {
      options: [
        "Several shelves are completely empty.",
        "Two people are reviewing a chart together.",
        "A woman is paying at a register.",
        "A vehicle is parked beside a loading dock.",
      ],
      answer: "A",
      alt: "Empty shelving units in a warehouse aisle",
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
  const stemsBySet: Record<SetId, string[][]> = {
    "set-a": [
      ["When will the budget report be ready?", "By Thursday afternoon.", "In the accounting folder.", "Because the price changed.", "A"],
      ["Who is meeting the new client today?", "The conference room is upstairs.", "Sofia from marketing.", "It starts at ten.", "B"],
      ["Could you reserve a larger table?", "Sure, I will call the restaurant.", "The table is made of wood.", "No, I did not read it.", "A"],
      ["Where should I leave these invoices?", "At the end of the month.", "In the tray beside the scanner.", "They were approved yesterday.", "B"],
      ["Why was the shipment delayed?", "The storm closed the highway.", "At the loading entrance.", "Twenty cartons arrived.", "A"],
    ],
    "set-b": [
      ["How often is the staff newsletter sent?", "Every Friday morning.", "In the break room.", "Because it was revised.", "A"],
      ["Where can I pick up my visitor badge?", "At the front desk.", "The guest arrived early.", "For about two hours.", "A"],
      ["Who approved the travel request?", "Ms. Patel did.", "The flight leaves at six.", "In the online calendar.", "A"],
      ["Would you like me to print the agenda?", "Yes, ten copies, please.", "It is on the second floor.", "The printer was purchased last year.", "A"],
      ["Why is the cafe closing early today?", "The staff has a training session.", "At the corner table.", "No, I ordered tea.", "A"],
    ],
    "set-c": [
      ["When does the orientation begin?", "At nine o'clock.", "In the training folder.", "Because the room is ready.", "A"],
      ["Who can update the reservation?", "The event coordinator can.", "It was moved yesterday.", "On the third floor.", "A"],
      ["Could you send me the revised contract?", "Of course, I will email it today.", "The contract is very long.", "No, the meeting was canceled.", "A"],
      ["Where is the supply cabinet?", "Next to the copy room.", "For three weeks.", "The supplies were ordered online.", "A"],
      ["Why did the manager call the supplier?", "To confirm the delivery date.", "At the front entrance.", "No, she prefers coffee.", "A"],
    ],
  };
  const stems = stemsBySet[setId];

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
    const conversationScripts: Record<SetId, string> = {
      "set-a": `${speaker}: Good morning. I am checking whether the projector in the ${place} is ready for today's client presentation.\nManager: It was tested this morning, but the adapter is at the front desk.\n${speaker}: Great. I will pick it up before the visitors from ${company} arrive.`,
      "set-b": `${speaker}: I noticed the reservation for the ${place} was moved to 2 P.M.\nCoordinator: Yes, the morning workshop ran longer than expected, so we changed the room setup.\n${speaker}: Thanks. I will update the invitation and ask ${company} to arrive a little later.`,
      "set-c": `${speaker}: The printer in the ${place} is out of color ink again.\nAssistant: I ordered replacement cartridges from ${company}, and they should arrive this afternoon.\n${speaker}: Perfect. I will print the handouts after lunch and leave them at reception.`,
    };
    const talkScripts: Record<SetId, string> = {
      "set-a": `This is an announcement for employees at ${company}. The maintenance team will inspect the ${place} this Friday morning. Please remove personal items by Thursday evening and contact facilities if you need temporary storage.`,
      "set-b": `Attention customers of ${company}. The service desk will close at 4 P.M. today while staff install a new appointment system. Customers with urgent requests should use the online form or visit the ${place} tomorrow morning.`,
      "set-c": `Welcome to ${company}'s product demonstration. The session will begin in the ${place} at 10 A.M. After the presentation, guests may ask questions and pick up information packets near the exit.`,
    };
    const script = isConversation ? conversationScripts[setId] : talkScripts[setId];

    const conversationPrompts: Record<SetId, string[][]> = {
      "set-a": [
        ["What is the speaker preparing for?", "A client presentation", "A staff vacation", "A budget audit", "A product delivery", "A"],
        ["Where is the adapter now?", "In the warehouse", "At the front desk", "Inside the projector case", "At the restaurant", "B"],
        ["What will the speaker probably do next?", "Cancel a meeting", "Call a supplier", "Pick up equipment", "Print invoices", "C"],
      ],
      "set-b": [
        ["What changed about the reservation?", "The time", "The price", "The menu", "The speaker", "A"],
        ["Why was the room setup changed?", "A workshop took longer than expected", "A guest canceled a flight", "The projector broke", "The office closed early", "A"],
        ["What will the speaker probably do next?", "Update an invitation", "Inspect a truck", "Order new chairs", "Pay an invoice", "A"],
      ],
      "set-c": [
        ["What problem does the speaker mention?", "The printer needs color ink", "The handouts were lost", "The reception desk is closed", "The meeting room is too small", "A"],
        ["When should the cartridges arrive?", "This afternoon", "Tomorrow morning", "Next week", "Before breakfast", "A"],
        ["What will the speaker probably do after lunch?", "Print the handouts", "Cancel the demonstration", "Call reception", "Move the printer", "A"],
      ],
    };
    const talkPrompts: Record<SetId, string[][]> = {
      "set-a": [
        ["What is the purpose of the announcement?", "To describe a maintenance inspection", "To introduce a new employee", "To advertise a seminar", "To change a menu", "A"],
        ["When should items be removed?", "By Monday morning", "By Thursday evening", "During lunch", "After the inspection", "B"],
        ["Who should employees contact for storage?", "Human resources", "Facilities", "Accounting", "Security", "B"],
      ],
      "set-b": [
        ["What is the announcement mainly about?", "A temporary service-desk closure", "A new product launch", "A price increase", "A weather delay", "A"],
        ["Why will the service desk close early?", "Staff will install a new system", "The lobby is being painted", "A manager is traveling", "The cafe is hosting a meeting", "A"],
        ["What are urgent customers advised to do?", "Use the online form", "Wait until next month", "Call the cafeteria", "Pick up a badge", "A"],
      ],
      "set-c": [
        ["What is the talk mainly about?", "A product demonstration", "A building inspection", "A delayed flight", "A staff retirement", "A"],
        ["When will the session begin?", "At 10 A.M.", "At 4 P.M.", "After lunch", "Next Friday", "A"],
        ["What can guests do after the presentation?", "Pick up information packets", "Reserve a hotel room", "Return shipping containers", "Submit expense reports", "A"],
      ],
    };
    const prompts = isConversation ? conversationPrompts[setId] : talkPrompts[setId];

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
  const templatesBySet: Record<SetId, string[][]> = {
    "set-a": [
      ["The manager asked the team to submit the proposal _____ noon.", "by", "between", "during", "inside", "A", "by ใช้กับกำหนดส่งหรือ deadline"],
      ["All visitors must wear badges while _____ are in the building.", "they", "them", "their", "theirs", "A", "ตำแหน่งประธานของประโยคย่อยต้องใช้ they"],
      ["The new software is more _____ than the previous version.", "reliable", "reliably", "reliance", "rely", "A", "หลัง more ต้องใช้ adjective เพื่อเปรียบเทียบคุณสมบัติ"],
      ["Please contact Ms. Rivera if you have _____ questions about the schedule.", "any", "each", "much", "every", "A", "questions เป็นคำนามพหูพจน์ ใช้ any ได้เป็นธรรมชาติ"],
      ["The training session was postponed _____ the instructor was ill.", "because", "although", "unless", "despite", "A", "because เชื่อมเหตุผลกับประโยคสมบูรณ์"],
    ],
    "set-b": [
      ["The quarterly sales figures were reviewed _____ the board meeting.", "during", "between", "inside", "onto", "A", "during ใช้บอกช่วงเวลาที่เหตุการณ์เกิดขึ้น"],
      ["Employees should submit expense forms _____ than Friday.", "no later", "not late", "latest", "lateness", "A", "no later than เป็นสำนวนแปลว่าไม่เกินวันที่กำหนด"],
      ["The renovated lobby looks _____ than it did last year.", "brighter", "brightly", "brightness", "brighten", "A", "than ต้องใช้รูป comparative adjective"],
      ["The technician explained the problem very _____.", "clearly", "clear", "clearness", "clarify", "A", "ขยายกริยา explained ต้องใช้ adverb"],
      ["Several applicants were invited _____ a second interview.", "for", "at", "of", "beside", "A", "invited for ใช้กับเหตุผล/กิจกรรมที่เชิญไป"],
    ],
    "set-c": [
      ["The online catalog will be updated _____ the store closes tonight.", "after", "among", "onto", "despite", "A", "after ใช้บอกลำดับเวลาเมื่อสิ่งหนึ่งเกิดหลังอีกสิ่งหนึ่ง"],
      ["Ms. Chen gave a _____ explanation of the new refund policy.", "clear", "clearly", "clearness", "clarify", "A", "หน้าคำนาม explanation ต้องใช้ adjective"],
      ["The marketing team is responsible _____ preparing the brochure.", "for", "with", "at", "by", "A", "responsible for เป็น collocation ที่ใช้บ่อย"],
      ["The replacement parts arrived _____ than expected.", "earlier", "early", "earliest", "earliness", "A", "than ต้องใช้รูป comparative"],
      ["Please read the instructions _____ before assembling the display.", "carefully", "careful", "care", "caring", "A", "ขยายกริยา read ต้องใช้ adverb"],
    ],
  };
  const templates = templatesBySet[setId];

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
    const passages: Record<SetId, string> = {
      "set-a": `To all staff,\n\n${company} will update its visitor check-in process next month. Guests will receive a digital badge after confirming their appointment at reception. The change is intended to reduce waiting time and improve building security.\n\nPlease review the short guide before Monday. Department assistants should collect feedback and send it to operations by Wednesday.`,
      "set-b": `Memo\n\n${company} will begin using reusable shipping containers for local deliveries next quarter. The containers will be collected after each delivery and returned to the warehouse for cleaning. This program should reduce packaging waste and lower supply costs.\n\nTeam leaders should attend a twenty-minute briefing on Tuesday and share the new procedure with their staff.`,
      "set-c": `Notice to employees\n\n${company} will replace the lighting in the customer lounge over the weekend. The work will begin after closing on Friday and should be finished by Sunday afternoon. The new lights are expected to reduce energy use and make the area brighter for visitors.\n\nEmployees should remove personal items from the lounge before Friday evening.`,
    };
    const itemsBySet: Record<SetId, string[][]> = {
      "set-a": [
        ["What is being updated?", "The visitor check-in process", "The vacation policy", "The company logo", "The cafeteria menu", "A"],
        ["Why is the change being made?", "To reduce waiting time", "To close the office", "To hire assistants", "To replace all computers", "A"],
        ["Who should collect feedback?", "Department assistants", "New visitors", "Security guards", "Clients", "A"],
        ["When is feedback due?", "By Wednesday", "By next year", "During the weekend", "After the holiday", "A"],
      ],
      "set-b": [
        ["What will the company begin using?", "Reusable shipping containers", "New uniforms", "Digital badges", "Updated invoices", "A"],
        ["What is one expected benefit?", "Lower supply costs", "Longer lunch breaks", "More parking spaces", "Earlier store hours", "A"],
        ["Who should attend the briefing?", "Team leaders", "Local customers", "Delivery drivers only", "Receptionists only", "A"],
        ["When is the briefing scheduled?", "On Tuesday", "On Friday evening", "Next quarter", "After each delivery", "A"],
      ],
      "set-c": [
        ["What will be replaced?", "The lounge lighting", "The visitor badges", "The delivery trucks", "The company website", "A"],
        ["When will the work begin?", "After closing on Friday", "On Monday morning", "Before lunch today", "Next month", "A"],
        ["What is one expected benefit?", "Reduced energy use", "Longer business hours", "More storage space", "Faster invoices", "A"],
        ["What should employees do?", "Remove personal items from the lounge", "Call all customers", "Attend a product seminar", "Update the online catalog", "A"],
      ],
    };
    const passage = passages[setId];
    const items = itemsBySet[setId];
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
    const passages: Record<SetId, string> = {
      "set-a": `Email\nFrom: ${name}\nTo: Operations Team\nSubject: Updated delivery schedule\n\nThe shipment from ${company} will now arrive at 9:30 A.M. on Tuesday instead of Monday afternoon. The carrier reported that one truck required inspection before leaving the regional center. Please keep the loading area clear and notify the reception desk when the driver arrives.\n\nA revised invoice will be sent after the delivery is confirmed.`,
      "set-b": `Notice\n\n${company} is expanding its weekday customer-support hours starting next month. The phone line will open at 8 A.M., one hour earlier than the current schedule. This change follows feedback from clients who begin work before regular business hours.\n\nSupervisors will post the revised rotation by Friday. Employees who need to trade shifts should submit a request through the scheduling portal.`,
      "set-c": `Email\nFrom: ${name}\nTo: Store Team\nSubject: Weekend display update\n\n${company} will introduce a new window display this Saturday morning. The design team will arrive at 7 A.M. with posters, shelves, and sample products. Please move the current display materials to the storage room before closing on Friday.\n\nThe store will open at the regular time after the installation is complete.`,
    };
    const itemsBySet: Record<SetId, string[][]> = {
      "set-a": [
        ["What is the email mainly about?", "A changed delivery time", "A new hiring plan", "A customer survey", "A cancelled invoice", "A"],
        ["Why was the delivery changed?", "A truck needed inspection", "The office was closed", "The driver was unavailable", "The invoice was incorrect", "A"],
        ["What are employees asked to do?", "Keep the loading area clear", "Prepare lunch orders", "Call every customer", "Replace the reception desk", "A"],
      ],
      "set-b": [
        ["What is the notice mainly about?", "Expanded support hours", "A new office address", "A product discount", "A canceled portal", "A"],
        ["Why is the change being made?", "Clients requested earlier support", "Supervisors are traveling", "The phone system failed", "A supplier changed prices", "A"],
        ["What should employees do to trade shifts?", "Submit a request through the portal", "Call every client", "Visit the warehouse", "Send a revised invoice", "A"],
      ],
      "set-c": [
        ["What is the email mainly about?", "A new window display", "A delayed shipment", "A customer complaint", "A staff newsletter", "A"],
        ["When will the design team arrive?", "At 7 A.M. on Saturday", "At noon on Friday", "After the store opens", "Next Monday morning", "A"],
        ["What should employees do before closing Friday?", "Move current display materials", "Print revised invoices", "Call the design team", "Order sample products", "A"],
      ],
    };
    const passage = passages[setId];
    const items = itemsBySet[setId];
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

export const allQuestions: Question[] = [...buildSet("set-a"), ...buildSet("set-b"), ...buildSet("set-c")];
