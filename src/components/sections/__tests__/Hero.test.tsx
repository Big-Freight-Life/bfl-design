import { render, screen } from '@/test-utils';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock('@/viewmodels/useThemeMode', () => ({
  useThemeMode: () => ({ mode: 'light', toggleMode: vi.fn(), mounted: true }),
}));

// jsdom does not implement window.matchMedia — provide a stub
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

import Hero from '@/components/sections/Hero';

describe('Hero', () => {
  it('renders the first headline text', () => {
    render(<Hero />);
    expect(screen.getByText('The problem was always there.')).toBeInTheDocument();
  });

  it('renders the second headline text', () => {
    render(<Hero />);
    expect(screen.getByText('AI just made it visible.')).toBeInTheDocument();
  });

  it('renders the sub-headline body text', () => {
    render(<Hero />);
    expect(screen.getByText('We help teams build systems that work.')).toBeInTheDocument();
  });

  it('renders the Watch 30sec Intro CTA button', () => {
    render(<Hero />);
    expect(screen.getByText(/watch 30sec intro/i)).toBeInTheDocument();
  });

  it('renders the See the Work CTA button', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /see the work/i })).toBeInTheDocument();
  });

  it('CTA button links to /transformation', () => {
    render(<Hero />);
    const link = screen.getByText(/watch 30sec intro/i).closest('a');
    expect(link).toHaveAttribute('href', '/transformation');
  });

  it('See the Work button links to /works', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /see the work/i });
    expect(link).toHaveAttribute('href', '/works');
  });

  it('renders the scroll indicator text', () => {
    render(<Hero />);
    expect(screen.getByText('Scroll')).toBeInTheDocument();
  });

  it('renders the hero section element', () => {
    const { container } = render(<Hero />);
    // The hero is a <section> element rendered by MUI Box with component="section"
    const section = container.querySelector('section');
    expect(section).not.toBeNull();
  });
});
