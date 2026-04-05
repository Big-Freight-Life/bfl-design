import { render, screen } from '@/test-utils';
import FeatureCard from '@/components/products/FeatureCard';

const defaultProps = {
  title: 'Smart Logging',
  desc: 'Track your food intake with precision.',
  tier: 'Free',
  icon: <span data-testid="icon">icon</span>,
  accentColor: '#117680',
};

describe('FeatureCard', () => {
  it('renders the title', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText('Smart Logging')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText('Track your food intake with precision.')).toBeInTheDocument();
  });

  it('renders the tier chip', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not show Coming Soon chip by default', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });

  it('shows Coming Soon chip when comingSoon is true', () => {
    render(<FeatureCard {...defaultProps} comingSoon />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it('renders with Starter tier', () => {
    render(<FeatureCard {...defaultProps} tier="Starter" />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
  });

  it('renders with Pro tier', () => {
    render(<FeatureCard {...defaultProps} tier="Pro" />);
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('renders with Elite tier', () => {
    render(<FeatureCard {...defaultProps} tier="Elite" />);
    expect(screen.getByText('Elite')).toBeInTheDocument();
  });

  it('renders with an unknown tier without crashing', () => {
    render(<FeatureCard {...defaultProps} tier="Unknown" />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
