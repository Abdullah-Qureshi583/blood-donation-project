import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Donor from "@/models/Donor";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const user = await Donor.findOne({ email });
  if (!user) {
    return NextResponse.json({ exists: false });
  }
  return NextResponse.json({
    exists: true,
    provider: user.provider || "credentials",
  });
}
