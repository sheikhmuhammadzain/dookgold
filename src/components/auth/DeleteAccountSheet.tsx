import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface DeleteAccountSheetProps {
  trigger: React.ReactNode;
  onDelete?: () => void;
}

export const DeleteAccountSheet: React.FC<DeleteAccountSheetProps> = ({ trigger, onDelete }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDelete = () => {
    // Clear any stored user data and log out
    try {
      localStorage.removeItem('dook-username');
      localStorage.removeItem('dook-pin');
      localStorage.removeItem('dook-handle');
      localStorage.removeItem('dook-email');
      logout();
    } finally {
      navigate('/welcome', { replace: true });
    }
    onDelete?.();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>

      <SheetContent side="bottom" className="rounded-t-2xl max-w-md mx-auto w-full p-0">
        <div className="p-6">
          <SheetHeader className="text-left">
            <SheetTitle>Account Removal</SheetTitle>
            <SheetDescription>
              Do you want to delete your Dook Gold account? Please confirm.
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="px-6 pb-6 space-y-3">
          <SheetClose asChild>
            <Button className="w-full h-12 text-base">Cancel</Button>
          </SheetClose>
          <Button
            variant="outline"
            className="w-full h-12 text-base bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
            onClick={handleDelete}
          >
            DELETE
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
