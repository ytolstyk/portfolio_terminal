import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext'
import { getProject } from '@/data/projects'
import './PortfolioProjectPage.css'

export function PortfolioProjectPage() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const { setTerminalVisible } = useAppContext()
  const project = name ? getProject(name) : undefined

  const openTerminal = () => {
    navigate('/')
    setTerminalVisible(true)
  }

  if (!project) {
    return (
      <div className="ppp-shell">
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
    <div className="ppp-shell">
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
