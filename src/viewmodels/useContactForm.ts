'use client';

import { useState, useCallback } from 'react';
import {
  ContactFormData, ContactFormErrors,
  validateContactForm, hasErrors, submitContact,
} from '@/models/contact';

const INITIAL_DATA: ContactFormData = {
  name: '', email: '', projectType: '', subject: '', message: '',
};

export function useContactForm() {
  const [fields, setFields] = useState<ContactFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = useCallback(<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateContactForm(fields);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitContact(fields);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setFields(INITIAL_DATA);
    } else {
      setSubmitError(result.error ?? 'Something went wrong');
    }
  }, [fields]);

  return { fields, errors, isSubmitting, submitted, submitError, updateField, handleSubmit };
}
