import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, Terminal, Code2, Sparkles, ShieldCheck, Eye, Layers } from 'lucide-react';
import type { EasyComponentMeta } from '../../types/component';
import { motionTransitions } from '../../lib/motion-tokens';
import { copyToClipboard } from '../../lib/utils';
import { MagneticButton } from '../ui/MagneticButton';
import { SpotlightCard } from '../ui/SpotlightCard';
import { ExpandableSearch } from '../ui/ExpandableSearch';
import { AnimatedTabs } from '../ui/AnimatedTabs';
import { FloatingActionDock } from '../ui/FloatingActionDock';
import { RevealCard } from '../ui/RevealCard';
import { SmoothAccordion } from '../ui/SmoothAccordion';
import { NotificationStack } from '../ui/NotificationStack';
import { MorphingDialog } from '../ui/MorphingDialog';
import { DotField } from '../ui/DotField';
import { InteractiveTimeline } from '../ui/InteractiveTimeline';
import { SmartComparison } from '../ui/SmartComparison';
import { ActivityFeed } from '../ui/ActivityFeed';
import { MetricHUD } from '../ui/MetricHUD';
import { CodeSnippetDeck } from '../ui/CodeSnippetDeck';
import { GlassNavbar } from '../ui/GlassNavbar';
import { Button } from '../ui/Button';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  Input,
  Select,
  Checkbox,
  Switch,
} from '../ui/Form';
import { Login } from '../ui/Login';
import { SignUp } from '../ui/SignUp';
import { FAQ } from '../ui/FAQ';
import { EASY_COMPONENTS } from '../registry/components-data';
import { getRelatedComponents } from '../../lib/seo';

