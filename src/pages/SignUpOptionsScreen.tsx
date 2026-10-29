import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { DookLogo } from '@/components/ui/DookLogo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Apple, Chrome } from 'lucide-react';

export const SignUpOptionsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer className="bg-neutral-950 text-white" showStatusBar={false}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 text-white/80">
        <button onClick={() => navigate('/welcome')} className="text-base hover:text-white transition-colors">
          ← Back
        </button>
        <span className="text-sm">Create account</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-6">
        <div className="mb-6">
          <DookLogo size="xxl" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">Create your account</h1>
        <p className="text-sm text-white/70 text-center max-w-xs">
          Choose a method to create your account.
        </p>
      </div>

      {/* Actions */}
      <div className="px-4 pb-6 pt-4 bg-neutral-900 rounded-t-2xl border-t border-white/10">
        <div className="space-y-3 mb-3">
          <Button
            variant="secondary"
            className="w-full h-11 bg-neutral-800 border-neutral-700 text-white"
            onClick={() => navigate('/setup-pin')}
          >
            + Create with email
          </Button>
        </div>
        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full h-11 bg-neutral-800 border-neutral-700 text-white"
            onClick={() => navigate('/setup-pin')}
          >
            <Chrome className="w-4 h-4 mr-2" /> Sign up with Google
          </Button>
          <Button
            variant="secondary"
            className="w-full h-11 bg-neutral-800 border-neutral-700 text-white"
            onClick={() => navigate('/setup-pin')}
          >
            <Apple className="w-4 h-4 mr-2" /> Sign up with Apple
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};

export default SignUpOptionsScreen;
