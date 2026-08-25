import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import "./Team.css"

const teamMembers = [
  {
    id: 1,
    name: "Nyombi Elijah",
    role: "Director & Co-founder",
    image: "/images/elijah.jpg",
    tag: "Leadership",
    description:
      "With a rich background in journalism, public health, and digital marketing communication, Elijah leads iONA TECH with a focus on digital transformation and high-quality software development.",
    skills: ["Digital Strategy", "Public Health Tech", "Marketing"],
  },
  {
    id: 2,
    name: "Nakunda Lillian",
    role: "Software Engineer & Co-founder",
    image: "/images/lillian.jpg",
    tag: "Frontend",
    description:
      "An innovative Software Engineering student at Makerere University, Lillian specialises in crafting high-quality front-end web experiences and mobile applications with a fresh, modern perspective.",
    skills: ["React", "UI/UX Design", "Mobile Dev"],
  },
  {
    id: 3,
    name: "Baliddawa Allan",
    role: "Director & Co-founder",
    image: "/images/allanella.jpg",
    tag: "Fullstack",
    description:
      "A passionate Fullstack Developer specialising in building responsive, scalable web applications. Allan brings expertise in ReactJS, Java Spring Boot, and Node.js to every project.",
    skills: ["Spring Boot", "ReactJS", "Node.js"],
  },
  {
    id: 4,
    name: "Mulungi Abigail",
    role: "JavaScript Developer & Co-founder",
    image: "/images/jordi.jpg",
    tag: "Frontend",
    description:
      "With a keen eye for innovation, Abigail excels in designing and developing scalable web applications and desktop solutions with a strong focus on exceptional software experiences.",
    skills: ["JavaScript", "Desktop Apps", "Web Architecture"],
  },
  {
    id: 5,
    name: "Mpairwe Lauben",
    role: "Software Engineer & Co-founder",
    image: "/images/alien.jpg",
    tag: "ML & Cloud",
    description:
      "With over five years of experience, Lauben's expertise sits at the intersection of mobile development, cloud-native systems, and machine learning technologies.",
    skills: ["Machine Learning", "Cloud Systems", "Mobile Dev"],
  },
  {
    id: 6,
    name: "Katongole Samuel",
    role: "Director & Co-founder",
    image: "/images/sam.jpg",
    tag: "Backend",
    description:
      "A passionate Java Developer dedicated to crafting software that inspires progress. Samuel combines technical expertise in desktop and web applications with a heart for service and collaboration.",
    skills: ["Spring Boot", "JavaFX", "React Ecosystem", "Product Design"],
  },
]

const tagColors = {
  Leadership: { bg: "rgba(34, 211, 238, 0.12)", text: "#67e8f9", dot: "#22d3ee" },
  Frontend: { bg: "rgba(52, 211, 153, 0.12)", text: "#86efac", dot: "#34d399" },
  Fullstack: { bg: "rgba(56, 189, 248, 0.12)", text: "#7dd3fc", dot: "#38bdf8" },
  "ML & Cloud": { bg: "rgba(247, 201, 72, 0.12)", text: "#f7c948", dot: "#f7c948" },
  Backend: { bg: "rgba(96, 165, 250, 0.12)", text: "#93c5fd", dot: "#60a5fa" },
}

