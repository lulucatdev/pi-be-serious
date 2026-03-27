import { readFileSync } from "node:fs";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const skillPath = new URL("../../skills/be-serious/SKILL.md", import.meta.url);
const constraintMarker = "# Register constraint: formal written prose";

function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();
}

// Keep the extension and explicit skill aligned by sourcing the same constraint text.
const registerConstraint = stripFrontmatter(readFileSync(skillPath, "utf8"));

export default function (pi: ExtensionAPI) {
  pi.on("before_agent_start", async (event) => {
    if (event.systemPrompt.includes(constraintMarker)) {
      return;
    }

    return {
      systemPrompt: `${event.systemPrompt}\n\n${registerConstraint}`,
    };
  });
}
