export type ComponentCategory = 'All' | 'Motion' | 'Buttons' | 'Navigation' | 'Feedback' | 'Overlays';

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface EasyComponentMeta {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ComponentCategory;
  badges: string[];
  cliCommand: string;
  usageCode: string;
  sourceCode: string;
  props: ComponentProp[];
  accessibility: string[];
  features: string[];
}
