import { useRef, useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-20"
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalRef}
        className="bg-neutral-100 w-full max-w-md rounded-2xl p-4 animate-slide-up sm:max-h-[90vh] sm:overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onClose}
              className="text-neutral-500 font-medium"
            >
              Cancel
            </button>
            <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
            <div className="w-14" />
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}
