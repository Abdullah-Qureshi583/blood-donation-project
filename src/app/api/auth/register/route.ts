import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Donor from "@/models/Donor";
import { hashPassword } from "@/lib/hash";

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const { email, password, ...rest } = data;
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }
  const existing = await Donor.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  const hashedPassword = await hashPassword(password);
  const donor = await Donor.create({ ...rest, email, password: hashedPassword });
  return NextResponse.json({ success: true, donor });
}
