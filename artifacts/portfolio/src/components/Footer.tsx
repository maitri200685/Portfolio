import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 relative z-10 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold font-display tracking-tight text-white mb-2">IE.</span>
            <p className="text-muted-foreground text-sm">Built with passion & caffeine</p>
          </div>
          
          <div className="flex items-center gap-4">
            {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/10 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          
          <div className="text-muted-foreground text-sm font-mono">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
