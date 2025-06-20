import { NextResponse } from "next/server";
import { sendOTPEmail } from "@/lib/mail";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  const { email } = await req.json();
  const otp = generateOTP();
  try {
    console.log("The otp is : ", otp)
    // await sendOTPEmail(email, otp);
    return NextResponse.json({ message: "OTP sent", otp }); // For demo only
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
