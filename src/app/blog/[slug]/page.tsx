import type { Metadata } from 'next';
import { Container, Typography, Box } from '@mui/material';
import { getAllSlugs, getPostBySlug } from '@/models/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | BFL Design`,
    description: post.description || `Read "${post.title}" on the BFL Design blog — thoughts on systems, design, and AI.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="caption" color="text.secondary">{post.date}</Typography>
      <Typography variant="h1" sx={{ mt: 1, mb: 4 }}>{post.title}</Typography>
      <Box sx={{ '& p': { mb: 2, lineHeight: 1.7 }, '& h1,& h2,& h3': { mt: 4, mb: 2 } }}>
        <MDXRemote source={post.content} />
      </Box>
    </Container>
  );
}
