"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronRight, X } from "lucide-react";
import {
  electives, AREAS, AREA_ACCENT, slugToArea,
  type Elective, type AreaKey, type TermKey,
} from "@/lib/electives";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeedbackForm {
  overallCourseRating: string;
  contentRating: number | null;  // 1–5
  effortRequired: number | null; // 1–5
  courseEvaluation: string;
  learningOutcome: string;
  courseDemand: string;
  biddingPoints: string;
  recommended: string;
}

interface CourseStats {
  count: number;
  avgContentRating: number | null;
  recommendedPct: number | null;
}
type StatsMap = Record<string, CourseStats>;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function wordCount(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function getAreaShort(area: AreaKey): string {
  const map: Record<AreaKey, string> = {
    "Strategy": "STR", "ABM": "ABM", "Finance & Accounting": "FIN",
    "Communication": "COM", "General Management": "GMG", "Decision Science": "DSC",
    "Operations Management": "OPS", "Business Environment": "BEN",
    "Marketing": "MKT", "IT & Systems": "ITS",
    "Business Sustainability": "SUS", "HR Management": "HRM",
  };
  return map[area] ?? area.slice(0, 3).toUpperCase();
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Select Course", "Your Feedback", "Done"];
  return (
    <div className="flex items-center gap-0">
      {steps.map((label, i) => {
        const num = i + 1;
        const active = num === step;
        const done = num < step;
        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                style={{
                  background: done ? "#D9622B" : active ? "#0C0C0C" : "transparent",
                  border: done || active ? "none" : "1.5px solid rgba(12,12,12,0.25)",
                  color: done || active ? "#fff" : "#767676",
                }}>
                {done ? <Check size={11} strokeWidth={3} /> : num}
              </div>
              <span className="text-[12px] font-medium hidden sm:block"
                style={{ color: active ? "#0C0C0C" : "#767676", letterSpacing: "-0.01em" }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 h-px mx-3"
                style={{ background: done ? "#D9622B" : "rgba(12,12,12,0.15)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Area pill ────────────────────────────────────────────────────────────────
function AreaPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200"
      style={{
        background: active ? "#0C0C0C" : "rgba(12,12,12,0.06)",
        color: active ? "#F5F4EF" : "#0C0C0C",
        border: active ? "1.5px solid #0C0C0C" : "1.5px solid transparent",
        letterSpacing: "-0.01em",
      }}>
      {label}
    </button>
  );
}

// ─── Course card (Step 1) ─────────────────────────────────────────────────────
function CourseCard({ elective, stats, onSelect }: { elective: Elective; stats?: CourseStats; onSelect: () => void }) {
  const bg = AREA_ACCENT[elective.area];
  const short = getAreaShort(elective.area);

  return (
    <button onClick={onSelect} className="group text-left w-full rounded-xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: "rgba(12,12,12,0.08)", background: "#fff", boxShadow: "0 1px 3px rgba(12,12,12,0.06)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(12,12,12,0.12)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(12,12,12,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(12,12,12,0.06)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(12,12,12,0.08)";
      }}
    >
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(to right, ${bg}, ${bg}88)` }} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2.5">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ background: bg + "22", color: bg, fontFamily: "var(--font-jakarta)" }}>
            {short} · {elective.area}
          </span>
          <div className="flex items-center gap-3 ml-2 flex-shrink-0">
            <div className="text-right">
              <div className="text-[13px] font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#0C0C0C", letterSpacing: "-0.02em" }}>
                {stats && stats.avgContentRating != null ? stats.avgContentRating.toFixed(1) : "—"}<span className="text-[10px] font-normal text-[#767676]">/5</span>
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "#767676" }}>Rating</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#0C0C0C", letterSpacing: "-0.02em" }}>
                {stats && stats.recommendedPct != null ? `${Math.round(stats.recommendedPct)}%` : "—"}
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "#767676" }}>Rec.</div>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color: "#D9622B" }} />
          </div>
        </div>
        <h3 className="text-[14px] font-bold leading-snug mb-1.5 text-[#0C0C0C]"
          style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.02em" }}>
          {elective.name}
        </h3>
        <p className="text-[11px] mb-3 leading-snug" style={{ color: "#767676", fontFamily: "var(--font-jakarta)" }}>
          {elective.faculty}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {elective.terms.map((t) => (
            <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(12,12,12,0.06)", color: "#0C0C0C" }}>
              Term {t}
            </span>
          ))}
          {stats && stats.count > 0 && (
            <span className="text-[10px]" style={{ color: "#767676" }}>
              {stats.count} review{stats.count !== 1 ? "s" : ""}
            </span>
          )}
          <span className="text-[10px]" style={{ color: "#767676" }}>
            {elective.credits} cr
          </span>
        </div>
      </div>
    </button>
  );
}

// ─── Rating selector (1–5) ────────────────────────────────────────────────────
function RatingSelector({ label, hint, scaleNote, value, onChange }: {
  label: string; hint: string; scaleNote: string;
  value: number | null; onChange: (v: number) => void;
}) {
  const descriptions: Record<number, string> = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Great", 5: "Excellent" };
  return (
    <div>
      <div className="mb-1.5">
        <span className="text-[13px] font-semibold text-[#0C0C0C]"
          style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-0.01em" }}>
          {label}
        </span>
        <span className="text-[11px] text-[#767676] ml-2">{hint}</span>
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const selected = value === i;
          return (
            <button key={i} onClick={() => onChange(i)}
              className="w-10 h-10 rounded-lg text-[13px] font-bold transition-all duration-150"
              style={{
                background: selected ? "#0C0C0C" : "rgba(12,12,12,0.06)",
                color: selected ? "#F5F4EF" : "#0C0C0C",
                border: selected ? "2px solid #0C0C0C" : "2px solid transparent",
                transform: selected ? "scale(1.1)" : "scale(1)",
              }}>
              {i}
            </button>
          );
        })}
        {value !== null && (
          <span className="text-[12px] ml-1" style={{ color: "#D9622B", fontWeight: 600 }}>
            {descriptions[value]}
          </span>
        )}
      </div>
      <p className="text-[10px]" style={{ color: "#9a9a9a", fontFamily: "var(--font-jakarta)" }}>
        {scaleNote}
      </p>
    </div>
  );
}

// ─── Word-count textarea ──────────────────────────────────────────────────────
function WordCountTextarea({ label, hint, placeholder, value, onChange, maxWords, rows = 3 }: {
  label: string; hint?: string; placeholder: string;
  value: string; onChange: (v: string) => void; maxWords: number; rows?: number;
}) {
  const count = wordCount(value);
  const over = count > maxWords;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <div>
          <span className="text-[13px] font-semibold text-[#0C0C0C]"
            style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-0.01em" }}>
            {label}
          </span>
          {hint && <span className="text-[11px] text-[#767676] ml-2">{hint}</span>}
        </div>
        <span className="text-[11px] font-semibold tabular-nums"
          style={{ color: over ? "#C0392B" : count > maxWords * 0.85 ? "#D9622B" : "#767676" }}>
          {count}/{maxWords}w
        </span>
      </div>
      <textarea rows={rows} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-4 py-3 text-[13px] resize-none outline-none transition-all duration-200"
        style={{
          background: "rgba(12,12,12,0.04)",
          border: over ? "1.5px solid #C0392B" : "1.5px solid rgba(12,12,12,0.12)",
          color: "#0C0C0C", fontFamily: "var(--font-jakarta)", lineHeight: 1.65,
        }}
        onFocus={(e) => { if (!over) (e.currentTarget as HTMLElement).style.border = "1.5px solid #0C0C0C"; }}
        onBlur={(e) => { if (!over) (e.currentTarget as HTMLElement).style.border = "1.5px solid rgba(12,12,12,0.12)"; }}
      />
    </div>
  );
}

// ─── Step 1a: Full course browser (from nav CTA) ──────────────────────────────
function StepSelectCourse({ onSelect }: { onSelect: (e: Elective) => void }) {
  const [activeArea, setActiveArea] = useState<AreaKey | "All">("All");
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState<StatsMap>({});

  useEffect(() => {
    fetch("/api/feedback/stats")
      .then((r) => r.json())
      .then((data) => setStats(data.stats ?? {}))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return electives.filter((e) => {
      const matchArea = activeArea === "All" || e.area === activeArea;
      const q = search.toLowerCase();
      const matchSearch = q === "" || e.name.toLowerCase().includes(q) ||
        e.faculty.toLowerCase().includes(q) || e.abbr.toLowerCase().includes(q);
      return matchArea && matchSearch;
    });
  }, [activeArea, search]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[2.4rem] font-bold text-[#0C0C0C] mb-2 leading-tight"
          style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.035em", lineHeight: 1.08 }}>
          Share your experience.
        </h1>
        <p className="text-[15px]" style={{ color: "#767676", lineHeight: 1.7 }}>
          Select a course you took, then leave honest feedback for your batchmates.
        </p>
      </div>
      <div className="relative mb-5">
        <input type="text" placeholder="Search by course name, faculty, or abbreviation…"
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-[13px] outline-none transition-all duration-200"
          style={{ background: "rgba(12,12,12,0.05)", border: "1.5px solid rgba(12,12,12,0.1)", color: "#0C0C0C", fontFamily: "var(--font-jakarta)" }}
          onFocus={(e) => ((e.currentTarget as HTMLElement).style.border = "1.5px solid #0C0C0C")}
          onBlur={(e) => ((e.currentTarget as HTMLElement).style.border = "1.5px solid rgba(12,12,12,0.1)")}
        />
        {search && (
          <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearch("")}>
            <X size={14} style={{ color: "#767676" }} />
          </button>
        )}
      </div>
      <div className="flex gap-2 flex-wrap mb-6">
        <AreaPill label="All Areas" active={activeArea === "All"} onClick={() => setActiveArea("All")} />
        {AREAS.map((area) => (
          <AreaPill key={area} label={area} active={activeArea === area} onClick={() => setActiveArea(area)} />
        ))}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#767676" }}>
        {filtered.length} course{filtered.length !== 1 ? "s" : ""}
        {activeArea !== "All" ? ` · ${activeArea}` : ""}
      </p>
      {filtered.length === 0 ? (
        <div className="py-16 text-center" style={{ color: "#767676" }}>
          <p className="text-[15px]">No courses match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e) => (
            <CourseCard key={e.id} elective={e} stats={stats[e.id]} onSelect={() => onSelect(e)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Step 1b: Area-scoped course browser (from Knowledge Base) ────────────────
function StepSelectCourseByArea({ area, onSelect }: { area: AreaKey; onSelect: (e: Elective) => void }) {
  const [stats, setStats] = useState<StatsMap>({});
  const terms: TermKey[] = ["IV", "V", "VI"];
  const areaElectives = electives.filter((e) => e.area === area);
  const accent = AREA_ACCENT[area];

  useEffect(() => {
    fetch("/api/feedback/stats")
      .then((r) => r.json())
      .then((data) => setStats(data.stats ?? {}))
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-8">
        {/* Area badge */}
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
          style={{ background: accent + "18", color: accent, fontFamily: "var(--font-jakarta)" }}>
          {area}
        </span>
        <h1 className="text-[2rem] font-bold text-[#0C0C0C] mb-2 leading-tight"
          style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
          Select a different course
        </h1>
        <p className="text-[14px]" style={{ color: "#767676", lineHeight: 1.7 }}>
          Choose another course from <strong style={{ color: "#0C0C0C" }}>{area}</strong> to leave feedback on.
        </p>
      </div>

      {terms.map((term) => {
        const termCourses = areaElectives.filter((e) => e.terms.includes(term));
        if (termCourses.length === 0) return null;
        return (
          <div key={term} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: "rgba(12,12,12,0.07)", color: "#767676", fontFamily: "var(--font-jakarta)" }}>
                Term {term}
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(12,12,12,0.08)" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {termCourses.map((e) => (
                <CourseCard key={e.id} elective={e} stats={stats[e.id]} onSelect={() => onSelect(e)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 2: Feedback form ────────────────────────────────────────────────────
function StepFeedbackForm({
  elective, onBack, onSubmit, fromArea,
}: {
  elective: Elective;
  onBack: () => void;
  onSubmit: () => void;
  fromArea: AreaKey | null;
}) {
  const [form, setForm] = useState<FeedbackForm>({
    overallCourseRating: "",
    contentRating: null, effortRequired: null,
    courseEvaluation: "", learningOutcome: "",
    courseDemand: "", biddingPoints: "", recommended: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const bg = AREA_ACCENT[elective.area];

  function update<K extends keyof FeedbackForm>(key: K, val: FeedbackForm[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  const biddingNum = form.biddingPoints !== "" ? Number(form.biddingPoints) : null;
  const biddingValid = form.biddingPoints === "" || (Number.isInteger(biddingNum) && (biddingNum as number) >= 0 && (biddingNum as number) <= 1000);

  const isValid =
    wordCount(form.overallCourseRating) > 0 && wordCount(form.overallCourseRating) <= 150 &&
    form.contentRating !== null && form.effortRequired !== null &&
    wordCount(form.courseEvaluation) > 0 && wordCount(form.courseEvaluation) <= 150 &&
    wordCount(form.learningOutcome) > 0 && wordCount(form.learningOutcome) <= 100 &&
    form.courseDemand !== "" && form.recommended !== "" &&
    form.biddingPoints !== "" && biddingValid;

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          electiveId: elective.id, electiveName: elective.name,
          electiveAbbr: elective.abbr, electiveArea: elective.area, faculty: elective.faculty,
          contentRating: form.contentRating, effortRequired: form.effortRequired,
          courseDemand: form.courseDemand,
          biddingPoints: form.biddingPoints !== "" ? Number(form.biddingPoints) : null,
          recommended: form.recommended,
          overallCourseRating: form.overallCourseRating,
          courseEvaluation: form.courseEvaluation,
          learningOutcome: form.learningOutcome,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      onSubmit();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase: React.CSSProperties = {
    background: "rgba(12,12,12,0.04)",
    border: "1.5px solid rgba(12,12,12,0.12)",
    color: "#0C0C0C", fontFamily: "var(--font-jakarta)",
    borderRadius: "0.5rem", padding: "0.75rem 1rem",
    fontSize: "13px", width: "100%", outline: "none",
    transition: "border-color 0.2s",
  };

  const backLabel = fromArea ? `Back to ${fromArea} courses` : "Change course";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back */}
      <button onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[12px] mb-6 transition-colors duration-200"
        style={{ color: "#767676", fontFamily: "var(--font-jakarta)" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0C0C0C")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#767676")}>
        <ArrowLeft size={13} /> {backLabel}
      </button>

      {/* Course info card */}
      <div className="rounded-xl p-5 mb-8 relative overflow-hidden" style={{ background: bg }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,255,255,0.06),transparent 70%)", transform: "translate(30%,-30%)" }} />
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            {getAreaShort(elective.area)} · {elective.area}
          </p>
          <h2 className="text-white font-bold text-[1.1rem] leading-snug mb-1"
            style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.02em" }}>
            {elective.name}
          </h2>
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            {elective.faculty} &nbsp;·&nbsp; {elective.credits} credit{elective.credits !== 1 ? "s" : ""} &nbsp;·&nbsp;{" "}
            {elective.terms.map((t) => `Term ${t}`).join(", ")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        {/* ── Written Feedback ────────────────────────────────── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: "#767676" }}>Written Feedback</p>
          <div className="flex flex-col gap-5">
            <WordCountTextarea label="Feedback" hint="Your overall impression of the course"
              placeholder="Overall, the course was…" value={form.overallCourseRating}
              onChange={(v) => update("overallCourseRating", v)} maxWords={150} rows={4} />
            <WordCountTextarea label="Course Evaluation" hint="Exams, assignments, grading structure"
              placeholder="The evaluation consisted of…" value={form.courseEvaluation}
              onChange={(v) => update("courseEvaluation", v)} maxWords={150} rows={3} />
            <WordCountTextarea label="Learning Outcome" hint="Key takeaway or skill gained"
              placeholder="I walked away with…" value={form.learningOutcome}
              onChange={(v) => update("learningOutcome", v)} maxWords={100} rows={3} />
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(12,12,12,0.08)" }} />

        {/* ── Ratings ─────────────────────────────────────────── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: "#767676" }}>Ratings</p>
          <div className="flex flex-col gap-6">
            <RatingSelector label="Overall Course Rating *" hint="How was the course content quality?"
              scaleNote="1 = Very poor · 5 = Excellent"
              value={form.contentRating} onChange={(v) => update("contentRating", v)} />
            <RatingSelector label="Level of Effort Required *" hint="How much effort did this course demand?"
              scaleNote="1 = Very light workload · 5 = Very heavy workload"
              value={form.effortRequired} onChange={(v) => update("effortRequired", v)} />
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(12,12,12,0.08)" }} />

        {/* ── Course Details ───────────────────────────────────── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: "#767676" }}>Course Details</p>
          <div className="flex flex-col gap-5">
            {/* Course Demand */}
            <div>
              <div className="mb-1.5">
                <span className="text-[13px] font-semibold text-[#0C0C0C]"
                  style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-0.01em" }}>Course Demand *</span>
                <span className="text-[11px] text-[#767676] ml-2">How competitive was bidding for this course?</span>
              </div>
              <select value={form.courseDemand} onChange={(e) => update("courseDemand", e.target.value)}
                style={{ ...inputBase, appearance: "none", cursor: "pointer" } as React.CSSProperties}>
                <option value="">Select demand level…</option>
                {["Very High", "High", "Medium", "Low", "Very Low"].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Bidding Points */}
            <div>
              <div className="mb-1.5">
                <span className="text-[13px] font-semibold text-[#0C0C0C]"
                  style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-0.01em" }}>Bidding Points Utilised *</span>
                <span className="text-[11px] text-[#767676] ml-2">Enter a value between 0 and 1000</span>
              </div>
              <input type="number" min="0" max="1000" step="1"
                placeholder="e.g. 350"
                value={form.biddingPoints}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "" || (Number.isInteger(Number(v)) && Number(v) >= 0 && Number(v) <= 1000)) {
                    update("biddingPoints", v);
                  }
                }}
                style={inputBase}
                onFocus={(e) => ((e.currentTarget as HTMLElement).style.border = "1.5px solid #0C0C0C")}
                onBlur={(e) => ((e.currentTarget as HTMLElement).style.border = "1.5px solid rgba(12,12,12,0.12)")}
              />
              {form.biddingPoints !== "" && !biddingValid && (
                <p className="text-[11px] mt-1" style={{ color: "#C0392B" }}>Must be a whole number between 0 and 1000.</p>
              )}
            </div>

            {/* Recommended */}
            <div>
              <div className="mb-2">
                <span className="text-[13px] font-semibold text-[#0C0C0C]"
                  style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-0.01em" }}>Recommended? *</span>
                <span className="text-[11px] text-[#767676] ml-2">Would you recommend this course to your batchmates?</span>
              </div>
              <div className="flex gap-3">
                {["Yes", "No"].map((opt) => (
                  <button key={opt} onClick={() => update("recommended", opt)}
                    className="flex-1 py-3 rounded-lg font-semibold text-[13px] transition-all duration-150"
                    style={{
                      background: form.recommended === opt ? "#0C0C0C" : "rgba(12,12,12,0.06)",
                      color: form.recommended === opt ? "#fff" : "#0C0C0C",
                      border: form.recommended === opt ? "2px solid #0C0C0C" : "2px solid transparent",
                      fontFamily: "var(--font-jakarta)",
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(12,12,12,0.08)" }} />

        {/* Submit */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            {!isValid && !submitError && (
              <p className="text-[11px]" style={{ color: "#767676" }}>Fill in all required fields to submit.</p>
            )}
            {submitError && (
              <p className="text-[11px]" style={{ color: "#C0392B" }}>{submitError}</p>
            )}
          </div>
          <button disabled={!isValid || submitting} onClick={handleSubmit}
            className="inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            style={{
              background: isValid && !submitting ? "#D9622B" : "rgba(12,12,12,0.15)",
              color: isValid && !submitting ? "#fff" : "#767676",
              boxShadow: isValid && !submitting ? "0 4px 14px rgba(217,98,43,0.3)" : "none",
              cursor: isValid && !submitting ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => { if (isValid && !submitting) { (e.currentTarget as HTMLElement).style.background = "#C4521E"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; } }}
            onMouseLeave={(e) => { if (isValid && !submitting) { (e.currentTarget as HTMLElement).style.background = "#D9622B"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; } }}>
            {submitting ? "Saving…" : <>Submit Feedback <ArrowRight size={14} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Success ──────────────────────────────────────────────────────────
function StepSuccess() {
  return (
    <div className="max-w-lg mx-auto text-center py-16 px-4">
      {/* Thumbs up icon */}
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8"
        style={{
          background: "#0C0C0C",
          boxShadow: "0 16px 48px rgba(12,12,12,0.18), 0 4px 16px rgba(12,12,12,0.12)",
        }}
      >
        <span style={{ fontSize: "3rem", lineHeight: 1 }}>👍</span>
      </div>

      {/* Message */}
      <p
        className="font-bold text-[#0C0C0C] mb-3"
        style={{
          fontFamily: "var(--font-fraunces)",
          fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
        }}
      >
        Your feedback has been received.
      </p>
      <p
        className="text-[15px] mb-10"
        style={{
          color: "#767676",
          lineHeight: 1.75,
          fontFamily: "var(--font-jakarta)",
        }}
      >
        Thank you for your contribution to this initiative!{" "}
        <span style={{ fontSize: "1.2rem" }}>🙏</span>
      </p>

      {/* Back to Main Menu */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[13px] font-semibold px-8 py-3.5 rounded-xl no-underline transition-all duration-200"
        style={{
          background: "#D9622B",
          color: "#fff",
          boxShadow: "0 4px 18px rgba(217,98,43,0.3)",
          fontFamily: "var(--font-jakarta)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#C4521E";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 22px rgba(217,98,43,0.38)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#D9622B";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(217,98,43,0.3)";
        }}
      >
        <ArrowLeft size={14} /> Back to Main Menu
      </Link>
    </div>
  );
}

// ─── Inner page (needs useSearchParams) ──────────────────────────────────────
function FeedbackPageInner() {
  const searchParams = useSearchParams();

  // Initialize directly from URL — avoids flash
  const initialCourseId = searchParams.get("course");
  const initialAreaSlug = searchParams.get("area");
  const initialElective = initialCourseId
    ? electives.find((e) => e.id === initialCourseId) ?? null
    : null;
  const initialArea = initialAreaSlug ? (slugToArea(initialAreaSlug) ?? null) : null;

  const [step, setStep] = useState<1 | 2 | 3>(initialElective ? 2 : 1);
  const [selected, setSelected] = useState<Elective | null>(initialElective);
  // sourceArea: set when coming from Knowledge Base; drives area-scoped Step 1
  const [sourceArea] = useState<AreaKey | null>(initialArea);

  function handleSelect(e: Elective) {
    setSelected(e);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleSubmit() {
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleBack() {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen" style={{ background: "#F5F4EF" }}>
      <header className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(245,244,239,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderColor: "rgba(12,12,12,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 1.5L12.8 7.2H19L14 10.8L16.2 17.2L10 13.5L3.8 17.2L6 10.8L1 7.2H7.2L10 1.5Z" fill="#0C0C0C" />
            </svg>
            <span className="font-bold text-[1rem] text-[#0C0C0C]"
              style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.02em" }}>KT Wiki</span>
          </Link>
          <StepIndicator step={step} />
          <Link href="/" className="text-[12px] no-underline hidden sm:flex items-center gap-1"
            style={{ color: "#767676", fontFamily: "var(--font-jakarta)" }}>
            <ArrowLeft size={12} className="inline mr-1" />Back to Main Menu
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {step === 1 && (
          sourceArea
            ? <StepSelectCourseByArea area={sourceArea} onSelect={handleSelect} />
            : <StepSelectCourse onSelect={handleSelect} />
        )}
        {step === 2 && selected && (
          <StepFeedbackForm
            elective={selected}
            onBack={handleBack}
            onSubmit={handleSubmit}
            fromArea={sourceArea}
          />
        )}
        {step === 3 && <StepSuccess />}
      </main>
    </div>
  );
}

// ─── Page (Suspense wrapper required for useSearchParams) ────────────────────
export default function FeedbackPage() {
  return (
    <Suspense fallback={<div style={{ background: "#F5F4EF", minHeight: "100vh" }} />}>
      <FeedbackPageInner />
    </Suspense>
  );
}
