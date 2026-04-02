import { Box, Typography, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface PricingTierProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  accentColor: string;
}

export default function PricingTier({
  name,
  price,
  period,
  features,
  highlighted = false,
  badge,
  accentColor,
}: PricingTierProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: '1.25rem',
        border: highlighted ? `2px solid ${accentColor}` : '1px solid',
        borderColor: highlighted ? accentColor : 'divider',
        bgcolor: highlighted ? `${accentColor}08` : 'background.paper',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        boxShadow: highlighted ? `0 0 32px ${accentColor}22` : 'none',
      }}
    >
      {badge && (
        <Chip
          label={badge}
          size="small"
          sx={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: accentColor,
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.7rem',
            height: 24,
          }}
        />
      )}
      <Box>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.08em' }}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mt: 0.5 }}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ color: highlighted ? accentColor : 'text.primary' }}
          >
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            / {period}
          </Typography>
        </Box>
      </Box>
      <List dense disablePadding sx={{ flex: 1 }}>
        {features.map((feat, i) => (
          <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckIcon sx={{ fontSize: 16, color: accentColor }} />
            </ListItemIcon>
            <ListItemText
              primary={feat}
              primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
