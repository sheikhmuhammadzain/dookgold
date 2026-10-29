import React from 'react';
import { StatusBar } from './StatusBar';

interface MobileContainerProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
  showTime?: boolean;
  className?: string;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  showStatusBar = false, 
  showTime = false,
  className = "" 
}) => {
  return (
    <div className={`mobile-container ${className}`}>
      {showStatusBar && <StatusBar showTime={showTime} />}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};