import { ReactNode } from 'react';

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export function FormGroup({ children, className = '' }: FormGroupProps) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3 ${className}`}>
      {children}
    </div>
  );
}
