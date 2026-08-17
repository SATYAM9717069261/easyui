import type { Transition } from "framer-motion";

/**
 * EasyUI Motion Design Tokens
 * Philosophy: Soft + physical + immediate + controlled
 */

export const motionTransitions = {
  // Gentle fluid transitions (for tabs, smooth accordion, dialog fades)
  springGentle: {
    type: "spring",
    stiffness: 280,
    damping: 30,
    mass: 0.8,
  } as Transition,

  // Snappy responsive feedback (for buttons, hover indicators, dock icons)
  springSnappy: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  } as Transition,

  // Morphing shared layout (for layoutId dialogs, expanding search, tabs background)
  springMorph: {
    type: "spring",
    stiffness: 320,
    damping: 28,
    mass: 0.9,
  } as Transition,

  // Responsive bounce physics (for magnetic pull return, toasts stack)
  springResponsive: {
    type: "spring",
    stiffness: 350,
    damping: 22,
    mass: 0.6,
  } as Transition,

  // Subtle ease for standard property transitions
  easeSoft: {
    duration: 0.22,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,

  easeFast: {
    duration: 0.15,
    ease: [0.2, 0, 0, 1],
  } as Transition,
};
