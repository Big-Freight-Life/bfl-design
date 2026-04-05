import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '@/viewmodels/useContactForm';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useContactForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('initial state', () => {
    it('initializes with empty fields', () => {
      const { result } = renderHook(() => useContactForm());
      expect(result.current.fields).toEqual({
        name: '',
        email: '',
        projectType: '',
        subject: '',
        message: '',
      });
    });

    it('initializes with no errors', () => {
      const { result } = renderHook(() => useContactForm());
      expect(result.current.errors).toEqual({});
    });

    it('initializes with isSubmitting false', () => {
      const { result } = renderHook(() => useContactForm());
      expect(result.current.isSubmitting).toBe(false);
    });

    it('initializes with submitted false', () => {
      const { result } = renderHook(() => useContactForm());
      expect(result.current.submitted).toBe(false);
    });

    it('initializes with submitError null', () => {
      const { result } = renderHook(() => useContactForm());
      expect(result.current.submitError).toBeNull();
    });

    it('exposes projectTypes', () => {
      const { result } = renderHook(() => useContactForm());
      expect(result.current.projectTypes).toBeDefined();
      expect(result.current.projectTypes.length).toBeGreaterThan(0);
    });
  });

  describe('updateField', () => {
    it('updates a single field', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('name', 'Jane Doe');
      });

      expect(result.current.fields.name).toBe('Jane Doe');
    });

    it('updates email field', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('email', 'jane@example.com');
      });

      expect(result.current.fields.email).toBe('jane@example.com');
    });

    it('does not clear other fields when updating one', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('name', 'Jane');
        result.current.updateField('email', 'jane@example.com');
      });

      expect(result.current.fields.name).toBe('Jane');
      expect(result.current.fields.email).toBe('jane@example.com');
    });

    it('clears the error for the updated field', () => {
      const { result } = renderHook(() => useContactForm());

      // First trigger validation errors
      act(() => {
        result.current.handleSubmit();
      });

      // Then fix the field
      act(() => {
        result.current.updateField('name', 'Jane Doe');
      });

      expect(result.current.errors.name).toBeUndefined();
    });

    it('does not clear errors for other fields when updating one', async () => {
      const { result } = renderHook(() => useContactForm());

      // Trigger validation to set errors on name, email, message
      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.errors.name).toBeDefined();
      expect(result.current.errors.email).toBeDefined();

      // Fix only the name
      act(() => {
        result.current.updateField('name', 'Jane Doe');
      });

      expect(result.current.errors.name).toBeUndefined();
      // email error should still be there
      expect(result.current.errors.email).toBeDefined();
    });
  });

  describe('handleSubmit — validation', () => {
    it('sets validation errors and does not call fetch when fields are empty', async () => {
      const { result } = renderHook(() => useContactForm());

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.errors.name).toBeDefined();
      expect(result.current.errors.email).toBeDefined();
      expect(result.current.errors.message).toBeDefined();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('does not submit when name is missing', async () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('email', 'jane@example.com');
        result.current.updateField('message', 'Hello');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.errors.name).toBeDefined();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('does not submit when email is invalid', async () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('name', 'Jane');
        result.current.updateField('email', 'not-an-email');
        result.current.updateField('message', 'Hello');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.errors.email).toBeDefined();
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('handleSubmit — successful submission', () => {
    const fillValidFields = (result: ReturnType<typeof renderHook<ReturnType<typeof useContactForm>>>['result']) => {
      act(() => {
        result.current.updateField('name', 'Jane Doe');
        result.current.updateField('email', 'jane@example.com');
        result.current.updateField('message', 'I have a project idea.');
      });
    };

    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
      });
    });

    it('calls fetch with correct endpoint and method', async () => {
      const { result } = renderHook(() => useContactForm());
      fillValidFields(result);

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'POST',
      }));
    });

    it('sends Content-Type: application/json header', async () => {
      const { result } = renderHook(() => useContactForm());
      fillValidFields(result);

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }));
    });

    it('sets submitted to true on success', async () => {
      const { result } = renderHook(() => useContactForm());
      fillValidFields(result);

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.submitted).toBe(true);
    });

    it('resets fields to empty after successful submission', async () => {
      const { result } = renderHook(() => useContactForm());
      fillValidFields(result);

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.fields).toEqual({
        name: '',
        email: '',
        projectType: '',
        subject: '',
        message: '',
      });
    });

    it('clears submitError after successful submission', async () => {
      const { result } = renderHook(() => useContactForm());
      fillValidFields(result);

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.submitError).toBeNull();
    });

    it('sets isSubmitting to false after successful submission', async () => {
      const { result } = renderHook(() => useContactForm());
      fillValidFields(result);

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.isSubmitting).toBe(false);
    });
  });

  describe('handleSubmit — failed submission', () => {
    it('sets submitError when API returns error response with message', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Server is down' }),
      });

      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('name', 'Jane');
        result.current.updateField('email', 'jane@example.com');
        result.current.updateField('message', 'Hello');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.submitError).toBe('Server is down');
      expect(result.current.submitted).toBe(false);
    });

    it('sets fallback error message when API response has no error field', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({}),
      });

      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('name', 'Jane');
        result.current.updateField('email', 'jane@example.com');
        result.current.updateField('message', 'Hello');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.submitError).toBe('Failed to send message');
    });

    it('sets isSubmitting to false after failed submission', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Oops' }),
      });

      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('name', 'Jane');
        result.current.updateField('email', 'jane@example.com');
        result.current.updateField('message', 'Hello');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.isSubmitting).toBe(false);
    });

    it('handles fetch network error gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.updateField('name', 'Jane');
        result.current.updateField('email', 'jane@example.com');
        result.current.updateField('message', 'Hello');
      });

      await expect(
        act(async () => {
          await result.current.handleSubmit();
        })
      ).rejects.toThrow('Network error');
    });
  });
});
