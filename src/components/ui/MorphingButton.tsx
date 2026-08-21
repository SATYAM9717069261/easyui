import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type ButtonStatusState = 'idle' | 'loading' | 'success' | 'error';
export type MorphingButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export interface MorphingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'style'> {
  /** Current state of button */
  status?: ButtonStatusState;
  /** Idle state label */
  idleText?: string;
  /** Loading state label */
  loadingText?: string;
  /** Success state label */
  successText?: string;
  /** Error state label */
  errorText?: string;
  /** Visual variant tone */
  variant?: MorphingButtonVariant;
  /** Custom idle icon */
  idleIcon?: React.ReactNode;
  /** Custom success icon */
  successIcon?: React.ReactNode;
  /** Custom error icon */
  errorIcon?: React.ReactNode;
  /** Click action handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Custom class name */
  className?: string;
}

export const MorphingButton: React.FC<MorphingButtonProps> = ({
  status = 'idle',
  idleText = 'Save Changes',
  loadingText = 'Saving...',
  successText = 'Saved',
  errorText = 'Failed',
  variant = 'primary',
  idleIcon = <Save className="w-3.5 h-3.5" />,
  successIcon = <Check className="w-3.5 h-3.5 text-emerald-400" />,
  errorIcon = <AlertCircle className="w-3.5 h-3.5 text-rose-400" />,
  disabled = false,
  onClick,
  className,
  ...props
}) => {
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const variantStyles: Record<MorphingButtonVariant, string> = {
    primary:
      'bg-[#F5F5F5] text-[#050505] hover:bg-white border-transparent shadow-[0_0_20px_-3px_rgba(255,255,255,0.15)]',
    secondary:
      'bg-[#141414] text-[#F5F5F5] hover:bg-[#1C1C1C] border-[#222222] hover:border-[#333333]',
    danger:
      'bg-[#1C1212] text-rose-300 hover:bg-[#2A1818] border-[#381B1B] hover:border-rose-500/40',
    ghost:
      'bg-transparent text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#141414] border-transparent',
  };

  return (
    <motion.button
      whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
      transition={motionTransitions.springSnappy}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center font-medium select-none focus-ring px-4 py-2 text-xs sm:text-sm rounded-lg border transition-all duration-200 min-h-[38px] min-w-[120px] overflow-hidden',
        variantStyles[variant],
        disabled && 'opacity-30 cursor-not-allowed',
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoading && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={motionTransitions.springSnappy}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{loadingText}</span>
          </motion.span>
        )}

        {isSuccess && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={motionTransitions.springSnappy}
            className="flex items-center gap-2 text-emerald-400 font-semibold"
          >
            {successIcon}
            <span>{successText}</span>
          </motion.span>
        )}

        {isError && (
          <motion.span
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={motionTransitions.springSnappy}
            className="flex items-center gap-2 text-rose-400 font-semibold"
          >
            {errorIcon}
            <span>{errorText}</span>
          </motion.span>
        )}

        {status === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={motionTransitions.springSnappy}
            className="flex items-center gap-2"
          >
            {idleIcon}
            <span>{idleText}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
