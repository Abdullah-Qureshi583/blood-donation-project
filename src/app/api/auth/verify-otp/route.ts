import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Otp from "@/models/Otp";

export async function POST(req: Request) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
  }
  try {
    await connectDB();
    const cleanEmail = email.trim().toLowerCase();
    const entry = await Otp.findOne({ email: cleanEmail });
    console.log("[OTP VERIFY] Email:", cleanEmail, "Received OTP:", otp, "Stored:", entry?.otp);
    if (entry && entry.otp === otp) {
      entry.verified = true;
      await entry.save();
      console.log("[OTP VERIFY] Success for:", cleanEmail);
      return NextResponse.json({ success: true, message: "OTP verified successfully" });
    } else {
      console.log("[OTP VERIFY] Failed for:", cleanEmail, "with code:", otp);
      return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Verify OTP API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 