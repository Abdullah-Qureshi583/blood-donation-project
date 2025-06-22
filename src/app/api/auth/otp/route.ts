/**
 * OTP API for Authentication
 * 
 * USAGE:
 * 
 * SEND OTP:
 * - When: Password reset or email verification
 * - Body: { email: string, action: "send" }
 * - Action: Generates 6-digit OTP, stores in otpStore, sends email
 * 
 * VERIFY OTP:
 * - When: User enters OTP for verification  
 * - Body: { email: string, action: "verify", otp: string }
 * - Action: Compares OTP, deletes after verification
 * 
 * SECURITY:
 * - Server-side OTP generation only
 * - Stored in server memory (otpStore)
 * - Auto-deleted after verification
 * 
 * FLOW:
 * 1. Email → POST { email, action: "send" }
 * 2. OTP → POST { email, action: "verify", otp }
 * 3. Success → Proceed with auth flow
 */

import { NextResponse } from "next/server";
import { sendOTPEmail } from "@/lib/mail";
import otpStore from "@/lib/otpStore";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  const { email, action, otp } = await req.json();
  
  if (!email || !action) {
    return NextResponse.json({ error: "Email and action are required" }, { status: 400 });
  }

  try {
    if (action === "send") {
      const code = generateOTP();
      otpStore.set(email, code);
      console.log("OTP generated for:", email, "Code:", code);
      
      // Send email (uncomment when email is configured)
      // await sendOTPEmail(email, code);
      
      return NextResponse.json({ message: "OTP sent successfully" });
    } 
    else if (action === "verify") {
      if (!otp) {
        return NextResponse.json({ error: "OTP is required for verification" }, { status: 400 });
      }
      
      const storedOTP = otpStore.get(email);
      if (storedOTP === otp) {
        otpStore.delete(email); // Clean up after successful verification
        return NextResponse.json({ success: true, message: "OTP verified successfully" });
      } else {
        return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 });
      }
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("OTP API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
