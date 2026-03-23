/**
 * Seed script: imports Template.xlsx feedback data into the SQLite database.
 * Run with: node scripts/seed-excel.mjs
 */

import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const XLSX = require("../node_modules/xlsx/xlsx.js");
const { PrismaClient } = require("../node_modules/@prisma/client/index.js");

const db = new PrismaClient({ log: ["error"] });

// ── Elective ID mapping ────────────────────────────────────────────────────────
// Maps subject name (partial / normalised) → electiveId
const SUBJECT_TO_ID = {
  "Hedge Fund Strategies":                                  { id: "f4",   area: "Finance & Accounting",    abbr: "HFS",     name: "Hedge Fund Strategies",                                          faculty: "Prof. Ashish Pandey" },
  "Communication beyond Boundaries":                        { id: "c5",   area: "Communication",           abbr: "CBB",     name: "Communication beyond Boundaries",                                faculty: "Prof. Payal Mehra" },
  "Creative and Nudge Thinking for Transforming Systems":   { id: "gm2",  area: "General Management",      abbr: "CNTTS",   name: "Creative and Nudge Thinking for Transforming Systems",           faculty: "Prof. Sushil Kumar" },
  "Experiential Learning":                                  { id: "gm1",  area: "General Management",      abbr: "EL",      name: "Experiential Learning (Himalayan Mountain Challenge)",           faculty: "Prof. Sushil Kumar" },
  "Business onBoard":                                       { id: "gm4",  area: "General Management",      abbr: "BOB",     name: "Business onBoard",                                               faculty: "Prof. Mrityunjay Tiwary" },
  "Service Operations Management":                          { id: "om2",  area: "Operations Management",   abbr: "SOM",     name: "Service Operations Management",                                  faculty: "Prof. Sushil Kumar / Prof. OS Vaidya" },
  "Operations Strategy":                                    { id: "om9",  area: "Operations Management",   abbr: "OS",      name: "Operations Strategy",                                            faculty: "Prof. Rahul Pandey" },
  "Platform Operations in Sharing Economy":                 { id: "om11", area: "Operations Management",   abbr: "POSE",    name: "Platform Operations in Sharing Economy",                         faculty: "Prof. Arvind Shroff" },
  "Bottom of Pyramid":                                      { id: "mk14", area: "Marketing",               abbr: "BOP&RM",  name: "Bottom of Pyramid & Rural Marketing",                           faculty: "Prof. Rajesh Aithal" },
  "Integrated Marketing Communication":                     { id: "mk12", area: "Marketing",               abbr: "IMC",     name: "Integrated Marketing Communication",                             faculty: "Prof. Sushant Kumar" },
  "Workshop AI in Mktg":                                    { id: "mk18", area: "Marketing",               abbr: "WOAM",    name: "Workshop: AI in Marketing",                                      faculty: "Prof. Sumit Singh" },
  "Business Data Communication":                            { id: "it2",  area: "IT & Systems",            abbr: "BDC",     name: "Business Data Communication",                                    faculty: "Prof. Arunabha Mukhopadhyay" },
  "Digital Transformation and Artificial Intelligence":     { id: "it1",  area: "IT & Systems",            abbr: "DTAI",    name: "Digital Transformation and Artificial Intelligence",             faculty: "Prof. Amit Agrahari & Prof. Ashwani Kumar" },
  "Ecosystems and Connected Technologies":                  { id: "it4",  area: "IT & Systems",            abbr: "ECT",     name: "Ecosystems and Connected Technologies",                          faculty: "Prof. Ashutosh Jha" },
  "Managing IT Consulting Practice":                        { id: "it9",  area: "IT & Systems",            abbr: "MICP",    name: "Managing IT Consulting Practice",                                faculty: "Prof. Sridhar Srinivasan" },
  "Responsible Artificial Intelligence":                    { id: "it8",  area: "IT & Systems",            abbr: "RAI",     name: "Responsible Artificial Intelligence",                            faculty: "Prof. Rajesh Natrajan" },
  "ESG":                                                    { id: "bs2",  area: "Business Sustainability",  abbr: "ESGMR",   name: "ESG: Management and Reporting",                                  faculty: "Prof. Ashish Aggarwal" },
  "Employee Relations":                                     { id: "hr3",  area: "HR Management",           abbr: "ER",      name: "Employee Relations",                                             faculty: "Prof. Girish Balasubramanian" },
  "Building Inclusive Organizations":                       { id: "hr5",  area: "HR Management",           abbr: "BIO",     name: "Building Inclusive Organizations",                               faculty: "Prof. Girish Balasubramanian & Prof. Pavni Kaushiva" },
  "HRM in Practice":                                        { id: "hr6",  area: "HR Management",           abbr: "HRMP",    name: "HRM in Practice",                                                faculty: "Prof. Ajay Singh" },
};

