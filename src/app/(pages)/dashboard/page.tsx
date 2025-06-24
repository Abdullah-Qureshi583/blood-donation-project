"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, UserPlus, Calendar, Award, Plus } from "lucide-react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import Achievements from "./components/Achievements";
import DonationHistory from "./components/DonationHistory";
import Notifications from "./components/Notifications";

interface DonorProfile {
  id: string;
  bloodGroup: string;
  lastDonation: Date | null;
  isActive: boolean;
  province: string;
  district?: string;
  tehsil?: string;
  unionCouncil?: string;
  village?: string;
  contact?: string;
}

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [donorProfiles, setDonorProfiles] = useState<DonorProfile[]>([]);

  useEffect(() => {
    const fetchDonorProfiles = async () => {
      try {
        const res = await fetch("/api/donors/me");
        const data = await res.json();
        if (data.success) {
          setDonorProfiles(data.donors);
        }
      } catch (error) {
        console.error("Failed to fetch donor profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchDonorProfiles();
    }
  }, [session]);

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
    router.push("/authentication/login");
    return null;
  }

  const formatLocation = (donor: DonorProfile) => {
    return [
      donor.village,
      donor.unionCouncil,
      donor.tehsil,
      donor.district,
      donor.province
    ].filter(Boolean).join(", ");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Button 
          onClick={() => router.push("/register")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Blood Group
        </Button>
      </div>

      <ProfileHeader 
        name={`${session?.user?.name} ${session?.user?.lastName || ''}`}
        email={session?.user?.email || ''}
        totalDonations={donorProfiles.length}
      />

      {loading ? (
        <div className="text-center py-8">Loading donor profiles...</div>
      ) : donorProfiles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven&apos;t registered as a donor yet.</p>
          <Button onClick={() => router.push("/register")}>
            Register as Donor
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {donorProfiles.map((donor) => (
            <ProfileStats
              key={donor.id}
              bloodGroup={donor.bloodGroup}
              lastDonation={donor.lastDonation}
              location={formatLocation(donor)}
              contact={donor.contact}
              isActive={donor.isActive}
            />
          ))}
        </div>
      )}

      {donorProfiles.length > 0 && (
        <>
          <DonationHistory donations={donorProfiles} />
          <Achievements totalDonations={donorProfiles.length} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
