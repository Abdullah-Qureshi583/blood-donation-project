// app/api/request/route.ts (API for Blood Requests)
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  return NextResponse.json({ message: "Blood request submitted" });
}