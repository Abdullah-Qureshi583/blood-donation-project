import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: "Not authenticated" 
      }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    
    // Validate required fields
    if (!data.lastName || !data.phone) {
      return NextResponse.json({ 
        success: false, 
        error: "Last name and phone number are required" 
      }, { status: 400 });
    }

    // Update user profile
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        lastName: data.lastName,
        phone: data.phone,
        // Only update name if provided
        ...(data.name && { name: data.name })
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ 
        success: false, 
        error: "User not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        name: updatedUser.name,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone
      }
    });
    
  } catch (error: any) {
    console.error('Update Profile Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to update profile" 
    }, { status: 500 });
  }
} 