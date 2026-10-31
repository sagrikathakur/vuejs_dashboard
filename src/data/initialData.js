export const initialColumns = [
  { id: 'backlog', title: 'Backlog', color: 'slate' },
  { id: 'todo', title: 'To Do', color: 'blue' },
  { id: 'in_progress', title: 'In Progress', color: 'amber' },
  { id: 'review', title: 'In Review', color: 'purple' },
  { id: 'done', title: 'Completed', color: 'emerald' }
];

export const initialTasks = [
  {
    id: 'ZEN-101',
    title: 'Architect distributed event bus for WebSocket telemetry',
    description: 'Design and benchmark Redis pub/sub broker to fan out real-time telemetry events to connected Vue clients with <15ms latency.',
    status: 'in_progress',
    priority: 'urgent',
    points: 8,
    assigneeId: 'user-3',
    labels: ['Architecture', 'Backend', 'Performance'],
    dueDate: '2026-11-04',
    subtasks: [
      { id: 'st-1', title: 'Draft RFC document & architecture diagram', completed: true },
      { id: 'st-2', title: 'Benchmark cluster latency under 50k conn load', completed: true },
      { id: 'st-3', title: 'Implement reconnection fallback backoff protocol', completed: false }
    ],
    comments: [
      {
        id: 'c-1',
        authorId: 'user-1',
        text: 'Benchmark looks promising! We should also verify TLS termination overhead.',
        createdAt: '2026-10-30T10:15:00Z'
      }
    ],
    createdAt: '2026-10-28T09:00:00Z'
  },
  {
    id: 'ZEN-102',
    title: 'Refactor Kanban board virtual list rendering',
    description: 'Optimize Vue 3 reactive DOM rendering when boards contain >500 cards using IntersectionObserver windowing.',
    status: 'in_progress',
    priority: 'high',
    points: 5,
    assigneeId: 'user-2',
    labels: ['Frontend', 'Vue 3', 'UX'],
    dueDate: '2026-11-06',
    subtasks: [
      { id: 'st-4', title: 'Profile DOM nodes during drag operation', completed: true },
      { id: 'st-5', title: 'Build custom composable useVirtualBoard', completed: false }
    ],
    comments: [],
    createdAt: '2026-10-29T11:30:00Z'
  },
  {
    id: 'ZEN-103',
    title: 'Migrate CI/CD pipeline to ephemeral Kubernetes runners',
    description: 'Slash build & test execution times by 45% using autoscaled GitHub action runners on GCP Spot instances.',
    status: 'review',
    priority: 'medium',
    points: 5,
    assigneeId: 'user-5',
    labels: ['DevOps', 'CI/CD', 'Cost'],
    dueDate: '2026-11-03',
    subtasks: [
      { id: 'st-6', title: 'Terraform manifests for GKE spot node pools', completed: true },
      { id: 'st-7', title: 'Wire secret manager service account tokens', completed: true }
    ],
    comments: [
      {
        id: 'c-2',
        authorId: 'user-3',
        text: 'Reviewing PR #402 right now. Terraform plan passes cleanly.',
        createdAt: '2026-10-31T08:20:00Z'
      }
    ],
    createdAt: '2026-10-27T14:10:00Z'
  },
  {
    id: 'ZEN-104',
    title: 'Design tokenized Dark Mode palette with WCAG AAA compliance',
    description: 'Create harmonious slate/indigo color tokens with 7:1 contrast ratios for data visualization charts and code snippets.',
    status: 'done',
    priority: 'medium',
    points: 3,
    assigneeId: 'user-4',
    labels: ['Design', 'Accessibility'],
    dueDate: '2026-10-30',
    subtasks: [
      { id: 'st-8', title: 'Figma tokens export to Tailwind config', completed: true },
      { id: 'st-9', title: 'Color contrast audit with Stark tool', completed: true }
    ],
    comments: [],
    createdAt: '2026-10-25T16:00:00Z'
  },
  {
    id: 'ZEN-105',
    title: 'Implement AI Copilot Sprint Assistant modal & prompts',
    description: 'Integrate intelligent prompt orchestration to automatically generate subtasks, summarize blocker risks, and compose release changelogs.',
    status: 'todo',
    priority: 'urgent',
    points: 8,
    assigneeId: 'user-1',
    labels: ['AI', 'Feature', 'Frontend'],
    dueDate: '2026-11-08',
    subtasks: [
      { id: 'st-10', title: 'Define copilot system prompts for triage & changelog', completed: false },
      { id: 'st-11', title: 'Build simulated streaming typewriter effect', completed: false }
    ],
    comments: [],
    createdAt: '2026-10-30T17:45:00Z'
  },
  {
    id: 'ZEN-106',
    title: 'Audit and tighten Content Security Policy (CSP) headers',
    description: 'Eliminate unsafe-inline scripts and enforce strict nonce validation across all edge CDN responses.',
    status: 'backlog',
    priority: 'low',
    points: 2,
    assigneeId: 'user-5',
    labels: ['Security', 'Compliance'],
    dueDate: '2026-11-15',
    subtasks: [],
    comments: [],
    createdAt: '2026-10-26T12:00:00Z'
  },
  {
    id: 'ZEN-107',
    title: 'Support custom keyboard navigation (Cmd+K command palette)',
    description: 'Implement power-user shortcuts for quick issue switching, status flipping, and search without mouse interaction.',
    status: 'done',
    priority: 'high',
    points: 3,
    assigneeId: 'user-2',
    labels: ['Frontend', 'UX', 'Accessibility'],
    dueDate: '2026-10-31',
    subtasks: [
      { id: 'st-12', title: 'Global keydown event listener composable', completed: true },
      { id: 'st-13', title: 'Fuzzy match search against issue titles and ids', completed: true }
    ],
    comments: [],
    createdAt: '2026-10-29T13:20:00Z'
  },
  {
    id: 'ZEN-108',
    title: 'Multi-tenant database schema isolation review',
    description: 'Evaluate PostgreSQL row-level security (RLS) vs schema-per-tenant isolation for enterprise tier customers.',
    status: 'backlog',
    priority: 'medium',
    points: 5,
    assigneeId: 'user-3',
    labels: ['Database', 'Architecture', 'Enterprise'],
    dueDate: '2026-11-18',
    subtasks: [],
    comments: [],
    createdAt: '2026-10-24T10:00:00Z'
  }
];

export const initialActivity = [
  {
    id: 'act-1',
    userId: 'user-2',
    action: 'completed task',
    target: 'ZEN-107 (Command Palette)',
    timestamp: '15 minutes ago'
  },
  {
    id: 'act-2',
    userId: 'user-3',
    action: 'commented on',
    target: 'ZEN-103 (CI/CD Pipeline)',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-3',
    userId: 'user-1',
    action: 'moved task to In Progress',
    target: 'ZEN-101 (WebSocket Telemetry)',
    timestamp: '4 hours ago'
  },
  {
    id: 'act-4',
    userId: 'user-4',
    action: 'closed task',
    target: 'ZEN-104 (Dark Mode Palette)',
    timestamp: 'Yesterday'
  }
];