/** Find the elective info by matching subject name to a key */
function matchElective(subject) {
  // Strip surrounding quotes (some entries have them)
  const cleaned = subject.replace(/^[""\u201C\u201D]+|[""\u201C\u201D]+$/g, "").trim();
  for (const [key, val] of Object.entries(SUBJECT_TO_ID)) {
    if (cleaned.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return null;
}

/** Normalise demand values from Excel to DB enum */
function normaliseDemand(raw) {
  if (!raw) return null;
  const s = raw.toString().trim();
  if (/very\s*high/i.test(s)) return "Very High";
  if (/very\s*low/i.test(s))  return "Very Low";
  if (/high/i.test(s))        return "High";
  if (/medium/i.test(s))      return "Medium";
  if (/low/i.test(s))         return "Low";
  return null;
}

/** Normalise Yes/No */
function normaliseRec(raw) {
  if (!raw) return null;
  const s = raw.toString().trim().toLowerCase();
  if (s === "yes") return "Yes";
  if (s === "no")  return "No";
  return null;
}

async function main() {
  const xlsxPath = path.resolve(__dirname, "../temp screenshots/Template.xlsx");
  const wb = XLSX.readFile(xlsxPath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

  console.log(`\n📋 Found ${rows.length} rows in Template.xlsx\n`);

  let inserted = 0;
  let skipped  = 0;

  for (const row of rows) {
    const subject    = row["Subject"] ?? "";
    const elective   = matchElective(subject);

    if (!elective) {
      console.warn(`  ⚠  Could not match subject: "${subject}" — skipping`);
      skipped++;
      continue;
    }

    const contentRating  = Number(row["Overall Course Rating (1-5, 1 being lowest)"]) || 1;
    const effortRequired = Number(row["Level of Effort Required (1-5, 1 being lowest)"]) || 1;
    const biddingRaw     = row["Bidding Points utilised"];
    const biddingPoints  = biddingRaw !== "" && biddingRaw !== null ? Number(biddingRaw) : null;

    const overallCourseRating = (row["General Feedback"] ?? "").toString().trim() || "(No feedback provided)";
    const professorQuality    = (row["Professor Quality"] ?? "").toString().trim() || "(No feedback provided)";
    const courseEvaluation    = (row["Course Evaluation"] ?? "").toString().trim() || "(No feedback provided)";
    const learningOutcome     = (row["Learning Outcomes"] ?? "").toString().trim() || "(No feedback provided)";
    const courseDemand        = normaliseDemand(row["Course Demand (High / Medium / Low) - from bidding POV"]);
    const recommended         = normaliseRec(row["Recommended? Yes / No"]);

    await db.feedback.create({
      data: {
        electiveId:          elective.id,
        electiveName:        elective.name,
        electiveAbbr:        elective.abbr,
        electiveArea:        elective.area,
        faculty:             elective.faculty,
        contentRating,
        effortRequired,
        courseDemand,
        biddingPoints,
        recommended,
        overallCourseRating,
        professorQuality,
        courseEvaluation,
        learningOutcome,
      },
    });

    console.log(`  ✓  [${elective.id}] ${elective.name}`);
    inserted++;
  }

  console.log(`\n✅  Done — inserted ${inserted} records, skipped ${skipped}.\n`);
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
