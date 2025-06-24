import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Donor from "@/models/Donor";
import Notification from "@/models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const donors = await Donor.find({ userId: user._id });
    return NextResponse.json({ 
      success: true, 
      donors: donors.map(donor => ({
        id: donor._id.toString(),
        bloodGroup: donor.bloodGroup,
        lastDonation: donor.lastDonation,
        isActive: donor.isActive,
        province: donor.province,
        district: donor.district,
        tehsil: donor.tehsil,
        unionCouncil: donor.unionCouncil,
        village: donor.village,
        contact: donor.contact
      }))
    });

  } catch (error) {
    console.error("Error fetching donor profiles:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch donor profiles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const data = await req.json();
    
    // Check if user already has a donor profile with this blood group in this location
    const existingDonor = await Donor.findOne({
      userId: user._id,
      bloodGroup: data.bloodGroup,
      province: data.province,
      district: data.district,
      tehsil: data.tehsil
    });

    if (existingDonor) {
      return NextResponse.json({ 
        success: false, 
        error: "You are already registered as a donor with this blood group in this location" 
      }, { status: 400 });
    }

    // Create new donor profile
    const donor = await Donor.create({
      userId: user._id,
      email: user.email,
      bloodGroup: data.bloodGroup,
      country: data.country,
      province: data.province,
      district: data.district,
      tehsil: data.tehsil,
      unionCouncil: data.unionCouncil,
      village: data.village,
      contact: data.contact,
      isPublic: data.isPublic,
      lastDonation: null
    });

    return NextResponse.json({ 
      success: true, 
      donor: {
        id: donor._id.toString(),
        bloodGroup: donor.bloodGroup,
        lastDonation: donor.lastDonation,
        isActive: donor.isActive,
        province: donor.province,
        district: donor.district,
        tehsil: donor.tehsil,
        unionCouncil: donor.unionCouncil,
        village: donor.village,
        contact: donor.contact
      }
    });

  } catch (error: any) {
    console.error("Error creating donor profile:", error);
    if (error.code === 11000) {
      return NextResponse.json({ 
        success: false, 
        error: "You are already registered as a donor with this blood group in this location" 
      }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Failed to create donor profile" }, { status: 500 });
  }
} 