import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Designing a Portfolio When Anyone Can Build Anything | BFL Design',
  description:
    'In a world where AI can produce websites in seconds, how do you make a portfolio that actually means something? A meta case study on judgment, constraint, and designing in the AI era.',
};

export default function PortfolioAIWorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
