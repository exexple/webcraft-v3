import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TextProps {
  size?: 'display' | 'lg' | 'base' | 'sm' | 'xs';
  weight?: 'regular' | 'medium' | 'semibold';
  color?: 'white' | 'gray-300' | 'gray-400' | 'gray-500' | 'gray-600';
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
}

const sizeClasses: Record<string, string> = {
  display: 'text-body-display',
  lg: 'text-body-lg',
  base: 'text-body-base',
  sm: 'text-body-sm',
  xs: 'text-body-xs',
};

const weightClasses: Record<string, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
};

const colorClasses: Record<string, string> = {
  white: 'text-white',
  'gray-300': 'text-gray-300',
  'gray-400': 'text-gray-400',
  'gray-500': 'text-gray-500',
  'gray-600': 'text-gray-600',
};

export function Text({
  size = 'base',
  weight = 'regular',
  color = 'gray-400',
  children,
  className,
  as: Component = 'p',
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-inter',
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
}

export default Text;
