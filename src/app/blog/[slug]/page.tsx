import { getAllPosts, getPostBySlug } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const SITE_URL = 'https://sachinthra.github.io';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.pubDate,
      ...(post.updatedDate && { modifiedTime: post.updatedDate }),
      tags: post.tags,
      ...(post.heroImage && { images: [{ url: `${SITE_URL}${post.heroImage}` }] }),
    },
    twitter: {
      card: post.heroImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description: post.description,
      ...(post.heroImage && { images: [`${SITE_URL}${post.heroImage}`] }),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate,
    ...(post.updatedDate && { dateModified: post.updatedDate }),
    author: { '@type': 'Person', name: 'Sachinthra N V', url: SITE_URL },
    url: `${SITE_URL}/blog/${slug}`,
    ...(post.heroImage && { image: `${SITE_URL}${post.heroImage}` }),
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
