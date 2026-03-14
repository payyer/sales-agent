# AI Coding Context & Guidelines (gemini.md)

This document provides context for AI assistants (like Gemini, Claude, GitHub Copilot) to understand the **Payyer Modern React Starter Kit** architecture and coding standards.

---

## 🏗 Project Overview

- **Tech Stack**: React 19, Vite 8, TypeScript, Tailwind CSS 4, Zustand, TanStack (Query v5, Table v8).
- **Architecture**: Feature-Driven Design (FDD). Logic is organized by domain/feature rather than technical role.

---

## 📂 Architecture Map for AI

When asked to add or modify features, follow this structure:

- `src/features/[feature-name]/`: All domain-specific logic.
  - `api/`: Service classes/functions (using `apiClient`).
  - `hooks/`: Custom React Query hooks (e.g., `use[Feature]`).
  - `types/`: TypeScript interfaces for this feature.
  - `components/`: UI components used only by this feature.
- `src/components/shared/`: Reusable high-level components (e.g., `DataTable`, `Form`).
- `src/components/ui/`: Atomic UI elements (Buttons, Inputs - Shadcn/ui style).
- `src/providers/`: Global context wrappers (QueryClient, ErrorBoundary, Toaster).
- `src/stores/`: Global state using Zustand.

---

## 🛠 Coding Rules & Patterns

### 1. Unified API Client

- Always use `@/api/api-client` for network requests.
- Do not use `fetch` or raw `axios` instances.
- Handle data transformation in the `service` layer within a feature.

### 2. State Management

- Use **React Query** for server state (fetching, caching).
- Use **Zustand** for global UI state (auth status, settings).
- Use `useState` for local component state.

### 3. Forms & Validation

- Always use `react-hook-form` + `zod` schema.
- Wrap inputs with the `FormField` component from `@/components/ui/form`.

### 4. Data Tables

- Use the `@/components/shared/data-table` component.
- Pass `ColumnDef<T>` to define headers and cells.
- Implementation must follow the headless pattern of TanStack Table.

### 5. Styling

- Use **Tailwind CSS 4**.
- For complex components with variants, use `class-variance-authority` (CVA).
- Separate variants into a `[component]-variants.ts` file to maintain Fast Refresh.

---

## 💬 AI Interaction Instructions

When generating code for this project:

1. **Forbidden `any`**: Never use the `any` type. Always define precise Interfaces/Types for variables, function parameters, and returns. If a type is truly unknown, use `unknown`.
2. **Follow FDD**: If I ask for a "Product" feature, create it in `src/features/products`.
3. **i18n Compliance**: Use the `useTranslation` hook and `t()` function for all user-facing text. Add keys to `src/locales/`.
4. **Error Handling**: Assume the existence of an `ErrorBoundary`. Throw meaningful errors in services.
5. **Absolute Imports**: Always use the `@/` alias for imports.
6. **Automatic Self-Review**: After finishing a task, you MUST proactively review the code for logic errors, missing imports, or potential lint issues (especially regarding Fast Refresh and `import type`).
7. **Code Formatting**: Strictly follow the project's Prettier configuration: **No semicolons** (`semi: false`) and **tab width of 2 spaces** (`tabWidth: 2`).

---

## 📋 Example: Adding a new Feature

1. Define types in `features/[name]/types`.
2. Create API service in `features/[name]/api`.
3. Create custom hook in `features/[name]/hooks`.
4. Create page in `pages/[name]` and register in `routes/index.tsx`.
