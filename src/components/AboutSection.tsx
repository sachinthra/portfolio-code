'use client';

import { motion } from 'framer-motion';
import { education, currentFocus } from '@/data/portfolio';

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate dark:text-stellar mb-8">
            A Bit More About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — bio + education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-slate-light dark:text-stellar/60 leading-relaxed">
              I&apos;m a software engineer at Hewlett Packard Enterprise, where I work on Disconnected
              Management Solutions — enabling seamless cloud experiences in environments without internet
              connectivity. My day-to-day involves system security, Kubernetes cluster management, Helm
              deployments, and building secure authentication flows. Outside work, robotics and IoT are
              my playground — I tinker with Raspberry Pi clusters, ESP32 boards, and self-hosted
              infrastructure.
            </p>

            {/* Education */}
            <div>
              <h3 className="text-sm font-mono text-cyan/80 mb-3 uppercase tracking-wider">
                Education
              </h3>
              <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.institution}
                  className="p-4 rounded-xl border border-white/5 bg-white/30 dark:bg-white/5 backdrop-blur-sm"
                >
                  <p className="text-sm font-medium text-slate dark:text-stellar">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-slate-light dark:text-stellar/50 mt-0.5">
                    {edu.institution} · {edu.duration}
                  </p>
                </div>
              ))}
              </div>
            </div>
          </motion.div>

          {/* Right — current focus */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-mono text-cyan/80 mb-4 uppercase tracking-wider">
              Currently Focused On
            </h3>
            <div className="space-y-3">
              {currentFocus.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/30 dark:bg-white/5
                             backdrop-blur-sm hover:border-cyan/20 transition-all"
                >
                  <span className="text-cyan mt-0.5 text-sm">▹</span>
                  <p className="text-sm text-slate-light dark:text-stellar/70">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
