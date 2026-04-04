'use client';

import { useState } from 'react';
import { Box, Typography, Grid, Link as MuiLink, TextField, Button, useTheme } from '@mui/material';
import Link from 'next/link';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout, colors, darkColors } from '@/theme/tokens';

export default function Footer() {
  const { footerNav } = useNavigation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const btnColors = isDark ? darkColors.button.primary : colors.button.primary;

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
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ mb: 2, display: 'block' }}>Newsletter</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Get it before it&apos;s obvious.
            </Typography>
            {submitted ? (
              <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                Thanks for subscribing!
              </Typography>
            ) : (
              <Box
                component="form"
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                noValidate
                sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, maxWidth: 420 }}
              >
                <TextField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  autoComplete="email"
                  size="small"
                  fullWidth
                  sx={{ flex: 1 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{
                    whiteSpace: 'nowrap',
                    bgcolor: btnColors.bg,
                    color: btnColors.text,
                    '&:hover': { bgcolor: btnColors.hover },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            )}
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
