import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Notification from "@/models/Notification";

export async function GET() {
  await connectDB();
  const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);
  return NextResponse.json({ notifications });
}

export async function PATCH(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Notification.findByIdAndUpdate(id, { read: true });
  return NextResponse.json({ message: "Notification marked as read" });
} 