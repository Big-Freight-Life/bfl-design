import { render, screen, fireEvent, act } from '@/test-utils';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...rest} />
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

const mockOpenMegamenu = vi.fn();
const mockCloseMegamenu = vi.fn();
const mockSetActivePanelId = vi.fn();

vi.mock('@/viewmodels/useNavigation', () => ({
  useNavigation: () => ({
    primaryNav: [
      { label: 'Our Work', href: '/works' },
      { label: 'Products', href: '#', megamenu: 'products' },
      { label: 'About', href: '/about', megamenu: 'about' },
    ],
    secondaryNav: [
      { label: 'Contact', href: '/contact' },
    ],
    productsPanels: [
      { id: 'low-ox-life', label: 'Low Ox Life', href: '/products/low-ox-life', description: 'Track oxalate intake.' },
    ],
    aboutPanels: [
      { id: 'about-us', label: 'About Us', href: '/about', description: 'Learn about us.' },
    ],
    activeMegamenu: null,
    activePanelId: null,
    setActivePanelId: mockSetActivePanelId,
    openMegamenu: mockOpenMegamenu,
    closeMegamenu: mockCloseMegamenu,
    isActive: () => false,
    isParentActive: () => false,
  }),
}));

vi.mock('@/components/common/MegaMenu', () => ({
  default: ({ title }: { title: string }) => <div data-testid="megamenu">{title} MegaMenu</div>,
}));

import Header from '@/components/layout/Header';

describe('Header', () => {
  it('renders the brand logo image', () => {
    render(<Header />);
    const logo = screen.getByAltText('Big Freight Life');
    expect(logo).toBeInTheDocument();
  });

  it('renders the brand name text', () => {
    render(<Header />);
    expect(screen.getByText('Big Freight Life')).toBeInTheDocument();
  });

  it('renders primary nav items', () => {
    render(<Header />);
    expect(screen.getByText('Our Work')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders secondary nav items', () => {
    render(<Header />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the Try Raybot link', () => {
    render(<Header />);
    expect(screen.getByText('Try Raybot')).toBeInTheDocument();
  });

  it('does not render megamenu when activeMegamenu is null', () => {
    render(<Header />);
    expect(screen.queryByTestId('megamenu')).not.toBeInTheDocument();
  });

  it('closes megamenu on Escape key press when megamenu is not open', () => {
    render(<Header />);
    // ESC key with no active megamenu should not call closeMegamenu
    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(mockCloseMegamenu).not.toHaveBeenCalled();
  });
});

describe('Header with megamenu open', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders megamenu when activeMegamenu is products', () => {
    vi.doMock('@/viewmodels/useNavigation', () => ({
      useNavigation: () => ({
        primaryNav: [
          { label: 'Products', href: '#', megamenu: 'products' },
        ],
        secondaryNav: [],
        productsPanels: [
          { id: 'low-ox-life', label: 'Low Ox Life', href: '/products/low-ox-life', description: 'Track oxalate intake.' },
        ],
        aboutPanels: [],
        activeMegamenu: 'products',
        activePanelId: 'low-ox-life',
        setActivePanelId: mockSetActivePanelId,
        openMegamenu: mockOpenMegamenu,
        closeMegamenu: mockCloseMegamenu,
        isActive: () => false,
        isParentActive: () => false,
      }),
    }));
  });
});
