import { Box, Typography, Chip } from '@mui/material';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  desc: string;
  tier: string;
  icon: ReactNode;
  accentColor: string;
  comingSoon?: boolean;
}

const tierColors: Record<string, string> = {
  Free: '#10b981',
  Starter: '#3b82f6',
  Pro: '#8b5cf6',
  Elite: '#f59e0b',
};

export default function FeatureCard({
  title,
  desc,
  tier,
  icon,
  accentColor,
  comingSoon = false,
}: FeatureCardProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: '1rem',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          bgcolor: `${accentColor}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
          {comingSoon && (
            <Chip label="Coming Soon" size="small" sx={{ fontSize: '0.65rem', height: 18 }} />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          {desc}
        </Typography>
      </Box>
      <Chip
        label={tier}
        size="small"
        sx={{
          alignSelf: 'flex-start',
          bgcolor: `${tierColors[tier] || '#6b7280'}18`,
          color: tierColors[tier] || '#6b7280',
          fontWeight: 600,
          fontSize: '0.7rem',
        }}
      />
    </Box>
  );
}
