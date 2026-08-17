import type { EasyComponentMeta } from '../../types/component';

export const EASY_COMPONENTS: EasyComponentMeta[] = [
  {
    id: 'magnetic-button',
    name: 'Magnetic Button',
    tagline: 'Cursor-aware spring translation physics',
    description: 'A responsive button with subtle proximity-based physics that pulls towards the cursor on hover and snaps back on departure.',
    category: 'Buttons',
    badges: ['Spring Physics', 'Micro-interaction', 'Tailwind'],
    cliCommand: 'npx shadcn@latest add @easyui/magnetic-button',
    features: [
      'Spring physics coordinate tracking via Framer Motion',
      'Configurable pull strength and threshold',
      'Subtle ambient glow gradient reflection',
      'Four restrained surface styles: Primary, Secondary, Outline, Ghost',
    ],
    props: [
      { name: 'strength', type: 'number', default: '0.35', description: 'Cursor pull distance multiplier' },
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost'", default: "'primary'", description: 'Visual surface presentation' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button dimensions and typography' },
      { name: 'glow', type: 'boolean', default: 'true', description: 'Enable subtle background glow on hover' },
    ],
    accessibility: [
      'Focus visible ring with restrained cyan accent',
      'Standard native button semantics & keyboard Enter/Space activation',
      'Respects prefers-reduced-motion media query',
    ],
    usageCode: `import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowUpRight } from "lucide-react";

export function Demo() {
  return (
    <MagneticButton strength={0.4} variant="primary">
      <span>Get Started</span>
      <ArrowUpRight className="w-4 h-4" />
    </MagneticButton>
  );
}`,
    sourceCode: `import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
  variant = 'primary',
  size = 'md',
  glow = true,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(0, { stiffness: 280, damping: 20 });
  const springY = useSpring(0, { stiffness: 280, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    springX.set(middleX * strength);
    springY.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    springX.set(0);
    springY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className="relative inline-flex items-center justify-center rounded-lg font-medium transition-colors"
      {...props}
    >
      {glow && isHovered && (
        <span className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-40 blur-sm bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};`,
  },
  {
    id: 'spotlight-card',
    name: 'Spotlight Card',
    tagline: 'Radial pointer tracking over dark layered surface',
    description: 'A dark elevated surface that illuminates border and inner surfaces dynamically based on mouse pointer coordinates.',
    category: 'Motion',
    badges: ['Shader Feel', 'Pointer Physics', 'Dark Elevation'],
    cliCommand: 'npx shadcn@latest add @easyui/spotlight-card',
    features: [
      'Hardware-accelerated dynamic radial mask',
      'Dual illumination (border beam + ambient inner glow)',
      'Near-black layered background preservation',
    ],
    props: [
      { name: 'spotlightColor', type: 'string', default: "'rgba(56, 189, 248, 0.08)'", description: 'Inner ambient radial color' },
      { name: 'spotlightSize', type: 'number', default: '350', description: 'Radius of spotlight effect in pixels' },
    ],
    accessibility: [
      'Accessible contrast ratio for all nested text and actions',
      'No reliance on animation for critical content reading',
    ],
    usageCode: `import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Demo() {
  return (
    <SpotlightCard className="max-w-sm">
      <h3 className="text-base font-semibold text-white">Edge Computing</h3>
      <p className="text-sm text-neutral-400 mt-2">
        Deploy globally distributed stateful workloads in 35 regions.
      </p>
    </SpotlightCard>
  );
}`,
    sourceCode: `import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export const SpotlightCard = ({ children, spotlightColor = 'rgba(56, 189, 248, 0.08)', spotlightSize = 350, className }) => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const backgroundGradient = useMotionTemplate\`radial-gradient(\${spotlightSize}px circle at \${mouseX}px \${mouseY}px, \${spotlightColor}, transparent 80%)\`;
  const borderGradient = useMotionTemplate\`radial-gradient(220px circle at \${mouseX}px \${mouseY}px, rgba(255, 255, 255, 0.18), transparent 80%)\`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-xl border border-[#1D1D1D] bg-[#0A0A0A] p-6 overflow-hidden"
    >
      <motion.div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: borderGradient }} />
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: backgroundGradient }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};`,
  },
  {
    id: 'morphing-dialog',
    name: 'Morphing Dialog',
    tagline: 'Seamless shared layoutId card to modal transition',
    description: 'An expandable card trigger that fluidly morphs into a centered dialog without jarring popup animations.',
    category: 'Overlays',
    badges: ['Shared Layout', 'Spring Physics', 'Zero Layout Shift'],
    cliCommand: 'npx shadcn@latest add @easyui/morphing-dialog',
    features: [
      'Framer Motion layoutId continuous surface expansion',
      'Esc key dismissal and backdrop click support',
      'Body scroll lock handling during active state',
    ],
    props: [
      { name: 'title', type: 'string', default: 'Required', description: 'Dialog header title' },
      { name: 'subtitle', type: 'string', default: 'undefined', description: 'Secondary header description' },
      { name: 'trigger', type: '(open: () => void) => ReactNode', default: 'Required', description: 'Render trigger button or card' },
    ],
    accessibility: [
      'Traps focus and sets aria-modal="true"',
      'Closes on Escape key press with focus restoration',
    ],
    usageCode: `import { MorphingDialog } from "@/components/ui/morphing-dialog";

export function Demo() {
  return (
    <MorphingDialog
      title="API Key Configuration"
      subtitle="Manage fine-grained token permissions"
      trigger={(open) => (
        <button onClick={open} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm">
          Configure Keys
        </button>
      )}
    >
      <p className="text-sm text-neutral-300">Set read/write boundaries for automation tasks.</p>
    </MorphingDialog>
  );
}`,
    sourceCode: `// See full implementation in MorphingDialog.tsx`,
  },
  {
    id: 'animated-tabs',
    name: 'Animated Tabs',
    tagline: 'Layout-spring sliding active pill indicator',
    description: 'A tabbed switcher with physical pill indicator sliding smoothly between active items with content cross-fades.',
    category: 'Navigation',
    badges: ['Layout Springs', 'Accessible', 'Keyboard Friendly'],
    cliCommand: 'npx shadcn@latest add @easyui/animated-tabs',
    features: [
      'Shared layout active pill with spring easing',
      'Independent content animation cross-fade',
      'Badge count support for notifications',
    ],
    props: [
      { name: 'tabs', type: 'TabItem[]', default: '[]', description: 'Array of tabs with id, label, icon, content' },
      { name: 'defaultTab', type: 'string', default: 'tabs[0].id', description: 'Initial active tab ID' },
      { name: 'onChange', type: '(id: string) => void', default: 'undefined', description: 'Tab change callback' },
    ],
    accessibility: ['ARIA tablist, tab, and tabpanel roles', 'Keyboard arrow navigation'],
    usageCode: `import { AnimatedTabs } from "@/components/ui/animated-tabs";

export function Demo() {
  const tabs = [
    { id: 'overview', label: 'Overview', content: <div>Metrics Overview</div> },
    { id: 'analytics', label: 'Analytics', content: <div>Traffic Charts</div> },
    { id: 'settings', label: 'Settings', content: <div>Preferences</div> },
  ];
  return <AnimatedTabs tabs={tabs} defaultTab="overview" />;
}`,
    sourceCode: `// See full implementation in AnimatedTabs.tsx`,
  },
  {
    id: 'floating-dock',
    name: 'Floating Action Dock',
    tagline: 'Magnification curve with physical spring feedback',
    description: 'A floating quick-action toolbar inspired by macOS dock physics with smooth magnification and subtle tooltips.',
    category: 'Navigation',
    badges: ['Pointer Physics', 'Magnification Curve', 'Tooltips'],
    cliCommand: 'npx shadcn@latest add @easyui/floating-action-dock',
    features: [
      'Continuous distance interpolation curve',
      'Tooltips with instant spring opacity',
      'Active status indicator dot',
    ],
    props: [
      { name: 'items', type: 'DockItem[]', default: '[]', description: 'Dock icons with labels, actions, and icons' },
      { name: 'activeId', type: 'string', default: 'undefined', description: 'Current active item identifier' },
    ],
    accessibility: ['Standard aria-labels for every button item', 'Accessible keyboard focus'],
    usageCode: `import { FloatingActionDock } from "@/components/ui/floating-action-dock";
import { Terminal, Code2, Sparkles, Settings } from "lucide-react";

export function Demo() {
  const items = [
    { id: 'terminal', label: 'Terminal', icon: <Terminal /> },
    { id: 'editor', label: 'Editor', icon: <Code2 /> },
    { id: 'ai', label: 'AI Assistant', icon: <Sparkles /> },
  ];
  return <FloatingActionDock items={items} activeId="terminal" />;
}`,
    sourceCode: `// See full implementation in FloatingActionDock.tsx`,
  },
  {
    id: 'notification-stack',
    name: 'Notification Stack',
    tagline: 'Physics swipe-to-dismiss toast stack',
    description: 'A stacked notification card system with physical spring stacking elevation, swipe-to-dismiss drag, and simulation triggers.',
    category: 'Feedback',
    badges: ['Drag Physics', 'Elevation Stacking', 'Interactive'],
    cliCommand: 'npx shadcn@latest add @easyui/notification-stack',
    features: [
      'Interactive drag-to-dismiss with spring rebound',
      'Dynamic stacking elevation offset and scale',
      'Expandable history view',
    ],
    props: [
      { name: 'initialNotifications', type: 'NotificationItem[]', default: '[]', description: 'Initial items' },
      { name: 'maxVisible', type: 'number', default: '3', description: 'Max stacked cards in compact view' },
    ],
    accessibility: ['Polite aria-live region announcements', 'Dismiss button with accessible label'],
    usageCode: `import { NotificationStack } from "@/components/ui/notification-stack";

export function Demo() {
  return <NotificationStack maxVisible={3} />;
}`,
    sourceCode: `// See full implementation in NotificationStack.tsx`,
  },
  {
    id: 'command-menu',
    name: 'Command Menu',
    tagline: 'Global ⌘K fuzzy palette with category grouping',
    description: 'A global keyboard-first command palette with fuzzy filtering, category badges, and keyboard arrow controls.',
    category: 'Overlays',
    badges: ['Keyboard First', '⌘K / Ctrl+K', 'Fuzzy Filtering'],
    cliCommand: 'npx shadcn@latest add @easyui/command-menu',
    features: [
      'Global hotkey listener (⌘K / Ctrl+K)',
      'Arrow key navigation with wrapping',
      'Category badges and action shortcuts',
    ],
    props: [
      { name: 'isOpen', type: 'boolean', default: 'false', description: 'Control visibility' },
      { name: 'onClose', type: '() => void', default: 'Required', description: 'Close handler callback' },
    ],
    accessibility: ['ARIA combobox pattern', 'Keyboard-only navigation'],
    usageCode: `import { CommandMenu } from "@/components/ui/command-menu";
import { useState } from "react";

export function Demo() {
  const [open, setOpen] = useState(false);
  return <CommandMenu isOpen={open} onClose={() => setOpen(false)} />;
}`,
    sourceCode: `// See full implementation in CommandMenu.tsx`,
  },
  {
    id: 'expandable-search',
    name: 'Expandable Search',
    tagline: 'Compact spring width morphing search input',
    description: 'A compact search pill that smoothly widens on focus with shortcut hint pills and clear button.',
    category: 'Navigation',
    badges: ['Spring Expansion', 'Shortcuts', 'Compact'],
    cliCommand: 'npx shadcn@latest add @easyui/expandable-search',
    features: [
      'Spring physics width expansion',
      'Shortcut badge hint',
      'Instant clear button on input',
    ],
    props: [
      { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Input placeholder text' },
      { name: 'onSearch', type: '(query: string) => void', default: 'undefined', description: 'Search query callback' },
    ],
    accessibility: ['Accessible search input role', 'Clear button accessible label'],
    usageCode: `import { ExpandableSearch } from "@/components/ui/expandable-search";

export function Demo() {
  return <ExpandableSearch onSearch={(q) => console.log(q)} />;
}`,
    sourceCode: `// See full implementation in ExpandableSearch.tsx`,
  },
  {
    id: 'reveal-card',
    name: 'Reveal Card',
    tagline: '3D cursor physics tilt with interactive glare reveal',
    description: 'A high-definition product card with smooth cursor-driven 3D perspective rotation, dynamic glare, and revealed content.',
    category: 'Motion',
    badges: ['3D Tilt', 'Dynamic Glare', 'Micro-interaction'],
    cliCommand: 'npx shadcn@latest add @easyui/reveal-card',
    features: [
      'Cursor-aware 3D perspective rotation springs',
      'Dynamic radial glare reflection overlay',
      'Hidden metadata section revealed on hover',
    ],
    props: [
      { name: 'maxTilt', type: 'number', default: '12', description: 'Max tilt angle in degrees' },
      { name: 'revealContent', type: 'ReactNode', default: 'undefined', description: 'Content shown on hover' },
    ],
    accessibility: ['Subtle tilt respects reduced-motion settings', 'All content accessible via DOM'],
    usageCode: `import { RevealCard } from "@/components/ui/reveal-card";

export function Demo() {
  return (
    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>
      <h4>Cloud Engine</h4>
    </RevealCard>
  );
}`,
    sourceCode: `// See full implementation in RevealCard.tsx`,
  },
  {
    id: 'smooth-accordion',
    name: 'Smooth Accordion',
    tagline: 'Zero-jank spring collapsible content panels',
    description: 'An accordion component with physics height transition, rotating chevron indicators, and accessible keyboard toggles.',
    category: 'Feedback',
    badges: ['Spring Height', 'Zero Layout Shift', 'Multi or Single'],
    cliCommand: 'npx shadcn@latest add @easyui/smooth-accordion',
    features: [
      'Spring physics height interpolation',
      'Zero content clipping or layout jumps',
      'Single or multi-panel open mode',
    ],
    props: [
      { name: 'items', type: 'AccordionItem[]', default: '[]', description: 'Accordion items' },
      { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allow multiple open panels' },
    ],
    accessibility: ['WAI-ARIA accordion pattern', 'aria-expanded and aria-controls attributes'],
    usageCode: `import { SmoothAccordion } from "@/components/ui/smooth-accordion";

export function Demo() {
  const items = [
    { id: '1', title: 'How does ownership work?', content: 'You copy the full code directly into your repository.' },
    { id: '2', title: 'Can I customize the springs?', content: 'Yes, all motion tokens are standard Framer Motion props.' }
  ];
  return <SmoothAccordion items={items} />;
}`,
    sourceCode: `// See full implementation in SmoothAccordion.tsx`,
  },
  {
    id: 'dot-field',
    name: 'Dot Field',
    tagline: 'Interactive Canvas particle matrix with cursor bulge & glow',
    description: 'High-performance interactive Canvas dot matrix from React Bits with cursor proximity physics, radial glow aura, and customizable dispersion.',
    category: 'Motion',
    badges: ['HTML5 Canvas', 'React Bits', 'Interactive Physics'],
    cliCommand: 'npx shadcn@latest add @easyui/dot-field',
    features: [
      '60 FPS Canvas hardware-accelerated rendering',
      'Cursor repulsion and proximity bulge physics',
      'SVG radial glow aura tracking',
      'Dynamic gradient coloring and sparkle mode',
    ],
    props: [
      { name: 'dotRadius', type: 'number', default: '1.5', description: 'Radius of each individual dot' },
      { name: 'dotSpacing', type: 'number', default: '14', description: 'Spacing between dots in the grid' },
      { name: 'bulgeStrength', type: 'number', default: '67', description: 'Strength of the bulge effect around cursor' },
      { name: 'glowRadius', type: 'number', default: '160', description: 'Radius of SVG glow effect' },
      { name: 'sparkle', type: 'boolean', default: 'false', description: 'Random sparkle animation on dots' },
      { name: 'gradientFrom', type: 'string', default: "'rgba(56, 189, 248, 0.35)'", description: 'Start gradient color' },
      { name: 'gradientTo', type: 'string', default: "'rgba(168, 85, 247, 0.25)'", description: 'End gradient color' },
      { name: 'glowColor', type: 'string', default: "'#120F17'", description: 'Radial glow color following cursor' },
    ],
    accessibility: ['Canvas decorative element', 'Aria-hidden/pointer-events safe layer'],
    usageCode: `import { DotField } from "@/components/ui/DotField";

export function Demo() {
  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-xl bg-[#0A0A0A]">
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={true}
        gradientFrom="rgba(56, 189, 248, 0.35)"
        gradientTo="rgba(168, 85, 247, 0.25)"
      />
    </div>
  );
}`,
    sourceCode: `// See full implementation in DotField.tsx`,
  },
];
