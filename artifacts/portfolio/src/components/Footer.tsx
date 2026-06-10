import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  const socials = [
    { Icon: Github,    href: "#", label: "GitHub" },
    { Icon: Linkedin,  href: "#", label: "LinkedIn" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Mail,      href: "mailto:maitri@example.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-white/8 py-10 relative z-10 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-bold font-display tracking-tight text-white mb-1">MP.</span>
            <p className="text-muted-foreground text-sm">Maitri Prajapati — Built with passion &amp; caffeine</p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                data-testid={`footer-link-${label.toLowerCase()}`}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-xs font-mono">
            &copy; {new Date().getFullYear()} Maitri Prajapati. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
