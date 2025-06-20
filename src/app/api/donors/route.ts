// app/api/donors/route.ts (API to Register Donors)
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Donor from "@/models/Donor";
import Notification from "@/models/Notification";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  console.log("the data ", data);
  try {
    const donor = await Donor.create(data);
    await Notification.create({
      message: `New donor registered: ${donor.name}`,
      donorId: donor._id,
    });
    return NextResponse.json({
      message: "Donor registered successfully",
      donor,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const donors = await Donor.find().sort({ createdAt: -1 });
  return NextResponse.json({ donors });
}
