import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

interface ActionButtonsProps {
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button className="h-10 px-4 rounded-xl" onClick={() => navigate('/currencies')}>{t('buy')}</Button>
      <Button variant="outline" size="icon" className="rounded-full" aria-label="Add" onClick={() => navigate('/coins/manage')}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};