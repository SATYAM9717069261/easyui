// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../types/component';

export const EASY_COMPONENTS: EasyComponentMeta[] = [
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
    "usageCode": "import { AnimatedTabs } from \"@/components/ui/animated-tabs\";\n\nexport function Demo() {\n  const tabs = [\n    { id: 'overview', label: 'Overview', content: <div>Metrics Overview</div> },\n    { id: 'analytics', label: 'Analytics', content: <div>Traffic Charts</div> },\n    { id: 'settings', label: 'Settings', content: <div>Preferences</div> },\n  ];\n  return <AnimatedTabs tabs={tabs} defaultTab=\"overview\" />;\n}",
    "sourceCode": "import React, { useState } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface TabItem {\n  id: string;\n  label: string;\n  icon?: React.ReactNode;\n  content?: React.ReactNode;\n  badge?: string | number;\n}\n\nexport interface AnimatedTabsProps {\n  tabs: TabItem[];\n  defaultTab?: string;\n  onChange?: (tabId: string) => void;\n  className?: string;\n  renderContent?: boolean;\n}\n\nexport const AnimatedTabs: React.FC<AnimatedTabsProps> = ({\n  tabs,\n  defaultTab,\n  onChange,\n  className,\n  renderContent = true,\n}) => {\n  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id || '');\n\n  const handleTabClick = (tabId: string) => {\n    setActiveTab(tabId);\n    onChange?.(tabId);\n  };\n\n  const currentTabObj = tabs.find((t) => t.id === activeTab);\n\n  return (\n    <div className={cn('flex flex-col gap-4', className)}>\n      <div className=\"flex items-center gap-1 p-1 rounded-lg bg-[#0E0E0E] border border-[#1D1D1D] self-start\">\n        {tabs.map((tab) => {\n          const isActive = activeTab === tab.id;\n          return (\n            <button\n              key={tab.id}\n              onClick={() => handleTabClick(tab.id)}\n              className={cn(\n                'relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors focus-ring select-none flex items-center gap-2',\n                isActive ? 'text-[#F5F5F5]' : 'text-[#6F6F6F] hover:text-[#A1A1A1]'\n              )}\n            >\n              {isActive && (\n                <motion.div\n                  layoutId=\"active-tab-indicator\"\n                  className=\"absolute inset-0 rounded-md bg-[#181818] border border-[#2A2A2A] shadow-sm\"\n                  transition={motionTransitions.springMorph}\n                />\n              )}\n              <span className=\"relative z-10 flex items-center gap-1.5\">\n                {tab.icon && <span className=\"text-[#A1A1A1]\">{tab.icon}</span>}\n                {tab.label}\n                {tab.badge && (\n                  <span className=\"px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#252525] text-[#A1A1A1]\">\n                    {tab.badge}\n                  </span>\n                )}\n              </span>\n            </button>\n          );\n        })}\n      </div>\n\n      {renderContent && (\n        <div className=\"relative min-h-[60px]\">\n          <AnimatePresence mode=\"wait\">\n            {currentTabObj?.content && (\n              <motion.div\n                key={activeTab}\n                initial={{ opacity: 0, y: 6 }}\n                animate={{ opacity: 1, y: 0 }}\n                exit={{ opacity: 0, y: -6 }}\n                transition={motionTransitions.springGentle}\n                className=\"text-sm text-[#A1A1A1]\"\n              >\n                {currentTabObj.content}\n              </motion.div>\n            )}\n          </AnimatePresence>\n        </div>\n      )}\n    </div>\n  );\n};\n",
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
    "usageCode": "import { CommandMenu } from \"@/components/ui/command-menu\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return <CommandMenu isOpen={open} onClose={() => setOpen(false)} />;\n}",
    "sourceCode": "import React, { useState, useEffect, useMemo } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { Search, Sparkles, Layout, BookOpen, Terminal, CornerDownLeft, Cpu, GitPullRequest, Sliders } from 'lucide-react';\nimport { GithubIcon } from '../icons/GithubIcon';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\nimport { GITHUB_URL } from '../../lib/constants';\nimport { EASY_COMPONENTS } from '../registry/components-data';\n\nexport interface CommandItem {\n  id: string;\n  title: string;\n  category: 'Components' | 'Documentation' | 'Actions' | 'Navigation';\n  icon: React.ReactNode;\n  shortcut?: string;\n  onSelect: () => void;\n}\n\nexport interface CommandMenuProps {\n  isOpen: boolean;\n  onClose: () => void;\n  onSelectComponent?: (id: string) => void;\n  onNavigateDocs?: (topicId?: string) => void;\n}\n\nexport const CommandMenu: React.FC<CommandMenuProps> = ({\n  isOpen,\n  onClose,\n  onSelectComponent,\n  onNavigateDocs,\n}) => {\n  const [query, setQuery] = useState('');\n  const [selectedIndex, setSelectedIndex] = useState(0);\n\n  const commandItems: CommandItem[] = useMemo(() => {\n    // Dynamic component entries derived from generated catalog\n    const componentEntries: CommandItem[] = EASY_COMPONENTS.map((comp) => ({\n      id: comp.id,\n      title: comp.name,\n      category: 'Components',\n      icon: comp.category === 'Motion' ? <Sparkles className=\"w-4 h-4 text-[#D4D4D4]\" /> : <Layout className=\"w-4 h-4 text-[#D4D4D4]\" />,\n      shortcut: 'C',\n      onSelect: () => {\n        onSelectComponent?.(comp.id);\n        onClose();\n      },\n    }));\n\n    const docEntries: CommandItem[] = [\n      {\n        id: 'doc-intro',\n        title: 'Docs: Introduction & Vision',\n        category: 'Documentation',\n        icon: <BookOpen className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('introduction');\n          onClose();\n        },\n      },\n      {\n        id: 'doc-quickstart',\n        title: 'Docs: Quick Start & shadcn CLI',\n        category: 'Documentation',\n        icon: <Terminal className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('quick-start');\n          onClose();\n        },\n      },\n      {\n        id: 'doc-architecture',\n        title: 'Docs: Automatic Structure & Registry Engine',\n        category: 'Documentation',\n        icon: <Cpu className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('architecture');\n          onClose();\n        },\n      },\n      {\n        id: 'doc-collaboration',\n        title: 'Docs: How to Collaborate & Add Components',\n        category: 'Documentation',\n        icon: <GitPullRequest className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('collaboration');\n          onClose();\n        },\n      },\n      {\n        id: 'doc-motion',\n        title: 'Docs: Motion Tokens & Physics Curves',\n        category: 'Documentation',\n        icon: <Sliders className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('motion');\n          onClose();\n        },\n      },\n    ];\n\n    const actionEntries: CommandItem[] = [\n      {\n        id: 'cli-add',\n        title: 'Copy CLI Add Command',\n        category: 'Actions',\n        icon: <Terminal className=\"w-4 h-4 text-[#A1A1A1]\" />,\n        shortcut: '⌘C',\n        onSelect: () => {\n          navigator.clipboard.writeText('npx shadcn@latest add Surajmaurya1/easyui/magnetic-button');\n          onClose();\n        },\n      },\n      {\n        id: 'github-repo',\n        title: 'View GitHub Repository',\n        category: 'Navigation',\n        icon: <GithubIcon className=\"w-4 h-4 text-[#A1A1A1]\" />,\n        shortcut: 'G',\n        onSelect: () => {\n          window.open(GITHUB_URL, '_blank');\n          onClose();\n        },\n      },\n    ];\n\n    return [...componentEntries, ...docEntries, ...actionEntries];\n  }, [onSelectComponent, onNavigateDocs, onClose]);\n\n  const filteredItems = useMemo(() => {\n    return commandItems.filter(\n      (item) =>\n        item.title.toLowerCase().includes(query.toLowerCase()) ||\n        item.category.toLowerCase().includes(query.toLowerCase())\n    );\n  }, [commandItems, query]);\n\n  useEffect(() => {\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {\n        e.preventDefault();\n        if (isOpen) {\n          onClose();\n        }\n      }\n      if (!isOpen) return;\n\n      if (e.key === 'Escape') {\n        onClose();\n      } else if (e.key === 'ArrowDown') {\n        e.preventDefault();\n        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));\n      } else if (e.key === 'ArrowUp') {\n        e.preventDefault();\n        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));\n      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {\n        e.preventDefault();\n        filteredItems[selectedIndex].onSelect();\n      }\n    };\n\n    window.addEventListener('keydown', handleKeyDown);\n    return () => window.removeEventListener('keydown', handleKeyDown);\n  }, [isOpen, filteredItems, selectedIndex, onClose]);\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div className=\"fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6\">\n          {/* Backdrop */}\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            onClick={onClose}\n            className=\"fixed inset-0 bg-black/75 backdrop-blur-sm\"\n          />\n\n          {/* Palette Container */}\n          <motion.div\n            initial={{ opacity: 0, scale: 0.97, y: -8 }}\n            animate={{ opacity: 1, scale: 1, y: 0 }}\n            exit={{ opacity: 0, scale: 0.97, y: -8 }}\n            transition={motionTransitions.springSnappy}\n            className=\"relative w-full max-w-xl rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10\"\n          >\n            {/* Search Input Bar */}\n            <div className=\"flex items-center px-4 py-3 border-b border-[#161616]\">\n              <Search className=\"w-4 h-4 text-[#606060] mr-2.5 shrink-0\" />\n              <input\n                autoFocus\n                type=\"text\"\n                value={query}\n                onChange={(e) => {\n                  setQuery(e.target.value);\n                  setSelectedIndex(0);\n                }}\n                placeholder=\"Type a command or search components, docs...\"\n                className=\"w-full bg-transparent text-xs text-[#F5F5F5] placeholder-[#606060] focus:outline-none\"\n              />\n              <span className=\"text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#121212] border border-[#1E1E1E] text-[#606060]\">\n                ESC\n              </span>\n            </div>\n\n            {/* Results List */}\n            <div className=\"max-h-80 overflow-y-auto p-1.5\">\n              {filteredItems.length === 0 ? (\n                <div className=\"py-8 text-center text-xs text-[#606060]\">\n                  No commands or documentation matching \"{query}\"\n                </div>\n              ) : (\n                <div className=\"space-y-0.5\">\n                  {filteredItems.map((item, idx) => {\n                    const isSelected = idx === selectedIndex;\n                    return (\n                      <button\n                        key={item.id}\n                        onClick={item.onSelect}\n                        onMouseEnter={() => setSelectedIndex(idx)}\n                        className={cn(\n                          'flex w-full items-center justify-between px-3 py-2 rounded-md text-xs transition-colors text-left',\n                          isSelected\n                            ? 'bg-[#161616] text-[#F5F5F5]'\n                            : 'text-[#808080] hover:bg-[#101010]'\n                        )}\n                      >\n                        <div className=\"flex items-center gap-2.5\">\n                          {item.icon}\n                          <span className=\"font-normal\">{item.title}</span>\n                          <span className=\"text-[10px] text-[#555555] ml-1\">\n                            {item.category}\n                          </span>\n                        </div>\n                        <div className=\"flex items-center gap-2\">\n                          {isSelected && (\n                            <CornerDownLeft className=\"w-3 h-3 text-white\" />\n                          )}\n                          {item.shortcut && (\n                            <span className=\"text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1A1A1A] text-[#606060]\">\n                              {item.shortcut}\n                            </span>\n                          )}\n                        </div>\n                      </button>\n                    );\n                  })}\n                </div>\n              )}\n            </div>\n\n            {/* Footer status */}\n            <div className=\"flex items-center justify-between px-4 py-2 bg-[#080808] border-t border-[#141414] text-[11px] text-[#555555]\">\n              <div className=\"flex items-center gap-3\">\n                <span className=\"flex items-center gap-1\">\n                  <span className=\"font-mono bg-[#121212] px-1 rounded text-[10px]\">↑↓</span> navigate\n                </span>\n                <span className=\"flex items-center gap-1\">\n                  <span className=\"font-mono bg-[#121212] px-1 rounded text-[10px]\">↵</span> select\n                </span>\n              </div>\n              <span>EasyUI</span>\n            </div>\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n};\n",
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
    "tagline": "Interactive Canvas particle matrix with cursor bulge & glow",
    "description": "High-performance interactive Canvas dot matrix from React Bits with cursor proximity physics, radial glow aura, and customizable dispersion.",
    "category": "Motion",
    "badges": [
      "HTML5 Canvas",
      "React Bits",
      "Interactive Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dot-field",
    "features": [
      "60 FPS Canvas hardware-accelerated rendering",
      "Cursor repulsion and proximity bulge physics",
      "SVG radial glow aura tracking",
      "Dynamic gradient coloring and sparkle mode"
    ],
    "props": [
      {
        "name": "dotRadius",
        "type": "number",
        "default": "1.5",
        "description": "Radius of each individual dot"
      },
      {
        "name": "dotSpacing",
        "type": "number",
        "default": "14",
        "description": "Spacing between dots in the grid"
      },
      {
        "name": "bulgeStrength",
        "type": "number",
        "default": "67",
        "description": "Strength of the bulge effect around cursor"
      },
      {
        "name": "glowRadius",
        "type": "number",
        "default": "160",
        "description": "Radius of SVG glow effect"
      },
      {
        "name": "sparkle",
        "type": "boolean",
        "default": "false",
        "description": "Random sparkle animation on dots"
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
        "name": "glowColor",
        "type": "string",
        "default": "'#120F17'",
        "description": "Radial glow color following cursor"
      }
    ],
    "accessibility": [
      "Canvas decorative element",
      "Aria-hidden/pointer-events safe layer"
    ],
    "usageCode": "import { DotField } from \"@/components/ui/dot-field\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full h-[300px] overflow-hidden rounded-xl bg-[#0A0A0A]\">\n      <DotField\n        dotRadius={1.5}\n        dotSpacing={14}\n        bulgeStrength={67}\n        glowRadius={160}\n        sparkle={true}\n        gradientFrom=\"rgba(56, 189, 248, 0.35)\"\n        gradientTo=\"rgba(168, 85, 247, 0.25)\"\n      />\n    </div>\n  );\n}",
    "sourceCode": "import React, { useEffect, useRef, memo } from 'react';\nimport './DotField.css';\n\nconst TWO_PI = Math.PI * 2;\n\nexport interface DotFieldProps extends React.HTMLAttributes<HTMLDivElement> {\n  dotRadius?: number;\n  dotSpacing?: number;\n  cursorRadius?: number;\n  cursorForce?: number;\n  bulgeOnly?: boolean;\n  bulgeStrength?: number;\n  glowRadius?: number;\n  sparkle?: boolean;\n  waveAmplitude?: number;\n  gradientFrom?: string;\n  gradientTo?: string;\n  glowColor?: string;\n  className?: string;\n}\n\ninterface Dot {\n  ax: number;\n  ay: number;\n  sx: number;\n  sy: number;\n  vx: number;\n  vy: number;\n  x: number;\n  y: number;\n}\n\nexport const DotField: React.FC<DotFieldProps> = memo(({\n  dotRadius = 1.5,\n  dotSpacing = 14,\n  cursorRadius = 500,\n  cursorForce = 0.1,\n  bulgeOnly = true,\n  bulgeStrength = 67,\n  glowRadius = 160,\n  sparkle = false,\n  waveAmplitude = 0,\n  gradientFrom = 'rgba(56, 189, 248, 0.35)',\n  gradientTo = 'rgba(168, 85, 247, 0.25)',\n  glowColor = 'rgba(56, 189, 248, 0.15)',\n  className = '',\n  style,\n  ...rest\n}) => {\n  const canvasRef = useRef<HTMLCanvasElement | null>(null);\n  const svgRef = useRef<SVGSVGElement | null>(null);\n  const glowRef = useRef<SVGCircleElement | null>(null);\n  const dotsRef = useRef<Dot[]>([]);\n  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });\n  const rafRef = useRef<number | null>(null);\n  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });\n  const glowOpacity = useRef(0);\n  const engagement = useRef(0);\n  const propsRef = useRef({\n    dotRadius,\n    dotSpacing,\n    cursorRadius,\n    cursorForce,\n    bulgeOnly,\n    bulgeStrength,\n    sparkle,\n    waveAmplitude,\n    gradientFrom,\n    gradientTo,\n  });\n\n  propsRef.current = {\n    dotRadius,\n    dotSpacing,\n    cursorRadius,\n    cursorForce,\n    bulgeOnly,\n    bulgeStrength,\n    sparkle,\n    waveAmplitude,\n    gradientFrom,\n    gradientTo,\n  };\n\n  const rebuildRef = useRef<(() => void) | null>(null);\n  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);\n\n  useEffect(() => {\n    const canvas = canvasRef.current;\n    const glowEl = glowRef.current;\n    if (!canvas) return;\n    const ctx = canvas.getContext('2d', { alpha: true });\n    if (!ctx) return;\n\n    const dpr = Math.min(window.devicePixelRatio || 1, 2);\n    let resizeTimer: ReturnType<typeof setTimeout>;\n\n    function resize() {\n      clearTimeout(resizeTimer);\n      resizeTimer = setTimeout(doResize, 100);\n    }\n\n    function doResize() {\n      if (!canvas || !canvas.parentElement || !ctx) return;\n      const rect = canvas.parentElement.getBoundingClientRect();\n      const w = rect.width;\n      const h = rect.height;\n\n      canvas.width = w * dpr;\n      canvas.height = h * dpr;\n      canvas.style.width = `${w}px`;\n      canvas.style.height = `${h}px`;\n      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n\n      sizeRef.current = {\n        w,\n        h,\n        offsetX: rect.left + window.scrollX,\n        offsetY: rect.top + window.scrollY,\n      };\n\n      buildDots(w, h);\n    }\n\n    function buildDots(w: number, h: number) {\n      const p = propsRef.current;\n      const step = p.dotRadius + p.dotSpacing;\n      const cols = Math.floor(w / step);\n      const rows = Math.floor(h / step);\n      const padX = (w % step) / 2;\n      const padY = (h % step) / 2;\n      const dots: Dot[] = new Array(rows * cols);\n      let idx = 0;\n\n      for (let row = 0; row < rows; row++) {\n        for (let col = 0; col < cols; col++) {\n          const ax = padX + col * step + step / 2;\n          const ay = padY + row * step + step / 2;\n          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };\n        }\n      }\n      dotsRef.current = dots;\n    }\n\n    function onMouseMove(e: MouseEvent) {\n      const s = sizeRef.current;\n      mouseRef.current.x = e.pageX - s.offsetX;\n      mouseRef.current.y = e.pageY - s.offsetY;\n    }\n\n    function updateMouseSpeed() {\n      const m = mouseRef.current;\n      const dx = m.prevX - m.x;\n      const dy = m.prevY - m.y;\n      const dist = Math.sqrt(dx * dx + dy * dy);\n      m.speed += (dist - m.speed) * 0.5;\n      if (m.speed < 0.001) m.speed = 0;\n      m.prevX = m.x;\n      m.prevY = m.y;\n    }\n\n    const speedInterval = setInterval(updateMouseSpeed, 20);\n\n    let frameCount = 0;\n\n    function tick() {\n      frameCount++;\n      const dots = dotsRef.current;\n      const m = mouseRef.current;\n      const { w, h } = sizeRef.current;\n      const p = propsRef.current;\n      if (!ctx || w === 0 || h === 0) {\n        rafRef.current = requestAnimationFrame(tick);\n        return;\n      }\n      const len = dots.length;\n      const t = frameCount * 0.02;\n\n      const targetEngagement = Math.min(m.speed / 5, 1);\n      engagement.current += (targetEngagement - engagement.current) * 0.06;\n      if (engagement.current < 0.001) engagement.current = 0;\n      const eng = engagement.current;\n\n      glowOpacity.current += (eng - glowOpacity.current) * 0.08;\n\n      if (glowEl) {\n        glowEl.setAttribute('cx', String(m.x));\n        glowEl.setAttribute('cy', String(m.y));\n        glowEl.style.opacity = String(glowOpacity.current);\n      }\n\n      ctx.clearRect(0, 0, w, h);\n\n      const grad = ctx.createLinearGradient(0, 0, w, h);\n      grad.addColorStop(0, p.gradientFrom);\n      grad.addColorStop(1, p.gradientTo);\n      ctx.fillStyle = grad;\n\n      const cr = p.cursorRadius;\n      const crSq = cr * cr;\n      const rad = p.dotRadius / 2;\n      const isBulge = p.bulgeOnly;\n\n      ctx.beginPath();\n\n      for (let i = 0; i < len; i++) {\n        const d = dots[i];\n        const dx = m.x - d.ax;\n        const dy = m.y - d.ay;\n        const distSq = dx * dx + dy * dy;\n\n        if (distSq < crSq && eng > 0.01) {\n          const dist = Math.sqrt(distSq);\n          if (isBulge) {\n            const tr = 1 - dist / cr;\n            const push = tr * tr * p.bulgeStrength * eng;\n            const angle = Math.atan2(dy, dx);\n            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;\n            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;\n          } else {\n            const angle = Math.atan2(dy, dx);\n            const move = (500 / dist) * (m.speed * p.cursorForce);\n            d.vx += Math.cos(angle) * -move;\n            d.vy += Math.sin(angle) * -move;\n          }\n        } else if (isBulge) {\n          d.sx += (d.ax - d.sx) * 0.1;\n          d.sy += (d.ay - d.sy) * 0.1;\n        }\n\n        if (!isBulge) {\n          d.vx *= 0.9;\n          d.vy *= 0.9;\n          d.x = d.ax + d.vx;\n          d.y = d.ay + d.vy;\n          d.sx += (d.x - d.sx) * 0.1;\n          d.sy += (d.y - d.sy) * 0.1;\n        }\n\n        let drawX = d.sx;\n        let drawY = d.sy;\n        if (p.waveAmplitude > 0) {\n          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;\n          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;\n        }\n\n        if (p.sparkle) {\n          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;\n          if ((hash % 100) < 3) {\n            ctx.moveTo(drawX + rad * 1.8, drawY);\n            ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);\n          } else {\n            ctx.moveTo(drawX + rad, drawY);\n            ctx.arc(drawX, drawY, rad, 0, TWO_PI);\n          }\n        } else {\n          ctx.moveTo(drawX + rad, drawY);\n          ctx.arc(drawX, drawY, rad, 0, TWO_PI);\n        }\n      }\n\n      ctx.fill();\n\n      rafRef.current = requestAnimationFrame(tick);\n    }\n\n    doResize();\n    window.addEventListener('resize', resize);\n    window.addEventListener('mousemove', onMouseMove, { passive: true });\n    rafRef.current = requestAnimationFrame(tick);\n\n    rebuildRef.current = () => {\n      const { w, h } = sizeRef.current;\n      if (w > 0 && h > 0) buildDots(w, h);\n    };\n\n    return () => {\n      if (rafRef.current) cancelAnimationFrame(rafRef.current);\n      clearInterval(speedInterval);\n      clearTimeout(resizeTimer);\n      window.removeEventListener('resize', resize);\n      window.removeEventListener('mousemove', onMouseMove);\n    };\n  }, []);\n\n  useEffect(() => {\n    rebuildRef.current?.();\n  }, [dotRadius, dotSpacing]);\n\n  return (\n    <div className={`dot-field-container ${className}`} style={style} {...rest}>\n      <canvas\n        ref={canvasRef}\n        style={{\n          position: 'absolute',\n          inset: 0,\n          width: '100%',\n          height: '100%',\n        }}\n      />\n      <svg\n        ref={svgRef}\n        style={{\n          position: 'absolute',\n          inset: 0,\n          width: '100%',\n          height: '100%',\n          pointerEvents: 'none',\n        }}\n      >\n        <defs>\n          <radialGradient id={glowIdRef.current}>\n            <stop offset=\"0%\" stopColor={glowColor} />\n            <stop offset=\"100%\" stopColor=\"transparent\" />\n          </radialGradient>\n        </defs>\n        <circle\n          ref={glowRef}\n          cx=\"-9999\"\n          cy=\"-9999\"\n          r={glowRadius}\n          fill={`url(#${glowIdRef.current})`}\n          style={{ opacity: 0, willChange: 'opacity' }}\n        />\n      </svg>\n    </div>\n  );\n});\n\nDotField.displayName = 'DotField';\n\nexport default DotField;\n",
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
    "usageCode": "import { ExpandableSearch } from \"@/components/ui/expandable-search\";\n\nexport function Demo() {\n  return <ExpandableSearch onSearch={(q) => console.log(q)} />;\n}",
    "sourceCode": "import React, { useState, useRef } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { Search, X, Command } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface ExpandableSearchProps {\n  placeholder?: string;\n  onSearch?: (query: string) => void;\n  className?: string;\n}\n\nexport const ExpandableSearch: React.FC<ExpandableSearchProps> = ({\n  placeholder = 'Search components, props...',\n  onSearch,\n  className,\n}) => {\n  const [isExpanded, setIsExpanded] = useState(false);\n  const [value, setValue] = useState('');\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  const handleOpen = () => {\n    setIsExpanded(true);\n    setTimeout(() => inputRef.current?.focus(), 100);\n  };\n\n  const handleClose = () => {\n    setIsExpanded(false);\n    setValue('');\n    onSearch?.('');\n  };\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    setValue(e.target.value);\n    onSearch?.(e.target.value);\n  };\n\n  return (\n    <div className={cn('relative inline-flex items-center', className)}>\n      <motion.div\n        animate={{\n          width: isExpanded ? 280 : 160,\n          borderColor: isExpanded ? '#2A2A2A' : '#1D1D1D',\n          backgroundColor: isExpanded ? '#111111' : '#0A0A0A',\n        }}\n        transition={motionTransitions.springSnappy}\n        className=\"flex items-center h-9 px-3 rounded-lg border shadow-sm cursor-text transition-colors\"\n        onClick={handleOpen}\n      >\n        <Search className=\"w-3.5 h-3.5 text-[#6F6F6F] shrink-0 mr-2\" />\n        <input\n          ref={inputRef}\n          type=\"text\"\n          value={value}\n          onChange={handleChange}\n          onFocus={() => setIsExpanded(true)}\n          onBlur={() => !value && setIsExpanded(false)}\n          placeholder={isExpanded ? placeholder : 'Quick search...'}\n          className=\"w-full bg-transparent text-xs sm:text-sm text-[#F5F5F5] placeholder-[#6F6F6F] focus:outline-none\"\n        />\n        <AnimatePresence>\n          {value ? (\n            <button\n              onClick={(e) => {\n                e.stopPropagation();\n                handleClose();\n              }}\n              className=\"p-0.5 rounded text-[#6F6F6F] hover:text-[#F5F5F5] transition-colors\"\n            >\n              <X className=\"w-3.5 h-3.5\" />\n            </button>\n          ) : (\n            <motion.div\n              initial={{ opacity: 0 }}\n              animate={{ opacity: 1 }}\n              exit={{ opacity: 0 }}\n              className=\"hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#161616] border border-[#222222] text-[10px] text-[#6F6F6F] font-mono shrink-0 select-none\"\n            >\n              <Command className=\"w-2.5 h-2.5\" />\n              <span>K</span>\n            </motion.div>\n          )}\n        </AnimatePresence>\n      </motion.div>\n    </div>\n  );\n};\n",
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
    "usageCode": "import { FloatingActionDock } from \"@/components/ui/floating-action-dock\";\nimport { Terminal, Code2, Sparkles, Settings } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: 'terminal', label: 'Terminal', icon: <Terminal /> },\n    { id: 'editor', label: 'Editor', icon: <Code2 /> },\n    { id: 'ai', label: 'AI Assistant', icon: <Sparkles /> },\n  ];\n  return <FloatingActionDock items={items} activeId=\"terminal\" />;\n}",
    "sourceCode": "import React, { useRef } from 'react';\nimport { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface DockItem {\n  id: string;\n  label: string;\n  icon: React.ReactNode;\n  onClick?: () => void;\n  badge?: boolean;\n}\n\nexport interface FloatingActionDockProps {\n  items: DockItem[];\n  className?: string;\n  activeId?: string;\n}\n\nfunction DockIcon({\n  item,\n  mouseX,\n  isActive,\n}: {\n  item: DockItem;\n  mouseX: MotionValue;\n  isActive?: boolean;\n}) {\n  const ref = useRef<HTMLButtonElement>(null);\n\n  const distance = useTransform(mouseX, (val: number) => {\n    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };\n    return val - bounds.x - bounds.width / 2;\n  });\n\n  const widthSync = useTransform(distance, [-120, 0, 120], [40, 56, 40]);\n  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });\n\n  return (\n    <motion.button\n      ref={ref}\n      style={{ width, height: width }}\n      onClick={item.onClick}\n      whileTap={{ scale: 0.88 }}\n      transition={motionTransitions.springSnappy}\n      className={cn(\n        'group relative flex items-center justify-center rounded-xl bg-[#141414] border border-[#222222] hover:border-[#383838] hover:bg-[#1A1A1A] transition-colors focus-ring',\n        isActive && 'border-[#444444] bg-[#1A1A1A]'\n      )}\n      aria-label={item.label}\n    >\n      {/* Tooltip */}\n      <div className=\"pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-[11px] text-[#F5F5F5] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-md z-20\">\n        {item.label}\n      </div>\n\n      {/* Icon */}\n      <span className=\"text-[#A1A1A1] group-hover:text-[#F5F5F5] transition-colors [&>svg]:w-5 [&>svg]:h-5\">\n        {item.icon}\n      </span>\n\n      {/* Active Dot */}\n      {isActive && (\n        <span className=\"absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white\" />\n      )}\n    </motion.button>\n  );\n}\n\nexport const FloatingActionDock: React.FC<FloatingActionDockProps> = ({\n  items,\n  className,\n  activeId,\n}) => {\n  const mouseX = useMotionValue(Infinity);\n\n  return (\n    <motion.div\n      onMouseMove={(e) => mouseX.set(e.pageX)}\n      onMouseLeave={() => mouseX.set(Infinity)}\n      className={cn(\n        'inline-flex items-end gap-2.5 px-3 py-2.5 rounded-2xl bg-[#090909]/90 backdrop-blur-md border border-[#1D1D1D] shadow-[0_12px_32px_rgba(0,0,0,0.6)]',\n        className\n      )}\n    >\n      {items.map((item) => (\n        <DockIcon\n          key={item.id}\n          item={item}\n          mouseX={mouseX}\n          isActive={activeId === item.id}\n        />\n      ))}\n    </motion.div>\n  );\n};\n",
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
    "usageCode": "import { MagneticButton } from \"@/components/ui/magnetic-button\";\nimport { ArrowUpRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <MagneticButton strength={0.4} variant=\"primary\">\n      <span>Get Started</span>\n      <ArrowUpRight className=\"w-4 h-4\" />\n    </MagneticButton>\n  );\n}",
    "sourceCode": "import React, { useRef, useState } from 'react';\nimport { motion, useSpring } from 'framer-motion';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  children: React.ReactNode;\n  strength?: number; // Distance pull multiplier\n  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';\n  size?: 'sm' | 'md' | 'lg';\n  className?: string;\n  glow?: boolean;\n}\n\nexport const MagneticButton: React.FC<MagneticButtonProps> = ({\n  children,\n  strength = 0.35,\n  variant = 'primary',\n  size = 'md',\n  className,\n  glow = true,\n  onClick,\n  ...props\n}) => {\n  const ref = useRef<HTMLButtonElement>(null);\n  const [isHovered, setIsHovered] = useState(false);\n\n  // Smooth physical spring coordinates\n  const springX = useSpring(0, { stiffness: 280, damping: 20 });\n  const springY = useSpring(0, { stiffness: 280, damping: 20 });\n\n  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {\n    if (!ref.current) return;\n    const { clientX, clientY } = e;\n    const { left, top, width, height } = ref.current.getBoundingClientRect();\n    const middleX = clientX - (left + width / 2);\n    const middleY = clientY - (top + height / 2);\n\n    springX.set(middleX * strength);\n    springY.set(middleY * strength);\n  };\n\n  const handleMouseLeave = () => {\n    setIsHovered(false);\n    springX.set(0);\n    springY.set(0);\n  };\n\n  const handleMouseEnter = () => {\n    setIsHovered(true);\n  };\n\n  const variantStyles = {\n    primary: 'bg-[#F5F5F5] text-[#050505] hover:bg-[#FFFFFF] shadow-[0_0_20px_-3px_rgba(255,255,255,0.15)] font-medium',\n    secondary: 'bg-[#151515] text-[#F5F5F5] border border-[#1D1D1D] hover:border-[#2A2A2A] hover:bg-[#1A1A1A]',\n    outline: 'bg-transparent text-[#F5F5F5] border border-[#2A2A2A] hover:border-[#F5F5F5]/30 hover:bg-[#101010]',\n    ghost: 'bg-transparent text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#101010]',\n  };\n\n  const sizeStyles = {\n    sm: 'px-3.5 py-1.5 text-xs rounded-md gap-1.5',\n    md: 'px-5 py-2.5 text-sm rounded-[8px] gap-2',\n    lg: 'px-7 py-3.5 text-base rounded-[10px] gap-2.5',\n  };\n\n  return (\n    <motion.button\n      ref={ref}\n      style={{ x: springX, y: springY }}\n      onMouseMove={handleMouseMove}\n      onMouseEnter={handleMouseEnter}\n      onMouseLeave={handleMouseLeave}\n      onClick={onClick}\n      whileTap={{ scale: 0.96 }}\n      transition={motionTransitions.springSnappy}\n      className={cn(\n        'relative inline-flex items-center justify-center transition-colors select-none focus-ring',\n        variantStyles[variant],\n        sizeStyles[size],\n        className\n      )}\n      {...(props as any)}\n    >\n      {glow && isHovered && (\n        <span \n          className=\"absolute inset-0 rounded-[inherit] pointer-events-none opacity-40 blur-sm bg-gradient-to-r from-transparent via-white/10 to-transparent\"\n        />\n      )}\n      <span className=\"relative z-10 flex items-center gap-2\">\n        {children}\n      </span>\n    </motion.button>\n  );\n};\n",
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
    "usageCode": "import { MorphingDialog } from \"@/components/ui/morphing-dialog\";\n\nexport function Demo() {\n  return (\n    <MorphingDialog\n      title=\"API Key Configuration\"\n      subtitle=\"Manage fine-grained token permissions\"\n      trigger={(open) => (\n        <button onClick={open} className=\"px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm\">\n          Configure Keys\n        </button>\n      )}\n    >\n      <p className=\"text-sm text-neutral-300\">Set read/write boundaries for automation tasks.</p>\n    </MorphingDialog>\n  );\n}",
    "sourceCode": "import React, { useState, useEffect } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { X } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface MorphingDialogProps {\n  id?: string;\n  trigger: (open: () => void) => React.ReactNode;\n  title: string;\n  subtitle?: string;\n  children: React.ReactNode;\n  className?: string;\n}\n\nexport const MorphingDialog: React.FC<MorphingDialogProps> = ({\n  id = 'morph-dialog',\n  trigger,\n  title,\n  subtitle,\n  children,\n  className,\n}) => {\n  const [isOpen, setIsOpen] = useState(false);\n\n  useEffect(() => {\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === 'Escape') setIsOpen(false);\n    };\n    if (isOpen) {\n      document.body.style.overflow = 'hidden';\n      window.addEventListener('keydown', handleKeyDown);\n    } else {\n      document.body.style.overflow = 'unset';\n    }\n    return () => {\n      document.body.style.overflow = 'unset';\n      window.removeEventListener('keydown', handleKeyDown);\n    };\n  }, [isOpen]);\n\n  return (\n    <>\n      <div className=\"inline-block\">\n        {trigger(() => setIsOpen(true))}\n      </div>\n\n      <AnimatePresence>\n        {isOpen && (\n          <div className=\"fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6\">\n            {/* Backdrop */}\n            <motion.div\n              initial={{ opacity: 0 }}\n              animate={{ opacity: 1 }}\n              exit={{ opacity: 0 }}\n              transition={motionTransitions.easeSoft}\n              onClick={() => setIsOpen(false)}\n              className=\"fixed inset-0 bg-black/70 backdrop-blur-md\"\n            />\n\n            {/* Expanded Morphing Surface */}\n            <motion.div\n              layoutId={id}\n              transition={motionTransitions.springMorph}\n              className={cn(\n                'relative w-full max-w-lg rounded-2xl border border-[#252525] bg-[#0C0C0C] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 overflow-hidden',\n                className\n              )}\n            >\n              {/* Header */}\n              <div className=\"flex items-start justify-between mb-4\">\n                <div>\n                  <motion.h3\n                    initial={{ opacity: 0, y: 4 }}\n                    animate={{ opacity: 1, y: 0 }}\n                    transition={{ delay: 0.05 }}\n                    className=\"text-lg sm:text-xl font-semibold text-[#F5F5F5] tracking-tight\"\n                  >\n                    {title}\n                  </motion.h3>\n                  {subtitle && (\n                    <motion.p\n                      initial={{ opacity: 0, y: 4 }}\n                      animate={{ opacity: 1, y: 0 }}\n                      transition={{ delay: 0.1 }}\n                      className=\"text-xs sm:text-sm text-[#A1A1A1] mt-1\"\n                    >\n                      {subtitle}\n                    </motion.p>\n                  )}\n                </div>\n                <button\n                  onClick={() => setIsOpen(false)}\n                  className=\"p-1.5 rounded-lg text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#1A1A1A] transition-colors focus-ring\"\n                  aria-label=\"Close dialog\"\n                >\n                  <X className=\"w-4 h-4\" />\n                </button>\n              </div>\n\n              {/* Body */}\n              <motion.div\n                initial={{ opacity: 0, y: 8 }}\n                animate={{ opacity: 1, y: 0 }}\n                transition={{ delay: 0.15 }}\n                className=\"mt-4\"\n              >\n                {children}\n              </motion.div>\n            </motion.div>\n          </div>\n        )}\n      </AnimatePresence>\n    </>\n  );\n};\n",
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
    "usageCode": "import { NotificationStack } from \"@/components/ui/notification-stack\";\n\nexport function Demo() {\n  return <NotificationStack maxVisible={3} />;\n}",
    "sourceCode": "import React, { useState } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { CheckCircle2, AlertCircle, Info, X, Bell } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface NotificationItem {\n  id: string;\n  title: string;\n  description: string;\n  type?: 'success' | 'info' | 'warning';\n  time?: string;\n}\n\nexport interface NotificationStackProps {\n  initialNotifications?: NotificationItem[];\n  className?: string;\n  maxVisible?: number;\n}\n\nexport const NotificationStack: React.FC<NotificationStackProps> = ({\n  initialNotifications = [\n    {\n      id: '1',\n      title: 'Deployment Successful',\n      description: 'Production build v2.4.0 deployed to edge nodes.',\n      type: 'success',\n      time: 'Just now',\n    },\n    {\n      id: '2',\n      title: 'Component Synced',\n      description: 'magnetic-button synced from EasyUI GitHub registry.',\n      type: 'info',\n      time: '2m ago',\n    },\n    {\n      id: '3',\n      title: 'API Limit Warning',\n      description: '85% of monthly request quota utilized.',\n      type: 'warning',\n      time: '10m ago',\n    },\n  ],\n  className,\n  maxVisible = 3,\n}) => {\n  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);\n  const [isExpanded, setIsExpanded] = useState(false);\n\n  const dismiss = (id: string) => {\n    setNotifications((prev) => prev.filter((n) => n.id !== id));\n  };\n\n  const addSampleNotification = () => {\n    const types: ('success' | 'info' | 'warning')[] = ['success', 'info', 'warning'];\n    const randomType = types[Math.floor(Math.random() * types.length)];\n    const newNotif: NotificationItem = {\n      id: Date.now().toString(),\n      title: randomType === 'success' ? 'Cache Invalidation Done' : randomType === 'warning' ? 'High Memory Usage' : 'New Webhook Triggered',\n      description: 'Triggered by automated pipeline workflow #841.',\n      type: randomType,\n      time: 'Just now',\n    };\n    setNotifications((prev) => [newNotif, ...prev]);\n  };\n\n  const getIcon = (type?: 'success' | 'info' | 'warning') => {\n    switch (type) {\n      case 'success':\n        return <CheckCircle2 className=\"w-4 h-4 text-white\" />;\n      case 'warning':\n        return <AlertCircle className=\"w-4 h-4 text-[#D4D4D4]\" />;\n      default:\n        return <Info className=\"w-4 h-4 text-[#ECECEC]\" />;\n    }\n  };\n\n  return (\n    <div className={cn('flex flex-col gap-3 max-w-sm w-full select-none', className)}>\n      <div className=\"flex items-center justify-between px-1\">\n        <div className=\"flex items-center gap-2 text-xs font-medium text-[#A1A1A1]\">\n          <Bell className=\"w-3.5 h-3.5 text-[#6F6F6F]\" />\n          <span>Notifications ({notifications.length})</span>\n        </div>\n        <div className=\"flex items-center gap-2\">\n          <button\n            onClick={addSampleNotification}\n            className=\"text-[11px] text-white hover:text-white/80 font-medium transition-colors\"\n          >\n            + Simulate\n          </button>\n          <button\n            onClick={() => setIsExpanded(!isExpanded)}\n            className=\"text-[11px] text-[#6F6F6F] hover:text-[#A1A1A1] transition-colors\"\n          >\n            {isExpanded ? 'Stack' : 'Expand'}\n          </button>\n        </div>\n      </div>\n\n      <div className=\"relative min-h-[140px]\">\n        <AnimatePresence mode=\"popLayout\">\n          {notifications.length === 0 ? (\n            <motion.div\n              initial={{ opacity: 0 }}\n              animate={{ opacity: 1 }}\n              className=\"p-6 text-center rounded-xl border border-[#1D1D1D] bg-[#0A0A0A] text-xs text-[#6F6F6F]\"\n            >\n              No pending notifications\n            </motion.div>\n          ) : (\n            notifications.slice(0, isExpanded ? notifications.length : maxVisible).map((item, index) => {\n              const offset = index * 12;\n              const scale = 1 - index * 0.04;\n              const zIndex = notifications.length - index;\n\n              return (\n                <motion.div\n                  key={item.id}\n                  layout\n                  initial={{ opacity: 0, y: -20, scale: 0.95 }}\n                  animate={{\n                    opacity: 1,\n                    y: isExpanded ? index * 74 : offset,\n                    scale: isExpanded ? 1 : scale,\n                    zIndex,\n                  }}\n                  exit={{ opacity: 0, x: 80, scale: 0.9 }}\n                  transition={motionTransitions.springResponsive}\n                  drag=\"x\"\n                  dragConstraints={{ left: 0, right: 100 }}\n                  onDragEnd={(_, info) => {\n                    if (info.offset.x > 60) {\n                      dismiss(item.id);\n                    }\n                  }}\n                  style={{\n                    position: isExpanded ? 'relative' : 'absolute',\n                    top: 0,\n                    left: 0,\n                    right: 0,\n                  }}\n                  className=\"rounded-xl border border-[#222222] bg-[#0E0E0E] p-3.5 shadow-lg cursor-grab active:cursor-grabbing hover:border-[#2E2E2E] transition-colors\"\n                >\n                  <div className=\"flex items-start justify-between gap-2\">\n                    <div className=\"flex items-start gap-2.5\">\n                      <div className=\"mt-0.5 shrink-0\">{getIcon(item.type)}</div>\n                      <div>\n                        <div className=\"flex items-center gap-2\">\n                          <h4 className=\"text-xs font-semibold text-[#F5F5F5]\">{item.title}</h4>\n                          <span className=\"text-[10px] text-[#6F6F6F]\">{item.time}</span>\n                        </div>\n                        <p className=\"text-[11px] text-[#A1A1A1] mt-0.5 leading-snug\">\n                          {item.description}\n                        </p>\n                      </div>\n                    </div>\n                    <button\n                      onClick={() => dismiss(item.id)}\n                      className=\"text-[#6F6F6F] hover:text-[#F5F5F5] p-0.5 rounded transition-colors\"\n                      aria-label=\"Dismiss\"\n                    >\n                      <X className=\"w-3.5 h-3.5\" />\n                    </button>\n                  </div>\n                </motion.div>\n              );\n            })\n          )}\n        </AnimatePresence>\n      </div>\n    </div>\n  );\n};\n",
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
    "usageCode": "import { RevealCard } from \"@/components/ui/reveal-card\";\n\nexport function Demo() {\n  return (\n    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>\n      <h4>Cloud Engine</h4>\n    </RevealCard>\n  );\n}",
    "sourceCode": "import React, { useRef, useState } from 'react';\nimport { motion, useSpring, useMotionValue } from 'framer-motion';\nimport { cn } from '../../lib/utils';\n\nexport interface RevealCardProps {\n  children: React.ReactNode;\n  revealContent?: React.ReactNode;\n  maxTilt?: number;\n  className?: string;\n}\n\nexport const RevealCard: React.FC<RevealCardProps> = ({\n  children,\n  revealContent,\n  maxTilt = 12,\n  className,\n}) => {\n  const cardRef = useRef<HTMLDivElement>(null);\n  const [isHovered, setIsHovered] = useState(false);\n\n  const rotateX = useSpring(0, { stiffness: 260, damping: 20 });\n  const rotateY = useSpring(0, { stiffness: 260, damping: 20 });\n  const glareX = useMotionValue(50);\n  const glareY = useMotionValue(50);\n\n  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {\n    if (!cardRef.current) return;\n    const rect = cardRef.current.getBoundingClientRect();\n    const x = e.clientX - rect.left;\n    const y = e.clientY - rect.top;\n\n    const centerX = rect.width / 2;\n    const centerY = rect.height / 2;\n\n    const rotX = ((y - centerY) / centerY) * -maxTilt;\n    const rotY = ((x - centerX) / centerX) * maxTilt;\n\n    rotateX.set(rotX);\n    rotateY.set(rotY);\n\n    glareX.set((x / rect.width) * 100);\n    glareY.set((y / rect.height) * 100);\n  };\n\n  const handleMouseLeave = () => {\n    setIsHovered(false);\n    rotateX.set(0);\n    rotateY.set(0);\n  };\n\n  return (\n    <div style={{ perspective: 1000 }} className=\"inline-block w-full\">\n      <motion.div\n        ref={cardRef}\n        onMouseMove={handleMouseMove}\n        onMouseEnter={() => setIsHovered(true)}\n        onMouseLeave={handleMouseLeave}\n        style={{\n          rotateX,\n          rotateY,\n          transformStyle: 'preserve-3d',\n        }}\n        className={cn(\n          'relative rounded-xl border border-[#1D1D1D] bg-[#0A0A0A] p-6 transition-colors duration-200 hover:border-[#2A2A2A] overflow-hidden',\n          className\n        )}\n      >\n        {/* Subtle dynamic glare overlay */}\n        {isHovered && (\n          <motion.div\n            className=\"pointer-events-none absolute -inset-px rounded-xl opacity-20\"\n            style={{\n              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.4), transparent 60%)`,\n            }}\n          />\n        )}\n\n        {/* Primary Content */}\n        <div className=\"relative z-10\">{children}</div>\n\n        {/* Revealed Content on hover/interaction */}\n        {revealContent && (\n          <motion.div\n            initial={{ opacity: 0, y: 10 }}\n            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}\n            transition={{ duration: 0.2 }}\n            className=\"relative z-10 mt-4 pt-4 border-t border-[#1D1D1D]\"\n          >\n            {revealContent}\n          </motion.div>\n        )}\n      </motion.div>\n    </div>\n  );\n};\n",
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
    "usageCode": "import { SmoothAccordion } from \"@/components/ui/smooth-accordion\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'How does ownership work?', content: 'You copy the full code directly into your repository.' },\n    { id: '2', title: 'Can I customize the springs?', content: 'Yes, all motion tokens are standard Framer Motion props.' }\n  ];\n  return <SmoothAccordion items={items} defaultOpen={['1']} />;\n}",
    "sourceCode": "import React, { useState } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { ChevronDown } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface AccordionItem {\n  id: string;\n  title: string;\n  subtitle?: string;\n  content: React.ReactNode;\n}\n\nexport interface SmoothAccordionProps {\n  items: AccordionItem[];\n  allowMultiple?: boolean;\n  defaultOpen?: string[];\n  className?: string;\n}\n\nexport const SmoothAccordion: React.FC<SmoothAccordionProps> = ({\n  items,\n  allowMultiple = false,\n  defaultOpen = [],\n  className,\n}) => {\n  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);\n\n  const toggle = (id: string) => {\n    if (allowMultiple) {\n      setOpenIds((prev) =>\n        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]\n      );\n    } else {\n      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));\n    }\n  };\n\n  return (\n    <div className={cn('flex flex-col divide-y divide-[#1D1D1D] rounded-xl border border-[#1D1D1D] bg-[#0A0A0A] overflow-hidden', className)}>\n      {items.map((item) => {\n        const isOpen = openIds.includes(item.id);\n        return (\n          <div key={item.id} className=\"transition-colors\">\n            <button\n              onClick={() => toggle(item.id)}\n              className=\"flex w-full items-center justify-between p-4 text-left font-medium text-[#F5F5F5] hover:bg-[#101010] transition-colors focus-ring\"\n              aria-expanded={isOpen}\n            >\n              <div>\n                <div className=\"text-sm font-medium text-[#F5F5F5]\">{item.title}</div>\n                {item.subtitle && (\n                  <div className=\"text-xs text-[#6F6F6F] mt-0.5\">{item.subtitle}</div>\n                )}\n              </div>\n              <motion.div\n                animate={{ rotate: isOpen ? 180 : 0 }}\n                transition={motionTransitions.springSnappy}\n                className=\"text-[#6F6F6F] ml-2 shrink-0\"\n              >\n                <ChevronDown className=\"w-4 h-4\" />\n              </motion.div>\n            </button>\n\n            <AnimatePresence initial={false}>\n              {isOpen && (\n                <motion.div\n                  key=\"content\"\n                  initial={{ height: 0, opacity: 0 }}\n                  animate={{ height: 'auto', opacity: 1 }}\n                  exit={{ height: 0, opacity: 0 }}\n                  transition={motionTransitions.springGentle}\n                  className=\"overflow-hidden\"\n                >\n                  <div className=\"px-4 pb-4 pt-1 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed\">\n                    {item.content}\n                  </div>\n                </motion.div>\n              )}\n            </AnimatePresence>\n          </div>\n        );\n      })}\n    </div>\n  );\n};\n",
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
    "usageCode": "import { SpotlightCard } from \"@/components/ui/spotlight-card\";\n\nexport function Demo() {\n  return (\n    <SpotlightCard className=\"max-w-sm\">\n      <h3 className=\"text-base font-semibold text-white\">Edge Computing</h3>\n      <p className=\"text-sm text-neutral-400 mt-2\">\n        Deploy globally distributed stateful workloads in 35 regions.\n      </p>\n    </SpotlightCard>\n  );\n}",
    "sourceCode": "import React, { useRef } from 'react';\nimport { motion, useMotionTemplate, useMotionValue } from 'framer-motion';\nimport { cn } from '../../lib/utils';\n\nexport interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {\n  children: React.ReactNode;\n  spotlightColor?: string;\n  spotlightSize?: number;\n  className?: string;\n}\n\nexport const SpotlightCard: React.FC<SpotlightCardProps> = ({\n  children,\n  spotlightColor = 'rgba(56, 189, 248, 0.08)',\n  spotlightSize = 350,\n  className,\n  ...props\n}) => {\n  const mouseX = useMotionValue(-1000);\n  const mouseY = useMotionValue(-1000);\n  const cardRef = useRef<HTMLDivElement>(null);\n\n  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {\n    if (!cardRef.current) return;\n    const { left, top } = cardRef.current.getBoundingClientRect();\n    mouseX.set(e.clientX - left);\n    mouseY.set(e.clientY - top);\n  };\n\n  const backgroundGradient = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;\n  const borderGradient = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.18), transparent 80%)`;\n\n  return (\n    <div\n      ref={cardRef}\n      onMouseMove={handleMouseMove}\n      onMouseLeave={() => {\n        mouseX.set(-1000);\n        mouseY.set(-1000);\n      }}\n      className={cn(\n        'group relative rounded-xl border border-[#1D1D1D] bg-[#0A0A0A] p-6 transition-colors duration-300 hover:border-[#2A2A2A] overflow-hidden',\n        className\n      )}\n      {...props}\n    >\n      {/* Animated subtle dynamic border spotlight */}\n      <motion.div\n        className=\"pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100\"\n        style={{\n          background: borderGradient,\n        }}\n      />\n\n      {/* Internal ambient radial glow */}\n      <motion.div\n        className=\"pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100\"\n        style={{\n          background: backgroundGradient,\n        }}\n      />\n\n      {/* Content */}\n      <div className=\"relative z-10\">{children}</div>\n    </div>\n  );\n};\n",
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
  }
];
