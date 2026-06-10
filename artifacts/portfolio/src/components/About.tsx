import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

const timeline = [
  { year: "2021 – Present", label: "Engineering Journey", desc: "Pursuing IT Engineering with a passion for building systems." },
  { year: "2022",            label: "Technology Exploration", desc: "Deep-dived into Python, data structures, and core CS fundamentals." },
  { year: "2023",            label: "Web Development", desc: "Mastered React and Next.js, shipping production-grade web apps." },
  { year: "2023 – 2024",    label: "AI Development", desc: "Integrated ML models into real products — JARVIS, Soil Analysis." },
  { year: "2024+",           label: "Future Vision", desc: "Building AI-driven ecosystems that create measurable impact." },
];

export default function About() {
  const stats = [
    { label: "Shipped Projects", value: 10, suffix: "+" },
    { label: "Hackathon Rank",   value: 8,  suffix: "th National" },
    { label: "Technologies",     value: 15, suffix: "+" },
    { label: "Certifications",   value: 6,  suffix: "" },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Avatar card */}
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden group max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="aspect-square rounded-2xl bg-background border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-[200%] h-[200%] bg-gradient-conic from-primary via-background to-secondary opacity-20 blur-3xl animate-spin" style={{ animationDuration: "12s" }} />
                <span className="text-7xl font-display font-bold text-white relative z-10 drop-shadow-[0_0_20px_rgba(180,142,255,0.6)]">
                  MP
                </span>
              </div>
              <div className="absolute bottom-4 right-4 glass-card px-4 py-2 rounded-full flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs font-medium text-white">Open to opportunities</span>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
              <p>
                I'm Maitri Prajapati — an IT Engineering student driven by engineering curiosity and the "why" behind every line of code.
              </p>
              <p>
                I build intelligent systems at the intersection of full-stack development and AI. My work spans sleek UI design, robust backend services, and ML-powered features that create real-world impact.
              </p>
              <p>
                From national hackathons to deployed products, I turn complex problems into clean, elegant software.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 pt-4 border-t border-white/8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-white mb-0.5 font-display">
                    <Counter from={0} to={stat.value} />
                    {stat.suffix}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: journey timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-8 font-display">My Journey</h3>
            <div className="relative space-y-0">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8 pb-8 last:pb-0"
                >
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(180,142,255,0.5)]" />
                  <span className="text-xs font-mono text-primary/70 mb-1 block">{item.year}</span>
                  <h4 className="text-sm font-semibold text-white mb-1">{item.label}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
