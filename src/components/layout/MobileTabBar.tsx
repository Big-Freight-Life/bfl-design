'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout } from '@/theme/tokens';

// Icons must match mobileTabItems order from navigation model
const icons = [HomeIcon, ArticleIcon, WorkIcon, PersonIcon];

export default function MobileTabBar() {
  const { mobileTabItems, toggleDrawer, isActive } = useNavigation();

  if (icons.length !== mobileTabItems.length) {
    console.warn('MobileTabBar: icons array length does not match mobileTabItems');
  }

  return (
    <Box
      component="nav"
      sx={{
        display: { xs: 'flex', lg: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: layout.tabBarHeight,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        zIndex: 'fixed',
        justifyContent: 'space-around',
        alignItems: 'center',
        px: 1,
      }}
    >
      {mobileTabItems.map((item, i) => {
        const Icon = icons[i];
        const active = isActive(item.href);
        return (
          <Box
            key={item.href}
            component={Link}
            href={item.href}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: active ? 'primary.main' : 'text.secondary',
              minWidth: 48,
              py: 1,
            }}
          >
            <Icon sx={{ fontSize: 24 }} />
            <Typography variant="caption" sx={{ fontSize: '0.625rem', mt: 0.25 }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
      <Box
        component="button"
        onClick={toggleDrawer}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'text.secondary',
          minWidth: 48,
          py: 1,
        }}
      >
        <MoreVertIcon sx={{ fontSize: 24 }} />
        <Typography variant="caption" sx={{ fontSize: '0.625rem', mt: 0.25 }}>
          More
        </Typography>
      </Box>
    </Box>
  );
}
