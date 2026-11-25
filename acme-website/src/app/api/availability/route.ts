// Demo build: returns generated booking events instead of fetching a real iCal feed.
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing `url` query" }, { status: 400 });
  }

  const day = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const events = [3, 12, 21].map((offset) => ({
    summary: "Reserved",
    start: new Date(today.getTime() + offset * day).toISOString(),
    end: new Date(today.getTime() + (offset + 3) * day).toISOString(),
  }));

  return NextResponse.json({ events });
}
