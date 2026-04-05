import {
  validateContactForm,
  hasErrors,
  PROJECT_TYPES,
  type ContactFormData,
  type ContactFormErrors,
} from '@/models/contact';

const validData: ContactFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  projectType: 'Consulting',
  subject: 'Hello',
  message: 'I would like to discuss a project.',
};

describe('contact model', () => {
  describe('validateContactForm', () => {
    it('returns no errors for valid data', () => {
      const errors = validateContactForm(validData);
      expect(errors).toEqual({});
    });

    describe('name validation', () => {
      it('returns error when name is empty', () => {
        const errors = validateContactForm({ ...validData, name: '' });
        expect(errors.name).toBe('Name is required');
      });

      it('returns error when name is only whitespace', () => {
        const errors = validateContactForm({ ...validData, name: '   ' });
        expect(errors.name).toBe('Name is required');
      });

      it('does not return name error for valid name', () => {
        const errors = validateContactForm({ ...validData, name: 'Ray Butler' });
        expect(errors.name).toBeUndefined();
      });
    });

    describe('email validation', () => {
      it('returns error when email is empty', () => {
        const errors = validateContactForm({ ...validData, email: '' });
        expect(errors.email).toBe('Email is required');
      });

      it('returns error when email is only whitespace', () => {
        const errors = validateContactForm({ ...validData, email: '   ' });
        expect(errors.email).toBe('Email is required');
      });

      it('returns invalid email error for malformed email', () => {
        const errors = validateContactForm({ ...validData, email: 'not-an-email' });
        expect(errors.email).toBe('Invalid email address');
      });

      it('returns invalid email error for email missing domain', () => {
        const errors = validateContactForm({ ...validData, email: 'user@' });
        expect(errors.email).toBe('Invalid email address');
      });

      it('returns invalid email error for email missing @ symbol', () => {
        const errors = validateContactForm({ ...validData, email: 'userexample.com' });
        expect(errors.email).toBe('Invalid email address');
      });

      it('returns invalid email error for email missing TLD', () => {
        const errors = validateContactForm({ ...validData, email: 'user@domain' });
        expect(errors.email).toBe('Invalid email address');
      });

      it('does not return email error for valid email', () => {
        const errors = validateContactForm({ ...validData, email: 'user@domain.com' });
        expect(errors.email).toBeUndefined();
      });

      it('does not return email error for email with subdomain', () => {
        const errors = validateContactForm({ ...validData, email: 'user@mail.domain.co.uk' });
        expect(errors.email).toBeUndefined();
      });
    });

    describe('message validation', () => {
      it('returns error when message is empty', () => {
        const errors = validateContactForm({ ...validData, message: '' });
        expect(errors.message).toBe('Message is required');
      });

      it('returns error when message is only whitespace', () => {
        const errors = validateContactForm({ ...validData, message: '    ' });
        expect(errors.message).toBe('Message is required');
      });

      it('does not return message error for valid message', () => {
        const errors = validateContactForm({ ...validData, message: 'Hello there.' });
        expect(errors.message).toBeUndefined();
      });
    });

    it('returns multiple errors when multiple fields are invalid', () => {
      const errors = validateContactForm({ ...validData, name: '', email: '', message: '' });
      expect(errors.name).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.message).toBeDefined();
    });

    it('does not validate projectType or subject (optional fields)', () => {
      const errors = validateContactForm({ ...validData, projectType: '', subject: '' });
      expect(errors).toEqual({});
    });
  });

  describe('hasErrors', () => {
    it('returns false for empty errors object', () => {
      expect(hasErrors({})).toBe(false);
    });

    it('returns true when errors object has one key', () => {
      const errors: ContactFormErrors = { name: 'Name is required' };
      expect(hasErrors(errors)).toBe(true);
    });

    it('returns true when errors object has multiple keys', () => {
      const errors: ContactFormErrors = {
        name: 'Name is required',
        email: 'Email is required',
        message: 'Message is required',
      };
      expect(hasErrors(errors)).toBe(true);
    });

    it('returns true even when error values are undefined (key still present)', () => {
      // Object.keys counts keys regardless of value
      const errors: ContactFormErrors = {};
      (errors as Record<string, unknown>)['name'] = undefined;
      expect(hasErrors(errors)).toBe(true);
    });
  });

  describe('PROJECT_TYPES', () => {
    it('is an array with at least one item', () => {
      expect(PROJECT_TYPES.length).toBeGreaterThan(0);
    });

    it('includes expected project types', () => {
      expect(PROJECT_TYPES).toContain('AI / Machine Learning');
      expect(PROJECT_TYPES).toContain('System Design');
      expect(PROJECT_TYPES).toContain('Experience Design');
      expect(PROJECT_TYPES).toContain('Consulting');
      expect(PROJECT_TYPES).toContain('Other');
    });

    it('contains exactly 5 items', () => {
      expect(PROJECT_TYPES).toHaveLength(5);
    });
  });
});
