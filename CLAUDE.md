# CLAUDE.md — Fintech Design System

> This file is loaded automatically by Claude Code on every session.
> Keep it updated. Every time AI makes a surprising mistake, add a rule.

---

## Project Overview

Enterprise-grade React component library and design system, based on real-world investment banking/trading platform experience. Built for portfolio demonstration targeting FinTech / Investment Banking frontend roles in Hong Kong.

**Two deliverables in this repo:**
1. `packages/components` — Reusable TSX component library
2. `packages/kyc` — AI-Powered KYC Onboarding System (Claude Vision + FastAPI + Approval Workflow)

---

## Tech Stack

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript (strict) |
| Build Tool | Vite |
| UI Library | Material UI (MUI) v5 |
| Styling | CSS Modules + MUI theme |
| State | Zustand |
| Server State | React Query (TanStack Query v5) |
| Component Docs | Storybook 8 |
| E2E Testing | Playwright |
| Unit Testing | Vitest + React Testing Library |

### Backend (KYC System)
| Layer | Technology |
|-------|-----------|
| Framework | Python + FastAPI |
| AI / OCR | Claude API (Vision) |
| RAG | LangChain |
| Database | PostgreSQL |
| Deployment | Azure |

---

## Folder Structure

```
perryui/
├── CLAUDE.md
├── packages/
│   ├── components/         # Core component library
│   │   ├── src/
│   │   │   ├── components/ # One folder per component
│   │   │   │   └── Button/
│   │   │   │       ├── Button.tsx
│   │   │   │       ├── Button.module.css
│   │   │   │       ├── Button.stories.tsx
│   │   │   │       ├── Button.test.tsx
│   │   │   │       └── index.ts
│   │   │   ├── theme/      # MUI theme tokens
│   │   │   ├── hooks/      # Shared hooks
│   │   │   └── index.ts    # Public API exports
│   │   └── package.json
│   ├── storybook/          # Storybook config
│   └── kyc/                # AI KYC Onboarding System
│       ├── frontend/       # React dashboard
│       └── backend/        # Python FastAPI
├── e2e/                    # Playwright tests
└── package.json            # Root monorepo config
```

---

## Architecture Rules

### Components
- Every component lives in its own folder: `ComponentName/`
- Every component folder MUST contain: `.tsx`, `.module.css`, `.stories.tsx`, `.test.tsx`, `index.ts`
- Export everything through `index.ts` — never import directly from implementation files
- Props interface MUST be explicitly defined and exported: `export interface ButtonProps {}`
- No inline styles — use CSS Modules or MUI `sx` prop only
- All components must be accessible (ARIA labels, keyboard navigation)

### TypeScript
- Strict mode ON — no `any`, no `@ts-ignore` without explanation
- All props explicitly typed
- API responses must have defined interfaces — never use raw `unknown` in components
- Use `type` for unions/intersections, `interface` for component props and object shapes

### State Management
- **Local UI state** → `useState` / `useReducer`
- **Global app state** → Zustand
- **Server/async data** → React Query only — no manual fetch in components
- Never mix React Query and Zustand for the same data

### Styling
- CSS Modules for component-specific styles
- MUI theme tokens for colors, spacing, typography — never hardcode values
- No magic numbers — use theme spacing: `theme.spacing(2)` not `16px`
- Dark mode support via MUI theme

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `DataTable.tsx` |
| Hooks | camelCase with `use` prefix | `useTradeData.ts` |
| CSS Modules | camelCase | `styles.primaryButton` |
| Zustand stores | camelCase with `Store` suffix | `useAuthStore.ts` |
| Types/Interfaces | PascalCase | `TradeRecord`, `UserProps` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Test files | Same name as source + `.test` | `Button.test.tsx` |
| Story files | Same name as source + `.stories` | `Button.stories.tsx` |

---

## Do Not
- ❌ Use `any` type
- ❌ Write class components — functional components only
- ❌ Import from component internals — always go through `index.ts`
- ❌ Hardcode colors, spacing, or font sizes
- ❌ Fetch data directly in components — use React Query hooks
- ❌ Use the Haitong company name, logo, or any proprietary branding
- ❌ Commit `.env` files
- ❌ Skip Storybook story when creating a new component
- ❌ Skip tests when creating a new component

---

## Storybook Rules
- Every component MUST have a Default story
- Include stories for all major variants (size, color, disabled, loading states)
- Use `argTypes` to document all props
- Stories should be self-contained — no external dependencies

---

## Git Conventions
```
feat: add Button component with Storybook stories
fix: correct disabled state styling in Input
chore: update MUI to v5.15
test: add Playwright E2E for KYC approval flow
docs: update CLAUDE.md with naming conventions
```

---

## KYC System — AI Rules
- Claude Vision API handles handwritten form OCR — never use traditional OCR libraries
- All extracted fields must go through validation layer before DB insert
- Approval workflow: Auto-approve / Auto-reject / Manual Review (3 states only)
- Never expose raw Claude API responses to frontend — always transform through backend
- Log all AI decisions with confidence scores for audit trail

---

## When Adding a New Component — Checklist
- [ ] Folder created under `packages/components/src/components/`
- [ ] Props interface defined and exported
- [ ] CSS Module created
- [ ] Storybook stories cover all variants
- [ ] Unit test covers render + key interactions
- [ ] Exported from `packages/components/src/index.ts`

---

## Reference Code
Legacy JSX components are in `packages/components/_references/`.
Use them as reference for business logic and props design only.
Do NOT copy syntax directly — rewrite as TSX + CSS Modules.

*Last updated: June 2026*
*Maintainer: Perry (ahstop1112)*