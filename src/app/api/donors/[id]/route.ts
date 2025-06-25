import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Donor from "@/models/Donor";

interface DonorResponse {
  id: string;
  name: string;
  lastName: string;
  bloodGroup: string;
  email: string;
  contact?: string;
  isActive: boolean;
  lastDonation: Date | null;
  // village?: string;
  // unionCouncil?: string;
  // tehsil?: string;
  district: string;
  province: string;
  country: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const donor = await Donor.findById(params.id);
    if (!donor) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }
    console.log("The response of the id donor is :", donor)

    return NextResponse.json<{ donor: DonorResponse }>({
      donor: {
        id: donor._id,
        name: donor.name,
        lastName: donor.lastName,
        bloodGroup: donor.bloodGroup,
        email: donor.email,
        contact: donor.contact,
        isActive: donor.isActive,
        lastDonation: donor.lastDonation,
        // village: donor.village,
        // unionCouncil: donor.unionCouncil,
        // tehsil: donor.tehsil,
        district: donor.district,
        province: donor.province,
        country: donor.country,
      },
    });
  } catch (error: any) {
    console.error("Error fetching donor:", error);
    return NextResponse.json(
      { error: "Failed to fetch donor details" },
      { status: 500 }
    );
  }
}
