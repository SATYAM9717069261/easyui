import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'success'
  | 'link'
  | 'gradient';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Visual presentation style */
  variant?: ButtonVariant;
  /** Dimension scale */
  size?: ButtonSize;
  /** Loading state displaying an animated spinner */
  isLoading?: boolean;
  /** Text or element displayed during loading */
  loadingText?: string;
  /** Icon placed before the button children */
  leftIcon?: React.ReactNode;
  /** Icon placed after the button children */
  rightIcon?: React.ReactNode;
  /** Expand button to fill 100% of container width */
  fullWidth?: boolean;
  /** Button content */
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-[#F5F5F5] text-[#050505] hover:bg-white shadow-[0_0_20px_-3px_rgba(255,255,255,0.15)] border border-transparent font-medium',
  primary:
    'bg-[#F5F5F5] text-[#050505] hover:bg-white shadow-[0_0_20px_-3px_rgba(255,255,255,0.15)] border border-transparent font-medium',
  secondary:
    'bg-[#151515] border border-[#1D1D1D] text-[#F5F5F5] hover:bg-[#1A1A1A] hover:border-[#2A2A2A]',
  outline:
    'bg-transparent border border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#101010] hover:border-[#F5F5F5]/30',
  ghost:
    'bg-transparent text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#101010] border border-transparent',
  destructive:
    'bg-[#1A0A0A] border border-[#3A1414] text-[#FF7A7A] hover:bg-[#260E0E] hover:border-[#521C1C]',
  success:
    'bg-[#0A160F] border border-[#143320] text-[#6EE7B7] hover:bg-[#0F2218] hover:border-[#1E4D30]',
  link:
    'bg-transparent text-[#F5F5F5] underline-offset-4 hover:underline p-0 h-auto border-0 focus-ring shadow-none inline-flex',
  gradient:
    'bg-[#121212] border border-[#282828] text-[#F5F5F5] hover:border-[#383838] relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.04)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
  md: 'h-10 px-4.5 text-sm rounded-lg gap-2',
  lg: 'h-12 px-6 text-base rounded-lg gap-2.5',
  icon: 'h-10 w-10 p-0 rounded-lg justify-center shrink-0',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        transition={motionTransitions.springSnappy}
        aria-busy={isLoading}
        className={cn(
          'relative inline-flex items-center justify-center font-medium select-none focus-ring transition-colors duration-150',
          variantStyles[variant],
          variant !== 'link' && sizeStyles[size],
          fullWidth && 'w-full',
          isDisabled && 'opacity-30 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {/* Subtle shimmer gradient for gradient variant */}
        {variant === 'gradient' && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Loading Spinner or Left Icon */}
        {isLoading ? (
          <Loader2 className={cn('animate-spin shrink-0', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        {/* Button Content */}
        {isLoading && loadingText ? (
          <span>{loadingText}</span>
        ) : (
          children && <span>{children}</span>
        )}

        {/* Right Icon */}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
