import { notFound } from "next/navigation";
import Link from "next/link";
import {
  electives,
  AREA_ACCENT,
  AREAS,
  areaToSlug,
  slugToArea,
  type TermKey,
  type AreaKey,
} from "@/lib/electives";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// ─── Shared header nav logo SVG ───────────────────────────────────────────────
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

// ─── Area page ────────────────────────────────────────────────────────────────
export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  const areaKey = slugToArea(areaSlug);
  if (!areaKey) notFound();

  // ── Prisma: feedback stats per course in this area ────────────────────────
  const grouped = await db.feedback.groupBy({
    by: ["electiveId"],
    where: { electiveArea: areaKey },
    _count: { id: true },
    _avg: { contentRating: true },
  });

  // Also fetch recommended counts per elective
  const allFeedbackForArea = await db.feedback.findMany({
    where: { electiveArea: areaKey },
    select: { electiveId: true, recommended: true },
  });

  const recMap: Record<string, { yes: number; total: number }> = {};
  for (const fb of allFeedbackForArea) {
    if (!recMap[fb.electiveId]) recMap[fb.electiveId] = { yes: 0, total: 0 };
    recMap[fb.electiveId].total++;
    if (fb.recommended === "Yes") recMap[fb.electiveId].yes++;
  }

  const statsMap: Record<string, { count: number; avgRating: number | null }> =
    {};
  for (const g of grouped) {
    statsMap[g.electiveId] = {
      count: g._count.id,
      avgRating: g._avg.contentRating ?? null,
    };
  }

  const totalFeedback = grouped.reduce((sum, g) => sum + g._count.id, 0);

  // ── Filter & group ────────────────────────────────────────────────────────
  const areaElectives = electives.filter((e) => e.area === areaKey);
  const TERMS: TermKey[] = ["IV", "V", "VI"];

  // Area index (1-based) for display
  const areaIndex = AREAS.indexOf(areaKey) + 1;
  const accentColor = AREA_ACCENT[areaKey];

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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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

          {/* Back link */}
          <Link
            href="/"
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
            All Areas
          </Link>
        </div>
      </header>

      {/* ── Hero strip ────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: accentColor,
            boxShadow:
              "0 16px 48px -8px rgba(12,12,12,0.28), 0 4px 16px -4px rgba(12,12,12,0.18)",
          }}
        >
          {/* Radial glow overlay */}
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(217,98,43,0.18) 0%, transparent 70%)`,
              transform: "translate(20%, -20%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)`,
              transform: "translate(-20%, 20%)",
            }}
          />

          <div className="relative z-10">
            {/* Area tag */}
            <div className="mb-3">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                Area {areaIndex} · Elective Track
              </span>
            </div>

            {/* Area name */}
            <h1
              className="font-bold text-white mb-2"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {areaKey}
            </h1>

            {/* Subtitle */}
            <p
              className="text-sm"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              {areaElectives.length} course
              {areaElectives.length !== 1 ? "s" : ""} &nbsp;·&nbsp;{" "}
              {totalFeedback} feedback entr
              {totalFeedback !== 1 ? "ies" : "y"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Courses section ───────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {TERMS.map((term) => {
          const termElectives = areaElectives.filter((e) =>
            e.terms.includes(term)
          );
          if (termElectives.length === 0) return null;

          return (
            <section key={term} className="mb-12">
              {/* Term header */}
              <div className="flex items-center gap-4 mb-5">
                <h2
                  className="font-bold text-[#0C0C0C]"
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "1.1rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Term {term}
                </h2>
                <div
                  className="flex-1"
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(to right, rgba(12,12,12,0.12), transparent)",
                  }}
                />
                <span
                  className="text-xs text-[#767676]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {termElectives.length} course
                  {termElectives.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Course grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {termElectives.map((elective) => {
                  const stats = statsMap[elective.id];
                  const rec = recMap[elective.id];
                  const recPct =
                    rec && rec.total > 0
                      ? (rec.yes / rec.total) * 100
                      : null;

                  return (
                    <Link
                      key={elective.id}
                      href={`/courses/${elective.id}`}
                      className="group block"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="rounded-xl bg-white relative overflow-hidden transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg"
                        style={{
                          border: "1px solid rgba(12,12,12,0.08)",
                          boxShadow: "0 1px 4px rgba(12,12,12,0.06)",
                        }}
                      >
                        {/* Top color bar */}
                        <div
                          style={{
                            height: "1.5px",
                            background: `linear-gradient(to right, ${accentColor}, transparent)`,
                          }}
                        />

                        {/* Card body */}
                        <div className="p-4">
                          {/* Top row: abbr badge + stats */}
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex-shrink-0"
                              style={{
                                background: `${accentColor}18`,
                                color: accentColor,
                                letterSpacing: "0.06em",
                                fontFamily: "var(--font-jakarta)",
                                border: `1px solid ${accentColor}22`,
                              }}
                            >
                              {elective.abbr}
                            </span>

                            {/* Stats: two-column rating + recommended */}
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <div className="text-right">
                                <div
                                  className="font-bold leading-none"
                                  style={{
                                    fontFamily: "var(--font-fraunces)",
                                    fontSize: "13px",
                                    color: "#0C0C0C",
                                    letterSpacing: "-0.02em",
                                  }}
                                >
                                  {stats && stats.avgRating != null
                                    ? stats.avgRating.toFixed(1)
                                    : "—"}
                                  <span style={{ fontSize: "10px", fontWeight: 400, color: "#767676" }}>/5</span>
                                </div>
                                <div
                                  className="uppercase tracking-widest font-semibold"
                                  style={{ fontSize: "9px", color: "#767676", fontFamily: "var(--font-jakarta)" }}
                                >
                                  Rating
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className="font-bold leading-none"
                                  style={{
                                    fontFamily: "var(--font-fraunces)",
                                    fontSize: "13px",
                                    color: "#0C0C0C",
                                    letterSpacing: "-0.02em",
                                  }}
                                >
                                  {recPct != null ? `${Math.round(recPct)}%` : "—"}
                                </div>
                                <div
                                  className="uppercase tracking-widest font-semibold"
                                  style={{ fontSize: "9px", color: "#767676", fontFamily: "var(--font-jakarta)" }}
                                >
                                  Rec.
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Course name */}
                          <h3
                            className="font-bold text-[#0C0C0C] leading-snug mb-1"
                            style={{
                              fontFamily: "var(--font-fraunces)",
                              fontSize: "14px",
                            }}
                          >
                            {elective.name}
                          </h3>

                          {/* Faculty */}
                          <p
                            className="text-[#767676] mb-3"
                            style={{
                              fontFamily: "var(--font-jakarta)",
                              fontSize: "11px",
                              lineHeight: 1.4,
                            }}
                          >
                            {elective.faculty}
                          </p>

                          {/* Bottom meta */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex flex-wrap gap-1">
                              {elective.terms.map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-0.5 rounded text-[9px] font-medium"
                                  style={{
                                    background: "rgba(12,12,12,0.06)",
                                    color: "#767676",
                                    fontFamily: "var(--font-jakarta)",
                                  }}
                                >
                                  Term {t}
                                </span>
                              ))}
                            </div>
                            <span
                              className="text-[10px] text-[#767676]"
                              style={{ fontFamily: "var(--font-jakarta)" }}
                            >
                              {elective.credits} cr
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4"
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

export async function generateStaticParams() {
  const { AREAS, areaToSlug } = await import("@/lib/electives");
  return AREAS.map((area) => ({ area: areaToSlug(area) }));
}
