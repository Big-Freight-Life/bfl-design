'use client';

import { Box } from '@mui/material';

interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
}

export default function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <Box
      sx={{
        my: { xs: 4, md: 6 },
        borderRadius: '12px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <Box component="thead">
          <Box component="tr" sx={{ bgcolor: 'action.hover' }}>
            {headers.map((header, i) => (
              <Box
                key={i}
                component="th"
                sx={{
                  px: 2.5,
                  py: 1.5,
                  textAlign: 'left',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {header}
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {rows.map((row, rowIdx) => (
            <Box
              key={rowIdx}
              component="tr"
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                '&:not(:last-child) td': {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                },
              }}
            >
              {row.map((cell, cellIdx) => (
                <Box
                  key={cellIdx}
                  component="td"
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    fontSize: '0.875rem',
                    fontWeight: cellIdx === 0 ? 700 : 400,
                    color: cellIdx === 0 ? 'text.primary' : 'text.secondary',
                  }}
                >
                  {cell}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
