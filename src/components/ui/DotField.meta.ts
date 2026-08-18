import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Dot Field',
  description: 'High-performance interactive Canvas dot matrix from React Bits with cursor proximity physics, radial glow aura, and customizable dispersion.',
  category: 'Motion',
  tagline: 'Interactive Canvas particle matrix with cursor bulge & glow',
  badges: ['HTML5 Canvas', 'React Bits', 'Interactive Physics'],
  createdAt: '2026-08-08',
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
  accessibility: [
    'Canvas decorative element',
    'Aria-hidden/pointer-events safe layer',
  ],
  usageCode: `import { DotField } from "@/components/ui/dot-field";

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
};

export default meta;
