import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const education = [
    {
      degree: "M.S. Computer Science (AI Specialization)",
      institution: "Stanford University",
      years: "2024 - Present",
      details: "Focusing on large language models and distributed systems.",
    },
    {
      degree: "B.Tech Computer Science",
      institution: "XYZ University",
      years: "2020 - 2024",
      details: "Graduated Summa Cum Laude. GPA: 3.9/4.0",
    }
  ];

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Academic <span className="text-gradient">Journey</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/30" />

          {education.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative pl-16 mb-12 last:mb-0"
            >
              <div className="absolute left-0 top-2 w-12 h-12 rounded-full bg-background border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(180,142,255,0.2)]">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>

              <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-colors">
                <span className="text-secondary font-mono text-sm mb-2 block">{item.years}</span>
                <h3 className="text-xl font-bold text-white mb-1">{item.degree}</h3>
                <h4 className="text-md text-primary/80 mb-4">{item.institution}</h4>
                <p className="text-muted-foreground text-sm">{item.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
