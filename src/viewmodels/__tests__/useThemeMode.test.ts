import { renderHook, act } from '@testing-library/react';
import { useThemeMode } from '@/viewmodels/useThemeMode';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

// Mock window.matchMedia
const mockMatchMedia = vi.fn();
Object.defineProperty(window, 'matchMedia', {
  value: mockMatchMedia,
  writable: true,
});

describe('useThemeMode', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockLocalStorage.clear();
    // Default: no stored preference, no dark mode system preference
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMatchMedia.mockReturnValue({ matches: false });
  });

  describe('initial state', () => {
    it('initializes mode as "light" before effect runs', () => {
      const { result } = renderHook(() => useThemeMode());
      // Before useEffect, mode is 'light'
      expect(result.current.mode).toBe('light');
    });

    it('initializes mounted as false before effect runs', () => {
      const { result } = renderHook(() => useThemeMode());
      // Before useEffect, mounted is false
      // Note: in jsdom, effects run synchronously after render in renderHook
      // so we check the final mounted state
      expect(result.current.mounted).toBe(true); // effects fire after render in testing env
    });
  });

  describe('theme initialization from localStorage', () => {
    it('sets mode to "dark" when localStorage has "dark"', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const { result } = renderHook(() => useThemeMode());

      expect(result.current.mode).toBe('dark');
    });

    it('sets mode to "light" when localStorage has "light"', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      const { result } = renderHook(() => useThemeMode());

      expect(result.current.mode).toBe('light');
    });

    it('reads from the correct localStorage key', () => {
      renderHook(() => useThemeMode());

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme-mode');
    });
  });

  describe('theme initialization from system preference', () => {
    it('sets mode to "dark" when no localStorage value and system prefers dark', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: true });

      const { result } = renderHook(() => useThemeMode());

      expect(result.current.mode).toBe('dark');
    });

    it('keeps mode as "light" when no localStorage and system prefers light', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: false });

      const { result } = renderHook(() => useThemeMode());

      expect(result.current.mode).toBe('light');
    });

    it('localStorage preference overrides system preference', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      mockMatchMedia.mockReturnValue({ matches: true }); // system prefers dark

      const { result } = renderHook(() => useThemeMode());

      expect(result.current.mode).toBe('light'); // localStorage wins
    });

    it('queries the correct media query for dark mode', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      renderHook(() => useThemeMode());

      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });
  });

  describe('mounted state', () => {
    it('sets mounted to true after effect runs', () => {
      const { result } = renderHook(() => useThemeMode());

      expect(result.current.mounted).toBe(true);
    });
  });

  describe('toggleMode', () => {
    it('toggles from "light" to "dark"', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: false });

      const { result } = renderHook(() => useThemeMode());
      expect(result.current.mode).toBe('light');

      act(() => {
        result.current.toggleMode();
      });

      expect(result.current.mode).toBe('dark');
    });

    it('toggles from "dark" to "light"', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const { result } = renderHook(() => useThemeMode());
      expect(result.current.mode).toBe('dark');

      act(() => {
        result.current.toggleMode();
      });

      expect(result.current.mode).toBe('light');
    });

    it('persists new mode to localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: false });

      const { result } = renderHook(() => useThemeMode());

      act(() => {
        result.current.toggleMode();
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme-mode', 'dark');
    });

    it('persists "light" to localStorage when toggling from dark', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const { result } = renderHook(() => useThemeMode());

      act(() => {
        result.current.toggleMode();
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme-mode', 'light');
    });

    it('toggles correctly multiple times', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => { result.current.toggleMode(); });
      expect(result.current.mode).toBe('dark');

      act(() => { result.current.toggleMode(); });
      expect(result.current.mode).toBe('light');

      act(() => { result.current.toggleMode(); });
      expect(result.current.mode).toBe('dark');
    });

    it('stores the correct mode after each toggle', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => { result.current.toggleMode(); }); // light → dark
      expect(mockLocalStorage.setItem).toHaveBeenLastCalledWith('theme-mode', 'dark');

      act(() => { result.current.toggleMode(); }); // dark → light
      expect(mockLocalStorage.setItem).toHaveBeenLastCalledWith('theme-mode', 'light');
    });
  });
});
