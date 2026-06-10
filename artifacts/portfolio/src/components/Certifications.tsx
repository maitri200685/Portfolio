import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Certifications() {
  const certs = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      color: "from-[#FF9900]/20 to-[#FF9900]/5"
    },
    {
      title: "Google Cloud Professional Architect",
      issuer: "Google",
      date: "2023",
      color: "from-[#4285F4]/20 to-[#4285F4]/5"
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2022",
      color: "from-[#FF6F00]/20 to-[#FF6F00]/5"
    },
    {
      title: "Certified Kubernetes Administrator",
      issuer: "CNCF",
      date: "2022",
      color: "from-[#326CE5]/20 to-[#326CE5]/5"
    }
  ];

  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Licenses & <span className="text-gradient">Certifications</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${cert.color} rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500`} />
              
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full" />
                </div>
                <div className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded-full text-xs font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-1 leading-snug">{cert.title}</h3>
                <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                <p className="text-white/40 text-xs font-mono mt-4">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
