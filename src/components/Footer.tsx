'use client';

import { socialLinks } from '@/data/portfolio';
import { SocialIcon } from './Header';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-slate-light dark:text-stellar/50">
          &copy; {new Date().getFullYear()} Sachinthra N V. Built with Next.js.
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-light dark:text-stellar/50 hover:text-cyan transition-colors"
              aria-label={link.name}
            >
              <SocialIcon icon={link.icon} className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
