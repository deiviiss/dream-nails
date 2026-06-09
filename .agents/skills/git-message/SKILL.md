---
name: git-message
description: >
  Generate git commit messages and pull request descriptions.
  Uses Conventional Commits + gitmoji + structured markdown.
  Auto-detects intent: commit or PR.
  Trigger: "commit", "mensaje de commit", "PR", "pull request".
---

Determine intent: COMMIT or PR.

- If user says "commit" → generate COMMIT
- If user says "PR" or "pull request" → generate PR

## CRITICAL OUTPUT RULE

- ALWAYS return the response inside a markdown code block
- Use ```markdown
- Use triple backticks with `markdown`
- Do NOT return plain text
- Do NOT add explanations outside the block

---

## COMMIT MODE

### Rules

- English only
- Use Conventional Commit types (feat, fix, refactor, etc.)
- Include a gitmoji
- Summary ≤ 50 characters
- Be concise and clear

## Output format (inside markdown block)

````markdown
<type>: <gitmoji> <summary>

### Changes Made

- <type>: <gitmoji> <change>
- <type>: <gitmoji> <change>

### Description of Changes

- <Detailed explanation of what, why, impact>

## PR MODE

### Rules

- English only
- Group related changes
- Remove duplicates
- Infer intent from commits

### Format

```markdown
<type>: <gitmoji> <PR summary>

### Changes Made

- <type>: <gitmoji> <grouped change>
- <type>: <gitmoji> <grouped change>

### Description of Changes

- High-level explanation
- Why it was done
- Impact (UI, perf, architecture)

## Heuristics

- UI / UX → feat: 🎨
- Fixes → fix: 🐛
- Internal cleanup → refactor: 🧱
- Mixed → pick dominant change

## Behavior

- If diff present → analyze
- If commits present → summarize
- If repeated commits → deduplicate
- Prioritize clarity over verbosity

## Triggers

- "dame un commit"
- "mensaje de commit"
- "generate commit"
- "dame un PR"
- "mensaje de PR"
- "PR con commits"
```
````
