'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { hero, socialLinks } from '@/data/portfolio';
import { SocialIcon } from './Header';

const HeroScene = dynamic(() => import('./three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[500px] flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border border-cyan/20 animate-pulse" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">
            {hero.subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="text-slate dark:text-stellar">Sachinthra</span>{' '}
            <span className="text-cyan text-glow">N V</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate dark:text-stellar/80 mb-6 font-light">
            {hero.tagline}
          </p>
          <p className="text-slate-light dark:text-stellar/60 mb-8 max-w-lg leading-relaxed">
            {hero.bio}
          </p>

          <p className="text-sm text-slate-light/70 dark:text-stellar/40 italic mb-8 max-w-lg">
            &ldquo;Any sufficiently advanced technology is indistinguishable from magic.&rdquo;
            <span className="text-cyan/50 ml-1 not-italic">— Arthur C. Clarke</span>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={hero.resumePath}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-orbit font-medium rounded-lg
                         hover:bg-cyan-light transition-colors shadow-lg shadow-cyan/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Résumé
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-cyan/30 text-cyan rounded-lg
                         hover:bg-cyan/10 transition-colors"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex items-center gap-4 mt-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-light dark:text-stellar/40 hover:text-cyan transition-colors"
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}
