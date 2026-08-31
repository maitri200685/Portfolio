import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/30 flex-shrink-0 z-20 -mb-12 lg:mb-0 lg:-mt-6">
            <img
              src="/maitri-cutout.png"
              alt="Maitri Prajapati"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-white">
                About <span className="text-gradient">Me</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/20 to-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold font-display text-white mb-2">Maitri Prajapati</h3>
                <p className="text-primary/80 font-medium text-lg mb-4">Information Technology Engineering Student</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    I’m pursuing a degree in Information Technology at L.D. College of Engineering, with a strong interest in Artificial Intelligence, Machine Learning, Generative AI, and Data Science.                  </p>
                  <p>
                    My AI/ML journey is focused on continuous learning, experimentation, and building practical solutions. I enjoy understanding how intelligent systems work and exploring how technology can be used to solve real-world problems.

                    Alongside AI/ML, I have knowledge of full-stack development, including JavaScript, React, Node.js, databases, and APIs.                  </p>
                  <p>
                    I’m currently focused on deepening my knowledge of Generative AI, LLMs, RAG, AI Agents, and applied Machine Learning, while continuously learning and improving through hands-on experience.                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
