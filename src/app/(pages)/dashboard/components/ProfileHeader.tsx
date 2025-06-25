import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Swal from 'sweetalert2';

interface ProfileHeaderProps {
  name: string;
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email }) => {
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to logout?',
      text: "You'll need to sign in again to access your dashboard.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-lg',
        confirmButton: 'rounded-md',
        cancelButton: 'rounded-md'
      }
    });

    if (result.isConfirmed) {
      await signOut({ callbackUrl: '/' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
          <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${name}`} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 