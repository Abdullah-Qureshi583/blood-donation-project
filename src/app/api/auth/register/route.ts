import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import { hashPassword } from "@/lib/hash";

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const { email, password, name, phone } = data;
  
  if (!email || !password || !name) {
    return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 });
  }
  
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ 
    email, 
    password: hashedPassword, 
    name,
    phone,
    provider: 'credentials'
  });
  
  return NextResponse.json({ success: true, user: { id: user._id, email: user.email, name: user.name } });
}
