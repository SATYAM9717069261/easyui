import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Animated Tabs',
  description: 'A tabbed switcher with physical pill indicator sliding smoothly between active items with content cross-fades.',
  category: 'Navigation',
  tagline: 'Layout-spring sliding active pill indicator',
  badges: ['Layout Springs', 'Accessible', 'Keyboard Friendly'],
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
  accessibility: [
    'ARIA tablist, tab, and tabpanel roles',
    'Keyboard arrow navigation',
  ],
  usageCode: `import { AnimatedTabs } from "@/components/ui/animated-tabs";

export function Demo() {
  const tabs = [
    { id: 'overview', label: 'Overview', content: <div>Metrics Overview</div> },
    { id: 'analytics', label: 'Analytics', content: <div>Traffic Charts</div> },
    { id: 'settings', label: 'Settings', content: <div>Preferences</div> },
  ];
  return <AnimatedTabs tabs={tabs} defaultTab="overview" />;
}`,
};

export default meta;
