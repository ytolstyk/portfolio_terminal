import type { CommandResult } from "@/types/terminal";

const COMMANDS = [
  ["resume", "display full resume"],
  ["ls", "list all projects and files"],
  ["cd <name>", "navigate into a project (or cd .. to go back)"],
  ["cat <name>", "read a project README or resume.txt"],
  ["grep <pattern>", "filter visible output by pattern"],
  ["pwd", "print working directory"],
  ["whoami", "display user info"],
  ["echo <text>", "echo text to output"],
  ["history", "show command history"],
  ["clear", "clear the terminal output"],
  ["exit", "close the terminal and reveal portfolio"],
  ["help", "show this help message"],
  ["ps", "list running processes (mostly suspicious)"],
  ["ifconfig", "show network interfaces and vibes"],
  ["touch <file>", "gently create a file"],
  ["mkdir <dir>", "create a directory (unfurnished)"],
  ["cp <src> <dest>", "legally distinct copy of a file"],
  ["mv <src> <dest>", "evict a file to a new location"],
  ["rm <file>", "delete something dramatically"],
  ["man <cmd>", "read the manual"],
  ["sudo <cmd>", "attempt to feel powerful"],
  ["git <cmd>", "version control theatrics"],
  ["npm <cmd>", "node package manager (and anxiety)"],
];

export function help(): CommandResult {
  const lines: CommandResult["lines"] = [
    { type: "system", content: "Available commands:" },
    { type: "output", content: "" },
  ];

  for (const [cmd, desc] of COMMANDS) {
    lines.push({
      type: "output",
      content: `  ${cmd.padEnd(20)} ${desc}`,
    });
  }

  lines.push({ type: "output", content: "" });

  return { lines };
}
