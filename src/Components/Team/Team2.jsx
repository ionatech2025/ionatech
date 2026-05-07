import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const teamMembers = [
    {
        id: 1,
        name: "Nyombi Elijah",
        role: "Director | Co-founder",
        image: "/images/elijah.jpg",
        bio: "Elijah leads iONA Tech with a focus on digital transformation. With a background in journalism and public health, he bridges the gap between complex communication and high-quality software development.",
        focus: ["Digital Strategy", "Product Vision"]
    },
    {
        id: 2,
        name: "Nakunda Lillian",
        role: "Lead Systems Analyst | Co-founder",
        image: "/images/lillian.jpg",
        bio: "An innovative engineer specializing in front-end architecture and graphic systems. Lillian brings a modern perspective to the Ugandan tech space, focusing on mobile-first user experiences.",
        focus: ["UI/UX Engineering", "System Analysis"]
    },
    {
        id: 3,
        name: "Baliddawa Allan",
        role: "Fullstack Architect | Co-founder",
        image: "/images/allanella.jpg",
        bio: "Allan is a passionate architect specializing in Spring Boot and React ecosystems. He focuses on building the scalable backbone of iONA's enterprise-grade applications.",
        focus: ["Backend Architecture", "Cloud Systems"]
    },
    {
        id: 4,
        name: "Mulungi Abigail",
        role: "Software Engineer | Co-founder",
        image: "/images/jordi.jpg",
        bio: "Expert in crafting desktop and web solutions with a keen eye for innovation. Abigail excels in designing scalable JS environments and high-performance desktop applications.",
        focus: ["JavaScript Core", "Desktop Dev"]
    },
    {
        id: 5,
        name: "Mpairwe Lauben",
        role: "AI & Cloud Engineer | Co-founder",
        image: "/images/alien.jpg",
        bio: "With 5+ years of experience, Lauben focuses on the intersection of Machine Learning and Cloud-native systems, driving intelligent automation for our partners.",
        focus: ["Machine Learning", "Cloud Native"]
    },
    {
        id: 6,
        name: "Katongole Samuel",
        role: "Director | Co-founder",
        image: "/images/sam.jpg",
        bio: "Dedicated to crafting software that inspires progress. Samuel combines technical expertise with a mission-driven approach to deliver high-value functional applications.",
        focus: ["Java Engineering", "Mission Strategy"]
    }
]

export default function Team() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isChanging, setIsChanging] = useState(false)

    const handleSlideChange = (newIndex) => {
        setIsChanging(true)
        setTimeout(() => {
            setCurrentIndex(newIndex)
            setIsChanging(false)
        }, 300)
    }

    const nextSlide = () => handleSlideChange((currentIndex + 1) % teamMembers.length)
    const prevSlide = () => handleSlideChange((currentIndex - 1 + teamMembers.length) % teamMembers.length)

    const current = teamMembers[currentIndex]

    return (
        <section id="team" className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-20">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Our Leadership</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built by <span className="text-blue-500 font-serif italic">Innovators</span></h2>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">

                    {/* Image Side */}
                    <div className="lg:col-span-5 relative group">
                        <div className={`transition-all duration-500 transform ${isChanging ? 'scale-95 opacity-0 blur-md' : 'scale-100 opacity-100 blur-0'}`}>
                            <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] border border-white/10">
                                <img
                                    src={current.image}
                                    alt={current.name}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Name Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-2xl shadow-2xl hidden lg:block">
                                <p className="text-sm font-bold uppercase tracking-tighter opacity-80 mb-1">Founder Member</p>
                                <p className="text-xl font-bold">{current.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-7 lg:pl-12">
                        <div className={`transition-all duration-500 delay-100 ${isChanging ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                            <Quote className="text-blue-500/20 mb-8" size={60} />

                            <h3 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">
                                {current.role}
                            </h3>

                            <p className="text-2xl md:text-3xl text-slate-200 leading-tight mb-8 font-medium">
                                {current.bio}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {current.focus.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Navigation Controls */}
                            <div className="flex items-center gap-8">
                                <div className="flex gap-4">
                                    <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                <div className="h-[1px] flex-grow bg-white/10" />

                                <span className="text-slate-500 font-mono text-sm">
                                    0{currentIndex + 1} / 0{teamMembers.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Navigator */}
                <div className="mt-24 grid grid-cols-3 md:grid-cols-6 gap-4 border-t border-white/5 pt-12">
                    {teamMembers.map((member, i) => (
                        <button
                            key={member.id}
                            onClick={() => handleSlideChange(i)}
                            className={`text-left group transition-all duration-300 ${i === currentIndex ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
                        >
                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 transition-colors ${i === currentIndex ? 'text-blue-500' : 'text-slate-500'}`}>
                                {member.name.split(' ')[1]}
                            </p>
                            <div className={`h-1 w-full rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-blue-600' : 'bg-white/10 group-hover:bg-white/20'}`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}