import type { CommandResult } from "@/types/terminal";

export function sudo(args: string[]): CommandResult {
  const subcmd = args.join(" ");

  if (!subcmd || subcmd === "su") {
    return {
      lines: [
        {
          type: "error",
          content: "sudo: visitor accounts do not come with superpowers.",
        },
        {
          type: "output",
          content: "This incident has been reported. (To no one. I promise.)",
        },
      ],
    };
  }

  if (subcmd === "rm -rf /") {
    return {
      lines: [
        { type: "error", content: "sudo: nice try." },
        {
          type: "system",
          content: "The portfolio remains. You remain. We all remain.",
        },
      ],
    };
  }

  if (subcmd.includes("hire") || subcmd.includes("offer")) {
    return {
      lines: [
        { type: "success", content: "sudo: executing... offer extended." },
        { type: "output", content: "Just kidding. But seriously, reach out." },
        { type: "system", content: "github.com/ytolstyk" },
      ],
    };
  }

  return {
    lines: [
      { type: "error", content: `sudo: visitor is not in the sudoers file.` },
      { type: "output", content: "This incident has been reported." },
      { type: "system", content: "(To nobody. Your secret is safe.)" },
    ],
  };
}
