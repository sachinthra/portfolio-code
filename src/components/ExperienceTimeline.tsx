'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/portfolio';

export default function ExperienceTimeline() {

  return (
    <section id="experience" className="section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate dark:text-stellar mb-12">
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-cyan/30 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-2.5 md:left-6.5 top-1 w-3 h-3 rounded-full bg-cyan shadow-lg shadow-cyan/50" />

              <div className="group p-6 rounded-xl border border-white/5 hover:border-cyan/20 bg-white/30 dark:bg-white/5 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-cyan/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate dark:text-stellar">
                    {exp.company}
                  </h3>
                  <span className="text-sm text-cyan font-mono">{exp.duration}</span>
                </div>
                <p className="text-cyan/80 text-sm font-medium mb-3">{exp.role}</p>
                <ul className="space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-sm text-slate-light dark:text-stellar/60 flex items-start gap-2">
                      <span className="text-cyan mt-1.5 text-[8px]">●</span>
                      {desc}
                    </li>
                  ))}
                </ul>
                {exp.tech && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/20">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
