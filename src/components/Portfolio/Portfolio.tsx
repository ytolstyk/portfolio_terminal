import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import "./Portfolio.css";

const SKILLS = [
  "TypeScript",
  "JavaScript",
  "React",
  "Redux",
  "Python",
  "Django",
  "Ruby on Rails",
  "Node.js",
  "GraphQL",
  "MySQL",
  "PostgreSQL",
  "WebSockets",
  "REST APIs",
  "Webpack",
  "Vite",
  "AWS",
  "CI/CD",
  "LLMs",
  "Claude Code",
  "AI Agents",
  "MCP",
];

const EXP_COLORS = [
  { hex: "#fbbf24", rgb: "251,191,36" }, // amber
  { hex: "#22d3ee", rgb: "34,211,238" }, // cyan
  { hex: "#fb7185", rgb: "251,113,133" }, // rose
  { hex: "#34d399", rgb: "52,211,153" }, // emerald
  { hex: "#fb923c", rgb: "251,146,60" }, // orange
];

const EXPERIENCE = [
  {
    company: "Mixpanel",
    role: "Senior Full-Stack Engineer",
    period: "Jan 2024 - Apr 2025",
    description:
      "Architected and led the warehouse connectors initiative, enabling 5,000+ enterprise customers to sync Databricks, Redshift, BigQuery, and Snowflake with Mixpanel. Directly generated 7% of total company revenue.",
    colorIdx: 0,
    companyBlurb:
      "Mixpanel (mixpanel.com) is an events-based data analytics platform.",
    bullets: [
      "Architected and led the high-impact warehouse connectors initiative, enabling 5,000+ enterprise customers to sync Databricks, Redshift, BigQuery, and Snowflake with Mixpanel. Engineered the end-to-end stack using React, Python/Django, and MySQL.",
      "Directly generated 7% of total company revenue by scaling the platform to handle over 5,000 successful automated event imports.",
      "Designed and deployed a data validation pipeline that allowed customers to safely stage and upgrade event subsets to full production imports.",
      "Directed the technical roadmap and agile execution, cross-functionally leading product and design teams to deliver scalable data integration solutions.",
    ],
  },
  {
    company: "Affirm",
    role: "Senior Software Engineer",
    period: "Mar 2021 - Oct 2023",
    description:
      "Led two work streams in the Rewards team, enabling rewards campaign management and dispute resolution. Ran experiments on the web shopping feed that generates 30% of company revenue.",
    colorIdx: 1,
    companyBlurb: "Affirm (affirm.com) leads the Buy Now Pay Later space.",
    bullets: [
      "Built the brand new savings account experience on the web, adding millions of dollars in assets.",
      "Created a promotion module to offer incentives to customers, increasing gross merchandise volume by an average of 26%.",
      "Significantly reduced tech debt and code complexity, separating data logic from view logic using custom React hooks. Added ESLint and TypeScript checks to run in pull requests.",
      "Led a team of 3 engineers building internal tools to help remediate issues for 200k customers onboarded to rewards programs. Authored tech specs, provided estimates, wrote and reviewed code, reported regular project updates, and ran user acceptance testing.",
      "Ran four experiments on the main shop feed website that generates 30% of the company revenue.",
    ],
  },
  {
    company: "Shape Security",
    role: "Senior Software Engineer",
    period: "Mar 2019 - Oct 2020",
    description:
      "Worked on bot-detection and web security infrastructure. Built dashboards and tooling for monitoring threat traffic.",
    colorIdx: 2,
    companyBlurb:
      "Shape Security (acquired by F5) was a leader in bot-detection and fraud-prevention security.",
    bullets: [
      "Engineered and maintained a React-based design system and component library, accelerating development velocity across three distinct product lines.",
      "Launched an internal web-based IDE via NPM, enabling enterprise customers to safely modify configurations directly within management applications.",
      "Standardized the engineering lifecycle (design docs, code reviews, testing), resulting in measurably higher code quality and team productivity.",
      "Implemented automated error logging across the product suite, providing critical real-time visibility into production stability.",
      "Mentored four junior engineers, fostering technical growth and best practices within the organization.",
    ],
  },
  {
    company: "Manifold Technology",
    role: "Senior Software Engineer",
    period: "Jan 2018 - Jan 2019",
    description:
      "Built blockchain-related developer tooling and web interfaces for a fintech startup.",
    colorIdx: 3,
    companyBlurb:
      "Manifold Technology (defunct) developed blockchain-based transaction infrastructure and applications for enterprises.",
    bullets: [
      "Owned the end-to-end web frontend architecture, managing the complete lifecycle from initial design and styling to production deployment.",
      "Architected and scaled diverse web applications, including a commodities exchange, an influencer-content creator marketplace, and a merchant rewards portal.",
      "Standardized frontend workflows by implementing comprehensive style guides, automated linters, and robust CI/CD deployment processes.",
      "Ensured high product reliability through the implementation of automated unit and integration testing suites.",
    ],
  },
  {
    company: "Wealthfront",
    role: "Software Engineer",
    period: "Nov 2014 - Sep 2017",
    description:
      "Developed features for the automated investing platform. Worked on the React/JavaScript frontend and Ruby on Rails backend services.",
    colorIdx: 4,
    companyBlurb:
      "Wealthfront (wealthfront.com) is an online financial advisor and automated investment service.",
    bullets: [
      "Led the successful launch of college savings accounts and Advanced Indexing projects, driving millions of dollars in new investments.",
      "Optimized signup flow through data analysis, resulting in a 14% increase in traffic.",
    ],
  },
  {
    company: "Epic",
    role: "Application Support Engineer",
    period: "Apr 2012 - Feb 2014",
    description:
      "Developed fixes and enhancements for the Epic 2014 release. Managed a Russian localization team of 10.",
    colorIdx: 0,
    companyBlurb:
      "Epic (Verona, WI) is a leading healthcare IT provider covering more than 50% of US patients.",
    bullets: [
      "Developed 40 documented fixes for the Epic 2014 release and managed a Russian localization team of 10.",
    ],
  },
];

