import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  rightElement?: ReactNode;
}

export function Header({ title, rightElement }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-neutral-100/80 backdrop-blur-md border-b border-neutral-200 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
      {rightElement}
    </header>
  );
}
