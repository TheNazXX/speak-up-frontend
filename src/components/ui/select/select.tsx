import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { SelectHTMLAttributes, forwardRef } from 'react';

const selectVariants = cva(
  'w-full bg-transparent px-3 py-2 outline-none focus:outline-none rounded-sm placeholder:text-[14px]/[17px] text-[14px]/[17px]',
  {
    variants: {
      variant: {
        default: '',
        dark: 'bg-black text-grayLight border-b border-grayLight',
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

export interface SelectOption {
  value: string | null;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  options?: SelectOption[];
  isError?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, variant, size, isError, options = [], children, ...props },
    ref
  ) => {
    return (
      <select
        ref={ref}
        className={clsx(
          selectVariants({ variant, size }),
          className,
          isError ? 'border-red-700' : ''
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value || ""}>
            {option.label}
          </option>
        ))}

        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
