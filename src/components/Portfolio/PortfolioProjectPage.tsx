import type React from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext'
import { getProject } from '@/data/projects'
import './PortfolioProjectPage.css'

const COLOR_SCHEMES = [
  { c1: '#a78bfa', c2: '#22d3ee', r1: '167,139,250', r2: '34,211,238' }, // violet → cyan
  { c1: '#22d3ee', c2: '#34d399', r1: '34,211,238', r2: '52,211,153' },  // cyan → emerald
  { c1: '#fbbf24', c2: '#fb7185', r1: '251,191,36',  r2: '251,113,133' }, // amber → rose
  { c1: '#fb7185', c2: '#fb923c', r1: '251,113,133', r2: '251,146,60' },  // rose → orange
]

export function PortfolioProjectPage() {
  const { name } = useParams<{ name: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setTerminalVisible } = useAppContext()
  const project = name ? getProject(name) : undefined
  const colorIndex = Math.min(Math.max(parseInt(searchParams.get('c') ?? '0', 10) || 0, 0), 3)
  const scheme = COLOR_SCHEMES[colorIndex]
  const cssVars = {
    '--proj-c1': scheme.c1,
    '--proj-c2': scheme.c2,
    '--proj-r1': scheme.r1,
    '--proj-r2': scheme.r2,
  } as React.CSSProperties

  const openTerminal = () => {
    navigate('/')
    setTerminalVisible(true)
  }

  if (!project) {
    return (
      <div className="ppp-shell" style={cssVars}>
        <div className="ppp-container">
          <div className="ppp-not-found">
            <p className="ppp-error">Project not found.</p>
            <button className="btn btn-outline" onClick={() => navigate('/#projects')}>
              ← Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ppp-shell" style={cssVars}>
      <div className="ppp-container">
        {/* Header bar */}
        <div className="ppp-topbar">
          <button className="btn btn-outline" onClick={() => navigate('/#projects')}>
            ← Back
          </button>
          <button className="btn btn-ghost" onClick={openTerminal}>
            Open Terminal
          </button>
        </div>

        {/* Project header */}
        <div className="ppp-header">
          <h1 className="ppp-title">{project.displayName}</h1>
          <p className="ppp-desc">{project.description}</p>
        </div>

        {/* Meta row */}
        <div className="ppp-meta">
          <span className="ppp-meta-item">
            <span className="ppp-meta-label">Language</span>
            <span className="ppp-meta-value">{project.language}</span>
          </span>
          <span className="ppp-meta-item">
            <span className="ppp-meta-label">Year</span>
            <span className="ppp-meta-value">{project.year}</span>
          </span>
        </div>

        {/* Tags */}
        <div className="ppp-tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="ppp-links">
          {project.github && (
            <a
              className="btn btn-outline"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </a>
          )}
          {project.url && project.url !== project.github && (
            <a
              className="btn btn-primary"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Site →
            </a>
          )}
        </div>

        {/* README */}
        <div className="ppp-readme">
          <p className="ppp-readme-label">README</p>
          <pre className="ppp-readme-content">{project.readme}</pre>
        </div>
      </div>
    </div>
  )
}
