import type { CommandResult } from "@/types/terminal";

export function contact(): CommandResult {
  return {
    lines: [
      { type: "system", content: "Contact Info" },
      { type: "output", content: "" },
      { type: "output", content: "  Email:   yuriy.tolstykh@gmail.com" },
      { type: "output", content: "  GitHub:  github.com/ytolstyk" },
      {
        type: "output",
        content:
          "  LinkedIn: linkedin.com/in/yuriy-tolstykh-2310802/",
      },
      { type: "output", content: "" },
    ],
  };
}
