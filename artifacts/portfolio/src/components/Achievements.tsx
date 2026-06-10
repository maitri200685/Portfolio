import { motion } from "framer-motion";
import { Trophy, Star, Medal, Code, Users, Lightbulb } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      icon: Trophy,
      title: "Top 8 – National Hackathon",
      desc: "Ranked in the top 8 teams nationally. Built CivicTrack in 24 hours, earning praise for innovation and execution.",
      year: "2024",
      accent: "from-amber-400/20 to-amber-900/10",
      iconColor: "text-amber-400",
    },
    {
      icon: Star,
      title: "10+ Shipped Projects",
      desc: "Consistently shipped full-stack and AI products — from idea to deployment — across web, mobile, and IoT domains.",
      year: "2021 – Present",
      accent: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
    },
    {
      icon: Code,
      title: "JARVIS AI System",
      desc: "Built a personal AI assistant ecosystem recognized by peers and faculty for its technical depth and practical utility.",
      year: "2024",
      accent: "from-violet-400/20 to-violet-900/10",
      iconColor: "text-violet-400",
    },
    {
      icon: Lightbulb,
      title: "IoT + ML Research Project",
      desc: "Soil Moisture Analysis project selected for university-level research showcase. Combines hardware sensing with predictive ML.",
      year: "2023",
      accent: "from-emerald-400/20 to-emerald-900/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: Users,
      title: "Tech Club Leadership",
      desc: "Organized and hosted coding workshops and competitions for 100+ students in the college tech community.",
      year: "2022 – Present",
      accent: "from-pink-400/20 to-pink-900/10",
      iconColor: "text-pink-400",
    },
    {
      icon: Medal,
      title: "UI Design Recognition",
      desc: "Work in Figma and production UI praised at hackathons and by faculty for clean, user-centric design thinking.",
      year: "2023",
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
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Achievements &amp; <span className="text-gradient">Awards</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
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
              className="glass-card p-6 rounded-2xl relative overflow-hidden group"
              data-testid={`card-achievement-${idx}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.accent} rounded-full blur-2xl -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/8 ${item.iconColor}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-white/30">{item.year}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
