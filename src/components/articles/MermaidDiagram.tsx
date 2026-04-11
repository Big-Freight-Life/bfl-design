'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

export default function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          themeVariables: isDark
            ? {
                primaryColor: '#14B8A6',
                primaryTextColor: '#e2e8f0',
                lineColor: '#475569',
              }
            : {
                primaryColor: '#14B8A6',
                primaryTextColor: '#1e293b',
                lineColor: '#94a3b8',
              },
        });

        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, chart);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
          setLoading(false);
        }
      }
    }

    setLoading(true);
    setError(null);
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, isDark]);

  return (
    <Box
      sx={{
        borderRadius: '12px',
        border: 1,
        borderColor: 'divider',
        bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        overflow: 'hidden',
        my: 3,
      }}
    >
      {/* SVG container — always mounted, no React children inside */}
      <Box
        ref={containerRef}
        suppressHydrationWarning
        sx={{
          overflow: 'auto',
          p: 2,
          display: loading && !error ? 'none' : 'block',
          '& svg': { maxWidth: '100%', height: 'auto' },
        }}
      />
      {loading && !error && (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Loading diagram...
          </Typography>
        </Box>
      )}
      {error && (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="error">
            Diagram error: {error}
          </Typography>
        </Box>
      )}
      {caption && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', textAlign: 'center', px: 2, pb: 1.5 }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}
