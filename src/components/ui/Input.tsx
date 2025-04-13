import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasBottomBorder?: boolean;
  error?: string;
}

export function Input({ 
  label, 
  hasBottomBorder = false, 
  className = '', 
  error,
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full p-2 outline-none text-neutral-900 bg-transparent ${
          hasBottomBorder ? 'border-b border-neutral-200' : ''
        } ${className}`}
        {...props}
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}
