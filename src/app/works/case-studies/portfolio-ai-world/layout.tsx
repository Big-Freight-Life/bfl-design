import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Designing a Portfolio When Anyone Can Build Anything | BFL Design',
  description:
    'How bfl.design went from a portfolio to a distribution system — and what that required giving up. A meta case study on system design, agentic collaboration, and building in the AI era.',
};

export default function PortfolioAIWorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
