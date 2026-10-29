import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { PinInput } from '@/components/ui/PinInput';
import { DookLogo } from '@/components/ui/DookLogo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const PinScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();
  const [error, setError] = useState<string>('');
  const expectedPin = useMemo(() => {
    try {
      const stored = localStorage.getItem('dook-pin');
      return stored && stored.length === 4 ? stored : '1234';
    } catch {
      return '1234';
    }
  }, []);

  const handlePinComplete = (pin: string) => {
    // Simulate PIN validation
    if (pin === expectedPin) {
      setAuthenticated(true);
      navigate('/wallets');
    } else {
      // Handle wrong PIN
      setError('Incorrect PIN. Please try again.');
    }
  };

  return (
    <MobileContainer className="bg-background" showStatusBar={false}>
      {/* Header with Sign out - cleaner web look */}
      <div className="flex justify-between items-center p-4">
        <button 
          onClick={() => navigate('/welcome')}
          className="text-base text-foreground hover:text-brand transition-colors"
        >
          ← Back
        </button>
        <span className="text-sm text-foreground-muted">v1.0.846.847</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-8">
          <DookLogo size="xxl" />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-foreground mb-6 text-center">
          Enter Your PIN code
        </h1>
        {error && (
          <div className="mb-6 text-sm text-red-600">{error}</div>
        )}

        {/* PIN Input Component (user must type 1234) */}
        <PinInput onComplete={handlePinComplete} />
      </div>
    </MobileContainer>
  );
};