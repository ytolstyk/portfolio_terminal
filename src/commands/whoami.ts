import type { CommandResult } from "@/types/terminal";

export function whoami(): CommandResult {
  return {
    lines: [
      { type: "success", content: "visitor@ytolstyk" },
      { type: "output", content: "" },
      { type: "output", content: "Yuriy Tolstykh — Software Engineer" },
      { type: "output", content: "" },
      {
        type: "output",
        content:
          "Full-stack engineer with focus on web development. I build web, mobile, and game tooling.",
      },
      {
        type: "output",
        content:
          "Passionate about maintainable code, product that makes sense to users, and beautiful UIs.",
      },
      { type: "output", content: "" },
      {
        type: "output",
        content: "Languages: TypeScript, Node.js, Python, Ruby",
      },
      {
        type: "output",
        content: "Stack:     React, Express, Django, Rails, Vite",
      },
      { type: "output", content: "GitHub:    https://github.com/ytolstyk" },
      { type: "output", content: "" },
      { type: "system", content: "type 'ls' to see recent projects" },
    ],
  };
}
