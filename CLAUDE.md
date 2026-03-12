# Conventions

## Project overview

- NX monorepo (`nx@22.5.2`) with `pnpm@10.1.0`
- Libs: `ui`, `authentication/{api,vue}`, `core/types`, `json-forms/{api,core,vue}`, `tools/{api,vue}`
- Build: Vite 7 with `vite-plugin-dts` for library builds (CJS + ESM)
- Docs: VuePress 2 with `vuepress-theme-hope`

## Code style

- TypeScript strict mode
- pnpm for package management
- NX monorepo conventions
- Prefer `type` over `interface`
- Prefer arrow function expressions: `const functionName = () => {}`
- Prettier: single quotes (`"singleQuote": true`)
- ESLint flat config with scope-based module boundary constraints

## Vue

- Vue 3.5 with `<script setup lang="ts">`
- Always put `<template>` first, then `<script setup>`
- Component file: `ComponentName.vue` with props in `ComponentName.properties.ts`
- Props use Vue object syntax with `PropType`:

```ts
import type { PropType } from 'vue';

export const MyComponentProperties = {
  options: { type: Array as PropType<Array<any>>, required: true },
  labelKey: { type: String, default: 'label' },
};

export const MyComponentEmits = ['update:modelValue', 'select'];
```

- Composables go in a `composables/` folder next to the component that uses them
- Naming: `useFeatureName.ts` (e.g., `useSearch.ts`, `useOptions.ts`)

## Styling

- Tailwind CSS 4 + daisyUI 5 with a custom `ugent` theme
- SCSS for theme variables and utilities (`_scss/` folder)
- Use Tailwind utility classes in templates; avoid inline styles

## Testing

- Use Vitest for unit tests (jsdom environment, globals enabled)
- Use Playwright for e2e tests
- Always use `describe`/`it` block structure
- Mock with `vi.fn()` / `vi.spyOn()`
- Prefer table testing with `it.each` using tagged template literal syntax when input is simple/tabular:

```ts
it.each`
  name           | style
  ${'error'}     | ${errorStyle}
  ${'warning'}   | ${warningStyle}
`('should handle "$name"', ({ name, style }) => {
  // ...
});
```

- Use array syntax for `it.each` only when rows contain functions or complex objects that don't fit a table format
- Co-locate test files as `*.spec.ts` in a `__tests__/` folder next to the source file

## Documentation (docs/)

- Use `::: tabs` / `@tab Preview` / `@tab Vue` for all code examples
- Structure: Usage (with tabs), then Props/Events/other details, then Examples (with tabs)
- Usage section shows the primary use case with Preview and Vue tabs
- Examples section shows variants (required, errors, custom keys, etc.) each with Preview and Vue tabs
- `<script setup>` block and `<ClientOnly>` wrapper go between the details and examples sections

## Git

- Commit messages follow Conventional Commits (enforced by commitlint)
- Husky for pre-commit hooks
