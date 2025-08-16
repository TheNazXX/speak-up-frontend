import { forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

type ButtonProps = React.ComponentProps<'button'>;

export const VocabularyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 text-[15px] relative whitespace-nowrap hover:opacity-60 transition-opacity',
          className
        )}
        {...props}
      />
    );
  }
);
VocabularyButton.displayName = 'VocabularyButton';
