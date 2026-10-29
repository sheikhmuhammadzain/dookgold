import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { User, Send } from 'lucide-react';

interface LinkTelegramSheetProps {
  trigger: React.ReactNode;
  onLink?: () => void;
}

export const LinkTelegramSheet: React.FC<LinkTelegramSheetProps> = ({ trigger, onLink }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* The clickable element that opens the sheet */}
        {trigger}
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="h-[50vh] rounded-t-2xl max-w-md mx-auto w-full flex flex-col"
      >
        <SheetHeader className="mb-2">
          <div className="text-left font-medium text-foreground">Link Telegram</div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Centered Icon */}
          <div className="flex justify-center mt-4 mb-6">
            <div className="relative w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-700" />
              <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md">
                <Send className="w-4 h-4 rotate-45" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-center text-foreground mb-2">Link Telegram</h2>

          {/* Description */}
          <SheetDescription className="text-center max-w-sm mx-auto px-4">
            To access your wallet on Telegram, add your account.
            <span className="font-medium text-foreground"> If you already use Telegram to sign in to Dook Gold</span>,
            then this Telegram account and this wallet account will be linked.
          </SheetDescription>
        </div>

        {/* Footer with primary action */}
        <SheetFooter>
          <Button className="w-full h-12 text-base" onClick={onLink}>Link</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
