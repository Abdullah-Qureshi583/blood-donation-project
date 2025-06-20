import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => (
  <Card>
    <CardHeader>
      <CardTitle>My Alerts</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li key={notification.id} className={`flex items-center p-3 rounded-lg ${!notification.read ? 'bg-red-50' : 'bg-gray-50'}`}>
            <Bell className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
            <p className={`flex-grow ${!notification.read ? 'font-semibold' : ''}`}>{notification.message}</p>
            {!notification.read && <Button variant="ghost" size="sm">Mark as Read</Button>}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default Notifications; 