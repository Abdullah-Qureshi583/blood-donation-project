"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import Achievements from "./components/Achievements";
import DonationHistory from "./components/DonationHistory";
import Notifications from "./components/Notifications";
import { useSession } from "next-auth/react";

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
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Please log in</div>;

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
