import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Toast Container - Manages toast notifications
 */
export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      duration = 5000,
      action?: Toast['action']
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast: Toast = { id, message, type, duration, action };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

/**
 * Toast Item - Individual notification
 */
export function Toast({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  const icons = {
    success: { icon: CheckCircle2, color: 'from-[#3B8075] to-[#66A5AD]' },
    error: { icon: AlertCircle, color: 'from-[#702006] to-[#8B0000]' },
    warning: { icon: AlertCircle, color: 'from-[#F59E0B] to-[#D97706]' },
    info: { icon: Info, color: 'from-[#4A90E2] to-[#3d7fd6]' },
  };

  const config = icons[toast.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`bg-gradient-to-r ${config.color} rounded-lg p-4 shadow-lg flex items-start gap-4`}
    >
      <Icon className="size-5 text-white flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-white text-sm font-medium">{toast.message}</p>
        {toast.action && (
          <button
            onClick={() => {
              toast.action?.onClick();
              onClose();
            }}
            className="text-xs text-white/80 hover:text-white underline mt-1"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white flex-shrink-0"
      >
        <X className="size-4" />
      </button>
    </motion.div>
  );
}

/**
 * Toast Container - Renders all toasts
 */
export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: Toast[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-0 right-0 p-4 sm:p-6 space-y-3 pointer-events-none z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onClose={() => onClose(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
