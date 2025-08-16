import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

export const Vocabulary = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 text-[15px] relative whitespace-nowrapm',
        className
      )}
    >
      {children}
    </span>
  );
};
