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
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const stats = [
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Projects Completed", value: 40, suffix: "+" },
    { label: "Certifications", value: 12, suffix: "" },
    { label: "Technologies", value: 25, suffix: "+" }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square max-w-md mx-auto glass-card rounded-3xl p-8 relative group overflow-hidden border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-full h-full rounded-2xl bg-background border border-white/5 relative flex items-center justify-center overflow-hidden">
              {/* Abstract avatar replacement */}
              <div className="absolute w-[150%] h-[150%] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-primary via-background to-secondary animate-spin-slow opacity-30 blur-2xl" />
              <div className="text-8xl font-display font-bold text-white relative z-10 opacity-90 drop-shadow-[0_0_15px_rgba(180,142,255,0.5)]">
                IE
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 glass-card px-6 py-3 rounded-full flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-white">Open to opportunities</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
              Behind the <span className="text-gradient">Code</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed text-lg font-light">
            <p>
              I'm an engineer who treats code like craft. I don't just assemble libraries; I build robust, scalable architectures that solve complex business problems elegantly.
            </p>
            <p>
              My background spans from low-level systems programming to deploying global-scale AI applications. I thrive in that sweet spot where deep technical complexity meets intuitive user experience.
            </p>
            <p>
              When I'm not architecting systems, you'll find me contributing to open-source, exploring the latest in machine learning, or optimizing my Neovim config for the 100th time.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-3xl font-bold text-white mb-1 font-display">
                  <Counter from={0} to={stat.value} />
                  {stat.suffix}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
