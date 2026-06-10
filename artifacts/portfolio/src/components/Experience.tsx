import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      company: "National Hackathon",
      role: "Competitor – Top 8 Finish",
      duration: "2024",
      points: [
        "Placed Top 8 nationally, competing against 200+ teams across India.",
        "Built a full-stack AI civic platform (CivicTrack) in 24 hours under competitive conditions.",
        "Received recognition for UI innovation and practical problem-solving approach.",
      ],
    },
    {
      company: "Freelance / Self-Projects",
      role: "Full Stack Developer",
      duration: "2023 – Present",
      points: [
        "Shipped 10+ projects spanning web apps, AI integrations, and IoT data pipelines.",
        "Designed and built end-to-end: UI design in Figma → frontend in React/Next.js → backend in Python/Node.js.",
        "Integrated ML models (TensorFlow, LangChain) into production web applications.",
      ],
    },
    {
      company: "University IT Engineering",
      role: "Student Engineer",
      duration: "2021 – Present",
      points: [
        "Pursuing BE in Information Technology with a focus on AI and distributed systems.",
        "Led multiple semester projects combining hardware (IoT sensors) with software (ML pipelines).",
        "Active member of the college tech club — organized coding competitions and workshops.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Experience &amp; <span className="text-gradient">Journey</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="relative max-w-3xl">
          <div className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/40 to-transparent" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-14 md:pl-16 pb-12 last:pb-0"
            >
              <div className="absolute left-[9px] md:left-[11px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(180,142,255,0.5)]" />

              <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-primary text-sm font-medium">@ {exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-secondary/80 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                    {exp.duration}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/25 mt-1.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
