import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import { hashPassword } from "@/lib/hash";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, newPassword } = await req.json();
    
    if (!email || !newPassword) {
      return NextResponse.json({ 
        success: false,
        error: "Email and new password are required" 
      }, { status: 400 });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: "User not found" 
      }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    console.log(`Password reset successful for user: ${email}`);

    return NextResponse.json({ 
      success: true,
      message: "Password reset successfully"
    });

  } catch (error: any) {
    console.error("Password reset error:", error);
    return NextResponse.json({ 
      success: false,
      error: "Failed to reset password. Please try again." 
    }, { status: 500 });
  }
}
