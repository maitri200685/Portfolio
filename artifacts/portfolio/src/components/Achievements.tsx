import { motion } from "framer-motion";
import { Trophy, Star, Medal, Code } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      title: "Global Hackathon Winner",
      description: "1st place out of 500+ teams building AI agents.",
      year: "2023",
      icon: Trophy
    },
    {
      title: "Open Source Contributor of the Year",
      description: "Recognized for major contributions to React ecosystem.",
      year: "2022",
      icon: Star
    },
    {
      title: "Academic Excellence Award",
      description: "Highest academic standing in Computer Science cohort.",
      year: "2021",
      icon: Medal
    },
    {
      title: "Top 1% on LeetCode",
      description: "Consistent competitive programming performance.",
      year: "2020",
      icon: Code
    }
  ];

  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Honors & <span className="text-gradient">Awards</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-3xl text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-medium">
                {item.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
