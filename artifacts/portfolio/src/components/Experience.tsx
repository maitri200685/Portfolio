import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      company: "TechCorp",
      role: "Senior Software Engineer",
      duration: "2023 - Present",
      points: [
        "Architected and deployed a highly available microservices ecosystem handling 2M+ requests daily.",
        "Mentored a team of 4 junior developers and established CI/CD best practices.",
        "Reduced system latency by 40% through aggressive caching and database query optimization."
      ]
    },
    {
      company: "StartupXYZ",
      role: "Full Stack Developer",
      duration: "2022 - 2023",
      points: [
        "Built the MVP of a SaaS platform from scratch using Next.js, Node.js, and PostgreSQL.",
        "Implemented real-time collaboration features using WebSockets and CRDTs.",
        "Integrated Stripe for automated subscription billing and invoicing."
      ]
    },
    {
      company: "BigTech Inc",
      role: "Software Intern",
      duration: "2021 - 2022",
      points: [
        "Developed internal dashboards for data visualization using React and D3.js.",
        "Wrote comprehensive unit and integration tests, increasing coverage to 85%.",
        "Assisted in migrating legacy monolithic applications to Docker containers."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent md:-translate-x-1/2" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`relative flex items-center mb-12 md:mb-24 ${
                idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(180,142,255,0.5)]" />

              <div className="w-full pl-12 md:pl-0 md:w-1/2" />
              
              <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${
                idx % 2 === 0 ? "md:pr-16" : "md:pl-16"
              }`}>
                <div className="glass-card p-8 rounded-2xl hover:border-primary/30 transition-colors">
                  <span className="text-secondary font-mono text-sm mb-2 block">{exp.duration}</span>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-lg text-primary mb-6 font-medium">@ {exp.company}</h4>
                  
                  <ul className="space-y-3">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed text-sm md:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
