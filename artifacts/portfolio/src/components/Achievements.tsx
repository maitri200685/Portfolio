import { motion } from "framer-motion";
import { Trophy, Star, Medal, Code, Users, Lightbulb } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      icon: Trophy,
      title: "Nirman Hackathon",
      desc: "Ranked in the top 6 teams . Built Collabcode in 48 hours, earning praise for innovation and execution.",
      year: "2026",
      accent: "from-amber-400/20 to-amber-900/10",
      iconColor: "text-amber-400",
    },
    {
      icon: Medal,
      title: "SIH Hackathon",
      desc: "Selected at college level in TOP 5.",
      year: "2025",
      accent: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-white">
            Achievements &amp; <span className="text-gradient">Awards</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              whileHover={{ y: -5 }}
              className="glass-card p-7 rounded-2xl relative overflow-hidden group"
              data-testid={`card-achievement-${idx}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.accent} rounded-full blur-2xl -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/8 ${item.iconColor}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-mono text-white/30">{item.year}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
