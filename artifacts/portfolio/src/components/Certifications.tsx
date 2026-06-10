import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Certifications() {
  const certs = [
    {
      title: "Python for Data Science & AI",
      issuer: "IBM / Coursera",
      date: "2023",
      color: "from-blue-500/20 to-blue-900/10",
    },
    {
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI",
      date: "2023",
      color: "from-violet-500/20 to-violet-900/10",
    },
    {
      title: "React – The Complete Guide",
      issuer: "Udemy",
      date: "2022",
      color: "from-cyan-500/20 to-cyan-900/10",
    },
    {
      title: "UI/UX Design Fundamentals",
      issuer: "Google / Coursera",
      date: "2023",
      color: "from-pink-500/20 to-pink-900/10",
    },
    {
      title: "Full Stack Web Development",
      issuer: "freeCodeCamp",
      date: "2022",
      color: "from-emerald-500/20 to-emerald-900/10",
    },
    {
      title: "IoT & Embedded Systems",
      issuer: "NPTEL",
      date: "2024",
      color: "from-amber-500/20 to-amber-900/10",
    },
  ];

  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Licenses &amp; <span className="text-gradient">Certifications</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group"
              data-testid={`card-cert-${idx}`}
            >
              <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${cert.color} rounded-full blur-2xl -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500`} />

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full" />
                </div>
                <div className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded-full text-xs font-medium border border-primary/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-sm font-bold text-white mb-1 leading-snug">{cert.title}</h3>
                <p className="text-muted-foreground text-xs">{cert.issuer}</p>
                <p className="text-white/30 text-xs font-mono mt-3">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
