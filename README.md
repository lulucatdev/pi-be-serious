# pi-be-serious

A [pi](https://github.com/mariozechner/pi) package that injects a formal writing-register constraint into the system prompt. Designed to suppress the colloquial, slang-heavy, and sycophantic output tendencies exhibited by certain foundation models (notably the OpenAI Codex series and similar instruction-tuned models).

The constraint directs the model to produce plain, precise, expository prose at the register of a university textbook. All slang, filler, enthusiasm markers, emoji, marketing adjectives, and forced informality are prohibited.

## Installation

```bash
pi install git:github.com/lulucatdev/pi-be-serious
```

## Usage

### Prompt (explicit, per-turn injection)

```text
/prompt:be-serious <your request here>
```

This wraps the request with the full register constraint and passes it to the model as a single turn.

### Skill (auto-triggering)

The `be-serious` skill auto-triggers based on description matching. When the model detects that formal output is appropriate (which should be always, given the broad description), it loads the skill and applies the constraint.

To invoke explicitly:

```text
/skill:be-serious
```

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

## What it requires

- Complete, grammatically standard, declarative sentences
- Neutral, impersonal tone without affective coloring
- Precise vocabulary with the most accurate term for each concept
- Logical connectives ("therefore", "however", "because") over conversational transitions ("so", "anyway", "basically")
- Every word carrying semantic load; no filler

## Scope

The constraint applies to all natural-language output. It does not apply to generated code, where idiomatic conventions of the target language take precedence.

## License

MIT
