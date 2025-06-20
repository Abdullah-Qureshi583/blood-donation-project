import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Donor from "@/models/Donor";
import otpStore from "@/lib/otpStore";
import { hashPassword } from "@/lib/hash";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, otp, newPassword } = await req.json();
  if (!email || !otp || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const code = otpStore.get(email);
  if (code !== otp) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }
  const user = await Donor.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  user.password = await hashPassword(newPassword);
  await user.save();
  otpStore.delete(email);
  return NextResponse.json({ success: true });
}
