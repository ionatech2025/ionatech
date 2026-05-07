import './Tech.css'
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Globe2,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react'

const serviceChips = ['Web platforms', 'Mobile apps', 'AI/ML', 'KPI dashboards']

const proofItems = [
  { icon: <ShieldCheck size={16} />, label: 'SEO-ready builds' },
  { icon: <Cpu size={16} />, label: 'AI/ML engineering' },
  { icon: <CheckCircle2 size={16} />, label: 'Dashboards that measure' },
]

const statItems = [
  { value: '8', label: 'Service lines' },
  { value: '50+', label: 'Projects shipped' },
  { value: '24h', label: 'Inquiry response' },
]

const projectRoutes = [
  { icon: <Code2 size={18} />, label: 'React website', meta: 'SEO + service pages' },
  { icon: <Smartphone size={18} />, label: 'Flutter app', meta: 'iOS + Android' },
  { icon: <Bot size={18} />, label: 'Agentic AI', meta: 'Automated workflows' },
  { icon: <BarChart3 size={18} />, label: 'KPI dashboard', meta: 'Monitoring + reports' },
]

function GlobalNetworkGlobe() {
  return (
    <div className="tech-globe-shell" aria-hidden="true">
      <div className="tech-globe-halo" />
      <svg viewBox="0 0 420 380" className="tech-globe-svg" role="img">
        <defs>
          <radialGradient id="tech-globe-fill" cx="35%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#dff6ff" stopOpacity="0.98" />
            <stop offset="42%" stopColor="#1f8bcf" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#031227" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="tech-route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="35%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="70%" stopColor="#f7c948" stopOpacity="1" />
            <stop offset="100%" stopColor="#f7c948" stopOpacity="0" />
          </linearGradient>
          <clipPath id="tech-globe-clip">
            <circle cx="210" cy="190" r="122" />
          </clipPath>
          <filter id="tech-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse className="tech-orbit tech-orbit-wide" cx="210" cy="190" rx="180" ry="64" />
        <ellipse className="tech-orbit tech-orbit-tilt" cx="210" cy="190" rx="156" ry="46" />

        <circle cx="210" cy="190" r="122" fill="url(#tech-globe-fill)" />
        <circle className="tech-globe-crescent" cx="210" cy="190" r="122" />

        <g clipPath="url(#tech-globe-clip)">
          <g className="tech-map-spin">
            <path
              className="tech-land"
              d="M147 108c24-16 52-18 70-5 9 7 4 20-10 22-14 3-18 12-11 24 9 16-11 31-30 22-16-8-21-24-35-25-17-2-18-25 16-38Z"
            />
            <path
              className="tech-land"
              d="M242 133c31-6 68 9 73 33 4 19-21 26-36 17-13-8-26-4-33 10-10 20-39 14-35-8 4-20 8-45 31-52Z"
            />
            <path
              className="tech-land"
              d="M171 209c24-8 50 5 53 25 3 19-13 28-25 42-11 13-36 6-34-13 2-17-20-23-12-39 4-8 10-12 18-15Z"
            />
            <path
              className="tech-land"
              d="M266 226c18-7 41 7 37 26-4 20-28 31-45 23-19-8-14-41 8-49Z"
            />
          </g>

          <g className="tech-grid-spin">
            <ellipse className="tech-latitude" cx="210" cy="190" rx="122" ry="32" />
            <ellipse className="tech-latitude tech-latitude-soft" cx="210" cy="154" rx="104" ry="24" />
            <ellipse className="tech-latitude tech-latitude-soft" cx="210" cy="226" rx="104" ry="24" />
            <ellipse className="tech-meridian" cx="210" cy="190" rx="62" ry="122" />
            <ellipse className="tech-meridian" cx="210" cy="190" rx="104" ry="122" />
            <ellipse className="tech-meridian" cx="210" cy="190" rx="122" ry="122" />
          </g>
        </g>

        <path className="tech-route tech-route-one" d="M112 204 C176 106 254 97 318 160" />
        <path className="tech-route tech-route-two" d="M136 250 C212 190 278 205 340 112" />
        <path className="tech-route tech-route-three" d="M91 145 C160 193 245 234 332 221" />

        {[
          { cx: 125, cy: 206, label: 'Kampala' },
          { cx: 318, cy: 160, label: 'London' },
          { cx: 340, cy: 112, label: 'Cloud' },
          { cx: 332, cy: 221, label: 'AI' },
        ].map((point) => (
          <g key={point.label} className="tech-hub" filter="url(#tech-glow)">
            <circle cx={point.cx} cy={point.cy} r="5" />
            <circle cx={point.cx} cy={point.cy} r="12" />
          </g>
        ))}
      </svg>

      <div className="tech-floating-card tech-floating-card-one">
        <span>AI agents</span>
        <strong>Workflow automation</strong>
      </div>
      <div className="tech-floating-card tech-floating-card-two">
        <span>Dashboards</span>
        <strong>Live KPI visibility</strong>
      </div>
    </div>
  )
}

export default function Tech() {
  return (
    <section className="tech-section" aria-labelledby="hero-heading">
      <div className="tech-bg" aria-hidden="true">
        <div className="tech-grid" />
        <div className="tech-stars" />
        <div className="tech-aurora tech-aurora-one" />
        <div className="tech-aurora tech-aurora-two" />
      </div>

      <div className="tech-container">
        <div className="tech-copy">
          <div className="tech-badge">
            <span className="tech-live-dot" />
            <Sparkles size={14} />
            <span>2026 digital product engineering</span>
          </div>

          <h1 id="hero-heading" className="tech-title">
            Build web, mobile, AI and dashboard systems that scale beyond launch.
          </h1>

          <p className="tech-description">
            IONATECH builds SEO-ready websites, native and Flutter mobile apps, AI/ML
            systems, agentic workflows, KPI monitoring dashboards and custom software
            for teams in Uganda and beyond.
          </p>

          <div className="tech-actions">
            <a href="/services" className="tech-primary-cta">
              Explore services
              <ArrowRight size={18} />
            </a>
            <a href="/#contact_us" className="tech-secondary-cta">
              Start a project
            </a>
          </div>

          <div className="tech-service-chips" aria-label="Core services">
            {serviceChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className="tech-project-panel">
            <div className="tech-panel-topline">
              <span>Project router</span>
              <span>IONATECH</span>
            </div>
            <div className="tech-route-grid">
              {projectRoutes.map((route) => (
                <a key={route.label} href="/services" className="tech-route-tile">
                  <span className="tech-route-icon">{route.icon}</span>
                  <span>
                    <strong>{route.label}</strong>
                    <small>{route.meta}</small>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="tech-proof-row">
            {proofItems.map((item) => (
              <span key={item.label}>
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="tech-visual">
          <GlobalNetworkGlobe />
          <div className="tech-stat-strip">
            {statItems.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="tech-visual-caption">
            <Globe2 size={16} />
            <span>Kampala-built products, global deployment readiness</span>
          </div>
        </div>
      </div>

      <div className="tech-bottom-fade" aria-hidden="true" />
    </section>
  )
}
