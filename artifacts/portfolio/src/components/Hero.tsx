import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const titles = ["IT Engineering Student", "Full Stack Developer", "Data Science", "AI ML"];
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

        </motion.div>

      </div>
    </section>
  );
}
