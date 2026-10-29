import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyActionsProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export const EmptyActions: React.FC<EmptyActionsProps> = ({ icon, title, subtitle, className, children }) => {
  return (
    <div className={cn('px-2 pt-6 pb-6 flex flex-col items-center text-center gap-6', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-card border border-card-border flex items-center justify-center">
          {icon}
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-foreground-muted mt-1">{subtitle}</p>}
      </div>

      <div className="w-full space-y-3">
        {children}
      </div>
    </div>
  );
};

export default EmptyActions;
