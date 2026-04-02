import { Container, Typography, Box } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';
import { getAllPosts } from '@/models/blog';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Blog" title="Articles" subtitle="Thoughts on systems, design, and AI." />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ p: 3, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
              <Typography variant="caption" color="text.secondary">{post.date}</Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>{post.title}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>{post.description}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Container>
  );
}
