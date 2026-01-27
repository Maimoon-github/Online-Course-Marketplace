import { ReactNode } from 'react';
import { cn } from './ui/utils';

/**
 * Container - Wraps page content with consistent max-width and padding
 */
export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'lg' | 'sm';
}) {
  const sizes = {
    sm: 'max-w-[800px]',
    default: 'max-w-[1600px]',
    lg: 'max-w-[1200px]',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}

/**
 * Section - Creates consistent vertical spacing and visual separation
 */
export function Section({
  children,
  className,
  title,
  subtitle,
  spacing = 'default',
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  spacing?: 'compact' | 'default' | 'relaxed';
}) {
  const spacings = {
    compact: 'py-8',
    default: 'py-12 md:py-16',
    relaxed: 'py-16 md:py-24',
  };

  return (
    <section className={cn(spacings[spacing], className)}>
      {(title || subtitle) && (
        <div className="mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-[#9CA3AF] max-w-2xl">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * Page Header - Standard heading for pages
 */
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#9CA3AF] text-lg">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

/**
 * Grid - Responsive grid with consistent gap
 */
export function Grid({
  children,
  cols = { base: 1, md: 2, lg: 3 },
  gap = 'default',
  className,
}: {
  children: ReactNode;
  cols?: { base?: number; md?: number; lg?: number; xl?: number };
  gap?: 'tight' | 'default' | 'loose';
  className?: string;
}) {
  const gapSizes = {
    tight: 'gap-4',
    default: 'gap-6',
    loose: 'gap-8',
  };

  const colsClass = cn(
    `grid`,
    cols.base && `grid-cols-${cols.base}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    gapSizes[gap],
    className
  );

  return <div className={colsClass}>{children}</div>;
}

/**
 * Card - Consistent styled container for content
 */
export function Card({
  children,
  className,
  interactive = false,
  gradient = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  gradient?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-[#1F2937] rounded-xl border border-white/5',
        'transition-all duration-200',
        interactive && 'hover:border-[#4A90E2]/30 hover:shadow-lg hover:shadow-[#4A90E2]/10',
        gradient && 'bg-gradient-to-br from-[#1F2937] to-[#16213E]',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Badge Section - Group of related badges/tags
 */
export function BadgeGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {children}
    </div>
  );
}

/**
 * Feature Highlight - Call attention to important content
 */
export function FeatureHighlight({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon?: any;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn('text-center py-6', className)}>
      {Icon && (
        <div className="size-12 rounded-xl bg-gradient-to-br from-[#4A90E2] to-[#3B8075] flex items-center justify-center mx-auto mb-4">
          <Icon className="size-6 text-white" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#E5E7EB] mb-2">{title}</h3>
      <p className="text-sm text-[#9CA3AF]">{description}</p>
    </div>
  );
}

/**
 * Empty State - Display when no content is available
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: any;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && (
        <div className="size-24 rounded-full bg-[#1F2937] flex items-center justify-center mb-6">
          <Icon className="size-12 text-[#9CA3AF]" />
        </div>
      )}
      <h3 className="text-2xl font-bold text-[#E5E7EB] mb-2">{title}</h3>
      <p className="text-[#9CA3AF] mb-8 max-w-sm">{description}</p>
      {action && action}
    </div>
  );
}
