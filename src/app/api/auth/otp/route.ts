import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/mail';
import otpStore from '@/lib/otpStore';

export async function POST(req: NextRequest) {
  const { email, action, otp } = await req.json();
  if (!email || !action) {
    return NextResponse.json({ error: 'Email and action are required' }, { status: 400 });
  }
  if (action === 'send') {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, code);
    await sendOTPEmail(email, code);
    return NextResponse.json({ success: true });
  } else if (action === 'verify') {
    if (otpStore.get(email) === otp) {
      otpStore.delete(email);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 400 });
    }
  }
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
} 