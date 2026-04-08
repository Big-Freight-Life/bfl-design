'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);
    try {
      await fetch('/api/case-study-logout', { method: 'POST' });
    } catch {
      // Best-effort; still refresh to let middleware re-evaluate.
    }
    router.refresh();
  }

  return (
    <Button
      variant="contained"
      onClick={handleLogout}
      disabled={isSubmitting}
      sx={{ textTransform: 'none' }}
    >
      {isSubmitting ? 'Signing out...' : 'Sign out'}
    </Button>
  );
}
