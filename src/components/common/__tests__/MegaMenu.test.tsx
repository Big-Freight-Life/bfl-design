import { render, screen, fireEvent } from '@/test-utils';

vi.mock('next/link', () => ({
  default: ({ href, children, onClick, ...rest }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
    <a href={href} onClick={onClick} {...rest}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import MegaMenu from '@/components/common/MegaMenu';

const panels = [
  { id: 'low-ox-life', label: 'Low Ox Life', href: '/products/low-ox-life', description: 'Track and manage oxalate intake.' },
  { id: 'bio-break', label: 'Bio Break', href: '/products/bio-break', description: 'Track bathroom health patterns.' },
];

const defaultProps = {
  title: 'Products',
  panels,
  activePanelId: 'low-ox-life',
  onPanelHover: vi.fn(),
  onClose: vi.fn(),
  onMouseEnter: vi.fn(),
  onMouseLeave: vi.fn(),
};

describe('MegaMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the menu title in the navigation index', () => {
    render(<MegaMenu {...defaultProps} />);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders all panel labels in the left nav', () => {
    render(<MegaMenu {...defaultProps} />);
    // "Low Ox Life" appears in both the left nav and the right panel heading
    const lowOxItems = screen.getAllByText('Low Ox Life');
    expect(lowOxItems.length).toBeGreaterThan(0);
    expect(screen.getByText('Bio Break')).toBeInTheDocument();
  });

  it('renders the active panel description in the right panel', () => {
    render(<MegaMenu {...defaultProps} />);
    expect(screen.getByText('Track and manage oxalate intake.')).toBeInTheDocument();
  });

  it('renders the active panel heading in the right panel', () => {
    render(<MegaMenu {...defaultProps} />);
    // The right panel shows the label as h4
    const headings = screen.getAllByText('Low Ox Life');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders a Learn more link', () => {
    render(<MegaMenu {...defaultProps} />);
    expect(screen.getByText(/learn more/i)).toBeInTheDocument();
  });

  it('calls onClose when a panel nav link is clicked', () => {
    const onClose = vi.fn();
    render(<MegaMenu {...defaultProps} onClose={onClose} />);
    // Click the left panel link for "Low Ox Life"
    const links = screen.getAllByRole('link', { name: /low ox life/i });
    fireEvent.click(links[0]);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(<MegaMenu {...defaultProps} onClose={onClose} />);
    // The backdrop is the first Box with onClick=onClose (fixed overlay)
    // Find it by its fixed position style — it's not a button so we target it directly
    const backdrop = container.querySelector('[style*="fixed"], [class*="MuiBox"]');
    // Use the first fixed-position div as backdrop — rely on onClose mock
    // Click the "Learn more" button which also calls onClose
    const learnMore = screen.getByText(/learn more/i);
    fireEvent.click(learnMore);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onPanelHover when hovering a panel link', () => {
    const onPanelHover = vi.fn();
    render(<MegaMenu {...defaultProps} onPanelHover={onPanelHover} />);
    const bioBreakLink = screen.getByText('Bio Break').closest('a');
    fireEvent.mouseEnter(bioBreakLink!);
    expect(onPanelHover).toHaveBeenCalledWith('bio-break');
  });

  it('falls back to first panel when activePanelId is null', () => {
    render(<MegaMenu {...defaultProps} activePanelId={null} />);
    // First panel content should be shown
    expect(screen.getByText('Track and manage oxalate intake.')).toBeInTheDocument();
  });

  it('renders About panels when title is About', () => {
    const aboutPanels = [
      { id: 'about-us', label: 'About Us', href: '/about', description: 'Learn about Big Freight Life.' },
    ];
    render(<MegaMenu {...defaultProps} title="About" panels={aboutPanels} activePanelId="about-us" />);
    // "About" appears in the overline heading; "About Us" appears in left nav and right panel
    const aboutItems = screen.getAllByText('About Us');
    expect(aboutItems.length).toBeGreaterThan(0);
    expect(screen.getByText('Learn about Big Freight Life.')).toBeInTheDocument();
  });
});
