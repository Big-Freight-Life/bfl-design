'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { colors } from '@/theme/tokens';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  accentColor?: string;
}

export default function FaqAccordion({ faqs, accentColor = colors.primary.main }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {faqs.map((faq, i) => (
        <Box
          key={i}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&:first-of-type': { borderTop: '1px solid', borderTopColor: 'divider' },
          }}
        >
          <Box
            component="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2.5,
              px: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              gap: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
              {faq.question}
            </Typography>
            <Box sx={{ color: accentColor, flexShrink: 0 }}>
              {openIndex === i ? <RemoveIcon /> : <AddIcon />}
            </Box>
          </Box>
          <Box
            sx={{
              overflow: 'hidden',
              maxHeight: openIndex === i ? 400 : 0,
              transition: 'max-height 0.3s ease',
              pb: openIndex === i ? 2.5 : 0,
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {faq.answer}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
