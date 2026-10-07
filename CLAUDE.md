@resources/kenny_patel_portfolio_art_direction.html

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Guidelines to follow

- Commands: pnpm-only commands and a rule to ask before adding new packages.
- Skills: check .claude/skills at the start of every task and follow any skill that matches.
- Folder layout: a modular structure where pages stay simple, each homepage section gets its own folder. Reusable Components live seperately, lib gets used appropriately as well.
- Design tokens: your Night and Day colours mapped onto shadcn's colour variables, plus the type scale and motion timings.
- Interaction specs: a written spec for each interaction (the dot field, ring cursor, menu, project track, archive filter, "how I think" loop, stack, year scrubber), including how each should work with keyboard and reduced motion.
- Checklists: a done-checklist for every task, a "don't" list and a 12-step build order.
