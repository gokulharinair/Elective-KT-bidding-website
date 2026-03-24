import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const require = createRequire(import.meta.url);
const XLSX = require(path.join(root, 'node_modules/xlsx/xlsx.js'));
const { PrismaClient } = require(path.join(root, 'node_modules/@prisma/client/index.js'));

const prisma = new PrismaClient();

// ── Area mapping from Excel → DB ──────────────────────────────────────────────
const AREA_MAP = {
  'F&A':                    'Finance & Accounting',
  'Finance & Accounting':   'Finance & Accounting',
  'Communication':          'Communication',
  'General Management':     'General Management',
  'Operations Management':  'Operations Management',
  'Marketing':              'Marketing',
  'IT & Systems':           'IT & Systems',
  'Business Sustainability':'Business Sustainability',
  'HRM':                    'HR Management',
  'HR Management':          'HR Management',
  'Strategy':               'Strategy',
  'Decision Sciences':      'Decision Science',
  'Decision Science':       'Decision Science',
  'Business Environment':   'Business Environment',
  'ABM':                    'ABM',
};

// ── Course name → { id, abbr } ────────────────────────────────────────────────
const COURSE_MAP = {
  'Hedge Fund Strategies':                                    { id: 'f4',   abbr: 'HFS'       },
  'Hedge Fund Strategies (B+ in FRA and MANAC)':             { id: 'f4',   abbr: 'HFS'       },
  'Communication beyond Boundaries':                          { id: 'c5',   abbr: 'CBB'       },
  'Creative and Nudge Thinking for Transforming Systems':     { id: 'gm2',  abbr: 'CNTTS'     },
  'Experiential Learning (Himalayan Mountain Challenge)':     { id: 'gm1',  abbr: 'EL'        },
  'Business onBoard':                                         { id: 'gm4',  abbr: 'BOB'       },
  'Service Operations Management':                            { id: 'om2',  abbr: 'SOM'       },
  'Operations Strategy':                                      { id: 'om9',  abbr: 'OS'        },
  'Platform Operations in Sharing Economy':                   { id: 'om11', abbr: 'POSE'      },
  'Bottom of Pyramid & Rural Marketing':                      { id: 'mk14', abbr: 'BOP&RM'    },
  'Integrated Marketing Communication':                       { id: 'mk12', abbr: 'IMC'       },
  'Workshop AI in Mktg':                                      { id: 'mk18', abbr: 'WOAM'      },
  'Business Data Communication':                              { id: 'it2',  abbr: 'BDC'       },
  'Digital Transformation and Artificial Intelligence':       { id: 'it1',  abbr: 'DTAI'      },
  'Ecosystems and Connected Technologies':                    { id: 'it4',  abbr: 'ECT'       },
  'Managing IT Consulting Practice':                          { id: 'it9',  abbr: 'MICP'      },
  'Responsible Artificial Intelligence':                      { id: 'it8',  abbr: 'RAI'       },
  'ESG: Management and Reporting':                            { id: 'bs2',  abbr: 'ESGMR'     },
  'Experiential Learning':                                    { id: 'gm1',  abbr: 'EL'        },
  'Employee Relations':                                       { id: 'hr3',  abbr: 'ER'        },
  'Building Inclusive Organizations':                         { id: 'hr5',  abbr: 'BIO'       },
  'HRM in Practice':                                          { id: 'hr6',  abbr: 'HRMP'      },
  'Mergers and Acquisition Strategy':                         { id: 's1',   abbr: 'M&AS'      },
  'Leadership Through Literature':                            { id: 'c1',   abbr: 'LTL'       },
  'Advance Oral Communication':                               { id: 'c2',   abbr: 'AOC'       },
  'Visual Communication for Businesses':                      { id: 'c4',   abbr: 'VCB'       },
  'Wisdom of Indian Philosophy':                              { id: 'gm3',  abbr: 'WIP'       },
  'Game Theory for Managers':                                 { id: 'ds2',  abbr: 'GTM'       },
  'Revenue Management and Dynamic Pricing':                   { id: 'om3',  abbr: 'RMDP'      },
  'Quality Management and Six Sigma':                         { id: 'om4',  abbr: 'QMSS'      },
  'Supply Chain Cross-functional Management':                 { id: 'om5',  abbr: 'SCMCFP'    },
  'Supply Chain Risk and Performance Management':             { id: 'om10', abbr: 'SCRPM'     },
  'Economics of the Firm':                                    { id: 'be1',  abbr: 'ETF'       },
  'Consumer Behaviour':                                       { id: 'mk1',  abbr: 'CB'        },
  'Product Management (Pre Mid-Term)':                        { id: 'mk7',  abbr: 'Prod.Mgt.' },
  'Strategic Brand Management':                               { id: 'mk16', abbr: 'SBM'       },
  'Human Relations':                                          { id: 'hr8',  abbr: 'HR'        },
};

