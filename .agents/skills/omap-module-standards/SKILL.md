---
name: omap-module-standards
description: Apply the openlayersMapKit project conventions when creating, changing, refactoring, or reviewing TypeScript under src/module, including naming, backing values, errors, inheritance, public API compatibility, ESLint, tests, and JSDoc. Do not use for unrelated application code or documentation-only work.
---

# OMap Module Standards

Keep module changes consistent without silently changing the public contract.

## Workflow

1. Read [`references/standards.md`](references/standards.md) before changing or reviewing `src/module` code.
2. Inspect the affected exports, parent classes, tests, and generated documentation before editing.
3. Preserve public API compatibility. For a published misspelling, add the correct name and retain the old name as an `@deprecated` alias backed by the same implementation. Internal-only misspellings can be migrated directly.
4. Add or update contract tests before changing observable error, return-value, event, or lifecycle behavior.
5. Make the smallest coherent change. Do not combine unrelated API redesign with a standards cleanup.
6. Validate proportionally while working, then run the acceptance commands required by the reference before completion.

## Boundaries

- Treat `scripts/public-api-baseline.json` as the compatibility baseline. Do not update it merely to make an unintended API difference pass.
- Do not expose private backing values or mutable internal arrays/objects to satisfy a caller.
- Do not globally require explicit return annotations or eliminate every existing `any`; TypeScript inference is accepted and `any` is tightened incrementally. Do not introduce avoidable new `any`.
- Existing project and user instructions override this skill when they intentionally define a different contract.
