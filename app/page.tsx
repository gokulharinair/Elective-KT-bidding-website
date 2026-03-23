"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Feature } from "@/components/ui/feature-section-with-grid";
import { AREAS, areaToSlug } from "@/lib/electives";

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(245,244,239,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderColor: "rgba(12,12,12,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 no-underline">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1.5L12.8 7.2H19L14 10.8L16.2 17.2L10 13.5L3.8 17.2L6 10.8L1 7.2H7.2L10 1.5Z" fill="#0C0C0C" />
          </svg>
          <span className="font-bold text-xl tracking-tight text-[#0C0C0C]"
            style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.02em" }}>
            KT Wiki
          </span>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Elective Areas dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-1 text-sm text-[#0C0C0C] relative group"
              style={{ letterSpacing: "-0.01em", background: "none", border: "none", cursor: "pointer" }}
            >
              Elective Areas
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-0.5"
                style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="#0C0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0C0C0C] group-hover:w-full"
                style={{ transition: "width 0.25s cubic-bezier(0.16,1,0.3,1)" }} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden z-50"
                style={{ background: "#fff", border: "1px solid rgba(12,12,12,0.1)", boxShadow: "0 12px 40px rgba(12,12,12,0.14)" }}>
                {AREAS.map((area) => (
                  <Link key={area} href={`/areas/${areaToSlug(area)}`}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-[13px] text-[#0C0C0C] no-underline transition-colors duration-150"
                    style={{ letterSpacing: "-0.01em" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(12,12,12,0.04)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                    {area}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[["Professors", "#professors"], ["How It Works", "/how-it-works"]].map(([label, href]) => (
            <a key={label} href={href}
              className="text-sm text-[#0C0C0C] no-underline relative group"
              style={{ letterSpacing: "-0.01em" }}>
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0C0C0C] group-hover:w-full"
                style={{ transition: "width 0.25s cubic-bezier(0.16,1,0.3,1)" }} />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="/feedback"
          className="hidden sm:inline-flex items-center gap-1 border border-[#0C0C0C] text-[#0C0C0C] text-[13px] font-medium px-4 py-[7px] rounded no-underline"
          style={{ transition: "background 0.2s, color 0.2s, transform 0.15s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0C0C0C"; (e.currentTarget as HTMLElement).style.color = "#F5F4EF"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#0C0C0C"; }}>
          Add Course Feedback
        </a>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <div className="mb-5 animate-fade-up animation-delay-100">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white"
              style={{ background: "#D9622B", letterSpacing: "0.07em" }}
            >
              Elective Bidding, Simplified
            </span>
          </div>

          <h1
            className="font-bold text-[#0C0C0C] mb-5 animate-fade-up animation-delay-200"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            Your ultimate guide to IIM Lucknow's elective bidding process.
          </h1>

          <p
            className="text-[#767676] mb-8 max-w-md animate-fade-up animation-delay-300"
            style={{ fontSize: "1rem", lineHeight: 1.75 }}
          >
            Peer-driven intelligence on course content, professor quality, teaching
            environment, and bidding demand — everything you need to allocate your
            points wisely.
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-up animation-delay-500">
            <a
              href="#courses"
              className="inline-flex items-center gap-1.5 text-white text-sm font-medium px-5 py-2.5 rounded no-underline"
              style={{
                background: "#D9622B",
                boxShadow: "0 2px 8px rgba(217,98,43,0.28)",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#C4521E";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#D9622B";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Explore Courses →
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 border border-[#0C0C0C] text-[#0C0C0C] text-sm font-medium px-5 py-2.5 rounded no-underline"
              style={{ transition: "background 0.2s, color 0.2s, transform 0.15s" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#0C0C0C";
                (e.currentTarget as HTMLElement).style.color = "#F5F4EF";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#0C0C0C";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              How It Works
            </a>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative animate-fade-up animation-delay-600">
          <div
            className="rounded-2xl p-8 text-white relative overflow-hidden"
            style={{
              background: "#0C0C0C",
              boxShadow: "0 20px 60px -10px rgba(12,12,12,0.35), 0 8px 20px -8px rgba(12,12,12,0.2)",
            }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-44 h-44 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle,rgba(217,98,43,0.2),transparent 70%)",
                transform: "translate(30%,-30%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: "#D9622B" }} />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
                  Featured Elective
                </span>
              </div>

              <h3
                className="text-white font-bold text-xl leading-tight mb-1.5"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Business Valuation &amp;<br />Financial Modelling
              </h3>
              <p className="text-white/45 text-[13px] mb-6">
                Prof. Ashwini Kumar &nbsp;·&nbsp; Finance Cluster &nbsp;·&nbsp; High Demand
              </p>

              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  { val: "4.8", lbl: "Overall Rating" },
                  { val: "340+", lbl: "Avg Bid Points" },
                  { val: "92%", lbl: "Recommend" },
                ].map(({ val, lbl }) => (
                  <div key={lbl}>
                    <div
                      className="font-bold text-[1.6rem] leading-none"
                      style={{ fontFamily: "var(--font-fraunces)", color: "#D9622B" }}
                    >
                      {val}
                    </div>
                    <div className="text-[11px] text-white/40 mt-1">{lbl}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {["High Workload", "Case-based", "Placement Relevant"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-white/70 px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div
            className="absolute -bottom-6 -left-6 rounded-xl p-3 flex items-center gap-3 hidden sm:flex"
            style={{
              background: "#F5F4EF",
              border: "1px solid rgba(12,12,12,0.1)",
              boxShadow: "0 8px 24px -4px rgba(12,12,12,0.14)",
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#D9622B" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[#0C0C0C]">200+ Reviews</div>
              <div className="text-[11px] text-[#767676] mt-0.5">Across all electives</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About + Stats ────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div
        className="mb-10"
        style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(12,12,12,0.15),transparent)" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* About text */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D9622B] mb-3"
            style={{ letterSpacing: "0.1em" }}>
            About KT Wiki
          </p>
          <p
            className="text-[#0C0C0C] leading-relaxed"
            style={{ fontSize: "1.05rem", lineHeight: 1.78 }}
          >
            KT Wiki is a peer-to-peer knowledge base for IIM Lucknow PGP students.
            Whether you&apos;re sharing your elective experience or researching before
            bidding, this is everything you need to know.
          </p>
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { num: "100+", lbl: "Elective Courses" },
            { num: "80+", lbl: "Faculty Profiles" },
            { num: "6", lbl: "Specialization Tracks" },
          ].map(({ num, lbl }) => (
            <div key={lbl}>
              <div
                className="font-bold leading-none text-[#0C0C0C]"
                style={{ fontFamily: "var(--font-fraunces)", fontSize: "2.5rem", letterSpacing: "-0.04em" }}
              >
                {num}
              </div>
              <div className="text-[#767676] text-[13px] mt-2 leading-snug">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-10"
        style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(12,12,12,0.15),transparent)" }}
      />
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="max-w-6xl mx-auto px-6 py-9 flex items-center justify-between flex-wrap gap-4"
      style={{ borderTop: "1px solid rgba(12,12,12,0.1)" }}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M10 1.5L12.8 7.2H19L14 10.8L16.2 17.2L10 13.5L3.8 17.2L6 10.8L1 7.2H7.2L10 1.5Z" fill="#0C0C0C" />
          </svg>
          <span
            className="font-bold text-[1.05rem] text-[#0C0C0C]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            KT Wiki
          </span>
        </div>
        <span className="text-[13px] text-[#767676]">IIM Lucknow · PGP Elective Knowledge Base</span>
      </div>
      <p className="text-[13px] text-[#767676]">Built by students, for students.</p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <div id="courses">
          <Feature />
        </div>
      </main>
      <Footer />
    </>
  );
}
