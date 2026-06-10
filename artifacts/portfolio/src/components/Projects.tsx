import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Search, Star } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  descShort: string;
  descLong: string;
  category: string;
  stack: string[];
  features: string[];
  github?: string;
  demo?: string;
  gradient: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Collab Code",
    subtitle: "Real-Time Collaborative Coding Platform",
    tag: "Featured Project",
    tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    descShort: "Real-time collaborative coding environment for developers and students.",
    descLong: "Built a browser-based collaborative code editor that allows multiple users to write, edit, and execute code together in real time. The platform supports live synchronization, terminal interaction, and collaborative problem-solving — ideal for coding interviews, learning, and team development.",
    category: "Web",
    stack: ["Python", "JavaScript", "Node.js", "WebSocket", "HTML", "CSS"],
    features: [
      "Real-time code collaboration with live cursor sync",
      "Multi-user editing with conflict resolution",
      "Live code execution in sandboxed environment",
      "Integrated terminal support",
      "Fast synchronization using WebSockets",
    ],
    gradient: "from-violet-500/30 to-indigo-900/20",
    featured: true,
  },
  {
    id: 2,
    title: "CivicTrack",
    subtitle: "Smart Civic Issue Reporting System",
    tag: "SIH Hackathon Project",
    tagColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    descShort: "Connecting citizens and local authorities through technology.",
    descLong: "CivicTrack is a web-based platform that enables citizens to report civic issues such as potholes, garbage accumulation, water leakage, and damaged infrastructure. The system helps authorities monitor, prioritize, and resolve issues efficiently while keeping citizens updated on complaint status.",
    category: "Web",
    stack: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Database Systems"],
    features: [
      "Issue reporting with photo attachments",
      "Real-time complaint tracking dashboard",
      "Status updates and citizen notifications",
      "Location-based issue management",
      "Administrative review and resolution portal",
    ],
    gradient: "from-blue-500/25 to-cyan-900/20",
  },
  {
    id: 3,
    title: "FleetFlow",
    subtitle: "Smart Logistics & Fleet Management Platform",
    tag: "Odoo Hackathon Project",
    tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    descShort: "Optimizing fleet operations through intelligent management.",
    descLong: "FleetFlow is a logistics and fleet management solution designed to streamline vehicle operations, route planning, and resource utilization. The platform improves operational efficiency while providing better tracking and management of transportation resources.",
    category: "Web",
    stack: ["Odoo", "Python", "Database Management"],
    features: [
      "Real-time fleet monitoring and tracking",
      "Intelligent route optimization",
      "Vehicle lifecycle management",
      "Resource allocation and scheduling",
      "Operational analytics and reporting",
    ],
    gradient: "from-emerald-500/25 to-green-900/20",
  },
  {
    id: 4,
    title: "JARVIS AI Assistant",
    subtitle: "Intelligent AI Assistant for Automation",
    tag: "Personal Flagship Project",
    tagColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    descShort: "An intelligent AI assistant for automation and productivity.",
    descLong: "JARVIS is an AI-powered virtual assistant designed to automate tasks, create projects, execute commands, and provide intelligent support. The system integrates voice commands, automation workflows, and AI-powered error handling to improve productivity and user experience.",
    category: "AI",
    stack: ["Python", "Gemini API", "Automation Tools", "AI Models"],
    features: [
      "Voice-controlled command interface",
      "Automated project creation and scaffolding",
      "AI-powered code correction and suggestions",
      "Task scheduling and workflow automation",
      "Smart context-aware automation workflows",
    ],
    gradient: "from-purple-500/25 to-violet-900/20",
  },
  {
    id: 5,
    title: "RAG Teaching Assistant",
    subtitle: "AI-Powered Educational Knowledge System",
    tag: "AI / Machine Learning Project",
    tagColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",
    descShort: "Transforming educational content into an intelligent learning assistant.",
    descLong: "Developed a Retrieval-Augmented Generation (RAG) based AI assistant capable of processing educational video content, generating embeddings, retrieving relevant knowledge, and providing context-aware responses. The system converts lectures into searchable knowledge and improves learning accessibility.",
    category: "AI",
    stack: ["Python", "Whisper", "OpenAI/Gemini APIs", "Embeddings", "Vector Search"],
    features: [
      "Video-to-text transcription with Whisper",
      "Automatic timestamp extraction",
      "Semantic embedding generation",
      "Vector-based semantic search",
      "AI-powered context-aware question answering",
    ],
    gradient: "from-pink-500/20 to-rose-900/20",
  },
];

