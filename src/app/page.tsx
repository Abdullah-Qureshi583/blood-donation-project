// app/page.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Save Lives Through Blood Donation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation can make a difference. Join our community of donors or
            find blood when you need it most.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Donor Registration Card */}
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-red-100 rounded-full">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Register as Donor</h2>
              <p className="text-gray-600 mb-6">
                Join our noble cause by registering as a blood donor. Help save
                lives in your community.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white w-full max-w-xs"
              >
                <Link href="/register">
                Register Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Search Blood Card */}
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-blue-100 rounded-full">
                <Search className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Search Blood</h2>
              <p className="text-gray-600 mb-6">
                Find blood donors in your area quickly and easily. Emergency
                support available 24/7.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs"
              >
                <Link href="/search">
                Search Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team 24/7 at
            support@blooddonation.org
          </p>
        </div>
      </main>
    </div>
  );
}
