import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { radius } from '@/theme/tokens';

interface CaseCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags?: string[];
}

export default function CaseCard({ title, description, href, image, tags }: CaseCardProps) {
  return (
    <Card
      component={Link}
      href={href}
      sx={{
        textDecoration: 'none',
        borderRadius: radius.card,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
      }}
    >
      {image && (
        <CardMedia component="img" height={200} image={image} alt={title} />
      )}
      <CardContent>
        {tags && tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            {tags.map((tag) => (
              <Typography key={tag} variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                {tag}
              </Typography>
            ))}
          </Box>
        )}
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );
}
