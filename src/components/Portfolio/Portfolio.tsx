import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext'
import './Portfolio.css'

const SKILLS = [
  'TypeScript', 'JavaScript', 'React', 'Python', 'Django',
  'Node.js', 'Express', 'Kotlin', 'Android',
  'MySQL', 'PostgreSQL', 'WebSockets', 'Web Audio API',
  'Vite', 'REST APIs', 'Git',
]

const EXPERIENCE = [
  {
    company: 'Mixpanel',
    role: 'Senior Software Engineer',
    period: 'Jan 2024 – Apr 2025',
    description: 'Built and maintained analytics product features across the full stack. Improved query performance and worked on data visualization tooling.',
  },
  {
    company: 'Affirm',
    role: 'Senior Software Engineer',
    period: 'Mar 2021 – Oct 2023',
    description: 'Developed merchant-facing checkout integrations and internal tools. Worked on Python/Django backend services and React frontends.',
  },
  {
    company: 'Shape Security',
    role: 'Software Engineer',
    period: 'Mar 2019 – Oct 2020',
    description: 'Worked on bot-detection and web security infrastructure. Built dashboards and tooling for monitoring threat traffic.',
  },
  {
    company: 'Manifold Technology',
    role: 'Software Engineer',
    period: 'Jan 2018 – Jan 2019',
    description: 'Built blockchain-related developer tooling and web interfaces for a fintech startup.',
  },
  {
    company: 'Wealthfront',
    role: 'Software Engineer',
    period: 'Nov 2014 – Sep 2017',
    description: 'Developed features for the automated investing platform. Worked on the React/JavaScript frontend and Java backend services.',
  },
]

const PROJECTS = [
  {
    name: 'advanced-metronome',
    displayName: 'DrummaLlama',
    description: 'Drum loop machine and metronome built with Web Audio API and React.',
    tags: ['React', 'TypeScript', 'Web Audio API'],
    colorIndex: 0,
  },
  {
    name: 'saltmarsh-timeline',
    displayName: 'Saltmarsh Timeline',
    description: 'Interactive D&D campaign timeline tool with visual event tracking.',
    tags: ['React', 'TypeScript', 'D&D'],
    colorIndex: 1,
  },
  {
    name: 'eataburrita-native',
    displayName: 'Eat-a-Burrita',
    description: 'Native Android companion app built with Kotlin and Material Design.',
    tags: ['Kotlin', 'Android', 'Mobile'],
    colorIndex: 2,
  },
  {
    name: 'battle-dice-web',
    displayName: 'Battle Dice',
    description: 'Real-time multiplayer dice battle game with WebSocket state sync.',
    tags: ['React', 'WebSockets', 'TypeScript'],
    colorIndex: 3,
  },
]

const INTERESTS = [
  '🎮 Unreal Engine 5', '📱 Android Dev', '🚴 Cycling',
  '🎸 Guitar', '📷 Photography', '🎨 Painting',
]

export function Portfolio() {
  const navigate = useNavigate()
  const { setTerminalVisible } = useAppContext()

  const openTerminal = () => setTerminalVisible(true)

  return (
    <div className="portfolio" id="portfolio-top">
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="portfolio-container">
          <div className="hero-inner">
            <img
              src="/selfie.jpg"
              alt="Yuriy Tolstykh"
              className="hero-photo"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                target.style.display = 'none'
                const placeholder = target.nextElementSibling as HTMLElement
                if (placeholder) placeholder.style.display = 'flex'
              }}
            />
            <div className="hero-photo-placeholder" style={{ display: 'none' }}>
              YT
            </div>
            <div className="hero-content">
              <h1 className="hero-name">Yuriy Tolstykh</h1>
              <p className="hero-title">Senior Software Engineer</p>
              <p className="hero-location">San Jose, CA</p>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href="https://www.linkedin.com/in/yuriy-tolstykh-2310802/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="btn btn-outline"
                  href="https://github.com/ytolstyk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <button className="btn btn-ghost" onClick={openTerminal}>
                  Open Terminal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="portfolio-section" id="about">
        <div className="portfolio-container">
          <p className="section-label">About</p>
          <h2 className="section-title">Background</h2>
          <p className="about-text">
            Full-stack software engineer with 10+ years of experience building web applications,
            mobile apps, and real-time systems. I care about clean architecture, good developer
            experience, and shipping things that work. Outside of professional work, I explore
            audio programming, game tooling, and native Android development.
          </p>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="portfolio-section" id="skills">
        <div className="portfolio-container">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technologies</h2>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <span key={s} className="skill-badge">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="portfolio-section" id="experience">
        <div className="portfolio-container">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Work History</h2>
          <div className="experience-list">
            {EXPERIENCE.map((exp) => (
              <div key={exp.company} className="experience-item">
                <div className="experience-timeline">
                  <div className="timeline-dot" />
                  <div className="timeline-line" />
                </div>
                <div className="experience-card">
                  <div className="exp-header">
                    <span className="exp-company">{exp.company}</span>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-desc">{exp.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="portfolio-section" id="projects">
        <div className="portfolio-container">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Personal Work</h2>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="project-card"
                onClick={() => navigate(`/project/${p.name}?c=${p.colorIndex}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${p.name}?c=${p.colorIndex}`)}
              >
                <div className="project-name">{p.displayName}</div>
                <div className="project-desc">{p.description}</div>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interests ── */}
      <section className="portfolio-section" id="interests">
        <div className="portfolio-container">
          <p className="section-label">Interests</p>
          <h2 className="section-title">Outside of Work</h2>
          <div className="interests-list">
            {INTERESTS.map((item) => (
              <span key={item} className="interest-item">{item}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
