# AI Coding Context & Guidelines (gemini.md)

This document provides context for AI assistants to understand the **Sales Agent Demo** — a mini e-commerce clothing app whose primary purpose is to showcase an AI-powered sales agent feature.

---

## 🎯 Project Goal & Priorities

This is **not** a full-featured e-commerce platform. It is a focused demo built around one core experience: an AI sales agent that helps users discover and purchase clothing.

| Priority        | Area                                 | Approach                    |
| --------------- | ------------------------------------ | --------------------------- |
| 🔴 Primary      | `sales-agent` feature                | Build fully, iterate deeply |
| 🟡 Secondary    | Product catalog, Cart, Checkout      | Minimal but functional      |
| ⚫ Out of scope | Reviews, Wishlist, Admin, Promotions | Do not build unless asked   |

**When in doubt:** keep e-commerce logic simple and redirect effort to the agent.

---

## 🏗 Tech Stack

- **React 19**, Vite, TypeScript
- **Tailwind CSS 4** for styling
- **shadcn/ui** — primary UI component library (see UI rules below)
- **Zustand** for global UI state (cart, agent session)
- **TanStack Query v5** for server state
- **react-hook-form** + **zod** for forms
- **Architecture**: Feature-Driven Design (FDD)

---

## 📂 Architecture Map

```
src/
├── features/
│   ├── sales-agent/          ← PRIMARY FOCUS
│   │   ├── api/              # Agent API calls (LLM, tool calls)
│   │   ├── hooks/            # useAgent, useAgentSession, useAgentTools
│   │   ├── types/            # AgentMessage, AgentTool, AgentState, etc.
│   │   ├── tools/            # Tool definitions the agent can call
│   │   └── components/       # AgentChat, MessageBubble, AgentToolCard, etc.
│   │
│   ├── products/             ← MINIMAL
│   │   ├── api/              # Product listing & detail fetch
│   │   ├── hooks/            # useProducts, useProductDetail
│   │   ├── types/            # Product, ProductVariant, Category
│   │   └── components/       # ProductCard, ProductGrid (simple, no frills)
│   │
│   └── cart/                 ← MINIMAL
│       ├── hooks/            # useCart (wraps Zustand store)
│       ├── types/            # CartItem, CartState
│       └── components/       # CartDrawer, CartItemRow
│
├── components/
│   ├── shared/               # DataTable, Form wrappers
│   └── ui/                   # Atomic elements (Button, Input, Badge…)
│
├── stores/
│   ├── cart.store.ts         # Cart items, quantity, total
│   └── agent.store.ts        # Agent session, message history, tool state
│
├── providers/                # QueryClient, ErrorBoundary, Toaster
└── pages/
    ├── home/                 # Product listing (grid, basic filter)
    ├── product/[id]/         # Product detail (minimal)
    ├── cart/                 # Cart + checkout stub
    └── agent/                # Full-screen agent experience (main demo page)
```

---

## 🤖 Sales Agent — Core Concepts

The agent is the heart of the app. Treat it as a first-class feature.

### Agent Tools (functions the agent can call)

Define each tool in `features/sales-agent/tools/`. Each tool file exports:

```ts
// Example: features/sales-agent/tools/search-products.tool.ts
export const searchProductsTool: AgentTool = {
  name: 'search_products',
  description: '...',
  parameters: z.object({ query: z.string(), category: z.string().optional() }),
  execute: async (params) => {
    /* call products API */
  },
}
```

### Agent Message Types

```ts
type MessageRole = 'user' | 'assistant' | 'tool_result'
type AgentMessage = {
  id: string
  role: MessageRole
  content: string
  toolCall?: { name: string; args: unknown; result?: unknown }
  timestamp: Date
}
```

### Agent State (Zustand)

```ts
// stores/agent.store.ts
interface AgentState {
  messages: AgentMessage[]
  isThinking: boolean
  sessionId: string | null
  // actions
  sendMessage: (text: string) => Promise<void>
  clearSession: () => void
}
```

