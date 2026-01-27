import { motion } from 'motion/react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  completed?: boolean;
}

/**
 * Stepper/Progress Component - Shows multi-step process
 */
export function Stepper({
  steps,
  currentStep,
  onStepClick,
  completed = false,
}: StepperProps) {
  return (
    <div className="mb-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep || completed;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex-1">
                <div className="flex items-center">
                  {/* Circle / Icon */}
                  <motion.button
                    onClick={() => onStepClick?.(index)}
                    disabled={index > currentStep && !completed}
                    className="relative z-10 flex-shrink-0 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`size-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#3B8075]'
                          : isCurrent
                            ? 'bg-[#4A90E2] ring-4 ring-[#4A90E2]/20'
                            : 'bg-[#1F2937] border-2 border-white/10'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="size-6 text-white" />
                      ) : (
                        <span
                          className={`text-sm font-semibold ${
                            isCurrent
                              ? 'text-white'
                              : 'text-[#9CA3AF]'
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </motion.button>

                  {/* Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="flex-1 h-1 mx-4 rounded-full"
                      initial={{ backgroundColor: 'rgba(156, 163, 175, 0.2)' }}
                      animate={{
                        backgroundColor:
                          isCompleted || isCurrent
                            ? '#3B8075'
                            : 'rgba(156, 163, 175, 0.2)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                {/* Label */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p
                    className={`text-sm font-medium transition-colors ${
                      isCompleted || isCurrent
                        ? 'text-[#E5E7EB]'
                        : 'text-[#9CA3AF]'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-[#9CA3AF] mt-1">
                      {step.description}
                    </p>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep || completed;
            const isCurrent = index === currentStep;

            return (
              <motion.button
                key={step.id}
                onClick={() => onStepClick?.(index)}
                disabled={index > currentStep && !completed}
                className="w-full text-left p-4 rounded-lg border transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`size-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isCompleted
                        ? 'bg-[#3B8075]'
                        : isCurrent
                          ? 'bg-[#4A90E2] ring-4 ring-[#4A90E2]/20'
                          : 'bg-[#1F2937] border-2 border-white/10'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="size-5 text-white" />
                    ) : (
                      <span
                        className={`text-xs font-semibold ${
                          isCurrent ? 'text-white' : 'text-[#9CA3AF]'
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium transition-colors ${
                        isCompleted || isCurrent
                          ? 'text-[#E5E7EB]'
                          : 'text-[#9CA3AF]'
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Progress Ring - Circular progress indicator
 */
export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  label,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            strokeLinecap="round"
          />

          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: '#4A90E2' }} />
              <stop offset="100%" style={{ stopColor: '#3B8075' }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-[#E5E7EB]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>

      {label && (
        <p className="text-sm font-medium text-[#9CA3AF] text-center">
          {label}
        </p>
      )}
    </div>
  );
}
