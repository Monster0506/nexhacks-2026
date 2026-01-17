import { writable } from "svelte/store"

export interface Assignee {
  name: string
  avatar: string
  color: string
}

export interface ReasoningStep {
  type: "analysis" | "hypothesis" | "recommendation" | "context"
  title: string
  content: string
  timestamp: string
}

export interface AIReasoning {
  summary: string
  confidence: number
  steps: ReasoningStep[]
}

export type TicketStatus = "open" | "in_progress" | "review" | "done"
export type TicketPriority = "low" | "medium" | "high" | "critical"

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  assignee: Assignee | null
  createdAt: string
  updatedAt: string
  aiReasoning: AIReasoning
  labels: string[]
}

const initialTickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "Authentication flow breaks on mobile Safari",
    description:
      "Users on iOS Safari are experiencing login failures after the recent OAuth update. The redirect callback is not being properly handled.",
    status: "open",
    priority: "high",
    assignee: { name: "Sarah Chen", avatar: "SC", color: "#3b82f6" },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:22:00Z",
    aiReasoning: {
      summary: "Mobile Safari OAuth redirect handling issue",
      confidence: 0.92,
      steps: [
        {
          type: "analysis",
          title: "Analyzing error patterns",
          content:
            "Detected 847 failed authentication attempts from iOS Safari 17.x in the last 24 hours. Error clustering shows 94% correlation with redirect_uri mismatch.",
          timestamp: "14:20:12",
        },
        {
          type: "hypothesis",
          title: "Root cause hypothesis",
          content:
            "Safari's ITP (Intelligent Tracking Prevention) is blocking the OAuth state parameter cookie. This was introduced in Safari 17.2.",
          timestamp: "14:20:45",
        },
        {
          type: "recommendation",
          title: "Suggested fix",
          content:
            "Implement PKCE flow with session storage fallback instead of relying on cookies for state management. See RFC 7636 for implementation details.",
          timestamp: "14:21:03",
        },
        {
          type: "context",
          title: "Related tickets",
          content:
            "Similar issue reported in TKT-892 (resolved) and TKT-756 (duplicate). Previous fix involved SameSite=None attribute.",
          timestamp: "14:21:18",
        },
      ],
    },
    labels: ["bug", "mobile", "auth"],
  },
  {
    id: "TKT-002",
    title: "Add dark mode support to dashboard",
    description:
      "Implement system-preference-aware dark mode for the main dashboard. Should include smooth transitions and persist user preference.",
    status: "in_progress",
    priority: "medium",
    assignee: { name: "Alex Rivera", avatar: "AR", color: "#8b5cf6" },
    createdAt: "2024-01-14T09:00:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
    aiReasoning: {
      summary: "Feature implementation with design system integration",
      confidence: 0.88,
      steps: [
        {
          type: "analysis",
          title: "Scope assessment",
          content:
            "Identified 24 components requiring theme updates. Current design tokens support ~60% of required variants.",
          timestamp: "11:40:22",
        },
        {
          type: "recommendation",
          title: "Implementation approach",
          content:
            "Recommend CSS custom properties with prefers-color-scheme media query. Use localStorage for persistence with system default fallback.",
          timestamp: "11:42:15",
        },
      ],
    },
    labels: ["feature", "ui", "design-system"],
  },
  {
    id: "TKT-003",
    title: "Database connection pool exhaustion",
    description:
      "Production database showing connection pool saturation during peak hours. Response times degrading significantly.",
    status: "in_progress",
    priority: "critical",
    assignee: { name: "Jordan Park", avatar: "JP", color: "#22c55e" },
    createdAt: "2024-01-15T08:15:00Z",
    updatedAt: "2024-01-15T15:30:00Z",
    aiReasoning: {
      summary: "Connection leak detected in query handler",
      confidence: 0.96,
      steps: [
        {
          type: "analysis",
          title: "Metrics analysis",
          content:
            "Connection count growing linearly at ~12 connections/hour. Pool max is 100. Leak rate correlates with /api/reports endpoint traffic.",
          timestamp: "15:25:00",
        },
        {
          type: "hypothesis",
          title: "Identified leak source",
          content:
            "Transaction not being released in error path of generateReport() function. Missing finally block for connection.release().",
          timestamp: "15:27:33",
        },
        {
          type: "recommendation",
          title: "Immediate action",
          content:
            "Deploy hotfix with proper connection cleanup. Consider implementing connection timeout and automatic pool recycling.",
          timestamp: "15:28:44",
        },
      ],
    },
    labels: ["bug", "database", "performance", "urgent"],
  },
  {
    id: "TKT-004",
    title: "Implement webhook retry mechanism",
    description:
      "Add exponential backoff retry logic for failed webhook deliveries. Include dead letter queue for persistently failing webhooks.",
    status: "review",
    priority: "medium",
    assignee: { name: "Morgan Liu", avatar: "ML", color: "#f59e0b" },
    createdAt: "2024-01-13T14:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    aiReasoning: {
      summary: "PR ready for review with comprehensive test coverage",
      confidence: 0.91,
      steps: [
        {
          type: "analysis",
          title: "Code review summary",
          content:
            "Implementation follows AWS SQS retry patterns. Test coverage at 94%. No security concerns identified.",
          timestamp: "09:00:00",
        },
        {
          type: "context",
          title: "Review checklist",
          content:
            "All CI checks passing. Documentation updated. Migration script included for existing webhook configurations.",
          timestamp: "09:00:00",
        },
      ],
    },
    labels: ["feature", "infrastructure"],
  },
  {
    id: "TKT-005",
    title: "Update API rate limiting configuration",
    description:
      "Adjust rate limits for enterprise tier customers. Current limits causing issues for high-volume integrations.",
    status: "done",
    priority: "low",
    assignee: { name: "Casey Kim", avatar: "CK", color: "#ec4899" },
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-01-14T16:00:00Z",
    aiReasoning: {
      summary: "Configuration update deployed successfully",
      confidence: 1.0,
      steps: [
        {
          type: "context",
          title: "Deployment summary",
          content:
            "Rate limits updated for enterprise tier: 10,000 req/min (was 1,000). Monitoring shows no anomalies post-deployment.",
          timestamp: "16:00:00",
        },
      ],
    },
    labels: ["config", "enterprise"],
  },
  {
    id: "TKT-006",
    title: "Memory leak in real-time notifications",
    description:
      "WebSocket connections not being properly cleaned up on client disconnect. Server memory growing unbounded.",
    status: "open",
    priority: "high",
    assignee: null,
    createdAt: "2024-01-15T13:00:00Z",
    updatedAt: "2024-01-15T13:00:00Z",
    aiReasoning: {
      summary: "Awaiting triage - initial analysis complete",
      confidence: 0.78,
      steps: [
        {
          type: "analysis",
          title: "Initial assessment",
          content:
            "Heap dumps show retained WebSocket handler instances. Event listeners not being removed on disconnect event.",
          timestamp: "13:00:00",
        },
      ],
    },
    labels: ["bug", "websocket", "memory"],
  },
]

export const tickets = writable<Ticket[]>(initialTickets)

export function updateTicketStatus(ticketId: string, newStatus: TicketStatus): void {
  tickets.update((items) =>
    items.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() } : ticket,
    ),
  )
}
