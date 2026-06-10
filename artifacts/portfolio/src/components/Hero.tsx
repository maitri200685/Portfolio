import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const CUBE_VERTS: [number, number, number][] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
];
const CUBE_EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7],
];

function rotate(v: [number,number,number], rx: number, ry: number): [number,number,number] {
  let [x, y, z] = v;
  const cy = Math.cos(ry), sy = Math.sin(ry);
  [x, z] = [x * cy - z * sy, x * sy + z * cy];
  const cx = Math.cos(rx), sx = Math.sin(rx);
  [y, z] = [y * cx - z * sx, y * sx + z * cx];
  return [x, y, z];
}

function project(v: [number,number,number], cx: number, cy: number, scale: number) {
  const fov = 4;
  const s = fov / (fov + v[2]);
  return { x: cx + v[0] * scale * s, y: cy + v[1] * scale * s, z: v[2], s };
}

interface Particle { angle: number; r: number; speed: number; label: string; opacity: number }

function ITScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth || 480;
    const H = canvas.offsetHeight || 480;
    canvas.width = W;
    canvas.height = H;

    const cx = W / 2, cy = H / 2;
    const scale = Math.min(W, H) * 0.22;

    const LABELS = ["01","10","AI","</>","{}","API","ML","SSH","git","npm","{ }","if()","λ","∑","0x1F"];
    const particles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      r: scale * (1.5 + Math.random() * 0.8),
      speed: (Math.random() > 0.5 ? 1 : -1) * (0.004 + Math.random() * 0.006),
      label: LABELS[i % LABELS.length],
      opacity: 0.2 + Math.random() * 0.35,
    }));

    let rx = 0.4, ry = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - W / 2) / W,
        y: (e.clientY - rect.top - H / 2) / H,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ry += 0.008 + mouseRef.current.x * 0.005;
      rx += 0.003 + mouseRef.current.y * 0.002;

      // Ambient glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.6);
      grd.addColorStop(0, "rgba(180,142,255,0.07)");
      grd.addColorStop(0.6, "rgba(255,182,230,0.03)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Project vertices
      const verts = CUBE_VERTS.map(v => project(rotate(v, rx, ry), cx, cy, scale));

      // Draw edges — back first, then front for depth
      const sortedEdges = CUBE_EDGES.map(([a, b]) => ({
        a, b,
        avgZ: (verts[a].z + verts[b].z) / 2
      })).sort((x, y) => x.avgZ - y.avgZ);

      for (const { a, b, avgZ } of sortedEdges) {
        const va = verts[a], vb = verts[b];
        const depthAlpha = 0.15 + ((avgZ + 1) / 2) * 0.65;
        const isPurple = avgZ > 0;
        ctx.strokeStyle = isPurple
          ? `rgba(180,142,255,${depthAlpha})`
          : `rgba(255,182,230,${depthAlpha * 0.7})`;
        ctx.lineWidth = 0.8 + (avgZ + 1) * 0.4;
        ctx.beginPath();
        ctx.moveTo(va.x, va.y);
        ctx.lineTo(vb.x, vb.y);
        ctx.stroke();
      }

      // Draw corner nodes
      for (const v of verts) {
        const depthAlpha = 0.3 + ((v.z + 1) / 2) * 0.7;
        const r = (2.5 + v.s * 2.5);
        const glow = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, r * 3);
        glow.addColorStop(0, `rgba(180,142,255,${depthAlpha * 0.5})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(v.x, v.y, r * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(v.x, v.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,217,255,${depthAlpha})`;
        ctx.fill();
      }

      // Circuit traces — short lines extending from top/bottom face centers
      const faceGroups: number[][] = [[0,1,2,3],[4,5,6,7]];
      for (const face of faceGroups) {
        const fx = face.reduce((s, i) => s + verts[i].x, 0) / 4;
        const fy = face.reduce((s, i) => s + verts[i].y, 0) / 4;
        const fz = face.reduce((s, i) => s + verts[i].z, 0) / 4;
        const alpha = 0.1 + ((fz + 1) / 2) * 0.2;
        ctx.strokeStyle = `rgba(180,142,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 5]);
        for (let i = 0; i < 4; i++) {
          const ang = (i / 4) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(fx + Math.cos(ang) * scale * 0.5, fy + Math.sin(ang) * scale * 0.3);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // Orbiting code particles
      for (const p of particles) {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.r;
        const py = cy + Math.sin(p.angle) * p.r * 0.55;
        ctx.font = "10px Menlo, monospace";
        ctx.fillStyle = `rgba(180,142,255,${p.opacity})`;
        ctx.fillText(p.label, px - ctx.measureText(p.label).width / 2, py);
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />;
}

export default function Hero() {
  const titles = ["IT Engineering Student", "Full Stack Developer", "UI Designer", "AI Developer"];
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
            className="text-muted-foreground font-mono text-sm tracking-[0.2em] uppercase"
          >
            Innovation &amp; Craftsmanship
          </motion.p>

          <h1 className="text-5xl md:text-6xl font-bold font-display tracking-tight text-white leading-[1.08]">
            I'm <span className="text-gradient">Maitri</span><br />
            Prajapati
          </h1>

          <div className="h-8 relative overflow-hidden">
            <motion.p
              key={titleIndex}
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -28, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-primary font-medium absolute"
            >
              {titles[titleIndex]}
            </motion.p>
          </div>

          <p className="text-muted-foreground max-w-md leading-relaxed text-base font-light">
            Welcome to my portfolio. I'm excited to share my journey, experiences, and the work that reflects my passion for growth, creativity, and innovation.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              data-testid="button-contact"
              className="magnetic-btn px-7 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Contact Me
            </a>
            <button
              data-testid="button-resume"
              className="magnetic-btn px-7 py-3 rounded-full border border-primary/40 text-white font-semibold text-sm hover:bg-primary/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Resume
            </button>
          </div>

          <div className="flex items-center gap-5 pt-4">
            {[
              { Icon: Github, label: "GitHub", href: "#" },
              { Icon: Linkedin, label: "LinkedIn", href: "#" },
              { Icon: Mail, label: "Email", href: "mailto:maitri@example.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                data-testid={`link-${label.toLowerCase()}`}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="h-[460px] w-full relative hidden md:flex items-center justify-center"
        >
          <div className="absolute inset-0">
            <ITScene />
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-2 glass-card px-4 py-3 rounded-xl z-10"
          >
            <p className="text-[10px] font-mono text-primary/70 mb-0.5">Status</p>
            <p className="text-sm font-semibold text-white">Open to Work</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-14 left-2 glass-card px-4 py-3 rounded-xl z-10"
          >
            <p className="text-[10px] font-mono text-secondary/70 mb-0.5">Hackathon</p>
            <p className="text-sm font-semibold text-white">Top 8 National</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 -translate-y-1/2 left-0 glass-card px-3 py-2 rounded-lg z-10"
          >
            <p className="text-xs font-mono text-primary/80">10+ Projects</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