const PROJECTS = [
  {
    name: "advanced-metronome",
    displayName: "DrummaLlama",
    description:
      "Advanced metronome and beat looper built with Claude Code.",
    tags: ["React", "TypeScript", "Web Audio API", "Claude Code"],
    colorIndex: 0,
  },
  {
    name: "saltmarsh-timeline",
    displayName: "Saltmarsh Timeline",
    description:
      "D&D events timeline built with React and GraphQL.",
    tags: ["React", "TypeScript", "GraphQL"],
    colorIndex: 1,
  },
  {
    name: "eataburrita-native",
    displayName: "Eat-a-Burrita",
    description:
      "Burrito locator app built with Kotlin and Jetpack Compose.",
    tags: ["Kotlin", "Android", "Jetpack Compose"],
    colorIndex: 2,
  },
  {
    name: "battle-dice-web",
    displayName: "Battle Dice",
    description:
      "Real-time multiplayer dice game using WebSockets.",
    tags: ["React", "WebSockets", "TypeScript"],
    colorIndex: 3,
  },
  {
    name: "dark-forest",
    displayName: "Dark Forest",
    description:
      "Top-down survival horror game with procedural terrain and enemy AI built with Pixi.js.",
    tags: ["TypeScript", "Pixi.js", "Procedural Gen", "Claude Code"],
    colorIndex: 4,
  },
];

const INTERESTS = [
  "🎮 Unreal Engine 5",
  "📱 Android Dev",
  "🚴 Cycling",
  "🎸 Guitar",
  "📷 Photography",
  "🎨 Painting",
];

type ExpEntry = (typeof EXPERIENCE)[0];

function ExperienceModal({
  exp,
  onClose,
}: {
  exp: ExpEntry;
  onClose: () => void;
}) {
  const color = EXP_COLORS[exp.colorIdx];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="exp-modal-backdrop" onClick={onClose}>
      <div
        className="exp-modal"
        style={{ borderTopColor: color.hex }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="exp-modal-header"
          style={{ borderLeftColor: color.hex }}
        >
          <div className="exp-modal-titles">
            <span className="exp-modal-company" style={{ color: color.hex }}>
              {exp.company}
            </span>
            <span className="exp-modal-role">{exp.role}</span>
            <span className="exp-modal-period">{exp.period}</span>
          </div>
          <button
            className="exp-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="exp-modal-body">
          <p className="exp-modal-blurb">{exp.companyBlurb}</p>
          <ul className="exp-modal-bullets">
            {exp.bullets.map((b, i) => (
              <li key={i} className="exp-modal-bullet">
                <span
                  className="exp-modal-dot"
                  style={{
                    background: color.hex,
                    boxShadow: `0 0 6px rgba(${color.rgb},0.6)`,
                  }}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const navigate = useNavigate();
  const { setTerminalVisible } = useAppContext();
  const [activeExp, setActiveExp] = useState<ExpEntry | null>(null);

  const openTerminal = () => setTerminalVisible(true);

  return (
    <div className="portfolio" id="portfolio-top">
      {activeExp && (
        <ExperienceModal exp={activeExp} onClose={() => setActiveExp(null)} />
      )}
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="portfolio-container">
          <div className="hero-inner">
            <img
              src="/selfie.jpg"
              alt="Yuriy Tolstykh"
              className="hero-photo"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = "flex";
              }}
            />
            <div className="hero-photo-placeholder" style={{ display: "none" }}>
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
                <a
                  className="btn btn-ghost"
                  href="mailto:yuriy.tolstykh@gmail.com"
                >
                  Contact Me
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
            Senior Full-Stack Engineer with 10+ years of experience driving
            multi-million dollar revenue growth through expert API design,
            high-performance React UIs, and AI-driven automation. I bridge
            complex data systems with seamless customer experiences, delivering
            scalable features that serve thousands of enterprise clients.
            Outside of work I explore game development with UE5, Android apps,
            and audio programming.
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
              <span key={s} className="skill-badge">
                {s}
              </span>
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
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && setActiveExp(exp)
                  }
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
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  navigate(`/project/${p.name}?c=${p.colorIndex}`)
                }
              >
                <div className="project-name">{p.displayName}</div>
                <div className="project-desc">{p.description}</div>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag">
                      {t}
                    </span>
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
              <span key={item} className="interest-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
