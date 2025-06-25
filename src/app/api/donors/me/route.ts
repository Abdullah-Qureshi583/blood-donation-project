import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Donor from "@/models/Donor";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    console.log("in the me route teh session is : ", session)
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
        // tehsil: donor.tehsil,
        // unionCouncil: donor.unionCouncil,
        // village: donor.village,
        contact: donor.contact,
        country:donor.country
      }))
    });

  } catch (error) {
    console.error("Error fetching donor profiles:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch donor profiles" }, { status: 500 });
  }
}
