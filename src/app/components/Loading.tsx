import { motion } from 'motion/react';

/**
 * Loading Spinner - Smooth animated spinner
 */
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'size-6',
    md: 'size-10',
    lg: 'size-16',
  };

  return (
    <motion.div
      className={`${sizes[size]} border-2 border-transparent border-t-[#4A90E2] border-r-[#4A90E2] rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

/**
 * Page Loader - Full page loading state
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#111827]/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <LoadingSpinner size="lg" />
        <motion.p
          className="mt-4 text-[#E5E7EB] text-sm font-medium"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}

/**
 * Skeleton Section - Loading state for a full section
 */
export function SkeletonSection({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="h-20 bg-gradient-to-r from-[#1F2937] via-[#2a3f4f] to-[#1F2937] rounded-lg animate-shimmer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

/**
 * Pulse Dot - Breathing pulse animation
 */
export function PulseDot({ color = 'bg-[#3B8075]' }: { color?: string }) {
  return (
    <motion.div
      className={`size-2 rounded-full ${color}`}
      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}

/**
 * Progress Bar - Animated progress indicator
 */
export function ProgressBar({ value = 0, animated = true }: { value?: number; animated?: boolean }) {
  return (
    <div className="w-full h-2 bg-[#1F2937] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-[#4A90E2] to-[#3B8075]"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {animated && (
          <motion.div
            className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Skeleton Grid - Loading state for grid layout
 */
export function SkeletonGrid({ cols = 3, rows = 2 }: { cols?: number; rows?: number }) {
  return (
    <div className={`grid grid-cols-${cols} gap-6`}>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <motion.div
          key={i}
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          {/* Image skeleton */}
          <div className="h-40 bg-gradient-to-r from-[#1F2937] via-[#2a3f4f] to-[#1F2937] rounded-lg animate-shimmer" />
          {/* Text skeleton */}
          <div className="h-4 bg-gradient-to-r from-[#1F2937] via-[#2a3f4f] to-[#1F2937] rounded-lg animate-shimmer w-3/4" />
          <div className="h-3 bg-gradient-to-r from-[#1F2937] via-[#2a3f4f] to-[#1F2937] rounded-lg animate-shimmer w-1/2" />
        </motion.div>
      ))}
    </div>
  );
}
