import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const LINKEDIN_URL = "https://www.linkedin.com/in/maitri-prajapati-140b74317";
const GITHUB_URL   = "https://github.com/maitri200685";
const EMAIL        = "maitri2k6@gmail.com";

const formSchema = z.object({
  name:    z.string().min(2, "Full name is required"),
  email:   z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [state, setState] = useState<FormState>("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setState("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/" + EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          _subject: "New Portfolio Contact Form Submission",
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json();
      if (data.success === "true" || data.success === true) {
        setState("success");
        setTimeout(() => { setState("idle"); form.reset(); }, 4000);
      } else {
        setState("error");
        setTimeout(() => setState("idle"), 3500);
      }
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3500);
    }
  }

  const info = [
    { icon: Mail,     label: "Email",    value: EMAIL,                         href: `mailto:${EMAIL}` },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/maitri-prajapati", href: LINKEDIN_URL },
    { icon: Github,   label: "GitHub",   value: "github.com/maitri200685",    href: GITHUB_URL },
    { icon: MapPin,   label: "Location", value: "Gujarat, India",              href: "#" },
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
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-white">
            Let's Build <span className="text-gradient">Something Together</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              {info.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                  data-testid={`contact-info-${item.label.toLowerCase()}`}
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/8 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-white text-base font-medium group-hover:text-primary transition-colors break-all">{item.value}</p>
                  </div>
                </a>
              ))}
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
                  <Send className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-muted-foreground text-base max-w-xs">
                  Thank you for reaching out. Your message has been sent successfully.
                </p>
              </motion.div>
            ) : state === "error" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-2">
                  <Mail className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Unable to Send</h3>
                <p className="text-muted-foreground text-base">Unable to send message. Please try again later.</p>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-mono text-sm tracking-wider">FULL NAME</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-name"
                            className="bg-background/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-14 text-base"
                            placeholder="Your full name"
                            {...field}
                          />
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
                        <FormLabel className="text-muted-foreground font-mono text-sm tracking-wider">EMAIL ADDRESS</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-email"
                            className="bg-background/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-14 text-base"
                            placeholder="your@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-mono text-sm tracking-wider">MESSAGE</FormLabel>
                        <FormControl>
                          <Textarea
                            data-testid="input-message"
                            className="bg-background/50 border-white/10 focus:border-primary/50 text-white rounded-xl min-h-[160px] resize-none text-base"
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
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-background font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 text-lg"
                  >
                    {state === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Send Message
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
