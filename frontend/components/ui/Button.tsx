'use client';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, style, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden cursor-pointer';

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
        color: '#0a0e27',
        boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
      },
      secondary: {
        background: 'linear-gradient(135deg, #64ff6b 0%, #00d4ff 100%)',
        color: '#0a0e27',
        boxShadow: '0 4px 20px rgba(100, 255, 107, 0.3)',
      },
      outline: {
        background: 'transparent',
        color: '#00d4ff',
        border: '1px solid rgba(0, 212, 255, 0.5)',
        boxShadow: 'none',
      },
      ghost: {
        background: 'transparent',
        color: '#b0b5c3',
      },
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-sm gap-2',
      lg: 'px-8 py-4 text-base gap-2.5',
    };

    const hoverClass = variant === 'primary' || variant === 'secondary'
      ? 'hover:-translate-y-0.5 hover:shadow-lg'
      : variant === 'outline'
      ? 'hover:bg-[rgba(0,212,255,0.08)] hover:border-[#00d4ff]'
      : 'hover:text-white hover:bg-white/10';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, sizes[size], hoverClass, className)}
        style={{ ...variantStyles[variant], ...style }}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
