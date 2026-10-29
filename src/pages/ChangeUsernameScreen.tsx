import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ChangeUsernameScreen: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Nayabkhan khan');

  useEffect(() => {
    const saved = localStorage.getItem('dook-username');
    if (saved) setUsername(saved);
  }, []);

  const handleDone = () => {
    localStorage.setItem('dook-username', username.trim());
    navigate('/profile/details');
  };

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <Link to="/profile/details">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">Change Username</h1>
        </div>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        <div className="space-y-2">
          <Label className="text-sm text-foreground">Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="h-12"
          />
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md w-full p-4 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <Button onClick={handleDone} className="w-full h-12 text-base">Done</Button>
      </div>
    </MobileContainer>
  );
};
