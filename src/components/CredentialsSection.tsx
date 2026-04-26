'use client';

import { motion } from 'framer-motion';
import { certifications, achievements } from '@/data/portfolio';

export default function CredentialsSection() {
  return (
    <section id="credentials" className="section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">Credentials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate dark:text-stellar mb-12">
            Certifications & Achievements
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <h3 className="text-sm font-mono text-cyan/80 mb-4 uppercase tracking-wider">
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-4 rounded-xl border border-white/5 bg-white/30 dark:bg-white/5 backdrop-blur-sm
                             hover:border-cyan/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-cyan text-sm">✦</span>
                    <div>
                      <p className="text-sm font-medium text-slate dark:text-stellar">
                        {cert.name}
                      </p>
                      <p className="text-xs text-slate-light dark:text-stellar/50 mt-0.5">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-sm font-mono text-cyan/80 mb-4 uppercase tracking-wider">
              Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-4 rounded-xl border border-white/5 bg-white/30 dark:bg-white/5 backdrop-blur-sm
                             hover:border-cyan/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-cyan text-sm">▸</span>
                    <div>
                      <p className="text-sm font-medium text-slate dark:text-stellar">
                        {a.title}
                      </p>
                      <p className="text-xs text-slate-light dark:text-stellar/50 mt-0.5">
                        {a.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
