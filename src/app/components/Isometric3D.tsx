import { motion } from 'motion/react';

/**
 * Isometric Learning Stack - 3D box representation of stacked books/courses
 */
export function IsometricLearningStack() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="boxGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: '#3d7fd6', stopOpacity: 0.8 }} />
        </linearGradient>
        <linearGradient id="boxGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B8075', stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: '#2f6760', stopOpacity: 0.8 }} />
        </linearGradient>
        <linearGradient id="boxGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#66A5AD', stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: '#5596a0', stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>

      {/* Bottom Box */}
      <motion.g
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, duration: 0.6 }}
      >
        {/* Front Face */}
        <rect x="40" y="120" width="120" height="50" fill="url(#boxGradient1)" />
        {/* Top Face */}
        <polygon
          points="40,120 70,90 190,90 160,120"
          fill="url(#boxGradient1)"
          opacity="0.7"
        />
        {/* Right Face */}
        <polygon
          points="160,120 190,90 190,140 160,170"
          fill="url(#boxGradient1)"
          opacity="0.5"
        />
      </motion.g>

      {/* Middle Box */}
      <motion.g
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        {/* Front Face */}
        <rect x="50" y="80" width="100" height="40" fill="url(#boxGradient2)" />
        {/* Top Face */}
        <polygon
          points="50,80 75,60 175,60 150,80"
          fill="url(#boxGradient2)"
          opacity="0.7"
        />
        {/* Right Face */}
        <polygon
          points="150,80 175,60 175,100 150,120"
          fill="url(#boxGradient2)"
          opacity="0.5"
        />
      </motion.g>

      {/* Top Box */}
      <motion.g
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Front Face */}
        <rect x="60" y="40" width="80" height="40" fill="url(#boxGradient3)" />
        {/* Top Face */}
        <polygon
          points="60,40 80,25 160,25 140,40"
          fill="url(#boxGradient3)"
          opacity="0.7"
        />
        {/* Right Face */}
        <polygon
          points="140,40 160,25 160,65 140,80"
          fill="url(#boxGradient3)"
          opacity="0.5"
        />
      </motion.g>

      {/* Floating Star for emphasis */}
      <motion.g
        animate={{ y: [-8, 8], rotate: 360 }}
        transition={{
          y: { duration: 3, repeat: Infinity, repeatType: 'reverse' },
          rotate: { duration: 8, repeat: Infinity, repeatType: 'loop' },
        }}
      >
        <polygon
          points="100,15 105,30 120,30 108,40 112,55 100,45 88,55 92,40 80,30 95,30"
          fill="#FFD700"
          opacity="0.6"
        />
      </motion.g>
    </svg>
  );
}

/**
 * Isometric Graduation Cap
 */
export function IsometricGraduationCap() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3d7fd6', stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>

      {/* Cap Board - Top */}
      <motion.polygon
        initial={{ opacity: 0, rotateX: 90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        points="50,80 100,60 150,80 100,100"
        fill="url(#capGradient)"
      />

      {/* Cap Board - Left Side */}
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        points="50,80 75,100 100,100 75,85"
        fill="url(#capGradient)"
        opacity="0.7"
      />

      {/* Cap Board - Right Side */}
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        points="150,80 125,100 100,100 125,85"
        fill="url(#capGradient)"
        opacity="0.5"
      />

      {/* Tassel */}
      <motion.line
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        x1="100"
        y1="100"
        x2="100"
        y2="160"
        stroke="#E5E7EB"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Tassel Ball */}
      <motion.circle
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        cx="100"
        cy="165"
        r="6"
        fill="#FFD700"
      />
    </svg>
  );
}

/**
 * Floating Geometric Particles - background animation
 */
export function GeometricParticles({ count = 5 }: { count?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.1 }}
    >
      <defs>
        <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4A90E2' }} />
          <stop offset="100%" style={{ stopColor: '#3B8075' }} />
        </linearGradient>
      </defs>
      {Array.from({ length: count }).map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 100 + '%'}
          cy={Math.random() * 100 + '%'}
          r={Math.random() * 30 + 10}
          fill="url(#particleGradient)"
          opacity={0.3}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </svg>
  );
}

/**
 * Animated Checkmark Circle
 */
export function AnimatedCheckmark() {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {/* Circle background */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#3B8075"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      />

      {/* Checkmark */}
      <motion.path
        d="M 30 50 L 45 65 L 70 35"
        fill="none"
        stroke="#3B8075"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />
    </motion.svg>
  );
}
