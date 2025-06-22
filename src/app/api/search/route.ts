// app/api/search/route.ts (API to Search Donors)
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Donor from "@/models/Donor";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const data = await req.json();
    
    const filter: any = {};
    if (data.bloodGroup) filter.bloodGroup = data.bloodGroup;
    if (data.district) filter.district = data.district;
    if (data.tehsil) filter.tehsil = data.tehsil;
    if (data.unionCouncil) filter.unionCouncil = data.unionCouncil;
    if (data.activeOnly) filter.isActive = true;
    
    const donors = await Donor.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true,
      donors,
      count: donors.length 
    });
    
  } catch (error: any) {
    console.error('Search API Error:', error);
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid search parameters',
        details: error.message 
      }, { status: 400 });
    }
    
    if (error.name === 'CastError') {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid data format',
        details: error.message 
      }, { status: 400 });
    }
    
    // Generic server error
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      message: 'Failed to search donors. Please try again later.'
    }, { status: 500 });
  }
}
