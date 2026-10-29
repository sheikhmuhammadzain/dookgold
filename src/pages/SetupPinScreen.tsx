import React, { useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { DookLogo } from '@/components/ui/DookLogo';
import { PinInput } from '@/components/ui/PinInput';
import { useNavigate } from 'react-router-dom';

export const SetupPinScreen: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [firstPin, setFirstPin] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onFirstComplete = (pin: string) => {
    setFirstPin(pin);
    setError('');
    setStep(2);
  };

  const onSecondComplete = (pin: string) => {
    if (pin !== firstPin) {
      setError('PINs do not match. Try again.');
      // Reset to step 1 for clarity
      setFirstPin('');
      setStep(1);
      return;
    }
    try {
      localStorage.setItem('dook-pin', pin);
    } catch {}
    // Go to PIN login to use the new PIN
    navigate('/pin', { replace: true });
  };

  return (
    <MobileContainer className="bg-background" showStatusBar={false}>
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => navigate('/welcome')}
          className="text-base text-foreground hover:text-brand transition-colors"
        >
          ← Back
        </button>
        <span className="text-sm text-foreground-muted">Step {step} of 2</span>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="mb-8">
          <DookLogo size="xl" className="w-24 h-24 md:w-28 md:h-28" />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2 text-center">
          {step === 1 ? 'Create a 4‑digit PIN' : 'Confirm your PIN'}
        </h1>
        <p className="text-sm text-foreground-muted mb-10 text-center max-w-xs">
          {step === 1
            ? 'You will use this PIN to unlock your wallet on this device.'
            : 'Please re-enter the same PIN to confirm.'}
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600">{error}</div>
        )}

        {step === 1 ? (
          <PinInput onComplete={onFirstComplete} />
        ) : (
          <PinInput onComplete={onSecondComplete} />
        )}
      </div>
    </MobileContainer>
  );
};

export default SetupPinScreen;
