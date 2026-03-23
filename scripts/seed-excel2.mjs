/**
 * Seed script: imports Template (1).xlsx rows 20-34 (new entries only).
 * Run with: node scripts/seed-excel2.mjs
 *
 * NOTE: Rows 0-19 are duplicates of Template.xlsx already seeded.
 * For rows 20-34, the "Course Demand" column mistakenly contains the full
 * feedback text; we store it as overallCourseRating. courseDemand = null.
 */

import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const XLSX = require("../node_modules/xlsx/xlsx.js");
const { PrismaClient } = require("../node_modules/@prisma/client/index.js");

const db = new PrismaClient({ log: ["error"] });

// ── Elective ID mapping (rows 20-34) ─────────────────────────────────────────
const SUBJECT_TO_ELECTIVE = [
  { match: "Mergers and Acquisition Strategy",        id: "s1",   area: "Strategy",               abbr: "M&AS",    name: "Mergers and Acquisition Strategy",                    faculty: "Prof. Ashutosh K Sinha" },
  { match: "Leadership Through Literature",           id: "c1",   area: "Communication",           abbr: "LTL",     name: "Leadership Through Literature",                       faculty: "Prof. Neerja Pande" },
  { match: "Advance Oral Communication",              id: "c2",   area: "Communication",           abbr: "AOC",     name: "Advance Oral Communication",                          faculty: "Prof. Neerja Pande" },
  { match: "Visual Communication for Businesses",    id: "c4",   area: "Communication",           abbr: "VCB",     name: "Visual Communication for Businesses",                 faculty: "Prof. Shubhda Arora" },
  { match: "Wisdom of Indian Philosophy",             id: "gm3",  area: "General Management",      abbr: "WIP",     name: "Wisdom of Indian Philosophy",                         faculty: "Prof. Anadi Pande" },
  { match: "Game Theory for Managers",                id: "ds2",  area: "Decision Science",        abbr: "GTM",     name: "Game Theory for Managers",                            faculty: "Prof. Sonia Goel" },
  { match: "Revenue Management and Dynamic Pricing",  id: "om3",  area: "Operations Management",   abbr: "RMDP",    name: "Revenue Management and Dynamic Pricing",              faculty: "Prof. Suresh Jakhar / Prof. Himanshu Rathore" },
  { match: "Quality Management and Six Sigma",        id: "om4",  area: "Operations Management",   abbr: "QMSS",    name: "Quality Management and Six Sigma",                    faculty: "Prof. OS Vaidya" },
  { match: "Supply Chain Cross-functional",           id: "om5",  area: "Operations Management",   abbr: "SCMCFP",  name: "Supply Chain Cross-functional Management",             faculty: "Prof. Suresh Jakhar & Prof. Himanshu Rathore" },
  { match: "Supply Chain Risk and Performance",       id: "om10", area: "Operations Management",   abbr: "SCRPM",   name: "Supply Chain Risk and Performance Management",        faculty: "Prof. Divya Choudhary" },
  { match: "Economics of the Firm",                   id: "be1",  area: "Business Environment",    abbr: "ETF",     name: "Economics of the Firm",                               faculty: "Prof. Kartik Yadav" },
  { match: "Consumer Behaviour",                      id: "mk1",  area: "Marketing",               abbr: "CB",      name: "Consumer Behaviour",                                  faculty: "Prof. Anirban Chakraborty / Prof. Sushant Kumar" },
  { match: "Product Management",                      id: "mk7",  area: "Marketing",               abbr: "Prod.Mgt.", name: "Product Management",                               faculty: "Prof. Anita Goyal" },
  { match: "Strategic Brand Management",              id: "mk16", area: "Marketing",               abbr: "SBM",     name: "Strategic Brand Management",                          faculty: "Prof. Krishnan Jeesha" },
  { match: "Human Relations",                         id: "hr8",  area: "HR Management",           abbr: "HR",      name: "Human Relations",                                     faculty: "Prof. Nishat Uppal" },
];

function matchElective(subject) {
  const clean = subject.replace(/^#+\s*/, "").trim();
  for (const e of SUBJECT_TO_ELECTIVE) {
    if (clean.toLowerCase().includes(e.match.toLowerCase())) return e;
  }
  return null;
}

function normaliseRec(raw) {
  if (!raw) return null;
  const s = raw.toString().trim().toLowerCase();
  return s === "yes" ? "Yes" : s === "no" ? "No" : null;
}

async function main() {
  const xlsxPath = path.resolve(__dirname, "../temp screenshots/Template (1).xlsx");
  const wb = XLSX.readFile(xlsxPath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

  // Only process rows 20-34 (0-indexed); rows 0-19 already seeded.
  const newRows = rows.slice(20);
  console.log(`\n📋 Processing ${newRows.length} new rows (rows 20–${rows.length - 1})\n`);

  let inserted = 0, skipped = 0;

  for (const row of newRows) {
    const subject  = (row["Subject"] ?? "").toString();
    const elective = matchElective(subject);

    if (!elective) {
      console.warn(`  ⚠  No match for: "${subject}" — skipping`);
      skipped++;
      continue;
    }

    const contentRating  = Number(row["Overall Course Rating (1-5, 1 being lowest)"])  || 1;
    const effortRequired = Number(row["Level of Effort Required (1-5, 1 being lowest)"]) || 1;
    const biddingRaw     = row["Bidding Points utilised"];
    const biddingPoints  = biddingRaw !== "" ? Number(biddingRaw) : null;
    const recommended    = normaliseRec(row["Recommended? Yes / No"]);

    // The "Course Demand" column contains the feedback text for these rows (data was misplaced).
    const feedbackText       = (row["Course Demand (High / Medium / Low) - from bidding POV"] ?? "").toString().trim();
    const professorQuality   = (row["Professor"]       ?? "").toString().trim() || "(Not provided)";
    const courseEvaluation   = (row["Course Evaluation"] ?? "").toString().trim() || "(Not provided)";
    const learningOutcome    = (row["Learning Outcomes"]  ?? "").toString().trim() || "(Not provided)";
    const overallCourseRating = feedbackText || "(No feedback provided)";

    await db.feedback.create({
      data: {
        electiveId:          elective.id,
        electiveName:        elective.name,
        electiveAbbr:        elective.abbr,
        electiveArea:        elective.area,
        faculty:             elective.faculty,
        contentRating,
        effortRequired,
        courseDemand:        null,      // no demand data in these rows
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

  console.log(`\n✅  Done — inserted ${inserted}, skipped ${skipped}.\n`);
  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
