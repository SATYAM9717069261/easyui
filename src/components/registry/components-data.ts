// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../types/component';

export const EASY_COMPONENTS: EasyComponentMeta[] = [
  {
    "id": "activity-feed",
    "name": "Activity Feed",
    "tagline": "Real-time telemetry event stream with expandable audit payloads",
    "description": "A developer telemetry and audit log stream featuring category filtering, live real-time event simulation with Framer Motion slide insertions, and expandable JSON payloads.",
    "category": "Feedback",
    "badges": [
      "Audit Logs",
      "Live Stream",
      "JSON Inspector"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/activity-feed",
    "features": [
      "Real-time simulation toggle streaming live webhook/deploy events",
      "Framer Motion layout and AnimatePresence entry transitions",
      "Category filtering (Deploy, Security, API, System) with live count tags",
      "Integrated JSON payload inspector with syntax highlighting and copy",
      "One-click trace ID copying with animated validation feedback"
    ],
    "props": [
      {
        "name": "events",
        "type": "ActivityEvent[]",
        "default": "[]",
        "description": "Array of audit or telemetry activity events"
      },
      {
        "name": "enableLiveSimulation",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the interactive simulated live stream toggle"
      },
      {
        "name": "enableFilters",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display category filter pill buttons"
      },
      {
        "name": "enableSearch",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the trace search input"
      },
      {
        "name": "maxEntries",
        "type": "number",
        "default": "20",
        "description": "Maximum items retained in stream before pruning"
      },
      {
        "name": "onEventReplay",
        "type": "(event: ActivityEvent) => void",
        "default": "undefined",
        "description": "Optional callback to replay a logged event"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional custom CSS class"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA feed and log roles",
      "Accessible button controls for payload expansion and trace copy",
      "Screen reader compliant status indicators"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { ActivityFeed } from \"@/components/ui/activity-feed\";\n\nconst events = [\n  {\n    id: \"evt-1\",\n    type: \"deploy\" as const,\n    status: \"success\" as const,\n    title: \"Edge Lambda function deployed\",\n    timestamp: \"2 mins ago\",\n    description: \"Release v2.4.0 deployed to us-east-1 and eu-central-1.\",\n    duration: \"240ms\",\n    traceId: \"trc_98fa2\",\n    actor: { name: \"DeployBot\" },\n    payload: { version: \"2.4.0\", sha: \"8f3b2a\" },\n  },\n  {\n    id: \"evt-2\",\n    type: \"security\" as const,\n    status: \"warning\" as const,\n    title: \"MFA challenge requested\",\n    timestamp: \"12 mins ago\",\n    actor: { name: \"alex@company.com\" },\n  },\n];\n\nexport function Demo() {\n  return <ActivityFeed events={events} enableLiveSimulation={true} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ActivityFeed.tsx",
        "type": "registry:ui",
        "target": "components/ui/activity-feed.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "animated-file-upload",
    "name": "Animated File Upload",
    "tagline": "Physical drag-and-drop file uploader with per-file progress morphing",
    "description": "A minimal, physical drag-and-drop file uploader with smooth drop reaction, independent file upload tracking, progressive state morphing, and accessible retry flows.",
    "category": "Forms",
    "badges": [
      "Drag & Drop",
      "Forms",
      "Spring Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-file-upload",
    "features": [
      "Subtle physical dropzone scaling and border reaction without exaggerated AI glow",
      "Automatic mime-type detection and contextual file icon attribution",
      "Multi-file queue management with independent Uploading → Processing → Complete stages",
      "Self-morphing progress bar into checkmark state with non-aggressive error recovery",
      "Customizable file constraints (maxSize, maxFiles, accept) with accessible screen reader labels"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "boolean",
        "default": "true",
        "description": "Allow multiple files selection and upload"
      },
      {
        "name": "accept",
        "type": "string | string[]",
        "default": "undefined",
        "description": "Accepted MIME types or file extensions (e.g. image/*, .pdf)"
      },
      {
        "name": "maxSize",
        "type": "number",
        "default": "26214400 (25MB)",
        "description": "Maximum file size in bytes"
      },
      {
        "name": "maxFiles",
        "type": "number",
        "default": "10",
        "description": "Maximum number of concurrent files in list"
      },
      {
        "name": "dropTitle",
        "type": "string",
        "default": "'Drop files here'",
        "description": "Primary drop target heading"
      },
      {
        "name": "dropSubtitle",
        "type": "string",
        "default": "'or browse from your device'",
        "description": "Secondary call-to-action text"
      },
      {
        "name": "variant",
        "type": "'standard' | 'compact'",
        "default": "'standard'",
        "description": "Display density mode"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables all interactions and file picking"
      },
      {
        "name": "onFilesSelected",
        "type": "(files: File[]) => void",
        "default": "undefined",
        "description": "Callback triggered when files are chosen"
      },
      {
        "name": "onUploadComplete",
        "type": "(file: UploadFileItem) => void",
        "default": "undefined",
        "description": "Callback fired on successful upload completion"
      },
      {
        "name": "uploadHandler",
        "type": "(file, onProgress) => Promise<void>",
        "default": "undefined",
        "description": "Custom async upload handler returning a promise"
      }
    ],
    "accessibility": [
      "Keyboard accessible dropzone triggerable via Enter or Space key",
      "Hidden semantic file input accessible to assistive technologies",
      "Aria-live announcements for file upload progression, completion, and error states",
      "Respects prefers-reduced-motion with instant state changes"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { AnimatedFileUpload } from \"@/components/ui/animated-file-upload\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-md mx-auto p-4\">\n      <AnimatedFileUpload\n        multiple\n        maxSize={10 * 1024 * 1024}\n        accept=\"image/*,application/pdf\"\n        onFilesSelected={(files) => console.log('Selected:', files)}\n        onUploadComplete={(file) => console.log('Uploaded:', file.name)}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedFileUpload.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-file-upload.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "animated-number",
    "name": "Animated Number Morph",
    "tagline": "Independent column digit rolling physics for metrics and financial dashboards",
    "description": "An Apple-grade smooth rolling digit counter that independently morphs individual numerical columns with physics-based springs, locale commas, currencies, and compact notation.",
    "category": "Motion",
    "badges": [
      "Metrics",
      "Motion Physics",
      "Typography"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-number",
    "features": [
      "Independent digit column spring animation preventing layout jitter",
      "Automatic thousand grouping (e.g. 12,450) and fixed decimal formatting",
      "Compact notation support for large values (1.2M, 45K)",
      "Configurable prefixes, suffixes, and spring stiffness parameters",
      "Full accessibility with aria-label text narration"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "default": "0",
        "description": "The numeric target value to morph towards"
      },
      {
        "name": "decimals",
        "type": "number",
        "default": "0",
        "description": "Number of decimal places to preserve"
      },
      {
        "name": "prefix",
        "type": "string",
        "default": "''",
        "description": "Text or currency prepended to number (e.g. \"$\")"
      },
      {
        "name": "suffix",
        "type": "string",
        "default": "''",
        "description": "Text or unit appended to number (e.g. \"%\", \"ms\")"
      },
      {
        "name": "useGrouping",
        "type": "boolean",
        "default": "true",
        "description": "Formats with comma separators"
      },
      {
        "name": "compact",
        "type": "boolean",
        "default": "false",
        "description": "Formats using compact abbreviations (K, M, B)"
      },
      {
        "name": "stiffness",
        "type": "number",
        "default": "170",
        "description": "Spring transition stiffness"
      },
      {
        "name": "damping",
        "type": "number",
        "default": "22",
        "description": "Spring transition damping"
      }
    ],
    "accessibility": [
      "Screen readers read the complete rendered string via aria-label attribute",
      "Bypasses motion if user has reduced-motion preference enabled"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { AnimatedNumber } from \"@/components/ui/animated-number\";\n\nexport function Demo() {\n  const [revenue, setRevenue] = useState(12450);\n\n  return (\n    <div className=\"text-3xl font-bold\">\n      <AnimatedNumber value={revenue} prefix=\"$\" useGrouping />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedNumber.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-number.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "animated-tabs",
    "name": "Animated Tabs",
    "tagline": "Layout-spring sliding active pill indicator",
    "description": "A tabbed switcher with physical pill indicator sliding smoothly between active items with content cross-fades.",
    "category": "Navigation",
    "badges": [
      "Layout Springs",
      "Accessible",
      "Keyboard Friendly"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-tabs",
    "features": [
      "Shared layout active pill with spring easing",
      "Independent content animation cross-fade",
      "Badge count support for notifications"
    ],
    "props": [
      {
        "name": "tabs",
        "type": "TabItem[]",
        "default": "[]",
        "description": "Array of tabs with id, label, icon, content"
      },
      {
        "name": "defaultTab",
        "type": "string",
        "default": "tabs[0].id",
        "description": "Initial active tab ID"
      },
      {
        "name": "onChange",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Tab change callback"
      }
    ],
    "accessibility": [
      "ARIA tablist, tab, and tabpanel roles",
      "Keyboard arrow navigation"
    ],
    "createdAt": "2026-08-10",
    "usageCode": "import { AnimatedTabs } from \"@/components/ui/animated-tabs\";\n\nexport function Demo() {\n  const tabs = [\n    { id: 'overview', label: 'Overview', content: <div>Metrics Overview</div> },\n    { id: 'analytics', label: 'Analytics', content: <div>Traffic Charts</div> },\n    { id: 'settings', label: 'Settings', content: <div>Preferences</div> },\n  ];\n  return <AnimatedTabs tabs={tabs} defaultTab=\"overview\" />;\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedTabs.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-tabs.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "button",
    "name": "Button",
    "tagline": "Multi-variant button system with tactile physics",
    "description": "A versatile, production-ready button system with 8 visual variants, 4 sizes, loading spinner states, icon slots, and spring tap feedback.",
    "category": "Buttons",
    "badges": [
      "Multi-variant",
      "Spring Tap",
      "Micro-interactions",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/button",
    "features": [
      "8 visual variants: Primary, Secondary, Outline, Ghost, Destructive, Success, Link, Gradient",
      "4 size dimensions: Small (sm), Medium (md), Large (lg), and square Icon",
      "Spring tap micro-interaction (whileTap 0.97) via Framer Motion",
      "Accessible loading state with integrated monochrome spinner & aria-busy",
      "Left and right icon slots with automatic sizing and gap alignment",
      "Full width layout support (fullWidth)",
      "Strictly adheres to EasyUI monochrome dark palette and sky focus ring"
    ],
    "props": [
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'link' | 'gradient'",
        "default": "'primary'",
        "description": "Visual presentation style"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg' | 'icon'",
        "default": "'md'",
        "description": "Dimensions and typography scale"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Displays an animated spinner and disables user interaction"
      },
      {
        "name": "loadingText",
        "type": "string",
        "default": "undefined",
        "description": "Optional text displayed alongside the loading spinner"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed before children"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed after children"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "default": "false",
        "description": "Stretches button to 100% width of parent container"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction and applies 30% disabled opacity"
      }
    ],
    "accessibility": [
      "Native <button> semantics with explicit type=\"button\" default",
      "Standard focus-ring outline with Sky-400 accent on keyboard :focus-visible",
      "Proper aria-busy and disabled accessibility states",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Button } from \"@/components/ui/button\";\nimport { Sparkles, ArrowRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-3\">\n      <Button variant=\"primary\" leftIcon={<Sparkles className=\"w-4 h-4\" />}>\n        Get Started\n      </Button>\n      <Button variant=\"secondary\">Secondary</Button>\n      <Button variant=\"outline\">Outline</Button>\n      <Button variant=\"ghost\">Ghost</Button>\n      <Button variant=\"destructive\">Destructive</Button>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Button.tsx",
        "type": "registry:ui",
        "target": "components/ui/button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "code-snippet-deck",
    "name": "Code Snippet Deck",
    "tagline": "Multi-language code runner snippet deck with live variable tuning",
    "description": "An interactive multi-runtime developer code snippet deck with runtime switching (cURL, TypeScript, Python, Go, Rust), live dynamic parameter customizations, and line highlighting.",
    "category": "Buttons",
    "badges": [
      "Code Runner",
      "Multi-Runtime",
      "Live Customizer"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/code-snippet-deck",
    "features": [
      "Seamless multi-runtime tab switching (cURL, TypeScript, Python, Go, Rust)",
      "Dynamic parameter tuning drawer that updates generated code in real time",
      "Configurable line numbers and selective line highlighting",
      "macOS terminal-inspired window header with traffic dots and copy system",
      "Zero layout shift spring transition on tab changes"
    ],
    "props": [
      {
        "name": "snippets",
        "type": "SnippetItem[]",
        "default": "[]",
        "description": "Collection of language snippets and generator functions"
      },
      {
        "name": "parameters",
        "type": "SnippetParameter[]",
        "default": "[]",
        "description": "Configurable runtime variables (checkboxes, dropdowns, inputs)"
      },
      {
        "name": "defaultLanguage",
        "type": "string",
        "default": "snippets[0]?.language",
        "description": "Initially selected language key"
      },
      {
        "name": "showLineNumbers",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display code line numbering"
      },
      {
        "name": "showWindowBar",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render macOS window bar header"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS container classes"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA code viewer roles",
      "Accessible tablist and tab roles with keyboard navigation",
      "High contrast accessible code text styling"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { CodeSnippetDeck } from \"@/components/ui/code-snippet-deck\";\n\nconst snippets = [\n  {\n    language: \"typescript\",\n    label: \"TypeScript\",\n    filename: \"client.ts\",\n    highlightLines: [4, 5],\n    code: (p: any) => `import { EasyClient } from \"@easyui/sdk\";\n\nconst client = new EasyClient({\n  apiKey: \"${p.apiKey || \"sk_live_9981\"}\",\n  streaming: ${p.stream ? \"true\" : \"false\"},\n});\n\nconst response = await client.completions.create({\n  model: \"easy-4o\",\n  prompt: \"Generate modern dark UI\",\n});`,\n  },\n  {\n    language: \"curl\",\n    label: \"cURL\",\n    filename: \"request.sh\",\n    code: (p: any) => `curl https://api.easyui.dev/v1/completions \\\n  -H \"Authorization: Bearer ${p.apiKey || \"sk_live_9981\"}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\": \"easy-4o\", \"stream\": ${p.stream ? \"true\" : \"false\"}}'`,\n  },\n];\n\nconst parameters = [\n  { id: \"stream\", label: \"Stream response\", type: \"boolean\" as const, defaultValue: true },\n  { id: \"apiKey\", label: \"API Key\", type: \"text\" as const, defaultValue: \"sk_live_demo\" },\n];\n\nexport function Demo() {\n  return <CodeSnippetDeck snippets={snippets} parameters={parameters} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/CodeSnippetDeck.tsx",
        "type": "registry:ui",
        "target": "components/ui/code-snippet-deck.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "command-menu",
    "name": "Command Menu",
    "tagline": "Global ⌘K fuzzy palette with category grouping",
    "description": "A global keyboard-first command palette with fuzzy filtering, category badges, and keyboard arrow controls.",
    "category": "Overlays",
    "badges": [
      "Keyboard First",
      "⌘K / Ctrl+K",
      "Fuzzy Filtering"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/command-menu",
    "features": [
      "Global hotkey listener (⌘K / Ctrl+K)",
      "Arrow key navigation with wrapping",
      "Category badges and action shortcuts"
    ],
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "default": "false",
        "description": "Control visibility"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "default": "Required",
        "description": "Close handler callback"
      }
    ],
    "accessibility": [
      "ARIA combobox pattern",
      "Keyboard-only navigation"
    ],
    "createdAt": "2026-08-01",
    "usageCode": "import { CommandMenu } from \"@/components/ui/command-menu\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return <CommandMenu isOpen={open} onClose={() => setOpen(false)} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/CommandMenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/command-menu.tsx"
      },
      {
        "path": "src/components/icons/GithubIcon.tsx",
        "type": "registry:ui",
        "target": "components/icons/github-icon.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      },
      {
        "path": "src/lib/constants.ts",
        "type": "registry:lib",
        "target": "lib/constants.ts"
      }
    ]
  },
  {
    "id": "dot-field",
    "name": "Dot Field",
    "tagline": "Lightweight static Canvas particle matrix background",
    "description": "High-performance lightweight static Canvas dot matrix background with dynamic gradient coloring and responsive density scaling.",
    "category": "Motion",
    "badges": [
      "HTML5 Canvas",
      "Static Visual",
      "Zero Overhead"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dot-field",
    "features": [
      "Hardware-accelerated HTML5 Canvas rendering",
      "Zero CPU overhead — renders once and updates only on resize",
      "Clean linear gradient coloring with custom stops",
      "Responsive ResizeObserver layout support"
    ],
    "props": [
      {
        "name": "dotRadius",
        "type": "number",
        "default": "1.5",
        "description": "Radius of each individual dot (px)"
      },
      {
        "name": "dotSpacing",
        "type": "number",
        "default": "14",
        "description": "Spacing between adjacent dots in the grid (px)"
      },
      {
        "name": "gradientFrom",
        "type": "string",
        "default": "'rgba(56, 189, 248, 0.35)'",
        "description": "Start gradient color"
      },
      {
        "name": "gradientTo",
        "type": "string",
        "default": "'rgba(168, 85, 247, 0.25)'",
        "description": "End gradient color"
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Optional container CSS class"
      }
    ],
    "accessibility": [
      "Canvas decorative element",
      "Aria-hidden/pointer-events safe layer"
    ],
    "createdAt": "2026-08-08",
    "usageCode": "import { DotField } from \"@/components/ui/dot-field\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full h-[300px] overflow-hidden rounded-xl bg-[#0A0A0A]\">\n      <DotField\n        dotRadius={1.5}\n        dotSpacing={14}\n        gradientFrom=\"rgba(56, 189, 248, 0.35)\"\n        gradientTo=\"rgba(168, 85, 247, 0.25)\"\n      />\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/DotField.tsx",
        "type": "registry:ui",
        "target": "components/ui/dot-field.tsx"
      },
      {
        "path": "src/components/ui/DotField.css",
        "type": "registry:ui",
        "target": "components/ui/dot-field.css"
      }
    ]
  },
  {
    "id": "drag-to-confirm",
    "name": "Drag to Confirm",
    "tagline": "Spring-resistant slider for confirming destructive or critical operations",
    "description": "A physical drag-to-confirm slider for high-stakes and destructive actions, equipped with elastic spring snapback physics, progressive track illumination, and accessible keyboard fallbacks.",
    "category": "Buttons",
    "badges": [
      "Confirmation",
      "Gesture Physics",
      "Safety Controls"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/drag-to-confirm",
    "features": [
      "Physical gesture drag handle with spring snapback upon incomplete drags",
      "Dynamic text opacity and track fill response correlated with drag distance",
      "Supports Delete, Archive, Confirm, Submit, and Unlock action profiles",
      "Automatic post-confirmation reset timer with customizable delay",
      "Full keyboard accessibility (Space/Enter to trigger) and touch screen compatibility"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "'Slide to confirm'",
        "description": "Action instruction text rendered along track"
      },
      {
        "name": "confirmedLabel",
        "type": "string",
        "default": "'Confirmed ✓'",
        "description": "Text shown when slider is locked into completion"
      },
      {
        "name": "actionType",
        "type": "'delete' | 'archive' | 'confirm' | 'submit' | 'unlock' | 'continue'",
        "default": "'confirm'",
        "description": "Action preset style"
      },
      {
        "name": "onConfirm",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback triggered upon successful confirmation completion"
      },
      {
        "name": "autoResetDelay",
        "type": "number",
        "default": "2500",
        "description": "Milliseconds before resetting back to start"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables slider gesture and interaction"
      }
    ],
    "accessibility": [
      "Accessible role=\"slider\" with aria-valuemin, aria-valuemax, and aria-valuenow attributes",
      "Focus-visible ring around draggable handle for keyboard navigators",
      "Screen reader fallback action button for assistive tech users"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { DragToConfirm } from \"@/components/ui/drag-to-confirm\";\n\nexport function Demo() {\n  return (\n    <DragToConfirm\n      actionType=\"delete\"\n      label=\"Slide to delete database →\"\n      confirmedLabel=\"Database Deleted\"\n      onConfirm={() => console.log('Destroy action confirmed')}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/DragToConfirm.tsx",
        "type": "registry:ui",
        "target": "components/ui/drag-to-confirm.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "expandable-data-row",
    "name": "Expandable Data Row",
    "tagline": "Smooth unfolding table row with deep metadata and responsive mobile conversion",
    "description": "A polished table component with fluid accordion row unfolding, revealing deep metadata, audit activity feeds, and quick actions, with automatic card restructuring on mobile viewports.",
    "category": "Motion",
    "badges": [
      "Tables",
      "Accordion Motion",
      "Responsive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/expandable-data-row",
    "features": [
      "Soft accordion expansion unfolding details directly beneath rows without modals",
      "Single or multi-row simultaneous expansion modes",
      "Full metadata breakdown with account metrics and historical activity timeline",
      "Adaptive layout engine transforming desktop table into touch cards on mobile devices",
      "Integrated quick actions with one-click email copying and callback hooks"
    ],
    "props": [
      {
        "name": "items",
        "type": "DataRowItem[]",
        "default": "[...]",
        "description": "Data records with user, status, revenue, and metadata"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Permit multiple expanded rows concurrently"
      },
      {
        "name": "defaultExpandedIds",
        "type": "string[]",
        "default": "['usr_01']",
        "description": "Initially expanded row identifiers"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Displays pulse skeleton loaders during data fetch"
      },
      {
        "name": "onRowAction",
        "type": "(action: string, row: DataRowItem) => void",
        "default": "undefined",
        "description": "Callback fired on row action buttons"
      }
    ],
    "accessibility": [
      "Aria-expanded attributes and keyboard navigation (Enter, Space, Tab)",
      "Semantic table row and button hierarchy compliant with WCAG 2.1 AA",
      "Reduced motion support with instant height visibility toggle"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ExpandableDataRow } from \"@/components/ui/expandable-data-row\";\n\nexport function Demo() {\n  return (\n    <ExpandableDataRow\n      items={[\n        {\n          id: \"usr_01\",\n          user: { name: \"Sarah Connor\", email: \"sarah@cyberdyne.io\" },\n          status: \"active\",\n          revenue: \"$4,280\",\n          date: \"Oct 24, 2026\",\n          metadata: { plan: \"Enterprise Plus\", sessions: 482 },\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ExpandableDataRow.tsx",
        "type": "registry:ui",
        "target": "components/ui/expandable-data-row.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "expandable-search",
    "name": "Expandable Search",
    "tagline": "Compact spring width morphing search input",
    "description": "A compact search pill that smoothly widens on focus with shortcut hint pills and clear button.",
    "category": "Navigation",
    "badges": [
      "Spring Expansion",
      "Shortcuts",
      "Compact"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/expandable-search",
    "features": [
      "Spring physics width expansion",
      "Shortcut badge hint",
      "Instant clear button on input"
    ],
    "props": [
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Search...'",
        "description": "Input placeholder text"
      },
      {
        "name": "onSearch",
        "type": "(query: string) => void",
        "default": "undefined",
        "description": "Search query callback"
      }
    ],
    "accessibility": [
      "Accessible search input role",
      "Clear button accessible label"
    ],
    "createdAt": "2026-08-02",
    "usageCode": "import { ExpandableSearch } from \"@/components/ui/expandable-search\";\n\nexport function Demo() {\n  return <ExpandableSearch onSearch={(q) => console.log(q)} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ExpandableSearch.tsx",
        "type": "registry:ui",
        "target": "components/ui/expandable-search.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "faq",
    "name": "FAQ",
    "tagline": "Expandable spring-physics accordion with search & category filtering",
    "description": "An expandable accordion FAQ component with smooth spring height calculation, single/multi-open modes, category filtering, search, and full ARIA keyboard accessibility.",
    "category": "Feedback",
    "badges": [
      "FAQ",
      "Accordion",
      "Spring Physics",
      "Searchable",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/faq",
    "features": [
      "Smooth height calculation and rotation via Framer Motion springGentle",
      "Single-open accordion or multi-open simultaneous expansion modes",
      "Controlled and uncontrolled state management (openIds / defaultOpen)",
      "Integrated search filter bar and optional category filter pills",
      "Two layout modes: Unified grouped card or separated individual cards",
      "Full keyboard accessibility (Space, Enter, Tab) and ARIA attributes"
    ],
    "props": [
      {
        "name": "items",
        "type": "FAQItem[]",
        "default": "[]",
        "description": "Array of FAQ items with id, question, answer, category, badge, icon"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allows multiple accordion items to remain open simultaneously"
      },
      {
        "name": "defaultOpen",
        "type": "string[] | string",
        "default": "undefined",
        "description": "Default expanded item ID(s) on initial mount"
      },
      {
        "name": "openIds",
        "type": "string[]",
        "default": "undefined",
        "description": "Controlled list of currently expanded item IDs"
      },
      {
        "name": "onOpenChange",
        "type": "(ids: string[]) => void",
        "default": "undefined",
        "description": "Callback fired when open item selection changes"
      },
      {
        "name": "iconStyle",
        "type": "'chevron' | 'plus-minus' | 'custom'",
        "default": "'chevron'",
        "description": "Indicator icon style"
      },
      {
        "name": "searchable",
        "type": "boolean",
        "default": "false",
        "description": "Displays search filter bar above FAQ items"
      },
      {
        "name": "showCategories",
        "type": "boolean",
        "default": "false",
        "description": "Displays category filter pills above items"
      },
      {
        "name": "variant",
        "type": "'unified' | 'separated'",
        "default": "'unified'",
        "description": "Visual presentation layout"
      }
    ],
    "accessibility": [
      "aria-expanded state and aria-controls linking button headers to content regions",
      "Semantic role=\"region\" and aria-labelledby on accordion content panels",
      "Keyboard activation via Space and Enter with sky focus ring",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { FAQ } from \"@/components/ui/faq\";\n\nexport function Demo() {\n  return (\n    <FAQ\n      allowMultiple\n      searchable\n      items={[\n        {\n          id: \"1\",\n          question: \"What makes EasyUI different?\",\n          answer: \"EasyUI is distributed directly into your codebase via the official shadcn CLI, powered by spring physics rather than rigid ease-in-out transitions.\"\n        },\n        {\n          id: \"2\",\n          question: \"Can I customize the styling?\",\n          answer: \"Yes! All components are built with standard Tailwind CSS utility classes and clean React TypeScript code with zero proprietary wrappers.\"\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/FAQ.tsx",
        "type": "registry:ui",
        "target": "components/ui/faq.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "floating-action-dock",
    "name": "Floating Action Dock",
    "tagline": "Magnification curve with physical spring feedback",
    "description": "A floating quick-action toolbar inspired by macOS dock physics with smooth magnification and subtle tooltips.",
    "category": "Navigation",
    "badges": [
      "Pointer Physics",
      "Magnification Curve",
      "Tooltips"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/floating-action-dock",
    "features": [
      "Continuous distance interpolation curve",
      "Tooltips with instant spring opacity",
      "Active status indicator dot"
    ],
    "props": [
      {
        "name": "items",
        "type": "DockItem[]",
        "default": "[]",
        "description": "Dock icons with labels, actions, and icons"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Current active item identifier"
      }
    ],
    "accessibility": [
      "Standard aria-labels for every button item",
      "Accessible keyboard focus"
    ],
    "createdAt": "2026-08-12",
    "usageCode": "import { FloatingActionDock } from \"@/components/ui/floating-action-dock\";\nimport { Terminal, Code2, Sparkles, Settings } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: 'terminal', label: 'Terminal', icon: <Terminal /> },\n    { id: 'editor', label: 'Editor', icon: <Code2 /> },\n    { id: 'ai', label: 'AI Assistant', icon: <Sparkles /> },\n  ];\n  return <FloatingActionDock items={items} activeId=\"terminal\" />;\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/FloatingActionDock.tsx",
        "type": "registry:ui",
        "target": "components/ui/floating-action-dock.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "focus-mode",
    "name": "Focus Mode",
    "tagline": "Atmospheric UI isolation dimming background distractions without layout shifts",
    "description": "An atmospheric focus-mode interaction that isolates selected cards or sections by smoothly dimming surrounding distractions with zero layout shift, tactile spring scaling, and Escape key dismissal.",
    "category": "Motion",
    "badges": [
      "Focus Mode",
      "Motion Physics",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/focus-mode",
    "features": [
      "Subtle background opacity dampening bringing selected components into focus",
      "Zero layout shift architecture keeping existing dashboard grid geometry intact",
      "Tactile spring scaling and border elevation on active focused target",
      "Keyboard Escape key listener and explicit exit controls",
      "Reduced motion support with instant opacity transitions"
    ],
    "props": [
      {
        "name": "items",
        "type": "FocusModeItem[]",
        "default": "[...]",
        "description": "List of dashboard cards or sections"
      },
      {
        "name": "focusedId",
        "type": "string | null",
        "default": "null",
        "description": "Controlled focused card ID"
      },
      {
        "name": "onFocusChange",
        "type": "(id: string | null) => void",
        "default": "undefined",
        "description": "Callback fired when focused element changes"
      },
      {
        "name": "dimOpacity",
        "type": "number",
        "default": "0.2",
        "description": "Opacity applied to unfocused background cards"
      }
    ],
    "accessibility": [
      "Escape key listener automatically dismisses focus mode and restores full viewport opacity",
      "Focus rings remain strictly compliant with EasyUI sky-400 tokens"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { FocusMode } from \"@/components/ui/focus-mode\";\n\nexport function Demo() {\n  return (\n    <FocusMode\n      items={[\n        {\n          id: \"mrr\",\n          title: \"Monthly Recurring Revenue\",\n          metric: \"$148,290\",\n          delta: \"+18.4%\",\n          content: <p>Enterprise plan renewals</p>\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/FocusMode.tsx",
        "type": "registry:ui",
        "target": "components/ui/focus-mode.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "form",
    "name": "Form",
    "tagline": "Composable, accessible form primitives and controls",
    "description": "A modular, composable form system with accessible inputs, textareas, custom selects, checkboxes, radio groups, switches, and animated validation messages.",
    "category": "Forms",
    "badges": [
      "Forms",
      "Accessible",
      "Spring Motion",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/form",
    "features": [
      "Modular layout primitives: Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage",
      "Comprehensive controls: Input, Textarea, Select, Checkbox, RadioGroup, Switch",
      "Spring-animated validation errors and password visibility toggle",
      "Tactile check, radio dot, and toggle switch spring physics",
      "Accessible ARIA semantics, required asterisks, and keyboard navigation",
      "Strict monochrome dark styling matching EasyUI surface elevation tokens"
    ],
    "props": [
      {
        "name": "onSubmit",
        "type": "(e: FormEvent) => void",
        "default": "undefined",
        "description": "Form submission handler"
      },
      {
        "name": "error",
        "type": "string | boolean",
        "default": "undefined",
        "description": "Validation error text or boolean trigger"
      },
      {
        "name": "showPasswordToggle",
        "type": "boolean",
        "default": "false",
        "description": "Enables eye icon toggle for password inputs"
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Displays red asterisk and enforces requirement"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Leading icon inside input fields"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Trailing icon inside input fields"
      }
    ],
    "accessibility": [
      "Semantic label-input association with generated IDs",
      "ARIA role=\"alert\" on animated validation messages",
      "role=\"switch\" and role=\"radiogroup\" with proper aria-checked attributes",
      "Sky-400 focus ring on all interactive focusable elements"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button } from \"@/components/ui/form\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [email, setEmail] = useState(\"\");\n  const [error, setError] = useState(\"\");\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!email.includes(\"@\")) {\n      setError(\"Please enter a valid email address.\");\n    } else {\n      setError(\"\");\n    }\n  };\n\n  return (\n    <Form onSubmit={handleSubmit} className=\"max-w-sm\">\n      <FormItem>\n        <FormLabel required>Email Address</FormLabel>\n        <FormControl>\n          <Input\n            type=\"email\"\n            placeholder=\"you@company.com\"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            error={!!error}\n          />\n        </FormControl>\n        <FormDescription>We will never share your email.</FormDescription>\n        <FormMessage error={error} />\n      </FormItem>\n      <Button type=\"submit\" variant=\"primary\" fullWidth>\n        Submit\n      </Button>\n    </Form>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Form.tsx",
        "type": "registry:ui",
        "target": "components/ui/form.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "glass-navbar",
    "name": "Glass Navbar",
    "tagline": "Refined glass navigation with spring physics",
    "description": "A modern, responsive glassmorphic navbar with smooth spring navigation pills, mobile menu drawer, and keyboard accessibility.",
    "category": "Navigation",
    "badges": [
      "Glassmorphism",
      "Responsive",
      "Spring Physics",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/glass-navbar",
    "features": [
      "Subtle glassmorphic blur backdrop (bg-[#050505]/85 backdrop-blur-md)",
      "Dual layout modes: Floating pill or full-width sticky bar",
      "Shared layout spring animations for hover spotlight & active indicators",
      "Responsive mobile menu drawer with smooth Framer Motion spring transition",
      "Customizable brand logo, navigation items, badges, and CTA action slot",
      "Full keyboard navigation, Escape key dismiss, and aria-expanded accessibility"
    ],
    "props": [
      {
        "name": "brand",
        "type": "React.ReactNode",
        "default": "<EasyUILogo />",
        "description": "Brand / Logo element or text component"
      },
      {
        "name": "brandHref",
        "type": "string",
        "default": "'/'",
        "description": "Root link destination for the brand logo"
      },
      {
        "name": "items",
        "type": "NavItem[]",
        "default": "Default items array",
        "description": "Array of navigation links with label, href, badge, icon"
      },
      {
        "name": "cta",
        "type": "React.ReactNode",
        "default": "<GetStartedButton />",
        "description": "Right-hand side action slot / CTA button"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Explicit active item identifier or label"
      },
      {
        "name": "variant",
        "type": "'floating' | 'full-width'",
        "default": "'floating'",
        "description": "Visual style layout structure"
      },
      {
        "name": "sticky",
        "type": "boolean",
        "default": "true",
        "description": "Pins the navigation bar to the top of the viewport"
      },
      {
        "name": "glass",
        "type": "boolean",
        "default": "true",
        "description": "Enables backdrop-blur glassmorphism background"
      },
      {
        "name": "onItemSelect",
        "type": "(item: NavItem) => void",
        "default": "undefined",
        "description": "Callback fired when any nav item is selected"
      }
    ],
    "accessibility": [
      "Semantic <header> and <nav> elements with aria-label=\"Main Navigation\"",
      "Keyboard focusable with restrained cyan focus-ring on :focus-visible",
      "Escape key dismisses the mobile navigation drawer",
      "aria-expanded and aria-current attributes on interactive items"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { GlassNavbar } from \"@/components/ui/glass-navbar\";\nimport { Sparkles } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <GlassNavbar\n      items={[\n        { label: \"Overview\", href: \"#overview\" },\n        { label: \"Components\", href: \"#components\", badge: \"20+\" },\n        { label: \"Pricing\", href: \"#pricing\" },\n      ]}\n      cta={\n        <button className=\"px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium hover:bg-white transition-colors\">\n          Get Started\n        </button>\n      }\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/GlassNavbar.tsx",
        "type": "registry:ui",
        "target": "components/ui/glass-navbar.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "interactive-timeline",
    "name": "Interactive Timeline",
    "tagline": "Milestone & pipeline tracker with spring progress physics",
    "description": "A developer-focused milestone and deployment timeline featuring dynamic progress lines, pulsating status nodes, expandable telemetry cards, and commit hash copy.",
    "category": "Motion",
    "badges": [
      "Milestones",
      "Deployment Track",
      "Spring Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/interactive-timeline",
    "features": [
      "Animated continuous progress line with spring physics",
      "Interactive status nodes (completed, in-progress, pending, failed) with breathing aura",
      "Collapsible details with metrics grid and commit metadata",
      "One-click commit hash copying with feedback state",
      "Accessible semantic list and keyboard navigation structure"
    ],
    "props": [
      {
        "name": "items",
        "type": "TimelineItem[]",
        "default": "[]",
        "description": "Array of timeline step items"
      },
      {
        "name": "defaultSelectedId",
        "type": "string",
        "default": "items[0]?.id",
        "description": "ID of the item initially expanded"
      },
      {
        "name": "collapsible",
        "type": "boolean",
        "default": "true",
        "description": "Whether cards can be expanded/collapsed on click"
      },
      {
        "name": "onItemSelect",
        "type": "(item: TimelineItem) => void",
        "default": "undefined",
        "description": "Callback invoked when a timeline node or card is selected"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional CSS classes for outer container"
      }
    ],
    "accessibility": [
      "Semantic role=\"region\" and role=\"list\" with listitem hierarchy",
      "Aria-expanded and aria-controls binding on interactive items",
      "Respects prefers-reduced-motion for smooth height and line transitions",
      "Visible focus rings for keyboard navigation"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { InteractiveTimeline } from \"@/components/ui/interactive-timeline\";\n\nconst deploymentSteps = [\n  {\n    id: \"step-1\",\n    title: \"Build & Artifact Verification\",\n    timestamp: \"10:42 AM · 48s\",\n    status: \"completed\" as const,\n    tag: \"CI/CD\",\n    commitHash: \"9f8a12bc\",\n    metrics: [{ label: \"Bundle Size\", value: \"142 KB\" }, { label: \"Tree Shake\", value: \"99.4%\" }],\n  },\n  {\n    id: \"step-2\",\n    title: \"Global Edge Replication\",\n    timestamp: \"10:43 AM · Active\",\n    status: \"in-progress\" as const,\n    tag: \"Infra\",\n    description: \"Replicating immutable build layers across 32 regional edge locations.\",\n  },\n  {\n    id: \"step-3\",\n    title: \"Traffic Cutover & Smoke Test\",\n    timestamp: \"Pending\",\n    status: \"pending\" as const,\n    tag: \"DNS\",\n  },\n];\n\nexport function Demo() {\n  return <InteractiveTimeline items={deploymentSteps} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/InteractiveTimeline.tsx",
        "type": "registry:ui",
        "target": "components/ui/interactive-timeline.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "login",
    "name": "Login",
    "tagline": "Refined authentication card with validation & social SSO",
    "description": "A production-ready authentication card built with the EasyUI form system, featuring password show/hide, remember me, validation states, and social logins.",
    "category": "Auth",
    "badges": [
      "Authentication",
      "Forms",
      "Responsive",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/login",
    "features": [
      "Built with EasyUI Form & Button architecture",
      "Interactive password visibility toggle with Lucide icons",
      "Form validation for required fields & email regex format",
      "Spring-animated error banners and inline field alerts",
      "Configurable social SSO buttons (GitHub & Google)",
      "Remember me checkbox and \"Forgot password?\" callback hooks",
      "Responsive mobile/desktop dimensions with atmospheric glow header"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "'Welcome back'",
        "description": "Primary card title text"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Sign in to access your EasyUI workspace'",
        "description": "Subtitle description below the title"
      },
      {
        "name": "logo",
        "type": "React.ReactNode",
        "default": "<SparklesIcon />",
        "description": "Brand badge or logo displayed at the top"
      },
      {
        "name": "error",
        "type": "string | null",
        "default": "null",
        "description": "Server-side or authentication error banner message"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Submitting state displaying loader on submit button"
      },
      {
        "name": "onSubmit",
        "type": "(data: LoginFormData) => void",
        "default": "undefined",
        "description": "Form submission callback with email, password, rememberMe"
      },
      {
        "name": "onForgotPassword",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback when forgot password link is clicked"
      },
      {
        "name": "onSignUpClick",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback for secondary sign up switch action"
      },
      {
        "name": "showSocialLogins",
        "type": "boolean",
        "default": "true",
        "description": "Toggles GitHub and Google SSO buttons"
      },
      {
        "name": "onSocialLogin",
        "type": "(provider: 'github' | 'google' | 'apple') => void",
        "default": "undefined",
        "description": "Callback when social login button is pressed"
      }
    ],
    "accessibility": [
      "Accessible input labels and autocomplete attributes (email, current-password)",
      "ARIA alert role on dynamic validation and server error banners",
      "Proper form submission handling with Enter key activation",
      "Sky-400 focus ring on all interactive elements"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Login } from \"@/components/ui/login\";\n\nexport function Demo() {\n  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {\n    console.log(\"Authenticating:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <Login\n        onSubmit={handleLogin}\n        onForgotPassword={() => alert(\"Redirect to forgot password\")}\n        onSignUpClick={() => alert(\"Redirect to sign up\")}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Login.tsx",
        "type": "registry:ui",
        "target": "components/ui/login.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "magnetic-button",
    "name": "Magnetic Button",
    "tagline": "Cursor-aware spring translation physics",
    "description": "A responsive button with subtle proximity-based physics that pulls towards the cursor on hover and snaps back on departure.",
    "category": "Buttons",
    "badges": [
      "Spring Physics",
      "Micro-interaction",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/magnetic-button",
    "features": [
      "Spring physics coordinate tracking via Framer Motion",
      "Configurable pull strength and threshold",
      "Subtle ambient glow gradient reflection",
      "Four restrained surface styles: Primary, Secondary, Outline, Ghost"
    ],
    "props": [
      {
        "name": "strength",
        "type": "number",
        "default": "0.35",
        "description": "Cursor pull distance multiplier"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline' | 'ghost'",
        "default": "'primary'",
        "description": "Visual surface presentation"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Button dimensions and typography"
      },
      {
        "name": "glow",
        "type": "boolean",
        "default": "true",
        "description": "Enable subtle background glow on hover"
      }
    ],
    "accessibility": [
      "Focus visible ring with restrained cyan accent",
      "Standard native button semantics & keyboard Enter/Space activation",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-18",
    "usageCode": "import { MagneticButton } from \"@/components/ui/magnetic-button\";\nimport { ArrowUpRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <MagneticButton strength={0.4} variant=\"primary\">\n      <span>Get Started</span>\n      <ArrowUpRight className=\"w-4 h-4\" />\n    </MagneticButton>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/MagneticButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/magnetic-button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "metric-hud",
    "name": "Metric HUD",
    "tagline": "Interactive telemetry & sparkline HUD with live scrubbing",
    "description": "An interactive developer telemetry card featuring hardware-accelerated SVG sparklines, pointer-scrubbing point inspection, spring-animated time range morphing, and delta indicators.",
    "category": "Motion",
    "badges": [
      "SVG Sparklines",
      "Telemetry HUD",
      "Pointer Scrubbing"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/metric-hud",
    "features": [
      "Zero-dependency hardware-accelerated SVG sparkline rendering",
      "Interactive pointer crosshair scrubbing with dynamic coordinate inspection",
      "Spring-animated time-range switching (1h, 24h, 7d, 30d)",
      "Real-time delta trend badges (up / down / neutral) with status aura",
      "One-click metric value copying with validation feedback"
    ],
    "props": [
      {
        "name": "metrics",
        "type": "MetricItem[]",
        "default": "[]",
        "description": "Array of telemetry metric definitions with time-series data"
      },
      {
        "name": "timeRanges",
        "type": "string[]",
        "default": "['1h', '24h', '7d', '30d']",
        "description": "Available time window filters"
      },
      {
        "name": "defaultTimeRange",
        "type": "string",
        "default": "'24h'",
        "description": "Initial active time range"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS container styling"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA telemetry roles",
      "Min and max values clearly labeled for assistive technologies",
      "Keyboard accessible time range selection controls"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { MetricHUD } from \"@/components/ui/metric-hud\";\n\nconst metrics = [\n  {\n    id: \"latency\",\n    label: \"p99 Latency\",\n    value: \"14.2\",\n    unit: \"ms\",\n    delta: { value: \"-18.4%\", trend: \"down\" as const, isPositiveGood: true },\n    status: \"normal\" as const,\n    timeSeries: {\n      \"1h\": [18, 17, 16, 15, 14, 14.2],\n      \"24h\": [24, 21, 19, 18, 16, 14.2],\n      \"7d\": [32, 28, 22, 19, 15, 14.2],\n    },\n  },\n  {\n    id: \"throughput\",\n    label: \"API Throughput\",\n    value: \"84.5k\",\n    unit: \"req/s\",\n    delta: { value: \"+12.1%\", trend: \"up\" as const, isPositiveGood: true },\n    status: \"normal\" as const,\n    timeSeries: {\n      \"1h\": [60, 65, 72, 78, 81, 84.5],\n      \"24h\": [40, 52, 68, 74, 80, 84.5],\n      \"7d\": [30, 45, 60, 70, 80, 84.5],\n    },\n  },\n];\n\nexport function Demo() {\n  return <MetricHUD metrics={metrics} defaultTimeRange=\"24h\" />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MetricHUD.tsx",
        "type": "registry:ui",
        "target": "components/ui/metric-hud.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "morphing-button",
    "name": "Morphing Button",
    "tagline": "Dimension-preserving state morphing button with fluid icon transitions",
    "description": "A layout-stable interactive action button that smoothly transitions between Idle, Loading, Success, and Error states without jarring jumps or dimension shifts.",
    "category": "Buttons",
    "badges": [
      "Buttons",
      "Micro-interactions",
      "State Morphing"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-button",
    "features": [
      "Zero layout shift architecture preserving natural bounding dimensions across states",
      "Icon morphing with spring-based scale and translation transitions",
      "Multiple design presets (Primary, Secondary, Danger, and Ghost)",
      "Interactive spring tap physics (whileTap scale 0.97)",
      "Complete disabled and busy ARIA state compatibility"
    ],
    "props": [
      {
        "name": "status",
        "type": "'idle' | 'loading' | 'success' | 'error'",
        "default": "'idle'",
        "description": "Current button lifecycle state"
      },
      {
        "name": "idleText",
        "type": "string",
        "default": "'Save Changes'",
        "description": "Label shown in default resting state"
      },
      {
        "name": "loadingText",
        "type": "string",
        "default": "'Saving...'",
        "description": "Label shown when operation is pending"
      },
      {
        "name": "successText",
        "type": "string",
        "default": "'Saved'",
        "description": "Label shown upon successful completion"
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "'Failed'",
        "description": "Label shown when operation fails"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'danger' | 'ghost'",
        "default": "'primary'",
        "description": "Visual surface styling preset"
      }
    ],
    "accessibility": [
      "ARIA live role=\"button\" with dynamic aria-busy during loading",
      "Focus-visible ring conforming to EasyUI accessibility tokens",
      "Screen readers announce state changes without losing focus target"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { MorphingButton } from \"@/components/ui/morphing-button\";\n\nexport function Demo() {\n  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');\n\n  const handleClick = () => {\n    setStatus('loading');\n    setTimeout(() => {\n      setStatus('success');\n      setTimeout(() => setStatus('idle'), 2000);\n    }, 1500);\n  };\n\n  return (\n    <MorphingButton\n      status={status}\n      idleText=\"Deploy Project\"\n      loadingText=\"Building Edge...\"\n      successText=\"Deployed ✓\"\n      onClick={handleClick}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "morphing-dialog",
    "name": "Morphing Dialog",
    "tagline": "Seamless shared layoutId card to modal transition",
    "description": "An expandable card trigger that fluidly morphs into a centered dialog without jarring popup animations.",
    "category": "Overlays",
    "badges": [
      "Shared Layout",
      "Spring Physics",
      "Zero Layout Shift"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-dialog",
    "features": [
      "Framer Motion layoutId continuous surface expansion",
      "Esc key dismissal and backdrop click support",
      "Body scroll lock handling during active state"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "Required",
        "description": "Dialog header title"
      },
      {
        "name": "subtitle",
        "type": "string",
        "default": "undefined",
        "description": "Secondary header description"
      },
      {
        "name": "trigger",
        "type": "(open: () => void) => ReactNode",
        "default": "Required",
        "description": "Render trigger button or card"
      }
    ],
    "accessibility": [
      "Traps focus and sets aria-modal=\"true\"",
      "Closes on Escape key press with focus restoration"
    ],
    "createdAt": "2026-08-14",
    "usageCode": "import { MorphingDialog } from \"@/components/ui/morphing-dialog\";\n\nexport function Demo() {\n  return (\n    <MorphingDialog\n      title=\"API Key Configuration\"\n      subtitle=\"Manage fine-grained token permissions\"\n      trigger={(open) => (\n        <button onClick={open} className=\"px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm\">\n          Configure Keys\n        </button>\n      )}\n    >\n      <p className=\"text-sm text-neutral-300\">Set read/write boundaries for automation tasks.</p>\n    </MorphingDialog>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingDialog.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-dialog.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "notification-stack",
    "name": "Notification Stack",
    "tagline": "Physics swipe-to-dismiss toast stack",
    "description": "A stacked notification card system with physical spring stacking elevation, swipe-to-dismiss drag, and simulation triggers.",
    "category": "Feedback",
    "badges": [
      "Drag Physics",
      "Elevation Stacking",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/notification-stack",
    "features": [
      "Interactive drag-to-dismiss with spring rebound",
      "Dynamic stacking elevation offset and scale",
      "Expandable history view"
    ],
    "props": [
      {
        "name": "initialNotifications",
        "type": "NotificationItem[]",
        "default": "[]",
        "description": "Initial items"
      },
      {
        "name": "maxVisible",
        "type": "number",
        "default": "3",
        "description": "Max stacked cards in compact view"
      }
    ],
    "accessibility": [
      "Polite aria-live region announcements",
      "Dismiss button with accessible label"
    ],
    "createdAt": "2026-08-04",
    "usageCode": "import { NotificationStack } from \"@/components/ui/notification-stack\";\n\nexport function Demo() {\n  return <NotificationStack maxVisible={3} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/NotificationStack.tsx",
        "type": "registry:ui",
        "target": "components/ui/notification-stack.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "particle-delete",
    "name": "Particle Delete",
    "tagline": "Physics-driven pixel particle dissolution delete animation",
    "description": "Premium physics-driven particle dissolution delete animation that rasterizes components into thousands of authentic tiny pixels and disperses them smoothly before state removal.",
    "category": "Motion",
    "badges": [
      "HTML5 Canvas",
      "Spring Physics",
      "High-DPI",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/particle-delete",
    "features": [
      "Authentic pixel capture inherits real component colors and typography",
      "Hardware-accelerated 60 FPS Canvas rendering with zero DOM overhead",
      "Configurable physics: duration, explosion force, drag, and dissolution spread",
      "Full accessibility support with automatic prefers-reduced-motion fallback",
      "Available as direct utility particleDelete(), hook useParticleDelete(), or <ParticleDeleteContainer /> wrapper"
    ],
    "props": [
      {
        "name": "onDelete",
        "type": "() => void",
        "description": "Callback invoked after the particle dissolution finishes to remove state"
      },
      {
        "name": "options.duration",
        "type": "number",
        "default": "850",
        "description": "Animation duration in milliseconds"
      },
      {
        "name": "options.force",
        "type": "number",
        "default": "1.0",
        "description": "Outward velocity multiplier for particle dispersion"
      },
      {
        "name": "options.particleSize",
        "type": "number",
        "default": "1.5",
        "description": "Visual diameter of individual particles in pixels"
      },
      {
        "name": "options.dissolvePattern",
        "type": "'center-first' | 'edges-first' | 'uniform' | 'random'",
        "default": "'center-first'",
        "description": "Dissolution spread delay algorithm"
      },
      {
        "name": "options.sampleStep",
        "type": "number",
        "default": "2 (desktop) / 3 (mobile)",
        "description": "Pixel sampling step interval"
      }
    ],
    "accessibility": [
      "Automatically honors prefers-reduced-motion: reduce with immediate subtle fade exit",
      "Delete trigger buttons maintain clear ARIA labels and keyboard focus ring states",
      "Canvas overlay is marked with aria-hidden=\"true\" and pointer-events: none"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ParticleDeleteContainer, useParticleDelete, particleDelete } from \"@/components/ui/particle-delete\";\nimport { Trash2 } from \"lucide-react\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', name: 'Database Snapshot #409' },\n    { id: '2', name: 'Redis Cache Layer' }\n  ]);\n\n  const handleDelete = (id: string) => {\n    setItems((prev) => prev.filter((i) => i.id !== id));\n  };\n\n  return (\n    <div className=\"space-y-3\">\n      {items.map((item) => (\n        <ParticleDeleteContainer\n          key={item.id}\n          onDelete={() => handleDelete(item.id)}\n          className=\"p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center justify-between\"\n        >\n          {({ isDeleting, handleDelete: triggerDelete }) => (\n            <>\n              <span className=\"text-sm font-medium text-white\">{item.name}</span>\n              <button\n                type=\"button\"\n                onClick={triggerDelete}\n                disabled={isDeleting}\n                className=\"p-2 rounded-lg bg-[#141414] hover:bg-rose-950/40 text-[#888888] hover:text-rose-400 border border-[#262626] transition-colors\"\n              >\n                <Trash2 className=\"w-4 h-4\" />\n              </button>\n            </>\n          )}\n        </ParticleDeleteContainer>\n      ))}\n    </div>\n  );\n}",
    "dependencies": [
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ParticleDelete.tsx",
        "type": "registry:ui",
        "target": "components/ui/particle-delete.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/particle-delete.ts",
        "type": "registry:lib",
        "target": "lib/particle-delete.ts"
      }
    ]
  },
  {
    "id": "payment-receipt-printer",
    "name": "Payment Receipt Printer",
    "tagline": "Animated thermal receipt printer with smooth paper extrusion motion",
    "description": "An animated payment and order receipt printer component for React featuring realistic thermal paper extrusion, chassis micro-vibration, customizable receipt itemization, and replay controls.",
    "category": "Feedback",
    "badges": [
      "Spring Physics",
      "Feedback",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/payment-receipt-printer",
    "features": [
      "Authentic thermal paper extrusion animation emerging downward from printer slot",
      "Subtle chassis vibration physics during active printing phase",
      "Multiple receipt items support with automatic dynamic height calculation",
      "Customizable merchant brand, order number, payment method, taxes, barcode, and message",
      "Interactive Replay, Copy Order Number, and Print action controls",
      "Light, dark, and cream paper themes with serrated paper perforation cuts",
      "Full accessibility support with aria-live status and prefers-reduced-motion detection"
    ],
    "props": [
      {
        "name": "status",
        "type": "'idle' | 'printing' | 'completed' | 'success'",
        "default": "'idle'",
        "description": "Current lifecycle state of payment and printing"
      },
      {
        "name": "merchant",
        "type": "string",
        "default": "'EasyUI Store'",
        "description": "Store or company name on receipt header"
      },
      {
        "name": "merchantSubtext",
        "type": "string",
        "default": "'Official Component Registry'",
        "description": "Location or subtitle below merchant name"
      },
      {
        "name": "merchantLogo",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom logo icon rendered in receipt header"
      },
      {
        "name": "orderNumber",
        "type": "string",
        "default": "'#4821'",
        "description": "Unique order or invoice tracking reference"
      },
      {
        "name": "date",
        "type": "string | Date",
        "default": "Current date",
        "description": "Transaction timestamp string or Date object"
      },
      {
        "name": "items",
        "type": "ReceiptItem[]",
        "default": "[]",
        "description": "List of purchased items with prices, quantities, and descriptions"
      },
      {
        "name": "item",
        "type": "ReceiptItem",
        "default": "undefined",
        "description": "Shorthand for single item receipt"
      },
      {
        "name": "subtotal",
        "type": "string | number",
        "default": "undefined",
        "description": "Subtotal price before tax and discounts"
      },
      {
        "name": "tax",
        "type": "string | number",
        "default": "undefined",
        "description": "Tax amount displayed on receipt"
      },
      {
        "name": "discount",
        "type": "string | number",
        "default": "undefined",
        "description": "Discount or coupon amount deducted"
      },
      {
        "name": "total",
        "type": "string | number",
        "default": "'$200.00'",
        "description": "Final total payment amount"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'$'",
        "description": "Currency symbol prepended to numeric prices"
      },
      {
        "name": "paymentMethod",
        "type": "string",
        "default": "'Apple Pay •••• 4242'",
        "description": "Payment method or card description"
      },
      {
        "name": "message",
        "type": "string",
        "default": "'Thank you for your order!'",
        "description": "Footer message printed at bottom of receipt"
      },
      {
        "name": "autoPrint",
        "type": "boolean",
        "default": "true",
        "description": "Whether to automatically begin printing extrusion on mount"
      },
      {
        "name": "printDuration",
        "type": "number",
        "default": "2.4",
        "description": "Extrusion animation duration in seconds"
      },
      {
        "name": "showStatusCard",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display the top status card banner"
      },
      {
        "name": "statusTitle",
        "type": "string",
        "default": "'Payment Complete'",
        "description": "Heading for the top status banner"
      },
      {
        "name": "statusSubtitle",
        "type": "string",
        "default": "'Receipt has been issued'",
        "description": "Subtitle description for status banner"
      },
      {
        "name": "showActions",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render Replay and Copy action buttons"
      },
      {
        "name": "showBarcode",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render the thermal barcode block"
      },
      {
        "name": "showCutEffect",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render jagged serrated paper edges"
      },
      {
        "name": "paperTheme",
        "type": "'light' | 'dark' | 'cream'",
        "default": "'light'",
        "description": "Receipt paper visual theme styling"
      },
      {
        "name": "onPrintStart",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when paper printing begins"
      },
      {
        "name": "onPrintComplete",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when paper printing finishes"
      },
      {
        "name": "onReplay",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when animation replay is triggered"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS classes for outer container"
      }
    ],
    "accessibility": [
      "ARIA live region for dynamic payment and printing status announcements",
      "Respects prefers-reduced-motion media query with instantaneous completion",
      "Keyboard accessible interactive replay and copy controls with focus-visible rings",
      "Semantic document structure with compliant contrast ratios"
    ],
    "createdAt": "2026-08-20",
    "usageCode": "import { PaymentReceiptPrinter } from \"@/components/ui/payment-receipt-printer\";\n\nexport function Demo() {\n  return (\n    <PaymentReceiptPrinter\n      merchant=\"EasyUI Store\"\n      orderNumber=\"#4821\"\n      items={[\n        { name: \"EasyUI Pro License\", price: \"$200.00\", quantity: 1 },\n        { name: \"Framer Motion Pack\", price: \"$20.00\", quantity: 1 },\n      ]}\n      subtotal=\"$220.00\"\n      total=\"$220.00\"\n      paymentMethod=\"Apple Pay •••• 4242\"\n      message=\"Thank you for your order!\"\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PaymentReceiptPrinter.tsx",
        "type": "registry:ui",
        "target": "components/ui/payment-receipt-printer.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "payment-status",
    "name": "Payment Status",
    "tagline": "Refined transaction status card with self-drawing checkmark and receipt actions",
    "description": "A calm, Apple-grade payment confirmation card with animated SVG path checkmark drawing, staged verification lifecycle transitions, receipt inspection, and failure recovery.",
    "category": "Feedback",
    "badges": [
      "Payment",
      "Feedback",
      "SVG Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/payment-status",
    "features": [
      "5 clear lifecycle states: Processing, Verifying, Success, Failed, and Refunded",
      "Self-drawing SVG stroke checkmark animation upon payment confirmation",
      "Staggered metadata reveal for amount, transaction hash, timestamp, and card info",
      "Unfolding itemized receipt accordion with instant text-file receipt download",
      "One-click transaction ID copying with instant checkmark feedback",
      "Non-aggressive error state with instant retry and payment method alternatives"
    ],
    "props": [
      {
        "name": "status",
        "type": "'processing' | 'verifying' | 'success' | 'failed' | 'refunded'",
        "default": "'processing'",
        "description": "Current lifecycle state of payment"
      },
      {
        "name": "amount",
        "type": "string | number",
        "default": "'$149.00'",
        "description": "Transaction total amount formatted or numeric"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'$'",
        "description": "Currency symbol prepended to amount"
      },
      {
        "name": "transactionId",
        "type": "string",
        "default": "'tx_9842a8d11c7f'",
        "description": "Unique transaction identifier"
      },
      {
        "name": "date",
        "type": "string | Date",
        "default": "'Today at 3:42 PM'",
        "description": "Date/time timestamp of payment"
      },
      {
        "name": "paymentMethod",
        "type": "string",
        "default": "'Apple Pay'",
        "description": "Payment gateway or card provider"
      },
      {
        "name": "last4",
        "type": "string",
        "default": "'4242'",
        "description": "Last 4 digits of card or account"
      },
      {
        "name": "items",
        "type": "PaymentReceiptItem[]",
        "default": "[...]",
        "description": "Itemized purchase items for detailed receipt view"
      },
      {
        "name": "merchantName",
        "type": "string",
        "default": "'EasyUI Cloud'",
        "description": "Merchant or brand organization name"
      },
      {
        "name": "onRetry",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clicks Try Again"
      },
      {
        "name": "onChangePaymentMethod",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user changes card method"
      }
    ],
    "accessibility": [
      "Aria-live region alerts assistive technology on status transition updates",
      "Keyboard accessible receipt toggle and transaction ID copy buttons",
      "Compliant contrast ratio on dark monochrome surface",
      "Full reduced-motion compatibility with zero stroke animation lag"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { PaymentStatus } from \"@/components/ui/payment-status\";\n\nexport function Demo() {\n  return (\n    <PaymentStatus\n      status=\"success\"\n      amount=\"$149.00\"\n      transactionId=\"tx_8830192a\"\n      paymentMethod=\"Apple Pay\"\n      last4=\"4242\"\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PaymentStatus.tsx",
        "type": "registry:ui",
        "target": "components/ui/payment-status.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "peek-card",
    "name": "Peek Card",
    "tagline": "Origin-anchored contextual preview card with edge-aware collision detection",
    "description": "An origin-anchored contextual preview popover that emerges directly from target triggers on hover or tap with smart collision edge detection and rich metadata summaries.",
    "category": "Overlays",
    "badges": [
      "Popovers",
      "Overlays",
      "Context Preview"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/peek-card",
    "features": [
      "Origin-anchored emergence animation feeling connected to source elements",
      "Automatic edge collision detection preventing viewport bounding overflow",
      "Rich preset layout for transactions, user profiles, invoices, and metrics",
      "Mobile tap toggle and desktop hover/focus dual interaction model",
      "Integrated copy actions and status indicators with reduced-motion support"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Trigger target element wrapped by peek card"
      },
      {
        "name": "data",
        "type": "PeekCardData",
        "default": "[...]",
        "description": "Structured preview dataset"
      },
      {
        "name": "delay",
        "type": "number",
        "default": "200",
        "description": "Hover activation delay in milliseconds"
      },
      {
        "name": "placement",
        "type": "'top' | 'bottom' | 'auto'",
        "default": "'auto'",
        "description": "Preferred emergence direction"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Renders skeleton placeholder during async lookup"
      }
    ],
    "accessibility": [
      "Keyboard accessible through native onFocus and onBlur handlers",
      "Closes automatically on Escape key press or outside click"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { PeekCard } from \"@/components/ui/peek-card\";\n\nexport function Demo() {\n  return (\n    <PeekCard\n      data={{\n        title: \"Payment #3948\",\n        amount: \"$249.00\",\n        customer: { name: \"Alexander Wright\", email: \"alex@acme.com\" },\n        status: \"Succeeded\",\n      }}\n    >\n      <span className=\"underline decoration-dotted cursor-pointer\">\n        Payment #3948\n      </span>\n    </PeekCard>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PeekCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/peek-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "reveal-card",
    "name": "Reveal Card",
    "tagline": "3D cursor physics tilt with interactive glare reveal",
    "description": "A high-definition product card with smooth cursor-driven 3D perspective rotation, dynamic glare, and revealed content.",
    "category": "Motion",
    "badges": [
      "3D Tilt",
      "Dynamic Glare",
      "Micro-interaction"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/reveal-card",
    "features": [
      "Cursor-aware 3D perspective rotation springs",
      "Dynamic radial glare reflection overlay",
      "Hidden metadata section revealed on hover"
    ],
    "props": [
      {
        "name": "maxTilt",
        "type": "number",
        "default": "12",
        "description": "Max tilt angle in degrees"
      },
      {
        "name": "revealContent",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Content shown on hover"
      }
    ],
    "accessibility": [
      "Subtle tilt respects reduced-motion settings",
      "All content accessible via DOM"
    ],
    "createdAt": "2026-08-06",
    "usageCode": "import { RevealCard } from \"@/components/ui/reveal-card\";\n\nexport function Demo() {\n  return (\n    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>\n      <h4>Cloud Engine</h4>\n    </RevealCard>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/RevealCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/reveal-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "scroll-progress-nav",
    "name": "Scroll Progress Navigation",
    "tagline": "Floating progress navigation pill tracking scroll depth and active document headings",
    "description": "A floating table-of-contents navigation pill that tracks scroll depth, dynamically morphs between resting and floating states, highlights active sections, and enables smooth scrolling.",
    "category": "Navigation",
    "badges": [
      "Navigation",
      "Scroll Physics",
      "Floating"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/scroll-progress-nav",
    "features": [
      "Real-time document scroll progress bar integrated along the pill boundary",
      "Shared layout pill indicator smoothly moving between active headings",
      "Seamless transition from static page banner to compact floating island",
      "Smooth scroll anchoring with customizable offset threshold",
      "Mobile-optimized responsive compact menu preventing content obstruction"
    ],
    "props": [
      {
        "name": "sections",
        "type": "NavSectionItem[]",
        "default": "[...]",
        "description": "Navigation links with IDs, index numbers, and labels"
      },
      {
        "name": "scrollThreshold",
        "type": "number",
        "default": "150",
        "description": "Scroll distance in px before morphing into floating pill"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Controlled active section ID override"
      },
      {
        "name": "onSectionClick",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Callback fired when user selects a section"
      },
      {
        "name": "position",
        "type": "'top-center' | 'bottom-center' | 'top-right'",
        "default": "'top-center'",
        "description": "Screen anchor position"
      }
    ],
    "accessibility": [
      "Semantic nav element with aria-label=\"Table of contents\"",
      "Keyboard navigable tab order and focus-visible outlines",
      "Smooth scroll honors prefers-reduced-motion settings"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ScrollProgressNav } from \"@/components/ui/scroll-progress-nav\";\n\nexport function Demo() {\n  return (\n    <ScrollProgressNav\n      sections={[\n        { id: \"overview\", index: \"01\", label: \"Overview\" },\n        { id: \"features\", index: \"02\", label: \"Features\" },\n        { id: \"components\", index: \"03\", label: \"Components\" },\n        { id: \"docs\", index: \"04\", label: \"Documentation\" }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ScrollProgressNav.tsx",
        "type": "registry:ui",
        "target": "components/ui/scroll-progress-nav.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "selection-basket",
    "name": "Selection Basket",
    "tagline": "Floating bulk-action toolbar for multi-item batch operations and export flows",
    "description": "A floating bulk-action toolbar that smoothly rises from the bottom of the screen when multiple dataset items are selected, supporting batch operations, horizontal scrolling, and clear triggers.",
    "category": "Overlays",
    "badges": [
      "Bulk Actions",
      "Toolbars",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/selection-basket",
    "features": [
      "Appears naturally with spring rise physics as soon as selected count > 0",
      "Responsive horizontal scrolling action container preventing mobile cutoff",
      "Integrated batch action buttons (Delete, Move, Export, Share)",
      "Dynamic select all / clear all selection toggle synchronization",
      "Accessible role=\"toolbar\" keyboard navigation and focus rings"
    ],
    "props": [
      {
        "name": "selectedCount",
        "type": "number",
        "default": "0",
        "description": "Current number of selected items"
      },
      {
        "name": "totalCount",
        "type": "number",
        "default": "undefined",
        "description": "Total item universe count"
      },
      {
        "name": "actions",
        "type": "SelectionActionItem[]",
        "default": "[...]",
        "description": "List of bulk action definitions"
      },
      {
        "name": "onClearSelection",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clears selection"
      },
      {
        "name": "onSelectAll",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user selects all"
      }
    ],
    "accessibility": [
      "ARIA role=\"toolbar\" and aria-label=\"Bulk actions toolbar\"",
      "Keyboard navigable action items with tab and arrow keys"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { SelectionBasket } from \"@/components/ui/selection-basket\";\n\nexport function Demo() {\n  const [selected, setSelected] = useState<string[]>(['item-1', 'item-2']);\n\n  return (\n    <SelectionBasket\n      selectedCount={selected.length}\n      totalCount={10}\n      onClearSelection={() => setSelected([])}\n      actions={[\n        { id: 'export', label: 'Export', onClick: () => console.log('Exporting') },\n        { id: 'delete', label: 'Delete', variant: 'danger', onClick: () => console.log('Deleting') }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SelectionBasket.tsx",
        "type": "registry:ui",
        "target": "components/ui/selection-basket.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "sign-up",
    "name": "Sign Up",
    "tagline": "Multi-step capable user registration with strength telemetry",
    "description": "A comprehensive registration card with live password strength metrics, password confirmation matching, terms validation, and social onboarding.",
    "category": "Auth",
    "badges": [
      "Registration",
      "Forms",
      "Password Strength",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sign-up",
    "features": [
      "Integrated live 4-tier password strength indicator bar",
      "Password confirmation matching validation",
      "Interactive eye icons for show/hide password visibility",
      "Terms of service and privacy agreement checkbox validation",
      "Customizable social onboarding SSO buttons (GitHub & Google)",
      "Submitting state with monochrome button spinner",
      "Responsive layout with atmospheric glow and dark slate tokens"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "'Create an account'",
        "description": "Primary card title text"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Join EasyUI to access components and templates'",
        "description": "Subtitle description below the title"
      },
      {
        "name": "logo",
        "type": "React.ReactNode",
        "default": "<SparklesIcon />",
        "description": "Brand badge or logo displayed at the top"
      },
      {
        "name": "error",
        "type": "string | null",
        "default": "null",
        "description": "Server-side registration error banner message"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Submitting state displaying loader on submit button"
      },
      {
        "name": "onSubmit",
        "type": "(data: SignUpFormData) => void",
        "default": "undefined",
        "description": "Form submission callback with name, email, password, confirmPassword, agreeToTerms"
      },
      {
        "name": "onSignInClick",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback for switching to login view"
      },
      {
        "name": "showSocialSignUp",
        "type": "boolean",
        "default": "true",
        "description": "Toggles GitHub and Google SSO buttons"
      },
      {
        "name": "requireConfirmPassword",
        "type": "boolean",
        "default": "true",
        "description": "Includes confirmation password field and checks match"
      },
      {
        "name": "termsText",
        "type": "React.ReactNode",
        "default": "Default Terms & Privacy links",
        "description": "Custom agreement label text or JSX"
      }
    ],
    "accessibility": [
      "Accessible input labels with required indicators and autocomplete values (name, email, new-password)",
      "Role=\"alert\" for validation errors with smooth Framer Motion spring entrances",
      "Keyboard navigable form submission and checkbox selection",
      "Sky-400 focus ring on all focusable controls"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { SignUp } from \"@/components/ui/sign-up\";\n\nexport function Demo() {\n  const handleSignUp = async (data: any) => {\n    console.log(\"Registering account:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <SignUp\n        onSubmit={handleSignUp}\n        onSignInClick={() => alert(\"Redirect to sign in\")}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SignUp.tsx",
        "type": "registry:ui",
        "target": "components/ui/sign-up.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "smart-comparison",
    "name": "Smart Comparison",
    "tagline": "Interactive tier comparison matrix with difference filtering",
    "description": "An interactive feature matrix and SaaS tier comparison component featuring live difference filtering, collapsible specification categories, search indexing, and mobile card toggle.",
    "category": "Navigation",
    "badges": [
      "Feature Matrix",
      "SaaS Pricing",
      "Diff Filter"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/smart-comparison",
    "features": [
      "Live \"Differences Only\" filter to instantly surface plan divergence",
      "Integrated feature keyword search with real-time row matching",
      "Collapsible category groups with spring height transitions",
      "Segmented mobile plan selector avoiding wide horizontal table scrolling",
      "Contextual info tooltips and custom value cell rendering"
    ],
    "props": [
      {
        "name": "plans",
        "type": "ComparisonPlan[]",
        "default": "[]",
        "description": "Array of plans/tiers containing pricing and metadata"
      },
      {
        "name": "categories",
        "type": "ComparisonCategory[]",
        "default": "[]",
        "description": "Grouped feature categories with plan-specific values"
      },
      {
        "name": "defaultPlanId",
        "type": "string",
        "default": "featured plan or plans[0].id",
        "description": "Initial plan selected on mobile viewports"
      },
      {
        "name": "enableSearch",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the instant feature search input"
      },
      {
        "name": "enableDiffFilter",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render the \"Differences Only\" toggle button"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional CSS class name for container"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA labels",
      "Keyboard accessible category accordions and tooltips",
      "High-contrast state indicators with screen reader readable labels"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { SmartComparison } from \"@/components/ui/smart-comparison\";\n\nconst plans = [\n  { id: \"hobby\", name: \"Hobby\", tagline: \"For side projects\", price: \"$0\", billingPeriod: \"mo\" },\n  { id: \"pro\", name: \"Pro\", tagline: \"For fast-moving teams\", price: \"$29\", billingPeriod: \"mo\", featured: true, badge: \"Popular\" },\n  { id: \"enterprise\", name: \"Enterprise\", tagline: \"Dedicated compliance\", price: \"Custom\", billingPeriod: \"yr\" },\n];\n\nconst categories = [\n  {\n    id: \"compute\",\n    title: \"Compute & Scale\",\n    features: [\n      { id: \"bandwidth\", name: \"Global Bandwidth\", values: { hobby: \"100 GB\", pro: \"1 TB\", enterprise: \"Unlimited\" } },\n      { id: \"regions\", name: \"Multi-Region Routing\", values: { hobby: false, pro: true, enterprise: true } },\n      { id: \"concurrency\", name: \"Max Concurrency\", values: { hobby: \"10\", pro: \"250\", enterprise: \"Dedicated\" } },\n    ],\n  },\n];\n\nexport function Demo() {\n  return <SmartComparison plans={plans} categories={categories} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SmartComparison.tsx",
        "type": "registry:ui",
        "target": "components/ui/smart-comparison.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "smooth-accordion",
    "name": "Smooth Accordion",
    "tagline": "Zero-jank spring collapsible content panels",
    "description": "An accordion component with physics height transition, rotating chevron indicators, and accessible keyboard toggles.",
    "category": "Feedback",
    "badges": [
      "Spring Height",
      "Zero Layout Shift",
      "Multi or Single"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/smooth-accordion",
    "features": [
      "Spring physics height interpolation",
      "Zero content clipping or layout jumps",
      "Single or multi-panel open mode"
    ],
    "props": [
      {
        "name": "items",
        "type": "AccordionItem[]",
        "default": "[]",
        "description": "Accordion items"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allow multiple open panels"
      },
      {
        "name": "defaultOpen",
        "type": "string[]",
        "default": "[]",
        "description": "Default open item ids"
      }
    ],
    "accessibility": [
      "WAI-ARIA accordion pattern",
      "aria-expanded and aria-controls attributes"
    ],
    "createdAt": "2026-08-05",
    "usageCode": "import { SmoothAccordion } from \"@/components/ui/smooth-accordion\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'How does ownership work?', content: 'You copy the full code directly into your repository.' },\n    { id: '2', title: 'Can I customize the springs?', content: 'Yes, all motion tokens are standard Framer Motion props.' }\n  ];\n  return <SmoothAccordion items={items} defaultOpen={['1']} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SmoothAccordion.tsx",
        "type": "registry:ui",
        "target": "components/ui/smooth-accordion.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "spotlight-card",
    "name": "Spotlight Card",
    "tagline": "Radial pointer tracking over dark layered surface",
    "description": "A dark elevated surface that illuminates border and inner surfaces dynamically based on mouse pointer coordinates.",
    "category": "Motion",
    "badges": [
      "Shader Feel",
      "Pointer Physics",
      "Dark Elevation"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spotlight-card",
    "features": [
      "Hardware-accelerated dynamic radial mask",
      "Dual illumination (border beam + ambient inner glow)",
      "Near-black layered background preservation"
    ],
    "props": [
      {
        "name": "spotlightColor",
        "type": "string",
        "default": "'rgba(56, 189, 248, 0.08)'",
        "description": "Inner ambient radial color"
      },
      {
        "name": "spotlightSize",
        "type": "number",
        "default": "350",
        "description": "Radius of spotlight effect in pixels"
      }
    ],
    "accessibility": [
      "Accessible contrast ratio for all nested text and actions",
      "No reliance on animation for critical content reading"
    ],
    "createdAt": "2026-08-15",
    "usageCode": "import { SpotlightCard } from \"@/components/ui/spotlight-card\";\n\nexport function Demo() {\n  return (\n    <SpotlightCard className=\"max-w-sm\">\n      <h3 className=\"text-base font-semibold text-white\">Edge Computing</h3>\n      <p className=\"text-sm text-neutral-400 mt-2\">\n        Deploy globally distributed stateful workloads in 35 regions.\n      </p>\n    </SpotlightCard>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/SpotlightCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/spotlight-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "spotlight-search",
    "name": "Spotlight Search",
    "tagline": "Global ⌘K search overlay with moving highlight spring physics",
    "description": "A global command palette and search overlay triggered by ⌘K featuring real-time fuzzy filtering, moving active highlight springs, kbd shortcuts, and full keyboard navigation.",
    "category": "Overlays",
    "badges": [
      "Command Palette",
      "Search",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spotlight-search",
    "features": [
      "Global keyboard listener for ⌘K / Ctrl+K and Escape dismissal",
      "Animated active highlight tracking item selection with layoutId spring physics",
      "Categorized search results with contextual icons and technical kbd badges",
      "Dimmed backdrop with subtle blur preserving focus on command box",
      "Full arrow key navigation and Enter selection execution"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Controlled visibility state"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Callback fired when modal visibility toggles"
      },
      {
        "name": "items",
        "type": "SpotlightSearchItem[]",
        "default": "[...]",
        "description": "List of searchable actions and components"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Search components, actions...'",
        "description": "Input placeholder text"
      },
      {
        "name": "onSelect",
        "type": "(item: SpotlightSearchItem) => void",
        "default": "undefined",
        "description": "Callback fired when item is chosen"
      }
    ],
    "accessibility": [
      "Aria-expanded and aria-autocomplete attributes on input",
      "Complete keyboard control (Up/Down arrows, Enter, Escape)",
      "Traps focus within dialog while active and restores focus on close"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { SpotlightSearch } from \"@/components/ui/spotlight-search\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Press ⌘K to search</button>\n      <SpotlightSearch open={open} onOpenChange={setOpen} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SpotlightSearch.tsx",
        "type": "registry:ui",
        "target": "components/ui/spotlight-search.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      },
      {
        "path": "src/lib/constants.ts",
        "type": "registry:lib",
        "target": "lib/constants.ts"
      }
    ]
  },
  {
    "id": "undo-toast",
    "name": "Undo Toast",
    "tagline": "Refined undo notification with real-time countdown progress and reversal animation",
    "description": "An advanced undo notification toast featuring an interactive progress countdown, pause-on-hover mechanics, action reversal animation, and versatile position anchoring.",
    "category": "Feedback",
    "badges": [
      "Notification",
      "Feedback",
      "Timer Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/undo-toast",
    "features": [
      "Real-time smooth countdown progress bar illustrating time window remaining",
      "Intelligent pause-on-hover physics so users never miss undo deadlines",
      "Visual state morphing upon clicking Undo before gentle dismissal",
      "Configurable multi-corner positioning (top, bottom, center, corners)",
      "Multiple semantically tinted variants: Default, Success, Warning, Error, and Info"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "true",
        "description": "Visibility state of the undo toast"
      },
      {
        "name": "title",
        "type": "string",
        "default": "'Project archived'",
        "description": "Primary notification message title"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Changes will be permanent in a few seconds'",
        "description": "Optional descriptive subtitle"
      },
      {
        "name": "undoLabel",
        "type": "string",
        "default": "'Undo'",
        "description": "Label for undo action trigger"
      },
      {
        "name": "restoredMessage",
        "type": "string",
        "default": "'Restored successfully'",
        "description": "Title displayed when action has been reversed"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "5000",
        "description": "Duration in milliseconds before auto-dismissal"
      },
      {
        "name": "variant",
        "type": "'default' | 'success' | 'warning' | 'error' | 'info'",
        "default": "'default'",
        "description": "Semantic visual tone"
      },
      {
        "name": "position",
        "type": "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
        "default": "'bottom-center'",
        "description": "Screen placement"
      },
      {
        "name": "onUndo",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clicks Undo"
      },
      {
        "name": "onDismiss",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when toast closes or expires"
      },
      {
        "name": "showProgress",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the countdown bar"
      }
    ],
    "accessibility": [
      "ARIA live role=\"status\" announcements for screen readers",
      "Full keyboard accessibility for Undo and Close buttons",
      "Respects reduced motion preferences by bypassing entry translations"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { UndoToast } from \"@/components/ui/undo-toast\";\n\nexport function Demo() {\n  const [show, setShow] = useState(true);\n\n  return (\n    <UndoToast\n      open={show}\n      title=\"File deleted\"\n      description=\"Item moved to trash\"\n      duration={5000}\n      onUndo={() => console.log('Action reversed')}\n      onDismiss={() => setShow(false)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/UndoToast.tsx",
        "type": "registry:ui",
        "target": "components/ui/undo-toast.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  }
];
