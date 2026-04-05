import { renderHook, act } from '@testing-library/react';
import { useNavigation, isActiveRoute } from '@/viewmodels/useNavigation';

// Mock next/navigation
const mockUsePathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('useNavigation', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  describe('initial state', () => {
    it('returns pathname from usePathname', () => {
      mockUsePathname.mockReturnValue('/about');
      const { result } = renderHook(() => useNavigation());
      expect(result.current.pathname).toBe('/about');
    });

    it('initializes drawerOpen as false', () => {
      const { result } = renderHook(() => useNavigation());
      expect(result.current.drawerOpen).toBe(false);
    });

    it('initializes activeMegamenu as null', () => {
      const { result } = renderHook(() => useNavigation());
      expect(result.current.activeMegamenu).toBeNull();
    });

    it('initializes activePanelId as null', () => {
      const { result } = renderHook(() => useNavigation());
      expect(result.current.activePanelId).toBeNull();
    });

    it('exposes navigation data arrays', () => {
      const { result } = renderHook(() => useNavigation());
      expect(Array.isArray(result.current.primaryNav)).toBe(true);
      expect(Array.isArray(result.current.secondaryNav)).toBe(true);
      expect(Array.isArray(result.current.productsPanels)).toBe(true);
      expect(Array.isArray(result.current.aboutPanels)).toBe(true);
      expect(Array.isArray(result.current.mobileTabItems)).toBe(true);
      expect(Array.isArray(result.current.mobileDrawerItems)).toBe(true);
      expect(Array.isArray(result.current.mobileDrawerUtility)).toBe(true);
    });

    it('exposes footerNav object', () => {
      const { result } = renderHook(() => useNavigation());
      expect(result.current.footerNav).toBeDefined();
      expect(typeof result.current.footerNav).toBe('object');
    });
  });

  describe('toggleDrawer', () => {
    it('opens drawer when it is closed', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.toggleDrawer();
      });

      expect(result.current.drawerOpen).toBe(true);
    });

    it('closes drawer when it is open', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.toggleDrawer();
        result.current.toggleDrawer();
      });

      expect(result.current.drawerOpen).toBe(false);
    });

    it('toggles correctly multiple times', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => { result.current.toggleDrawer(); });
      expect(result.current.drawerOpen).toBe(true);

      act(() => { result.current.toggleDrawer(); });
      expect(result.current.drawerOpen).toBe(false);

      act(() => { result.current.toggleDrawer(); });
      expect(result.current.drawerOpen).toBe(true);
    });
  });

  describe('closeDrawer', () => {
    it('closes drawer when it is open', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.toggleDrawer(); // open it
        result.current.closeDrawer();  // close it
      });

      expect(result.current.drawerOpen).toBe(false);
    });

    it('has no effect when drawer is already closed', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.closeDrawer();
      });

      expect(result.current.drawerOpen).toBe(false);
    });
  });

  describe('openMegamenu', () => {
    it('sets activeMegamenu to "products"', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.openMegamenu('products');
      });

      expect(result.current.activeMegamenu).toBe('products');
    });

    it('sets activeMegamenu to "about"', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.openMegamenu('about');
      });

      expect(result.current.activeMegamenu).toBe('about');
    });

    it('sets activePanelId to the first products panel id when opening products menu', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.openMegamenu('products');
      });

      expect(result.current.activePanelId).toBe(result.current.productsPanels[0].id);
    });

    it('sets activePanelId to the first about panel id when opening about menu', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.openMegamenu('about');
      });

      expect(result.current.activePanelId).toBe(result.current.aboutPanels[0].id);
    });

    it('switches from products to about menu', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.openMegamenu('products');
      });
      expect(result.current.activeMegamenu).toBe('products');

      act(() => {
        result.current.openMegamenu('about');
      });
      expect(result.current.activeMegamenu).toBe('about');
    });
  });

  describe('closeMegamenu', () => {
    it('sets activeMegamenu to null', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.openMegamenu('products');
        result.current.closeMegamenu();
      });

      expect(result.current.activeMegamenu).toBeNull();
    });

    it('sets activePanelId to null', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.openMegamenu('products');
        result.current.closeMegamenu();
      });

      expect(result.current.activePanelId).toBeNull();
    });

    it('has no effect when no megamenu is open', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.closeMegamenu();
      });

      expect(result.current.activeMegamenu).toBeNull();
      expect(result.current.activePanelId).toBeNull();
    });
  });

  describe('setActivePanelId', () => {
    it('changes the active panel id', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.openMegamenu('products');
        result.current.setActivePanelId('bio-break');
      });

      expect(result.current.activePanelId).toBe('bio-break');
    });
  });

  describe('isActive', () => {
    it('returns true for exact pathname match', () => {
      mockUsePathname.mockReturnValue('/about');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isActive('/about')).toBe(true);
    });

    it('returns false for non-matching path', () => {
      mockUsePathname.mockReturnValue('/contact');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isActive('/about')).toBe(false);
    });

    it('returns true for root when pathname is /', () => {
      mockUsePathname.mockReturnValue('/');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isActive('/')).toBe(true);
    });

    it('returns false for # href', () => {
      mockUsePathname.mockReturnValue('/');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isActive('#')).toBe(false);
    });

    it('returns true for parent path when current path is a child', () => {
      mockUsePathname.mockReturnValue('/works/case-studies');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isActive('/works')).toBe(true);
    });
  });

  describe('isParentActive', () => {
    it('returns true when current path matches a products panel href', () => {
      mockUsePathname.mockReturnValue('/products/low-ox-life');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isParentActive('products')).toBe(true);
    });

    it('returns false when current path does not match any products panel', () => {
      mockUsePathname.mockReturnValue('/contact');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isParentActive('products')).toBe(false);
    });

    it('returns true when current path matches an about panel href', () => {
      mockUsePathname.mockReturnValue('/about');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isParentActive('about')).toBe(true);
    });

    it('returns false when current path does not match any about panel', () => {
      mockUsePathname.mockReturnValue('/blog');
      const { result } = renderHook(() => useNavigation());

      expect(result.current.isParentActive('about')).toBe(false);
    });
  });
});

// Test the re-exported isActiveRoute
describe('isActiveRoute (re-export from viewmodel)', () => {
  it('is re-exported and works correctly', () => {
    expect(isActiveRoute('/about', '/about')).toBe(true);
    expect(isActiveRoute('/contact', '/about')).toBe(false);
    expect(isActiveRoute('/', '/')).toBe(true);
    expect(isActiveRoute('/works/detail', '/works')).toBe(true);
  });
});
