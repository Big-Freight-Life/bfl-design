'use client';

import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MegaMenu from '@/components/common/MegaMenu';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout } from '@/theme/tokens';

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
      <Toolbar sx={{ maxWidth: layout.containerMaxWidth, width: '100%', mx: 'auto', px: { xs: 2, md: 3, lg: 4 } }}>
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700, mr: 4 }}
        >
          BFL
        </Typography>
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
                color: isActive(item.href) ? 'primary.main' : 'text.primary',
                fontWeight: isActive(item.href) ? 600 : 500,
                textTransform: 'none',
                fontSize: '0.875rem',
              }}
              endIcon={item.megamenu ? <KeyboardArrowDownIcon /> : undefined}
            >
              {item.label}
            </Button>
          ))}
        </Box>
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
