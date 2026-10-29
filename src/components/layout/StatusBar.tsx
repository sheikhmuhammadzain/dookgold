import React from 'react';

interface StatusBarProps {
  time?: string;
  className?: string;
  showTime?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  time = "9:32", 
  className = "",
  showTime = false 
}) => {
  if (!showTime) return null;
  
  return (
    <div className={`status-bar ${className}`}>
      <div className="flex items-center">
        <span className="font-medium">{time}</span>
      </div>
      <div className="flex items-center space-x-1">
        {/* Removed mobile icons for website look */}
      </div>
    </div>
  );
};