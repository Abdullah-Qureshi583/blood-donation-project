"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Phone, Calendar, Mail, AlertCircle } from "lucide-react";
import PageContainer from "@/components/PageContainer";

interface DonorDetail {
  id: string;
  firstName: string;
  lastName: string;
  bloodGroup: string;
  email: string;
  contact?: string;
  isActive: boolean;
  isPublic: boolean;
  lastDonation: string;
  village?: string;
  unionCouncil?: string;
  tehsil?: string;
  district: string;
  province: string;
  country: string;
}

export default function DonorDetailPage() {
  const params = useParams();
  const [donor, setDonor] = useState<DonorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const res = await fetch(`/api/donors/${params?.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch donor details');
        }
        const data = await res.json();
        setDonor(data.donor);
      } catch (err) {
        setError('Failed to load donor details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchDonorDetails();
    }
  }, [params?.id]);

  if (loading) {
    return (
      <PageContainer title="Loading..." description="Please wait while we fetch the donor details.">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </PageContainer>
    );
  }

  if (error || !donor) {
    return (
      <PageContainer title="Error" description="We couldn't load the donor details.">
        <Card>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-gray-600">{error || 'Donor not found'}</p>
            <Button className="mt-4" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  // Format dates to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format location
  const location = [
    donor.village,
    donor.unionCouncil,
    donor.tehsil,
    donor.district,
    donor.province,
    donor.country
  ].filter(Boolean).join(", ");

  return (
    <PageContainer 
      title={`${donor.firstName} ${donor.lastName}`} 
      description="Donor Profile Details"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Donor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">
                    {donor.firstName} {donor.lastName}
                  </h3>
                  <Badge variant={donor.isActive ? "default" : "secondary"}>
                    {donor.isActive ? 'Active Donor' : 'Currently Unavailable'}
                  </Badge>
                </div>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-medium bg-lightRed text-normalRed">
                  {donor.bloodGroup}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Last Donation</p>
                    <p className="font-medium">{formatDate(donor.lastDonation)}</p>
                  </div>
                </div>

                {donor.isPublic && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium">{donor.contact || 'Not provided'}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{donor.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{location}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {donor.isPublic ? (
              <>
                <p className="text-sm text-gray-600">
                  This donor has made their contact information public.
                </p>
                {donor.contact && (
                  <Button className="w-full" onClick={() => window.location.href = `tel:${donor.contact}`}>
                    Call Donor
                  </Button>
                )}
                <Button variant="outline" className="w-full" onClick={() => window.location.href = `mailto:${donor.email}`}>
                  Send Email
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600">
                  This donor has chosen to keep their contact information private. 
                  You can request their contact details through our system.
                </p>
                <Button className="w-full">
                  Request Contact Details
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
} 