import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Small Teams Can't Afford Bad AI Decisions | BFL Design",
  description:
    'How limited margin for error changes how AI should be designed and deployed. Error budgets, cost caps, and governance for small teams.',
};

export default function SmallTeamsAIDecisionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
