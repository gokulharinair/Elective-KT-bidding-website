export type TermKey = "IV" | "V" | "VI";

export type AreaKey =
  | "Strategy"
  | "ABM"
  | "Finance & Accounting"
  | "Communication"
  | "General Management"
  | "Decision Science"
  | "Operations Management"
  | "Business Environment"
  | "Marketing"
  | "IT & Systems"
  | "Business Sustainability"
  | "HR Management";

export interface Elective {
  id: string;
  area: AreaKey;
  name: string;
  abbr: string;
  credits: number;
  sections: number;
  faculty: string;
  terms: TermKey[];
}

export const AREAS: AreaKey[] = [
  "Strategy", "ABM", "Finance & Accounting", "Communication",
  "General Management", "Decision Science", "Operations Management",
  "Business Environment", "Marketing", "IT & Systems",
  "Business Sustainability", "HR Management",
];

export const AREA_ACCENT: Record<AreaKey, string> = {
  "Strategy":              "#1a1a2e",
  "ABM":                   "#0a1f0a",
  "Finance & Accounting":  "#0d1b2a",
  "Communication":         "#1a0533",
  "General Management":    "#1f0a0a",
  "Decision Science":      "#1a1408",
  "Operations Management": "#0a0a1f",
  "Business Environment":  "#0f1a10",
  "Marketing":             "#1f0f0a",
  "IT & Systems":          "#08131f",
  "Business Sustainability":"#091a09",
  "HR Management":         "#1a0a1a",
};

