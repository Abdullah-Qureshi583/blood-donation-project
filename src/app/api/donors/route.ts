// app/api/donors/route.ts (API to Register Donors)
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  return NextResponse.json({ message: "Donor registered successfully" });
}