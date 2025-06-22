import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Donor from "@/models/Donor";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  await connectDB();
  
  // Check if user is authenticated
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    // Check if user has a donor profile
    const donor = await Donor.findOne({ userId: session.user.id });
    
    if (!donor) {
      return NextResponse.json({ isDonor: false });
    }

    return NextResponse.json({ 
      isDonor: true, 
      donor: {
        id: donor._id,
        name: donor.name,
        bloodGroup: donor.bloodGroup,
        isActive: donor.isActive,
        lastDonation: donor.lastDonation
      }
    });
  } catch (error: any) {
    console.error("Error checking donor status:", error);
    return NextResponse.json({ error: "Failed to check donor status" }, { status: 500 });
  }
} 