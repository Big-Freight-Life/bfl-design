'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MegamenuPanel } from '@/models/navigation';
import { motion } from '@/theme/tokens';

interface MegaMenuProps {
  title: string;
  panels: MegamenuPanel[];
  activePanelId: string | null;
  onPanelHover: (id: string) => void;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function MegaMenu({ title, panels, activePanelId, onPanelHover, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const activePanel = panels.find((p) => p.id === activePanelId) ?? panels[0];

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0,0,0,0.06)',
          zIndex: 'modal',
          animation: 'megamenuBackdropIn 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
          '@keyframes megamenuBackdropIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }}
      />

      {/* Menu container */}
      <Paper
        elevation={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          animation: `megamenuSlideIn ${motion.duration.smooth} ${motion.easing.outExpo} forwards`,
          '@keyframes megamenuSlideIn': {
            '0%': { opacity: 0, transform: 'translateY(-12px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {/* Left panel - navigation index */}
        <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', py: 4, px: 3 }}>
          <Typography variant="overline" sx={{ px: 2, mb: 2, display: 'block', color: 'text.secondary' }}>
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
                transition: `background-color ${motion.duration.micro} ease, color ${motion.duration.micro} ease`,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Typography variant="body2" fontWeight={500}>{panel.label}</Typography>
              <ArrowForwardIcon
                sx={{
                  fontSize: 16,
                  opacity: activePanelId === panel.id ? 0.8 : 0,
                  transform: activePanelId === panel.id ? 'translateX(0)' : 'translateX(-4px)',
                  transition: `opacity ${motion.duration.fast} ${motion.easing.outExpo}, transform ${motion.duration.fast} ${motion.easing.outExpo}`,
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Right panel - contextual content */}
        <Box
          key={activePanel.id}
          sx={{
            flex: 1,
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
            minHeight: 360,
            animation: `megamenuPanelFadeIn ${motion.duration.smooth} ${motion.easing.outExpo} forwards`,
            '@keyframes megamenuPanelFadeIn': {
              '0%': { opacity: 0, transform: 'translateX(16px)' },
              '100%': { opacity: 1, transform: 'translateX(0)' },
            },
          }}
        >
          <Typography variant="h4" gutterBottom>{activePanel.label}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 480 }}>
            {activePanel.description}
          </Typography>
          <Button component={Link} href={activePanel.href} onClick={onClose} variant="text" color="primary" sx={{ alignSelf: 'flex-start' }}>
            Learn more →
          </Button>
        </Box>
      </Paper>
    </>
  );
}
