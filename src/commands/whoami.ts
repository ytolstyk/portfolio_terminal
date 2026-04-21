import type { CommandResult } from "@/types/terminal";

export function whoami(): CommandResult {
  return {
    lines: [
      { type: "success", content: "visitor@ytolstyk" },
      { type: "output", content: "" },
      { type: "output", content: "Yuriy Tolstykh — Senior Software Engineer" },
      { type: "output", content: "" },
      {
        type: "output",
        content:
          "Senior Full-Stack Engineer with 10+ years driving revenue growth through",
      },
      {
        type: "output",
        content:
          "expert API design, high-performance React UIs, and AI-driven automation.",
      },
      {
        type: "output",
        content:
          "Collaborative technical leader — mentoring engineers, architecting internal",
      },
      {
        type: "output",
        content:
          "tools, and optimizing engineering lifecycles for maximum productivity.",
      },
      { type: "output", content: "" },
      {
        type: "output",
        content: "Languages: TypeScript, JavaScript, Python, Ruby, Kotlin",
      },
      {
        type: "output",
        content: "Stack:     React, Django, Rails, Node.js, GraphQL, Vite",
      },
      {
        type: "output",
        content: "AI:        LLMs, Claude Code, AI Agents, MCP",
      },
      { type: "output", content: "GitHub:    https://github.com/ytolstyk" },
      { type: "output", content: "" },
      { type: "system", content: "type 'ls' to see recent projects" },
    ],
  };
}
