# TOEIC Practice Lab

เว็บฝึกทำข้อสอบ TOEIC Listening & Reading สำหรับ deploy บน Vercel แบบ static-first สร้างด้วย Next.js, TypeScript และ Tailwind CSS

## Features

- โหมด `จำลองสอบจริง`: ทำข้อสอบครบ 200 ข้อ พร้อมจับเวลา 120 นาที และดูคะแนนหลังส่งข้อสอบ
- โหมด `ฝึกทีละข้อ`: สุ่มโจทย์จาก pool แล้วกดดูเฉลยได้ทันที
- โหมด `คลังข้อสอบ`: ดูข้อสอบทั้งหมด แยกตาม part
- Pool ข้อสอบ original 3 ชุด รวม 600 ข้อ
- รูปภาพ Part 1 แบบ generated/original จำนวน 18 รูป
- คะแนนประมาณการเต็ม 990 แยก Listening / Reading
- เก็บคำตอบใน `localStorage` ไม่ต้องใช้ backend หรือ database
- Responsive UI โทนขาว-ส้ม ใช้งานได้ทั้ง desktop และ mobile

## Content And Copyright

ข้อสอบและรูปภาพในโปรเจกต์นี้เป็น original/generated content ที่สร้างขึ้นใหม่เพื่อการฝึกซ้อมตามรูปแบบ TOEIC Listening & Reading ไม่ได้คัดลอกจากข้อสอบจริงของ ETS หรือหนังสือเตรียมสอบที่มีลิขสิทธิ์

คะแนนที่แสดงเป็นคะแนนประมาณการเพื่อฝึกซ้อมเท่านั้น ไม่ใช่ official ETS score

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vitest

## Getting Started

ติดตั้ง dependencies:

```powershell
npm.cmd install
```

รัน development server:

```powershell
npm.cmd run dev -- -p 3000
```

เปิดเว็บที่:

```text
http://localhost:3000
```

## Scripts

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

## Deploy To Vercel

1. Push repository นี้ขึ้น GitHub
2. เข้า Vercel แล้วเลือก `Add New...` > `Project`
3. Import GitHub repo
4. ใช้ค่า default สำหรับ Next.js:
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: เว้นว่างไว้
5. กด `Deploy`

โปรเจกต์นี้ตั้งค่า `output: "export"` ใน `next.config.ts` จึง build เป็น static export ได้

## Project Structure

```text
app/              หน้าเว็บและ global styles
lib/              data model, exam pool, scoring, session helpers
public/images/    รูปภาพ static สำหรับข้อสอบ Part 1
tests/            data validation และ unit tests
```

## Notes

- Listening ใน V1 มีรูป Part 1 แล้ว แต่ Part 2-4 ยังใช้ transcript/script placeholder เพื่อให้เติมไฟล์เสียงจริงภายหลังได้
- ถ้ามี conversion table ที่ได้รับอนุญาตให้ใช้ สามารถปรับ logic ได้ที่ `lib/scoring.ts`
- ถ้าต้องเพิ่มชุดข้อสอบใหม่ ให้เพิ่ม data ตาม type ใน `lib/types.ts` และตรวจด้วย `npm.cmd test`
