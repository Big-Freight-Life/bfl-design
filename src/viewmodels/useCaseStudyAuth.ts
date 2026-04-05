'use client';

import { useState, useCallback } from 'react';
import { CaseStudyCredentials, validateCredentials } from '@/models/case-study';

async function authenticateCaseStudy(creds: CaseStudyCredentials): Promise<{ success: boolean; error?: string }> {
  const response = await fetch('/api/case-study-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    return { success: false, error: body.error ?? 'Authentication failed' };
  }
  return { success: true };
}

export function useCaseStudyAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    const creds: CaseStudyCredentials = { email, password };
    const validationError = validateCredentials(creds);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await authenticateCaseStudy(creds);
    setIsSubmitting(false);

    if (result.success) {
      window.location.reload();
    } else {
      setError(result.error ?? 'Authentication failed');
    }
  }, [email, password]);

  return { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit };
}
