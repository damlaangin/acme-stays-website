// Demo build: the form submission is validated and then discarded (no spreadsheet, no backend).
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fullName, phone, email, location } = await request.json();

    if (!fullName || !phone || !email || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Quote submitted successfully (demo)" });
  } catch {
    return NextResponse.json({ error: "Failed to submit quote" }, { status: 500 });
  }
}
