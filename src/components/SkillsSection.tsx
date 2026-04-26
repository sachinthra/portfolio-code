'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { skillGroups } from '@/data/portfolio';

const SkillsConstellation = dynamic(() => import('./three/SkillsConstellation'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function SkillsSection() {

  return (
    <section id="skills" className="section relative">
      <SkillsConstellation />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate dark:text-stellar mb-12">
            Tech Arsenal
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
            >
              <h3 className="text-sm font-mono text-cyan/80 mb-3 uppercase tracking-wider">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/50 dark:bg-white/5 border border-white/10
                               text-slate dark:text-stellar/80 hover:border-cyan/30 hover:text-cyan transition-all cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
