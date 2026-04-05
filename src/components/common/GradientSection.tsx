'use client';

import { Box, type SxProps, type Theme } from '@mui/material';
import { gradients } from '@/theme/tokens';

interface GradientSectionProps {
  children: React.ReactNode;
  /** Background gradient. Defaults to gradients.darkHero */
  gradient?: string;
  /** Additional sx props (include py/pt/pb here) */
  sx?: SxProps<Theme>;
  component?: React.ElementType;
}

/**
 * A section with a gradient background. Simpler than DarkHeroSection — no
 * dot matrix, no position:relative wrapping. Used for mid-page coloured
 * sections (privacy bands, closing CTAs, etc.).
 *
 * Pass all padding via `sx` (e.g. sx={{ py: { xs: 8, md: 12 } }}).
 */
export default function GradientSection({
  children,
  gradient = gradients.darkHero,
  sx,
  component = 'section',
}: GradientSectionProps) {
  return (
    <Box
      component={component}
      sx={{
        background: gradient,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
