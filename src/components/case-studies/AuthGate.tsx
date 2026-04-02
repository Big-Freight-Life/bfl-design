'use client';

import { Box, TextField, Button, Alert, Typography, Paper } from '@mui/material';
import { useCaseStudyAuth } from '@/viewmodels/useCaseStudyAuth';

export default function AuthGate() {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } = useCaseStudyAuth();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" gutterBottom>Client Access</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter your credentials to view case studies.
        </Typography>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" type="email" required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ textTransform: 'none' }}>
            {isSubmitting ? 'Authenticating...' : 'Access Case Studies'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
