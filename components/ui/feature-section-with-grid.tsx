import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { areaToSlug, type AreaKey } from "@/lib/electives";

interface Feature {
  tag: string;
  title: string;
  description: string;
  area: AreaKey;
  illustration: React.ReactNode;
}

const features: Feature[] = [
  // ── 1. Strategy ── (unchanged: target/bullseye)
  {
    tag: "Area 1", title: "Strategy",
    description: "Corporate strategy, competitive dynamics, and long-term value creation frameworks.",
    area: "Strategy",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        <circle cx="50" cy="40" r="30" stroke="#D9622B" strokeWidth="1" opacity="0.3"/>
        <circle cx="50" cy="40" r="20" stroke="white" strokeWidth="1" opacity="0.45"/>
        <circle cx="50" cy="40" r="10" stroke="#D9622B" strokeWidth="1.5"/>
        <circle cx="50" cy="40" r="3.5" fill="#D9622B"/>
        <line x1="50" y1="6" x2="50" y2="28" stroke="white" strokeWidth="0.8" opacity="0.3"/>
        <line x1="50" y1="52" x2="50" y2="74" stroke="white" strokeWidth="0.8" opacity="0.3"/>
        <line x1="16" y1="40" x2="38" y2="40" stroke="white" strokeWidth="0.8" opacity="0.3"/>
        <line x1="62" y1="40" x2="84" y2="40" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      </svg>
    ),
  },
  // ── 2. ABM ── (unchanged: wheat stalk)
  {
    tag: "Area 2", title: "ABM",
    description: "Agribusiness management, rural markets, and supply chain for agricultural sectors.",
    area: "ABM",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        <line x1="50" y1="72" x2="50" y2="14" stroke="white" strokeWidth="1.5"/>
        <ellipse cx="50" cy="17" rx="4.5" ry="8" fill="#D9622B"/>
        <ellipse cx="42" cy="28" rx="3.5" ry="6.5" fill="#D9622B" opacity="0.85" transform="rotate(-28 42 28)"/>
        <ellipse cx="41" cy="43" rx="3" ry="5.5" fill="#D9622B" opacity="0.5" transform="rotate(-28 41 43)"/>
        <ellipse cx="58" cy="34" rx="3.5" ry="6.5" fill="#D9622B" opacity="0.85" transform="rotate(28 58 34)"/>
        <ellipse cx="59" cy="50" rx="3" ry="5.5" fill="#D9622B" opacity="0.5" transform="rotate(28 59 50)"/>
        <line x1="50" y1="72" x2="42" y2="78" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="50" y1="72" x2="50" y2="79" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="50" y1="72" x2="58" y2="78" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
  // ── 3. Finance ── Indian Rupee symbol + rising bars
  {
    tag: "Area 3", title: "Finance",
    description: "Valuation, financial modelling, investment analysis, and capital markets.",
    area: "Finance & Accounting",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        <circle cx="50" cy="40" r="30" fill="rgba(217,98,43,0.05)" stroke="rgba(217,98,43,0.2)" strokeWidth="1.2"/>
        <circle cx="50" cy="40" r="21" fill="none" stroke="rgba(217,98,43,0.12)" strokeWidth="0.8"/>
        <text x="50" y="53" textAnchor="middle" fontSize="40" fontWeight="900" fill="white" opacity="0.88" fontFamily="system-ui,sans-serif">&#x20B9;</text>
      </svg>
    ),
  },
  // ── 4. Communication ── (unchanged: speech bubbles)
  {
    tag: "Area 4", title: "Communication",
    description: "Business writing, presentations, negotiations, and cross-cultural communication.",
    area: "Communication",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        <rect x="30" y="10" width="50" height="30" rx="8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
        <polygon points="70,40 76,50 62,40" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none"/>
        <circle cx="47" cy="25" r="2" fill="rgba(255,255,255,0.35)"/>
        <circle cx="55" cy="25" r="2" fill="rgba(255,255,255,0.35)"/>
        <circle cx="63" cy="25" r="2" fill="rgba(255,255,255,0.35)"/>
        <rect x="18" y="28" width="50" height="30" rx="8" stroke="#D9622B" strokeWidth="1.5" fill="rgba(217,98,43,0.08)"/>
        <polygon points="30,58 23,68 38,58" stroke="#D9622B" strokeWidth="1.5" fill="none"/>
        <circle cx="33" cy="43" r="2.5" fill="#D9622B"/>
        <circle cx="43" cy="43" r="2.5" fill="#D9622B"/>
        <circle cx="53" cy="43" r="2.5" fill="#D9622B"/>
      </svg>
    ),
  },
  // ── 5. General Management ── Leader speaking to stakeholders
  {
    tag: "Area 5", title: "General Management",
    description: "Leadership, entrepreneurship, organisational behaviour, and managerial effectiveness.",
    area: "General Management",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        {/* Terracotta glow behind centre figure — vertically centred in card */}
        <circle cx="50" cy="44" r="19" fill="rgba(217,98,43,0.12)" stroke="#D9622B" strokeWidth="0.8"/>

        {/* Man far left — 16×22, cy=44 */}
        <image href="/icons/man.png"   x="3"  y="33"   width="16" height="22" style={{filter:"invert(1)", opacity:0.38}}/>
        {/* Woman left — 20×27, cy=44 */}
        <image href="/icons/woman.png" x="18" y="30.5" width="20" height="27" style={{filter:"invert(1)", opacity:0.52}}/>
        {/* Centre woman — 26×34, cy=44, terracotta tint */}
        <image href="/icons/woman.png" x="37" y="27"   width="26" height="34" style={{filter:"invert(1) sepia(1) saturate(4) hue-rotate(345deg)"}}/>
        {/* Woman right — 20×27, cy=44 */}
        <image href="/icons/woman.png" x="62" y="30.5" width="20" height="27" style={{filter:"invert(1)", opacity:0.52}}/>
        {/* Man far right — 16×22, cy=44 */}
        <image href="/icons/man.png"   x="81" y="33"   width="16" height="22" style={{filter:"invert(1)", opacity:0.38}}/>
      </svg>
    ),
  },
  // ── 6. Decision Science ── Game theory payoff matrix
  {
    tag: "Area 6", title: "Decision Science",
    description: "Quantitative methods, analytics, optimisation, and data-driven decision making.",
    area: "Decision Science",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        {/* Outer grid */}
        <rect x="18" y="8" width="64" height="62" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        {/* Column divider */}
        <line x1="50" y1="8" x2="50" y2="70" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8"/>
        {/* Row divider */}
        <line x1="18" y1="39" x2="82" y2="39" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8"/>
        {/* Strategy headers */}
        <text x="34" y="6" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.45)" fontFamily="monospace">C</text>
        <text x="66" y="6" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.45)" fontFamily="monospace">D</text>
        <text x="14" y="27" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.45)" fontFamily="monospace">C</text>
        <text x="14" y="58" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.45)" fontFamily="monospace">D</text>
        {/* Cell (C,C) */}
        <text x="34" y="27" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">3,3</text>
        <text x="34" y="36" textAnchor="middle" fontSize="5" fill="rgba(255,255,255,0.3)" fontFamily="monospace">cooperate</text>
        {/* Cell (C,D) */}
        <text x="66" y="27" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.45)" fontFamily="monospace">0,5</text>
        {/* Cell (D,C) */}
        <text x="34" y="58" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.45)" fontFamily="monospace">5,0</text>
        {/* Cell (D,D) — Nash equilibrium, highlighted */}
        <rect x="50" y="39" width="32" height="31" rx="1" fill="rgba(217,98,43,0.18)" stroke="#D9622B" strokeWidth="1.2"/>
        <text x="66" y="56" textAnchor="middle" fontSize="9" fill="#D9622B" fontFamily="monospace" fontWeight="bold">1,1</text>
        <text x="66" y="66" textAnchor="middle" fontSize="4.5" fill="#D9622B" fontFamily="monospace" opacity="0.8">Nash eq.</text>
        {/* Star marker */}
        <text x="78" y="46" fontSize="7" fill="#D9622B" fontFamily="sans-serif">&#9733;</text>
      </svg>
    ),
  },
  // ── 7. Operations Management ── Factory supply chain / conveyor belt
  {
    tag: "Area 7", title: "Operations Management",
    description: "Supply chain, process design, quality management, and lean operations.",
    area: "Operations Management",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        {/* Factory (left) */}
        <rect x="4" y="32" width="22" height="28" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
        <rect x="8" y="23" width="5" height="11" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
        <rect x="16" y="26" width="5" height="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
        {/* Smoke puffs */}
        <circle cx="10" cy="17" r="2.5" fill="rgba(255,255,255,0.18)" opacity="0.18"/>
        <circle cx="18" cy="19" r="2" fill="rgba(255,255,255,0.12)" opacity="0.12"/>
        {/* Conveyor belt */}
        <line x1="26" y1="50" x2="72" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
        <line x1="26" y1="57" x2="72" y2="57" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
        {[30,38,46,54,62,70].map((x, i) => (
          <circle key={i} cx={x} cy="53" r="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
        ))}
        {/* Boxes on belt */}
        <rect x="30" y="41" width="12" height="9" rx="1.5" fill="rgba(217,98,43,0.8)" stroke="#D9622B" strokeWidth="0.8"/>
        <rect x="50" y="41" width="12" height="9" rx="1.5" fill="rgba(217,98,43,0.5)" stroke="#D9622B" strokeWidth="0.8"/>
        {/* Arrow direction */}
        <polygon points="72,48 72,59 78,53" fill="#D9622B"/>
        {/* Warehouse (right) */}
        <polygon points="72,32 84,24 96,32" fill="none" stroke="#D9622B" strokeWidth="1" opacity="0.8"/>
        <rect x="72" y="32" width="24" height="28" fill="rgba(217,98,43,0.07)" stroke="#D9622B" strokeWidth="1" opacity="0.8"/>
        <rect x="79" y="47" width="10" height="13" fill="rgba(217,98,43,0.2)" stroke="#D9622B" strokeWidth="0.8"/>
      </svg>
    ),
  },
  // ── 8. Business Environment ── IS-LM macroeconomics curve
  {
    tag: "Area 8", title: "Business Environment",
    description: "Macroeconomics, public policy, regulatory frameworks, and global business context.",
    area: "Business Environment",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        {/* Axes */}
        <line x1="12" y1="68" x2="90" y2="68" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        <line x1="12" y1="8" x2="12" y2="68" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        {/* Arrowheads */}
        <polygon points="87,65 87,71 93,68" fill="rgba(255,255,255,0.6)"/>
        <polygon points="9,11 15,11 12,5" fill="rgba(255,255,255,0.6)"/>
        {/* Axis labels */}
        <text x="91" y="71" fontSize="7" fill="rgba(255,255,255,0.55)" fontFamily="serif" fontStyle="italic">Y</text>
        <text x="8" y="9" fontSize="7" fill="rgba(255,255,255,0.55)" fontFamily="serif" fontStyle="italic">i</text>
        {/* IS curve — downward sloping */}
        <path d="M 14 14 Q 40 32 82 65" stroke="white" strokeWidth="1.8" fill="none" opacity="0.75"/>
        <text x="82" y="63" fontSize="7" fill="rgba(255,255,255,0.65)" fontFamily="serif" fontStyle="italic">IS</text>
        {/* LM curve — upward sloping */}
        <path d="M 14 66 Q 42 46 82 14" stroke="#D9622B" strokeWidth="1.8" fill="none"/>
        <text x="82" y="14" fontSize="7" fill="#D9622B" fontFamily="serif" fontStyle="italic">LM</text>
        {/* Equilibrium point (~50, 40) */}
        <circle cx="50" cy="40" r="4.5" fill="#D9622B"/>
        <circle cx="50" cy="40" r="9" fill="none" stroke="#D9622B" strokeWidth="1" opacity="0.35"/>
        {/* Dashed projections */}
        <line x1="50" y1="40" x2="50" y2="68" stroke="rgba(217,98,43,0.4)" strokeWidth="0.9" strokeDasharray="2,2"/>
        <line x1="12" y1="40" x2="50" y2="40" stroke="rgba(217,98,43,0.4)" strokeWidth="0.9" strokeDasharray="2,2"/>
        <text x="48" y="76" fontSize="6" textAnchor="middle" fill="rgba(217,98,43,0.7)" fontFamily="serif">Y*</text>
        <text x="7" y="43" fontSize="6" textAnchor="middle" fill="rgba(217,98,43,0.7)" fontFamily="serif">i*</text>
      </svg>
    ),
  },
  // ── 9. Marketing ── Marketing funnel (AIDA)
  {
    tag: "Area 9", title: "Marketing",
    description: "Consumer behaviour, brand management, digital marketing, and market research.",
    area: "Marketing",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        {/* Layer 1 — Awareness (widest) */}
        <polygon points="6,10 94,10 78,26 22,26" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.9"/>
        <text x="50" y="22" textAnchor="middle" fontSize="4" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif" fontWeight="bold">AWARENESS</text>
        {/* Layer 2 — Interest */}
        <polygon points="22,27 78,27 65,43 35,43" fill="rgba(217,98,43,0.2)" stroke="#D9622B" strokeWidth="0.9" opacity="0.85"/>
        <text x="50" y="39" textAnchor="middle" fontSize="3.6" fill="rgba(255,255,255,0.75)" fontFamily="sans-serif" fontWeight="bold">INTEREST</text>
        {/* Layer 3 — Decision */}
        <polygon points="35,44 65,44 57,58 43,58" fill="rgba(217,98,43,0.38)" stroke="#D9622B" strokeWidth="0.9"/>
        <text x="50" y="53" textAnchor="middle" fontSize="3" fill="rgba(255,255,255,0.85)" fontFamily="sans-serif" fontWeight="bold">DECISION</text>
        {/* Layer 4 — Action (narrowest) */}
        <polygon points="43,59 57,59 54,73 46,73" fill="#D9622B"/>
        <text x="50" y="68" textAnchor="middle" fontSize="2.3" fill="white" fontFamily="sans-serif" fontWeight="bold">ACTION</text>
        {/* Funnel tip arrow */}
        <polygon points="46,74 54,74 50,79" fill="white" opacity="0.75"/>
        {/* People dots above funnel */}
        {[12,24,37,50,63,76,88].map((x, i) => (
          <circle key={i} cx={x} cy="7" r="2.5" fill="rgba(255,255,255,0.25)"/>
        ))}
      </svg>
    ),
  },
  // ── 10. IT & Systems ── AI chip with neural pulse
  {
    tag: "Area 10", title: "IT & Systems",
    description: "Information systems, digital transformation, ERP, and technology strategy.",
    area: "IT & Systems",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        {/* Chip body */}
        <rect x="28" y="18" width="44" height="44" rx="4" fill="rgba(217,98,43,0.1)" stroke="#D9622B" strokeWidth="1.5"/>
        <rect x="34" y="24" width="32" height="32" rx="2" fill="none" stroke="rgba(217,98,43,0.35)" strokeWidth="0.8"/>
        {/* Pins — top */}
        <line x1="37" y1="18" x2="37" y2="11" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="46" y1="18" x2="46" y2="11" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="55" y1="18" x2="55" y2="11" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="63" y1="18" x2="63" y2="11" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        {/* Pins — bottom */}
        <line x1="37" y1="62" x2="37" y2="69" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="46" y1="62" x2="46" y2="69" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="55" y1="62" x2="55" y2="69" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="63" y1="62" x2="63" y2="69" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        {/* Pins — left */}
        <line x1="28" y1="28" x2="21" y2="28" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="28" y1="40" x2="21" y2="40" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="28" y1="52" x2="21" y2="52" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        {/* Pins — right */}
        <line x1="72" y1="28" x2="79" y2="28" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="72" y1="40" x2="79" y2="40" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        <line x1="72" y1="52" x2="79" y2="52" stroke="white" strokeWidth="1.5" opacity="0.65"/>
        {/* Circuit traces */}
        <line x1="36" y1="32" x2="44" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <line x1="44" y1="32" x2="44" y2="37" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <line x1="64" y1="48" x2="56" y2="48" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <line x1="56" y1="48" x2="56" y2="43" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        {/* Central AI core */}
        <circle cx="50" cy="40" r="8" fill="#D9622B"/>
        <circle cx="50" cy="40" r="13" fill="none" stroke="#D9622B" strokeWidth="1" opacity="0.35"/>
        {/* AI label */}
        <text x="50" y="44" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace" fontWeight="bold">AI</text>
      </svg>
    ),
  },
  // ── 11. Business Sustainability ── Greenhouse with plant + CO₂ reduction
  {
    tag: "Area 11", title: "Business Sustainability",
    description: "ESG, CSR, sustainable business models, and responsible management practices.",
    area: "Business Sustainability",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        {/* Sun top-left */}
        <circle cx="16" cy="13" r="6" fill="rgba(217,98,43,0.1)" stroke="rgba(217,98,43,0.45)" strokeWidth="1"/>
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <line key={i}
            x1={16 + Math.cos(angle * Math.PI / 180) * 8.5}
            y1={13 + Math.sin(angle * Math.PI / 180) * 8.5}
            x2={16 + Math.cos(angle * Math.PI / 180) * 11.5}
            y2={13 + Math.sin(angle * Math.PI / 180) * 11.5}
            stroke="rgba(217,98,43,0.4)" strokeWidth="1" strokeLinecap="round"
          />
        ))}
        {/* Ground + rolling hills */}
        <line x1="5" y1="65" x2="95" y2="65" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
        <path d="M5,65 Q22,57 40,65 Q58,72 76,65 L95,65" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.7"/>
        {/* Small turbine — left (x=20) */}
        <line x1="20" y1="65" x2="20" y2="47" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
        <circle cx="20" cy="47" r="1.5" fill="rgba(255,255,255,0.5)"/>
        <line x1="20" y1="47" x2="20" y2="38" stroke="rgba(255,255,255,0.38)" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="20" y1="47" x2="28" y2="53" stroke="rgba(255,255,255,0.38)" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="20" y1="47" x2="12" y2="53" stroke="rgba(255,255,255,0.38)" strokeWidth="1.6" strokeLinecap="round"/>
        {/* Large turbine — centre (x=50), terracotta blades */}
        <line x1="50" y1="65" x2="50" y2="24" stroke="white" strokeWidth="1.8" opacity="0.7"/>
        <circle cx="50" cy="24" r="2.5" fill="white" opacity="0.8"/>
        <line x1="50" y1="24" x2="50" y2="8"  stroke="#D9622B" strokeWidth="3" strokeLinecap="round"/>
        <line x1="50" y1="24" x2="64" y2="35" stroke="#D9622B" strokeWidth="3" strokeLinecap="round"/>
        <line x1="50" y1="24" x2="36" y2="35" stroke="#D9622B" strokeWidth="3" strokeLinecap="round"/>
        {/* Medium turbine — right (x=76) */}
        <line x1="76" y1="65" x2="76" y2="40" stroke="rgba(255,255,255,0.48)" strokeWidth="1.4"/>
        <circle cx="76" cy="40" r="2" fill="rgba(255,255,255,0.6)"/>
        <line x1="76" y1="40" x2="76" y2="29" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="76" y1="40" x2="86" y2="47" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="76" y1="40" x2="66" y2="47" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  // ── 12. HR Management ── Org chart / people analytics
  {
    tag: "Area 12", title: "HR Management",
    description: "Talent acquisition, performance management, OD, and people analytics.",
    area: "HR Management",
    illustration: (
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        {/* Candidate card — left (not selected) */}
        <rect x="4" y="7" width="26" height="34" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <circle cx="17" cy="18" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="rgba(255,255,255,0.06)"/>
        <circle cx="17" cy="16" r="2" fill="rgba(255,255,255,0.22)"/>
        <path d="M12 22 C12 20 14 19 17 19 C20 19 22 20 22 22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none"/>
        <line x1="8" y1="27" x2="26" y2="27" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
        <line x1="8" y1="31" x2="24" y2="31" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
        <line x1="8" y1="35" x2="26" y2="35" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
        {/* Candidate card — center (selected) */}
        <rect x="37" y="4" width="26" height="36" rx="2" fill="rgba(217,98,43,0.1)" stroke="#D9622B" strokeWidth="1.2"/>
        <circle cx="50" cy="16" r="6" stroke="#D9622B" strokeWidth="1" fill="rgba(217,98,43,0.15)"/>
        <circle cx="50" cy="14" r="2.2" fill="#D9622B" opacity="0.7"/>
        <path d="M44.5 19.5 C44.5 17.5 47 16.5 50 16.5 C53 16.5 55.5 17.5 55.5 19.5" stroke="#D9622B" strokeWidth="0.8" fill="rgba(217,98,43,0.08)"/>
        <line x1="41" y1="26" x2="59" y2="26" stroke="rgba(217,98,43,0.25)" strokeWidth="0.7"/>
        <line x1="41" y1="30" x2="57" y2="30" stroke="rgba(217,98,43,0.25)" strokeWidth="0.7"/>
        <path d="M42 36 L47 39.5 L57 30" stroke="#D9622B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Candidate card — right (pending) */}
        <rect x="70" y="7" width="26" height="34" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <circle cx="83" cy="18" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="rgba(255,255,255,0.06)"/>
        <circle cx="83" cy="16" r="2" fill="rgba(255,255,255,0.22)"/>
        <path d="M78 22 C78 20 80 19 83 19 C86 19 88 20 88 22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none"/>
        <line x1="74" y1="27" x2="92" y2="27" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
        <line x1="74" y1="31" x2="90" y2="31" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
        <line x1="74" y1="35" x2="92" y2="35" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
        {/* Performance metrics bar chart */}
        <line x1="14" y1="73" x2="86" y2="73" stroke="rgba(217,98,43,0.2)" strokeWidth="0.8"/>
        <rect x="17" y="63" width="8" height="10" rx="1" fill="rgba(217,98,43,0.3)"/>
        <rect x="29" y="58" width="8" height="15" rx="1" fill="rgba(217,98,43,0.48)"/>
        <rect x="41" y="51" width="8" height="22" rx="1" fill="#D9622B"/>
        <rect x="53" y="55" width="8" height="18" rx="1" fill="rgba(217,98,43,0.55)"/>
        <rect x="65" y="61" width="8" height="12" rx="1" fill="rgba(217,98,43,0.32)"/>
      </svg>
    ),
  },
];

