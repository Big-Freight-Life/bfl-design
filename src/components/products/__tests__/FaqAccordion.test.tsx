import { render, screen, fireEvent } from '@/test-utils';
import FaqAccordion from '@/components/products/FaqAccordion';

const faqs = [
  { question: 'What is oxalate?', answer: 'Oxalate is a naturally occurring compound found in many foods.' },
  { question: 'How does tracking work?', answer: 'You log your meals and the app calculates oxalate levels.' },
  { question: 'Is there a free plan?', answer: 'Yes, the free plan includes basic food logging.' },
];

describe('FaqAccordion', () => {
  it('renders all question texts', () => {
    render(<FaqAccordion faqs={faqs} />);
    expect(screen.getByText('What is oxalate?')).toBeInTheDocument();
    expect(screen.getByText('How does tracking work?')).toBeInTheDocument();
    expect(screen.getByText('Is there a free plan?')).toBeInTheDocument();
  });

  it('does not show answer content initially (collapsed)', () => {
    render(<FaqAccordion faqs={faqs} />);
    // Answers are in the DOM but visually hidden via maxHeight 0; check aria-expanded
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('expands an item when clicked', () => {
    render(<FaqAccordion faqs={faqs} />);
    const firstButton = screen.getAllByRole('button')[0];
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows the answer text after expanding', () => {
    render(<FaqAccordion faqs={faqs} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('Oxalate is a naturally occurring compound found in many foods.')).toBeInTheDocument();
  });

  it('collapses an already-open item when clicked again', () => {
    render(<FaqAccordion faqs={faqs} />);
    const firstButton = screen.getAllByRole('button')[0];
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('collapses the previously open item when a new item is expanded', () => {
    render(<FaqAccordion faqs={faqs} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders correct number of accordion items', () => {
    render(<FaqAccordion faqs={faqs} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(faqs.length);
  });

  it('renders with empty faqs array without crashing', () => {
    render(<FaqAccordion faqs={[]} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
