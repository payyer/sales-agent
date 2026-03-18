# AI Coding Context & Guidelines (CLAUDE.md)

This document provides **Claude** with essential context to understand and work effectively on the **Sales Agent Demo** — a mini e-commerce clothing app whose primary purpose is to showcase an AI-powered sales agent feature.

---

## 🤖 How Claude Uses This File

**Important:** When you receive this file in your project folder or project context:

- This is the **source of truth** for project decisions, architecture, and coding standards
- Reference it continuously as you work — don't assume knowledge from prior conversations
- If a task seems to conflict with this guidance, **flag the conflict** and ask for clarification rather than guessing
- Use this to maintain consistency across multiple sessions and conversations

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
6. **Comments in English** — all code comments must be written in clear, professional English. Explain _why_, not _what_. Avoid obvious comments that just restate the code.
7. **Lint & type check after every task** — when a task is complete, run:

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

### Conditional Rendering — Keep It Flat

Deeply nested ternary operators create "pyramid of doom" — extract logic into separate render functions or use the logical AND (`&&`) operator where appropriate.

#### ❌ **Bad: Deeply Nested**

```tsx
{
  isLoading ? <Skeleton /> : isError ? <Error /> : productCount === 0 ? <Empty /> : <Content />
}
```

#### ✅ **Good: Flat with Early Returns**

Extract into a separate component or use render functions:

```tsx
const renderContent = () => {
  if (isLoading) return <Skeleton />
  if (isError) return <Error />
  if (productCount === 0) return <Empty />
  return <Content />
}

export function MyComponent() {
  return <div>{renderContent()}</div>
}
```

#### ✅ **Also Good: Logical AND for Simple Cases**

Use `&&` when you have **one primary condition** (loading/error) and simple success state:

```tsx
export function ProductGrid() {
  return (
    <>
      {isLoading && <SkeletonGrid />}
      {!isLoading && isError && <ErrorMessage error={error} />}
      {!isLoading && !isError && (
        <>
          {productCount === 0 ? (
            <EmptyState onClear={clearFilters} hasFilters={hasActiveFilters} />
          ) : (
            <ProductList products={products} />
          )}
        </>
      )}
    </>
  )
}
```

#### **Decision Rule**

- **Multiple exclusive states** (loading, error, empty, success) → Use `renderContent()` function
- **Single primary condition + success variant** → Use `&&` chaining
- **Simple boolean toggle** → Use `&&` operator
- **Never** nest ternaries more than 1 level deep in JSX

#### **Example: Refactored Product Grid**

**Before (Nested):**

```tsx
{
  isLoading ? (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3 animate-pulse">
          <div className="aspect-3/4 w-full rounded-xl bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
      ))}
    </div>
  ) : isError ? (
    <div className="flex h-40 items-center justify-center rounded-xl bg-destructive/10">
      Error: {error?.message}
    </div>
  ) : productCount === 0 ? (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-muted-foreground mb-4">No products found</p>
      {hasActiveFilters && (
        <Button onClick={clearFilters} variant="outline" size="sm">
          Clear filters
        </Button>
      )}
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

**After (Clean):**

```tsx
const renderProductGrid = () => {
  if (isLoading) return <ProductGridSkeleton />
  if (isError) return <ProductGridError error={error} />
  if (productCount === 0)
    return <ProductGridEmpty onClear={clearFilters} hasFilters={hasActiveFilters} />
  return <ProductGridList products={products} />
}

export function ProductGrid() {
  return <div className="space-y-6">{renderProductGrid()}</div>
}
```

Or extract each state into its own component:

```tsx
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3 animate-pulse">
          <div className="aspect-3/4 w-full rounded-xl bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
      ))}
    </div>
  )
}

function ProductGridError({ error }) {
  return (
    <div className="flex h-40 items-center justify-center rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
      Error: {error instanceof Error ? error.message : 'Failed to load products'}
    </div>
  )
}

