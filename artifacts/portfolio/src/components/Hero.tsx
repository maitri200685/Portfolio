import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";

interface SphereNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
}

function NeuralSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.34;
    const NODE_COUNT = 60;
    const MAX_CONN_DIST = 0.55;

    const nodes: SphereNode[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      nodes.push({
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        vz: (Math.random() - 0.5) * 0.003,
      } as SphereNode & { radius: number });
    }

    let rotY = 0;
    let rotX = 0;
    let rafId: number;
    let t = 0;

    const project = (x: number, y: number, z: number, rx: number, ry: number) => {
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;
      let y1 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;
      const fov = 3.5;
      const scale = fov / (fov + z2 + 1);
      return {
        px: cx + x1 * R * scale,
        py: cy + y1 * R * scale,
        z: z2,
        scale,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - W / 2) / W,
        y: (e.clientY - rect.top - H / 2) / H,
      };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      t += 0.008;
      rotY += 0.004 + mouseRef.current.x * 0.006;
      rotX += 0.001 + mouseRef.current.y * 0.003;

      ctx.clearRect(0, 0, W, H);

      // Ambient glow behind sphere
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.1);
      grd.addColorStop(0, "rgba(180,142,255,0.06)");
      grd.addColorStop(0.5, "rgba(255,182,230,0.03)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Project all nodes
      const projected = nodes.map((n) => project(n.x, n.y, n.z, rotX, rotY));

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < MAX_CONN_DIST) {
            const pi = projected[i];
            const pj = projected[j];
            const depthFactor = ((pi.z + pj.z) / 2 + 1) / 2;
            const alpha = (1 - d / MAX_CONN_DIST) * 0.5 * depthFactor;
            const purple = Math.round(150 + depthFactor * 50);
            ctx.strokeStyle = `rgba(${purple},142,255,${alpha})`;
            ctx.lineWidth = 0.7 * pi.scale;
            ctx.beginPath();
            ctx.moveTo(pi.px, pi.py);
            ctx.lineTo(pj.px, pj.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const p = projected[i];
        const depthFactor = (p.z + 1) / 2;
        const r = (2 + depthFactor * 3) * p.scale;
        const alpha = 0.5 + depthFactor * 0.5;

        // Glow
        const glowGrd = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 3);
        glowGrd.addColorStop(0, `rgba(180,142,255,${alpha * 0.3})`);
        glowGrd.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrd;
        ctx.beginPath();
        ctx.arc(p.px, p.py, r * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        const c = i % 3 === 0 ? `rgba(255,182,230,${alpha})` : `rgba(180,142,255,${alpha})`;
        ctx.fillStyle = c;
        ctx.fill();
      }

      // Floating data particles
      for (let k = 0; k < 12; k++) {
        const angle = (k / 12) * Math.PI * 2 + t * 0.4;
        const radius = R * (0.7 + 0.35 * Math.sin(t * 0.7 + k));
        const px2 = cx + Math.cos(angle) * radius;
        const py2 = cy + Math.sin(angle) * radius * 0.55;
        const alpha = 0.2 + 0.2 * Math.sin(t + k);
        ctx.beginPath();
        ctx.arc(px2, py2, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,182,230,${alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

export default function Hero() {
  const titles = ["Full Stack Developer", "AI Engineer", "Cloud Architect", "IT Engineer"];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section id="hero" className="min-h-screen relative flex items-center pt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-muted-foreground font-mono text-sm tracking-wider">Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-white">
            Isaac <br />
            <span className="text-gradient">Engineer</span>
          </h1>

          <div className="h-8 relative overflow-hidden">
            <motion.p
              key={titleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="text-xl md:text-2xl text-primary font-medium absolute"
            >
              {titles[titleIndex]}
            </motion.p>
          </div>

          <p className="text-muted-foreground max-w-md leading-relaxed text-lg font-light">
            I build scalable digital products at the intersection of software engineering and AI. Based globally, working everywhere.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#contact"
              data-testid="button-contact"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-background font-medium hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </a>
            <button
              data-testid="button-resume"
              className="px-6 py-3 rounded-full border border-primary/50 text-white font-medium hover:bg-primary/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Resume
            </button>
          </div>

          <div className="flex items-center gap-6 pt-8">
            {[
              { Icon: Github, label: "GitHub", href: "#" },
              { Icon: Linkedin, label: "LinkedIn", href: "#" },
              { Icon: Mail, label: "Email", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                data-testid={`link-${label.toLowerCase()}`}
                className="text-muted-foreground hover:text-white transition-colors hover:scale-110 transform duration-200"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[500px] w-full relative hidden md:flex items-center justify-center"
        >
          <div className="absolute inset-0">
            <NeuralSphere />
          </div>

          {/* Floating glass cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-4 glass-card p-4 rounded-xl z-10"
          >
            <p className="text-xs font-mono text-primary">Status</p>
            <p className="text-sm font-medium text-white">All Systems Go</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-16 left-4 glass-card p-4 rounded-xl z-10"
          >
            <p className="text-xs font-mono text-secondary">Stack</p>
            <p className="text-sm font-medium text-white font-mono">React · Python · Cloud</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 left-2 glass-card px-3 py-2 rounded-lg z-10"
          >
            <p className="text-xs font-mono text-primary/80">{"<AI />"}</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
