// app/api/search/route.ts (API to Search Donors)
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ donors: [] });
}