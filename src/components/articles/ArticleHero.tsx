'use client';

import { Box, Container, Typography } from '@mui/material';
import { typography as typographyTokens } from '@/theme/tokens';

interface ArticleHeroProps {
  category: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  date?: string;
  readTime?: string;
  gradient: string;
  lightMode?: boolean;
}

export default function ArticleHero({
  category,
  categoryColor,
  title,
  subtitle,
  date,
  readTime,
  gradient,
  lightMode = false,
}: ArticleHeroProps) {
  const textColor = lightMode ? 'text.primary' : '#fff';
  const subtitleColor = lightMode ? 'text.secondary' : 'grey.300';
  const metaColor = lightMode ? 'text.secondary' : 'grey.400';

  return (
    <Box
      component="header"
      sx={{
        background: gradient,
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 16, md: 24 },
        pb: { xs: 8, md: 14 },
      }}
    >
      {/* Dot-matrix texture */}
      {!lightMode && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Category dot + label */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: categoryColor,
              flexShrink: 0,
            }}
          />
          <Typography
            sx={{
              fontSize: typographyTokens.sizes.sm,
              fontWeight: typographyTokens.weights.semibold,
              color: categoryColor,
              letterSpacing: typographyTokens.letterSpacing.wide,
              textTransform: 'uppercase',
            }}
          >
            {category}
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
            fontWeight: typographyTokens.weights.bold,
            color: textColor,
            lineHeight: 1,
            letterSpacing: typographyTokens.letterSpacing.tight,
            mb: 3,
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: { xs: '1.125rem', md: '1.375rem' },
            fontWeight: typographyTokens.weights.normal,
            color: subtitleColor,
            lineHeight: 1.5,
            maxWidth: '44rem',
            mb: date || readTime ? 4 : 0,
          }}
        >
          {subtitle}
        </Typography>

        {/* Metadata row */}
        {(date || readTime) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {date && (
              <Typography
                sx={{
                  fontSize: typographyTokens.sizes.sm,
                  color: metaColor,
                }}
              >
                {date}
              </Typography>
            )}
            {date && readTime && (
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  bgcolor: metaColor,
                  opacity: 0.6,
                }}
              />
            )}
            {readTime && (
              <Typography
                sx={{
                  fontSize: typographyTokens.sizes.sm,
                  color: metaColor,
                }}
              >
                {readTime}
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
