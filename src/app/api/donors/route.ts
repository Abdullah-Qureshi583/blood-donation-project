// app/api/donors/route.ts (API to Register Donors)
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Donor from "@/models/Donor";
import Notification from "@/models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    await connectDB();
    console.log("connected to db successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  // Check if user is authenticated

  const session = await getServerSession(authOptions);
  console.log("📋Session data:", {
    hasSession: !!session,
    userId: session?.user?.id,
    userEmail: session?.user?.email,
    userName: session?.user?.name,
  });

  // if there is no login
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  let data;
  try {
    data = await req.json();
  } catch (e) {
    console.error("❌ [DONORS API] Failed to parse JSON body:", e);
    return NextResponse.json(
      { error: "Invalid or empty request body" },
      { status: 400 }
    );
  }

  try {
    // Check if lastDonation is older than 3 months
    const lastDonationDate = new Date(data.lastDonation);
    const today = new Date();
    const threeMonthsAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 3,
      today.getDate()
    );

    data.isActive = lastDonationDate > threeMonthsAgo;

    // data.userId = session.user.id;
    data.email = session.user.email;

    console.log("🔧 [DONORS API] Final donor data:", data);

    const donor = await Donor.create(data);
    console.log("✅ [DONORS API] Donor created successfully:", donor);

    console.log("🔔 [DONORS API] Creating notification...");
    await Notification.create({
      message: `New donor registered: ${donor.name}`,
      donorId: donor._id,
    });
    console.log("✅ [DONORS API] Notification created successfully");

    console.log("🎉 [DONORS API] Registration completed successfully");
    return NextResponse.json({
      message: "Donor registered successfully",
      donor: {
        id: donor._id,
        name: donor.name,
        bloodGroup: donor.bloodGroup,
        isActive: donor.isActive,
      },
    });
  } catch (error: any) {
    console.error("❌ [DONORS API] Error during donor creation:", {
      error: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name,
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const donors = await Donor.find().sort({ createdAt: -1 });
  return NextResponse.json({ donors });
}
