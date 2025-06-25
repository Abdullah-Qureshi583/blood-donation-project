import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

interface DonorResponse {
  id: string;
  name: string;
  lastName: string;
  bloodGroup: string;
  email: string;
  contact?: string;
  isActive: boolean;
  lastDonation: Date | null;
  district: string;
  province: string;
  country: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the donor profile in the user's donors array
    const donor = user.donors.id(params.id);

    if (!donor) {
      return NextResponse.json({ error: "Donor profile not found" }, { status: 404 });
    }

    return NextResponse.json<{ donor: DonorResponse }>({
      donor: {
        id: donor._id,
        name: user.name,
        lastName: user.lastName,
        bloodGroup: donor.bloodGroup,
        email: user.email,
        contact: donor.contact || user.phone,
        isActive: donor.isActive,
        lastDonation: donor.lastDonation,
        district: donor.district,
        province: donor.province,
        country: donor.country,
      },
    });
  } catch (error: any) {
    console.error("Error fetching donor:", error);
    return NextResponse.json({ error: "Failed to fetch donor" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the donor profile in the user's donors array
    const donor = user.donors.id(params.id);

    if (!donor) {
      return NextResponse.json({ error: "Donor profile not found" }, { status: 404 });
    }

    const updateData = await req.json();
    
    // Validate required fields
    if (!updateData.bloodGroup || !updateData.province || !updateData.district) {
      return NextResponse.json({ 
        error: "Blood group, province, and district are required" 
      }, { status: 400 });
    }

    // Check if the updated data would create a duplicate
    const existingDonor = user.donors.find(d => 
      d._id.toString() !== params.id && 
      d.bloodGroup === updateData.bloodGroup && 
      d.province === updateData.province && 
      d.district === updateData.district
    );

    if (existingDonor) {
      return NextResponse.json({ 
        error: "You already have a donor registration with this blood group in this location" 
      }, { status: 400 });
    }

    // Update donor profile
    const updatedUser = await User.findOneAndUpdate(
      { 
        _id: session.user.id,
        "donors._id": new mongoose.Types.ObjectId(params.id)
      },
      {
        $set: {
          "donors.$.bloodGroup": updateData.bloodGroup,
          "donors.$.province": updateData.province,
          "donors.$.district": updateData.district,
          "donors.$.lastDonation": updateData.lastDonation ? new Date(updateData.lastDonation) : null,
          "donors.$.isActive": updateData.isActive
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update donor profile" }, { status: 500 });
    }

    const updatedDonor = updatedUser.donors.id(params.id);

    return NextResponse.json({ 
      message: "Donor profile updated successfully",
      donor: {
        id: updatedDonor._id,
        name: updatedUser.name,
        lastName: updatedUser.lastName,
        bloodGroup: updatedDonor.bloodGroup,
        email: updatedUser.email,
        contact: updatedDonor.contact || updatedUser.phone,
        isActive: updatedDonor.isActive,
        lastDonation: updatedDonor.lastDonation,
        district: updatedDonor.district,
        province: updatedDonor.province,
        country: updatedDonor.country,
      }
    });
  } catch (error: any) {
    console.error("Error updating donor:", error);
    return NextResponse.json({ error: "Failed to update donor" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find and remove the donor profile
    const donor = user.donors.id(params.id);
    if (!donor) {
      return NextResponse.json({ error: "Donor profile not found" }, { status: 404 });
    }

    // Remove the donor profile from the array
    user.donors.pull(params.id);
    await user.save();

    return NextResponse.json({ message: "Donor profile deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting donor:", error);
    return NextResponse.json({ error: "Failed to delete donor profile" }, { status: 500 });
  }
}
