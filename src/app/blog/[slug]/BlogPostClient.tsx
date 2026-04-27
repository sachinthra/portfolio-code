'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { BlogPost } from '@/types';

const Starfield = dynamic(() => import('@/components/three/Starfield'), { ssr: false });

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    items.push({ id, text, level: match[1].length });
  }
  return items;
}

function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="Table of contents">
      <h3 className="text-xs font-mono text-cyan uppercase tracking-wider mb-4">On this page</h3>
      <ul className="space-y-1.5 border-l border-white/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm py-0.5 transition-colors duration-200 border-l-2 -ml-px
                ${item.level === 3 ? 'pl-6' : 'pl-4'}
                ${
                  activeId === item.id
                    ? 'border-cyan text-cyan font-medium'
                    : 'border-transparent text-slate-light dark:text-stellar/40 hover:text-cyan hover:border-cyan/30'
                }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function renderMarkdown(content: string): string {
  // First, extract code blocks and replace with placeholders
  const codeBlocks: string[] = [];
  let processed = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, lang, code) => {
    const index = codeBlocks.length;
    codeBlocks.push(`<pre><code class="language-${lang || ''}">${code}</code></pre>`);
    return `%%CODEBLOCK_${index}%%`;
  });

  // Extract markdown tables and replace with placeholders
  const tables: string[] = [];
  processed = processed.replace(/^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)+)/gm, (_match, headerRow, _sepRow, bodyRows) => {
    const headers = headerRow.split('|').filter((c: string) => c.trim()).map((c: string) => c.trim());
    const rows = bodyRows.trim().split('\n').map((row: string) =>
      row.split('|').filter((c: string) => c.trim()).map((c: string) => c.trim())
    );
    const tableHtml = `<table class="w-full my-6 text-sm border-collapse"><thead><tr>${headers.map((h: string) => `<th class="text-left px-4 py-2 border-b border-white/20 font-semibold">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((row: string[]) => `<tr>${row.map((cell: string) => `<td class="px-4 py-2 border-b border-white/10">${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    const index = tables.length;
    tables.push(tableHtml);
    return `%%TABLE_${index}%%`;
  });

  let html = processed
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headers — add id attributes for TOC anchoring
    .replace(/^### (.*$)/gm, (_match, text) => {
      const id = text.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      return `<h3 id="${id}">${text}</h3>`;
    })
    .replace(/^## (.*$)/gm, (_match: string, text: string) => {
      const id = text.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      return `<h2 id="${id}">${text}</h2>`;
    })
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Images
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4" />')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan hover:text-cyan-light underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="border-white/10 my-8" />')
    // Unordered lists
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\.\s+(.*$)/gm, '<li>$1</li>')
    // Paragraphs — only for lines that aren't already HTML or placeholders
    .replace(/^(?!<[hluop]|<li|<pre|<hr|<img|%%CODEBLOCK|%%TABLE)(.*\S.*)$/gm, '<p>$1</p>');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul class="list-disc pl-6 space-y-1 my-4">$1</ul>');

  // Restore code blocks and tables
  html = html.replace(/%%CODEBLOCK_(\d+)%%/g, (_match, index) => codeBlocks[parseInt(index)]);
  html = html.replace(/%%TABLE_(\d+)%%/g, (_match, index) => tables[parseInt(index)]);

  return html;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const tocItems = useMemo(() => extractToc(post.content), [post.content]);

  return (
    <>
      <Starfield />
      <article className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header section — full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            {/* Back link */}
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-light transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to Blog
            </a>

            {/* Meta — date and reading time on one line */}
            <div className="flex items-center gap-3 mb-3">
              <time className="text-sm text-cyan font-mono">
                {new Date(post.pubDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="text-slate-lighter dark:text-stellar/30">·</span>
              <span className="text-sm text-slate-light dark:text-stellar/40 font-mono">
                {Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate dark:text-stellar mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-slate-light dark:text-stellar/60 mb-6">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded bg-cyan/10 text-cyan border border-cyan/20">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Content + TOC sidebar layout */}
          <div className="flex gap-12">
            {/* Main content */}
            <div className="max-w-3xl flex-1 min-w-0">
              {post.heroImage && (
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full rounded-xl mb-10 border border-white/10"
                />
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="prose prose-invert max-w-none
                           [&_h2]:text-slate dark:[&_h2]:text-stellar [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-24
                           [&_h3]:text-slate dark:[&_h3]:text-stellar [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24
                           [&_p]:text-slate-light dark:[&_p]:text-stellar/70 [&_p]:leading-relaxed [&_p]:mb-4
                           [&_strong]:text-slate dark:[&_strong]:text-stellar
                           [&_a]:text-cyan [&_a]:no-underline hover:[&_a]:underline
                           [&_code]:text-cyan [&_code]:bg-cyan/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
                           [&_pre]:bg-orbit-light [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0
                           [&_li]:text-slate-light dark:[&_li]:text-stellar/70
                           [&_img]:rounded-xl [&_img]:border [&_img]:border-white/10
                           [&_hr]:border-white/10"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />
            </motion.div>
            </div>

            {/* TOC sidebar — hidden on mobile */}
            {tocItems.length > 0 && (
              <aside className="hidden xl:block w-56 shrink-0">
                <TableOfContents items={tocItems} />
              </aside>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
