import React, { useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const Enter2FACodeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (code.length !== 6) {
      toast({ title: 'Invalid code', description: 'Enter the 6-digit 2FA verification code.' });
      return;
    }
    localStorage.setItem('dook-2fa-last-code', code);
    toast({ title: '2FA verified' });
    navigate('/security');
  };

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <Link to="/security">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">Enable 2FA</h1>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 bg-white">
        <div className="p-4">
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="p-8 flex flex-col items-center">
              <p className="text-foreground mb-4 text-center">Enter a\n2FA verification code</p>
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <InputOTPSlot key={idx} index={idx} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <Button className="mt-6" onClick={handleVerify}>Verify</Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-6">
          <a
            href="https://en.wikipedia.org/wiki/Multi-factor_authentication"
            target="_blank"
            rel="noreferrer"
            className="text-brand text-sm font-medium hover:underline"
          >
            How to use 2FA?
          </a>
        </div>
      </div>
    </MobileContainer>
  );
};
