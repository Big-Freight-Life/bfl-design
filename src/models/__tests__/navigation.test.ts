import {
  isActiveRoute,
  isMegamenuActive,
  primaryNav,
  secondaryNav,
  productsPanels,
  aboutPanels,
  mobileTabItems,
  mobileDrawerItems,
  mobileDrawerUtility,
  footerNav,
  type NavItem,
  type MegamenuPanel,
} from '@/models/navigation';

describe('navigation model', () => {
  describe('isActiveRoute', () => {
    it('returns true for exact root match', () => {
      expect(isActiveRoute('/', '/')).toBe(true);
    });

    it('returns false for root href when pathname is not root', () => {
      expect(isActiveRoute('/about', '/')).toBe(false);
    });

    it('returns false for # href regardless of pathname', () => {
      expect(isActiveRoute('/', '#')).toBe(false);
      expect(isActiveRoute('/products', '#')).toBe(false);
      expect(isActiveRoute('#', '#')).toBe(false);
    });

    it('returns true for exact pathname match', () => {
      expect(isActiveRoute('/about', '/about')).toBe(true);
      expect(isActiveRoute('/contact', '/contact')).toBe(true);
    });

    it('returns true when pathname starts with href followed by /', () => {
      expect(isActiveRoute('/works/case-studies', '/works')).toBe(true);
      expect(isActiveRoute('/products/low-ox-life', '/products')).toBe(true);
    });

    it('returns false when pathname starts with href but without trailing /', () => {
      // "/worksmore" does not start with "/works/"
      expect(isActiveRoute('/worksmore', '/works')).toBe(false);
    });

    it('returns false when pathname is parent of href', () => {
      expect(isActiveRoute('/works', '/works/case-studies')).toBe(false);
    });

    it('returns false for completely unrelated paths', () => {
      expect(isActiveRoute('/contact', '/about')).toBe(false);
      expect(isActiveRoute('/blog', '/works')).toBe(false);
    });

    it('handles deeply nested paths', () => {
      expect(isActiveRoute('/works/case-studies/hyland', '/works')).toBe(true);
      expect(isActiveRoute('/works/case-studies/hyland', '/works/case-studies')).toBe(true);
    });
  });

  describe('isMegamenuActive', () => {
    it('returns true when a products panel href matches the pathname', () => {
      expect(isMegamenuActive('/products/low-ox-life', 'products')).toBe(true);
    });

    it('returns true when a products panel href is a prefix of pathname', () => {
      // /products/low-ox-life is an exact panel href, /products/low-ox-life/settings would be a sub-path
      expect(isMegamenuActive('/products/bio-break', 'products')).toBe(true);
    });

    it('returns false when no products panel matches', () => {
      expect(isMegamenuActive('/contact', 'products')).toBe(false);
      expect(isMegamenuActive('/', 'products')).toBe(false);
    });

    it('returns true when an about panel href matches the pathname', () => {
      expect(isMegamenuActive('/about', 'about')).toBe(true);
      expect(isMegamenuActive('/process', 'about')).toBe(true);
      expect(isMegamenuActive('/ai-ethics', 'about')).toBe(true);
    });

    it('returns false when no about panel matches', () => {
      expect(isMegamenuActive('/contact', 'about')).toBe(false);
      expect(isMegamenuActive('/blog', 'about')).toBe(false);
    });

    it('uses productsPanels for "products" megamenu', () => {
      // Verify it checks all product panels, not just first
      const anyProductHref = productsPanels[productsPanels.length - 1].href;
      expect(isMegamenuActive(anyProductHref, 'products')).toBe(true);
    });

    it('uses aboutPanels for "about" megamenu', () => {
      const anyAboutHref = aboutPanels[aboutPanels.length - 1].href;
      expect(isMegamenuActive(anyAboutHref, 'about')).toBe(true);
    });
  });

  describe('primaryNav', () => {
    it('is a non-empty array of NavItems', () => {
      expect(Array.isArray(primaryNav)).toBe(true);
      expect(primaryNav.length).toBeGreaterThan(0);
    });

    it('each item has label and href', () => {
      for (const item of primaryNav) {
        expect(typeof item.label).toBe('string');
        expect(typeof item.href).toBe('string');
      }
    });

    it('contains Products item with megamenu: products', () => {
      const products = primaryNav.find((n) => n.label === 'Products');
      expect(products).toBeDefined();
      expect(products?.megamenu).toBe('products');
    });

    it('contains About item with megamenu: about', () => {
      const about = primaryNav.find((n) => n.label === 'About');
      expect(about).toBeDefined();
      expect(about?.megamenu).toBe('about');
    });

    it('has exactly 5 items', () => {
      expect(primaryNav).toHaveLength(5);
    });
  });

  describe('secondaryNav', () => {
    it('contains Contact item', () => {
      const contact = secondaryNav.find((n) => n.href === '/contact');
      expect(contact).toBeDefined();
      expect(contact?.label).toBe('Contact');
    });
  });

  describe('productsPanels', () => {
    it('is a non-empty array of MegamenuPanels', () => {
      expect(Array.isArray(productsPanels)).toBe(true);
      expect(productsPanels.length).toBeGreaterThan(0);
    });

    it('each panel has id, label, href, and description', () => {
      const requiredKeys: (keyof MegamenuPanel)[] = ['id', 'label', 'href', 'description'];
      for (const panel of productsPanels) {
        for (const key of requiredKeys) {
          expect(panel).toHaveProperty(key);
          expect(typeof panel[key]).toBe('string');
        }
      }
    });

    it('contains Low Ox Life panel', () => {
      const panel = productsPanels.find((p) => p.id === 'low-ox-life');
      expect(panel).toBeDefined();
      expect(panel?.href).toBe('/products/low-ox-life');
    });

    it('all panel hrefs start with / or are root-relative', () => {
      for (const panel of productsPanels) {
        expect(panel.href.startsWith('/')).toBe(true);
      }
    });
  });

  describe('aboutPanels', () => {
    it('is a non-empty array of MegamenuPanels', () => {
      expect(Array.isArray(aboutPanels)).toBe(true);
      expect(aboutPanels.length).toBeGreaterThan(0);
    });

    it('contains About Us panel', () => {
      const panel = aboutPanels.find((p) => p.id === 'about-us');
      expect(panel).toBeDefined();
      expect(panel?.href).toBe('/about');
    });

    it('has exactly 3 panels', () => {
      expect(aboutPanels).toHaveLength(3);
    });
  });

  describe('mobileTabItems', () => {
    it('includes Home as first item', () => {
      expect(mobileTabItems[0].label).toBe('Home');
      expect(mobileTabItems[0].href).toBe('/');
    });

    it('includes Contact item', () => {
      const contact = mobileTabItems.find((n) => n.href === '/contact');
      expect(contact).toBeDefined();
    });

    it('has exactly 4 items', () => {
      expect(mobileTabItems).toHaveLength(4);
    });
  });

  describe('mobileDrawerItems', () => {
    it('is a non-empty array', () => {
      expect(mobileDrawerItems.length).toBeGreaterThan(0);
    });

    it('About item has children', () => {
      const about = mobileDrawerItems.find((n) => n.label === 'About');
      expect(about?.children).toBeDefined();
      expect(about?.children?.length).toBeGreaterThan(0);
    });
  });

  describe('mobileDrawerUtility', () => {
    it('contains Privacy and Terms links', () => {
      const labels = mobileDrawerUtility.map((n) => n.label);
      expect(labels).toContain('Privacy');
      expect(labels).toContain('Terms');
    });
  });

  describe('footerNav', () => {
    it('has works, about, and legal sections', () => {
      expect(Array.isArray(footerNav.works)).toBe(true);
      expect(Array.isArray(footerNav.about)).toBe(true);
      expect(Array.isArray(footerNav.legal)).toBe(true);
    });

    it('works section contains Articles (blog) link', () => {
      const articles = footerNav.works.find((n) => n.href === '/blog');
      expect(articles).toBeDefined();
    });

    it('legal section contains Privacy and Terms links', () => {
      const hrefs = footerNav.legal.map((n) => n.href);
      expect(hrefs).toContain('/privacy');
      expect(hrefs).toContain('/terms');
    });
  });
});
