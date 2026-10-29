import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
  className?: string;
  /**
   * Optional: pre-fill the PIN (must match `length`). When provided, the component
   * will immediately call `onComplete` with this value on mount.
   */
  autoFillPin?: string;
}

export const PinInput: React.FC<PinInputProps> = ({ 
  length = 4, 
  onComplete,
  className = "",
  autoFillPin
}) => {
  const [pin, setPin] = useState<string>('');

  // Auto-fill support (useful for demos/dev): if a full-length PIN is provided,
  // set it and trigger completion immediately.
  useEffect(() => {
    if (autoFillPin && autoFillPin.length === length) {
      setPin(autoFillPin);
      if (onComplete) onComplete(autoFillPin);
    }
  }, [autoFillPin, length, onComplete]);

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      setPin(prev => prev.slice(0, -1));
    } else if (key >= '0' && key <= '9' && pin.length < length) {
      const newPin = pin + key;
      setPin(newPin);
      if (newPin.length === length && onComplete) {
        onComplete(newPin);
      }
    }
  };

  // Allow typing with the physical keyboard as well
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        handleKeyPress('delete');
      } else if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pin, length]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* PIN dots display */}
      <div className="flex space-x-4 mb-12">
        {Array.from({ length }, (_, index) => (
          <div
            key={index}
            className={`pin-dot ${index < pin.length ? 'filled' : ''}`}
          />
        ))}
      </div>

      {/* Number pad */}
      <div className="grid grid-cols-3 gap-8 w-80">
        {/* Numbers 1-9 */}
        {Array.from({ length: 9 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleKeyPress((index + 1).toString())}
            className="w-16 h-16 flex items-center justify-center text-3xl font-light text-foreground hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            {index + 1}
          </button>
        ))}
        
        {/* Bottom row: empty, 0, delete */}
        <div></div>
        <button
          onClick={() => handleKeyPress('0')}
          className="w-16 h-16 flex items-center justify-center text-3xl font-light text-foreground hover:bg-gray-100 rounded-full transition-colors active:scale-95"
        >
          0
        </button>
        <button
          onClick={() => handleKeyPress('delete')}
          className="w-16 h-16 flex items-center justify-center text-foreground-muted hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          disabled={pin.length === 0}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};