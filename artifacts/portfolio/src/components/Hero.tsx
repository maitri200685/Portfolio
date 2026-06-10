import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";

export default function Hero() {
  const titles = ["IT Engineering Student", "Full Stack Developer", "Data Science", "AI Developer"];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-mono text-base tracking-[0.2em] uppercase"
          >
            
          </motion.p>

          <h1 className="text-7xl md:text-8xl font-bold font-display tracking-tight text-white leading-[1.08] uppercase">
            <span className="text-gradient">MAITRI</span><br />
            PRAJAPATI
          </h1>

          <div className="h-10 relative overflow-hidden">
            <motion.p
              key={titleIndex}
              initial={{ y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -36, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-3xl text-primary font-medium absolute"
            >
              {titles[titleIndex]}
            </motion.p>
          </div>

          <p className="text-muted-foreground max-w-md leading-relaxed text-xl font-light">
            I'm excited to share my journey, experiences, and the work that reflects my passion for growth, creativity, and innovation.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              data-testid="button-contact"
              className="magnetic-btn px-7 py-3 rounded-full border border-primary/40 text-white font-semibold text-base hover:bg-primary/10 transition-colors flex items-center gap-2"
            >
              Contact Me
            </a>
            <button
              data-testid="button-resume"
              className="magnetic-btn px-7 py-3 rounded-full border border-primary/40 text-white font-semibold text-base hover:bg-primary/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" /> Download Resume
            </button>
          </div>

          <div className="flex items-center gap-5 pt-4">
            {[
              
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-testid={`link-${label.toLowerCase()}`}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-all duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
