import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Donation {
  date: string;
  location: string;
}

interface DonationHistoryProps {
  donations: Donation[];
}

const DonationHistory: React.FC<DonationHistoryProps> = ({ donations }) => (
  <Card>
    <CardHeader>
      <CardTitle>Donation Log</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {donations.map((donation, index) => (
          <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold">{donation.date}</p>
              <p className="text-sm text-gray-500">{donation.location}</p>
            </div>
            <Button variant="ghost" size="sm">View Details</Button>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default DonationHistory; 