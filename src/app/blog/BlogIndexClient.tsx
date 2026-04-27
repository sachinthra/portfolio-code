'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { BlogPost } from '@/types';

const Starfield = dynamic(() => import('@/components/three/Starfield'), { ssr: false });

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <>
      <Starfield />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-cyan text-sm font-mono mb-2 tracking-wider uppercase">Blog</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate dark:text-stellar mb-4">
              Engineering Notes
            </h1>
            <p className="text-slate-light dark:text-stellar/60 mb-8 max-w-lg">
              Project deep-dives, things I&apos;m learning, and the occasional home server war story.
            </p>
          </motion.div>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                activeTag === null
                  ? 'bg-cyan text-white border-cyan'
                  : 'bg-transparent text-slate-light dark:text-stellar/60 border-white/10 hover:border-cyan/40 hover:text-cyan'
              }`}
            >
              All ({posts.length})
            </button>
            {allTags.map((tag) => {
              const count = posts.filter((p) => p.tags.includes(tag)).length;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    activeTag === tag
                      ? 'bg-cyan text-white border-cyan'
                      : 'bg-transparent text-slate-light dark:text-stellar/60 border-white/10 hover:border-cyan/40 hover:text-cyan'
                  }`}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag || 'all'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {filteredPosts.map((post, index) => (
                <motion.a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="group block p-6 rounded-xl border border-white/5 hover:border-cyan/30
                             bg-white/30 dark:bg-white/5 backdrop-blur-sm transition-all duration-300
                             hover:shadow-lg hover:shadow-cyan/10"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <time className="text-xs text-cyan font-mono">
                        {new Date(post.pubDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <h2 className="text-xl font-bold text-slate dark:text-stellar mt-1 mb-2 group-hover:text-cyan transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-slate-light dark:text-stellar/60 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded bg-cyan/10 text-cyan/70">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-cyan opacity-0 group-hover:opacity-100 transition-opacity self-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <p className="text-center text-slate-light dark:text-stellar/50 py-20">
              No posts with this tag yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
