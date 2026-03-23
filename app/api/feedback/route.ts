import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      electiveId, electiveName, electiveAbbr, electiveArea, faculty,
      contentRating, effortRequired,
      courseDemand, biddingPoints, recommended,
      overallCourseRating, courseEvaluation, learningOutcome,
    } = body;

    if (
      !electiveId || !electiveName ||
      contentRating == null || effortRequired == null ||
      !overallCourseRating?.trim() ||
      !courseEvaluation?.trim() || !learningOutcome?.trim() ||
      !recommended
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const feedback = await db.feedback.create({
      data: {
        electiveId, electiveName, electiveAbbr, electiveArea, faculty,
        contentRating: Number(contentRating),
        effortRequired: Number(effortRequired),
        courseDemand: courseDemand || null,
        biddingPoints: biddingPoints != null && biddingPoints !== "" ? Number(biddingPoints) : null,
        recommended,
        overallCourseRating,
        professorQuality: "",   // field removed from form; preserved in DB for historical data
        courseEvaluation,
        learningOutcome,
      },
    });

    return NextResponse.json({ success: true, id: feedback.id }, { status: 201 });
  } catch (err) {
    console.error("[feedback POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const feedback = await db.feedback.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ feedback });
  } catch (err) {
    console.error("[feedback GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