function Feature() {
  return (
    <div className="w-full py-8 lg:py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex gap-4 flex-col items-center text-center">
            <Badge
              variant="outline"
              className="border-[#0C0C0C] text-[#0C0C0C] uppercase tracking-widest text-[11px] font-semibold rounded-full px-3 py-1"
            >
              Knowledge Base
            </Badge>
            <div className="flex gap-2 flex-col items-center">
              <h2
                className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold text-center text-[#0C0C0C]"
                style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.035em", lineHeight: 1.08 }}
              >
                Everything you need to bid smarter.
              </h2>
              <p
                className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-center"
                style={{ color: "#767676", lineHeight: 1.75 }}
              >
                Browse all 12 elective areas — course content, professor quality, teaching environment, and bidding demand, all in one place.
              </p>
            </div>
          </div>

          {/* 12-card grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={`/areas/${areaToSlug(feature.area)}`}
                className="flex flex-col gap-2 group cursor-pointer no-underline"
              >
                <div
                  className="rounded-xl relative overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-1"
                  style={{
                    aspectRatio: "4/3",
                    background: "#0C0C0C",
                    boxShadow: "0 2px 12px rgba(12,12,12,0.18)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    {feature.illustration}
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)" }}
                  />
                </div>
                <h3
                  className="text-base text-[#0C0C0C] font-bold mt-0.5"
                  style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.01em" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#767676", lineHeight: 1.65 }}>
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
