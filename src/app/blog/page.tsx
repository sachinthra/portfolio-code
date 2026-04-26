import { getAllPosts } from '@/lib/blog';
import BlogIndexClient from './BlogIndexClient';

export const metadata = {
  title: 'Blog',
  description: 'Engineering notes, project deep-dives, and things I\'m learning.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogIndexClient posts={posts} />;
}