export interface ComponentDetailModalProps {
  component: EasyComponentMeta | null;
  onClose: () => void;
  onSelectComponent?: (id: string) => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  component,
  onClose,
  onSelectComponent,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'install' | 'usage' | 'source' | 'api' | 'a11y'>('preview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (component) {
      setActiveTab('preview');
    }
  }, [component]);

  useEffect(() => {
    if (!component) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [component, onClose]);

  if (!component) return null;

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderInteractiveDemo = () => {
    switch (component.id) {
      case 'interactive-timeline':
        return (
          <div className="w-full">
            <InteractiveTimeline
              items={[
                {
                  id: 'step-1',
                  title: 'Build & Tree-Shaking Verification',
                  timestamp: '10:42 AM · 48s',
                  status: 'completed',
                  tag: 'CI/CD',
                  commitHash: '9f8a12bc',
                  description: 'Production bundle analyzed with zero unreferenced dead code. All chunks under budget.',
                  metrics: [
                    { label: 'Bundle Size', value: '142 KB' },
                    { label: 'Tree Shake', value: '99.4%' },
                    { label: 'Chunks', value: '8 total' },
                  ],
                  author: { name: 'Alex Rivera', role: 'Staff Eng' },
                },
                {
                  id: 'step-2',
                  title: 'Global Edge Layer Replication',
                  timestamp: '10:43 AM · In Progress',
                  status: 'in-progress',
                  tag: 'Infra',
                  commitHash: 'a81d4e77',
                  description: 'Replicating immutable build layers across 32 regional edge locations worldwide.',
                  metrics: [
                    { label: 'Active Edge Nodes', value: '28 / 32' },
                    { label: 'Edge Latency', value: '12 ms' },
                  ],
                  author: { name: 'Infra Bot', role: 'Automated' },
                },
                {
                  id: 'step-3',
                  title: 'Synthetic Canary Smoke Suite',
                  timestamp: 'Pending · 120s est',
                  status: 'pending',
                  tag: 'QA',
                  description: 'Executes 400 parallel headless browser journeys verifying checkout, auth, and webhooks.',
                },
                {
                  id: 'step-4',
                  title: 'Atomic DNS Traffic Cutover',
                  timestamp: 'Pending',
                  status: 'pending',
                  tag: 'DNS',
                  description: 'Zero-downtime blue/green routing switch to the freshly certified edge release.',
                },
              ]}
              defaultSelectedId="step-2"
            />
          </div>
        );
      case 'smart-comparison':
        return (
          <div className="w-full">
            <SmartComparison
              plans={[
                {
                  id: 'hobby',
                  name: 'Hobby',
                  tagline: 'Ideal for prototyping & indie hackers',
                  price: '$0',
                  billingPeriod: 'mo',
                  ctaText: 'Deploy Free',
                },
                {
                  id: 'pro',
                  name: 'Pro Team',
                  tagline: 'High concurrency & edge bandwidth',
                  price: '$29',
                  billingPeriod: 'mo',
                  featured: true,
                  badge: 'Popular',
                  ctaText: 'Start 14-Day Trial',
                },
                {
                  id: 'enterprise',
                  name: 'Enterprise',
                  tagline: 'Dedicated compliance & custom SLAs',
                  price: '$249',
                  billingPeriod: 'mo',
                  ctaText: 'Contact Sales',
                },
              ]}
              categories={[
                {
                  id: 'compute',
                  title: 'Compute & Edge Performance',
                  features: [
                    {
                      id: 'concurrency',
                      name: 'Serverless Concurrency',
                      description: 'Simultaneous function invocations across regions',
                      values: { hobby: '10 nodes', pro: '250 nodes', enterprise: 'Unlimited' },
                    },
                    {
                      id: 'edge_routes',
                      name: 'Global Edge Routing',
                      description: 'Low-latency routing from 300+ PoPs worldwide',
                      values: { hobby: false, pro: true, enterprise: true },
                    },
                    {
                      id: 'warm_standby',
                      name: '0ms Cold Start Standby',
                      description: 'Keeps microVMs warm in background',
                      values: { hobby: false, pro: false, enterprise: true },
                    },
                  ],
                },
                {
                  id: 'security',
                  title: 'Security & Governance',
                  features: [
                    {
                      id: 'sso',
                      name: 'SAML / Okta SSO',
                      description: 'Enterprise identity provider federation',
                      values: { hobby: false, pro: true, enterprise: true },
                    },
                    {
                      id: 'audit_logs',
                      name: 'Immutable Audit Logs',
                      description: 'Cryptographically verified audit trail retention',
                      values: { hobby: '7 days', pro: '90 days', enterprise: '7 years' },
                    },
                    {
                      id: 'custom_domains',
                      name: 'Custom SSL Domains',
                      values: { hobby: '3', pro: '50', enterprise: 'Unlimited' },
                    },
                  ],
                },
              ]}
            />
          </div>
        );
      case 'activity-feed':
        return (
          <div className="w-full">
            <ActivityFeed
              events={[
                {
                  id: 'evt-1',
                  type: 'deploy',
                  status: 'success',
                  title: 'Production release v2.4.0 verified',
                  timestamp: '2 mins ago',
                  duration: '380ms',
                  traceId: 'trc_98fa20',
                  description: 'All 32 edge clusters updated. Zero errors encountered.',
                  actor: { name: 'CI Pipeline', email: 'ci@easyui.dev' },
                  payload: { version: '2.4.0', sha: '8f3b2a', regions: ['iad1', 'sfo1', 'fra1'] },
                },
                {
                  id: 'evt-2',
                  type: 'security',
                  status: 'warning',
                  title: 'Token rotation required for API key',
                  timestamp: '14 mins ago',
                  duration: '12ms',
                  traceId: 'trc_77b31c',
                  description: 'Secret key has exceeded 90-day recommended rotation window.',
                  actor: { name: 'Security Guard' },
                  payload: { keyId: 'key_prod_8819', ageDays: 92, action: 'notify' },
                },
                {
                  id: 'evt-3',
                  type: 'api',
                  status: 'success',
                  title: 'POST /v1/chat/completions 200 OK',
                  timestamp: '28 mins ago',
                  duration: '22ms',
                  traceId: 'trc_55e10a',
                  description: 'Streaming token generation handled with 0.12s first-byte latency.',
                  actor: { name: 'External Client' },
                  payload: { model: 'easy-4o', promptTokens: 140, completionTokens: 420 },
                },
                {
                  id: 'evt-4',
                  type: 'system',
                  status: 'info',
                  title: 'Automatic DB snapshot created',
                  timestamp: '1 hour ago',
                  duration: '4.2s',
                  traceId: 'trc_12a98f',
                  description: 'Encrypted backup stored in multi-AZ cold storage.',
                },
              ]}
              enableLiveSimulation={true}
            />
          </div>
        );
      case 'metric-hud':
        return (
          <div className="w-full">
            <MetricHUD
              metrics={[
                {
                  id: 'latency',
                  label: 'p99 API Latency',
                  value: '14.2',
                  unit: 'ms',
                  delta: { value: '-18.4%', trend: 'down', isPositiveGood: true },
                  status: 'normal',
                  timeSeries: {
                    '1h': [18, 17, 16.5, 15, 14.8, 14.2],
                    '24h': [26, 24, 21, 19, 18, 16, 14.2],
                    '7d': [34, 31, 28, 24, 20, 16, 14.2],
                    '30d': [45, 38, 32, 28, 22, 18, 14.2],
                  },
                },
                {
                  id: 'throughput',
                  label: 'Global Throughput',
                  value: '84.5k',
                  unit: 'req/s',
                  delta: { value: '+12.1%', trend: 'up', isPositiveGood: true },
                  status: 'normal',
                  timeSeries: {
                    '1h': [62, 68, 72, 75, 81, 84.5],
                    '24h': [40, 52, 65, 74, 80, 84.5],
                    '7d': [30, 45, 60, 70, 78, 84.5],
                    '30d': [20, 35, 50, 65, 75, 84.5],
                  },
                },
                {
                  id: 'errors',
                  label: 'Error Rate',
                  value: '0.002',
                  unit: '%',
                  delta: { value: '-0.04%', trend: 'down', isPositiveGood: true },
                  status: 'normal',
                  timeSeries: {
                    '1h': [0.008, 0.006, 0.005, 0.003, 0.002],
                    '24h': [0.012, 0.009, 0.006, 0.004, 0.002],
                    '7d': [0.02, 0.015, 0.01, 0.005, 0.002],
                    '30d': [0.05, 0.03, 0.018, 0.008, 0.002],
                  },
                },
              ]}
              defaultTimeRange="24h"
            />
          </div>
        );
      case 'code-snippet-deck':
        return (
          <div className="w-full">
            <CodeSnippetDeck
              snippets={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  filename: 'client.ts',
                  highlightLines: [4, 5],
                  code: (p) => `import { EasyClient } from "@easyui/sdk";

// Initialize resilient client
const client = new EasyClient({
  apiKey: "${p.apiKey || 'sk_live_9981'}",
  environment: "${p.env || 'production'}",
  streaming: ${p.stream ? 'true' : 'false'},
});

// Stream AI generation with zero layout shift
const completion = await client.completions.create({
  model: "easy-4o",
  prompt: "Synthesize dark UI telemetry dashboard",
});`,
                },
                {
                  language: 'curl',
                  label: 'cURL',
                  filename: 'stream.sh',
                  highlightLines: [2],
                  code: (p) => `curl -X POST https://api.easyui.dev/v1/completions \\
  -H "Authorization: Bearer ${p.apiKey || 'sk_live_9981'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "easy-4o",
    "environment": "${p.env || 'production'}",
    "stream": ${p.stream ? 'true' : 'false'}
  }'`,
                },
                {
                  language: 'python',
                  label: 'Python',
                  filename: 'app.py',
                  highlightLines: [3, 4],
                  code: (p) => `from easyui import EasyClient

client = EasyClient(
    api_key="${p.apiKey || 'sk_live_9981'}",
    environment="${p.env || 'production'}"
)

stream = client.completions.create(
    model="easy-4o",
    prompt="Synthesize dark UI telemetry dashboard",
    stream=${p.stream ? 'True' : 'False'}
)
for chunk in stream:
    print(chunk.text, end="")`,
                },
                {
                  language: 'go',
                  label: 'Go',
                  filename: 'main.go',
                  code: (p) => `package main

import (
    "context"
    "fmt"
    "github.com/easyui/sdk-go"
)

func main() {
    client := easyui.NewClient("${p.apiKey || 'sk_live_9981'}")
    resp, err := client.Completions.Create(context.Background(), &easyui.CompletionParams{
        Model:  "easy-4o",
        Stream: ${p.stream ? 'true' : 'false'},
    })
    if err != nil {
        panic(err)
    }
    fmt.Println(resp.Text)
}`,
                },
              ]}
              parameters={[
                { id: 'stream', label: 'Stream response', type: 'boolean', defaultValue: true },
                {
                  id: 'env',
                  label: 'Environment',
                  type: 'select',
                  defaultValue: 'production',
                  options: ['production', 'staging', 'development'],
                },
                { id: 'apiKey', label: 'API Key', type: 'text', defaultValue: 'sk_live_prod_9981' },
              ]}
              defaultLanguage="typescript"
            />
          </div>
        );
      case 'magnetic-button':
        return (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <MagneticButton variant="primary" size="lg" strength={0.4}>
              <span>Magnetic Button</span>
              <Sparkles className="w-4 h-4 text-[#ECECEC]" />
            </MagneticButton>
            <p className="text-xs text-[#6F6F6F]">Hover cursor around the button to test proximity pull</p>
          </div>
        );
      case 'spotlight-card':
        return (
          <div className="py-8 flex justify-center">
            <SpotlightCard className="max-w-md w-full p-6 bg-[#0E0E0E]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-white" />
                <h4 className="text-sm font-semibold text-[#F5F5F5]">Spotlight Shader</h4>
              </div>
              <p className="text-xs text-[#808080] leading-relaxed mb-4">
                Pointer-aware radial illumination calculating Euclidean coordinates in real time.
              </p>
              <div className="p-3 rounded-lg bg-[#141414] border border-[#222222] text-xs font-mono text-[#A1A1A1]">
                Coordinates: Hardware Accelerated
              </div>
            </SpotlightCard>
          </div>
        );
      case 'expandable-search':
        return (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <ExpandableSearch placeholder="Search components, tokens..." />
            <p className="text-xs text-[#6F6F6F]">Click input or focus to test smooth width expansion</p>
          </div>
        );
      case 'animated-tabs':
        return (
          <div className="py-8 flex flex-col items-center justify-center">
            <AnimatedTabs
              tabs={[
                { id: 'tab1', label: 'Overview', content: <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">Overview metrics & telemetry</div> },
                { id: 'tab2', label: 'Integration', content: <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">Next.js App Router setup</div> },
                { id: 'tab3', label: 'Security', content: <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">Zero external runtime network dependencies</div> },
              ]}
              defaultTab="tab1"
            />
          </div>
        );
      case 'floating-action-dock':
      case 'floating-dock':
        return (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <FloatingActionDock
              items={[
                { id: '1', label: 'VS Code', icon: <Code2 /> },
                { id: '2', label: 'Terminal', icon: <Terminal /> },
                { id: '3', label: 'AI Pilot', icon: <Sparkles /> },
                { id: '4', label: 'Security', icon: <ShieldCheck /> },
              ]}
              activeId="1"
            />
            <p className="text-xs text-[#6F6F6F]">Hover icons to test continuous magnification curve</p>
          </div>
        );
      case 'reveal-card':
        return (
          <div className="py-8 flex justify-center">
            <RevealCard
              revealContent={
                <div className="text-xs text-white space-y-1">
                  <div>✓ Latency: 0.12ms</div>
                  <div>✓ Region: us-east-1</div>
                </div>
              }
              className="max-w-sm w-full p-6 bg-[#0E0E0E]"
            >
              <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1">Interactive 3D Tilt</h4>
              <p className="text-xs text-[#808080]">Hover cursor to rotate perspective and reveal telemetry.</p>
            </RevealCard>
          </div>
        );
      case 'smooth-accordion':
        return (
          <div className="py-6 max-w-md mx-auto">
            <SmoothAccordion
              items={[
                { id: '1', title: 'Zero Layout Jank', content: 'Framer motion spring dynamics calculate natural content height interpolation.' },
                { id: '2', title: 'TypeScript Friendly', content: 'Fully typed props with strict accessibility compliance.' },
              ]}
              defaultOpen={['1']}
            />
          </div>
        );
      case 'notification-stack':
        return (
          <div className="py-6 flex justify-center">
            <NotificationStack maxVisible={3} />
          </div>
        );
      case 'morphing-dialog':
        return (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <MorphingDialog
              id="detail-morph"
              title="Authentication Settings"
              subtitle="Configure multi-factor tokens and OAuth2 providers."
              trigger={(open) => (
                <button
                  onClick={open}
                  className="px-5 py-2.5 rounded-xl bg-[#161616] border border-[#2A2A2A] hover:border-[#383838] text-xs font-medium text-[#F5F5F5] transition-all"
                >
                  Open Morphing Dialog
                </button>
              )}
            >
              <div className="p-4 rounded-xl bg-[#141414] border border-[#222222] text-xs text-[#A1A1A1]">
                Continuous layoutId expansion without jarring modal popping.
              </div>
            </MorphingDialog>
            <p className="text-xs text-[#6F6F6F]">Click trigger to see smooth shared layout transition</p>
          </div>
        );
      case 'command-menu':
        return (
          <div className="py-10 text-center">
            <p className="text-xs text-[#A1A1A1] mb-3">Press <kbd className="px-1.5 py-0.5 rounded bg-[#181818] border border-[#262626] font-mono text-white">⌘K</kbd> anywhere on the page to open.</p>
          </div>
        );
      case 'glass-navbar':
        return (
          <div className="py-6 w-full space-y-4">
            <div className="p-4 rounded-xl bg-[#070707] border border-[#1C1C1C] overflow-hidden">
              <p className="text-[11px] font-mono text-[#737373] mb-3 uppercase tracking-wider">
                Interactive Glass Navbar Demo (Responsive & Spring Physics)
              </p>
              <div className="relative py-2">
                <GlassNavbar
                  variant="floating"
                  sticky={false}
                  items={[
                    { label: 'Platform', href: '#platform' },
                    { label: 'Components', href: '#components', badge: 'New' },
                    { label: 'Showcase', href: '#showcase' },
                    { label: 'Documentation', href: '#docs' },
                  ]}
                  cta={
                    <button
                      type="button"
                      onClick={() => alert('CTA clicked!')}
                      className="px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium hover:bg-white transition-colors shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    >
                      Deploy Now
                    </button>
                  }
                />
              </div>
            </div>
            <p className="text-xs text-center text-[#6F6F6F]">
              Hover items to test spotlight cursor pill. Resize screen or click hamburger on mobile to test spring drawer.
            </p>
          </div>
        );
      case 'button':
        return (
          <div className="py-6 w-full space-y-6 max-w-xl mx-auto">
            <div className="p-5 rounded-xl bg-[#090909] border border-[#1D1D1D] space-y-4">
              <div className="text-xs font-semibold text-[#F5F5F5]">Visual Variants</div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="gradient">Gradient</Button>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#090909] border border-[#1D1D1D] space-y-4">
              <div className="text-xs font-semibold text-[#F5F5F5]">Sizes & Interactive Loading</div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="primary">Small (sm)</Button>
                <Button size="md" variant="primary">Medium (md)</Button>
                <Button size="lg" variant="primary">Large (lg)</Button>
                <Button
                  size="md"
                  variant="secondary"
                  isLoading={true}
                  loadingText="Processing..."
                >
                  Loading
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Sparkles"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-center text-[#6F6F6F]">
              Click buttons to experience Framer Motion springSnappy tap feedback (0.97 scale).
            </p>
          </div>
        );
      case 'form':
        return (
          <div className="py-4 max-w-md mx-auto w-full">
            <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#1D1D1D] space-y-4">
              <div className="text-sm font-semibold text-white">Interactive Form System</div>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Form submitted successfully!');
                }}
                className="space-y-4"
              >
                <FormItem>
                  <FormLabel required>Project Name</FormLabel>
                  <FormControl>
                    <Input defaultValue="EasyUI Studio" placeholder="Enter project name" />
                  </FormControl>
                  <FormDescription>Visible across your team members.</FormDescription>
                </FormItem>

                <FormItem>
                  <FormLabel>Deployment Region</FormLabel>
                  <FormControl>
                    <Select
                      options={[
                        { value: 'us-east', label: 'US East (N. Virginia)' },
                        { value: 'eu-central', label: 'EU Central (Frankfurt)' },
                        { value: 'ap-southeast', label: 'Asia Pacific (Tokyo)' },
                      ]}
                    />
                  </FormControl>
                </FormItem>

                <div className="pt-1 space-y-3 border-t border-[#161616]">
                  <Checkbox label="Enable Edge Caching" defaultChecked />
                  <Switch label="Automatic TLS Certificates" defaultChecked />
                </div>

                <Button type="submit" variant="primary" fullWidth className="mt-2">
                  Save Configuration
                </Button>
              </Form>
            </div>
          </div>
        );
      case 'login':
        return (
          <div className="py-4 flex justify-center w-full">
            <Login
              onSubmit={(data) => {
                alert(`Login Attempt: ${JSON.stringify(data)}`);
              }}
              onForgotPassword={() => alert('Forgot password action')}
              onSignUpClick={() => alert('Switch to sign up')}
              onSocialLogin={(prov) => alert(`SSO provider: ${prov}`)}
            />
          </div>
        );
      case 'sign-up':
        return (
          <div className="py-4 flex justify-center w-full">
            <SignUp
              onSubmit={(data) => {
                alert(`Registration submitted: ${data.name} (${data.email})`);
              }}
              onSignInClick={() => alert('Switch to sign in')}
              onSocialSignUp={(prov) => alert(`Social sign up: ${prov}`)}
            />
          </div>
        );
      case 'faq':
        return (
          <div className="py-4 w-full max-w-2xl mx-auto">
            <FAQ
              allowMultiple={true}
              searchable={true}
              showCategories={true}
              defaultOpen={['faq-1']}
              items={[
                {
                  id: 'faq-1',
                  question: 'How do I add EasyUI components to my existing project?',
                  answer: 'You can install any component directly using the official shadcn CLI: "npx shadcn@latest add Surajmaurya1/easyui/<component-name>". The source code and required dependencies are added directly to your repository.',
                  category: 'Installation',
                  badge: 'CLI',
                },
                {
                  id: 'faq-2',
                  question: 'What makes EasyUI animations feel natural?',
                  answer: 'EasyUI uses physical spring simulations rather than standard CSS bezier ease curves. Transitions are configured with calibrated mass, damping, and stiffness tokens defined in "lib/motion-tokens.ts".',
                  category: 'Animation',
                  badge: 'Physics',
                },
                {
                  id: 'faq-3',
                  question: 'Is EasyUI compatible with React 19 and Tailwind CSS?',
                  answer: 'Yes! EasyUI components are built natively with React 19, TypeScript, and modern Tailwind CSS utility classes.',
                  category: 'Stack',
                },
              ]}
            />
          </div>
        );
      case 'dot-field':
        return (
          <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[#222222] bg-[#0A0A0A]">
            <DotField
              dotRadius={1.5}
              dotSpacing={14}
              bulgeStrength={67}
              glowRadius={160}
              sparkle={true}
              gradientFrom="rgba(255, 255, 255, 0.25)"
              gradientTo="rgba(255, 255, 255, 0.08)"
              glowColor="rgba(255, 255, 255, 0.05)"
            />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#050505]/70 border border-[#222222] text-[11px] font-mono text-[#A1A1A1] backdrop-blur-sm pointer-events-none">
              Move cursor across canvas to test repulsion & glow
            </div>
          </div>
        );
      default:
        return (
          <div className="py-12 text-center text-xs text-[#808080]">
            <p className="font-mono text-[#D4D4D4] mb-1">{component.name}</p>
            <p>{component.tagline || 'Interactive preview ready for customization.'}</p>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={component.name}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={motionTransitions.springSnappy}
        className="relative w-full max-w-4xl h-[640px] sm:h-[720px] max-h-[90vh] rounded-2xl border border-[#1C1C1C] bg-[#0A0A0A] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col z-10 overflow-hidden my-auto"
      >
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between p-5 sm:p-6 pb-4 sm:pb-5 border-b border-[#141414]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono text-white px-2 py-0.5 rounded bg-[#141414] border border-[#202020]">
                {component.category}
              </span>
              <span className="text-xs text-[#606060] font-mono">easyui/{component.id}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#F5F5F5] tracking-tight">
              {component.name}
            </h2>
            <p className="text-xs text-[#808080] mt-1.5 line-clamp-2 sm:line-clamp-none max-w-2xl leading-relaxed">
              {component.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737373] hover:text-[#F5F5F5] hover:bg-[#141414] transition-colors focus-ring cursor-pointer ml-4 shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs Bar powered by EasyUI AnimatedTabs component */}
        <div className="px-5 sm:px-6 py-3 bg-[#080808] border-b border-[#161616] flex items-center justify-start overflow-x-auto scrollbar-none">
          <AnimatedTabs
            key={`modal-tabs-${component.id}`}
            tabs={[
              { id: 'preview', label: 'Preview', icon: <Eye className="w-3.5 h-3.5" /> },
              { id: 'install', label: 'Installation', icon: <Terminal className="w-3.5 h-3.5" /> },
              { id: 'usage', label: 'Usage', icon: <Code2 className="w-3.5 h-3.5" /> },
              { id: 'source', label: 'Source', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'api', label: 'Props API', icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'a11y', label: 'Accessibility', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            ]}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId as any)}
            renderContent={false}
            layoutId={`modal-animated-tabs-indicator-${component.id}`}
          />
        </div>

        {/* Modal Body Content (Consistent stable viewport) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-xs space-y-6">
          {/* TAB 1: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-5">
              <div className="rounded-xl border border-[#1A1A1A] bg-[#070707] bg-dot-subtle min-h-[220px] flex items-center justify-center p-3 sm:p-5 overflow-hidden">
                <div className="w-full">
                  {renderInteractiveDemo()}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-2.5">
                  Key Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {component.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-2.5 sm:p-3 rounded-lg border border-[#1B1B1B] bg-[#0E0E0E] text-xs text-[#A1A1A1] flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTALLATION */}
          {activeTab === 'install' && (
            <div className="space-y-4">
              <p className="text-xs text-[#8E8E8E]">
                Add this component to your shadcn project via the EasyUI GitHub registry:
              </p>
              <div className="rounded-xl border border-[#1E1E1E] bg-[#090909] p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
                <span className="text-white break-all">{component.cliCommand}</span>
                <button
                  onClick={() => handleCopy(component.cliCommand, 'cli')}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1E1E1E] border border-[#222222] text-[11px] text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer shrink-0"
                >
                  {copiedCode === 'cli' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'cli' ? 'Copied' : 'Copy Command'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-[#1A1A1A] bg-[#0E0E0E] space-y-2">
                <h5 className="text-xs font-semibold text-[#F5F5F5]">Dependencies</h5>
                <p className="text-xs text-[#6F6F6F]">
                  Requires: {component.dependencies && component.dependencies.length > 0 ? (
                    component.dependencies.map((dep, idx) => (
                      <span key={dep}>
                        <code className="text-[#A1A1A1] bg-[#141414] px-1.5 py-0.5 rounded font-mono">{dep}</code>
                        {idx < component.dependencies!.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#A1A1A1]">No external npm dependencies (Tailwind CSS only)</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: USAGE */}
          {activeTab === 'usage' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8E8E8E]">Example Usage in React / Next.js:</span>
                <button
                  onClick={() => handleCopy(component.usageCode, 'usage')}
                  className="flex items-center gap-1 text-[11px] text-white hover:underline cursor-pointer"
                >
                  {copiedCode === 'usage' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'usage' ? 'Copied' : 'Copy Example'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#080808] font-mono text-xs text-[#CCCCCC] overflow-x-auto max-h-[380px] leading-relaxed">
                <code>{component.usageCode}</code>
              </pre>
            </div>
          )}

          {/* TAB 4: SOURCE */}
          {activeTab === 'source' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8E8E8E]">Full Component Source Code (TypeScript):</span>
                <button
                  onClick={() => handleCopy(component.sourceCode, 'source')}
                  className="flex items-center gap-1 text-[11px] text-white hover:underline cursor-pointer"
                >
                  {copiedCode === 'source' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'source' ? 'Copied' : 'Copy Source'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#080808] font-mono text-xs text-[#CCCCCC] overflow-x-auto max-h-[380px] leading-relaxed">
                <code>{component.sourceCode}</code>
              </pre>
            </div>
          )}

          {/* TAB 5: PROPS API */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider">
                Props & Configuration
              </h4>
              <div className="rounded-xl border border-[#1E1E1E] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121212] text-[#808080] border-b border-[#1E1E1E]">
                    <tr>
                      <th className="p-3 font-mono">Prop</th>
                      <th className="p-3 font-mono">Type</th>
                      <th className="p-3 font-mono">Default</th>
                      <th className="p-3 font-mono">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#181818] bg-[#0A0A0A]">
                    {component.props.map((p, i) => (
                      <tr key={i} className="hover:bg-[#101010]">
                        <td className="p-3 font-mono text-white font-semibold">{p.name}</td>
                        <td className="p-3 font-mono text-[#A1A1A1]">{p.type}</td>
                        <td className="p-3 font-mono text-[#6F6F6F]">{p.default || '-'}</td>
                        <td className="p-3 text-[#CCCCCC]">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: ACCESSIBILITY */}
          {activeTab === 'a11y' && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider">
                Accessibility Standard
              </h4>
              <div className="space-y-2">
                {component.accessibility.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-[#1C1C1C] bg-[#0E0E0E] text-xs text-[#CCCCCC] flex items-center gap-3"
                  >
                    <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contextually Related Components for Enhanced Discovery & Internal Linking */}
          {getRelatedComponents(component, EASY_COMPONENTS, 3).length > 0 && (
            <div className="pt-5 border-t border-[#161616] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">
                  Related Components
                </h4>
                <span className="text-[11px] text-[#555555]">Contextual Pairings</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {getRelatedComponents(component, EASY_COMPONENTS, 3).map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => {
                      if (onSelectComponent) {
                        onSelectComponent(rel.id);
                      }
                    }}
                    className="p-3 rounded-xl border border-[#1C1C1C] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#2C2C2C] text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#E5E5E5] group-hover:text-white transition-colors">
                        {rel.name}
                      </span>
                      <span className="text-[9px] font-mono text-[#8E8E8E] px-1.5 py-0.5 rounded bg-[#161616]">
                        {rel.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#707070] line-clamp-1">
                      {rel.tagline || rel.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-[#080808] border-t border-[#181818] flex items-center justify-between text-xs text-[#6F6F6F]">
          <span>EasyUI Copy & Paste Components</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1E1E1E] text-[#F5F5F5] transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
