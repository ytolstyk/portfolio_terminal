import { projects } from "@/data/projects";
import type { CommandResult } from "@/types/terminal";

export function ls(): CommandResult {
  const lines: CommandResult["lines"] = [
    { type: "output", content: "total " + (projects.length + 1) },
    { type: "output", content: "-rw-r--r--  text         2026  resume.txt" },
  ];
  for (const p of projects) {
    const langPad = p.language.padEnd(12);
    lines.push({
      type: "output",
      content: `drwxr-xr-x  ${langPad} ${p.year}  ${p.name}/`,
    });
  }
  lines.push({ type: "output", content: "" });
  lines.push({
    type: "system",
    content: "type 'cd <project>' to enter a project",
  });
  lines.push({
    type: "system",
    content: "type 'help' to see available commands",
  });
  return { lines };
}
