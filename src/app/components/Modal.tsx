import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * Modal - Centered overlay modal for important content
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeButton = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeButton?: boolean;
}) {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className={`relative bg-[#1F2937] rounded-2xl border border-white/5 shadow-2xl max-w-full w-full ${sizes[size]}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-[#E5E7EB]">{title}</h2>
                {closeButton && (
                  <button
                    onClick={onClose}
                    className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors p-1 hover:bg-[#16213E] rounded-lg"
                  >
                    <X className="size-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Sidebar - Slide-in panel from the side
 */
export function Sidebar({
  isOpen,
  onClose,
  children,
  title,
  side = 'right',
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: 'left' | 'right';
}) {
  const slideDirection = side === 'left' ? { x: -400 } : { x: 400 };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.div
            className={`relative w-full max-w-sm h-full bg-[#1F2937] border-white/5 flex flex-col overflow-y-auto ${
              side === 'right' ? 'border-l ml-auto' : 'border-r'
            }`}
            initial={slideDirection}
            animate={{ x: 0 }}
            exit={slideDirection}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#1F2937]/80 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-[#E5E7EB]">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors p-1 hover:bg-[#16213E] rounded-lg"
                >
                  <X className="size-5" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Confirmation Dialog - Ask for user confirmation
 */
export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        {description && (
          <p className="text-[#9CA3AF]">{description}</p>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-[#E5E7EB] hover:bg-[#16213E] transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors ${
              isDangerous
                ? 'bg-[#702006] hover:bg-[#5a1805]'
                : 'bg-[#4A90E2] hover:bg-[#3d7fd6]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * Popover - Small floating content
 */
export function Popover({
  isOpen,
  onClose,
  children,
  trigger,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  trigger?: ReactNode;
}) {
  return (
    <div className="relative">
      {trigger && <div onClick={() => !isOpen && onClose()}>{trigger}</div>}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 bg-[#1F2937] rounded-lg border border-white/5 shadow-xl p-4 z-50 min-w-max"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
