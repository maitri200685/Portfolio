import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Home",    href: "#home",     id: "home" },
    { name: "About",   href: "#about",    id: "about" },
    { name: "Skills",  href: "#skills",   id: "skills" },
    { name: "Work",    href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact",  id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 120) {
          setActive(links[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/75 backdrop-blur-xl border-white/5 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-lg font-bold font-display tracking-tight text-white hover:text-primary transition-colors">
          MP.
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                active === link.id
                  ? "text-white bg-white/8"
                  : "text-muted-foreground hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="button-lets-connect"
          className="hidden md:flex items-center px-5 py-2 rounded-full border border-primary/40 text-sm font-medium text-white hover:bg-primary/10 transition-colors"
        >
          Let's Connect
        </a>

        <button
          className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white"
          onClick={() => setMobileOpen(o => !o)}
          data-testid="button-mobile-menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-primary to-secondary text-background"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
