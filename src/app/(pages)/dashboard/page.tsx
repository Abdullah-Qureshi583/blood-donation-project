"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, UserPlus, Calendar, Award } from "lucide-react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import Achievements from "./components/Achievements";
import DonationHistory from "./components/DonationHistory";
import Notifications from "./components/Notifications";

// Mock data until you have a real user session
const mockDonor = {
  name: "Abdullah Qureshi",
  email: "mabdullahqureshi583@gmail.com",
  bloodGroup: "B+",
  location: "Lahore, Punjab",
  lastDonation: "2024-05-01",
  nextDonation: "2024-08-01",
  donations: [
    { date: "2024-05-01", location: "City Hospital, Lahore" },
    { date: "2023-11-15", location: "General Hospital, Lahore" },
  ],
  notifications: [
    {
      id: 1,
      message: "Your last donation was successfully recorded. Thank you!",
      read: false,
    },
    {
      id: 2,
      message: "You are eligible to donate again on August 1st, 2024.",
      read: true,
    },
  ],
  badges: ["First Donation", "5 Donations Club"],
};

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [isDonor, setIsDonor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDonorStatus = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch('/api/donors/me');
          if (res.ok) {
            setIsDonor(true);
          }
        } catch (error) {
          console.error('Error checking donor status:', error);
        }
      }
      setLoading(false);
    };

    if (status === "authenticated") {
      checkDonorStatus();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in</h1>
            <Button onClick={() => window.location.href = '/authentication/login'}>
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If user is not a donor, show registration prompt
  if (!isDonor) {
    return (
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <ProfileHeader name={session.user?.name || "User"} email={session.user?.email || ""} />

        {/* Not a Donor Yet */}
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Become a Blood Donor</CardTitle>
            <p className="text-gray-600">
              Join our community of lifesavers and help those in need
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Register as Donor</h3>
                <p className="text-sm text-gray-600">
                  Complete your donor profile with blood type and location
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Track Donations</h3>
                <p className="text-sm text-gray-600">
                  Keep track of your donation history and eligibility
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Earn Achievements</h3>
                <p className="text-sm text-gray-600">
                  Get recognized for your contributions and milestones
                </p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => window.location.href = '/register'}
            >
              Register as Blood Donor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user is a donor, show donor dashboard
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      {/* Header */}
      <ProfileHeader name={mockDonor.name} email={mockDonor.email} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <ProfileStats
            bloodGroup={mockDonor.bloodGroup}
            lastDonation={mockDonor.lastDonation}
            nextDonation={mockDonor.nextDonation}
          />
          <Achievements badges={mockDonor.badges} />
        </div>

        {/* Right Column: Tabs for History & Notifications */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Donation History</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <DonationHistory donations={mockDonor.donations} />
            </TabsContent>
            <TabsContent value="notifications">
              <Notifications notifications={mockDonor.notifications} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
