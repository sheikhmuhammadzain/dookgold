import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Lock, ExternalLink } from 'lucide-react';

interface TwoFADialogProps {
  trigger: React.ReactNode;
  onContinue?: () => void;
}

export const TwoFADialog: React.FC<TwoFADialogProps> = ({ trigger, onContinue }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
          </div>

          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl">Two-factor authentication</DialogTitle>
            <DialogDescription className="mt-2">
              Turn on two-factor authentication (2FA) to enhance your wallet's security. These actions
              can be protected with 2FA:
            </DialogDescription>
          </DialogHeader>

          <ul className="mt-6 space-y-3 max-w-md mx-auto">
            {[
              'Withdrawals (2FA mandatory)',
              'Sign-in to your wallet',
              'Exchanges',
              'Managing IP addresses',
              'Managing transaction limits',
            ].map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-foreground">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 pb-6 space-y-3">
          <a
            href="https://en.wikipedia.org/wiki/Multi-factor_authentication"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full h-11">
              More about 2FA
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </a>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full h-12 text-base" onClick={onContinue}>Continue</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
