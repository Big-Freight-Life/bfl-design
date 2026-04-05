'use client';

import { Box, type SxProps, type Theme } from '@mui/material';
import { gradients } from '@/theme/tokens';

interface DarkHeroSectionProps {
  children: React.ReactNode;
  /** Override the background gradient string. Defaults to gradients.darkHero */
  gradient?: string;
  /** Additional sx overrides for the outer Box (includes py/pt/pb etc.) */
  sx?: SxProps<Theme>;
  /** Whether to render the dot-matrix texture overlay. Defaults to true. */
  dotMatrix?: boolean;
  component?: React.ElementType;
}

/**
 * Reusable dark hero section with gradient background and optional dot-matrix
 * texture overlay. Used across the transformation, process, and about pages.
 *
 * Pass all padding via `sx` (e.g. sx={{ pt: { xs: 16, md: 24 }, pb: { xs: 10, md: 16 } }}).
 */
export default function DarkHeroSection({
  children,
  gradient = gradients.darkHero,
  sx,
  dotMatrix = true,
  component = 'section',
}: DarkHeroSectionProps) {
  return (
    <Box
      component={component}
      sx={{
        background: gradient,
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {dotMatrix && (
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
      <Box sx={{ position: 'relative' }}>
        {children}
      </Box>
    </Box>
  );
}
