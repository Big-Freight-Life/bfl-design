'use client';

import { Box, TextField, Button, MenuItem, Alert, Typography } from '@mui/material';
import { useContactForm } from '@/viewmodels/useContactForm';

export default function ContactForm() {
  const { fields, errors, isSubmitting, submitted, submitError, updateField, handleSubmit, projectTypes } = useContactForm();

  if (submitted) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        <Typography variant="body1" fontWeight={500}>Message sent!</Typography>
        <Typography variant="body2">Thanks for reaching out. I&apos;ll get back to you soon.</Typography>
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField label="Name" required fullWidth value={fields.name} onChange={(e) => updateField('name', e.target.value)} error={!!errors.name} helperText={errors.name} inputProps={{ maxLength: 100 }} />
        <TextField label="Email" required fullWidth type="email" value={fields.email} onChange={(e) => updateField('email', e.target.value)} error={!!errors.email} helperText={errors.email} inputProps={{ maxLength: 254 }} />
      </Box>
      <TextField label="Project Type" select fullWidth value={fields.projectType} onChange={(e) => updateField('projectType', e.target.value)}>
        <MenuItem value="">Select a type</MenuItem>
        {projectTypes.map((type) => (<MenuItem key={type} value={type}>{type}</MenuItem>))}
      </TextField>
      <TextField label="Subject" fullWidth value={fields.subject} onChange={(e) => updateField('subject', e.target.value)} inputProps={{ maxLength: 200 }} />
      <TextField label="Message" required fullWidth multiline rows={6} value={fields.message} onChange={(e) => updateField('message', e.target.value)} error={!!errors.message} helperText={errors.message} inputProps={{ maxLength: 5000 }} />
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ textTransform: 'none', alignSelf: 'flex-start' }}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </Box>
  );
}
