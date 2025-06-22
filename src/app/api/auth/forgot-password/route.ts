import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import { sendOTPEmail } from "@/lib/mail";
import otpStore from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, code);
  await sendOTPEmail(email, code);
  return NextResponse.json({ success: true });
}
