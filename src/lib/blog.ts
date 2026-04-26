import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost } from '@/types';

const contentDir = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];
  
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, '');
    const filePath = path.join(contentDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : '',
      updatedDate: data.updatedDate ? new Date(data.updatedDate).toISOString() : undefined,
      heroImage: data.heroImage || undefined,
      tags: data.tags || [],
      content,
    } satisfies BlogPost;
  });

  return posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}
