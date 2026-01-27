import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

export function BentoItem({ children, className = '', gradient }: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-[#1F2937] rounded-2xl p-6 border border-white/5 hover:border-[#4A90E2]/30 hover:shadow-2xl hover:shadow-[#4A90E2]/5 transition-all overflow-hidden group ${className}`}
    >
      {gradient && (
        <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${gradient}`} />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {children}
    </div>
  );
}
