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
    "sourceCode": "import React, { useState, useEffect, useMemo } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport {\n  Rocket,\n  Shield,\n  Zap,\n  Server,\n  AlertTriangle,\n  Radio,\n  Search,\n  ChevronDown,\n  Copy,\n  Check,\n  RotateCw,\n  Terminal,\n} from 'lucide-react';\nimport { cn, copyToClipboard } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport type ActivityEventType = 'deploy' | 'security' | 'api' | 'system' | 'error';\nexport type ActivityEventStatus = 'success' | 'warning' | 'error' | 'info';\n\nexport interface ActivityActor {\n  name: string;\n  avatar?: string;\n  email?: string;\n}\n\nexport interface ActivityEvent {\n  id: string;\n  type: ActivityEventType;\n  status: ActivityEventStatus;\n  title: string;\n  timestamp: string;\n  isoTimestamp?: string;\n  description?: string;\n  actor?: ActivityActor;\n  traceId?: string;\n  duration?: string;\n  payload?: Record<string, any>;\n}\n\nexport interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {\n  events: ActivityEvent[];\n  enableLiveSimulation?: boolean;\n  enableFilters?: boolean;\n  enableSearch?: boolean;\n  maxEntries?: number;\n  onEventReplay?: (event: ActivityEvent) => void;\n  className?: string;\n}\n\nexport const ActivityFeed: React.FC<ActivityFeedProps> = ({\n  events: initialEvents = [],\n  enableLiveSimulation = true,\n  enableFilters = true,\n  enableSearch = true,\n  maxEntries = 20,\n  onEventReplay,\n  className,\n  ...props\n}) => {\n  const [events, setEvents] = useState<ActivityEvent[]>(initialEvents);\n  const [selectedType, setSelectedType] = useState<string>('all');\n  const [searchQuery, setSearchQuery] = useState('');\n  const [isLiveStreaming, setIsLiveStreaming] = useState(false);\n  const [expandedPayloadIds, setExpandedPayloadIds] = useState<Set<string>>(new Set());\n  const [copiedTraceId, setCopiedTraceId] = useState<string | null>(null);\n\n  // Sync if initialEvents change\n  useEffect(() => {\n    setEvents(initialEvents);\n  }, [initialEvents]);\n\n  // Live simulation generator\n  useEffect(() => {\n    if (!isLiveStreaming) return;\n\n    const interval = setInterval(() => {\n      const mockTypes: ActivityEventType[] = ['deploy', 'api', 'security', 'system'];\n      const randomType = mockTypes[Math.floor(Math.random() * mockTypes.length)];\n      const randomId = `live-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;\n\n      let newEvent: ActivityEvent;\n      if (randomType === 'deploy') {\n        newEvent = {\n          id: randomId,\n          type: 'deploy',\n          status: 'success',\n          title: 'Vercel Edge function deployed',\n          timestamp: 'Just now',\n          description: 'Production branch merged into main. SSL cert auto-renewed.',\n          duration: '412ms',\n          traceId: `trc_${Math.random().toString(36).slice(2, 8)}`,\n          actor: { name: 'Bot Pipeline', email: 'ci@easyui.dev' },\n          payload: { commit: '7a29e1f', region: 'iad1', buildTimeMs: 1420 },\n        };\n      } else if (randomType === 'api') {\n        newEvent = {\n          id: randomId,\n          type: 'api',\n          status: 'success',\n          title: 'POST /v1/auth/session 200 OK',\n          timestamp: 'Just now',\n          description: 'JWT token rotation completed for client.',\n          duration: '18ms',\n          traceId: `trc_${Math.random().toString(36).slice(2, 8)}`,\n          actor: { name: 'User session' },\n          payload: { method: 'POST', status: 200, ip: '192.168.1.1' },\n        };\n      } else {\n        newEvent = {\n          id: randomId,\n          type: randomType,\n          status: randomType === 'security' ? 'warning' : 'info',\n          title: randomType === 'security' ? 'Rate limit throttle triggered' : 'Cache purged across edge',\n          timestamp: 'Just now',\n          description: randomType === 'security' ? 'IP exceeded 100 req/s bucket window.' : 'Global CDN stale cache invalidated.',\n          duration: '4ms',\n          traceId: `trc_${Math.random().toString(36).slice(2, 8)}`,\n          payload: { action: 'throttle', limit: 100, window: '60s' },\n        };\n      }\n\n      setEvents((prev) => [newEvent, ...prev.slice(0, maxEntries - 1)]);\n    }, 3500);\n\n    return () => clearInterval(interval);\n  }, [isLiveStreaming, maxEntries]);\n\n  const togglePayload = (id: string) => {\n    setExpandedPayloadIds((prev) => {\n      const next = new Set(prev);\n      if (next.has(id)) next.delete(id);\n      else next.add(id);\n      return next;\n    });\n  };\n\n  const handleCopyTrace = (e: React.MouseEvent, traceId: string) => {\n    e.stopPropagation();\n    copyToClipboard(traceId);\n    setCopiedTraceId(traceId);\n    setTimeout(() => setCopiedTraceId(null), 2000);\n  };\n\n  const getTypeIcon = (type: ActivityEventType) => {\n    switch (type) {\n      case 'deploy':\n        return <Rocket className=\"w-3.5 h-3.5 text-white\" />;\n      case 'security':\n        return <Shield className=\"w-3.5 h-3.5 text-amber-400\" />;\n      case 'api':\n        return <Zap className=\"w-3.5 h-3.5 text-sky-400\" />;\n      case 'system':\n        return <Server className=\"w-3.5 h-3.5 text-emerald-400\" />;\n      case 'error':\n        return <AlertTriangle className=\"w-3.5 h-3.5 text-rose-400\" />;\n      default:\n        return <Terminal className=\"w-3.5 h-3.5 text-white\" />;\n    }\n  };\n\n  const getStatusDot = (status: ActivityEventStatus) => {\n    switch (status) {\n      case 'success':\n        return 'bg-emerald-400';\n      case 'warning':\n        return 'bg-amber-400';\n      case 'error':\n        return 'bg-rose-400';\n      case 'info':\n      default:\n        return 'bg-sky-400';\n    }\n  };\n\n  const filteredEvents = useMemo(() => {\n    return events.filter((ev) => {\n      const matchType = selectedType === 'all' || ev.type === selectedType;\n      const matchSearch =\n        !searchQuery.trim() ||\n        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||\n        (ev.description && ev.description.toLowerCase().includes(searchQuery.toLowerCase())) ||\n        (ev.traceId && ev.traceId.toLowerCase().includes(searchQuery.toLowerCase())) ||\n        (ev.actor?.name && ev.actor.name.toLowerCase().includes(searchQuery.toLowerCase()));\n\n      return matchType && matchSearch;\n    });\n  }, [events, selectedType, searchQuery]);\n\n  const categories: Array<{ id: string; label: string; count: number }> = useMemo(() => {\n    const counts: Record<string, number> = { all: events.length };\n    events.forEach((e) => {\n      counts[e.type] = (counts[e.type] || 0) + 1;\n    });\n    return [\n      { id: 'all', label: 'All', count: counts.all || 0 },\n      { id: 'deploy', label: 'Deploy', count: counts.deploy || 0 },\n      { id: 'security', label: 'Security', count: counts.security || 0 },\n      { id: 'api', label: 'API', count: counts.api || 0 },\n      { id: 'system', label: 'System', count: counts.system || 0 },\n    ];\n  }, [events]);\n\n  return (\n    <div\n      role=\"region\"\n      aria-label=\"Activity and telemetry event feed\"\n      className={cn(\n        'w-full rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] p-3.5 sm:p-5 text-[#F5F5F5]',\n        className\n      )}\n      {...props}\n    >\n      {/* Feed Top Controls */}\n      <div className=\"flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-[#181818]\">\n        <div className=\"flex items-center gap-2\">\n          {enableSearch && (\n            <div className=\"relative flex-1 sm:w-56\">\n              <Search className=\"w-3.5 h-3.5 text-[#606060] absolute left-3 top-1/2 -translate-y-1/2\" />\n              <input\n                type=\"text\"\n                value={searchQuery}\n                onChange={(e) => setSearchQuery(e.target.value)}\n                placeholder=\"Search audit trace...\"\n                className=\"w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#0E0E0E] border border-[#202020] text-[#F5F5F5] placeholder-[#606060] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white\"\n              />\n            </div>\n          )}\n        </div>\n\n        {/* Live Simulation Switch */}\n        {enableLiveSimulation && (\n          <button\n            type=\"button\"\n            onClick={() => setIsLiveStreaming((prev) => !prev)}\n            className={cn(\n              'inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer',\n              isLiveStreaming\n                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'\n                : 'bg-[#0E0E0E] border-[#202020] text-[#737373] hover:text-white'\n            )}\n          >\n            <Radio\n              className={cn(\n                'w-3.5 h-3.5',\n                isLiveStreaming ? 'animate-pulse text-emerald-400' : 'text-[#606060]'\n              )}\n            />\n            <span>{isLiveStreaming ? 'Live Stream Active' : 'Start Live Stream'}</span>\n          </button>\n        )}\n      </div>\n\n      {/* Filter Category Tabs */}\n      {enableFilters && (\n        <div className=\"flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none\">\n          {categories.map((cat) => (\n            <button\n              key={cat.id}\n              type=\"button\"\n              onClick={() => setSelectedType(cat.id)}\n              className={cn(\n                'inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap',\n                selectedType === cat.id\n                  ? 'bg-[#1C1C1C] text-white border border-[#2C2C2C]'\n                  : 'bg-[#0E0E0E] text-[#737373] border border-[#161616] hover:text-[#A1A1A1] hover:bg-[#121212]'\n              )}\n            >\n              <span>{cat.label}</span>\n              <span className=\"text-[10px] font-mono opacity-60\">({cat.count})</span>\n            </button>\n          ))}\n        </div>\n      )}\n\n      {/* Events List with Framer Motion Layout & Entry Animations */}\n      <div className=\"space-y-2.5 max-h-[280px] sm:max-h-[320px] overflow-y-auto pr-1\">\n        {filteredEvents.length === 0 ? (\n          <div className=\"py-12 text-center text-xs text-[#737373] rounded-xl border border-[#141414] bg-[#080808]\">\n            No activity events recorded matching filters.\n          </div>\n        ) : (\n          <AnimatePresence initial={false}>\n            {filteredEvents.map((ev) => {\n              const isPayloadOpen = expandedPayloadIds.has(ev.id);\n\n              return (\n                <motion.div\n                  key={ev.id}\n                  layout\n                  initial={{ opacity: 0, y: -8, scale: 0.98 }}\n                  animate={{ opacity: 1, y: 0, scale: 1 }}\n                  exit={{ opacity: 0, scale: 0.95 }}\n                  transition={motionTransitions.springSnappy}\n                  className=\"rounded-xl border border-[#181818] bg-[#0D0D0D] hover:border-[#262626] transition-all overflow-hidden p-3.5\"\n                >\n                  {/* Event Main Row */}\n                  <div className=\"flex items-start justify-between gap-3\">\n                    <div className=\"flex items-start gap-3 min-w-0\">\n                      {/* Icon Circle */}\n                      <div className=\"w-8 h-8 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center shrink-0 mt-0.5\">\n                        {getTypeIcon(ev.type)}\n                      </div>\n\n                      <div className=\"min-w-0\">\n                        <div className=\"flex flex-wrap items-center gap-2 mb-0.5\">\n                          <span className=\"text-xs font-semibold text-white truncate\">\n                            {ev.title}\n                          </span>\n                          <span\n                            className={cn(\n                              'w-1.5 h-1.5 rounded-full inline-block shrink-0',\n                              getStatusDot(ev.status)\n                            )}\n                          />\n                        </div>\n\n                        {ev.description && (\n                          <p className=\"text-[11px] text-[#8E8E8E] line-clamp-1 mb-1.5\">\n                            {ev.description}\n                          </p>\n                        )}\n\n                        <div className=\"flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#6F6F6F]\">\n                          <span>{ev.timestamp}</span>\n                          {ev.duration && (\n                            <>\n                              <span>•</span>\n                              <span>{ev.duration}</span>\n                            </>\n                          )}\n                          {ev.actor && (\n                            <>\n                              <span>•</span>\n                              <span className=\"text-[#999999]\">{ev.actor.name}</span>\n                            </>\n                          )}\n                        </div>\n                      </div>\n                    </div>\n\n                    {/* Actions: Trace copy + Payload Expand + Replay */}\n                    <div className=\"flex items-center gap-1 shrink-0\">\n                      {ev.traceId && (\n                        <button\n                          type=\"button\"\n                          onClick={(e) => handleCopyTrace(e, ev.traceId!)}\n                          className=\"px-2 py-1 rounded bg-[#121212] hover:bg-[#1A1A1A] border border-[#202020] text-[10px] font-mono text-[#A1A1A1] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1\"\n                          title=\"Copy Trace ID\"\n                        >\n                          <span>{ev.traceId}</span>\n                          {copiedTraceId === ev.traceId ? (\n                            <Check className=\"w-3 h-3 text-white\" />\n                          ) : (\n                            <Copy className=\"w-3 h-3 text-[#606060]\" />\n                          )}\n                        </button>\n                      )}\n\n                      {onEventReplay && (\n                        <button\n                          type=\"button\"\n                          onClick={() => onEventReplay(ev)}\n                          className=\"p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#161616] transition-colors cursor-pointer\"\n                          title=\"Replay event\"\n                        >\n                          <RotateCw className=\"w-3.5 h-3.5\" />\n                        </button>\n                      )}\n\n                      {ev.payload && (\n                        <button\n                          type=\"button\"\n                          onClick={() => togglePayload(ev.id)}\n                          className=\"p-1 rounded-lg text-[#737373] hover:text-white hover:bg-[#161616] transition-colors cursor-pointer\"\n                          title=\"Toggle JSON payload\"\n                        >\n                          <motion.div\n                            animate={{ rotate: isPayloadOpen ? 180 : 0 }}\n                            transition={{ duration: 0.15 }}\n                          >\n                            <ChevronDown className=\"w-3.5 h-3.5\" />\n                          </motion.div>\n                        </button>\n                      )}\n                    </div>\n                  </div>\n\n                  {/* Expandable JSON Inspector */}\n                  <AnimatePresence>\n                    {isPayloadOpen && ev.payload && (\n                      <motion.div\n                        initial={{ opacity: 0, height: 0 }}\n                        animate={{ opacity: 1, height: 'auto' }}\n                        exit={{ opacity: 0, height: 0 }}\n                        transition={motionTransitions.springGentle}\n                        className=\"overflow-hidden\"\n                      >\n                        <div className=\"mt-3 pt-3 border-t border-[#1C1C1C]\">\n                          <div className=\"flex items-center justify-between mb-1 text-[10px] font-mono text-[#666666]\">\n                            <span>PAYLOAD SNAPSHOT (JSON)</span>\n                            <button\n                              type=\"button\"\n                              onClick={(e) =>\n                                handleCopyTrace(e, JSON.stringify(ev.payload, null, 2))\n                              }\n                              className=\"text-[#888888] hover:text-white flex items-center gap-1 cursor-pointer\"\n                            >\n                              <Copy className=\"w-3 h-3\" />\n                              <span>Copy JSON</span>\n                            </button>\n                          </div>\n                          <pre className=\"p-3 rounded-lg bg-[#050505] border border-[#161616] font-mono text-[11px] text-[#A1A1A1] overflow-x-auto leading-relaxed\">\n                            <code>{JSON.stringify(ev.payload, null, 2)}</code>\n                          </pre>\n                        </div>\n                      </motion.div>\n                    )}\n                  </AnimatePresence>\n                </motion.div>\n              );\n            })}\n          </AnimatePresence>\n        )}\n      </div>\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { useState } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface TabItem {\n  id: string;\n  label: string;\n  icon?: React.ReactNode;\n  content?: React.ReactNode;\n  badge?: string | number;\n}\n\nexport interface AnimatedTabsProps {\n  tabs: TabItem[];\n  defaultTab?: string;\n  activeTab?: string;\n  onChange?: (tabId: string) => void;\n  className?: string;\n  renderContent?: boolean;\n  layoutId?: string;\n}\n\nexport const AnimatedTabs: React.FC<AnimatedTabsProps> = ({\n  tabs,\n  defaultTab,\n  activeTab: controlledActiveTab,\n  onChange,\n  className,\n  renderContent = true,\n  layoutId: customLayoutId,\n}) => {\n  const [internalActiveTab, setInternalActiveTab] = useState<string>(defaultTab || tabs[0]?.id || '');\n  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;\n  const uniqueId = React.useId();\n  const indicatorLayoutId = customLayoutId || `active-tab-indicator-${uniqueId}`;\n\n  React.useEffect(() => {\n    if (defaultTab && controlledActiveTab === undefined) {\n      setInternalActiveTab(defaultTab);\n    }\n  }, [defaultTab, controlledActiveTab]);\n\n  const handleTabClick = (tabId: string) => {\n    if (controlledActiveTab === undefined) {\n      setInternalActiveTab(tabId);\n    }\n    onChange?.(tabId);\n  };\n\n  const currentTabObj = tabs.find((t) => t.id === activeTab);\n\n  return (\n    <div className={cn('flex flex-col gap-4', className)}>\n      <div className=\"flex items-center gap-1 p-1 rounded-lg bg-[#0E0E0E] border border-[#1D1D1D] self-start\">\n        {tabs.map((tab) => {\n          const isActive = activeTab === tab.id;\n          return (\n            <button\n              key={tab.id}\n              onClick={() => handleTabClick(tab.id)}\n              className={cn(\n                'relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors focus-ring select-none flex items-center gap-2',\n                isActive ? 'text-[#F5F5F5]' : 'text-[#6F6F6F] hover:text-[#A1A1A1]'\n              )}\n            >\n              {isActive && (\n                <motion.div\n                  layoutId={indicatorLayoutId}\n                  className=\"absolute inset-0 rounded-md bg-[#181818] border border-[#2A2A2A] shadow-sm\"\n                  transition={motionTransitions.springMorph}\n                />\n              )}\n              <span className=\"relative z-10 flex items-center gap-1.5\">\n                {tab.icon && <span className=\"text-[#A1A1A1]\">{tab.icon}</span>}\n                {tab.label}\n                {tab.badge && (\n                  <span className=\"px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#252525] text-[#A1A1A1]\">\n                    {tab.badge}\n                  </span>\n                )}\n              </span>\n            </button>\n          );\n        })}\n      </div>\n\n      {renderContent && (\n        <div className=\"relative min-h-[60px]\">\n          <AnimatePresence mode=\"wait\">\n            {currentTabObj?.content && (\n              <motion.div\n                key={activeTab}\n                initial={{ opacity: 0, y: 6 }}\n                animate={{ opacity: 1, y: 0 }}\n                exit={{ opacity: 0, y: -6 }}\n                transition={motionTransitions.springGentle}\n                className=\"text-sm text-[#A1A1A1]\"\n              >\n                {currentTabObj.content}\n              </motion.div>\n            )}\n          </AnimatePresence>\n        </div>\n      )}\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { forwardRef } from 'react';\nimport { motion, type HTMLMotionProps } from 'framer-motion';\nimport { Loader2 } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport type ButtonVariant =\n  | 'default'\n  | 'primary'\n  | 'secondary'\n  | 'outline'\n  | 'ghost'\n  | 'destructive'\n  | 'success'\n  | 'link'\n  | 'gradient';\n\nexport type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';\n\nexport interface ButtonProps\n  extends Omit<HTMLMotionProps<'button'>, 'children'> {\n  /** Visual presentation style */\n  variant?: ButtonVariant;\n  /** Dimension scale */\n  size?: ButtonSize;\n  /** Loading state displaying an animated spinner */\n  isLoading?: boolean;\n  /** Text or element displayed during loading */\n  loadingText?: string;\n  /** Icon placed before the button children */\n  leftIcon?: React.ReactNode;\n  /** Icon placed after the button children */\n  rightIcon?: React.ReactNode;\n  /** Expand button to fill 100% of container width */\n  fullWidth?: boolean;\n  /** Button content */\n  children?: React.ReactNode;\n}\n\nconst variantStyles: Record<ButtonVariant, string> = {\n  default:\n    'bg-[#F5F5F5] text-[#050505] hover:bg-white shadow-[0_0_20px_-3px_rgba(255,255,255,0.15)] border border-transparent font-medium',\n  primary:\n    'bg-[#F5F5F5] text-[#050505] hover:bg-white shadow-[0_0_20px_-3px_rgba(255,255,255,0.15)] border border-transparent font-medium',\n  secondary:\n    'bg-[#151515] border border-[#1D1D1D] text-[#F5F5F5] hover:bg-[#1A1A1A] hover:border-[#2A2A2A]',\n  outline:\n    'bg-transparent border border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#101010] hover:border-[#F5F5F5]/30',\n  ghost:\n    'bg-transparent text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#101010] border border-transparent',\n  destructive:\n    'bg-[#1A0A0A] border border-[#3A1414] text-[#FF7A7A] hover:bg-[#260E0E] hover:border-[#521C1C]',\n  success:\n    'bg-[#0A160F] border border-[#143320] text-[#6EE7B7] hover:bg-[#0F2218] hover:border-[#1E4D30]',\n  link:\n    'bg-transparent text-[#F5F5F5] underline-offset-4 hover:underline p-0 h-auto border-0 focus-ring shadow-none inline-flex',\n  gradient:\n    'bg-[#121212] border border-[#282828] text-[#F5F5F5] hover:border-[#383838] relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.04)]',\n};\n\nconst sizeStyles: Record<ButtonSize, string> = {\n  sm: 'h-8 px-3 text-xs rounded-md gap-1.5',\n  md: 'h-10 px-4.5 text-sm rounded-lg gap-2',\n  lg: 'h-12 px-6 text-base rounded-lg gap-2.5',\n  icon: 'h-10 w-10 p-0 rounded-lg justify-center shrink-0',\n};\n\nexport const Button = forwardRef<HTMLButtonElement, ButtonProps>(\n  (\n    {\n      variant = 'primary',\n      size = 'md',\n      isLoading = false,\n      loadingText,\n      leftIcon,\n      rightIcon,\n      fullWidth = false,\n      disabled,\n      className,\n      children,\n      type = 'button',\n      ...props\n    },\n    ref\n  ) => {\n    const isDisabled = disabled || isLoading;\n\n    return (\n      <motion.button\n        ref={ref}\n        type={type}\n        disabled={isDisabled}\n        whileTap={isDisabled ? undefined : { scale: 0.97 }}\n        transition={motionTransitions.springSnappy}\n        aria-busy={isLoading}\n        className={cn(\n          'relative inline-flex items-center justify-center font-medium select-none focus-ring transition-colors duration-150',\n          variantStyles[variant],\n          variant !== 'link' && sizeStyles[size],\n          fullWidth && 'w-full',\n          isDisabled && 'opacity-30 cursor-not-allowed pointer-events-none',\n          className\n        )}\n        {...props}\n      >\n        {/* Subtle shimmer gradient for gradient variant */}\n        {variant === 'gradient' && (\n          <div\n            className=\"absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none\"\n            aria-hidden=\"true\"\n          />\n        )}\n\n        {/* Loading Spinner or Left Icon */}\n        {isLoading ? (\n          <Loader2 className={cn('animate-spin shrink-0', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />\n        ) : (\n          leftIcon && <span className=\"shrink-0\">{leftIcon}</span>\n        )}\n\n        {/* Button Content */}\n        {isLoading && loadingText ? (\n          <span>{loadingText}</span>\n        ) : (\n          children && <span>{children}</span>\n        )}\n\n        {/* Right Icon */}\n        {!isLoading && rightIcon && <span className=\"shrink-0\">{rightIcon}</span>}\n      </motion.button>\n    );\n  }\n);\n\nButton.displayName = 'Button';\n",
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
    "sourceCode": "import React, { useState, useMemo, useId } from 'react';\nimport { motion } from 'framer-motion';\nimport { Copy, Check, Terminal, SlidersHorizontal, Sparkles } from 'lucide-react';\nimport { cn, copyToClipboard } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface SnippetParameter {\n  id: string;\n  label: string;\n  type: 'boolean' | 'select' | 'text';\n  defaultValue: any;\n  options?: string[];\n}\n\nexport interface SnippetItem {\n  language: string;\n  label: string;\n  filename?: string;\n  code: string | ((params: Record<string, any>) => string);\n  highlightLines?: number[];\n}\n\nexport interface CodeSnippetDeckProps extends React.HTMLAttributes<HTMLDivElement> {\n  snippets: SnippetItem[];\n  parameters?: SnippetParameter[];\n  defaultLanguage?: string;\n  showLineNumbers?: boolean;\n  showWindowBar?: boolean;\n  className?: string;\n}\n\nexport const CodeSnippetDeck: React.FC<CodeSnippetDeckProps> = ({\n  snippets = [],\n  parameters = [],\n  defaultLanguage,\n  showLineNumbers = true,\n  showWindowBar = true,\n  className,\n  ...props\n}) => {\n  const [activeLang, setActiveLang] = useState<string>(\n    defaultLanguage || snippets[0]?.language || 'typescript'\n  );\n  const [copied, setCopied] = useState(false);\n  const [showConfig, setShowConfig] = useState(false);\n  const deckId = useId();\n\n  // Parameter values state\n  const [paramValues, setParamValues] = useState<Record<string, any>>(() => {\n    const initial: Record<string, any> = {};\n    parameters.forEach((p) => {\n      initial[p.id] = p.defaultValue;\n    });\n    return initial;\n  });\n\n  const activeSnippet = useMemo(() => {\n    return snippets.find((s) => s.language === activeLang) || snippets[0];\n  }, [snippets, activeLang]);\n\n  // Compute final code string\n  const resolvedCode = useMemo(() => {\n    if (!activeSnippet) return '';\n    if (typeof activeSnippet.code === 'function') {\n      return activeSnippet.code(paramValues);\n    }\n    return activeSnippet.code;\n  }, [activeSnippet, paramValues]);\n\n  const handleCopy = () => {\n    copyToClipboard(resolvedCode);\n    setCopied(true);\n    setTimeout(() => setCopied(false), 2000);\n  };\n\n  const handleParamChange = (id: string, value: any) => {\n    setParamValues((prev) => ({ ...prev, [id]: value }));\n  };\n\n  const codeLines = useMemo(() => {\n    return resolvedCode.split('\\n');\n  }, [resolvedCode]);\n\n  return (\n    <div\n      role=\"region\"\n      aria-label=\"Multi-runtime code snippet deck\"\n      className={cn(\n        'w-full rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] overflow-hidden text-[#F5F5F5] shadow-2xl',\n        className\n      )}\n      {...props}\n    >\n      {/* Top Window Bar (Traffic Dots + Language Tabs + Copy Button) */}\n      <div className=\"flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#080808] border-b border-[#161616]\">\n        {/* Left: Window Dots + File Name */}\n        <div className=\"flex items-center gap-3\">\n          {showWindowBar && (\n            <div className=\"flex items-center gap-1.5\">\n              <span className=\"w-2.5 h-2.5 rounded-full bg-[#2A2A2A]\" />\n              <span className=\"w-2.5 h-2.5 rounded-full bg-[#222222]\" />\n              <span className=\"w-2.5 h-2.5 rounded-full bg-[#1C1C1C]\" />\n            </div>\n          )}\n\n          {activeSnippet?.filename && (\n            <div className=\"flex items-center gap-1.5 text-xs font-mono text-[#808080]\">\n              <Terminal className=\"w-3.5 h-3.5 text-[#555555]\" />\n              <span>{activeSnippet.filename}</span>\n            </div>\n          )}\n        </div>\n\n        {/* Center: Language Tabs */}\n        <div className=\"flex items-center p-1 bg-[#121212] rounded-xl border border-[#1E1E1E] overflow-x-auto scrollbar-none\">\n          {snippets.map((snip) => {\n            const isSelected = activeLang === snip.language;\n            return (\n              <button\n                key={snip.language}\n                type=\"button\"\n                onClick={() => setActiveLang(snip.language)}\n                className={cn(\n                  'relative py-1 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer',\n                  isSelected ? 'text-white' : 'text-[#737373] hover:text-[#A1A1A1]'\n                )}\n              >\n                {isSelected && (\n                  <motion.div\n                    layoutId={`codeDeckTab-${deckId}`}\n                    className=\"absolute inset-0 bg-[#222222] border border-[#333333] rounded-lg -z-10\"\n                    transition={motionTransitions.springSnappy}\n                  />\n                )}\n                <span>{snip.label}</span>\n              </button>\n            );\n          })}\n        </div>\n\n        {/* Right: Params Toggle & Copy Code Button */}\n        <div className=\"flex items-center gap-2\">\n          {parameters.length > 0 && (\n            <button\n              type=\"button\"\n              onClick={() => setShowConfig((prev) => !prev)}\n              className={cn(\n                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer',\n                showConfig\n                  ? 'bg-white text-black border-white'\n                  : 'bg-[#121212] text-[#808080] border-[#222222] hover:text-white'\n              )}\n              title=\"Customize snippet parameters\"\n            >\n              <SlidersHorizontal className=\"w-3.5 h-3.5\" />\n              <span className=\"hidden sm:inline\">Params</span>\n            </button>\n          )}\n\n          <button\n            type=\"button\"\n            onClick={handleCopy}\n            className=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141414] hover:bg-[#1E1E1E] border border-[#242424] text-xs font-mono text-[#D4D4D4] hover:text-white transition-colors cursor-pointer\"\n            title=\"Copy code\"\n          >\n            {copied ? (\n              <>\n                <Check className=\"w-3.5 h-3.5 text-white\" />\n                <span>Copied</span>\n              </>\n            ) : (\n              <>\n                <Copy className=\"w-3.5 h-3.5\" />\n                <span>Copy</span>\n              </>\n            )}\n          </button>\n        </div>\n      </div>\n\n      {/* Interactive Parameter Tuning Drawer (Dynamic Code Generation) */}\n      {showConfig && parameters.length > 0 && (\n        <div className=\"p-3.5 bg-[#0E0E0E] border-b border-[#181818] flex flex-wrap items-center gap-4 text-xs\">\n          <div className=\"flex items-center gap-1.5 text-[#888888] font-mono text-[11px] uppercase tracking-wider\">\n            <Sparkles className=\"w-3 h-3 text-white\" />\n            <span>Interactive Variables:</span>\n          </div>\n\n          {parameters.map((param) => {\n            if (param.type === 'boolean') {\n              const checked = !!paramValues[param.id];\n              return (\n                <label\n                  key={param.id}\n                  className=\"flex items-center gap-2 cursor-pointer select-none text-[#CCCCCC] hover:text-white\"\n                >\n                  <input\n                    type=\"checkbox\"\n                    checked={checked}\n                    onChange={(e) => handleParamChange(param.id, e.target.checked)}\n                    className=\"rounded bg-[#1A1A1A] border-[#333333] text-white focus:ring-0 cursor-pointer\"\n                  />\n                  <span>{param.label}</span>\n                </label>\n              );\n            }\n\n            if (param.type === 'select') {\n              return (\n                <div key={param.id} className=\"flex items-center gap-2\">\n                  <span className=\"text-[#888888]\">{param.label}:</span>\n                  <select\n                    value={paramValues[param.id]}\n                    onChange={(e) => handleParamChange(param.id, e.target.value)}\n                    className=\"px-2 py-1 rounded bg-[#141414] border border-[#282828] text-xs text-white focus-visible:outline-none cursor-pointer\"\n                  >\n                    {param.options?.map((opt) => (\n                      <option key={opt} value={opt}>\n                        {opt}\n                      </option>\n                    ))}\n                  </select>\n                </div>\n              );\n            }\n\n            if (param.type === 'text') {\n              return (\n                <div key={param.id} className=\"flex items-center gap-2\">\n                  <span className=\"text-[#888888]\">{param.label}:</span>\n                  <input\n                    type=\"text\"\n                    value={paramValues[param.id] || ''}\n                    onChange={(e) => handleParamChange(param.id, e.target.value)}\n                    className=\"px-2 py-1 rounded bg-[#141414] border border-[#282828] text-xs text-white w-32 focus-visible:outline-none\"\n                  />\n                </div>\n              );\n            }\n\n            return null;\n          })}\n        </div>\n      )}\n\n      {/* Code Viewer Surface */}\n      <div className=\"p-3.5 sm:p-4 bg-[#050505] overflow-x-auto font-mono text-xs leading-relaxed max-h-[260px] sm:max-h-[300px] overflow-y-auto\">\n        <pre className=\"grid\">\n          {codeLines.map((line, idx) => {\n            const lineNum = idx + 1;\n            const isHighlighted = activeSnippet?.highlightLines?.includes(lineNum);\n\n            return (\n              <div\n                key={idx}\n                className={cn(\n                  'flex items-start py-0.5 px-2 -mx-2 rounded transition-colors',\n                  isHighlighted ? 'bg-white/[0.07] border-l-2 border-white text-white' : 'text-[#CCCCCC]'\n                )}\n              >\n                {showLineNumbers && (\n                  <span className=\"w-8 select-none text-[#505050] text-right pr-4 shrink-0\">\n                    {lineNum}\n                  </span>\n                )}\n                <span className=\"flex-1 whitespace-pre\">{line || ' '}</span>\n              </div>\n            );\n          })}\n        </pre>\n      </div>\n\n      {/* Footer Info Bar */}\n      <div className=\"px-4 py-2.5 bg-[#080808] border-t border-[#141414] flex items-center justify-between text-[11px] font-mono text-[#606060]\">\n        <span>Runtime: {activeSnippet?.label}</span>\n        <span>{codeLines.length} lines</span>\n      </div>\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { useState, useEffect, useMemo } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { Search, Sparkles, Layout, BookOpen, Terminal, CornerDownLeft, Cpu, GitPullRequest, Sliders } from 'lucide-react';\nimport { GithubIcon } from '../icons/GithubIcon';\nimport { cn, copyToClipboard } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\nimport { GITHUB_URL } from '../../lib/constants';\nimport { EASY_COMPONENTS } from '../registry/components-data';\n\nexport interface CommandItem {\n  id: string;\n  title: string;\n  category: 'Components' | 'Documentation' | 'Actions' | 'Navigation';\n  icon: React.ReactNode;\n  shortcut?: string;\n  onSelect: () => void;\n}\n\nexport interface CommandMenuProps {\n  isOpen: boolean;\n  onClose: () => void;\n  onSelectComponent?: (id: string) => void;\n  onNavigateDocs?: (topicId?: string) => void;\n}\n\nexport const CommandMenu: React.FC<CommandMenuProps> = ({\n  isOpen,\n  onClose,\n  onSelectComponent,\n  onNavigateDocs,\n}) => {\n  const [query, setQuery] = useState('');\n  const [selectedIndex, setSelectedIndex] = useState(0);\n\n  const commandItems: CommandItem[] = useMemo(() => {\n    // Dynamic component entries derived from generated catalog\n    const componentEntries: CommandItem[] = EASY_COMPONENTS.map((comp) => ({\n      id: comp.id,\n      title: comp.name,\n      category: 'Components',\n      icon: comp.category === 'Motion' ? <Sparkles className=\"w-4 h-4 text-[#D4D4D4]\" /> : <Layout className=\"w-4 h-4 text-[#D4D4D4]\" />,\n      shortcut: 'C',\n      onSelect: () => {\n        onSelectComponent?.(comp.id);\n        onClose();\n      },\n    }));\n\n    const docEntries: CommandItem[] = [\n      {\n        id: 'doc-intro',\n        title: 'Docs: Introduction & Vision',\n        category: 'Documentation',\n        icon: <BookOpen className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('introduction');\n          onClose();\n        },\n      },\n      {\n        id: 'doc-quickstart',\n        title: 'Docs: Quick Start & shadcn CLI',\n        category: 'Documentation',\n        icon: <Terminal className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('quick-start');\n          onClose();\n        },\n      },\n      {\n        id: 'doc-architecture',\n        title: 'Docs: Automatic Structure & Registry Engine',\n        category: 'Documentation',\n        icon: <Cpu className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('architecture');\n          onClose();\n        },\n      },\n      {\n        id: 'doc-collaboration',\n        title: 'Docs: How to Collaborate & Add Components',\n        category: 'Documentation',\n        icon: <GitPullRequest className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('collaboration');\n          onClose();\n        },\n      },\n      {\n        id: 'doc-motion',\n        title: 'Docs: Motion Tokens & Physics Curves',\n        category: 'Documentation',\n        icon: <Sliders className=\"w-4 h-4 text-[#ECECEC]\" />,\n        shortcut: 'D',\n        onSelect: () => {\n          onNavigateDocs?.('motion');\n          onClose();\n        },\n      },\n    ];\n\n    const actionEntries: CommandItem[] = [\n      {\n        id: 'cli-add',\n        title: 'Copy CLI Add Command',\n        category: 'Actions',\n        icon: <Terminal className=\"w-4 h-4 text-[#A1A1A1]\" />,\n        shortcut: '⌘C',\n        onSelect: () => {\n          copyToClipboard('npx shadcn@latest add Surajmaurya1/easyui/magnetic-button');\n          onClose();\n        },\n      },\n      {\n        id: 'github-repo',\n        title: 'View GitHub Repository',\n        category: 'Navigation',\n        icon: <GithubIcon className=\"w-4 h-4 text-[#A1A1A1]\" />,\n        shortcut: 'G',\n        onSelect: () => {\n          window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');\n          onClose();\n        },\n      },\n    ];\n\n    return [...componentEntries, ...docEntries, ...actionEntries];\n  }, [onSelectComponent, onNavigateDocs, onClose]);\n\n  const filteredItems = useMemo(() => {\n    return commandItems.filter(\n      (item) =>\n        item.title.toLowerCase().includes(query.toLowerCase()) ||\n        item.category.toLowerCase().includes(query.toLowerCase())\n    );\n  }, [commandItems, query]);\n\n  useEffect(() => {\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {\n        e.preventDefault();\n        if (isOpen) {\n          onClose();\n        }\n      }\n      if (!isOpen) return;\n\n      if (e.key === 'Escape') {\n        onClose();\n      } else if (e.key === 'ArrowDown') {\n        e.preventDefault();\n        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));\n      } else if (e.key === 'ArrowUp') {\n        e.preventDefault();\n        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));\n      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {\n        e.preventDefault();\n        filteredItems[selectedIndex].onSelect();\n      }\n    };\n\n    window.addEventListener('keydown', handleKeyDown);\n    return () => window.removeEventListener('keydown', handleKeyDown);\n  }, [isOpen, filteredItems, selectedIndex, onClose]);\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div\n          className=\"fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6\"\n          role=\"dialog\"\n          aria-modal=\"true\"\n          aria-label=\"Command palette\"\n        >\n          {/* Backdrop */}\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            onClick={onClose}\n            className=\"fixed inset-0 bg-black/75 backdrop-blur-sm\"\n          />\n\n          {/* Palette Container */}\n          <motion.div\n            initial={{ opacity: 0, scale: 0.97, y: -8 }}\n            animate={{ opacity: 1, scale: 1, y: 0 }}\n            exit={{ opacity: 0, scale: 0.97, y: -8 }}\n            transition={motionTransitions.springSnappy}\n            className=\"relative w-full max-w-xl rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10\"\n          >\n            {/* Search Input Bar */}\n            <div className=\"flex items-center px-4 py-3 border-b border-[#161616]\">\n              <Search className=\"w-4 h-4 text-[#606060] mr-2.5 shrink-0\" />\n              <input\n                autoFocus\n                type=\"text\"\n                value={query}\n                onChange={(e) => {\n                  setQuery(e.target.value);\n                  setSelectedIndex(0);\n                }}\n                placeholder=\"Type a command or search components, docs...\"\n                className=\"w-full bg-transparent text-xs text-[#F5F5F5] placeholder-[#606060] focus:outline-none\"\n              />\n              <span className=\"text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#121212] border border-[#1E1E1E] text-[#606060]\">\n                ESC\n              </span>\n            </div>\n\n            {/* Results List */}\n            <div className=\"max-h-80 overflow-y-auto p-1.5\" role=\"listbox\">\n              {filteredItems.length === 0 ? (\n                <div className=\"py-8 text-center text-xs text-[#606060]\">\n                  No commands or documentation matching \"{query}\"\n                </div>\n              ) : (\n                <div className=\"space-y-0.5\">\n                  {filteredItems.map((item, idx) => {\n                    const isSelected = idx === selectedIndex;\n                    return (\n                      <button\n                        key={item.id}\n                        onClick={item.onSelect}\n                        onMouseEnter={() => setSelectedIndex(idx)}\n                        role=\"option\"\n                        aria-selected={isSelected}\n                        className={cn(\n                          'flex w-full items-center justify-between px-3 py-2 rounded-md text-xs transition-colors text-left',\n                          isSelected\n                            ? 'bg-[#161616] text-[#F5F5F5]'\n                            : 'text-[#808080] hover:bg-[#101010]'\n                        )}\n                      >\n                        <div className=\"flex items-center gap-2.5\">\n                          {item.icon}\n                          <span className=\"font-normal\">{item.title}</span>\n                          <span className=\"text-[10px] text-[#555555] ml-1\">\n                            {item.category}\n                          </span>\n                        </div>\n                        <div className=\"flex items-center gap-2\">\n                          {isSelected && (\n                            <CornerDownLeft className=\"w-3 h-3 text-white\" />\n                          )}\n                          {item.shortcut && (\n                            <span className=\"text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1A1A1A] text-[#606060]\">\n                              {item.shortcut}\n                            </span>\n                          )}\n                        </div>\n                      </button>\n                    );\n                  })}\n                </div>\n              )}\n            </div>\n\n            {/* Footer status */}\n            <div className=\"flex items-center justify-between px-4 py-2 bg-[#080808] border-t border-[#141414] text-[11px] text-[#555555]\">\n              <div className=\"flex items-center gap-3\">\n                <span className=\"flex items-center gap-1\">\n                  <span className=\"font-mono bg-[#121212] px-1 rounded text-[10px]\">↑↓</span> navigate\n                </span>\n                <span className=\"flex items-center gap-1\">\n                  <span className=\"font-mono bg-[#121212] px-1 rounded text-[10px]\">↵</span> select\n                </span>\n              </div>\n              <span>EasyUI</span>\n            </div>\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n};\n",
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
    "createdAt": "2026-08-08",
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
    "createdAt": "2026-08-02",
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
    "sourceCode": "import React, { useState, useId } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { ChevronDown, Plus, Minus, Search, HelpCircle } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface FAQItem {\n  id: string;\n  question: string;\n  answer: React.ReactNode;\n  category?: string;\n  badge?: string;\n  icon?: React.ReactNode;\n}\n\nexport interface FAQProps {\n  /** List of FAQ items */\n  items: FAQItem[];\n  /** Allow multiple items to be expanded simultaneously */\n  allowMultiple?: boolean;\n  /** Initial open item IDs (uncontrolled) */\n  defaultOpen?: string[] | string;\n  /** Explicit open item IDs (controlled) */\n  openIds?: string[];\n  /** Callback fired when open items change */\n  onOpenChange?: (ids: string[]) => void;\n  /** Visual indicator icon style: chevron or plus-minus */\n  iconStyle?: 'chevron' | 'plus-minus' | 'custom';\n  /** Custom open/closed icon renderer */\n  renderIcon?: (isOpen: boolean) => React.ReactNode;\n  /** Enable search filter bar */\n  searchable?: boolean;\n  /** Placeholder text for search bar */\n  searchPlaceholder?: string;\n  /** Enable category filter tabs */\n  showCategories?: boolean;\n  /** Card visual layout presentation: single card container or separated individual cards */\n  variant?: 'unified' | 'separated';\n  /** Additional container styling */\n  className?: string;\n}\n\nexport const FAQ: React.FC<FAQProps> = ({\n  items = [],\n  allowMultiple = false,\n  defaultOpen,\n  openIds: controlledOpenIds,\n  onOpenChange,\n  iconStyle = 'chevron',\n  renderIcon,\n  searchable = false,\n  searchPlaceholder = 'Search questions...',\n  showCategories = false,\n  variant = 'unified',\n  className,\n}) => {\n  const defaultInitial = defaultOpen\n    ? Array.isArray(defaultOpen)\n      ? defaultOpen\n      : [defaultOpen]\n    : [];\n\n  const [internalOpenIds, setInternalOpenIds] = useState<string[]>(defaultInitial);\n  const [searchQuery, setSearchQuery] = useState('');\n  const [selectedCategory, setSelectedCategory] = useState<string>('All');\n  const baseId = useId();\n\n  const isControlled = controlledOpenIds !== undefined;\n  const activeOpenIds = isControlled ? controlledOpenIds : internalOpenIds;\n\n  // Extract unique categories if requested\n  const categories = React.useMemo(() => {\n    if (!showCategories) return [];\n    const cats = new Set<string>();\n    items.forEach((item) => {\n      if (item.category) cats.add(item.category);\n    });\n    return cats.size > 0 ? ['All', ...Array.from(cats)] : [];\n  }, [items, showCategories]);\n\n  // Filter items based on search and category\n  const filteredItems = React.useMemo(() => {\n    return items.filter((item) => {\n      const matchCategory =\n        selectedCategory === 'All' || item.category === selectedCategory;\n      const matchSearch =\n        !searchQuery.trim() ||\n        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||\n        (typeof item.answer === 'string' &&\n          item.answer.toLowerCase().includes(searchQuery.toLowerCase()));\n      return matchCategory && matchSearch;\n    });\n  }, [items, selectedCategory, searchQuery]);\n\n  const toggleItem = (id: string) => {\n    let nextIds: string[];\n    if (allowMultiple) {\n      nextIds = activeOpenIds.includes(id)\n        ? activeOpenIds.filter((item) => item !== id)\n        : [...activeOpenIds, id];\n    } else {\n      nextIds = activeOpenIds.includes(id) ? [] : [id];\n    }\n\n    if (!isControlled) {\n      setInternalOpenIds(nextIds);\n    }\n    if (onOpenChange) {\n      onOpenChange(nextIds);\n    }\n  };\n\n  const renderItemIndicator = (isOpen: boolean) => {\n    if (renderIcon) {\n      return renderIcon(isOpen);\n    }\n\n    if (iconStyle === 'plus-minus') {\n      return (\n        <motion.div\n          animate={{ rotate: isOpen ? 180 : 0 }}\n          transition={motionTransitions.springSnappy}\n          className=\"text-[#6F6F6F] group-hover:text-[#F5F5F5] transition-colors shrink-0\"\n        >\n          {isOpen ? <Minus className=\"w-4 h-4\" /> : <Plus className=\"w-4 h-4\" />}\n        </motion.div>\n      );\n    }\n\n    return (\n      <motion.div\n        animate={{ rotate: isOpen ? 180 : 0 }}\n        transition={motionTransitions.springSnappy}\n        className=\"text-[#6F6F6F] group-hover:text-[#F5F5F5] transition-colors shrink-0\"\n      >\n        <ChevronDown className=\"w-4 h-4\" />\n      </motion.div>\n    );\n  };\n\n  return (\n    <div className={cn('w-full max-w-3xl mx-auto space-y-4', className)}>\n      {/* Optional Search Bar */}\n      {searchable && (\n        <div className=\"relative\">\n          <Search className=\"w-4 h-4 text-[#6F6F6F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none\" />\n          <input\n            type=\"text\"\n            value={searchQuery}\n            onChange={(e) => setSearchQuery(e.target.value)}\n            placeholder={searchPlaceholder}\n            className=\"w-full h-10 pl-10 pr-4 text-xs text-[#F5F5F5] placeholder:text-[#6F6F6F] bg-[#0A0A0A] border border-[#1D1D1D] rounded-xl focus:border-[#2A2A2A] focus:bg-[#111111] focus:outline-none focus-ring transition-colors\"\n          />\n        </div>\n      )}\n\n      {/* Optional Category Filter Pills */}\n      {showCategories && categories.length > 1 && (\n        <div className=\"flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none\">\n          {categories.map((cat) => (\n            <button\n              key={cat}\n              type=\"button\"\n              onClick={() => setSelectedCategory(cat)}\n              className={cn(\n                'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus-ring',\n                selectedCategory === cat\n                  ? 'bg-[#181818] text-[#F5F5F5] border border-[#282828]'\n                  : 'text-[#808080] hover:text-[#F5F5F5] hover:bg-[#101010]'\n              )}\n            >\n              {cat}\n            </button>\n          ))}\n        </div>\n      )}\n\n      {/* FAQ Items List */}\n      {filteredItems.length === 0 ? (\n        <div className=\"p-8 text-center rounded-xl border border-[#1D1D1D] bg-[#0A0A0A]\">\n          <HelpCircle className=\"w-6 h-6 text-[#6F6F6F] mx-auto mb-2 opacity-60\" />\n          <p className=\"text-xs text-[#808080]\">No matching questions found.</p>\n        </div>\n      ) : variant === 'separated' ? (\n        /* Separated Cards Mode */\n        <div className=\"space-y-2.5\">\n          {filteredItems.map((item) => {\n            const isOpen = activeOpenIds.includes(item.id);\n            const contentId = `${baseId}-content-${item.id}`;\n            const headerId = `${baseId}-header-${item.id}`;\n\n            return (\n              <div\n                key={item.id}\n                className={cn(\n                  'rounded-xl border transition-all duration-200 overflow-hidden',\n                  isOpen\n                    ? 'border-[#2A2A2A] bg-[#0C0C0C] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'\n                    : 'border-[#1D1D1D] bg-[#0A0A0A] hover:border-[#262626]'\n                )}\n              >\n                <button\n                  id={headerId}\n                  type=\"button\"\n                  onClick={() => toggleItem(item.id)}\n                  aria-expanded={isOpen}\n                  aria-controls={contentId}\n                  className=\"group flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors focus-ring\"\n                >\n                  <div className=\"flex items-center gap-3 pr-4\">\n                    {item.icon && (\n                      <span className=\"text-[#808080] group-hover:text-[#F5F5F5] transition-colors shrink-0\">\n                        {item.icon}\n                      </span>\n                    )}\n                    <div>\n                      <div className=\"text-xs sm:text-sm font-medium text-[#F5F5F5] group-hover:text-white transition-colors\">\n                        {item.question}\n                      </div>\n                      {item.badge && (\n                        <span className=\"inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[#1A1A1A] border border-[#2A2A2A] text-[#A1A1A1]\">\n                          {item.badge}\n                        </span>\n                      )}\n                    </div>\n                  </div>\n                  {renderItemIndicator(isOpen)}\n                </button>\n\n                <AnimatePresence initial={false}>\n                  {isOpen && (\n                    <motion.div\n                      id={contentId}\n                      role=\"region\"\n                      aria-labelledby={headerId}\n                      initial={{ height: 0, opacity: 0 }}\n                      animate={{ height: 'auto', opacity: 1 }}\n                      exit={{ height: 0, opacity: 0 }}\n                      transition={motionTransitions.springGentle}\n                      className=\"overflow-hidden\"\n                    >\n                      <div className=\"px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed border-t border-[#161616]/60 pt-3\">\n                        {item.answer}\n                      </div>\n                    </motion.div>\n                  )}\n                </AnimatePresence>\n              </div>\n            );\n          })}\n        </div>\n      ) : (\n        /* Unified Accordion Card Mode */\n        <div className=\"flex flex-col divide-y divide-[#1D1D1D] rounded-xl border border-[#1D1D1D] bg-[#0A0A0A] overflow-hidden\">\n          {filteredItems.map((item) => {\n            const isOpen = activeOpenIds.includes(item.id);\n            const contentId = `${baseId}-content-${item.id}`;\n            const headerId = `${baseId}-header-${item.id}`;\n\n            return (\n              <div key={item.id} className=\"transition-colors\">\n                <button\n                  id={headerId}\n                  type=\"button\"\n                  onClick={() => toggleItem(item.id)}\n                  aria-expanded={isOpen}\n                  aria-controls={contentId}\n                  className=\"group flex w-full items-center justify-between p-4 sm:p-5 text-left text-[#F5F5F5] hover:bg-[#101010] transition-colors focus-ring\"\n                >\n                  <div className=\"flex items-center gap-3 pr-4\">\n                    {item.icon && (\n                      <span className=\"text-[#808080] group-hover:text-[#F5F5F5] transition-colors shrink-0\">\n                        {item.icon}\n                      </span>\n                    )}\n                    <div>\n                      <div className=\"text-xs sm:text-sm font-medium text-[#F5F5F5] group-hover:text-white transition-colors\">\n                        {item.question}\n                      </div>\n                      {item.badge && (\n                        <span className=\"inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[#1A1A1A] border border-[#2A2A2A] text-[#A1A1A1]\">\n                          {item.badge}\n                        </span>\n                      )}\n                    </div>\n                  </div>\n                  {renderItemIndicator(isOpen)}\n                </button>\n\n                <AnimatePresence initial={false}>\n                  {isOpen && (\n                    <motion.div\n                      id={contentId}\n                      role=\"region\"\n                      aria-labelledby={headerId}\n                      initial={{ height: 0, opacity: 0 }}\n                      animate={{ height: 'auto', opacity: 1 }}\n                      exit={{ height: 0, opacity: 0 }}\n                      transition={motionTransitions.springGentle}\n                      className=\"overflow-hidden\"\n                    >\n                      <div className=\"px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed\">\n                        {item.answer}\n                      </div>\n                    </motion.div>\n                  )}\n                </AnimatePresence>\n              </div>\n            );\n          })}\n        </div>\n      )}\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { useRef } from 'react';\nimport { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface DockItem {\n  id: string;\n  label: string;\n  icon: React.ReactNode;\n  onClick?: () => void;\n  badge?: boolean;\n}\n\nexport interface FloatingActionDockProps {\n  items: DockItem[];\n  className?: string;\n  activeId?: string;\n}\n\nfunction DockIcon({\n  item,\n  mouseX,\n  isActive,\n}: {\n  item: DockItem;\n  mouseX: MotionValue;\n  isActive?: boolean;\n}) {\n  const ref = useRef<HTMLButtonElement>(null);\n\n  const distance = useTransform(mouseX, (val: number) => {\n    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };\n    return val - bounds.x - bounds.width / 2;\n  });\n\n  const widthSync = useTransform(distance, [-120, 0, 120], [40, 56, 40]);\n  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });\n\n  return (\n    <motion.button\n      ref={ref}\n      style={{ width, height: width }}\n      onClick={item.onClick}\n      whileTap={{ scale: 0.88 }}\n      transition={motionTransitions.springSnappy}\n      className={cn(\n        'group relative flex items-center justify-center rounded-xl bg-[#141414] border border-[#222222] hover:border-[#383838] hover:bg-[#1A1A1A] transition-colors focus-ring',\n        isActive && 'border-[#444444] bg-[#1A1A1A]'\n      )}\n      aria-label={item.label}\n    >\n      {/* Tooltip */}\n      <div className=\"pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-[11px] text-[#F5F5F5] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-md z-20\">\n        {item.label}\n      </div>\n\n      {/* Icon */}\n      <span className=\"text-[#A1A1A1] group-hover:text-[#F5F5F5] transition-colors [&>svg]:w-5 [&>svg]:h-5\">\n        {item.icon}\n      </span>\n\n      {/* Active Dot */}\n      {isActive && (\n        <span className=\"absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white\" />\n      )}\n    </motion.button>\n  );\n}\n\nexport const FloatingActionDock: React.FC<FloatingActionDockProps> = ({\n  items,\n  className,\n  activeId,\n}) => {\n  const mouseX = useMotionValue(Infinity);\n\n  return (\n    <motion.div\n      onMouseMove={(e) => mouseX.set(e.clientX)}\n      onMouseLeave={() => mouseX.set(Infinity)}\n      className={cn(\n        'inline-flex items-end gap-2.5 px-3 py-2.5 rounded-2xl bg-[#090909]/90 backdrop-blur-md border border-[#1D1D1D] shadow-[0_12px_32px_rgba(0,0,0,0.6)]',\n        className\n      )}\n    >\n      {items.map((item) => (\n        <DockIcon\n          key={item.id}\n          item={item}\n          mouseX={mouseX}\n          isActive={activeId === item.id}\n        />\n      ))}\n    </motion.div>\n  );\n};\n",
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
    "sourceCode": "import React, { forwardRef, useId } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { ChevronDown, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\n/* ==========================================================================\n   1. Form Root & Layout Items\n   ========================================================================== */\n\nexport interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {\n  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;\n}\n\nexport const Form = forwardRef<HTMLFormElement, FormProps>(\n  ({ className, onSubmit, ...props }, ref) => (\n    <form\n      ref={ref}\n      onSubmit={onSubmit}\n      className={cn('space-y-4 w-full', className)}\n      noValidate\n      {...props}\n    />\n  )\n);\nForm.displayName = 'Form';\n\nexport interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {\n  error?: string;\n}\n\nexport const FormItem = forwardRef<HTMLDivElement, FormItemProps>(\n  ({ className, ...props }, ref) => (\n    <div ref={ref} className={cn('space-y-1.5 w-full', className)} {...props} />\n  )\n);\nFormItem.displayName = 'FormItem';\n\nexport interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {\n  required?: boolean;\n}\n\nexport const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(\n  ({ className, required, children, ...props }, ref) => (\n    <label\n      ref={ref}\n      className={cn(\n        'block text-xs font-medium text-[#D4D4D4] select-none tracking-tight',\n        className\n      )}\n      {...props}\n    >\n      {children}\n      {required && <span className=\"text-[#FF7A7A] ml-1\" aria-hidden=\"true\">*</span>}\n    </label>\n  )\n);\nFormLabel.displayName = 'FormLabel';\n\nexport const FormControl = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(\n  ({ className, ...props }, ref) => (\n    <div ref={ref} className={cn('relative', className)} {...props} />\n  )\n);\nFormControl.displayName = 'FormControl';\n\nexport const FormDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(\n  ({ className, ...props }, ref) => (\n    <p\n      ref={ref}\n      className={cn('text-[11px] text-[#6F6F6F] leading-relaxed', className)}\n      {...props}\n    />\n  )\n);\nFormDescription.displayName = 'FormDescription';\n\nexport interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {\n  error?: string | null;\n}\n\nexport const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(\n  ({ className, error, children, ...props }, ref) => {\n    const message = error || children;\n    return (\n      <AnimatePresence>\n        {message ? (\n          <motion.div\n            initial={{ opacity: 0, y: -4, height: 0 }}\n            animate={{ opacity: 1, y: 0, height: 'auto' }}\n            exit={{ opacity: 0, y: -4, height: 0 }}\n            transition={motionTransitions.springSnappy}\n            className=\"overflow-hidden\"\n          >\n            <p\n              ref={ref}\n              role=\"alert\"\n              className={cn(\n                'text-[11px] text-[#FF7A7A] flex items-center gap-1.5 pt-0.5 font-medium',\n                className\n              )}\n              {...props}\n            >\n              <AlertCircle className=\"w-3 h-3 shrink-0\" />\n              <span>{message}</span>\n            </p>\n          </motion.div>\n        ) : null}\n      </AnimatePresence>\n    );\n  }\n);\nFormMessage.displayName = 'FormMessage';\n\n/* ==========================================================================\n   2. Input Component\n   ========================================================================== */\n\nexport interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {\n  /** Optional icon rendered at the start of input */\n  leftIcon?: React.ReactNode;\n  /** Optional icon rendered at the end of input */\n  rightIcon?: React.ReactNode;\n  /** Pass an error message or boolean to trigger danger styling */\n  error?: string | boolean;\n  /** For type=\"password\", automatically provide a show/hide toggle icon */\n  showPasswordToggle?: boolean;\n}\n\nexport const Input = forwardRef<HTMLInputElement, InputProps>(\n  (\n    {\n      className,\n      type = 'text',\n      leftIcon,\n      rightIcon,\n      error,\n      showPasswordToggle = false,\n      disabled,\n      ...props\n    },\n    ref\n  ) => {\n    const [showPassword, setShowPassword] = React.useState(false);\n    const isPassword = type === 'password';\n    const computedType = isPassword && showPassword ? 'text' : type;\n\n    return (\n      <div className=\"relative w-full flex items-center\">\n        {leftIcon && (\n          <div className=\"absolute left-3 text-[#6F6F6F] pointer-events-none flex items-center justify-center\">\n            {leftIcon}\n          </div>\n        )}\n\n        <input\n          ref={ref}\n          type={computedType}\n          disabled={disabled}\n          className={cn(\n            'w-full h-10 px-3.5 text-xs text-[#F5F5F5] placeholder:text-[#6F6F6F] bg-[#0A0A0A] rounded-lg border transition-all duration-150',\n            'border-[#1D1D1D] hover:border-[#2A2A2A]',\n            'focus:bg-[#111111] focus:border-[#2A2A2A] focus:outline-none focus-ring',\n            leftIcon && 'pl-9',\n            (rightIcon || (isPassword && showPasswordToggle)) && 'pr-9',\n            error && 'border-[#521C1C] focus:border-[#7A2828]',\n            disabled && 'opacity-30 cursor-not-allowed bg-[#070707]',\n            className\n          )}\n          {...props}\n        />\n\n        {isPassword && showPasswordToggle ? (\n          <button\n            type=\"button\"\n            onClick={() => setShowPassword(!showPassword)}\n            tabIndex={-1}\n            aria-label={showPassword ? 'Hide password' : 'Show password'}\n            className=\"absolute right-3 text-[#6F6F6F] hover:text-[#F5F5F5] transition-colors focus-ring rounded\"\n          >\n            {showPassword ? (\n              <EyeOff className=\"w-3.5 h-3.5\" />\n            ) : (\n              <Eye className=\"w-3.5 h-3.5\" />\n            )}\n          </button>\n        ) : (\n          rightIcon && (\n            <div className=\"absolute right-3 text-[#6F6F6F] pointer-events-none flex items-center justify-center\">\n              {rightIcon}\n            </div>\n          )\n        )}\n      </div>\n    );\n  }\n);\nInput.displayName = 'Input';\n\n/* ==========================================================================\n   3. Textarea Component\n   ========================================================================== */\n\nexport interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {\n  error?: string | boolean;\n}\n\nexport const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(\n  ({ className, error, disabled, ...props }, ref) => {\n    return (\n      <textarea\n        ref={ref}\n        disabled={disabled}\n        className={cn(\n          'w-full min-h-[90px] p-3 text-xs text-[#F5F5F5] placeholder:text-[#6F6F6F] bg-[#0A0A0A] rounded-lg border transition-all duration-150 resize-y',\n          'border-[#1D1D1D] hover:border-[#2A2A2A]',\n          'focus:bg-[#111111] focus:border-[#2A2A2A] focus:outline-none focus-ring leading-relaxed',\n          error && 'border-[#521C1C] focus:border-[#7A2828]',\n          disabled && 'opacity-30 cursor-not-allowed bg-[#070707]',\n          className\n        )}\n        {...props}\n      />\n    );\n  }\n);\nTextarea.displayName = 'Textarea';\n\n/* ==========================================================================\n   4. Select Component\n   ========================================================================== */\n\nexport interface SelectOption {\n  value: string;\n  label: string;\n  disabled?: boolean;\n}\n\nexport interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {\n  options?: SelectOption[];\n  error?: string | boolean;\n}\n\nexport const Select = forwardRef<HTMLSelectElement, SelectProps>(\n  ({ className, options = [], children, error, disabled, ...props }, ref) => {\n    return (\n      <div className=\"relative w-full flex items-center\">\n        <select\n          ref={ref}\n          disabled={disabled}\n          className={cn(\n            'w-full h-10 pl-3.5 pr-8 text-xs text-[#F5F5F5] bg-[#0A0A0A] rounded-lg border appearance-none transition-all duration-150 cursor-pointer',\n            'border-[#1D1D1D] hover:border-[#2A2A2A]',\n            'focus:bg-[#111111] focus:border-[#2A2A2A] focus:outline-none focus-ring',\n            error && 'border-[#521C1C] focus:border-[#7A2828]',\n            disabled && 'opacity-30 cursor-not-allowed bg-[#070707]',\n            className\n          )}\n          {...props}\n        >\n          {options.length > 0\n            ? options.map((opt) => (\n                <option\n                  key={opt.value}\n                  value={opt.value}\n                  disabled={opt.disabled}\n                  className=\"bg-[#0A0A0A] text-[#F5F5F5]\"\n                >\n                  {opt.label}\n                </option>\n              ))\n            : children}\n        </select>\n        <div className=\"absolute right-3 text-[#6F6F6F] pointer-events-none flex items-center justify-center\">\n          <ChevronDown className=\"w-3.5 h-3.5\" />\n        </div>\n      </div>\n    );\n  }\n);\nSelect.displayName = 'Select';\n\n/* ==========================================================================\n   5. Checkbox Component\n   ========================================================================== */\n\nexport interface CheckboxProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {\n  label?: React.ReactNode;\n  description?: string;\n}\n\nexport const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(\n  ({ className, label, description, checked, defaultChecked, disabled, id, onChange, ...props }, ref) => {\n    const generatedId = useId();\n    const inputId = id || generatedId;\n    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);\n\n    const isControlled = checked !== undefined;\n    const currentChecked = isControlled ? checked : isChecked;\n\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n      if (!isControlled) {\n        setIsChecked(e.target.checked);\n      }\n      if (onChange) {\n        onChange(e);\n      }\n    };\n\n    return (\n      <div className={cn('flex items-start gap-2.5 select-none', disabled && 'opacity-30 cursor-not-allowed', className)}>\n        <div className=\"relative flex items-center justify-center mt-0.5\">\n          <input\n            ref={ref}\n            id={inputId}\n            type=\"checkbox\"\n            checked={currentChecked}\n            disabled={disabled}\n            onChange={handleChange}\n            className=\"peer sr-only\"\n            {...props}\n          />\n          <div\n            onClick={(e) => {\n              if (!disabled) {\n                const input = document.getElementById(inputId) as HTMLInputElement;\n                if (input) input.click();\n              }\n              e.preventDefault();\n            }}\n            className={cn(\n              'w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-150 cursor-pointer focus-ring',\n              currentChecked\n                ? 'bg-[#F5F5F5] border-[#F5F5F5] text-[#050505]'\n                : 'bg-[#0A0A0A] border-[#1D1D1D] hover:border-[#2A2A2A]',\n              disabled && 'cursor-not-allowed'\n            )}\n          >\n            {currentChecked && (\n              <motion.div\n                initial={{ scale: 0, opacity: 0 }}\n                animate={{ scale: 1, opacity: 1 }}\n                exit={{ scale: 0, opacity: 0 }}\n                transition={motionTransitions.springSnappy}\n              >\n                <Check className=\"w-3 h-3 stroke-[3]\" />\n              </motion.div>\n            )}\n          </div>\n        </div>\n\n        {(label || description) && (\n          <label htmlFor={inputId} className=\"cursor-pointer text-left\">\n            {label && (\n              <div className=\"text-xs font-medium text-[#F5F5F5] leading-tight\">\n                {label}\n              </div>\n            )}\n            {description && (\n              <div className=\"text-[11px] text-[#6F6F6F] mt-0.5 leading-relaxed\">\n                {description}\n              </div>\n            )}\n          </label>\n        )}\n      </div>\n    );\n  }\n);\nCheckbox.displayName = 'Checkbox';\n\n/* ==========================================================================\n   6. RadioGroup & RadioGroupItem\n   ========================================================================== */\n\nexport interface RadioOption {\n  value: string;\n  label: React.ReactNode;\n  description?: string;\n  disabled?: boolean;\n}\n\nexport interface RadioGroupProps {\n  name: string;\n  value?: string;\n  defaultValue?: string;\n  options?: RadioOption[];\n  onChange?: (value: string) => void;\n  className?: string;\n  children?: React.ReactNode;\n}\n\nexport const RadioGroup: React.FC<RadioGroupProps> = ({\n  name,\n  value,\n  defaultValue,\n  options = [],\n  onChange,\n  className,\n  children,\n}) => {\n  const [selectedValue, setSelectedValue] = React.useState(defaultValue || '');\n  const isControlled = value !== undefined;\n  const current = isControlled ? value : selectedValue;\n\n  const handleSelect = (val: string) => {\n    if (!isControlled) {\n      setSelectedValue(val);\n    }\n    if (onChange) {\n      onChange(val);\n    }\n  };\n\n  return (\n    <div role=\"radiogroup\" className={cn('space-y-2', className)}>\n      {options.length > 0\n        ? options.map((opt) => (\n            <RadioGroupItem\n              key={opt.value}\n              name={name}\n              value={opt.value}\n              checked={current === opt.value}\n              disabled={opt.disabled}\n              onChange={() => handleSelect(opt.value)}\n              label={opt.label}\n              description={opt.description}\n            />\n          ))\n        : children}\n    </div>\n  );\n};\n\nexport interface RadioGroupItemProps {\n  name: string;\n  value: string;\n  checked?: boolean;\n  disabled?: boolean;\n  onChange?: () => void;\n  label?: React.ReactNode;\n  description?: string;\n  className?: string;\n}\n\nexport const RadioGroupItem: React.FC<RadioGroupItemProps> = ({\n  name,\n  value,\n  checked = false,\n  disabled = false,\n  onChange,\n  label,\n  description,\n  className,\n}) => {\n  const id = useId();\n\n  return (\n    <div className={cn('flex items-start gap-2.5 select-none', disabled && 'opacity-30 cursor-not-allowed', className)}>\n      <div className=\"relative flex items-center justify-center mt-0.5\">\n        <input\n          id={id}\n          type=\"radio\"\n          name={name}\n          value={value}\n          checked={checked}\n          disabled={disabled}\n          onChange={onChange}\n          className=\"peer sr-only\"\n        />\n        <div\n          onClick={() => {\n            if (!disabled && onChange) onChange();\n          }}\n          className={cn(\n            'w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer focus-ring',\n            checked\n              ? 'border-[#F5F5F5] bg-[#0A0A0A]'\n              : 'border-[#1D1D1D] bg-[#0A0A0A] hover:border-[#2A2A2A]',\n            disabled && 'cursor-not-allowed'\n          )}\n        >\n          {checked && (\n            <motion.div\n              layoutId={`radio-dot-${name}`}\n              className=\"w-2 h-2 rounded-full bg-[#F5F5F5]\"\n              transition={motionTransitions.springSnappy}\n            />\n          )}\n        </div>\n      </div>\n\n      {(label || description) && (\n        <label htmlFor={id} className=\"cursor-pointer text-left\">\n          {label && (\n            <div className=\"text-xs font-medium text-[#F5F5F5] leading-tight\">\n              {label}\n            </div>\n          )}\n          {description && (\n            <div className=\"text-[11px] text-[#6F6F6F] mt-0.5 leading-relaxed\">\n              {description}\n            </div>\n          )}\n        </label>\n      )}\n    </div>\n  );\n};\n\n/* ==========================================================================\n   7. Switch / Toggle Component\n   ========================================================================== */\n\nexport interface SwitchProps {\n  checked?: boolean;\n  defaultChecked?: boolean;\n  disabled?: boolean;\n  onChange?: (checked: boolean) => void;\n  label?: React.ReactNode;\n  description?: string;\n  className?: string;\n}\n\nexport const Switch: React.FC<SwitchProps> = ({\n  checked,\n  defaultChecked = false,\n  disabled = false,\n  onChange,\n  label,\n  description,\n  className,\n}) => {\n  const [isOn, setIsOn] = React.useState(defaultChecked);\n  const isControlled = checked !== undefined;\n  const current = isControlled ? checked : isOn;\n\n  const handleToggle = () => {\n    if (disabled) return;\n    const next = !current;\n    if (!isControlled) {\n      setIsOn(next);\n    }\n    if (onChange) {\n      onChange(next);\n    }\n  };\n\n  return (\n    <div className={cn('flex items-center justify-between gap-4 select-none', disabled && 'opacity-30 cursor-not-allowed', className)}>\n      {(label || description) && (\n        <div className=\"text-left cursor-pointer\" onClick={handleToggle}>\n          {label && (\n            <div className=\"text-xs font-medium text-[#F5F5F5] leading-tight\">\n              {label}\n            </div>\n          )}\n          {description && (\n            <div className=\"text-[11px] text-[#6F6F6F] mt-0.5 leading-relaxed\">\n              {description}\n            </div>\n          )}\n        </div>\n      )}\n\n      <button\n        type=\"button\"\n        role=\"switch\"\n        aria-checked={current}\n        disabled={disabled}\n        onClick={handleToggle}\n        className={cn(\n          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border transition-colors duration-200 focus-ring',\n          current\n            ? 'bg-[#F5F5F5] border-[#F5F5F5]'\n            : 'bg-[#151515] border-[#222222]',\n          disabled && 'cursor-not-allowed'\n        )}\n      >\n        <motion.span\n          animate={{ x: current ? 16 : 2 }}\n          transition={motionTransitions.springSnappy}\n          className={cn(\n            'pointer-events-none block h-3.5 w-3.5 my-auto top-0 bottom-0 rounded-full shadow-sm',\n            current ? 'bg-[#050505]' : 'bg-[#737373]'\n          )}\n        />\n      </button>\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { useState, useEffect, useRef } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface NavItem {\n  id?: string;\n  label: string;\n  href: string;\n  icon?: React.ReactNode;\n  badge?: string;\n  active?: boolean;\n  external?: boolean;\n  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;\n}\n\nexport interface GlassNavbarProps {\n  /** Brand / Logo element or text */\n  brand?: React.ReactNode;\n  /** Brand link destination */\n  brandHref?: string;\n  /** Navigation links */\n  items?: NavItem[];\n  /** Right-hand side call-to-action button or custom element */\n  cta?: React.ReactNode;\n  /** Currently active item ID or label */\n  activeId?: string;\n  /** Floating pill style vs full-width attached bar */\n  variant?: 'floating' | 'full-width';\n  /** Sticky positioning at the top of the viewport */\n  sticky?: boolean;\n  /** Enable background blur glassmorphism effect */\n  glass?: boolean;\n  /** Additional container classes */\n  className?: string;\n  /** Callback when navigation item is clicked */\n  onItemSelect?: (item: NavItem) => void;\n}\n\nexport const GlassNavbar: React.FC<GlassNavbarProps> = ({\n  brand = (\n    <div className=\"flex items-center gap-2\">\n      <div className=\"w-7 h-7 rounded-lg bg-gradient-to-tr from-[#1a1a1a] to-[#2a2a2a] border border-[#333333] flex items-center justify-center font-bold text-xs text-[#F5F5F5]\">\n        E\n      </div>\n      <span className=\"font-semibold text-sm tracking-tight text-[#F5F5F5]\">EasyUI</span>\n    </div>\n  ),\n  brandHref = '/',\n  items = [\n    { label: 'Overview', href: '#overview' },\n    { label: 'Components', href: '#components', badge: '16+' },\n    { label: 'Showcase', href: '#showcase' },\n    { label: 'Docs', href: '#docs' },\n  ],\n  cta = (\n    <a\n      href=\"#get-started\"\n      className=\"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium hover:bg-white transition-colors focus-ring shadow-[0_0_20px_-3px_rgba(255,255,255,0.15)]\"\n    >\n      <span>Get Started</span>\n      <ArrowRight className=\"w-3.5 h-3.5\" />\n    </a>\n  ),\n  activeId,\n  variant = 'floating',\n  sticky = true,\n  glass = true,\n  className,\n  onItemSelect,\n}) => {\n  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);\n  const [activeItem, setActiveItem] = useState<string>(\n    activeId || (items.find((i) => i.active)?.label ?? items[0]?.label ?? '')\n  );\n  const navRef = useRef<HTMLElement>(null);\n\n  useEffect(() => {\n    if (activeId) {\n      setActiveItem(activeId);\n    }\n  }, [activeId]);\n\n  // Close mobile menu on Escape key\n  useEffect(() => {\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === 'Escape' && mobileMenuOpen) {\n        setMobileMenuOpen(false);\n      }\n    };\n    window.addEventListener('keydown', handleKeyDown);\n    return () => window.removeEventListener('keydown', handleKeyDown);\n  }, [mobileMenuOpen]);\n\n  // Prevent background scrolling when mobile menu is open\n  useEffect(() => {\n    if (mobileMenuOpen) {\n      document.body.style.overflow = 'hidden';\n    } else {\n      document.body.style.overflow = '';\n    }\n    return () => {\n      document.body.style.overflow = '';\n    };\n  }, [mobileMenuOpen]);\n\n  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {\n    setActiveItem(item.id || item.label);\n    if (item.onClick) {\n      item.onClick(e);\n    }\n    if (onItemSelect) {\n      onItemSelect(item);\n    }\n    setMobileMenuOpen(false);\n  };\n\n  const isFloating = variant === 'floating';\n\n  return (\n    <header\n      ref={navRef}\n      className={cn(\n        'w-full z-50 transition-all duration-300',\n        sticky && 'sticky top-0',\n        isFloating ? 'pt-3 sm:pt-4 px-4 sm:px-6' : 'px-0',\n        className\n      )}\n      role=\"banner\"\n    >\n      <div\n        className={cn(\n          'relative mx-auto transition-all duration-300',\n          isFloating\n            ? 'max-w-5xl rounded-2xl border border-[#1D1D1D] px-4 sm:px-5 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)]'\n            : 'w-full border-b border-[#141414] px-4 sm:px-8 py-3.5',\n          glass\n            ? 'bg-[#050505]/85 backdrop-blur-md'\n            : 'bg-[#0A0A0A]'\n        )}\n      >\n        <nav\n          className=\"flex items-center justify-between gap-4\"\n          aria-label=\"Main Navigation\"\n        >\n          {/* Brand / Logo */}\n          <a\n            href={brandHref}\n            className=\"flex items-center gap-2 text-inherit no-underline focus-ring rounded-lg shrink-0\"\n            aria-label=\"Home\"\n          >\n            {brand}\n          </a>\n\n          {/* Desktop Navigation Links */}\n          <div\n            className=\"hidden md:flex items-center gap-1 relative\"\n            onMouseLeave={() => setHoveredIndex(null)}\n          >\n            {items.map((item, idx) => {\n              const currentId = item.id || item.label;\n              const isCurrent = activeItem === currentId;\n\n              return (\n                <a\n                  key={currentId}\n                  href={item.href}\n                  target={item.external ? '_blank' : undefined}\n                  rel={item.external ? 'noopener noreferrer' : undefined}\n                  onClick={(e) => handleLinkClick(e, item)}\n                  onMouseEnter={() => setHoveredIndex(idx)}\n                  className={cn(\n                    'relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 flex items-center gap-1.5 focus-ring select-none',\n                    isCurrent\n                      ? 'text-[#F5F5F5]'\n                      : 'text-[#808080] hover:text-[#F5F5F5]'\n                  )}\n                  aria-current={isCurrent ? 'page' : undefined}\n                >\n                  {/* Hover spotlight background */}\n                  {hoveredIndex === idx && (\n                    <motion.div\n                      layoutId=\"navbar-hover-pill\"\n                      className=\"absolute inset-0 rounded-lg bg-[#151515] -z-10\"\n                      transition={motionTransitions.springSnappy}\n                    />\n                  )}\n\n                  {/* Active indicator pill (when not hovered over another item) */}\n                  {isCurrent && hoveredIndex === null && (\n                    <motion.div\n                      layoutId=\"navbar-active-pill\"\n                      className=\"absolute inset-0 rounded-lg bg-[#181818] border border-[#282828] -z-10\"\n                      transition={motionTransitions.springGentle}\n                    />\n                  )}\n\n                  {item.icon && (\n                    <span className=\"w-3.5 h-3.5 text-current shrink-0\">\n                      {item.icon}\n                    </span>\n                  )}\n                  <span>{item.label}</span>\n                  {item.badge && (\n                    <span className=\"px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[#1A1A1A] border border-[#2A2A2A] text-[#A1A1A1]\">\n                      {item.badge}\n                    </span>\n                  )}\n                  {item.external && (\n                    <ExternalLink className=\"w-3 h-3 text-[#6F6F6F]\" />\n                  )}\n                </a>\n              );\n            })}\n          </div>\n\n          {/* Desktop Right Action Area / CTA */}\n          <div className=\"hidden md:flex items-center gap-3 shrink-0\">\n            {cta}\n          </div>\n\n          {/* Mobile Menu Toggle Button */}\n          <div className=\"flex md:hidden items-center gap-2\">\n            {cta && (\n              <div className=\"hidden sm:block\">\n                {cta}\n              </div>\n            )}\n            <button\n              type=\"button\"\n              onClick={() => setMobileMenuOpen((prev) => !prev)}\n              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}\n              aria-expanded={mobileMenuOpen}\n              className=\"p-2 rounded-lg bg-[#101010] border border-[#1D1D1D] text-[#A1A1A1] hover:text-[#F5F5F5] hover:border-[#2A2A2A] transition-colors focus-ring\"\n            >\n              <motion.div\n                key={mobileMenuOpen ? 'close' : 'menu'}\n                initial={{ rotate: -90, opacity: 0 }}\n                animate={{ rotate: 0, opacity: 1 }}\n                exit={{ rotate: 90, opacity: 0 }}\n                transition={motionTransitions.springSnappy}\n              >\n                {mobileMenuOpen ? (\n                  <X className=\"w-4 h-4\" />\n                ) : (\n                  <Menu className=\"w-4 h-4\" />\n                )}\n              </motion.div>\n            </button>\n          </div>\n        </nav>\n\n        {/* Mobile Dropdown Menu */}\n        <AnimatePresence>\n          {mobileMenuOpen && (\n            <motion.div\n              initial={{ opacity: 0, y: -8, height: 0 }}\n              animate={{ opacity: 1, y: 0, height: 'auto' }}\n              exit={{ opacity: 0, y: -8, height: 0 }}\n              transition={motionTransitions.springGentle}\n              className=\"overflow-hidden md:hidden pt-3 mt-3 border-t border-[#1D1D1D]\"\n            >\n              <div className=\"flex flex-col gap-1 pb-2\">\n                {items.map((item) => {\n                  const currentId = item.id || item.label;\n                  const isCurrent = activeItem === currentId;\n\n                  return (\n                    <a\n                      key={currentId}\n                      href={item.href}\n                      target={item.external ? '_blank' : undefined}\n                      rel={item.external ? 'noopener noreferrer' : undefined}\n                      onClick={(e) => handleLinkClick(e, item)}\n                      className={cn(\n                        'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors focus-ring',\n                        isCurrent\n                          ? 'bg-[#181818] text-[#F5F5F5] border border-[#282828]'\n                          : 'text-[#808080] hover:text-[#F5F5F5] hover:bg-[#101010]'\n                      )}\n                    >\n                      <div className=\"flex items-center gap-2\">\n                        {item.icon && (\n                          <span className=\"w-4 h-4 text-current\">\n                            {item.icon}\n                          </span>\n                        )}\n                        <span>{item.label}</span>\n                      </div>\n                      <div className=\"flex items-center gap-2\">\n                        {item.badge && (\n                          <span className=\"px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[#1A1A1A] border border-[#2A2A2A] text-[#A1A1A1]\">\n                            {item.badge}\n                          </span>\n                        )}\n                        {item.external && (\n                          <ExternalLink className=\"w-3 h-3 text-[#6F6F6F]\" />\n                        )}\n                      </div>\n                    </a>\n                  );\n                })}\n\n                {cta && (\n                  <div className=\"pt-2 mt-2 border-t border-[#141414] flex flex-col\">\n                    {cta}\n                  </div>\n                )}\n              </div>\n            </motion.div>\n          )}\n        </AnimatePresence>\n      </div>\n    </header>\n  );\n};\n",
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
    "sourceCode": "import React, { useState, useId } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { Check, Clock, AlertCircle, Loader2, GitCommit, Copy, CheckCheck, ChevronDown } from 'lucide-react';\nimport { cn, copyToClipboard } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport type TimelineStatus = 'completed' | 'in-progress' | 'pending' | 'failed';\n\nexport interface TimelineMetric {\n  label: string;\n  value: string;\n}\n\nexport interface TimelineItem {\n  id: string;\n  title: string;\n  timestamp: string;\n  status: TimelineStatus;\n  description?: string;\n  tag?: string;\n  commitHash?: string;\n  metrics?: TimelineMetric[];\n  author?: {\n    name: string;\n    role?: string;\n  };\n}\n\nexport interface InteractiveTimelineProps extends React.HTMLAttributes<HTMLDivElement> {\n  items: TimelineItem[];\n  defaultSelectedId?: string;\n  onItemSelect?: (item: TimelineItem) => void;\n  className?: string;\n  collapsible?: boolean;\n}\n\nexport const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({\n  items = [],\n  defaultSelectedId,\n  onItemSelect,\n  className,\n  collapsible = true,\n  ...props\n}) => {\n  const [selectedId, setSelectedId] = useState<string | undefined>(\n    defaultSelectedId || items[0]?.id\n  );\n  const [expandedIds, setExpandedIds] = useState<Set<string>>(\n    new Set(defaultSelectedId ? [defaultSelectedId] : items.length > 0 ? [items[0].id] : [])\n  );\n  const [copiedHash, setCopiedHash] = useState<string | null>(null);\n  const listId = useId();\n\n  const handleToggleExpand = (item: TimelineItem) => {\n    setSelectedId(item.id);\n    onItemSelect?.(item);\n\n    if (!collapsible) return;\n\n    setExpandedIds((prev) => {\n      const next = new Set(prev);\n      if (next.has(item.id)) {\n        next.delete(item.id);\n      } else {\n        next.add(item.id);\n      }\n      return next;\n    });\n  };\n\n  const handleCopyHash = (e: React.MouseEvent, hash: string) => {\n    e.stopPropagation();\n    copyToClipboard(hash);\n    setCopiedHash(hash);\n    setTimeout(() => setCopiedHash(null), 2000);\n  };\n\n  const getStatusIcon = (status: TimelineStatus) => {\n    switch (status) {\n      case 'completed':\n        return <Check className=\"w-3.5 h-3.5 text-white\" />;\n      case 'in-progress':\n        return <Loader2 className=\"w-3.5 h-3.5 text-white animate-spin\" />;\n      case 'failed':\n        return <AlertCircle className=\"w-3.5 h-3.5 text-rose-400\" />;\n      case 'pending':\n      default:\n        return <Clock className=\"w-3.5 h-3.5 text-[#606060]\" />;\n    }\n  };\n\n  const getStatusBadgeStyle = (status: TimelineStatus) => {\n    switch (status) {\n      case 'completed':\n        return 'bg-white/10 text-white border-white/20';\n      case 'in-progress':\n        return 'bg-white/15 text-white border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)]';\n      case 'failed':\n        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';\n      case 'pending':\n      default:\n        return 'bg-[#121212] text-[#737373] border-[#222222]';\n    }\n  };\n\n  const getStatusNodeStyle = (status: TimelineStatus, isSelected: boolean) => {\n    switch (status) {\n      case 'completed':\n        return 'bg-[#1A1A1A] border-white/60 text-white ring-1 ring-white/20';\n      case 'in-progress':\n        return 'bg-[#181818] border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.25)] ring-2 ring-white/30';\n      case 'failed':\n        return 'bg-[#181012] border-rose-500 text-rose-400 ring-1 ring-rose-500/30';\n      case 'pending':\n      default:\n        return isSelected\n          ? 'bg-[#141414] border-[#404040] text-[#A1A1A1]'\n          : 'bg-[#0E0E0E] border-[#252525] text-[#606060]';\n    }\n  };\n\n  // Calculate completed count for progress line indicator\n  const completedIndex = items.reduce((acc, curr, idx) => {\n    return curr.status === 'completed' || curr.status === 'in-progress' ? idx : acc;\n  }, -1);\n\n  const progressPercent =\n    items.length > 1 && completedIndex >= 0\n      ? (completedIndex / (items.length - 1)) * 100\n      : 0;\n\n  return (\n    <div\n      role=\"region\"\n      aria-label=\"Interactive timeline\"\n      className={cn(\n        'w-full rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] p-3.5 sm:p-5 text-[#F5F5F5]',\n        className\n      )}\n      {...props}\n    >\n      <div className=\"relative\">\n        {/* Continuous Background Track Line */}\n        <div className=\"absolute left-[17px] top-6 bottom-6 w-[2px] bg-[#161616]\" />\n\n        {/* Animated Progress Filled Line */}\n        <motion.div\n          className=\"absolute left-[17px] top-6 w-[2px] bg-gradient-to-b from-white via-white/80 to-white/20 origin-top\"\n          initial={{ height: 0 }}\n          animate={{ height: `${progressPercent}%` }}\n          transition={motionTransitions.springGentle}\n        />\n\n        {/* Timeline Items List */}\n        <div className=\"space-y-3 sm:space-y-4 relative\" role=\"list\">\n          {items.map((item) => {\n            const isExpanded = expandedIds.has(item.id);\n            const isSelected = selectedId === item.id;\n            const itemId = `${listId}-item-${item.id}`;\n\n            return (\n              <div\n                key={item.id}\n                role=\"listitem\"\n                className=\"relative flex items-start gap-4 group\"\n              >\n                {/* Status Indicator Node */}\n                <button\n                  type=\"button\"\n                  onClick={() => handleToggleExpand(item)}\n                  aria-expanded={isExpanded}\n                  aria-controls={itemId}\n                  className={cn(\n                    'relative z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer',\n                    getStatusNodeStyle(item.status, isSelected)\n                  )}\n                  title={`${item.title} - ${item.status}`}\n                >\n                  {getStatusIcon(item.status)}\n                  {item.status === 'in-progress' && (\n                    <span className=\"absolute inset-0 rounded-full animate-ping bg-white/20 -z-10\" />\n                  )}\n                </button>\n\n                {/* Content Card */}\n                <div\n                  onClick={() => handleToggleExpand(item)}\n                  className={cn(\n                    'flex-1 rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden p-3.5 sm:p-4',\n                    isSelected\n                      ? 'bg-[#111111] border-[#2A2A2A] shadow-lg shadow-black/40'\n                      : 'bg-[#0E0E0E] border-[#181818] hover:border-[#242424] hover:bg-[#101010]'\n                  )}\n                >\n                  {/* Item Header */}\n                  <div className=\"flex items-start justify-between gap-3\">\n                    <div className=\"min-w-0 flex-1\">\n                      <div className=\"flex flex-wrap items-center gap-2 mb-1\">\n                        <span className=\"text-xs sm:text-sm font-medium text-[#F5F5F5] truncate\">\n                          {item.title}\n                        </span>\n                        {item.tag && (\n                          <span className=\"text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] border border-[#252525] text-[#A1A1A1]\">\n                            {item.tag}\n                          </span>\n                        )}\n                        <span\n                          className={cn(\n                            'text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border',\n                            getStatusBadgeStyle(item.status)\n                          )}\n                        >\n                          {item.status}\n                        </span>\n                      </div>\n\n                      <span className=\"text-[11px] font-mono text-[#6F6F6F] block\">\n                        {item.timestamp}\n                      </span>\n                    </div>\n\n                    <div className=\"flex items-center gap-1.5 shrink-0\">\n                      {collapsible && (\n                        <motion.div\n                          animate={{ rotate: isExpanded ? 180 : 0 }}\n                          transition={{ duration: 0.2 }}\n                          className=\"text-[#737373] group-hover:text-white p-1\"\n                        >\n                          <ChevronDown className=\"w-4 h-4\" />\n                        </motion.div>\n                      )}\n                    </div>\n                  </div>\n\n                  {/* Expandable Detail Section */}\n                  <AnimatePresence initial={false}>\n                    {isExpanded && (\n                      <motion.div\n                        id={itemId}\n                        initial={{ opacity: 0, height: 0 }}\n                        animate={{ opacity: 1, height: 'auto' }}\n                        exit={{ opacity: 0, height: 0 }}\n                        transition={motionTransitions.springGentle}\n                        className=\"overflow-hidden\"\n                      >\n                        <div className=\"pt-3 mt-3 border-t border-[#1C1C1C] space-y-3\">\n                          {item.description && (\n                            <p className=\"text-xs text-[#A1A1A1] leading-relaxed\">\n                              {item.description}\n                            </p>\n                          )}\n\n                          {/* Metrics Grid */}\n                          {item.metrics && item.metrics.length > 0 && (\n                            <div className=\"grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1\">\n                              {item.metrics.map((m, i) => (\n                                <div\n                                  key={i}\n                                  className=\"p-2.5 rounded-lg bg-[#080808] border border-[#1C1C1C]\"\n                                >\n                                  <span className=\"text-[10px] font-mono text-[#6F6F6F] block uppercase\">\n                                    {m.label}\n                                  </span>\n                                  <span className=\"text-xs font-mono font-medium text-white\">\n                                    {m.value}\n                                  </span>\n                                </div>\n                              ))}\n                            </div>\n                          )}\n\n                          {/* Footer Meta: Commit + Author */}\n                          <div className=\"flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] font-mono text-[#6F6F6F]\">\n                            {item.author && (\n                              <div className=\"flex items-center gap-1.5\">\n                                <span className=\"w-1.5 h-1.5 rounded-full bg-white/60\" />\n                                <span className=\"text-[#A1A1A1]\">{item.author.name}</span>\n                                {item.author.role && (\n                                  <span className=\"text-[#555555]\">({item.author.role})</span>\n                                )}\n                              </div>\n                            )}\n\n                            {item.commitHash && (\n                              <button\n                                type=\"button\"\n                                onClick={(e) => handleCopyHash(e, item.commitHash!)}\n                                className=\"inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#0A0A0A] hover:bg-[#141414] border border-[#202020] hover:border-[#303030] text-[#A1A1A1] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer\"\n                                title=\"Copy commit hash\"\n                              >\n                                <GitCommit className=\"w-3 h-3\" />\n                                <span>{item.commitHash.slice(0, 7)}</span>\n                                {copiedHash === item.commitHash ? (\n                                  <CheckCheck className=\"w-3 h-3 text-white\" />\n                                ) : (\n                                  <Copy className=\"w-3 h-3 text-[#606060]\" />\n                                )}\n                              </button>\n                            )}\n                          </div>\n                        </div>\n                      </motion.div>\n                    )}\n                  </AnimatePresence>\n                </div>\n              </div>\n            );\n          })}\n        </div>\n      </div>\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { useState } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\nimport { Button } from './Button';\nimport { Form, FormItem, FormLabel, FormControl, FormMessage, Input, Checkbox } from './Form';\n\nexport interface LoginFormData {\n  email: string;\n  password: string;\n  rememberMe: boolean;\n}\n\nexport interface LoginProps {\n  /** Card header title */\n  title?: string;\n  /** Card header description / subtitle */\n  description?: string;\n  /** Custom logo or icon displayed above title */\n  logo?: React.ReactNode;\n  /** Error message displayed at top of card */\n  error?: string | null;\n  /** Submission loading state */\n  isLoading?: boolean;\n  /** Form submission callback */\n  onSubmit?: (data: LoginFormData) => void | Promise<void>;\n  /** Callback when \"Forgot password?\" is clicked */\n  onForgotPassword?: () => void;\n  /** Callback when secondary \"Sign up\" action is clicked */\n  onSignUpClick?: () => void;\n  /** Show social login SSO buttons (GitHub, Google, Apple) */\n  showSocialLogins?: boolean;\n  /** Callback when a social login provider is clicked */\n  onSocialLogin?: (provider: 'github' | 'google' | 'apple') => void;\n  /** Custom text for sign up link */\n  signUpText?: string;\n  /** Additional container styling */\n  className?: string;\n}\n\nexport const Login: React.FC<LoginProps> = ({\n  title = 'Welcome back',\n  description = 'Sign in to access your EasyUI workspace',\n  logo = (\n    <div className=\"w-10 h-10 rounded-xl bg-gradient-to-tr from-[#141414] to-[#242424] border border-[#2A2A2A] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]\">\n      <Sparkles className=\"w-5 h-5 text-white\" />\n    </div>\n  ),\n  error,\n  isLoading = false,\n  onSubmit,\n  onForgotPassword,\n  onSignUpClick,\n  showSocialLogins = true,\n  onSocialLogin,\n  signUpText = \"Don't have an account? Sign up\",\n  className,\n}) => {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const [rememberMe, setRememberMe] = useState(false);\n  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});\n\n  const validate = () => {\n    const errors: { email?: string; password?: string } = {};\n    if (!email.trim()) {\n      errors.email = 'Email is required';\n    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {\n      errors.email = 'Please enter a valid email address';\n    }\n\n    if (!password) {\n      errors.password = 'Password is required';\n    } else if (password.length < 6) {\n      errors.password = 'Password must be at least 6 characters';\n    }\n\n    setValidationErrors(errors);\n    return Object.keys(errors).length === 0;\n  };\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!validate()) return;\n    if (onSubmit) {\n      onSubmit({ email, password, rememberMe });\n    }\n  };\n\n  return (\n    <div\n      className={cn(\n        'w-full max-w-md mx-auto rounded-2xl border border-[#1D1D1D] bg-[#0A0A0A] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300',\n        className\n      )}\n    >\n      {/* Subtle top atmospheric glow */}\n      <div\n        className=\"absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-white/5 to-transparent blur-2xl pointer-events-none\"\n        aria-hidden=\"true\"\n      />\n\n      {/* Header */}\n      <div className=\"flex flex-col items-center text-center mb-6 relative z-10\">\n        {logo && <div className=\"mb-3.5\">{logo}</div>}\n        <h2 className=\"text-xl sm:text-2xl font-semibold text-[#F5F5F5] tracking-tight\">\n          {title}\n        </h2>\n        {description && (\n          <p className=\"text-xs sm:text-sm text-[#808080] mt-1.5 leading-relaxed max-w-xs\">\n            {description}\n          </p>\n        )}\n      </div>\n\n      {/* Top Error Alert Banner */}\n      <AnimatePresence>\n        {error && (\n          <motion.div\n            initial={{ opacity: 0, y: -6, height: 0 }}\n            animate={{ opacity: 1, y: 0, height: 'auto' }}\n            exit={{ opacity: 0, y: -6, height: 0 }}\n            transition={motionTransitions.springSnappy}\n            className=\"mb-5 overflow-hidden\"\n          >\n            <div className=\"p-3 rounded-lg bg-[#1A0A0A] border border-[#3A1414] text-xs text-[#FF7A7A] flex items-center gap-2\">\n              <AlertCircle className=\"w-4 h-4 shrink-0\" />\n              <span>{error}</span>\n            </div>\n          </motion.div>\n        )}\n      </AnimatePresence>\n\n      {/* Social Login Options */}\n      {showSocialLogins && (\n        <div className=\"space-y-3 mb-5\">\n          <div className=\"grid grid-cols-2 gap-2.5\">\n            <Button\n              type=\"button\"\n              variant=\"secondary\"\n              size=\"sm\"\n              onClick={() => onSocialLogin?.('github')}\n              className=\"w-full text-xs font-normal\"\n              leftIcon={\n                <svg className=\"w-3.5 h-3.5 fill-current\" viewBox=\"0 0 24 24\">\n                  <path d=\"M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z\" />\n                </svg>\n              }\n            >\n              GitHub\n            </Button>\n            <Button\n              type=\"button\"\n              variant=\"secondary\"\n              size=\"sm\"\n              onClick={() => onSocialLogin?.('google')}\n              className=\"w-full text-xs font-normal\"\n              leftIcon={\n                <svg className=\"w-3.5 h-3.5 fill-current\" viewBox=\"0 0 24 24\">\n                  <path d=\"M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z\" />\n                </svg>\n              }\n            >\n              Google\n            </Button>\n          </div>\n\n          <div className=\"relative flex items-center justify-center my-4\">\n            <div className=\"border-t border-[#1D1D1D] w-full\" />\n            <span className=\"bg-[#0A0A0A] px-3 text-[10px] uppercase font-mono tracking-widest text-[#6F6F6F] absolute\">\n              Or continue with\n            </span>\n          </div>\n        </div>\n      )}\n\n      {/* Main Login Form */}\n      <Form onSubmit={handleSubmit} className=\"space-y-4\">\n        {/* Email Field */}\n        <FormItem>\n          <FormLabel required>Email</FormLabel>\n          <FormControl>\n            <Input\n              type=\"email\"\n              placeholder=\"name@company.com\"\n              autoComplete=\"email\"\n              value={email}\n              onChange={(e) => {\n                setEmail(e.target.value);\n                if (validationErrors.email) {\n                  setValidationErrors((prev) => ({ ...prev, email: undefined }));\n                }\n              }}\n              leftIcon={<Mail className=\"w-3.5 h-3.5\" />}\n              error={!!validationErrors.email}\n            />\n          </FormControl>\n          <FormMessage error={validationErrors.email} />\n        </FormItem>\n\n        {/* Password Field */}\n        <FormItem>\n          <div className=\"flex items-center justify-between\">\n            <FormLabel required>Password</FormLabel>\n            {onForgotPassword && (\n              <button\n                type=\"button\"\n                onClick={onForgotPassword}\n                className=\"text-[11px] text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors focus-ring rounded\"\n              >\n                Forgot password?\n              </button>\n            )}\n          </div>\n          <FormControl>\n            <Input\n              type=\"password\"\n              placeholder=\"••••••••\"\n              autoComplete=\"current-password\"\n              showPasswordToggle\n              value={password}\n              onChange={(e) => {\n                setPassword(e.target.value);\n                if (validationErrors.password) {\n                  setValidationErrors((prev) => ({ ...prev, password: undefined }));\n                }\n              }}\n              leftIcon={<Lock className=\"w-3.5 h-3.5\" />}\n              error={!!validationErrors.password}\n            />\n          </FormControl>\n          <FormMessage error={validationErrors.password} />\n        </FormItem>\n\n        {/* Remember Me */}\n        <div className=\"pt-1\">\n          <Checkbox\n            label=\"Remember this device\"\n            checked={rememberMe}\n            onChange={(e) => setRememberMe(e.target.checked)}\n          />\n        </div>\n\n        {/* Submit Button */}\n        <Button\n          type=\"submit\"\n          variant=\"primary\"\n          size=\"md\"\n          fullWidth\n          isLoading={isLoading}\n          loadingText=\"Authenticating...\"\n          rightIcon={!isLoading ? <ArrowRight className=\"w-4 h-4\" /> : undefined}\n          className=\"mt-2\"\n        >\n          Sign In\n        </Button>\n      </Form>\n\n      {/* Secondary Action */}\n      {onSignUpClick && (\n        <div className=\"mt-6 text-center pt-4 border-t border-[#141414]\">\n          <button\n            type=\"button\"\n            onClick={onSignUpClick}\n            className=\"text-xs text-[#808080] hover:text-[#F5F5F5] transition-colors focus-ring rounded\"\n          >\n            {signUpText}\n          </button>\n        </div>\n      )}\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { useState, useMemo, useRef, useId } from 'react';\nimport { motion } from 'framer-motion';\nimport { TrendingUp, TrendingDown, Minus, Activity, Copy, Check } from 'lucide-react';\nimport { cn, copyToClipboard } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport type MetricTrend = 'up' | 'down' | 'neutral';\n\nexport interface MetricDelta {\n  value: string;\n  trend: MetricTrend;\n  isPositiveGood?: boolean;\n}\n\nexport interface MetricItem {\n  id: string;\n  label: string;\n  value: string;\n  unit?: string;\n  delta: MetricDelta;\n  timeSeries: Record<string, number[]>;\n  status?: 'normal' | 'warning' | 'critical';\n  description?: string;\n}\n\nexport interface MetricHUDProps extends React.HTMLAttributes<HTMLDivElement> {\n  metrics: MetricItem[];\n  timeRanges?: string[];\n  defaultTimeRange?: string;\n  className?: string;\n}\n\nexport const MetricHUD: React.FC<MetricHUDProps> = ({\n  metrics = [],\n  timeRanges = ['1h', '24h', '7d', '30d'],\n  defaultTimeRange = '24h',\n  className,\n  ...props\n}) => {\n  const [selectedMetricId, setSelectedMetricId] = useState<string>(metrics[0]?.id || '');\n  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(defaultTimeRange);\n  const [hoverIndex, setHoverIndex] = useState<number | null>(null);\n  const [copiedId, setCopiedId] = useState<string | null>(null);\n  const svgRef = useRef<SVGSVGElement | null>(null);\n  const hudId = useId();\n\n  const activeMetric = useMemo(() => {\n    return metrics.find((m) => m.id === selectedMetricId) || metrics[0];\n  }, [metrics, selectedMetricId]);\n\n  const activeData = useMemo(() => {\n    if (!activeMetric) return [];\n    const series = activeMetric.timeSeries[selectedTimeRange];\n    if (series && series.length > 0) return series;\n    const firstKey = Object.keys(activeMetric.timeSeries)[0];\n    return firstKey ? activeMetric.timeSeries[firstKey] : [];\n  }, [activeMetric, selectedTimeRange]);\n\n  const minVal = useMemo(() => Math.min(...activeData, 0), [activeData]);\n  const maxVal = useMemo(() => Math.max(...activeData, 1), [activeData]);\n\n  // Compute SVG smooth Path\n  const { pathD, areaD, points } = useMemo(() => {\n    if (activeData.length < 2) {\n      return { pathD: '', areaD: '', points: [] };\n    }\n\n    const width = 400;\n    const height = 120;\n    const padding = 10;\n    const usableHeight = height - padding * 2;\n    const usableWidth = width - padding * 2;\n\n    const pts = activeData.map((val, idx) => {\n      const x = padding + (idx / (activeData.length - 1)) * usableWidth;\n      const normalizedY = (val - minVal) / (maxVal - minVal || 1);\n      const y = height - padding - normalizedY * usableHeight;\n      return { x, y, val };\n    });\n\n    // Generate smooth cubic bezier SVG path\n    let d = `M ${pts[0].x} ${pts[0].y}`;\n    for (let i = 0; i < pts.length - 1; i++) {\n      const p0 = pts[i === 0 ? 0 : i - 1];\n      const p1 = pts[i];\n      const p2 = pts[i + 1];\n      const p3 = pts[i + 2] || p2;\n\n      const cp1x = p1.x + (p2.x - p0.x) / 6;\n      const cp1y = p1.y + (p2.y - p0.y) / 6;\n      const cp2x = p2.x - (p3.x - p1.x) / 6;\n      const cp2y = p2.y - (p3.y - p1.y) / 6;\n\n      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;\n    }\n\n    const area = `${d} L ${pts[pts.length - 1].x} 120 L ${pts[0].x} 120 Z`;\n\n    return { pathD: d, areaD: area, points: pts };\n  }, [activeData, minVal, maxVal]);\n\n  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {\n    if (!svgRef.current || points.length === 0) return;\n    const rect = svgRef.current.getBoundingClientRect();\n    const clientX = e.clientX - rect.left;\n    const relativeX = (clientX / rect.width) * 400;\n\n    let closestIdx = 0;\n    let closestDist = Infinity;\n    points.forEach((pt, i) => {\n      const dist = Math.abs(pt.x - relativeX);\n      if (dist < closestDist) {\n        closestDist = dist;\n        closestIdx = i;\n      }\n    });\n\n    setHoverIndex(closestIdx);\n  };\n\n  const handleCopyStat = (e: React.MouseEvent, val: string, id: string) => {\n    e.stopPropagation();\n    copyToClipboard(val);\n    setCopiedId(id);\n    setTimeout(() => setCopiedId(null), 2000);\n  };\n\n  const renderTrendIcon = (delta: MetricDelta) => {\n    if (delta.trend === 'up') return <TrendingUp className=\"w-3 h-3\" />;\n    if (delta.trend === 'down') return <TrendingDown className=\"w-3 h-3\" />;\n    return <Minus className=\"w-3 h-3\" />;\n  };\n\n  const getDeltaStyle = (delta: MetricDelta) => {\n    const isGood = delta.isPositiveGood !== false;\n    if (delta.trend === 'up') {\n      return isGood\n        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'\n        : 'bg-rose-500/10 text-rose-400 border-rose-500/20';\n    }\n    if (delta.trend === 'down') {\n      return isGood\n        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'\n        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';\n    }\n    return 'bg-[#181818] text-[#888888] border-[#252525]';\n  };\n\n  const getStatusIndicator = (status?: 'normal' | 'warning' | 'critical') => {\n    switch (status) {\n      case 'critical':\n        return <span className=\"w-2 h-2 rounded-full bg-rose-500 animate-ping\" />;\n      case 'warning':\n        return <span className=\"w-2 h-2 rounded-full bg-amber-400\" />;\n      case 'normal':\n      default:\n        return <span className=\"w-2 h-2 rounded-full bg-emerald-400\" />;\n    }\n  };\n\n  const hoveredPoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;\n\n  return (\n    <div\n      role=\"region\"\n      aria-label=\"Developer telemetry and metrics HUD\"\n      className={cn(\n        'w-full rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] p-3.5 sm:p-5 text-[#F5F5F5] overflow-hidden',\n        className\n      )}\n      {...props}\n    >\n      {/* HUD Header Bar: Title + Status + Time Range Switcher */}\n      <div className=\"flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#161616]\">\n        <div className=\"flex items-center gap-2.5\">\n          <div className=\"w-7 h-7 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center text-white shrink-0\">\n            <Activity className=\"w-3.5 h-3.5\" />\n          </div>\n          <div>\n            <div className=\"flex items-center gap-2\">\n              <h3 className=\"text-xs sm:text-sm font-semibold text-white\">System Telemetry HUD</h3>\n              {getStatusIndicator(activeMetric?.status)}\n            </div>\n            <p className=\"text-[10px] sm:text-[11px] text-[#737373]\">Live hardware-accelerated telemetry telemetry</p>\n          </div>\n        </div>\n\n        {/* Time Range Selector */}\n        <div className=\"flex items-center p-0.5 bg-[#121212] rounded-lg border border-[#1E1E1E]\">\n          {timeRanges.map((range) => {\n            const isSelected = selectedTimeRange === range;\n            return (\n              <button\n                key={range}\n                type=\"button\"\n                onClick={() => setSelectedTimeRange(range)}\n                className={cn(\n                  'relative py-1 px-2.5 text-[11px] font-mono rounded-md transition-colors cursor-pointer',\n                  isSelected ? 'text-white' : 'text-[#737373] hover:text-[#A1A1A1]'\n                )}\n              >\n                {isSelected && (\n                  <motion.div\n                    layoutId={`metricHudTimeTab-${hudId}`}\n                    className=\"absolute inset-0 bg-[#222222] border border-[#333333] rounded-md -z-10\"\n                    transition={motionTransitions.springSnappy}\n                  />\n                )}\n                <span>{range}</span>\n              </button>\n            );\n          })}\n        </div>\n      </div>\n\n      {/* Metrics Cards Grid */}\n      <div className=\"grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4\">\n        {metrics.map((m) => {\n          const isSelected = selectedMetricId === m.id;\n          return (\n            <div\n              key={m.id}\n              onClick={() => setSelectedMetricId(m.id)}\n              className={cn(\n                'p-3 rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between',\n                isSelected\n                  ? 'bg-[#121212] border-white/40 shadow-md shadow-black/50 ring-1 ring-white/10'\n                  : 'bg-[#0E0E0E] border-[#181818] hover:border-[#262626] hover:bg-[#101010]'\n              )}\n            >\n              <div className=\"flex items-center justify-between gap-2 mb-1.5\">\n                <span className=\"text-[11px] text-[#A1A1A1] font-medium truncate\">{m.label}</span>\n                <button\n                  type=\"button\"\n                  onClick={(e) => handleCopyStat(e, `${m.value} ${m.unit || ''}`, m.id)}\n                  className=\"text-[#606060] hover:text-white p-0.5\"\n                  title=\"Copy value\"\n                >\n                  {copiedId === m.id ? (\n                    <Check className=\"w-3 h-3 text-white\" />\n                  ) : (\n                    <Copy className=\"w-3 h-3\" />\n                  )}\n                </button>\n              </div>\n\n              <div className=\"flex items-baseline justify-between gap-2\">\n                <div className=\"flex items-baseline gap-1\">\n                  <span className=\"text-lg sm:text-xl font-bold font-mono text-white\">{m.value}</span>\n                  {m.unit && <span className=\"text-[10px] font-mono text-[#737373]\">{m.unit}</span>}\n                </div>\n\n                <span\n                  className={cn(\n                    'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border',\n                    getDeltaStyle(m.delta)\n                  )}\n                >\n                  {renderTrendIcon(m.delta)}\n                  <span>{m.delta.value}</span>\n                </span>\n              </div>\n            </div>\n          );\n        })}\n      </div>\n\n      {/* Main Interactive SVG Sparkline HUD Surface */}\n      {activeMetric && (\n        <div className=\"rounded-lg border border-[#181818] bg-[#070707] p-3 sm:p-3.5 relative\">\n          {/* Sparkline Header & Scrub value display */}\n          <div className=\"flex items-center justify-between mb-2 text-xs\">\n            <div className=\"flex items-center gap-1.5\">\n              <span className=\"font-mono text-white text-xs font-semibold\">{activeMetric.label}</span>\n              <span className=\"text-[#606060] text-[11px] font-mono\">({selectedTimeRange})</span>\n            </div>\n\n            <div className=\"text-right font-mono\">\n              {hoveredPoint ? (\n                <span className=\"text-white text-[11px] font-semibold bg-[#141414] px-2 py-0.5 rounded border border-[#222222]\">\n                  Indexed: {hoveredPoint.val.toFixed(1)} {activeMetric.unit || ''}\n                </span>\n              ) : (\n                <span className=\"text-[10px] text-[#6F6F6F]\">\n                  Hover canvas to inspect timeline values\n                </span>\n              )}\n            </div>\n          </div>\n\n          {/* SVG Sparkline Surface */}\n          <div className=\"relative w-full h-[100px] sm:h-[110px] flex items-center justify-center\">\n            <svg\n              ref={svgRef}\n              viewBox=\"0 0 400 120\"\n              className=\"w-full h-full cursor-crosshair overflow-visible\"\n              preserveAspectRatio=\"none\"\n              onMouseMove={handleMouseMove}\n              onMouseLeave={() => setHoverIndex(null)}\n            >\n              <defs>\n                <linearGradient id={`grad-${hudId}`} x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n                  <stop offset=\"0%\" stopColor=\"#FFFFFF\" stopOpacity=\"0.18\" />\n                  <stop offset=\"100%\" stopColor=\"#FFFFFF\" stopOpacity=\"0.0\" />\n                </linearGradient>\n              </defs>\n\n              {/* Area Under Curve */}\n              {areaD && <path d={areaD} fill={`url(#grad-${hudId})`} />}\n\n              {/* Stroke Path with Motion */}\n              {pathD && (\n                <motion.path\n                  d={pathD}\n                  fill=\"none\"\n                  stroke=\"#FFFFFF\"\n                  strokeWidth=\"2\"\n                  strokeLinecap=\"round\"\n                  strokeLinejoin=\"round\"\n                  initial={{ pathLength: 0 }}\n                  animate={{ pathLength: 1 }}\n                  transition={motionTransitions.springGentle}\n                />\n              )}\n\n              {/* Interactive Scrub Hover Line and Indicator Dot */}\n              {hoveredPoint && (\n                <g>\n                  {/* Vertical Guide Line */}\n                  <line\n                    x1={hoveredPoint.x}\n                    y1=\"0\"\n                    x2={hoveredPoint.x}\n                    y2=\"120\"\n                    stroke=\"#555555\"\n                    strokeWidth=\"1\"\n                    strokeDasharray=\"3 3\"\n                  />\n                  {/* Outer Pulsing Dot */}\n                  <circle\n                    cx={hoveredPoint.x}\n                    cy={hoveredPoint.y}\n                    r=\"6\"\n                    fill=\"rgba(255, 255, 255, 0.2)\"\n                  />\n                  {/* Core White Dot */}\n                  <circle\n                    cx={hoveredPoint.x}\n                    cy={hoveredPoint.y}\n                    r=\"3.5\"\n                    fill=\"#FFFFFF\"\n                    stroke=\"#000000\"\n                    strokeWidth=\"1.5\"\n                  />\n                </g>\n              )}\n            </svg>\n          </div>\n\n          {/* Min & Max Labels */}\n          <div className=\"flex items-center justify-between pt-2 border-t border-[#141414] text-[10px] font-mono text-[#555555]\">\n            <span>Min: {minVal.toFixed(1)}</span>\n            <span>Max: {maxVal.toFixed(1)}</span>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n};\n",
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
    "createdAt": "2026-08-04",
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
    "createdAt": "2026-08-06",
    "usageCode": "import { RevealCard } from \"@/components/ui/reveal-card\";\n\nexport function Demo() {\n  return (\n    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>\n      <h4>Cloud Engine</h4>\n    </RevealCard>\n  );\n}",
    "sourceCode": "import React, { useRef, useState } from 'react';\nimport { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';\nimport { cn } from '../../lib/utils';\n\nexport interface RevealCardProps {\n  children: React.ReactNode;\n  revealContent?: React.ReactNode;\n  maxTilt?: number;\n  className?: string;\n}\n\nexport const RevealCard: React.FC<RevealCardProps> = ({\n  children,\n  revealContent,\n  maxTilt = 12,\n  className,\n}) => {\n  const cardRef = useRef<HTMLDivElement>(null);\n  const [isHovered, setIsHovered] = useState(false);\n\n  const rotateX = useSpring(0, { stiffness: 260, damping: 20 });\n  const rotateY = useSpring(0, { stiffness: 260, damping: 20 });\n  const glareX = useMotionValue(50);\n  const glareY = useMotionValue(50);\n\n  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4), transparent 60%)`;\n\n  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {\n    if (!cardRef.current) return;\n    const rect = cardRef.current.getBoundingClientRect();\n    const x = e.clientX - rect.left;\n    const y = e.clientY - rect.top;\n\n    const centerX = rect.width / 2;\n    const centerY = rect.height / 2;\n\n    const rotX = ((y - centerY) / centerY) * -maxTilt;\n    const rotY = ((x - centerX) / centerX) * maxTilt;\n\n    rotateX.set(rotX);\n    rotateY.set(rotY);\n\n    glareX.set((x / rect.width) * 100);\n    glareY.set((y / rect.height) * 100);\n  };\n\n  const handleMouseLeave = () => {\n    setIsHovered(false);\n    rotateX.set(0);\n    rotateY.set(0);\n  };\n\n  return (\n    <div style={{ perspective: 1000 }} className=\"inline-block w-full\">\n      <motion.div\n        ref={cardRef}\n        onMouseMove={handleMouseMove}\n        onMouseEnter={() => setIsHovered(true)}\n        onMouseLeave={handleMouseLeave}\n        style={{\n          rotateX,\n          rotateY,\n          transformStyle: 'preserve-3d',\n        }}\n        className={cn(\n          'relative rounded-xl border border-[#1D1D1D] bg-[#0A0A0A] p-6 transition-colors duration-200 hover:border-[#2A2A2A] overflow-hidden',\n          className\n        )}\n      >\n        {/* Subtle dynamic glare overlay */}\n        {isHovered && (\n          <motion.div\n            className=\"pointer-events-none absolute -inset-px rounded-xl opacity-20\"\n            style={{\n              background: glareBackground,\n            }}\n          />\n        )}\n\n        {/* Primary Content */}\n        <div className=\"relative z-10\">{children}</div>\n\n        {/* Revealed Content on hover/interaction */}\n        {revealContent && (\n          <motion.div\n            initial={{ opacity: 0, y: 10 }}\n            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}\n            transition={{ duration: 0.2 }}\n            className=\"relative z-10 mt-4 pt-4 border-t border-[#1D1D1D]\"\n          >\n            {revealContent}\n          </motion.div>\n        )}\n      </motion.div>\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { useState } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { User, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\nimport { Button } from './Button';\nimport { Form, FormItem, FormLabel, FormControl, FormMessage, Input, Checkbox } from './Form';\n\nexport interface SignUpFormData {\n  name: string;\n  email: string;\n  password: string;\n  confirmPassword?: string;\n  agreeToTerms: boolean;\n}\n\nexport interface SignUpProps {\n  /** Card header title */\n  title?: string;\n  /** Card header description / subtitle */\n  description?: string;\n  /** Custom logo or icon displayed above title */\n  logo?: React.ReactNode;\n  /** Server error message */\n  error?: string | null;\n  /** Submission loading state */\n  isLoading?: boolean;\n  /** Form submission callback */\n  onSubmit?: (data: SignUpFormData) => void | Promise<void>;\n  /** Callback when \"Sign in\" redirect link is clicked */\n  onSignInClick?: () => void;\n  /** Show social sign-up SSO buttons */\n  showSocialSignUp?: boolean;\n  /** Callback when social login provider is clicked */\n  onSocialSignUp?: (provider: 'github' | 'google') => void;\n  /** Require password confirmation field */\n  requireConfirmPassword?: boolean;\n  /** Custom terms of service link URL or text */\n  termsText?: React.ReactNode;\n  /** Custom text for switch to sign in */\n  signInText?: string;\n  /** Additional container styling */\n  className?: string;\n}\n\nexport const SignUp: React.FC<SignUpProps> = ({\n  title = 'Create an account',\n  description = 'Join EasyUI to access components and templates',\n  logo = (\n    <div className=\"w-10 h-10 rounded-xl bg-gradient-to-tr from-[#141414] to-[#242424] border border-[#2A2A2A] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]\">\n      <Sparkles className=\"w-5 h-5 text-white\" />\n    </div>\n  ),\n  error,\n  isLoading = false,\n  onSubmit,\n  onSignInClick,\n  showSocialSignUp = true,\n  onSocialSignUp,\n  requireConfirmPassword = true,\n  termsText = (\n    <span>\n      I agree to the{' '}\n      <a href=\"#terms\" className=\"text-[#F5F5F5] underline underline-offset-2 hover:text-white\">\n        Terms of Service\n      </a>{' '}\n      and{' '}\n      <a href=\"#privacy\" className=\"text-[#F5F5F5] underline underline-offset-2 hover:text-white\">\n        Privacy Policy\n      </a>\n    </span>\n  ),\n  signInText = 'Already have an account? Sign in',\n  className,\n}) => {\n  const [name, setName] = useState('');\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const [confirmPassword, setConfirmPassword] = useState('');\n  const [agreeToTerms, setAgreeToTerms] = useState(false);\n  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});\n\n  // Password strength calculation\n  const getPasswordStrength = (pass: string) => {\n    if (!pass) return 0;\n    let score = 0;\n    if (pass.length >= 8) score += 1;\n    if (/[A-Z]/.test(pass)) score += 1;\n    if (/[0-9]/.test(pass)) score += 1;\n    if (/[^A-Za-z0-9]/.test(pass)) score += 1;\n    return score; // 0 to 4\n  };\n\n  const strength = getPasswordStrength(password);\n  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];\n\n  const validate = () => {\n    const errors: Record<string, string> = {};\n\n    if (!name.trim()) {\n      errors.name = 'Full name is required';\n    }\n\n    if (!email.trim()) {\n      errors.email = 'Email address is required';\n    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {\n      errors.email = 'Please enter a valid email address';\n    }\n\n    if (!password) {\n      errors.password = 'Password is required';\n    } else if (password.length < 8) {\n      errors.password = 'Password must be at least 8 characters';\n    }\n\n    if (requireConfirmPassword) {\n      if (!confirmPassword) {\n        errors.confirmPassword = 'Please confirm your password';\n      } else if (confirmPassword !== password) {\n        errors.confirmPassword = 'Passwords do not match';\n      }\n    }\n\n    if (!agreeToTerms) {\n      errors.terms = 'You must accept the terms and conditions';\n    }\n\n    setValidationErrors(errors);\n    return Object.keys(errors).length === 0;\n  };\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!validate()) return;\n    if (onSubmit) {\n      onSubmit({ name, email, password, confirmPassword, agreeToTerms });\n    }\n  };\n\n  return (\n    <div\n      className={cn(\n        'w-full max-w-md mx-auto rounded-2xl border border-[#1D1D1D] bg-[#0A0A0A] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300',\n        className\n      )}\n    >\n      {/* Top subtle atmospheric glow */}\n      <div\n        className=\"absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-white/5 to-transparent blur-2xl pointer-events-none\"\n        aria-hidden=\"true\"\n      />\n\n      {/* Header */}\n      <div className=\"flex flex-col items-center text-center mb-6 relative z-10\">\n        {logo && <div className=\"mb-3.5\">{logo}</div>}\n        <h2 className=\"text-xl sm:text-2xl font-semibold text-[#F5F5F5] tracking-tight\">\n          {title}\n        </h2>\n        {description && (\n          <p className=\"text-xs sm:text-sm text-[#808080] mt-1.5 leading-relaxed max-w-xs\">\n            {description}\n          </p>\n        )}\n      </div>\n\n      {/* Top Error Alert Banner */}\n      <AnimatePresence>\n        {error && (\n          <motion.div\n            initial={{ opacity: 0, y: -6, height: 0 }}\n            animate={{ opacity: 1, y: 0, height: 'auto' }}\n            exit={{ opacity: 0, y: -6, height: 0 }}\n            transition={motionTransitions.springSnappy}\n            className=\"mb-5 overflow-hidden\"\n          >\n            <div className=\"p-3 rounded-lg bg-[#1A0A0A] border border-[#3A1414] text-xs text-[#FF7A7A] flex items-center gap-2\">\n              <AlertCircle className=\"w-4 h-4 shrink-0\" />\n              <span>{error}</span>\n            </div>\n          </motion.div>\n        )}\n      </AnimatePresence>\n\n      {/* Social Sign Up Options */}\n      {showSocialSignUp && (\n        <div className=\"space-y-3 mb-5\">\n          <div className=\"grid grid-cols-2 gap-2.5\">\n            <Button\n              type=\"button\"\n              variant=\"secondary\"\n              size=\"sm\"\n              onClick={() => onSocialSignUp?.('github')}\n              className=\"w-full text-xs font-normal\"\n              leftIcon={\n                <svg className=\"w-3.5 h-3.5 fill-current\" viewBox=\"0 0 24 24\">\n                  <path d=\"M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z\" />\n                </svg>\n              }\n            >\n              GitHub\n            </Button>\n            <Button\n              type=\"button\"\n              variant=\"secondary\"\n              size=\"sm\"\n              onClick={() => onSocialSignUp?.('google')}\n              className=\"w-full text-xs font-normal\"\n              leftIcon={\n                <svg className=\"w-3.5 h-3.5 fill-current\" viewBox=\"0 0 24 24\">\n                  <path d=\"M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z\" />\n                </svg>\n              }\n            >\n              Google\n            </Button>\n          </div>\n\n          <div className=\"relative flex items-center justify-center my-4\">\n            <div className=\"border-t border-[#1D1D1D] w-full\" />\n            <span className=\"bg-[#0A0A0A] px-3 text-[10px] uppercase font-mono tracking-widest text-[#6F6F6F] absolute\">\n              Or sign up with email\n            </span>\n          </div>\n        </div>\n      )}\n\n      {/* Main Sign-Up Form */}\n      <Form onSubmit={handleSubmit} className=\"space-y-3.5\">\n        {/* Full Name */}\n        <FormItem>\n          <FormLabel required>Full Name</FormLabel>\n          <FormControl>\n            <Input\n              type=\"text\"\n              placeholder=\"Jane Doe\"\n              autoComplete=\"name\"\n              value={name}\n              onChange={(e) => {\n                setName(e.target.value);\n                if (validationErrors.name) {\n                  setValidationErrors((prev) => ({ ...prev, name: undefined }));\n                }\n              }}\n              leftIcon={<User className=\"w-3.5 h-3.5\" />}\n              error={!!validationErrors.name}\n            />\n          </FormControl>\n          <FormMessage error={validationErrors.name} />\n        </FormItem>\n\n        {/* Email Address */}\n        <FormItem>\n          <FormLabel required>Email Address</FormLabel>\n          <FormControl>\n            <Input\n              type=\"email\"\n              placeholder=\"name@company.com\"\n              autoComplete=\"email\"\n              value={email}\n              onChange={(e) => {\n                setEmail(e.target.value);\n                if (validationErrors.email) {\n                  setValidationErrors((prev) => ({ ...prev, email: undefined }));\n                }\n              }}\n              leftIcon={<Mail className=\"w-3.5 h-3.5\" />}\n              error={!!validationErrors.email}\n            />\n          </FormControl>\n          <FormMessage error={validationErrors.email} />\n        </FormItem>\n\n        {/* Password */}\n        <FormItem>\n          <FormLabel required>Password</FormLabel>\n          <FormControl>\n            <Input\n              type=\"password\"\n              placeholder=\"At least 8 characters\"\n              autoComplete=\"new-password\"\n              showPasswordToggle\n              value={password}\n              onChange={(e) => {\n                setPassword(e.target.value);\n                if (validationErrors.password) {\n                  setValidationErrors((prev) => ({ ...prev, password: undefined }));\n                }\n              }}\n              leftIcon={<Lock className=\"w-3.5 h-3.5\" />}\n              error={!!validationErrors.password}\n            />\n          </FormControl>\n\n          {/* Password Strength Indicator */}\n          {password.length > 0 && (\n            <div className=\"pt-1.5 space-y-1\">\n              <div className=\"flex gap-1 h-1\">\n                {[1, 2, 3, 4].map((step) => (\n                  <div\n                    key={step}\n                    className={cn(\n                      'flex-1 rounded-full transition-colors duration-200',\n                      strength >= step\n                        ? step === 1\n                          ? 'bg-[#FF7A7A]'\n                          : step === 2\n                          ? 'bg-[#F59E0B]'\n                          : step === 3\n                          ? 'bg-[#38BDF8]'\n                          : 'bg-[#6EE7B7]'\n                        : 'bg-[#1D1D1D]'\n                    )}\n                  />\n                ))}\n              </div>\n              <div className=\"flex justify-between items-center text-[10px] font-mono text-[#6F6F6F]\">\n                <span>Strength</span>\n                <span className=\"text-[#A1A1A1]\">{strengthLabels[strength - 1] || 'Weak'}</span>\n              </div>\n            </div>\n          )}\n          <FormMessage error={validationErrors.password} />\n        </FormItem>\n\n        {/* Confirm Password */}\n        {requireConfirmPassword && (\n          <FormItem>\n            <FormLabel required>Confirm Password</FormLabel>\n            <FormControl>\n              <Input\n                type=\"password\"\n                placeholder=\"Re-enter your password\"\n                autoComplete=\"new-password\"\n                showPasswordToggle\n                value={confirmPassword}\n                onChange={(e) => {\n                  setConfirmPassword(e.target.value);\n                  if (validationErrors.confirmPassword) {\n                    setValidationErrors((prev) => ({ ...prev, confirmPassword: undefined }));\n                  }\n                }}\n                leftIcon={<Lock className=\"w-3.5 h-3.5\" />}\n                error={!!validationErrors.confirmPassword}\n              />\n            </FormControl>\n            <FormMessage error={validationErrors.confirmPassword} />\n          </FormItem>\n        )}\n\n        {/* Terms Agreement Checkbox */}\n        <div className=\"pt-1\">\n          <Checkbox\n            label={termsText}\n            checked={agreeToTerms}\n            onChange={(e) => {\n              setAgreeToTerms(e.target.checked);\n              if (validationErrors.terms) {\n                setValidationErrors((prev) => ({ ...prev, terms: undefined }));\n              }\n            }}\n          />\n          <FormMessage error={validationErrors.terms} />\n        </div>\n\n        {/* Submit Button */}\n        <Button\n          type=\"submit\"\n          variant=\"primary\"\n          size=\"md\"\n          fullWidth\n          isLoading={isLoading}\n          loadingText=\"Creating account...\"\n          rightIcon={!isLoading ? <ArrowRight className=\"w-4 h-4\" /> : undefined}\n          className=\"mt-3\"\n        >\n          Create Account\n        </Button>\n      </Form>\n\n      {/* Secondary Action */}\n      {onSignInClick && (\n        <div className=\"mt-6 text-center pt-4 border-t border-[#141414]\">\n          <button\n            type=\"button\"\n            onClick={onSignInClick}\n            className=\"text-xs text-[#808080] hover:text-[#F5F5F5] transition-colors focus-ring rounded\"\n          >\n            {signInText}\n          </button>\n        </div>\n      )}\n    </div>\n  );\n};\n",
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
    "sourceCode": "import React, { useState, useMemo } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { Check, Minus, Search, Sparkles, Filter, ChevronDown, Info } from 'lucide-react';\nimport { cn } from '../../lib/utils';\nimport { motionTransitions } from '../../lib/motion-tokens';\n\nexport interface ComparisonPlan {\n  id: string;\n  name: string;\n  tagline: string;\n  price: string;\n  billingPeriod?: string;\n  badge?: string;\n  featured?: boolean;\n  ctaText?: string;\n  onCtaClick?: () => void;\n}\n\nexport interface ComparisonFeature {\n  id: string;\n  name: string;\n  description?: string;\n  values: Record<string, string | boolean | React.ReactNode>;\n}\n\nexport interface ComparisonCategory {\n  id: string;\n  title: string;\n  features: ComparisonFeature[];\n}\n\nexport interface SmartComparisonProps extends React.HTMLAttributes<HTMLDivElement> {\n  plans: ComparisonPlan[];\n  categories: ComparisonCategory[];\n  defaultPlanId?: string;\n  enableSearch?: boolean;\n  enableDiffFilter?: boolean;\n  className?: string;\n}\n\nexport const SmartComparison: React.FC<SmartComparisonProps> = ({\n  plans = [],\n  categories = [],\n  defaultPlanId,\n  enableSearch = true,\n  enableDiffFilter = true,\n  className,\n  ...props\n}) => {\n  const [selectedPlanId, setSelectedPlanId] = useState<string>(\n    defaultPlanId || (plans.find((p) => p.featured)?.id || plans[0]?.id || '')\n  );\n  const [searchQuery, setSearchQuery] = useState('');\n  const [diffOnly, setDiffOnly] = useState(false);\n  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());\n  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);\n\n  const toggleCategory = (catId: string) => {\n    setCollapsedCategories((prev) => {\n      const next = new Set(prev);\n      if (next.has(catId)) next.delete(catId);\n      else next.add(catId);\n      return next;\n    });\n  };\n\n  // Filter categories and features\n  const filteredCategories = useMemo(() => {\n    const isFeatureDifferentiated = (feat: ComparisonFeature) => {\n      if (plans.length <= 1) return true;\n      const firstVal = JSON.stringify(feat.values[plans[0].id]);\n      for (let i = 1; i < plans.length; i++) {\n        if (JSON.stringify(feat.values[plans[i].id]) !== firstVal) {\n          return true;\n        }\n      }\n      return false;\n    };\n\n    return categories\n      .map((cat) => {\n        const matchingFeatures = cat.features.filter((feat) => {\n          const matchSearch =\n            !searchQuery.trim() ||\n            feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||\n            (feat.description && feat.description.toLowerCase().includes(searchQuery.toLowerCase()));\n\n          const matchDiff = !diffOnly || isFeatureDifferentiated(feat);\n\n          return matchSearch && matchDiff;\n        });\n\n        return {\n          ...cat,\n          features: matchingFeatures,\n        };\n      })\n      .filter((cat) => cat.features.length > 0);\n  }, [categories, searchQuery, diffOnly, plans]);\n\n  const renderValueCell = (value: string | boolean | React.ReactNode) => {\n    if (typeof value === 'boolean') {\n      return value ? (\n        <span className=\"inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white border border-white/20\">\n          <Check className=\"w-3 h-3\" />\n        </span>\n      ) : (\n        <span className=\"inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#121212] text-[#555555]\">\n          <Minus className=\"w-3 h-3\" />\n        </span>\n      );\n    }\n\n    if (typeof value === 'string') {\n      return <span className=\"text-xs font-mono text-[#D4D4D4]\">{value}</span>;\n    }\n\n    return value;\n  };\n\n  return (\n    <div\n      role=\"region\"\n      aria-label=\"Feature and plan comparison\"\n      className={cn(\n        'w-full rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] p-3.5 sm:p-5 text-[#F5F5F5] overflow-hidden',\n        className\n      )}\n      {...props}\n    >\n      {/* Controls Bar: Search + Diff Filter Toggle + Mobile Plan Switcher */}\n      <div className=\"flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#181818]\">\n        <div className=\"flex items-center gap-3\">\n          {enableSearch && (\n            <div className=\"relative flex-1 sm:w-64\">\n              <Search className=\"w-3.5 h-3.5 text-[#606060] absolute left-3 top-1/2 -translate-y-1/2\" />\n              <input\n                type=\"text\"\n                value={searchQuery}\n                onChange={(e) => setSearchQuery(e.target.value)}\n                placeholder=\"Filter capabilities...\"\n                className=\"w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#0E0E0E] border border-[#202020] text-[#F5F5F5] placeholder-[#606060] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white\"\n              />\n            </div>\n          )}\n\n          {enableDiffFilter && (\n            <button\n              type=\"button\"\n              onClick={() => setDiffOnly((prev) => !prev)}\n              className={cn(\n                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer shrink-0',\n                diffOnly\n                  ? 'bg-white text-black border-white'\n                  : 'bg-[#0E0E0E] text-[#808080] border-[#202020] hover:text-white hover:border-[#303030]'\n              )}\n            >\n              <Filter className=\"w-3 h-3\" />\n              <span>Differences only</span>\n            </button>\n          )}\n        </div>\n\n        {/* Mobile Plan Switcher Segment */}\n        <div className=\"sm:hidden flex items-center p-1 bg-[#121212] rounded-xl border border-[#1E1E1E]\">\n          {plans.map((p) => {\n            const isSelected = selectedPlanId === p.id;\n            return (\n              <button\n                key={p.id}\n                type=\"button\"\n                onClick={() => setSelectedPlanId(p.id)}\n                className={cn(\n                  'relative flex-1 py-1.5 px-2 text-xs font-medium text-center rounded-lg transition-colors cursor-pointer',\n                  isSelected ? 'text-white' : 'text-[#737373] hover:text-[#A1A1A1]'\n                )}\n              >\n                {isSelected && (\n                  <motion.div\n                    layoutId=\"smartComparisonMobileTab\"\n                    className=\"absolute inset-0 bg-[#222222] border border-[#333333] rounded-lg -z-10\"\n                    transition={motionTransitions.springSnappy}\n                  />\n                )}\n                <span>{p.name}</span>\n              </button>\n            );\n          })}\n        </div>\n      </div>\n\n      {/* Plans Header Row */}\n      <div className=\"grid grid-cols-1 sm:grid-cols-4 gap-4 pb-6 border-b border-[#181818]\">\n        {/* Left Column Label spacer */}\n        <div className=\"hidden sm:flex flex-col justify-end\">\n          <span className=\"text-[11px] font-mono uppercase tracking-widest text-[#737373]\">\n            Feature Matrix\n          </span>\n          <span className=\"text-xs text-[#A1A1A1] mt-0.5\">\n            {categories.reduce((acc, c) => acc + c.features.length, 0)} specifications\n          </span>\n        </div>\n\n        {/* Plan Cards */}\n        {plans.map((plan) => {\n          const isMobileActive = selectedPlanId === plan.id;\n          return (\n            <div\n              key={plan.id}\n              onClick={() => setSelectedPlanId(plan.id)}\n              className={cn(\n                'relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between',\n                isMobileActive ? 'block' : 'hidden sm:flex',\n                plan.featured\n                  ? 'bg-gradient-to-b from-[#141414] to-[#0A0A0A] border-white/30 shadow-lg shadow-black/60'\n                  : 'bg-[#0E0E0E] border-[#1C1C1C] hover:border-[#282828]'\n              )}\n            >\n              {plan.badge && (\n                <span className=\"absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white text-black font-semibold shadow-sm\">\n                  {plan.badge}\n                </span>\n              )}\n\n              <div>\n                <div className=\"flex items-center justify-between gap-2 mb-1\">\n                  <h3 className=\"text-sm font-semibold text-white flex items-center gap-1.5\">\n                    {plan.name}\n                    {plan.featured && <Sparkles className=\"w-3.5 h-3.5 text-white\" />}\n                  </h3>\n                </div>\n                <p className=\"text-[11px] text-[#737373] mb-3 leading-snug\">{plan.tagline}</p>\n              </div>\n\n              <div>\n                <div className=\"flex items-baseline gap-1 mb-3\">\n                  <span className=\"text-xl font-bold font-mono text-white tracking-tight\">\n                    {plan.price}\n                  </span>\n                  {plan.billingPeriod && (\n                    <span className=\"text-[10px] font-mono text-[#6F6F6F]\">\n                      /{plan.billingPeriod}\n                    </span>\n                  )}\n                </div>\n\n                <button\n                  type=\"button\"\n                  onClick={(e) => {\n                    e.stopPropagation();\n                    plan.onCtaClick?.();\n                  }}\n                  className={cn(\n                    'w-full py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white',\n                    plan.featured\n                      ? 'bg-white text-black hover:bg-[#E5E5E5] font-semibold'\n                      : 'bg-[#181818] hover:bg-[#202020] text-[#D4D4D4] hover:text-white border border-[#262626]'\n                  )}\n                >\n                  {plan.ctaText || 'Get Started'}\n                </button>\n              </div>\n            </div>\n          );\n        })}\n      </div>\n\n      {/* Comparison Rows Grouped by Category */}\n      <div className=\"divide-y divide-[#141414]\">\n        {filteredCategories.length === 0 ? (\n          <div className=\"py-12 text-center text-xs text-[#737373]\">\n            No features match your current search or difference filters.\n          </div>\n        ) : (\n          filteredCategories.map((category) => {\n            const isCollapsed = collapsedCategories.has(category.id);\n\n            return (\n              <div key={category.id} className=\"py-3\">\n                {/* Category Header Accordion */}\n                <button\n                  type=\"button\"\n                  onClick={() => toggleCategory(category.id)}\n                  className=\"w-full flex items-center justify-between py-2 text-left group cursor-pointer focus-visible:outline-none\"\n                >\n                  <span className=\"text-xs font-semibold uppercase tracking-wider text-white group-hover:text-white/80 transition-colors flex items-center gap-2\">\n                    <span className=\"w-1.5 h-1.5 rounded-full bg-white/70\" />\n                    {category.title}\n                  </span>\n                  <motion.div\n                    animate={{ rotate: isCollapsed ? -90 : 0 }}\n                    transition={{ duration: 0.15 }}\n                    className=\"text-[#606060] group-hover:text-white\"\n                  >\n                    <ChevronDown className=\"w-4 h-4\" />\n                  </motion.div>\n                </button>\n\n                {/* Features in Category */}\n                <AnimatePresence initial={false}>\n                  {!isCollapsed && (\n                    <motion.div\n                      initial={{ opacity: 0, height: 0 }}\n                      animate={{ opacity: 1, height: 'auto' }}\n                      exit={{ opacity: 0, height: 0 }}\n                      transition={motionTransitions.springGentle}\n                      className=\"overflow-hidden space-y-1 pt-1\"\n                    >\n                      {category.features.map((feat) => (\n                        <div\n                          key={feat.id}\n                          className=\"grid grid-cols-1 sm:grid-cols-4 gap-4 py-2.5 px-2 rounded-lg hover:bg-[#0E0E0E] transition-colors items-center text-xs\"\n                        >\n                          {/* Feature Name & Info */}\n                          <div className=\"flex items-center gap-1.5 min-w-0 pr-2\">\n                            <span className=\"text-xs text-[#CCCCCC] font-normal truncate\">\n                              {feat.name}\n                            </span>\n                            {feat.description && (\n                              <div className=\"relative\">\n                                <button\n                                  type=\"button\"\n                                  onMouseEnter={() => setActiveTooltip(feat.id)}\n                                  onMouseLeave={() => setActiveTooltip(null)}\n                                  onClick={() =>\n                                    setActiveTooltip((prev) => (prev === feat.id ? null : feat.id))\n                                  }\n                                  className=\"text-[#606060] hover:text-[#A1A1A1] cursor-pointer\"\n                                  aria-label={`Info about ${feat.name}`}\n                                >\n                                  <Info className=\"w-3 h-3\" />\n                                </button>\n\n                                {activeTooltip === feat.id && (\n                                  <div className=\"absolute left-0 bottom-full mb-1 z-30 w-48 p-2 rounded-lg bg-[#141414] border border-[#282828] text-[10px] text-[#A1A1A1] shadow-xl backdrop-blur-md\">\n                                    {feat.description}\n                                  </div>\n                                )}\n                              </div>\n                            )}\n                          </div>\n\n                          {/* Plan Values */}\n                          {plans.map((plan) => {\n                            const isMobileActive = selectedPlanId === plan.id;\n                            return (\n                              <div\n                                key={plan.id}\n                                className={cn(\n                                  'sm:flex sm:justify-center items-center',\n                                  isMobileActive ? 'flex justify-between py-1' : 'hidden sm:flex'\n                                )}\n                              >\n                                <span className=\"sm:hidden text-[11px] font-mono text-[#737373]\">\n                                  {plan.name}:\n                                </span>\n                                <div>{renderValueCell(feat.values[plan.id])}</div>\n                              </div>\n                            );\n                          })}\n                        </div>\n                      ))}\n                    </motion.div>\n                  )}\n                </AnimatePresence>\n              </div>\n            );\n          })\n        )}\n      </div>\n    </div>\n  );\n};\n",
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
    "createdAt": "2026-08-15",
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
