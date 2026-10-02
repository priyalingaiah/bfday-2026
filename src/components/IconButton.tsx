import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name — also shown as a tooltip. */
  label: string;
  size?: 'sm' | 'md';
}

const SIZES = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
};

/** Round cream button used for every arrow / icon control. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, size = 'md', className = '', type = 'button', children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-polaroid text-ink shadow-cell transition duration-300 border border-transparent hover:-translate-y-px hover:border-dusty/40 hover:bg-white hover:text-dusty-deep hover:shadow-paper active:translate-y-0 aria-disabled:cursor-default aria-disabled:opacity-35 aria-disabled:hover:translate-y-0 aria-disabled:hover:shadow-cell ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
