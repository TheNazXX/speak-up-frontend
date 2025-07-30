// components/Checkbox.tsx
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

const checkboxVariants = cva(
  'flex item-center justify-center rounded border-gray-300 text-primary focus:ring-primary transition-colors duration-200 bg-primary',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      variant: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        danger: 'text-red-500',
        success: 'text-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  labelPosition?: 'left' | 'right';
  isChecked: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      isChecked,
      className,
      size,
      variant,
      label,
      labelPosition = 'right',
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="inline-flex items-center">
        {label && labelPosition === 'left' && (
          <label htmlFor={id} className="mr-2 text-sm text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className="hidden"
          {...props}
        />

        {label && labelPosition === 'right' && (
          <label
            htmlFor={id}
            className="flex items-center gap-2 ml-2 text-sm  text-gray-700"
          >
            <div
              className={clsx(
                checkboxVariants({ size, variant }),
                className,
                isChecked && 'bg-primary'
              )}
            >
              {isChecked && <Check className="text-[#fff] w-5 h-5" />}
            </div>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