export const electives: Elective[] = [
  // ── Strategy ──────────────────────────────────────────────────────────────
  { id: "s1",  area: "Strategy", name: "Mergers and Acquisition Strategy",                                           abbr: "M&AS",       credits: 1,   sections: 2, faculty: "Prof. Ashutosh K Sinha",                         terms: ["IV", "VI"] },
  { id: "s2",  area: "Strategy", name: "Technology and Innovation in Digital Platform Business Model",               abbr: "TIDPBM",     credits: 1,   sections: 2, faculty: "Prof. KC Balodi",                                terms: ["IV"] },
  { id: "s3",  area: "Strategy", name: "Strategic Alliances",                                                        abbr: "Strat.All",  credits: 1,   sections: 1, faculty: "Prof. Dhirendra Mani Shukla",                    terms: ["IV"] },
  { id: "s4",  area: "Strategy", name: "Strategic Management of New Ventures",                                       abbr: "SMNV",       credits: 1,   sections: 2, faculty: "Prof. Sabyasachi Sinha",                         terms: ["IV"] },
  { id: "s5",  area: "Strategy", name: "Managing Global Business: Market and Non Market Strategies",                 abbr: "MGB",        credits: 1,   sections: 1, faculty: "Prof. Kshitij Awasthi",                          terms: ["IV"] },
  { id: "s6",  area: "Strategy", name: "Corporate Entrepreneurship & Innovation",                                    abbr: "CEI",        credits: 1,   sections: 1, faculty: "Prof. Sabyasachi Sinha",                         terms: ["V"] },
  { id: "s7",  area: "Strategy", name: "Business Planning for International Markets: Japan",                         abbr: "BPIM-J",     credits: 1,   sections: 1, faculty: "Prof. D. Krishna Sundar",                        terms: ["IV", "V"] },

  // ── ABM ───────────────────────────────────────────────────────────────────
  { id: "a1",  area: "ABM", name: "Marketing Models in Agribusiness",                                                abbr: "MMAB",       credits: 1,   sections: 1, faculty: "Prof. KB Gupta",                                 terms: ["IV"] },
  { id: "a2",  area: "ABM", name: "Rural Marketing",                                                                 abbr: "RUMA",       credits: 1,   sections: 2, faculty: "Prof. MK Awasthi",                               terms: ["IV"] },
  { id: "a3",  area: "ABM", name: "Business Models of Agri-Business Finance",                                        abbr: "BMAF",       credits: 1,   sections: 1, faculty: "Prof. Sanjeev Kapoor / Prof. Kushankur Dey",     terms: ["IV"] },
  { id: "a4",  area: "ABM", name: "Agri-input Marketing",                                                            abbr: "AIM",        credits: 1,   sections: 2, faculty: "Prof. Sanjeev Kapoor",                           terms: ["IV"] },
  { id: "a5",  area: "ABM", name: "Consumer Behaviour for Food Products and Services",                               abbr: "CBFPS",      credits: 1,   sections: 1, faculty: "Prof. KB Gupta",                                 terms: ["V"] },
  { id: "a6",  area: "ABM", name: "Financial Inclusion and Microfinance",                                            abbr: "FIMF",       credits: 1,   sections: 1, faculty: "Prof. Sanjeev Kapoor & Prof. Pradeep Mishra",    terms: ["V"] },
  { id: "a7",  area: "ABM", name: "Agricultural Commodity Derivative Market",                                        abbr: "ACDM",       credits: 1,   sections: 1, faculty: "Prof. Kushankur Dey",                            terms: ["V"] },
  { id: "a8",  area: "ABM", name: "Procurement of Agri Commodities for Retail and Food Processing Industries",       abbr: "PACRFPI",    credits: 1,   sections: 1, faculty: "Prof. Sanjeev Kapoor & Prof. Niraj Kumar",       terms: ["V"] },
  { id: "a9",  area: "ABM", name: "Sustainable Food and Agribusiness Systems",                                       abbr: "SFABS",      credits: 1,   sections: 1, faculty: "Prof. Sushil Kumar",                             terms: ["V"] },
  { id: "a10", area: "ABM", name: "Strategic Food Marketing",                                                        abbr: "SFM",        credits: 1,   sections: 1, faculty: "Prof. KB Gupta",                                 terms: ["V"] },
  { id: "a11", area: "ABM", name: "Contemporary Strategic Issues in Food and Agribusiness Management",               abbr: "CSIFA",      credits: 1,   sections: 1, faculty: "Prof. Sushil Kumar",                             terms: ["VI"] },
  { id: "a12", area: "ABM", name: "Innovation Management in Agribusiness",                                           abbr: "IMAB",       credits: 1,   sections: 1, faculty: "Prof. Niraj Kumar",                              terms: ["VI"] },
  { id: "a13", area: "ABM", name: "Quality and Food Marketing",                                                      abbr: "QFM",        credits: 1,   sections: 1, faculty: "Dr. Hari Prakash",                               terms: ["VI"] },

  // ── Finance & Accounting ──────────────────────────────────────────────────
  { id: "f1",  area: "Finance & Accounting", name: "Corporate Valuation & Restructuring",                            abbr: "CVR",        credits: 1,   sections: 2, faculty: "Prof. Ajay Kumar Garg",                          terms: ["IV"] },
  { id: "f2",  area: "Finance & Accounting", name: "Financial Derivatives and Risk Management",                      abbr: "FDRM",       credits: 1,   sections: 1, faculty: "Prof. Alok Dixit",                               terms: ["IV"] },
  { id: "f3",  area: "Finance & Accounting", name: "Financial Statement Analysis",                                   abbr: "FSA",        credits: 1,   sections: 1, faculty: "Prof. Seshadev Sahoo",                           terms: ["IV"] },
  { id: "f4",  area: "Finance & Accounting", name: "Hedge Fund Strategies",                                          abbr: "HFS",        credits: 1,   sections: 1, faculty: "Prof. Ashish Pandey",                            terms: ["IV"] },
  { id: "f5",  area: "Finance & Accounting", name: "Investment Analysis and Portfolio Management",                   abbr: "IAPM",       credits: 1,   sections: 2, faculty: "Prof. Madhusudan Karmakar",                      terms: ["IV"] },
  { id: "f6",  area: "Finance & Accounting", name: "Algorithmic Investing",                                          abbr: "Algo.Invt.", credits: 0.5, sections: 1, faculty: "Mr. Kislay Upadhyay",                            terms: ["V"] },
  { id: "f7",  area: "Finance & Accounting", name: "Behavioral Finance",                                             abbr: "Beh.Fin",    credits: 0.5, sections: 2, faculty: "Prof. Madhumita Chakraborty",                    terms: ["V"] },
  { id: "f8",  area: "Finance & Accounting", name: "Fintech",                                                        abbr: "Fin.Tech",   credits: 1,   sections: 1, faculty: "Prof. Jalaj Pathak",                             terms: ["V"] },
  { id: "f9",  area: "Finance & Accounting", name: "Fixed Income Markets",                                           abbr: "FIM",        credits: 1,   sections: 1, faculty: "Prof. S. Sowmya",                                terms: ["V"] },
  { id: "f10", area: "Finance & Accounting", name: "Private Equity and Venture Capital",                             abbr: "PE&VC",      credits: 1,   sections: 1, faculty: "Prof. Prakash Singh",                            terms: ["V"] },
  { id: "f11", area: "Finance & Accounting", name: "Quantitative Applications in Finance",                           abbr: "QAF",        credits: 1,   sections: 1, faculty: "Adjunct Faculty",                                terms: ["V"] },
  { id: "f12", area: "Finance & Accounting", name: "International Finance",                                          abbr: "IF",         credits: 1,   sections: 2, faculty: "Prof. Madhumita Chakraborty",                    terms: ["VI"] },
  { id: "f13", area: "Finance & Accounting", name: "Investment Banking and Financial Services",                       abbr: "IBFS",       credits: 1,   sections: 1, faculty: "Prof. AK Mishra",                                terms: ["VI"] },
  { id: "f14", area: "Finance & Accounting", name: "Investment Management and Personal Finance",                     abbr: "IMPF",       credits: 1,   sections: 2, faculty: "Prof. Mrityunjay Tiwary",                        terms: ["VI"] },
  { id: "f15", area: "Finance & Accounting", name: "Real Estate Finance and Investment",                             abbr: "RSFI",       credits: 1,   sections: 1, faculty: "Prof. Ashish Pandey",                            terms: ["VI"] },

  // ── Communication ─────────────────────────────────────────────────────────
  { id: "c1",  area: "Communication", name: "Leadership Through Literature",                                          abbr: "LTL",        credits: 1,   sections: 1, faculty: "Prof. Neerja Pande",                             terms: ["V"] },
  { id: "c2",  area: "Communication", name: "Advance Oral Communication",                                             abbr: "AOC",        credits: 1,   sections: 1, faculty: "Prof. Neerja Pande",                             terms: ["V"] },
  { id: "c3",  area: "Communication", name: "Consulting Communication",                                               abbr: "Con.Com",    credits: 1,   sections: 1, faculty: "Prof. Ranjan Kumar",                             terms: ["V"] },
  { id: "c4",  area: "Communication", name: "Visual Communication for Businesses",                                    abbr: "VCB",        credits: 1,   sections: 2, faculty: "Prof. Shubhda Arora",                            terms: ["VI"] },
  { id: "c5",  area: "Communication", name: "Communication beyond Boundaries",                                        abbr: "CBB",        credits: 1,   sections: 1, faculty: "Prof. Payal Mehra",                              terms: ["VI"] },

  // ── General Management ────────────────────────────────────────────────────
  { id: "gm1", area: "General Management", name: "Experiential Learning (Himalayan Mountain Challenge)",              abbr: "EL",         credits: 0.5, sections: 2, faculty: "Prof. Sushil Kumar",                             terms: ["IV", "V"] },
  { id: "gm2", area: "General Management", name: "Creative and Nudge Thinking for Transforming Systems",              abbr: "CNTTS",      credits: 1,   sections: 1, faculty: "Prof. Sushil Kumar",                             terms: ["IV"] },
  { id: "gm3", area: "General Management", name: "Wisdom of Indian Philosophy",                                       abbr: "WIP",        credits: 0.5, sections: 1, faculty: "Prof. Anadi Pande",                              terms: ["VI"] },
  { id: "gm4", area: "General Management", name: "Business onBoard",                                                  abbr: "BOB",        credits: 1,   sections: 1, faculty: "Prof. Mrityunjay Tiwary",                        terms: ["VI"] },
  { id: "gm5", area: "General Management", name: "Management of Public Affairs and Public Policy",                    abbr: "MPAPP",      credits: 0.5, sections: 1, faculty: "Prof. Dipti Gupta",                              terms: ["VI"] },

  // ── Decision Science ──────────────────────────────────────────────────────
  { id: "ds1", area: "Decision Science", name: "Performance Evaluation and Modelling in Business",                    abbr: "PE&MB",      credits: 1,   sections: 2, faculty: "Prof. Sanjeet Singh & Prof. Utsav Pandey",       terms: ["IV"] },
  { id: "ds2", area: "Decision Science", name: "Game Theory for Managers",                                            abbr: "GTM",        credits: 1,   sections: 2, faculty: "Prof. Sonia Goel",                               terms: ["V"] },

  // ── Operations Management ─────────────────────────────────────────────────
  { id: "om1", area: "Operations Management", name: "Supply Chain Analytics and Simulation",                          abbr: "SCAS",       credits: 1,   sections: 3, faculty: "Prof. Yash Daultani",                            terms: ["IV"] },
  { id: "om2", area: "Operations Management", name: "Service Operations Management",                                  abbr: "SOM",        credits: 1,   sections: 2, faculty: "Prof. Sushil Kumar / Prof. OS Vaidya",           terms: ["IV"] },
  { id: "om3", area: "Operations Management", name: "Revenue Management and Dynamic Pricing",                         abbr: "RMDP",       credits: 1,   sections: 3, faculty: "Prof. Suresh Jakhar / Prof. Himanshu Rathore",   terms: ["IV"] },
  { id: "om4", area: "Operations Management", name: "Quality Management and Six Sigma",                               abbr: "QMSS",       credits: 1,   sections: 1, faculty: "Prof. OS Vaidya",                                terms: ["V"] },
  { id: "om5", area: "Operations Management", name: "Supply Chain Cross-functional Management",                       abbr: "SCMCFP",     credits: 1,   sections: 2, faculty: "Prof. Suresh Jakhar & Prof. Himanshu Rathore",   terms: ["V"] },
  { id: "om6", area: "Operations Management", name: "Project Management",                                             abbr: "PM",         credits: 1,   sections: 2, faculty: "Prof. Sushil Kumar / Prof. L Ganapathy",         terms: ["V"] },
  { id: "om7", area: "Operations Management", name: "Retail and Ecommerce Operations",                                abbr: "RECO",       credits: 1,   sections: 2, faculty: "Prof. Rakesh V",                                 terms: ["V"] },
  { id: "om8", area: "Operations Management", name: "Healthcare Operations Management",                               abbr: "HCOM",       credits: 1,   sections: 2, faculty: "Prof. S. Venkataramanaiah",                      terms: ["VI"] },
  { id: "om9", area: "Operations Management", name: "Operations Strategy",                                            abbr: "OS",         credits: 1,   sections: 2, faculty: "Prof. Rahul Pandey",                             terms: ["VI"] },
  { id: "om10",area: "Operations Management", name: "Supply Chain Risk and Performance Management",                   abbr: "SCRPM",      credits: 1,   sections: 2, faculty: "Prof. Divya Choudhary",                          terms: ["VI"] },
  { id: "om11",area: "Operations Management", name: "Platform Operations in Sharing Economy",                         abbr: "POSE",       credits: 1,   sections: 1, faculty: "Prof. Arvind Shroff",                            terms: ["VI"] },

  // ── Business Environment ──────────────────────────────────────────────────
  { id: "be1", area: "Business Environment", name: "Economics of the Firm",                                           abbr: "ETF",        credits: 1,   sections: 1, faculty: "Prof. Kartik Yadav",                             terms: ["V"] },

  // ── Marketing ─────────────────────────────────────────────────────────────
  { id: "mk1", area: "Marketing", name: "Consumer Behaviour",                                                         abbr: "CB",         credits: 1,   sections: 4, faculty: "Prof. Anirban Chakraborty / Prof. Sushant Kumar",  terms: ["IV"] },
  { id: "mk2", area: "Marketing", name: "Applied Marketing Strategy",                                                 abbr: "AMS",        credits: 1,   sections: 2, faculty: "Prof. Rajeev Kumra",                             terms: ["IV"] },
  { id: "mk3", area: "Marketing", name: "Strategic Marketing in Health Sector",                                       abbr: "SMHS",       credits: 0.5, sections: 2, faculty: "Prof. Vishakha Chauhan",                         terms: ["IV"] },
  { id: "mk4", area: "Marketing", name: "Customer Relationship Management",                                           abbr: "CRM",        credits: 1,   sections: 1, faculty: "Prof. Satyabhushan Dash",                        terms: ["IV"] },
  { id: "mk5", area: "Marketing", name: "Advance Marketing Research",                                                 abbr: "AMR",        credits: 1,   sections: 1, faculty: "Prof. Satyabhushan Dash",                        terms: ["IV"] },
  { id: "mk6", area: "Marketing", name: "Pricing Strategy",                                                           abbr: "Pric.Strat.",credits: 1,   sections: 2, faculty: "Prof. Prem Prakash Dewani",                      terms: ["IV"] },
  { id: "mk7", area: "Marketing", name: "Product Management",                                                         abbr: "Prod.Mgt.",  credits: 0.5, sections: 2, faculty: "Prof. Anita Goyal",                              terms: ["V"] },
  { id: "mk8", area: "Marketing", name: "Digital and Omnichannel Marketing — Strategy and Application",               abbr: "DOMSA",      credits: 1,   sections: 1, faculty: "Prof. Ashish Dubey",                             terms: ["V"] },
  { id: "mk9", area: "Marketing", name: "Promotional Strategy",                                                       abbr: "PS",         credits: 1,   sections: 1, faculty: "Prof. Nilam Kinra",                              terms: ["V"] },
  { id: "mk10",area: "Marketing", name: "Services Marketing",                                                         abbr: "Ser.Mkt.",   credits: 0.5, sections: 2, faculty: "Prof. Anirban Chakraborty",                      terms: ["V"] },
  { id: "mk11",area: "Marketing", name: "Business to Business Marketing",                                             abbr: "B2BM",       credits: 1,   sections: 2, faculty: "Prof. Priyanka Sharma",                          terms: ["V"] },
  { id: "mk12",area: "Marketing", name: "Integrated Marketing Communication",                                         abbr: "IMC",        credits: 1,   sections: 1, faculty: "Prof. Sushant Kumar",                            terms: ["V"] },
  { id: "mk13",area: "Marketing", name: "Sales & Distribution Management: A Multichannel Approach",                   abbr: "SDM",        credits: 1,   sections: 2, faculty: "Prof. Rajesh Aithal",                            terms: ["V"] },
  { id: "mk14",area: "Marketing", name: "Bottom of Pyramid & Rural Marketing",                                        abbr: "BOP&RM",     credits: 1,   sections: 1, faculty: "Prof. Rajesh Aithal",                            terms: ["V"] },
  { id: "mk15",area: "Marketing", name: "Digital Marketing: Tools, Techniques & Trends",                              abbr: "Digi.Mkt.",  credits: 1,   sections: 2, faculty: "Prof. Sampa Anupurba Pahi",                      terms: ["VI"] },
  { id: "mk16",area: "Marketing", name: "Strategic Brand Management",                                                 abbr: "SBM",        credits: 1,   sections: 2, faculty: "Prof. Krishnan Jeesha",                          terms: ["VI"] },
  { id: "mk17",area: "Marketing", name: "Political Marketing",                                                        abbr: "POM",        credits: 1,   sections: 1, faculty: "Prof. Satyabhushan Dash",                        terms: ["VI"] },
  { id: "mk18",area: "Marketing", name: "Workshop: AI in Marketing",                                                  abbr: "WOAM",       credits: 0.5, sections: 2, faculty: "Prof. Sumit Singh",                              terms: ["VI"] },

  // ── IT & Systems ──────────────────────────────────────────────────────────
  { id: "it1", area: "IT & Systems", name: "Digital Transformation and Artificial Intelligence",                      abbr: "DTAI",       credits: 1,   sections: 2, faculty: "Prof. Amit Agrahari & Prof. Ashwani Kumar",       terms: ["IV"] },
  { id: "it2", area: "IT & Systems", name: "Business Data Communication",                                             abbr: "BDC",        credits: 1,   sections: 2, faculty: "Prof. Arunabha Mukhopadhyay",                    terms: ["IV"] },
  { id: "it3", area: "IT & Systems", name: "Agile Product and Project Management",                                    abbr: "APPM",       credits: 1,   sections: 2, faculty: "Prof. VS Prakash Attili",                        terms: ["IV"] },
  { id: "it4", area: "IT & Systems", name: "Ecosystems and Connected Technologies",                                   abbr: "ECT",        credits: 1,   sections: 2, faculty: "Prof. Ashutosh Jha",                             terms: ["IV"] },
  { id: "it5", area: "IT & Systems", name: "Big Data Analytics",                                                      abbr: "BDA",        credits: 1,   sections: 2, faculty: "Prof. Pradeep Kumar",                            terms: ["V"] },
  { id: "it6", area: "IT & Systems", name: "Managing Autonomous and Agentic Organization",                            abbr: "BAO",        credits: 1,   sections: 2, faculty: "Prof. Amit Agrahari & Prof. Sridhar Srinivasan", terms: ["V"] },
  { id: "it7", area: "IT & Systems", name: "Enterprise Information Technology Risk Management",                       abbr: "EITRM",      credits: 1,   sections: 2, faculty: "Prof. Arunabha Mukhopadhyay",                    terms: ["VI"] },
  { id: "it8", area: "IT & Systems", name: "Responsible Artificial Intelligence",                                     abbr: "RAI",        credits: 0.5, sections: 2, faculty: "Prof. Rajesh Natrajan",                          terms: ["VI"] },
  { id: "it9", area: "IT & Systems", name: "Managing IT Consulting Practice",                                         abbr: "MICP",       credits: 0.5, sections: 2, faculty: "Prof. Sridhar Srinivasan",                       terms: ["VI"] },

  // ── Business Sustainability ────────────────────────────────────────────────
  { id: "bs1", area: "Business Sustainability", name: "Stakeholder Management and Corporate Social Responsibility",   abbr: "SM&CSR",     credits: 1,   sections: 1, faculty: "Prof. Ashish Aggarwal",                          terms: ["IV"] },
  { id: "bs2", area: "Business Sustainability", name: "ESG: Management and Reporting",                                abbr: "ESGMR",      credits: 1,   sections: 3, faculty: "Prof. Ashish Aggarwal / Prof. Kaushik Ranjan Bandyopadhyay / Prof. Priyanshu Gupta", terms: ["IV"] },

  // ── HR Management ─────────────────────────────────────────────────────────
  { id: "hr1", area: "HR Management", name: "Performance and Compensation Management",                                abbr: "PACM",       credits: 1,   sections: 1, faculty: "Prof. Sumant Bishwas",                           terms: ["IV"] },
  { id: "hr2", area: "HR Management", name: "Managing Change and Negotiation",                                        abbr: "MCN",        credits: 0.5, sections: 2, faculty: "Prof. Anjali Bansal",                            terms: ["IV"] },
  { id: "hr3", area: "HR Management", name: "Employee Relations",                                                     abbr: "ER",         credits: 0.5, sections: 2, faculty: "Prof. Girish Balasubramanian",                   terms: ["IV"] },
  { id: "hr4", area: "HR Management", name: "Happiness and Leadership",                                               abbr: "HL",         credits: 0.5, sections: 2, faculty: "Prof. Bhumika Mehta",                            terms: ["IV"] },
  { id: "hr5", area: "HR Management", name: "Building Inclusive Organizations",                                       abbr: "BIO",        credits: 1,   sections: 2, faculty: "Prof. Girish Balasubramanian & Prof. Pavni Kaushiva", terms: ["V"] },
  { id: "hr6", area: "HR Management", name: "HRM in Practice",                                                        abbr: "HRMP",       credits: 1,   sections: 2, faculty: "Prof. Ajay Singh",                               terms: ["V"] },
  { id: "hr7", area: "HR Management", name: "Strategic Business Negotiation",                                         abbr: "SBN",        credits: 1,   sections: 1, faculty: "Prof. Pushpendra Priyadarshi & Prof. Jayant Krishna", terms: ["V"] },
  { id: "hr8", area: "HR Management", name: "Human Relations",                                                        abbr: "HR",         credits: 1,   sections: 3, faculty: "Prof. Nishat Uppal",                             terms: ["VI"] },
  { id: "hr9", area: "HR Management", name: "HR Analytics",                                                           abbr: "HRA",        credits: 0.5, sections: 1, faculty: "Prof. Sumant Bishwas",                           terms: ["VI"] },
];

