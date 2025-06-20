import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

interface AchievementsProps {
  badges: string[];
}

const Achievements: React.FC<AchievementsProps> = ({ badges }) => (
  <Card>
    <CardHeader>
      <CardTitle>My Achievements</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <Badge key={index} variant="secondary" className="text-sm">
          <Award className="w-4 h-4 mr-1"/>
          {badge}
        </Badge>
      ))}
    </CardContent>
  </Card>
);

export default Achievements; 