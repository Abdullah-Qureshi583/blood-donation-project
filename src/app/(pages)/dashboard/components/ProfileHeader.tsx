import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, LogOut } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email }) => (
  <div className="bg-gradient-to-r from-red-50 to-red-100 p-6">
    <div className="flex flex-col md:flex-row items-center gap-6">
      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${name}`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {name}!</h1>
        <p className="text-gray-600">{email}</p>
      </div>
      <div className="md:ml-auto flex gap-2">
        <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
        <Button variant="destructive"><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
      </div>
    </div>
  </div>
);

export default ProfileHeader; 