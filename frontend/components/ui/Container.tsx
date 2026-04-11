import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'compact' | 'normal' | 'spacious';
  className?: string;
}

export function Container({
  children,
  size = 'lg',
  padding = 'normal',
  className,
}: ContainerProps) {
  const maxWidths = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
  };

  const paddings = {
    compact: 'px-4 md:px-6',
    normal: 'px-4 md:px-6 lg:px-8',
    spacious: 'px-4 md:px-6 lg:px-8 xl:px-0',
  };

  return (
    <div className={cn('mx-auto', maxWidths[size], paddings[padding], className)}>
      {children}
    </div>
  );
}
