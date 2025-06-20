// app/api/request/route.ts (API for Blood Requests)
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Request from "@/models/Request";
import Notification from "@/models/Notification";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  try {
    const request = await Request.create(data);
    await Notification.create({
      message: `New blood request for ${request.requiredBloodGroup} at ${request.hospital}`,
      requestId: request._id,
    });
    return NextResponse.json({ message: "Blood request submitted", request });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const requests = await Request.find().sort({ createdAt: -1 });
  return NextResponse.json({ requests });
}