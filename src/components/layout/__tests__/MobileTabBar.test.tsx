import { render, screen } from '@/test-utils';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

const mockToggleDrawer = vi.fn();

vi.mock('@/viewmodels/useNavigation', () => ({
  useNavigation: () => ({
    mobileTabItems: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Works', href: '/works' },
      { label: 'Contact', href: '/contact' },
    ],
    toggleDrawer: mockToggleDrawer,
    isActive: (href: string) => href === '/',
  }),
}));

import MobileTabBar from '@/components/layout/MobileTabBar';

describe('MobileTabBar', () => {
  it('renders all tab item labels', () => {
    render(<MobileTabBar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Works')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the More button', () => {
    render(<MobileTabBar />);
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('renders the nav element', () => {
    render(<MobileTabBar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('calls toggleDrawer when More button is clicked', () => {
    render(<MobileTabBar />);
    const moreButton = screen.getByText('More').closest('button');
    expect(moreButton).not.toBeNull();
    moreButton!.click();
    expect(mockToggleDrawer).toHaveBeenCalled();
  });

  it('renders links with correct hrefs', () => {
    render(<MobileTabBar />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    const blogLink = screen.getByText('Blog').closest('a');
    expect(blogLink).toHaveAttribute('href', '/blog');
  });
});
