import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DookLogo } from '@/components/ui/DookLogo';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Go to Welcome / Auth screen after splash
      navigate('/welcome');
    }, 2500); // 2.5 second delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="z-10 text-center animate-fade-in">
        {/* Logo with enhanced animation */}
        <div className="mb-8 animate-scale-in">
          <DookLogo size="xl" className="mx-auto transform scale-[1.8] md:scale-[2.0] animate-bounce-gentle" />
        </div>

        {/* Brand name */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-white mb-2 animate-slide-up">
            DOOK <span className="text-brand">GOLD</span>
          </h1>
          <p className="text-lg text-white/80 font-light animate-slide-up delay-200">
            Cryptocurrency Wallet
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-12 animate-fade-in delay-500">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="text-sm text-white/60 mt-4 animate-pulse">
            Initializing secure wallet...
          </p>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 text-center z-10">
        <p className="text-xs text-white/40">
          Powered by blockchain technology
        </p>
      </div>
    </div>
  );
};