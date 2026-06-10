import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Brain, Wrench, Database, Sparkles } from "lucide-react";

const categories = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: Code2,
    skills: ["Python", "Java", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["Machine Learning", "Data Science", "Data Analysis", "NumPy", "Pandas", "Scikit-Learn", "Google Gemini API", "AI Automation"],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: Wrench,
    skills: ["Git & GitHub", "VS Code", "Canva", "Figma", "Arduino IDE", "Unity", "Google Colab", "Jupyter Notebook"],
  },
  {
    id: "databases",
    title: "Database Technologies",
    icon: Database,
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    id: "learning",
    title: "Currently Learning",
    icon: Sparkles,
    skills: ["Deep Learning", "Advanced React", "Unity Game Development", "Cloud Computing", "AI Model Deployment", "Digital Marketing"],
    isLearning: true,
  },
];

const FILTERS = [
  { label: "All",           id: "all" },
  { label: "Programming",   id: "programming" },
  { label: "AI & ML",       id: "ai" },
  { label: "Tools",         id: "tools" },
  { label: "Databases",     id: "databases" },
  { label: "Learning",      id: "learning" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Skills() {
  const [active, setActive] = useState("all");

  const visible = active === "all"
    ? categories
    : categories.filter(c => c.id === active);

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
              key={f.id}
              onClick={() => setActive(f.id)}
              data-testid={`filter-${f.id}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                active === f.id
                  ? "bg-primary text-background border-primary"
                  : "border-white/10 text-muted-foreground hover:border-primary/40 hover:text-white bg-transparent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {visible.map((cat) => (
            <motion.div
              key={cat.id}
              variants={item}
              whileHover={{ scale: 1.02, rotateY: 3, rotateX: -2 }}
              className={`glass-card p-6 rounded-2xl group hover:border-primary/40 transition-all duration-300 ${
                cat.isLearning ? "border-secondary/20 md:col-span-2 xl:col-span-1" : ""
              }`}
              style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors ${cat.isLearning ? "text-secondary" : "text-primary"}`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                  {cat.isLearning && (
                    <span className="text-[10px] font-mono text-secondary/70">In progress</span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-200 group-hover:border-primary/30 ${
                      cat.isLearning
                        ? "bg-secondary/5 border-secondary/15 text-secondary/80"
                        : "bg-white/4 border-white/10 text-muted-foreground"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
