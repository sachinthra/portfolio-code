'use client';

import { motion } from 'framer-motion';

interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
}

const allPosts: BlogCardData[] = [
  {
    slug: 'robot-eyes',
    title: 'Building an Expressive Robot Face with Python and a Tiny OLED',
    description: 'How I built RoboEyes — a smooth, thread-safe animation engine that renders expressive robot eyes on a 128x64 OLED display, controllable via REST API.',
    pubDate: '2026-04-27',
    tags: ['Robotics', 'Python', 'Raspberry Pi'],
  },
  {
    slug: 'file-locker',
    title: 'File Locker',
    description: 'Self-hosted encrypted file storage system with AES-256-GCM encryption, encrypted video streaming, and a CLI tool.',
    pubDate: '2026-01-01',
    tags: ['Go', 'Security', 'Self-Hosted'],
  },
  {
    slug: 'nas-project',
    title: 'Network Attached Storage',
    description: 'Full NAS setup on Raspberry Pi 4 with SMB, NFS, FTP protocols and Plex integration.',
    pubDate: '2025-01-08',
    tags: ['Linux', 'Networking', 'Self-Hosted'],
  },
  {
    slug: 'home-server',
    title: 'The Hub — Home Server',
    description: 'Raspberry Pi 4 home server running NAS, media center, CI/CD runner, and Docker containers.',
    pubDate: '2024-12-26',
    tags: ['Raspberry Pi', 'Docker', 'Linux'],
  },
];

export default function BlogPreview() {
  const sorted = [...allPosts].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  const latest = sorted.slice(0, 3);
  const totalPosts = sorted.length;

  return (
    <section id="blog" className="section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">Blog</p>
          <div className="flex items-baseline gap-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate dark:text-stellar">
              Engineering Notes
            </h2>
            <span className="text-sm font-mono px-2.5 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/20">
              {totalPosts} posts
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((post, index) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group block p-6 rounded-xl border border-white/5 hover:border-cyan/30
                         bg-white/30 dark:bg-white/5 backdrop-blur-sm transition-all duration-300
                         hover:shadow-lg hover:shadow-cyan/10"
            >
              <time className="text-xs text-cyan font-mono">
                {new Date(post.pubDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <h3 className="text-lg font-bold text-slate dark:text-stellar mt-2 mb-2 group-hover:text-cyan transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-slate-light dark:text-stellar/60 line-clamp-2 mb-3">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded bg-cyan/10 text-cyan/70">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors font-medium"
          >
            View all {totalPosts} posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
