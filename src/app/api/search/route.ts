// app/api/search/route.ts (API to Search Donors)
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Donor from "@/models/Donor";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const filter: any = {};
  if (searchParams.get("bloodGroup"))
    filter.bloodGroup = searchParams.get("bloodGroup");
  if (searchParams.get("district"))
    filter.district = searchParams.get("district");
  if (searchParams.get("tehsil")) filter.tehsil = searchParams.get("tehsil");
  if (searchParams.get("unionCouncil"))
    filter.unionCouncil = searchParams.get("unionCouncil");
  if (searchParams.get("activeOnly") === "true") filter.isActive = true;
  console.log("the filter to search for the donor : ", filter);
  const donors = await Donor.find(filter).sort({ createdAt: -1 });
  return NextResponse.json({ donors });
}