// ─── Slug utilities ───────────────────────────────────────────────────────────
export function areaToSlug(area: AreaKey): string {
  return area
    .toLowerCase()
    .replace(/[\s&]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function slugToArea(slug: string): AreaKey | undefined {
  return AREAS.find((a) => areaToSlug(a) === slug);
}

export const AREA_DESCRIPTIONS: Record<AreaKey, string> = {
  "Strategy":              "Corporate strategy, competitive dynamics, and long-term value creation frameworks.",
  "ABM":                   "Agribusiness management, rural markets, and supply chain for agricultural sectors.",
  "Finance & Accounting":  "Valuation, financial modelling, investment analysis, and capital markets.",
  "Communication":         "Business writing, presentations, negotiations, and cross-cultural communication.",
  "General Management":    "Leadership, entrepreneurship, organisational behaviour, and managerial effectiveness.",
  "Decision Science":      "Quantitative methods, analytics, optimisation, and data-driven decision making.",
  "Operations Management": "Supply chain, process design, quality management, and lean operations.",
  "Business Environment":  "Macroeconomics, public policy, regulatory frameworks, and global business context.",
  "Marketing":             "Consumer behaviour, brand management, digital marketing, and market research.",
  "IT & Systems":          "Information systems, digital transformation, ERP, and technology strategy.",
  "Business Sustainability":"ESG, CSR, sustainable business models, and responsible management practices.",
  "HR Management":         "Talent acquisition, performance management, OD, and people analytics.",
};
