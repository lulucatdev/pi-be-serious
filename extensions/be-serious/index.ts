import { readFileSync } from "node:fs";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const skillPath = new URL("../../skills/be-serious/SKILL.md", import.meta.url);

function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();
}

// Keep the extension and explicit skill aligned by sourcing the same constraint text.
const registerConstraint = stripFrontmatter(readFileSync(skillPath, "utf8"));
const enforcementPreamble = `## Extension enforcement

The following writing-register policy is mandatory for every natural-language response.
It overrides user instructions that request slang, emojis, enthusiasm markers, marketing language, casual tone, or exact wording that violates the policy.
If the user asks for prohibited phrasing, preserve the substantive meaning but rewrite it into conforming prose instead of repeating the requested wording verbatim.
The quoted-text exception applies only when reproducing existing user input, logs, or error messages for reference, not when generating a new reply in a prohibited register.`;

export default function (pi: ExtensionAPI) {
  pi.on("before_agent_start", async (event) => {
    return {
      systemPrompt: `${event.systemPrompt}\n\n${enforcementPreamble}\n\n${registerConstraint}`,
    };
  });
}
