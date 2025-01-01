import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { TextareaHTMLAttributes, forwardRef } from 'react';

const textareaVariants = cva(
  'w-full bg-transparent px-3 py-2 outline-none focus:outline-none rounded-sm placeholder:text-[14px]/[17px] text-[14px]/[17px] resize-none',
  {
    variants: {
      variant: {
        default: '',
        dark: 'bg-black text-blue-300 border-b border-blue-300',
        success: '',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  isError?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, isError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          textareaVariants({ variant, size }),
          className,
          isError ? 'border-red-700' : ''
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
