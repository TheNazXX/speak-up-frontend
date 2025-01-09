import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

const inputVariants = cva(
  'bg-transpartnet px-3 py-2 outline-none focues:outline-none rounded-sm placeholder:text-[14px]/[17px] text-[14px]/[17px]',
  {
    variants: {
      variant: {
        default: '',
        dark: 'bg-black text-blue-300 border-b border-blue-300',
        success: '',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  isError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, isError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          inputVariants({ variant, size }),
          className,
          isError ? 'border-red-700' : ''
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
