import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const rows = await db.feedback.findMany({
      select: { electiveId: true, contentRating: true, recommended: true },
    });

    const agg: Record<
      string,
      { count: number; ratings: number[]; yesCount: number; totalRec: number }
    > = {};

    for (const row of rows) {
      if (!agg[row.electiveId]) {
        agg[row.electiveId] = { count: 0, ratings: [], yesCount: 0, totalRec: 0 };
      }
      agg[row.electiveId].count++;
      if (row.contentRating > 0) agg[row.electiveId].ratings.push(row.contentRating);
      if (row.recommended) {
        agg[row.electiveId].totalRec++;
        if (row.recommended === "Yes") agg[row.electiveId].yesCount++;
      }
    }

    const stats: Record<
      string,
      { count: number; avgContentRating: number | null; recommendedPct: number | null }
    > = {};

    for (const [id, s] of Object.entries(agg)) {
      stats[id] = {
        count: s.count,
        avgContentRating:
          s.ratings.length > 0
            ? s.ratings.reduce((a, b) => a + b, 0) / s.ratings.length
            : null,
        recommendedPct:
          s.totalRec > 0 ? (s.yesCount / s.totalRec) * 100 : null,
      };
    }

    return NextResponse.json({ stats });
  } catch (err) {
    console.error("[feedback/stats GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
