import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Nyombi Elijah",
    role: "Director & Co-founder",
    image: "/images/elijah.jpg",
    tag: "Leadership",
    description:
      "With a rich background in journalism, public health, and digital marketing communication, Elijah leads IONATECH with a focus on digital transformation and high-quality software development.",
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

export default function Team() {
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [, setAnimDir] = useState("right")
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setAnimDir("right")
      setActive((prev) => (prev + 1) % teamMembers.length)
    }, 6000)
  }

  useEffect(() => {
    if (isPlaying) startTimer()
    else clearInterval(timerRef.current)
    return () => clearInterval(timerRef.current)
  }, [isPlaying])

  const navigate = (dir) => {
    setAnimDir(dir)
    setActive((prev) =>
      dir === "right"
        ? (prev + 1) % teamMembers.length
        : (prev - 1 + teamMembers.length) % teamMembers.length
    )
    setIsPlaying(false)
    clearInterval(timerRef.current)
  }

  const pick = (i) => {
    setAnimDir(i > active ? "right" : "left")
    setActive(i)
    setIsPlaying(false)
    clearInterval(timerRef.current)
  }

  const member = teamMembers[active]
  const tag = tagColors[member.tag] || tagColors["Frontend"]

  return (
    <section className="ion-section" style={styles.section}>
      <div className="ion-aurora" aria-hidden="true" />
      <div className="ion-aurora ion-aurora-right" aria-hidden="true" />
      {/* Background grid */}
      <div style={styles.gridBg} aria-hidden />

      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <p style={styles.eyebrow}>The people behind IONATECH</p>
          <h2 style={styles.heading}>Built by founders,<br />driven by purpose</h2>
        </div>

        {/* Main layout */}
        <div style={styles.layout}>

          {/* Left — member list */}
          <div style={styles.sidebar}>
            {teamMembers.map((m, i) => {
              const t = tagColors[m.tag] || tagColors["Frontend"]
              return (
                <button
                  key={m.id}
                  onClick={() => pick(i)}
                  style={{
                    ...styles.sidebarItem,
                    background: i === active ? "rgba(56, 189, 248, 0.1)" : "transparent",
                    borderLeft: i === active ? "3px solid #22d3ee" : "3px solid transparent",
                  }}
                >
                  <div style={styles.avatarSmall}>
                    <img
                      src={m.image || "/placeholder.svg"}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      style={styles.avatarSmallImg}
                    />
                    {i === active && <div style={styles.avatarRing} />}
                  </div>
                  <div style={styles.sidebarText}>
                    <p style={{ ...styles.sidebarName, color: i === active ? "#ffffff" : "rgba(226,232,240,0.64)" }}>
                      {m.name}
                    </p>
                    <span style={{ ...styles.tagPill, background: t.bg, color: t.text }}>
                      <span style={{ ...styles.tagDot, background: t.dot }} />
                      {m.tag}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right — featured card */}
          <div style={styles.card}>
            {/* Top bar */}
            <div style={styles.cardTop}>
              <span style={{ ...styles.tagBig, background: tag.bg, color: tag.text }}>
                <span style={{ ...styles.tagDot, background: tag.dot }} />
                {member.tag}
              </span>
              <div style={styles.navRow}>
                <button onClick={() => navigate("left")} style={styles.navBtn} aria-label="Previous">
                  <ArrowLeft size={16} />
                </button>
                <span style={styles.counter}>{active + 1} / {teamMembers.length}</span>
                <button onClick={() => navigate("right")} style={styles.navBtn} aria-label="Next">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Profile area */}
            <div style={styles.profileArea}>
              <div style={styles.imageWrap}>
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  style={styles.profileImg}
                />
                <div style={styles.imageAccent} />
              </div>

              <div style={styles.profileInfo}>
                <h3 style={styles.memberName}>{member.name}</h3>
                <p style={styles.memberRole}>{member.role}</p>
                <p style={styles.memberDesc}>{member.description}</p>

                <div style={styles.skills}>
                  {member.skills.map((s) => (
                    <span key={s} style={styles.skillChip}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${((active + 1) / teamMembers.length) * 100}%`,
                }}
              />
            </div>

            {/* Autoplay toggle */}
            <button
              onClick={() => setIsPlaying((p) => !p)}
              style={styles.autoplayBtn}
            >
              <span style={{
                ...styles.autoplayDot,
                background: isPlaying ? "#3d5afe" : "#ccc",
                boxShadow: isPlaying ? "0 0 0 5px rgba(247,201,72,0.12)" : "none",
              }} />
              {isPlaying ? "Auto-advancing" : "Paused"}
            </button>
          </div>
        </div>

        {/* Bottom dot nav */}
        <div style={styles.dots}>
          {teamMembers.map((_, i) => (
            <button
              key={i}
              onClick={() => pick(i)}
              style={{
                ...styles.dot,
                background: i === active ? "#22d3ee" : "rgba(148,163,184,0.3)",
                width: i === active ? 28 : 8,
              }}
              aria-label={`Go to ${teamMembers[i].name}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

const styles = {
  section: {
    position: "relative",
    padding: "96px 0",
    background: "transparent",
    fontFamily: "'Outfit', 'Segoe UI', sans-serif",
    overflow: "hidden",
  },
  gridBg: {
    position: "absolute",
    inset: 0,
    display: "none",
    pointerEvents: "none",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
    position: "relative",
  },
  header: {
    marginBottom: 56,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0,
    textTransform: "none",
    color: "#22d3ee",
    marginBottom: 12,
    margin: "0 0 12px",
  },
  heading: {
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: 800,
    color: "#f8fafc",
    lineHeight: 1.15,
    margin: 0,
    letterSpacing: 0,
  },
  layout: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
  },
  sidebar: {
    width: 240,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s",
    width: "100%",
  },
  avatarSmall: {
    position: "relative",
    width: 40,
    height: 40,
    flexShrink: 0,
  },
  avatarSmallImg: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
  },
  avatarRing: {
    position: "absolute",
    inset: -3,
    borderRadius: "50%",
    border: "2px solid #3d5afe",
    pointerEvents: "none",
  },
  sidebarText: {
    flex: 1,
    minWidth: 0,
  },
  sidebarName: {
    fontSize: 13,
    fontWeight: 800,
    margin: "0 0 4px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: "color 0.2s",
  },
  tagPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 11,
    fontWeight: 800,
    padding: "2px 8px",
    borderRadius: 8,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    flexShrink: 0,
  },
  card: {
    flex: 1,
    background: "linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(8, 13, 24, 0.74))",
    borderRadius: 8,
    border: "1px solid rgba(148,163,184,0.22)",
    overflow: "hidden",
    boxShadow: "0 26px 60px -34px rgba(56,189,248,0.55)",
    backdropFilter: "blur(18px)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 28px",
    borderBottom: "1px solid rgba(148,163,184,0.16)",
  },
  tagBig: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 800,
    padding: "5px 12px",
    borderRadius: 8,
    letterSpacing: 0,
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  navBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8fafc",
    transition: "all 0.2s",
  },
  counter: {
    fontSize: 12,
    fontWeight: 800,
    color: "rgba(226,232,240,0.58)",
    minWidth: 40,
    textAlign: "center",
  },
  profileArea: {
    display: "flex",
    gap: 32,
    padding: "32px 28px",
    alignItems: "flex-start",
  },
  imageWrap: {
    position: "relative",
    flexShrink: 0,
  },
  profileImg: {
    width: 140,
    height: 160,
    objectFit: "cover",
    borderRadius: 8,
    display: "block",
    position: "relative",
    zIndex: 1,
  },
  imageAccent: {
    position: "absolute",
    bottom: -8,
    right: -8,
    width: 140,
    height: 160,
    borderRadius: 8,
    border: "2px solid #22d3ee",
    opacity: 0.22,
    zIndex: 0,
  },
  profileInfo: {
    flex: 1,
    minWidth: 0,
  },
  memberName: {
    fontSize: 26,
    fontWeight: 800,
    color: "#ffffff",
    margin: "0 0 4px",
    letterSpacing: 0,
  },
  memberRole: {
    fontSize: 13,
    fontWeight: 800,
    color: "#22d3ee",
    margin: "0 0 16px",
    textTransform: "none",
    letterSpacing: 0,
  },
  memberDesc: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "rgba(226,232,240,0.72)",
    margin: "0 0 20px",
  },
  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChip: {
    fontSize: 12,
    fontWeight: 800,
    color: "rgba(226,232,240,0.82)",
    background: "rgba(15,23,42,0.52)",
    padding: "5px 12px",
    borderRadius: 8,
    border: "1px solid rgba(148,163,184,0.18)",
  },
  progressBar: {
    height: 3,
    background: "rgba(148,163,184,0.18)",
    margin: "0 28px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #22d3ee, #f7c948)",
    borderRadius: 2,
    transition: "width 0.4s ease",
  },
  autoplayBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    margin: "14px 28px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 800,
    color: "rgba(226,232,240,0.58)",
    letterSpacing: 0,
    textTransform: "none",
    padding: 0,
  },
  autoplayDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    transition: "all 0.3s",
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
    marginTop: 40,
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.3s ease",
  },
}
