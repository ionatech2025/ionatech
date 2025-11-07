import React from "react";

// ClientTestimonials.jsx
// A responsive testimonials component using TailwindCSS.
// Props:
// - testimonials: array of { id, name, title, company, image, quote }
// - className: optional extra classes to wrapper
// - columns: number of columns on large screens (default 3)

const ClientTestimonials = ({
  testimonials = [
    {
      id: 1,
      name: "Mutebi Christopher",
      title: "Marketing Manager",
      company: "City Sites",
      image: "/images/chris.jpg",
      quote:
        "The team at Iona Tech exceeded our expectations in every way. Their expertise and professionalism made the entire process seamless.",
    },
    {
      id: 2,
      name: "Aisha Namutebi",
      title: "Project Lead",
      company: "GreenGrid",
      image: "/assets/aisha.jpg",
      quote:
        "They delivered ahead of schedule and kept communication crystal clear. Highly recommend for any web project.",
    },
    {
      id: 3,
      name: "John Okello",
      title: "CTO",
      company: "FinConnect",
      image: "/assets/john.jpg",
      quote:
        "Solid engineering and a friendly team. We saw measurable improvements in performance and conversion.",
    },
  ],
  className = "",
  columns = 3,
}) => {
  // Tailwind grid column class based on `columns` prop
  const colsClass = columns === 1 ? "grid-cols-1" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className={`py-8 px-4 sm:px-6 lg:px-8 ${className}`} aria-label="Client testimonials">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">What our clients say</h2>
          <p className="mt-2 text-sm text-gray-600">Real feedback from customers who trusted us.</p>
        </header>

        <div className={`grid gap-6 sm:grid-cols-1 ${colsClass}`}>
          {testimonials.map((t) => (
            <article key={t.id} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <blockquote className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">“{t.quote}”</blockquote>

              <div className="mt-4 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={`${t.name} avatar`}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-slate-700"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.title} — {t.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