const CATEGORIES = ["All", "AI", "Web"];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const visible = projects.filter(p => {
    const matchCat = activeFilter === "All" || p.category === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.stack.some(s => s.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-white">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        {/* Filter + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center">
          <div className="flex gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                data-testid={`project-filter-${c.toLowerCase()}`}
                className={`px-4 py-1.5 rounded-full text-base font-medium transition-all duration-200 border ${
                  activeFilter === c
                    ? "bg-primary text-background border-primary"
                    : "border-white/10 text-muted-foreground hover:border-primary/40 hover:text-white bg-transparent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              data-testid="input-project-search"
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-base text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project)}
              className={`glass-card rounded-2xl overflow-hidden cursor-pointer group ${
                project.featured ? "ring-1 ring-primary/20" : ""
              }`}
              data-testid={`card-project-${project.id}`}
            >
              <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                {project.featured && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1.5 bg-background/70 backdrop-blur rounded-full border border-amber-400/30">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium text-amber-400">Featured</span>
                  </div>
                )}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.08),transparent)]" />
                <div className="absolute bottom-3 right-3 flex gap-1.5" onClick={e => e.stopPropagation()}>
                  <a href={project.github || "#"} className="p-2 bg-background/70 backdrop-blur rounded-full border border-white/10 hover:bg-primary/20 hover:text-primary transition-colors text-white">
                    <Github className="w-4.5 h-4.5" />
                  </a>
                  <a href={project.demo || "#"} className="p-2 bg-background/70 backdrop-blur rounded-full border border-white/10 hover:bg-primary/20 hover:text-primary transition-colors text-white">
                    <ExternalLink className="w-4.5 h-4.5" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border flex-shrink-0 ${project.tagColor}`}>
                    {project.tag.split(" ")[0]}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
                  {project.descShort}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="glass-pill text-xs py-1">{tech}</span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="glass-pill text-xs py-1">+{project.stack.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-2xl bg-background/80"
          >
            <motion.div
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 24, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                data-testid="button-close-modal"
                className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/8 hover:bg-white/15 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className={`h-56 w-full bg-gradient-to-br ${selectedProject.gradient} relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute bottom-5 left-7">
                  <span className={`text-sm font-medium px-4 py-1.5 rounded-full border ${selectedProject.tagColor}`}>
                    {selectedProject.tag}
                  </span>
                </div>
              </div>

              <div className="px-9 pb-11 pt-7">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-primary text-base font-medium mb-7">{selectedProject.subtitle}</p>

                <div className="grid md:grid-cols-3 gap-9">
                  <div className="md:col-span-2 space-y-7">
                    <div>
                      <h4 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-mono">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed text-base">{selectedProject.descLong}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider font-mono">Key Features</h4>
                      <ul className="space-y-3">
                        {selectedProject.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground text-base">
                            <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-7">
                    <div>
                      <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider font-mono">Technologies</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedProject.stack.map(tech => (
                          <span key={tech} className="glass-pill text-sm">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <a href={selectedProject.github || "#"} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white text-base font-medium w-full">
                        <Github className="w-5 h-5" /> View Source
                      </a>
                      <a href={selectedProject.demo || "#"} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity text-base font-semibold w-full">
                        <ExternalLink className="w-5 h-5" /> Live Demo
                      </a>
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
