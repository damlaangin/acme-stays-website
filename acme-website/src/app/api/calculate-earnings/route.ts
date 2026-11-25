// Demo build: deterministic local estimate instead of an AI + exchange-rate API call.
import { NextRequest, NextResponse } from "next/server";
import { FX_RATES, estimateMonthlyEarningsUsd } from "@/utils/dummy";

export async function POST(request: NextRequest) {
  try {
    const { bedrooms, location } = await request.json();
    const usd = estimateMonthlyEarningsUsd({
      bedrooms: typeof bedrooms === "string" ? parseInt(bedrooms) || 1 : bedrooms,
      location,
    });

    return NextResponse.json({
      estimatedMonthlyEarnings: {
        TRY: `TRY ${Math.round(usd * FX_RATES.TRY).toLocaleString("en-US")}`,
        USD: `USD ${usd.toLocaleString("en-US")}`,
        EUR: `EUR ${Math.round(usd * FX_RATES.EUR).toLocaleString("en-US")}`,
      },
      monthlyOccupancyRate: "72%",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
