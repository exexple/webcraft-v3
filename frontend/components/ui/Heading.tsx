import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface HeadingProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

const sizeClasses: Record<string, string> = {
  h1: 'text-h1-mobile md:text-h1 tracking-tight-sm',
  h2: 'text-h2-mobile md:text-h2 tracking-tight',
  h3: 'text-h3-mobile md:text-h3 tracking-tight',
  h4: 'text-h4-mobile md:text-h4',
  h5: 'text-h5-mobile md:text-h5',
  h6: 'text-h6-mobile md:text-h6',
};

export function Heading({ as: Component, size, children, gradient, className }: HeadingProps) {
  const resolvedSize = size ?? Component;
  return (
    <Component
      className={cn(
        'font-poppins text-white',
        sizeClasses[resolvedSize],
        gradient && 'bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </Component>
  );
}

export default Heading;
