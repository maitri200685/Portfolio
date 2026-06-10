import { motion } from "framer-motion";
import { Code2, Database, Layout, Server, Settings, Terminal } from "lucide-react";

export default function Skills() {
  const categories = [
    {
      title: "Programming Languages",
      icon: Terminal,
      skills: ["Python", "JavaScript", "TypeScript", "C++", "Java", "Go"]
    },
    {
      title: "Web Development",
      icon: Layout,
      skills: ["React", "Node.js", "Express", "Next.js", "HTML/CSS", "GraphQL"]
    },
    {
      title: "AI & Machine Learning",
      icon: Database,
      skills: ["TensorFlow", "PyTorch", "scikit-learn", "Hugging Face", "LangChain"]
    },
    {
      title: "DevOps & Cloud",
      icon: Server,
      skills: ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "Linux"]
    },
    {
      title: "Databases & Tools",
      icon: Settings,
      skills: ["PostgreSQL", "MongoDB", "Redis", "Git", "Figma", "VS Code"]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
              className="glass-card p-6 rounded-2xl group transition-all duration-300 hover:border-primary/50"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="glass-pill">
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
