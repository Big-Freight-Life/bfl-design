'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MegamenuPanel } from '@/models/navigation';

interface MegaMenuProps {
  title: string;
  panels: MegamenuPanel[];
  activePanelId: string | null;
  onPanelHover: (id: string) => void;
  onClose: () => void;
}

export default function MegaMenu({ title, panels, activePanelId, onPanelHover, onClose }: MegaMenuProps) {
  const activePanel = panels.find((p) => p.id === activePanelId) ?? panels[0];

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        display: 'flex',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        zIndex: 'modal',
      }}
    >
      <Box sx={{ width: 280, borderRight: 1, borderColor: 'divider', py: 3, px: 2 }}>
        <Typography variant="overline" sx={{ px: 2, mb: 1, display: 'block', color: 'text.secondary' }}>
          {title}
        </Typography>
        {panels.map((panel) => (
          <Box
            key={panel.id}
            component={Link}
            href={panel.href}
            onClick={onClose}
            onMouseEnter={() => onPanelHover(panel.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              borderRadius: 1,
              textDecoration: 'none',
              color: activePanelId === panel.id ? 'primary.main' : 'text.primary',
              bgcolor: activePanelId === panel.id ? 'action.hover' : 'transparent',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Typography variant="body2" fontWeight={500}>{panel.label}</Typography>
            <ArrowForwardIcon sx={{ fontSize: 16, opacity: 0.5 }} />
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" gutterBottom>{activePanel.label}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {activePanel.description}
        </Typography>
        <Button component={Link} href={activePanel.href} onClick={onClose} variant="text" color="primary">
          Learn more
        </Button>
      </Box>
    </Paper>
  );
}
