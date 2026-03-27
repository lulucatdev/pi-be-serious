# pi-be-serious

A [pi](https://github.com/mariozechner/pi) package that enforces a formal writing-register constraint across agent output. It is designed to suppress colloquial, slang-heavy, and sycophantic output tendencies exhibited by certain instruction-tuned foundation models.

The package now uses a pi extension as its primary enforcement layer. On every agent run, the extension appends a compact register constraint to the active system prompt. The package also keeps an explicit prompt template and skill for users who want to invoke the same constraint manually.

The constraint directs the model to produce plain, precise, expository prose at the register of a university textbook. All slang, filler, enthusiasm markers, emoji, marketing adjectives, and forced informality are prohibited.

## Installation

```bash
pi install git:github.com/lulucatdev/pi-be-serious
```

## Usage

### Automatic enforcement (default)

After installing the package, pi loads the bundled extension automatically. The extension injects the register constraint into the system prompt on every agent run, so the behavior does not depend on skill auto-triggering.

### Prompt (explicit, per-turn injection)

```text
/prompt:be-serious <your request here>
```

This wraps the request with the register constraint for that invocation. It is useful when the user wants an explicit per-turn entry point, even though the extension already applies the policy automatically.

### Skill (explicit manual secondary interface)

```text
/skill:be-serious
```

The `be-serious` skill remains available as an explicit manual secondary interface. It exposes the same constraint text for manual loading with `/skill:be-serious` and keeps the package compatible with skill-based workflows. However, the extension is the primary mechanism that guarantees the policy is present.

## Implementation notes

- The extension reads the canonical constraint text from `skills/be-serious/SKILL.md` and appends it to the active system prompt in `before_agent_start`.
- The extension skips injection when the current system prompt already contains the same constraint marker, which avoids duplicate payload growth when multiple entry points are combined.
- The prompt template and skill remain in the package as explicit user-facing entry points.
- `scripts/check-prompt-budget.sh` enforces a size budget for the skill payload and prompt template to catch prompt-bloat regressions before release.

## What it prohibits

| Category | Examples |
|----------|----------|
| Slang and internet vernacular | "ngl", "lowkey", "vibe", "fire", "ship it", "LGTM" |
| Sycophantic expressions | "Great question!", "Happy to help!", "Absolutely!" |
| Enthusiasm markers | Exclamation marks for enthusiasm, emoji, "awesome", "amazing" |
| Filler phrases | "Let's go ahead and", "basically", "alright so" |
| Forced informality | "gonna", "wanna", "y'all", "folks", contractions in prose |
| Anthropomorphization | "the compiler is happy", "the function wants" |
| Vague intensifiers | "very", "really", "pretty much", "kind of" |
| Chinese colloquial buzzwords | 闭环, 痛点, 砍一刀, 揪出来, 拍板, 稳稳接住, 说人话就是, 一句话总结, 不踩坑, 收口, 狠狠干 |

## What it requires

- Complete, grammatically standard, declarative sentences
- Neutral, impersonal tone without affective coloring
- Precise vocabulary with the most accurate term for each concept
- Logical connectives ("therefore", "however", "because") over conversational transitions ("so", "anyway", "basically")
- Every word carrying semantic load; no filler

## Scope

The constraint applies to all natural-language output. It does not apply to generated code, where idiomatic conventions of the target language take precedence.

## Other platforms

This package is designed for the [pi](https://github.com/mariozechner/pi) coding agent. Ports to other agent platforms are available:

| Platform | Repository | Enforcement mechanism |
|----------|------------|----------------------|
| pi | this repository | `before_agent_start` extension hook |
| OpenAI Codex CLI | [codex-be-serious](https://github.com/lulucatdev/codex-be-serious) | `SessionStart` hook with `additionalContext` |
| Claude Code | Built-in skill at `~/.claude/skills/be-serious/` | Superpowers skill auto-trigger |

The constraint specification (`skills/be-serious/SKILL.md`) is kept aligned across ports. Platform-specific differences are limited to the injection mechanism.

## License

MIT
