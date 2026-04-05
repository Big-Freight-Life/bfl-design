import { Box, Container, Typography, Chip } from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LegalDocLayoutProps {
  productName: string;
  title: string;
  version: string;
  lastUpdated: string;
  effectiveDate?: string;
  intro: string;
  children: React.ReactNode;
}

export default function LegalDocLayout({
  productName,
  title,
  version,
  lastUpdated,
  effectiveDate,
  intro,
  children,
}: LegalDocLayoutProps) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link href="/legal" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s',
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 16 }} />
                All Products
              </Typography>
            </Link>
            <Chip
              label={productName}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Version {version} | Last Updated: {lastUpdated}
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 2 }}>
          {title}
        </Typography>
      </Box>

      {/* Content wrapper */}
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Intro */}
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: '1.125rem', lineHeight: 1.7, mb: 4 }}
        >
          {intro}
        </Typography>

        {/* Legal sections */}
        {children}

        {/* Footer meta */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: 1,
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Last Updated:</strong> {lastUpdated}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Version:</strong> {version}
          </Typography>
          {effectiveDate && (
            <Typography variant="body2" color="text.secondary">
              <strong>Effective Date:</strong> {effectiveDate}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            &copy; {new Date().getFullYear()} Big Freight Life LLC. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
