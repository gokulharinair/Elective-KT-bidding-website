import { notFound } from "next/navigation";
import Link from "next/link";
import { electives, AREA_ACCENT, areaToSlug } from "@/lib/electives";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StarSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 1.5L12.8 7.2H19L14 10.8L16.2 17.2L10 13.5L3.8 17.2L6 10.8L1 7.2H7.2L10 1.5Z"
        fill="#0C0C0C"
      />
    </svg>
  );
}

function avg(arr: number[]): number | null {
  if (arr.length === 0) return null;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// ─── Course page ──────────────────────────────────────────────────────────────
export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const elective = electives.find((e) => e.id === id);
  if (!elective) notFound();

  const feedbackList = await db.feedback.findMany({
    where: { electiveId: id },
    orderBy: { createdAt: "desc" },
  });

  const count = feedbackList.length;
  const accentColor = AREA_ACCENT[elective.area];
  const areaSlug = areaToSlug(elective.area);

  // ── Compute summary stats ─────────────────────────────────────────────────
  const contentRatings = feedbackList
    .map((f) => f.contentRating)
    .filter((r) => r > 0);
  const effortRatings = feedbackList
    .map((f) => f.effortRequired)
    .filter((r) => r > 0);
  const biddingPoints = feedbackList
    .map((f) => f.biddingPoints)
    .filter((b): b is number => b != null);

  const avgContentRating = avg(contentRatings);
  const avgEffort = avg(effortRatings);
  const avgBidding = avg(biddingPoints);

  const recFeedback = feedbackList.filter((f) => f.recommended != null);
  const recommendedPct =
    recFeedback.length > 0
      ? (recFeedback.filter((f) => f.recommended === "Yes").length /
          recFeedback.length) *
        100
      : null;

  const demandOrder = ["Very High", "High", "Medium", "Low", "Very Low"];
  const demandCounts: Record<string, number> = {};
  for (const level of demandOrder) demandCounts[level] = 0;
  for (const fb of feedbackList) {
    if (fb.courseDemand && demandCounts[fb.courseDemand] !== undefined) {
      demandCounts[fb.courseDemand]++;
    }
  }
  const maxDemandCount = Math.max(...Object.values(demandCounts), 1);
  const hasDemandData = Object.values(demandCounts).some((v) => v > 0);

  // ── Rating bar helper ─────────────────────────────────────────────────────
  function RatingBar({ value, max = 5 }: { value: number | null; max?: number }) {
    const pct = value != null ? (value / max) * 100 : 0;
    return (
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          height: "4px",
          background: "rgba(12,12,12,0.08)",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: accentColor,
            borderRadius: "9999px",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ background: "#F5F4EF", minHeight: "100vh" }}>
      {/* ── Sticky header ─────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(245,244,239,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderColor: "rgba(12,12,12,0.08)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline"
            style={{ textDecoration: "none" }}
          >
            <StarSVG />
            <span
              className="font-bold text-xl text-[#0C0C0C]"
              style={{
                fontFamily: "var(--font-fraunces)",
                letterSpacing: "-0.02em",
              }}
            >
              KT Wiki
            </span>
          </Link>

          {/* Back to area */}
          <Link
            href={`/areas/${areaSlug}`}
            className="text-sm text-[#767676] no-underline flex items-center gap-1.5"
            style={{
              textDecoration: "none",
              fontFamily: "var(--font-jakarta)",
              transition: "color 0.2s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            {elective.area}
          </Link>
        </div>
      </header>

      {/* ── Course hero card ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: accentColor,
            boxShadow:
              "0 16px 48px -8px rgba(12,12,12,0.28), 0 4px 16px -4px rgba(12,12,12,0.18)",
          }}
        >
          {/* Radial glow top-right */}
          <div
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(217,98,43,0.2) 0%, transparent 65%)`,
              transform: "translate(25%, -25%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)`,
              transform: "translate(-20%, 25%)",
            }}
          />

          <div className="relative z-10">
            {/* Area badge */}
            <div className="mb-3">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                {elective.area}
              </span>
            </div>

            {/* Course name */}
            <h1
              className="font-bold text-white mb-3"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              {elective.name}
            </h1>

            {/* Faculty / term / credits */}
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5"
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>{elective.faculty}</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span>Term {elective.terms.join(", ")}</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span>{elective.credits} credit{elective.credits !== 1 ? "s" : ""}</span>
            </div>

            {/* Key stats inline */}
            {count > 0 && (
              <div
                className="flex flex-wrap gap-5 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div>
                  <div
                    className="font-bold text-white"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "1.4rem",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {avgContentRating != null
                      ? avgContentRating.toFixed(1)
                      : "—"}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.4)",
                        fontFamily: "var(--font-jakarta)",
                        fontWeight: 400,
                      }}
                    >
                      /5
                    </span>
                  </div>
                  <div
                    className="text-[11px]"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-jakarta)",
                    }}
                  >
                    Avg Rating
                  </div>
                </div>

                {recommendedPct != null && (
                  <div>
                    <div
                      className="font-bold text-white"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "1.4rem",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {Math.round(recommendedPct)}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.4)",
                          fontFamily: "var(--font-jakarta)",
                          fontWeight: 400,
                        }}
                      >
                        %
                      </span>
                    </div>
                    <div
                      className="text-[11px]"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontFamily: "var(--font-jakarta)",
                      }}
                    >
                      Recommended
                    </div>
                  </div>
                )}

                <div>
                  <div
                    className="font-bold text-white"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "1.4rem",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {count}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-jakarta)",
                    }}
                  >
                    Reviews
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {count === 0 ? (
          /* ── Empty state ── */
          <div
            className="rounded-xl p-12 text-center"
            style={{
              background: "white",
              border: "1px solid rgba(12,12,12,0.08)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(12,12,12,0.06)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#767676"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2
              className="font-bold text-[#0C0C0C] mb-2"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "1.2rem",
                letterSpacing: "-0.02em",
              }}
            >
              No feedback yet
            </h2>
            <p
              className="text-[#767676] text-sm mb-6"
              style={{ fontFamily: "var(--font-jakarta)", lineHeight: 1.7 }}
            >
              Be the first to share your experience with this course.
            </p>
            <Link
              href={`/feedback?course=${elective.id}&area=${areaSlug}`}
              className="inline-flex items-center gap-1.5 text-white text-sm font-medium px-5 py-2.5 rounded no-underline"
              style={{
                background: "#D9622B",
                fontFamily: "var(--font-jakarta)",
                boxShadow: "0 2px 8px rgba(217,98,43,0.28)",
                textDecoration: "none",
              }}
            >
              Be the first →
            </Link>
          </div>
        ) : (
          <>
            {/* ── Summary section ─────────────────────────────────────────── */}
            <section className="mb-10">
              <h2
                className="font-bold text-[#0C0C0C] mb-5"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "1.05rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Summary
              </h2>

              {/* Stat cards grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {/* Content Rating */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "white",
                    border: "1px solid rgba(12,12,12,0.08)",
                  }}
                >
                  <div
                    className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-2"
                    style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "0.07em" }}
                  >
                    Avg Rating
                  </div>
                  <div
                    className="font-bold text-[#0C0C0C] mb-2"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "1.6rem",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {avgContentRating != null
                      ? avgContentRating.toFixed(1)
                      : "—"}
                    <span
                      className="text-[#767676]"
                      style={{ fontSize: "0.7rem", fontWeight: 400 }}
                    >
                      /5
                    </span>
                  </div>
                  <RatingBar value={avgContentRating} max={5} />
                </div>

                {/* Effort */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "white",
                    border: "1px solid rgba(12,12,12,0.08)",
                  }}
                >
                  <div
                    className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-2"
                    style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "0.07em" }}
                  >
                    Effort
                  </div>
                  <div
                    className="font-bold text-[#0C0C0C] mb-2"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "1.6rem",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {avgEffort != null ? avgEffort.toFixed(1) : "—"}
                    <span
                      className="text-[#767676]"
                      style={{ fontSize: "0.7rem", fontWeight: 400 }}
                    >
                      /5
                    </span>
                  </div>
                  <RatingBar value={avgEffort} max={5} />
                </div>

                {/* Recommended % */}
                {recommendedPct != null && (
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "white",
                      border: "1px solid rgba(12,12,12,0.08)",
                    }}
                  >
                    <div
                      className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-2"
                      style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "0.07em" }}
                    >
                      Recommend
                    </div>
                    <div
                      className="font-bold text-[#0C0C0C] mb-2"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "1.6rem",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {recommendedPct.toFixed(0)}
                      <span
                        className="text-[#767676]"
                        style={{ fontSize: "0.7rem", fontWeight: 400 }}
                      >
                        %
                      </span>
                    </div>
                    <RatingBar value={recommendedPct} max={100} />
                  </div>
                )}

                {/* Avg Bidding */}
                {avgBidding != null && (
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "white",
                      border: "1px solid rgba(12,12,12,0.08)",
                    }}
                  >
                    <div
                      className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-2"
                      style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "0.07em" }}
                    >
                      Avg Bid Pts
                    </div>
                    <div
                      className="font-bold text-[#0C0C0C] mb-2"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "1.6rem",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {Math.round(avgBidding)}
                    </div>
                    <RatingBar value={avgBidding} max={1000} />
                  </div>
                )}
              </div>

              {/* Demand distribution */}
              {hasDemandData && (
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "white",
                    border: "1px solid rgba(12,12,12,0.08)",
                  }}
                >
                  <div
                    className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-4"
                    style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "0.07em" }}
                  >
                    Course Demand Distribution
                  </div>
                  <div className="space-y-2.5">
                    {demandOrder.map((level) => {
                      const val = demandCounts[level] ?? 0;
                      const pct = (val / maxDemandCount) * 100;
                      return (
                        <div key={level} className="flex items-center gap-3">
                          <span
                            className="text-[11px] text-[#767676] w-16 flex-shrink-0"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {level}
                          </span>
                          <div
                            className="flex-1 rounded-full overflow-hidden"
                            style={{ height: "6px", background: "rgba(12,12,12,0.07)" }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${pct}%`,
                                background: accentColor,
                                borderRadius: "9999px",
                                opacity: pct > 0 ? 1 : 0,
                              }}
                            />
                          </div>
                          <span
                            className="text-[11px] text-[#767676] w-4 text-right flex-shrink-0"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {val}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* ── Reviews section ─────────────────────────────────────────── */}
            <section>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <h2
                  className="font-bold text-[#0C0C0C]"
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "1.05rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {count} Review{count !== 1 ? "s" : ""}, newest first
                </h2>
                <Link
                  href={`/feedback?course=${elective.id}&area=${areaSlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg no-underline transition-all duration-200"
                  style={{
                    background: "#D9622B",
                    color: "#fff",
                    fontFamily: "var(--font-jakarta)",
                    boxShadow: "0 2px 8px rgba(217,98,43,0.25)",
                    textDecoration: "none",
                    fontSize: "13px",
                  }}
                >
                  + Add new feedback
                </Link>
              </div>

              <div className="space-y-4">
                {feedbackList.map((fb) => {
                  const date = new Date(fb.createdAt);
                  const dateStr = date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  const textFields: { label: string; value: string | null }[] = [
                    { label: "Overall Course Rating", value: fb.overallCourseRating },
                    { label: "Professor Quality", value: fb.professorQuality || fb.faculty },
                    { label: "Course Evaluation", value: fb.courseEvaluation },
                    { label: "Learning Outcomes", value: fb.learningOutcome },
                  ];

                  return (
                    <div
                      key={fb.id}
                      className="rounded-xl p-6"
                      style={{
                        background: "white",
                        border: "1px solid rgba(12,12,12,0.08)",
                      }}
                    >
                      {/* Top row */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {/* Date */}
                        <span
                          className="text-[11px] text-[#767676]"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {dateStr}
                        </span>

                        <span style={{ color: "rgba(12,12,12,0.15)", fontSize: "10px" }}>
                          •
                        </span>

                        {/* Recommended badge */}
                        {fb.recommended && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{
                              background:
                                fb.recommended === "Yes"
                                  ? "rgba(34,197,94,0.1)"
                                  : "rgba(12,12,12,0.06)",
                              color:
                                fb.recommended === "Yes"
                                  ? "#16a34a"
                                  : "#767676",
                              fontFamily: "var(--font-jakarta)",
                            }}
                          >
                            {fb.recommended === "Yes" ? "✓ Recommended" : "Not Recommended"}
                          </span>
                        )}

                        {/* Course demand badge */}
                        {fb.courseDemand && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{
                              background: "rgba(12,12,12,0.05)",
                              color: "#767676",
                              fontFamily: "var(--font-jakarta)",
                            }}
                          >
                            {fb.courseDemand} demand
                          </span>
                        )}

                        {/* Bidding points */}
                        {fb.biddingPoints != null && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{
                              background: `${accentColor}14`,
                              color: accentColor,
                              fontFamily: "var(--font-jakarta)",
                              border: `1px solid ${accentColor}20`,
                            }}
                          >
                            {fb.biddingPoints} pts bid
                          </span>
                        )}
                      </div>

                      {/* Ratings row */}
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div>
                          <div
                            className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-1.5"
                            style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "0.07em" }}
                          >
                            Overall Course Rating
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className="font-bold text-[#0C0C0C]"
                              style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.1rem" }}
                            >
                              {fb.contentRating > 0 ? fb.contentRating : "—"}
                            </span>
                            <span
                              className="text-[#767676]"
                              style={{ fontFamily: "var(--font-jakarta)", fontSize: "11px" }}
                            >
                              / 5
                            </span>
                            <div
                              className="flex-1 rounded-full overflow-hidden"
                              style={{ height: "4px", background: "rgba(12,12,12,0.07)" }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${(fb.contentRating / 5) * 100}%`,
                                  background: accentColor,
                                  borderRadius: "9999px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-1.5"
                            style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "0.07em" }}
                          >
                            Effort Required
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className="font-bold text-[#0C0C0C]"
                              style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.1rem" }}
                            >
                              {fb.effortRequired > 0 ? fb.effortRequired : "—"}
                            </span>
                            <span
                              className="text-[#767676]"
                              style={{ fontFamily: "var(--font-jakarta)", fontSize: "11px" }}
                            >
                              / 5
                            </span>
                            <div
                              className="flex-1 rounded-full overflow-hidden"
                              style={{ height: "4px", background: "rgba(12,12,12,0.07)" }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${(fb.effortRequired / 5) * 100}%`,
                                  background: accentColor,
                                  borderRadius: "9999px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Text sections */}
                      <div className="space-y-4">
                        {textFields.map(({ label, value }) => {
                          if (!value || value.trim() === "") return null;
                          return (
                            <div key={label}>
                              <div
                                className="text-[9px] font-semibold uppercase tracking-widest text-[#767676] mb-1"
                                style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "0.1em" }}
                              >
                                {label}
                              </div>
                              <p
                                className="text-[#0C0C0C] text-sm"
                                style={{
                                  fontFamily: "var(--font-jakarta)",
                                  lineHeight: 1.7,
                                }}
                              >
                                {value}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4"
        style={{ borderTop: "1px solid rgba(12,12,12,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <StarSVG />
          <span
            className="font-bold text-[#0C0C0C]"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "1rem" }}
          >
            KT Wiki
          </span>
          <span
            className="text-[13px] text-[#767676]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            · IIM Lucknow PGP Elective Knowledge Base
          </span>
        </div>
        <p
          className="text-[13px] text-[#767676]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Built by students, for students.
        </p>
      </footer>
    </div>
  );
}

