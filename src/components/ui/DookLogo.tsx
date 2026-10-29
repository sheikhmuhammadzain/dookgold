import React from 'react';

interface DookLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}

export const DookLogo: React.FC<DookLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    xxl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img
        src="/logo.jpg"
        alt="Dook Gold Logo"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
};

export default DookLogo;