function ProductGridEmpty({ onClear, hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-muted-foreground mb-4">No products found matching your current filters.</p>
      {hasFilters && (
        <Button onClick={onClear} variant="outline" size="sm">
          Clear all filters
        </Button>
      )}
    </div>
  )
}

function ProductGridList({ products }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export function ProductGrid() {
  if (isLoading) return <ProductGridSkeleton />
  if (isError) return <ProductGridError error={error} />
  if (productCount === 0)
    return <ProductGridEmpty onClear={clearFilters} hasFilters={hasActiveFilters} />
  return <ProductGridList products={products} />
}
```

**Benefits:**

- ✅ Each state is **easy to test independently**
- ✅ No nesting — **highly readable**
- ✅ Easy to **reuse** components
- ✅ Easier to **maintain and modify** individual states

---

## 💬 Claude's Working Principles

### Decision-Making

1. **Agent-first mindset**: if a task touches both the agent and e-commerce, prioritize the agent's needs.
2. **Follow FDD**: new features go in `src/features/[feature-name]/`.
3. **Minimal e-commerce**: if asked to add an e-commerce feature not listed in priorities above, **confirm scope before building** — ask the user for explicit approval.
4. **Tool-use pattern**: when adding a new agent capability, always create a corresponding tool file in `features/sales-agent/tools/`.
5. **State discipline**: agent session state → `agent.store.ts`; cart state → `cart.store.ts`; server data → React Query.

### When in Doubt

- **Ask, don't assume** — if the scope is ambiguous, ask the user before starting
- **Check existing patterns** — reference the examples section below before writing new code
- **Respect the guidelines** — if a shortcut violates these rules, don't take it; flag it and suggest the correct approach
- **Incremental delivery** — ship small, working changes rather than massive refactors

---

## 📋 Example: Adding a new Agent Tool

1. Define the Zod schema + `AgentTool` object in `features/sales-agent/tools/[tool-name].tool.ts`.
2. Register the tool in `features/sales-agent/tools/index.ts`.
3. Add the tool handler in the agent hook (`useAgent`).
4. If the tool needs an API call, add the service function in `features/sales-agent/api/`.
5. Optionally add a UI component in `features/sales-agent/components/` to render the tool result inline in chat.

---

## 📋 Example: Adding a new E-commerce Feature

1. **Confirm it's truly needed** for the demo (keep scope minimal) — if unsure, ask the user.
2. Define types in `features/[name]/types/`.
3. Create API service in `features/[name]/api/`.
4. Create React Query hook in `features/[name]/hooks/`.
5. Build minimal UI in `features/[name]/components/` or `pages/[name]/`.
6. Register route in `routes/index.tsx`.

---

## ✅ Quality Checklist for Claude

After completing any task, verify:

- [ ] Code follows all rules in "Coding Rules" section
- [ ] No `any` types used
- [ ] All imports use `@/` alias
- [ ] Comments explain _why_, not _what_
- [ ] `npm run lint` exits with **zero errors**
- [ ] Agent-first decisions made where applicable
- [ ] If feature adds new e-commerce logic, it's minimal and justified
- [ ] shadcn/ui preferred over custom components
- [ ] Types are properly defined (no implicit `unknown`)
- [ ] No console.log or debug code left behind
- [ ] **Conditional rendering is flat** — no nested ternaries; use render functions or `&&` chains
- [ ] **Complex states extracted** into separate components (Skeleton, Error, Empty, List, etc.)

---

## 🔗 File References

- **Main config:** Look for `vite.config.ts`, `tsconfig.json`, `.prettierrc` in root
- **API setup:** Check `src/api/api-client.ts` for patterns
- **Store examples:** Reference `src/stores/cart.store.ts` for Zustand patterns
- **UI patterns:** Browse `src/components/ui/` for installed shadcn components

---

## 📞 Communication

- User asks → clarify scope if ambiguous
- Suggest → provide reasoning before implementing
- Report → if linting fails, include error output and fix before submitting
- Iterate → if feedback comes, apply it and re-lint before re-submitting