---

## 🛒 E-commerce — Keep It Simple

These features exist only to support the agent demo. Avoid over-engineering them.

### Products

- Simple `GET /products` with optional `?category=&q=` query params.
- `Product` type: `{ id, name, price, images, category, variants, stock }`.
- No pagination needed initially — a flat list is fine.

### Cart

- Managed entirely in **Zustand** (`cart.store.ts`). No backend cart.
- Cart persists to `localStorage` via Zustand middleware.
- Checkout is a stub form — no real payment integration.

### Auth

- Optional / minimal. A simple guest session is enough for the demo.
- Do not build a full auth flow unless explicitly requested.

---

## 🛠 Coding Rules

### General

1. **No `any`** — use `unknown` if the type is truly dynamic.
2. **Absolute imports** — always use the `@/` alias.
3. **No semicolons**, **2-space indent** (Prettier config).
4. **i18n** — use `useTranslation` + `t()` for all UI text.
5. **Error handling** — throw meaningful errors in service layer; assume `ErrorBoundary` exists.
6. **Lint & type check after every task** — when a task is complete, run:

   ```bash
   npm run lint
   ```

   - If errors are reported → fix **all** of them before considering the task done.
   - Repeat until `npm run lint` exits with no errors.
   - Do not suppress errors with `// eslint-disable` unless there is a documented reason.

### API Client

- Always use `@/api/api-client`. Never use raw `fetch` or `axios`.
- Data transformation belongs in the `api/` layer of each feature.

### Forms

- `react-hook-form` + `zod` schema for all forms.
- Wrap inputs with `FormField` from `@/components/ui/form`.

### UI Components — shadcn/ui First

- **Always prefer shadcn/ui** before writing any custom component. Check the shadcn registry first.
- Install a component on demand with:
  ```bash
  npx shadcn@latest add [component-name]
  # Examples:
  npx shadcn@latest add button
  npx shadcn@latest add dialog
  npx shadcn@latest add scroll-area
  ```
- Installed components land in `src/components/ui/` — import from there: `@/components/ui/button`.
- **Decision rule**:
  - shadcn/ui has it → use it directly, do not rewrite.
  - shadcn/ui doesn't have it → build a custom component in `components/shared/` or the feature's `components/` folder.
- For custom components with variants, use `class-variance-authority` (CVA) and extract variants to a `[component]-variants.ts` file (Fast Refresh compatibility).
- Tailwind CSS 4 utility classes for layout and one-off styling.

---

## 💬 AI Interaction Instructions

1. **Agent-first mindset**: if a task touches both the agent and e-commerce, prioritize the agent's needs.
2. **Follow FDD**: new features go in `src/features/[feature-name]/`.
3. **Minimal e-commerce**: if asked to add an e-commerce feature not listed above, confirm scope before building.
4. **Tool-use pattern**: when adding a new agent capability, always create a corresponding tool file in `features/sales-agent/tools/`.
5. **State discipline**: agent session state → `agent.store.ts`; cart state → `cart.store.ts`; server data → React Query.

---

## 📋 Example: Adding a new Agent Tool

1. Define the Zod schema + `AgentTool` object in `features/sales-agent/tools/[tool-name].tool.ts`.
2. Register the tool in `features/sales-agent/tools/index.ts`.
3. Add the tool handler in the agent hook (`useAgent`).
4. If the tool needs an API call, add the service function in `features/sales-agent/api/`.
5. Optionally add a UI component in `features/sales-agent/components/` to render the tool result inline in chat.

---

## 📋 Example: Adding a new E-commerce Feature

1. Confirm it's truly needed for the demo (keep scope minimal).
2. Define types in `features/[name]/types/`.
3. Create API service in `features/[name]/api/`.
4. Create React Query hook in `features/[name]/hooks/`.
5. Build minimal UI in `features/[name]/components/` or `pages/[name]/`.
6. Register route in `routes/index.tsx`.
