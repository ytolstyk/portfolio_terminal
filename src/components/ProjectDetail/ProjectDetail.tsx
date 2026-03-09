import { useNavigate } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { useTerminalContext } from '@/context/TerminalContext'
import { getProject } from '@/data/projects'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  name: string
}

export function ProjectDetail({ name }: Props) {
  const navigate = useNavigate()
  const { dispatch } = useTerminalContext()
  const project = getProject(name)

  const goBack = useCallback(() => {
    dispatch({ type: 'SET_PATH', path: '~' })
    navigate('/')
  }, [navigate, dispatch])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && (e.target as HTMLElement).tagName !== 'INPUT') {
        goBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goBack])

  if (!project) {
    return (
      <div className="terminal-window">
        <div className="terminal-body" style={{ padding: '2rem' }}>
          <div className="output-line output-line--error">
            Project not found: {name}
          </div>
          <div
            className="output-line output-line--system"
            style={{ cursor: 'pointer', marginTop: '1rem' }}
            onClick={goBack}
          >
            &gt; click here or press Backspace to go back
          </div>
        </div>
      </div>
    )
  }

  const prompt = `visitor@ytolstyk:~/projects/${project.name}$`
  const separator = '━'.repeat(50)

  return (
    <div className="terminal-window">
      <div className="terminal-body">
        <ScrollArea className="terminal-output">
          <div className="terminal-output-inner">
            <div className="output-line output-line--command">
              {prompt} cat README.md
            </div>
            <div className="output-line output-line--output">{separator}</div>
            <div className="output-line output-line--success">
              &nbsp;&nbsp;{project.displayName}
            </div>
            <div className="output-line output-line--output">
              &nbsp;&nbsp;{project.description}
            </div>
            <div className="output-line output-line--output">
              &nbsp;&nbsp;Language: {project.language}&nbsp;&nbsp;|&nbsp;&nbsp;Year: {project.year}
            </div>
            <div className="output-line output-line--output">
              &nbsp;&nbsp;GitHub: {project.url}
            </div>
            <div className="output-line output-line--output">{separator}</div>
            <div className="output-line output-line--output">&nbsp;</div>
            {project.readme.split('\n').map((line, i) => (
              <div key={i} className="output-line output-line--output">
                {line || '\u00A0'}
              </div>
            ))}
            <div className="output-line output-line--output">&nbsp;</div>
            <div className="output-line output-line--output">{separator}</div>
            <div
              className="output-line output-line--system"
              style={{ cursor: 'pointer' }}
              onClick={goBack}
            >
              &gt; press Backspace or click here to return home
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
