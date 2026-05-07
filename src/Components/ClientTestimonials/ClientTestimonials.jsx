import { Star, CheckCircle2 } from "lucide-react";

const ClientTestimonials = ({
  testimonials = [
    {
      id: 1,
      name: "Mutebi Christopher",
      role: "Marketing Manager",
      company: "City Sites",
      image: "/images/chris.jpg",
      quote: "The team at IONATECH exceeded our expectations in every way. Their expertise and professionalism made the entire process seamless.",
    },
    {
      id: 2,
      name: "Paul Lwanawetaase",
      role: "Founder",
      company: "PrintforAChild Foundation",
      image: "/images/paul.jpeg",
      quote: "It's a team of professionals, efficient, effective and very good at communication. They worked on our project and delivered on time, and it's always a pleasure working with them.",
    },
    {
      id: 3,
      name: "Richard Musumba",
      role: "Director",
      company: "Makland Institute",
      image: "/images/makland_boss.png",
      quote: "We found the team at IONATECH spot on. They effectively delivered our project on time tailored on great ideas.",
    },
  ],
}) => {
  return (
    <section
      id="testimonials"
      className="ion-section relative py-24 overflow-hidden"
    >
      <div className="ion-aurora" aria-hidden="true" />
      <div className="ion-aurora ion-aurora-right" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-16">
          <div className="ion-badge mb-5">
            <span className="ion-live-dot" />
            Client feedback
          </div>
          <h2 className="ion-heading text-4xl md:text-5xl mb-4">
            Trusted in <span className="ion-heading-accent">Kampala</span>
          </h2>
          <p className="ion-copy max-w-xl">
            Real feedback from partners who have scaled with our engineering.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="ion-card p-8 transition-all duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-300 fill-amber-300" />
                ))}
              </div>

              <p className="text-slate-200 text-lg leading-relaxed mb-8 font-medium">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full object-cover grayscale hover:grayscale-0 transition-all"
                    onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.name); }}
                  />
                  <CheckCircle2 className="absolute -bottom-1 -right-1 text-cyan-300 bg-slate-950 rounded-full" size={16} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.company} | {t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
