import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Layout, Brain, Wrench } from "lucide-react";

const categories = [
  {
    title: "Programming",
    icon: Code2,
    skills: [
      { name: "Python",     pct: 90 },
      { name: "Java",       pct: 78 },
      { name: "JavaScript", pct: 88 },
      { name: "C",          pct: 70 },
    ],
  },
  {
    title: "Web",
    icon: Layout,
    skills: [
      { name: "HTML / CSS", pct: 95 },
      { name: "React",      pct: 88 },
      { name: "Next.js",    pct: 82 },
      { name: "Node.js",    pct: 75 },
    ],
  },
  {
    title: "AI & Data",
    icon: Brain,
    skills: [
      { name: "Machine Learning", pct: 80 },
      { name: "Data Science",     pct: 75 },
      { name: "TensorFlow",       pct: 72 },
      { name: "FastAPI",          pct: 78 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "GitHub",  pct: 92 },
      { name: "VS Code", pct: 95 },
      { name: "Figma",   pct: 80 },
      { name: "Canva",   pct: 85 },
    ],
  },
];

const FILTERS = ["All", "Programming", "Web", "AI & Data", "Tools"];

function SkillBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/80 font-medium">{name}</span>
        <span className="text-xs font-mono text-primary/70">{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("All");

  const visible = active === "All"
    ? categories
    : categories.filter(c => c.title === active);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Skills &amp; <span className="text-gradient">Expertise</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              data-testid={`filter-${f.toLowerCase().replace(/[\s&]+/g, "_")}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                active === f
                  ? "bg-primary text-background border-primary"
                  : "border-white/10 text-muted-foreground hover:border-primary/40 hover:text-white bg-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {visible.map((cat, idx) => (
            <motion.div
              key={cat.title}
              variants={item}
              whileHover={{ scale: 1.02, rotateY: 4, rotateX: -3 }}
              className="glass-card p-6 rounded-2xl group hover:border-primary/40 transition-all duration-300"
              style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-white">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    pct={skill.pct}
                    delay={idx * 0.05 + sIdx * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
