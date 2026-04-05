import { render, screen, fireEvent } from '@/test-utils';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/viewmodels/useNavigation', () => ({
  useNavigation: () => ({
    footerNav: {
      works: [
        { label: 'Case Studies', href: '/works/case-studies' },
        { label: 'Products', href: '/products' },
        { label: 'Articles', href: '/blog' },
      ],
      about: [
        { label: 'About Us', href: '/about' },
        { label: 'Who We Serve', href: '/clients' },
      ],
      legal: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  }),
}));

import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders the Works section heading', () => {
    render(<Footer />);
    expect(screen.getByText('Works')).toBeInTheDocument();
  });

  it('renders the About section heading', () => {
    render(<Footer />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders the Newsletter section heading', () => {
    render(<Footer />);
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
  });

  it('renders footer nav links from the Works group', () => {
    render(<Footer />);
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
  });

  it('renders footer nav links from the About group', () => {
    render(<Footer />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Who We Serve')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`${year}.*Big Freight Life`))).toBeInTheDocument();
  });

  it('renders newsletter email input and subscribe button', () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('shows thank-you message after subscribing', () => {
    render(<Footer />);
    const emailInput = screen.getByPlaceholderText('Your email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(screen.getByText(/thanks for subscribing/i)).toBeInTheDocument();
  });

  it('does not show thank-you if email is empty', () => {
    render(<Footer />);
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(screen.queryByText(/thanks for subscribing/i)).not.toBeInTheDocument();
  });
});
