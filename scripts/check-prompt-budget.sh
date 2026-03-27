#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

max_skill_chars="${PI_BE_SERIOUS_MAX_SKILL_CHARS:-1800}"
max_prompt_chars="${PI_BE_SERIOUS_MAX_PROMPT_CHARS:-1600}"

python3 - <<'PY' "$max_skill_chars" "$max_prompt_chars"
from pathlib import Path
import re
import sys

max_skill = int(sys.argv[1])
max_prompt = int(sys.argv[2])
root = Path.cwd()

skill = (root / "skills/be-serious/SKILL.md").read_text()
prompt = (root / "prompts/be-serious.md").read_text()
skill_payload = re.sub(r"^---\r?\n[\s\S]*?\r?\n---\r?\n?", "", skill).strip()

metrics = {
    "skill_payload_chars": len(skill_payload),
    "prompt_template_chars": len(prompt),
}

for key, value in metrics.items():
    print(f"{key}={value}")

if metrics["skill_payload_chars"] > max_skill:
    raise SystemExit(
        f"skill payload exceeds budget: {metrics['skill_payload_chars']} > {max_skill}"
    )

if metrics["prompt_template_chars"] > max_prompt:
    raise SystemExit(
        f"prompt template exceeds budget: {metrics['prompt_template_chars']} > {max_prompt}"
    )
PY
