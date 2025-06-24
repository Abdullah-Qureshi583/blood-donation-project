"use client";

import React from "react";
import HomeCardComp from "@/components/HomeCardComp";

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primaryColor mb-4">
            Save Lives Through Blood Donation
          </h1>
          <p className="text-lg text-secondaryColor max-w-2xl mx-auto">
            Your donation can make a difference. Join our community of donors or
            find blood when you need it most.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Donor Registration Card */}
          <HomeCardComp
            theme="red"
            title="Register as Donor"
            description="Join our noble cause by registering as a blood donor. Help save lives in your community."
            linkHref="/register"
            linkLable="Register Now"
          />

          {/* Search Blood Card */}
          <HomeCardComp
            theme="blue"
            title="Search Blood"
            description="Find blood donors in your area quickly and easily. Emergency support available 24/7."
            linkHref="/search"
            linkLable="Search Now"
          />
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-sm text-secondaryColor">
            Need help? Contact our support team 24/7 at
            support@blooddonation.org
          </p>
        </div>
      </main>
    </div>
  );
}
