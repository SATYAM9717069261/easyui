import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Drag to Confirm',
  description: 'A physical drag-to-confirm slider for high-stakes and destructive actions, equipped with elastic spring snapback physics, progressive track illumination, and accessible keyboard fallbacks.',
  category: 'Buttons',
  tagline: 'Spring-resistant slider for confirming destructive or critical operations',
  badges: ['Confirmation', 'Gesture Physics', 'Safety Controls'],
  createdAt: '2026-08-21',
  features: [
    'Physical gesture drag handle with spring snapback upon incomplete drags',
    'Dynamic text opacity and track fill response correlated with drag distance',
    'Supports Delete, Archive, Confirm, Submit, and Unlock action profiles',
    'Automatic post-confirmation reset timer with customizable delay',
    'Full keyboard accessibility (Space/Enter to trigger) and touch screen compatibility',
  ],
  props: [
    { name: 'label', type: 'string', default: "'Slide to confirm'", description: 'Action instruction text rendered along track' },
    { name: 'confirmedLabel', type: 'string', default: "'Confirmed ✓'", description: 'Text shown when slider is locked into completion' },
    { name: 'actionType', type: "'delete' | 'archive' | 'confirm' | 'submit' | 'unlock' | 'continue'", default: "'confirm'", description: 'Action preset style' },
    { name: 'onConfirm', type: '() => void', default: 'undefined', description: 'Callback triggered upon successful confirmation completion' },
    { name: 'autoResetDelay', type: 'number', default: '2500', description: 'Milliseconds before resetting back to start' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables slider gesture and interaction' },
  ],
  accessibility: [
    'Accessible role="slider" with aria-valuemin, aria-valuemax, and aria-valuenow attributes',
    'Focus-visible ring around draggable handle for keyboard navigators',
    'Screen reader fallback action button for assistive tech users',
  ],
  usageCode: `import { DragToConfirm } from "@/components/ui/drag-to-confirm";

export function Demo() {
  return (
    <DragToConfirm
      actionType="delete"
      label="Slide to delete database →"
      confirmedLabel="Database Deleted"
      onConfirm={() => console.log('Destroy action confirmed')}
    />
  );
}`,
};

export default meta;