// ── Read Excel ────────────────────────────────────────────────────────────────
const wb = XLSX.readFile(path.join(root, 'temp screenshots/Template (1).xlsx'));
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

// Clear existing seeded data
await prisma.feedback.deleteMany({});
console.log('Cleared existing feedback records.');
console.log(`Found ${rows.length} rows in Excel`);

// ── Map & seed ────────────────────────────────────────────────────────────────
let created = 0, skipped = 0;

for (const row of rows) {
  const subject   = String(row['Subject'] || '').trim();
  const area      = String(row['Area'] || '').trim();
  const professor     = String(row['Professor'] || row['Professor Quality'] || '').trim();
  const genFeedbackRaw = String(row['General Feedback'] || '').trim();
  const courseEval    = String(row['Course Evaluation'] || '').trim();
  const learningOut   = String(row['Learning Outcomes'] || '').trim();
  const rating        = Number(row['Overall Course Rating (1-5, 1 being lowest)'] || row['Overall Course Rating (1-5)'] || 0);
  const effort        = Number(row['Level of Effort Required (1-5, 1 being lowest)'] || row['Level of Effort Required (1-5)'] || 0);
  const biddingRaw    = row['Bidding Points utilised'] ?? row['Bidding Points'];
  const biddingPoints = (biddingRaw !== '' && biddingRaw != null) ? Number(biddingRaw) : null;
  const recommended   = String(row['Recommended? Yes / No'] || row['Recommended? Yes/No'] || row['Recommended?'] || '').trim() || null;

  // Course demand column: rows 21–35 accidentally have feedback text here instead of demand level
  const demandRaw = String(row['Course Demand (High / Medium / Low) - from bidding POV'] || row['Course Demand (High/Medium/Low)'] || '').trim();
  const validDemandLevels = new Set(['Very High', 'High', 'Medium', 'Low', 'Very Low']);
  const demand = validDemandLevels.has(demandRaw) ? demandRaw : null;
  // Use demand column text as feedback if General Feedback is empty (data entry error in rows 21–35)
  const genFeedback = genFeedbackRaw || (!validDemandLevels.has(demandRaw) ? demandRaw : '');

  if (!subject) { skipped++; continue; }

  // Clean subject: strip leading ##, surrounding quotes, trailing parentheticals with "Modified"/"Previously"
  const cleanSubject = subject
    .replace(/^#+\s*/, '')           // ##Consumer Behaviour → Consumer Behaviour
    .replace(/^[\u201C""]|[\u201D""]$/g, '')  // smart/curly quotes around ESG entry
    .replace(/\s*\(Modified course title\)\s*/i, '')
    .replace(/\s*\(Previously known as.*$/i, '')
    .replace(/\s*\(B\+.*\)\s*/i, '')
    .replace(/\s*\(through[^)]*\)\s*/i, '')
    .trim();

  const course = COURSE_MAP[subject] || COURSE_MAP[cleanSubject];
  if (!course) {
    console.warn(`  ⚠ No course mapping for: "${subject}" (cleaned: "${cleanSubject}")`);
    skipped++;
    continue;
  }

  const mappedArea = AREA_MAP[area] || area;

  await prisma.feedback.create({
    data: {
      electiveId:          course.id,
      electiveName:        subject,
      electiveAbbr:        course.abbr,
      electiveArea:        mappedArea,
      faculty:             professor || 'Faculty',
      contentRating:       rating || 0,
      effortRequired:      effort || 3,
      courseDemand:        demand,
      biddingPoints:       biddingPoints,
      recommended:         recommended,
      overallCourseRating: genFeedback  || 'No feedback provided.',
      professorQuality:    professor,
      courseEvaluation:    courseEval   || 'No evaluation provided.',
      learningOutcome:     learningOut  || 'No learning outcomes provided.',
    },
  });
  console.log(`  ✓ ${subject}`);
  created++;
}

console.log(`\nDone. Created: ${created}, Skipped: ${skipped}`);
await prisma.$disconnect();
