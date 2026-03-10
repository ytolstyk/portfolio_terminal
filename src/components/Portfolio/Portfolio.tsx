import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext'
import './Portfolio.css'

const SKILLS = [
  'TypeScript', 'JavaScript', 'React', 'Python', 'Django',
  'Node.js', 'Express', 'Kotlin', 'Android',
  'MySQL', 'PostgreSQL', 'WebSockets', 'Web Audio API',
  'Vite', 'REST APIs', 'Git',
]

const EXP_COLORS = [
  { hex: '#fbbf24', rgb: '251,191,36' },   // amber
  { hex: '#22d3ee', rgb: '34,211,238' },   // cyan
  { hex: '#fb7185', rgb: '251,113,133' },  // rose
  { hex: '#34d399', rgb: '52,211,153' },   // emerald
  { hex: '#fb923c', rgb: '251,146,60' },   // orange
]

const EXPERIENCE = [
  {
    company: 'Mixpanel',
    role: 'Senior Full-Stack Engineer',
    period: 'Jan 2024 – Apr 2025',
    description: 'Built and maintained analytics product features across the full stack. Led warehouse connectors project connecting major data warehouses.',
    colorIdx: 0,
    companyBlurb: 'Mixpanel (mixpanel.com) is an events-based data analytics platform.',
    bullets: [
      'Led warehouse connectors project — a web portal for customers to connect Databricks, Redshift, BigQuery, and Snowflake warehouses to Mixpanel to import data. Responsible for the full stack: React, Python/Django, MySQL.',
      'Warehouse connectors brings in 7% of total revenue with over 5,000 successful event imports.',
      'Designed and coded test imports feature, letting users safely import small datasets into Mixpanel for validation.',
      'Worked closely with infrastructure engineers, product, and design to scope and ship new features.',
    ],
  },
  {
    company: 'Affirm',
    role: 'Senior Software Engineer',
    period: 'Mar 2021 – Oct 2023',
    description: 'Developed merchant-facing checkout integrations and internal tools. Worked on Python/Django backend services and React frontends.',
    colorIdx: 1,
    companyBlurb: 'Affirm (affirm.com) leads the Buy Now Pay Later space.',
    bullets: [
      'Built the brand new savings account experience on web, adding millions of dollars in assets.',
      'Created a promotion module to offer incentives to customers, increasing gross merchandise volume by an average of 26%.',
      'Led a team of 3 engineers building internal tools to help remediate issues for 200k customers onboarded to rewards programs.',
      'Worked closely with product and design to build four web projects on the main shop feed that generates 30% of company revenue.',
    ],
  },
  {
    company: 'Shape Security',
    role: 'Senior Software Engineer',
    period: 'Mar 2019 – Oct 2020',
    description: 'Worked on bot-detection and web security infrastructure. Built dashboards and tooling for monitoring threat traffic.',
    colorIdx: 2,
    companyBlurb: 'Shape Security — a leader in bot-detection and fraud-prevention security.',
    bullets: [
      'Created and maintained a React-based style and component library adopted by three different products.',
      'Packaged an internal web-based IDE tool and integrated it into a customer-facing management application, letting customers safely modify config files.',
      'Introduced engineering lifecycle processes: standardized design docs, code reviews, testing, standups, and retrospectives.',
      'Added error logging to three products, providing visibility into issues in production. Mentored four junior engineers.',
    ],
  },
  {
    company: 'Manifold Technology',
    role: 'Senior Software Engineer',
    period: 'Jan 2018 – Jan 2019',
    description: 'Built blockchain-related developer tooling and web interfaces for a fintech startup.',
    colorIdx: 3,
    companyBlurb: 'Manifold Technology — blockchain-based transaction infrastructure and applications for enterprises.',
    bullets: [
      'Responsible for the entire web front-end — from styling to deployment.',
      'Built and maintained scalable web applications including a commodities exchange app, influencer platform, and merchant rewards portal.',
      'Implemented the front-end workflow, style guide, linters, and deployment process.',
      'Ensured product quality with automated unit and integration tests.',
    ],
  },
  {
    company: 'Wealthfront',
    role: 'Software Engineer',
    period: 'Nov 2014 – Sep 2017',
    description: 'Developed features for the automated investing platform. Worked on the React/JavaScript frontend and Java backend services.',
    colorIdx: 4,
    companyBlurb: 'Wealthfront (wealthfront.com) is an online financial advisor and automated investment service.',
    bullets: [
      'Built the college savings accounts product in a team of 4 and launched it on schedule, adding millions in investments in the first month.',
      'Led, coded, and launched the Advanced Indexing project, providing custom client experiences at different investment tiers.',
      'Used data analysis to improve the signup flow, increasing traffic by 14%.',
    ],
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

type ExpEntry = typeof EXPERIENCE[0]

function ExperienceModal({ exp, onClose }: { exp: ExpEntry; onClose: () => void }) {
  const color = EXP_COLORS[exp.colorIdx]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="exp-modal-backdrop" onClick={onClose}>
      <div
        className="exp-modal"
        style={{ borderTopColor: color.hex }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="exp-modal-header" style={{ borderLeftColor: color.hex }}>
          <div className="exp-modal-titles">
            <span className="exp-modal-company" style={{ color: color.hex }}>{exp.company}</span>
            <span className="exp-modal-role">{exp.role}</span>
            <span className="exp-modal-period">{exp.period}</span>
          </div>
          <button className="exp-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="exp-modal-body">
          <p className="exp-modal-blurb">{exp.companyBlurb}</p>
          <ul className="exp-modal-bullets">
            {exp.bullets.map((b, i) => (
              <li key={i} className="exp-modal-bullet">
                <span className="exp-modal-dot" style={{ background: color.hex, boxShadow: `0 0 6px rgba(${color.rgb},0.6)` }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Portfolio() {
  const navigate = useNavigate()
  const { setTerminalVisible } = useAppContext()
  const [activeExp, setActiveExp] = useState<ExpEntry | null>(null)

  const openTerminal = () => setTerminalVisible(true)

  return (
    <div className="portfolio" id="portfolio-top">
      {activeExp && <ExperienceModal exp={activeExp} onClose={() => setActiveExp(null)} />}
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
                <div
                  className="experience-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveExp(exp)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveExp(exp)}
                >
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
