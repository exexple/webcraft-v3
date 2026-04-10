'use client';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neon' | 'popular';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variants = {
      primary: [
        'text-gray-950 font-bold',
        'bg-[#00d4ff] hover:bg-[#22d3ee]',
        'shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]',
        'hover:-translate-y-0.5',
      ].join(' '),
      secondary: [
        'text-white',
        'bg-violet-600 hover:bg-violet-500',
        'shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]',
        'hover:-translate-y-0.5',
      ].join(' '),
      outline: [
        'text-[#00d4ff] font-semibold',
        'border border-[#00d4ff]/40 hover:border-[#00d4ff]/70',
        'bg-transparent hover:bg-[#00d4ff]/08',
        'hover:-translate-y-0.5',
      ].join(' '),
      ghost: 'text-gray-400 hover:text-white hover:bg-white/10',
      neon: [
        'text-[#64ff6b] font-bold',
        'border border-[#64ff6b]/40 hover:border-[#64ff6b]/70',
        'bg-transparent hover:bg-[#64ff6b]/08',
        'shadow-[0_0_15px_rgba(100,255,107,0.2)] hover:shadow-[0_0_25px_rgba(100,255,107,0.4)]',
        'hover:-translate-y-0.5',
      ].join(' '),
      popular: [
        'text-[#0a0e27] font-bold',
        'bg-[#64ff6b] hover:bg-[#80ff87]',
        'shadow-[0_0_25px_rgba(100,255,107,0.4)] hover:shadow-[0_0_40px_rgba(100,255,107,0.6)]',
        'hover:-translate-y-0.5',
      ].join(' '),
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-sm gap-2',
      lg: 'px-8 py-4 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
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
