import {
  validateCredentials,
  caseStudies,
  type CaseStudyCredentials,
  type CaseStudy,
} from '@/models/case-study';

describe('case-study model', () => {
  describe('validateCredentials', () => {
    const validCreds: CaseStudyCredentials = {
      email: 'user@example.com',
      password: 'secret123',
    };

    it('returns null for valid credentials', () => {
      expect(validateCredentials(validCreds)).toBeNull();
    });

    describe('email validation', () => {
      it('returns error when email is empty', () => {
        const result = validateCredentials({ ...validCreds, email: '' });
        expect(result).toBe('Email is required');
      });

      it('returns error when email is only whitespace', () => {
        const result = validateCredentials({ ...validCreds, email: '   ' });
        expect(result).toBe('Email is required');
      });

      it('returns error for malformed email (no @)', () => {
        const result = validateCredentials({ ...validCreds, email: 'notanemail' });
        expect(result).toBe('Invalid email');
      });

      it('returns error for email missing domain', () => {
        const result = validateCredentials({ ...validCreds, email: 'user@' });
        expect(result).toBe('Invalid email');
      });

      it('returns error for email missing TLD', () => {
        const result = validateCredentials({ ...validCreds, email: 'user@domain' });
        expect(result).toBe('Invalid email');
      });

      it('accepts valid email with subdomains', () => {
        const result = validateCredentials({ ...validCreds, email: 'user@mail.example.co.uk' });
        expect(result).toBeNull();
      });
    });

    describe('password validation', () => {
      it('returns error when password is empty string', () => {
        const result = validateCredentials({ ...validCreds, password: '' });
        expect(result).toBe('Password is required');
      });

      it('does not validate whitespace-only passwords (any truthy value accepted)', () => {
        // password check is just !creds.password, so whitespace is truthy
        const result = validateCredentials({ ...validCreds, password: '   ' });
        expect(result).toBeNull();
      });
    });

    it('returns email error before password error (email validated first)', () => {
      const result = validateCredentials({ email: '', password: '' });
      expect(result).toBe('Email is required');
    });

    it('returns password error when email is valid but password is missing', () => {
      const result = validateCredentials({ email: 'user@example.com', password: '' });
      expect(result).toBe('Password is required');
    });
  });

  describe('caseStudies data', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(caseStudies)).toBe(true);
      expect(caseStudies.length).toBeGreaterThan(0);
    });

    it('each study has required CaseStudy fields', () => {
      const requiredKeys: (keyof CaseStudy)[] = ['label', 'title', 'excerpt', 'year', 'imageUrl', 'link', 'gradient'];
      for (const study of caseStudies) {
        for (const key of requiredKeys) {
          expect(study).toHaveProperty(key);
        }
      }
    });

    it('all year values are strings', () => {
      for (const study of caseStudies) {
        expect(typeof study.year).toBe('string');
      }
    });

    it('all link values are strings starting with / or #', () => {
      for (const study of caseStudies) {
        expect(typeof study.link).toBe('string');
        expect(study.link.startsWith('/') || study.link === '#').toBe(true);
      }
    });

    it('all gradient values are valid CSS gradient strings', () => {
      for (const study of caseStudies) {
        expect(study.gradient).toMatch(/linear-gradient/);
      }
    });

    it('contains the Hyland OnBase case study', () => {
      const hyland = caseStudies.find((s) => s.title.includes('Hyland OnBase'));
      expect(hyland).toBeDefined();
      expect(hyland?.label).toBe('Enterprise Software');
    });

    it('contains the portfolio design case study', () => {
      const portfolio = caseStudies.find((s) => s.label === 'Creative Services');
      expect(portfolio).toBeDefined();
      expect(portfolio?.year).toBe('2025');
    });

    it('has at least 4 case studies', () => {
      expect(caseStudies.length).toBeGreaterThanOrEqual(4);
    });
  });
});
