'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';

export default function ProjectGrid() {

  return (
    <section id="projects" className="section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate dark:text-stellar mb-12">
            Things I&apos;ve Built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 rounded-xl border border-white/5 hover:border-cyan/30
                         bg-white/30 dark:bg-white/5 backdrop-blur-sm transition-all duration-300
                         hover:shadow-xl hover:shadow-cyan/10"
            >
              {/* Top bar accent */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <h3 className="text-lg font-bold text-slate dark:text-stellar mb-2 group-hover:text-cyan transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-light dark:text-stellar/60 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-cyan/10 text-cyan/80 border border-cyan/10">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-light dark:text-stellar/50 hover:text-cyan transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </a>
                )}
                {project.blogSlug && (
                  <a
                    href={`/blog/${project.blogSlug}`}
                    className="text-sm text-slate-light dark:text-stellar/50 hover:text-cyan transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Read More
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
