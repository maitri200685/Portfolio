import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const projects = [
    {
      id: 1,
      title: "NeuralChat",
      subtitle: "AI-powered chat application",
      descShort: "Enterprise-grade chat application with local LLM integration and real-time streaming.",
      descLong: "A complete end-to-end AI communication platform designed for enterprise use. It features local deployment of LLMs, real-time message streaming via WebSockets, and a highly responsive React frontend.",
      stack: ["React", "Python", "FastAPI", "OpenAI API", "WebSockets"],
      features: [
        "Real-time token streaming",
        "Context-aware conversation history",
        "Custom document grounding (RAG)",
        "Role-based access control"
      ],
      challenges: [
        "Managing WebSocket state across multiple components",
        "Optimizing LLM response times under load",
        "Implementing a seamless virtualized scrolling for chat history"
      ]
    },
    {
      id: 2,
      title: "CloudOrch",
      subtitle: "Kubernetes orchestration dashboard",
      descShort: "Real-time metrics and management dashboard for multi-cluster K8s environments.",
      descLong: "A high-performance observability tool for DevOps teams to monitor and manage Kubernetes clusters. Built with Go for the backend to handle high-throughput metrics ingestion from Prometheus.",
      stack: ["React", "Go", "Prometheus", "Docker", "AWS"],
      features: [
        "Multi-cluster resource visualization",
        "1-click pod scaling and restarting",
        "Alerting and threshold configurations",
        "Historical metrics analysis"
      ],
      challenges: [
        "Parsing complex Prometheus metrics efficiently",
        "Ensuring UI remains responsive with thousands of data points",
        "Implementing secure RBAC for cluster actions"
      ]
    },
    {
      id: 3,
      title: "DataLens",
      subtitle: "End-to-end ML pipeline",
      descShort: "Automated data processing and visualization pipeline for predictive analytics.",
      descLong: "DataLens simplifies the journey from raw tabular data to actionable insights. It provides an automated ingestion pipeline, exploratory data analysis via D3.js, and basic predictive modeling using TensorFlow.",
      stack: ["Python", "TensorFlow", "D3.js", "PostgreSQL", "React"],
      features: [
        "Automated feature engineering",
        "Interactive correlation matrices",
        "Predictive model deployment",
        "Exportable PDF reports"
      ],
      challenges: [
        "Handling missing data gracefully in the automated pipeline",
        "Rendering large datasets in the browser using WebGL/D3",
        "Model versioning and rollback"
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="h-48 w-full bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur text-xs rounded-full text-white font-medium border border-white/10">
                    {project.title}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-background/80 backdrop-blur rounded-full border border-white/10 hover:bg-primary/20 hover:text-primary transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-background/80 backdrop-blur rounded-full border border-white/10 hover:bg-primary/20 hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.descShort}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="glass-pill text-[10px] py-0.5">{tech}</span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="glass-pill text-[10px] py-0.5">+{project.stack.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-background/80"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="h-64 md:h-80 w-full bg-gradient-to-br from-primary/30 to-secondary/30 relative" />
              
              <div className="p-8 md:p-12 -mt-20 relative z-10">
                <div className="glass-card rounded-2xl p-6 mb-8 inline-block">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-primary font-medium">{selectedProject.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.descLong}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tech: string) => (
                          <span key={tech} className="glass-pill">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Links</h4>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white font-medium">
                          <Github className="w-5 h-5" /> View Source
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-background hover:opacity-90 transition-opacity font-medium">
                          <ExternalLink className="w-5 h-5" /> Live Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
