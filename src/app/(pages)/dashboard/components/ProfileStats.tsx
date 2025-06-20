import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Heart, Clock, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProfileStatsProps {
  bloodGroup: string;
  lastDonation: string;
  nextDonation: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ bloodGroup, lastDonation, nextDonation }) => (
  <Card>
    <CardHeader>
      <CardTitle>My Profile</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center">
        <Heart className="w-5 h-5 mr-3 text-red-500" />
        <span>Blood Group: <Badge variant="destructive">{bloodGroup}</Badge></span>
      </div>
      <div className="flex items-center">
        <Clock className="w-5 h-5 mr-3 text-gray-500" />
        <span>Last Donation: {lastDonation}</span>
      </div>
      <div className="flex items-center">
        <ShieldCheck className="w-5 h-5 mr-3 text-green-500" />
        <span>Next Eligible: {nextDonation}</span>
      </div>
    </CardContent>
  </Card>
);

export default ProfileStats; 