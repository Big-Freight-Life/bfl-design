import { renderHook, act } from '@testing-library/react';
import { useCaseStudyAuth } from '@/viewmodels/useCaseStudyAuth';

const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true,
});

describe('useCaseStudyAuth', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('initial state', () => {
    it('initializes email as empty string', () => {
      const { result } = renderHook(() => useCaseStudyAuth());
      expect(result.current.email).toBe('');
    });

    it('initializes password as empty string', () => {
      const { result } = renderHook(() => useCaseStudyAuth());
      expect(result.current.password).toBe('');
    });

    it('initializes error as null', () => {
      const { result } = renderHook(() => useCaseStudyAuth());
      expect(result.current.error).toBeNull();
    });

    it('initializes isSubmitting as false', () => {
      const { result } = renderHook(() => useCaseStudyAuth());
      expect(result.current.isSubmitting).toBe(false);
    });

    it('exposes setEmail, setPassword, and handleSubmit', () => {
      const { result } = renderHook(() => useCaseStudyAuth());
      expect(typeof result.current.setEmail).toBe('function');
      expect(typeof result.current.setPassword).toBe('function');
      expect(typeof result.current.handleSubmit).toBe('function');
    });
  });

  describe('setEmail and setPassword', () => {
    it('updates email via setEmail', () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
      });

      expect(result.current.email).toBe('user@example.com');
    });

    it('updates password via setPassword', () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setPassword('secret123');
      });

      expect(result.current.password).toBe('secret123');
    });
  });

  describe('handleSubmit — validation', () => {
    it('sets error and does not fetch when email is empty', async () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.error).toBe('Email is required');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('sets error when email is invalid', async () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('not-an-email');
        result.current.setPassword('secret');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.error).toBe('Invalid email');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('sets error when password is empty', async () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.error).toBe('Password is required');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('does not set error when credentials are valid before fetch', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      });

      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('secret123');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      // After successful auth, no error should be set
      expect(result.current.error).toBeNull();
    });
  });

  describe('handleSubmit — successful authentication', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
      });
    });

    it('calls fetch with correct endpoint and method', async () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('secret123');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/case-study-auth', expect.objectContaining({
        method: 'POST',
      }));
    });

    it('sends credentials in the request body as JSON', async () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('secret123');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      const [, options] = mockFetch.mock.calls[0];
      const body = JSON.parse(options.body);
      expect(body).toEqual({ email: 'user@example.com', password: 'secret123' });
    });

    it('calls window.location.reload on success', async () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('secret123');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockReload).toHaveBeenCalledOnce();
    });

    it('sets isSubmitting to false after successful auth', async () => {
      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('secret123');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.isSubmitting).toBe(false);
    });
  });

  describe('handleSubmit — failed authentication', () => {
    it('sets error from API response on failure', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Invalid credentials' }),
      });

      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('wrongpass');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.error).toBe('Invalid credentials');
      expect(mockReload).not.toHaveBeenCalled();
    });

    it('sets fallback error when API response has no error field', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({}),
      });

      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('wrongpass');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.error).toBe('Authentication failed');
    });

    it('sets isSubmitting to false after failed auth', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Unauthorized' }),
      });

      const { result } = renderHook(() => useCaseStudyAuth());

      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('wrongpass');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.isSubmitting).toBe(false);
    });

    it('clears previous validation error before making request', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      });

      const { result } = renderHook(() => useCaseStudyAuth());

      // First trigger a validation error
      await act(async () => {
        await result.current.handleSubmit();
      });
      expect(result.current.error).toBe('Email is required');

      // Then fix and resubmit
      act(() => {
        result.current.setEmail('user@example.com');
        result.current.setPassword('secret');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.error).toBeNull();
    });
  });
});
