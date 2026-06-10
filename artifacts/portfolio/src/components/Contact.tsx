import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, Phone, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name:    z.string().min(2, "Name is required"),
  email:   z.string().email("Invalid email address"),
  phone:   z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [state, setState] = useState<FormState>("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setState("sending");
    try {
      const body = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.phone ? `Phone: ${values.phone}` : null,
        ``,
        values.message,
      ].filter(Boolean).join("\n");

      const mailto =
        `mailto:maitri2k6@gmail.com` +
        `?subject=${encodeURIComponent(values.subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.open(mailto, "_blank");
      await new Promise(r => setTimeout(r, 600));
      setState("success");
      setTimeout(() => {
        setState("idle");
        form.reset();
      }, 3500);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  const info = [
    { icon: Mail,      label: "Email",    value: "maitri.prajapati@example.com", href: "mailto:maitri.prajapati@example.com" },
    { icon: Phone,     label: "Phone",    value: "+91 98765 43210",               href: "tel:+919876543210" },
    { icon: MapPin,    label: "Location", value: "Gujarat, India",                href: "#" },
    { icon: Github,    label: "GitHub",   value: "github.com/maitri",             href: "#" },
    { icon: Linkedin,  label: "LinkedIn", value: "linkedin.com/in/maitri",        href: "#" },
  ];

  const socials = [
    { icon: Github,    href: "#", label: "GitHub" },
    { icon: Linkedin,  href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail,      href: "mailto:maitri.prajapati@example.com", label: "Email" },
  ];

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Let's Build <span className="text-gradient">Something Together</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Left: info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-muted-foreground text-base leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-5">
              {info.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-4 group cursor-pointer"
                  data-testid={`contact-info-${item.label.toLowerCase()}`}
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/8 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-medium group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social follow */}
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Follow</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    data-testid={`social-${label.toLowerCase()}`}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 glass-card p-8 md:p-10 rounded-3xl"
          >
            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-2">
                  <Send className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">I'll get back to you soon. Thanks for reaching out!</p>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-mono text-xs tracking-wider">NAME</FormLabel>
                          <FormControl>
                            <Input data-testid="input-name" className="bg-background/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-11" placeholder="Maitri Prajapati" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-mono text-xs tracking-wider">EMAIL</FormLabel>
                          <FormControl>
                            <Input data-testid="input-email" className="bg-background/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-11" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-mono text-xs tracking-wider">PHONE (optional)</FormLabel>
                          <FormControl>
                            <Input data-testid="input-phone" className="bg-background/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-11" placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-mono text-xs tracking-wider">SUBJECT</FormLabel>
                          <FormControl>
                            <Input data-testid="input-subject" className="bg-background/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-11" placeholder="Project Inquiry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-mono text-xs tracking-wider">MESSAGE</FormLabel>
                        <FormControl>
                          <Textarea
                            data-testid="input-message"
                            className="bg-background/50 border-white/10 focus:border-primary/50 text-white rounded-xl min-h-[130px] resize-none"
                            placeholder="Tell me about your project or idea..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    data-testid="button-send-message"
                    className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-background font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {state === "sending" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </Form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
