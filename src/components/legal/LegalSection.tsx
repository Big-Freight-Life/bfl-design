import { Box, Typography, Paper, Grid } from '@mui/material';

const sectionSx = {
  mb: 6,
  pb: 4,
  borderBottom: 1,
  borderColor: 'divider',
  '&:last-of-type': { borderBottom: 'none' },
  '& h6': { mt: 3, mb: 2 },
  '& ul': { pl: 3, mb: 2 },
  '& li': { mb: 1, lineHeight: 1.6 },
  '& p': { mb: 2, lineHeight: 1.7 },
  '& a': { color: 'primary.dark', '&:hover': { color: 'primary.main' } },
};

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box id={id} component="section" sx={sectionSx}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export function LegalSubheading({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
      {children}
    </Typography>
  );
}

export function LegalNotice({
  children,
  warning,
}: {
  children: React.ReactNode;
  warning?: boolean;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        bgcolor: 'action.hover',
        borderRadius: 2,
        ...(warning && { borderLeft: 4, borderColor: 'warning.main' }),
        '& p': { m: 0 },
      }}
    >
      {children}
    </Paper>
  );
}

export function LegalTOC({ items }: { items: { id: string; label: string }[] }) {
  return (
    <Paper elevation={0} sx={{ p: 3, mb: 6, bgcolor: 'action.hover', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Table of Contents
      </Typography>
      <Box component="ol" sx={{ pl: 3, m: 0 }}>
        {items.map((item) => (
          <Box component="li" key={item.id} sx={{ mb: 1 }}>
            <Typography
              component="a"
              href={`#${item.id}`}
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export function LegalContactGrid({
  items,
}: {
  items: { label: string; content: React.ReactNode }[];
}) {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid size={{ xs: 12, sm: 6 }} key={item.label}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', mb: 0.5 }}
          >
            {item.label}
          </Typography>
          <Typography variant="body2">{item.content}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
