'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { colors, typography, radius } from '@/theme/tokens';

interface Article {
  title: string;
  date: string;
  slug: string;
  imageUrl?: string;
}

// Placeholder articles matching WordPress — replaced by real posts when blog has content
const placeholderArticles: Article[] = [
  {
    title: 'From T-Shaped to Comb-Shaped: Why Gen AI Demands More Than One Specialty',
    date: 'April 7, 2026',
    slug: 'from-t-shaped-to-comb-shaped',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
  },
  {
    title: 'Democratizing Design: How Intelligent Interfaces Empower Non-Experts',
    date: 'December 17, 2025',
    slug: '#',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
  },
  {
    title: 'Goal Mapping: Designing Interfaces That Guide Users to Success',
    date: 'December 17, 2025',
    slug: '#',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  },
];

interface LatestArticlesProps {
  articles?: Article[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  const posts = articles && articles.length > 0 ? articles : placeholderArticles;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            mb: 3,
            fontSize: typography.sizes.xs,
            fontWeight: typography.weights.semibold,
            letterSpacing: typography.letterSpacing.widest,
            color: 'text.primary',
          }}
        >
          LATEST ARTICLES
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {posts.slice(0, 3).map((article) => (
            <Grid key={article.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                component={article.slug !== '#' ? Link : 'div'}
                href={article.slug !== '#' ? `/blog/${article.slug}` : undefined}
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover .article-thumb': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                {/* Thumbnail */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    borderRadius: radius.lg,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : colors.gray[100],
                    overflow: 'hidden',
                    mb: 2,
                    position: 'relative',
                  }}
                >
                  {article.imageUrl && (
                    <Image
                      className="article-thumb"
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  )}
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: typography.sizes.base,
                    fontWeight: typography.weights.medium,
                    lineHeight: typography.lineHeights.snug,
                    mb: 0.5,
                    color: 'text.primary',
                  }}
                >
                  {article.title}
                </Typography>

                {/* Date */}
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: typography.sizes.sm,
                  }}
                >
                  {article.date}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
