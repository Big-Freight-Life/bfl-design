'use client';

import { Box, Typography, Grid, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout } from '@/theme/tokens';

export default function Footer() {
  const { footerNav } = useNavigation();

  return (
    <Box component="footer" sx={{ bgcolor: 'action.hover', color: 'text.secondary', py: 6 }}>
      <Box sx={{ maxWidth: layout.containerMaxWidth, mx: 'auto', px: { xs: 2, md: 3, lg: 4 } }}>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline" sx={{ mb: 2, display: 'block' }}>Works</Typography>
            {footerNav.works.map((item) => (
              <MuiLink key={item.href} component={Link} href={item.href} underline="hover" sx={{ display: 'block', mb: 1, color: 'text.secondary', fontSize: '0.875rem' }}>
                {item.label}
              </MuiLink>
            ))}
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline" sx={{ mb: 2, display: 'block' }}>About</Typography>
            {footerNav.about.map((item) => (
              <MuiLink key={item.href} component={Link} href={item.href} underline="hover" sx={{ display: 'block', mb: 1, color: 'text.secondary', fontSize: '0.875rem' }}>
                {item.label}
              </MuiLink>
            ))}
          </Grid>
        </Grid>
        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Big Freight Life. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {footerNav.legal.map((item) => (
              <MuiLink key={item.href} component={Link} href={item.href} underline="hover" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                {item.label}
              </MuiLink>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
