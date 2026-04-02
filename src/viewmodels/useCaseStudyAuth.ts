'use client';

import { useState, useCallback } from 'react';
import { CaseStudyCredentials, validateCredentials, authenticateCaseStudy } from '@/models/case-study';

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
