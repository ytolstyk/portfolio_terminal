const urlRegex = /(https?:\/\/[^\s]+)/g

export function renderWithLinks(content: string) {
  const parts = content.split(urlRegex)
  return parts.map((part, i) =>
    /^https?:\/\/[^\s]+$/.test(part)
      ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="terminal-link">{part}</a>
      : part
  )
}
