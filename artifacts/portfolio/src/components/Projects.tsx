import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Search } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  descShort: string;
  descLong: string;
  category: string;
  stack: string[];
  problem: string;
  solution: string;
  features: string[];
  github?: string;
  demo?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "JARVIS AI Assistant",
    subtitle: "Personal brain ecosystem",
    descShort: "A personal AI assistant ecosystem with voice interaction, task management, and LLM-powered reasoning.",
    descLong: "JARVIS is a full-featured personal AI assistant inspired by the concept of a second brain. It combines a FastAPI backend, a React frontend, and an LLM reasoning layer to handle voice queries, task automation, and knowledge retrieval.",
    category: "AI",
    stack: ["Python", "FastAPI", "React", "LangChain", "OpenAI API"],
    problem: "Managing scattered notes, reminders, and research across tools with no unified intelligent interface.",
    solution: "Built a centralized AI assistant that ingests personal data, answers questions with context, and automates workflows via natural language commands.",
    features: [
      "Voice-activated query interface",
      "RAG-based knowledge retrieval from personal notes",
      "Task scheduling and calendar integration",
      "Conversation history with semantic search",
    ],
    gradient: "from-violet-500/30 to-purple-900/20",
  },
  {
    id: 2,
    title: "CivicTrack",
    subtitle: "Public works tracking platform",
    descShort: "A civic platform that lets citizens report, track, and follow up on local public works issues.",
    descLong: "CivicTrack bridges the gap between citizens and local government bodies. Built with Next.js and Firebase, it allows users to submit infrastructure complaints, track resolution status, and vote on community priorities in real time.",
    category: "Web",
    stack: ["Next.js", "Firebase", "TypeScript", "Tailwind CSS", "Google Maps API"],
    problem: "Citizens lack visibility into the status of reported civic issues — reports go into a black box and are never followed up.",
    solution: "Created a transparent reporting and tracking portal where submissions are geotagged, categorized, and publicly visible with real-time status updates.",
    features: [
      "Geotagged issue submissions with photo upload",
      "Real-time status tracking (Open → In Progress → Resolved)",
      "Community upvoting and priority scoring",
      "Admin dashboard for municipal responders",
    ],
    gradient: "from-blue-500/25 to-cyan-900/20",
  },
  {
    id: 3,
    title: "Skill Swap",
    subtitle: "Peer-to-peer knowledge exchange",
    descShort: "A marketplace where users trade skills — teach what you know, learn what you don't.",
    descLong: "Skill Swap is a social learning exchange platform built on React, Express, and MongoDB. Users create profiles listing skills they can teach and skills they want to learn, then get matched with compatible peers for live sessions.",
    category: "Web",
    stack: ["React", "Express", "MongoDB", "Socket.io", "Node.js"],
    problem: "Online learning is passive and expensive; most people already have valuable skills to offer but no platform to exchange them.",
    solution: "Built a matchmaking and scheduling system where skills are the currency — enabling zero-cost peer learning through barter.",
    features: [
      "Skill-based matching algorithm",
      "Real-time chat and session scheduling",
      "Rating and review system",
      "Session recording (with consent) for async review",
    ],
    gradient: "from-emerald-500/25 to-green-900/20",
  },
  {
    id: 4,
    title: "Soil Moisture Analysis",
    subtitle: "IoT & ML irrigation optimizer",
    descShort: "An IoT-driven system that uses ML to predict optimal irrigation schedules from soil sensor data.",
    descLong: "This project combines ESP32-based IoT sensors deployed in agricultural fields with a TensorFlow model that predicts soil moisture levels and recommends irrigation timing. Data is visualized on a React dashboard with real-time alerts.",
    category: "AI",
    stack: ["Python", "TensorFlow", "React", "MQTT", "Raspberry Pi"],
    problem: "Over-irrigation wastes water and damages crops; farmers lack real-time, data-driven irrigation guidance.",
    solution: "Deployed low-cost soil sensors that stream data to a cloud pipeline; trained an LSTM model to predict moisture dips and trigger alerts before crops are affected.",
    features: [
      "Real-time soil moisture telemetry dashboard",
      "LSTM-based predictive moisture forecasting",
      "Automated irrigation trigger thresholds",
      "Historical analytics with weather correlation",
    ],
    gradient: "from-amber-500/20 to-orange-900/20",
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
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        {/* Filter + Search row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center">
          <div className="flex gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                data-testid={`project-filter-${c.toLowerCase()}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              data-testid="input-project-search"
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {visible.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
              data-testid={`card-project-${project.id}`}
            >
              <div className={`h-44 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.08),transparent)]" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase tracking-wider">{project.category}</span>
                  </div>
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <a href={project.github || "#"} className="p-1.5 bg-background/70 backdrop-blur rounded-full border border-white/10 hover:bg-primary/20 hover:text-primary transition-colors text-white">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a href={project.demo || "#"} className="p-1.5 bg-background/70 backdrop-blur rounded-full border border-white/10 hover:bg-primary/20 hover:text-primary transition-colors text-white">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                <p className="text-primary/80 text-xs font-medium mb-3">{project.subtitle}</p>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                  {project.descShort}
                </p>
                <div className="flex flex-wrap gap-1.5">
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
              className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                data-testid="button-close-modal"
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/8 hover:bg-white/15 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className={`h-52 md:h-64 w-full bg-gradient-to-br ${selectedProject.gradient} relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              <div className="px-8 md:px-12 pb-12 -mt-12 relative z-10">
                <div className="glass-card rounded-2xl p-5 mb-8 inline-block">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{selectedProject.title}</h3>
                  <p className="text-primary font-medium text-sm">{selectedProject.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-base font-bold text-white mb-3">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">{selectedProject.descLong}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-3">Problem</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">{selectedProject.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-3">Solution</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">{selectedProject.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-base font-bold text-white mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map(tech => (
                          <span key={tech} className="glass-pill">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <a
                        href={selectedProject.github || "#"}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white text-sm font-medium w-full"
                      >
                        <Github className="w-4 h-4" /> View Source
                      </a>
                      <a
                        href={selectedProject.demo || "#"}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity text-sm font-semibold w-full"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
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