const AUTOPLAY_MS = 6000

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export default function Team() {
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion())
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef(null)
  const sidebarRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    clearInterval(timerRef.current)
    if (isPlaying && !isHovering) {
      timerRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % teamMembers.length)
      }, AUTOPLAY_MS)
    }
    return () => clearInterval(timerRef.current)
  }, [isPlaying, isHovering])

  // Keep the active member visible when the picker is a horizontal
  // scroll strip (tablet/mobile). Scroll only this container directly —
  // item.scrollIntoView() would also nudge ancestors that merely clip
  // overflow (e.g. overflow-x: hidden further up the tree), shifting the
  // whole page sideways instead of just the strip.
  useEffect(() => {
    const container = sidebarRef.current
    const item = itemRefs.current[active]
    if (!container || !item) return
    const target = item.offsetLeft - (container.clientWidth - item.clientWidth) / 2
    container.scrollTo({
      left: Math.max(0, target),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }, [active])

  const navigate = (dir) => {
    setActive((prev) =>
      dir === "right"
        ? (prev + 1) % teamMembers.length
        : (prev - 1 + teamMembers.length) % teamMembers.length
    )
    setIsPlaying(false)
  }

  const pick = (i) => {
    setActive(i)
    setIsPlaying(false)
  }

  const pause = () => setIsHovering(true)
  const resume = () => setIsHovering(false)
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsHovering(false)
    }
  }

  const member = teamMembers[active]
  const tag = tagColors[member.tag] || tagColors["Frontend"]

  return (
    <section className="ion-section team-section" aria-labelledby="team-heading">
      <div className="ion-aurora" aria-hidden="true" />
      <div className="ion-aurora ion-aurora-right" aria-hidden="true" />

      <div className="team-container">

        {/* Header */}
        <div className="team-header">
          <p className="team-eyebrow">The people behind iONA TECH</p>
          <h2 id="team-heading" className="team-heading">
            Built by founders,<br />driven by purpose
          </h2>
        </div>

        {/* Main layout */}
        <div
          className="team-layout"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={handleBlur}
        >

          {/* Member picker — vertical list on desktop, horizontal scroll strip on mobile */}
          <div className="team-sidebar" ref={sidebarRef} aria-label="Select a team member">
            {teamMembers.map((m, i) => {
              const t = tagColors[m.tag] || tagColors["Frontend"]
              const isActive = i === active
              return (
                <button
                  key={m.id}
                  ref={(el) => (itemRefs.current[i] = el)}
                  type="button"
                  onClick={() => pick(i)}
                  className={`team-sidebar-item${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="team-avatar-sm">
                    <img
                      src={m.image || "/placeholder.svg"}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="team-avatar-sm-img"
                    />
                    {isActive && <span className="team-avatar-ring" aria-hidden="true" />}
                  </span>
                  <span className="team-sidebar-text">
                    <span className="team-sidebar-name">{m.name}</span>
                    <span className="team-tag-pill" style={{ background: t.bg, color: t.text }}>
                      <span className="team-tag-dot" style={{ background: t.dot }} />
                      {m.tag}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Featured card */}
          <div className="team-card">
            {/* Top bar */}
            <div className="team-card-top">
              <span className="team-tag-big" style={{ background: tag.bg, color: tag.text }}>
                <span className="team-tag-dot" style={{ background: tag.dot }} />
                {member.tag}
              </span>
              <div className="team-nav-row">
                <button type="button" onClick={() => navigate("left")} className="team-nav-btn" aria-label="Previous team member">
                  <ArrowLeft size={16} />
                </button>
                <span className="team-counter">{active + 1} / {teamMembers.length}</span>
                <button type="button" onClick={() => navigate("right")} className="team-nav-btn" aria-label="Next team member">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Profile area */}
            <div className="team-profile-area" aria-live="polite">
              <div className="team-image-wrap">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={180}
                  height={180}
                  loading="lazy"
                  decoding="async"
                  className="team-profile-img"
                />
              </div>

              <div className="team-profile-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-desc">{member.description}</p>

                <div className="team-skills">
                  {member.skills.map((s) => (
                    <span key={s} className="team-skill-chip">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="team-progress-bar">
              <div
                className="team-progress-fill"
                style={{ width: `${((active + 1) / teamMembers.length) * 100}%` }}
              />
            </div>

            {/* Autoplay toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="team-autoplay-btn"
              aria-pressed={isPlaying}
            >
              <span className={`team-autoplay-dot${isPlaying ? " is-playing" : ""}`} aria-hidden="true" />
              {isPlaying ? "Auto-advancing" : "Paused"}
            </button>
          </div>
        </div>

        {/* Bottom dot nav */}
        <div className="team-dots" role="group" aria-label="Team member quick navigation">
          {teamMembers.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => pick(i)}
              className={`team-dot${i === active ? " is-active" : ""}`}
              aria-label={`Go to ${teamMembers[i].name}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
