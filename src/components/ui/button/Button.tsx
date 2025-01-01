// components/Button.tsx
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
        ghost: 'bg-transparent hover:bg-gray-200',
        danger: 'bg-red-500 hover:bg-red-600',
      },
      size: {
        zero: 'h-0 px-0 py-0',
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
