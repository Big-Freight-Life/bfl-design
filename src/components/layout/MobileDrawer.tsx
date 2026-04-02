'use client';

import { Drawer, Box, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import { useNavigation } from '@/viewmodels/useNavigation';

export default function MobileDrawer() {
  const { drawerOpen, closeDrawer, mobileDrawerItems, mobileDrawerUtility, isActive } = useNavigation();

  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={closeDrawer}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: '70vh',
          pb: 8,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
        <Box sx={{ width: 32, height: 4, borderRadius: 2, bgcolor: 'divider' }} />
      </Box>
      <List sx={{ px: 1 }}>
        {mobileDrawerItems.map((item) => (
          <Box key={item.href}>
            <ListItemButton component={Link} href={item.href} onClick={closeDrawer} selected={isActive(item.href)} sx={{ borderRadius: 1 }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
            {item.children?.map((child) => (
              <ListItemButton key={child.href} component={Link} href={child.href} onClick={closeDrawer} selected={isActive(child.href)} sx={{ pl: 4, borderRadius: 1 }}>
                <ListItemText primary={child.label} primaryTypographyProps={{ fontSize: '0.875rem' }} />
              </ListItemButton>
            ))}
          </Box>
        ))}
      </List>
      <Divider sx={{ mx: 2 }} />
      <List sx={{ px: 1 }}>
        {mobileDrawerUtility.map((item) => (
          <ListItemButton key={item.href} component={Link} href={item.href} onClick={closeDrawer} sx={{ borderRadius: 1 }}>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem', color: 'text.secondary' }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
