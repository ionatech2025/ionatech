import { useState, useEffect, useRef, useMemo } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useContent } from "../../lib/api"
import { teamMembers as teamFallback, getTagStyle, mergeTeamMembers } from "../../data/team"
import "./Team.css"

const AUTOPLAY_MS = 6000

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export default function Team() {
  const liveTeam = useContent("team", teamFallback)
  const teamMembers = useMemo(() => mergeTeamMembers(liveTeam, teamFallback), [liveTeam])
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion())
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef(null)
  const sidebarRef = useRef(null)
  const itemRefs = useRef([])

  const currentIndex = teamMembers.length > 0 ? active % teamMembers.length : 0

  useEffect(() => {
    clearInterval(timerRef.current)
    if (isPlaying && !isHovering && teamMembers.length > 1) {
      timerRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % teamMembers.length)
      }, AUTOPLAY_MS)
    }
    return () => clearInterval(timerRef.current)
  }, [isPlaying, isHovering, teamMembers.length])

  // Keep the active member visible when the picker is a horizontal
  // scroll strip (tablet/mobile). Scroll only this container directly —
  // item.scrollIntoView() would also nudge ancestors that merely clip
  // overflow (e.g. overflow-x: hidden further up the tree), shifting the
  // whole page sideways instead of just the strip.
  useEffect(() => {
    const container = sidebarRef.current
    const item = itemRefs.current[currentIndex]
    if (!container || !item) return
    const target = item.offsetLeft - (container.clientWidth - item.clientWidth) / 2
    container.scrollTo({
      left: Math.max(0, target),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }, [currentIndex])

  if (teamMembers.length === 0) return null

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

  const member = teamMembers[currentIndex]
  const tag = getTagStyle(member.tag, member.role)

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
              const t = getTagStyle(m.tag, m.role)
              const isActive = i === currentIndex
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
                <span className="team-counter">{currentIndex + 1} / {teamMembers.length}</span>
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
                <p className="team-member-desc">{member.bio || member.description}</p>

                {member.skills?.length > 0 && (
                  <div className="team-skills">
                    {member.skills.map((s) => (
                      <span key={s} className="team-skill-chip">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="team-progress-bar">
              <div
                className="team-progress-fill"
                style={{ width: `${((currentIndex + 1) / teamMembers.length) * 100}%` }}
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
              key={teamMembers[i].id ?? i}
              type="button"
              onClick={() => pick(i)}
              className={`team-dot${i === currentIndex ? " is-active" : ""}`}
              aria-label={`Go to ${teamMembers[i].name}`}
              aria-current={i === currentIndex ? "true" : undefined}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
