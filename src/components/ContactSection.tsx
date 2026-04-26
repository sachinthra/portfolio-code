'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/data/portfolio';
import { SocialIcon } from './Header';

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate dark:text-stellar mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-slate-light dark:text-stellar/60 mb-8 max-w-lg mx-auto">
            Whether it&apos;s a cloud platform, an IoT project, or something entirely new — I&apos;m
            always open to interesting conversations and collaboration.
          </p>

          <a
            href="mailto:sachinthranv@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan text-orbit font-medium rounded-lg
                       hover:bg-cyan-light transition-colors shadow-lg shadow-cyan/20 text-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Say Hello
          </a>

          <div className="flex items-center justify-center gap-6 mt-10">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-light dark:text-stellar/40 hover:text-cyan transition-colors"
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
