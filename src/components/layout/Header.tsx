'use client';

import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MegaMenu from '@/components/common/MegaMenu';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout, colors } from '@/theme/tokens';

export default function Header() {
  const {
    primaryNav, secondaryNav, productsPanels, aboutPanels,
    activeMegamenu, activePanelId, setActivePanelId,
    openMegamenu, closeMegamenu, isActive,
  } = useNavigation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar
        sx={{
          maxWidth: layout.containerMaxWidth,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, md: 3, lg: 4 },
          minHeight: { xs: 64, md: 72 },
        }}
      >
        {/* Logo + Brand */}
        <Box
          component={Link}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'text.primary',
            mr: { md: 6, lg: 8 },
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/logo-teal.png"
            alt="Big Freight Life"
            width={24}
            height={24}
            style={{ display: 'block' }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'text.primary',
              display: { xs: 'none', sm: 'block' },
              whiteSpace: 'nowrap',
            }}
          >
            Big Freight Life
          </Typography>
        </Box>

        {/* Primary Nav */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, flex: 1 }}>
          {primaryNav.map((item) => (
            <Button
              key={item.label}
              component={item.megamenu ? 'button' : Link}
              href={item.megamenu ? undefined : item.href}
              onClick={item.megamenu ? () => {
                activeMegamenu === item.megamenu ? closeMegamenu() : openMegamenu(item.megamenu!);
              } : closeMegamenu}
              sx={{
                color: isActive(item.href) ? 'text.primary' : 'text.primary',
                fontWeight: isActive(item.href) ? 600 : 500,
                textTransform: 'none',
                fontSize: '0.875rem',
                px: 2,
                py: 1.5,
                borderRadius: 0,
                position: 'relative',
                '&::after': isActive(item.href) ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '15%',
                  right: '15%',
                  height: 3,
                  bgcolor: colors.button.primary.bg,
                  borderRadius: '3px 3px 0 0',
                } : {},
                '&:hover': {
                  bgcolor: 'transparent',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '15%',
                    right: '15%',
                    height: 3,
                    bgcolor: colors.gray[300],
                    borderRadius: '3px 3px 0 0',
                  },
                },
              }}
              endIcon={item.megamenu ? <KeyboardArrowDownIcon sx={{ fontSize: '1.2rem !important' }} /> : undefined}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Contact Button */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
          {secondaryNav.map((item) => (
            <Button
              key={item.label}
              component={Link}
              href={item.href}
              variant="outlined"
              size="small"
              sx={{ textTransform: 'none' }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
      {activeMegamenu === 'products' && (
        <MegaMenu title="Products" panels={productsPanels} activePanelId={activePanelId} onPanelHover={setActivePanelId} onClose={closeMegamenu} />
      )}
      {activeMegamenu === 'about' && (
        <MegaMenu title="About" panels={aboutPanels} activePanelId={activePanelId} onPanelHover={setActivePanelId} onClose={closeMegamenu} />
      )}
    </AppBar>
  );
}
