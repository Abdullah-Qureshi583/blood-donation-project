import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Heart, Clock, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProfileStatsProps {
  bloodGroup: string;
  lastDonation: Date | null;
  location: string;
  contact?: string;
  isActive: boolean;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  bloodGroup,
  lastDonation,
  location,
  contact,
  isActive
}) => {
  // Format dates to be more readable
  const formatDate = (date: Date | null) => {
    if (!date) return 'No donation recorded';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donor Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Blood Group */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Heart className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-semibold">{bloodGroup}</p>
          </div>
        </div>

        {/* Donation Status */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <Badge variant={isActive ? "default" : "secondary"}>
              {isActive ? 'Active Donor' : 'Not Currently Available'}
            </Badge>
          </div>
        </div>

        {/* Last Donation */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Donation</p>
            <p className="font-semibold">{formatDate(lastDonation)}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <MapPin className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold">{location}</p>
          </div>
        </div>

        {/* Contact (if available) */}
        {contact && (
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Phone className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-semibold">{contact}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileStats; 