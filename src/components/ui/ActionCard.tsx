import React from 'react';
import { cn } from '@/lib/utils';

export interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between p-4 rounded-xl bg-card border border-card-border active:opacity-80',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="text-left">
          <div className="font-medium">{title}</div>
          {description && <div className="text-xs text-foreground-muted">{description}</div>}
        </div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground-muted">
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ActionCard;
