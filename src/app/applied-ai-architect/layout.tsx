import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applied AI Architect | BFL Design',
  description:
    'Your system needs an architect. AI fails when nobody designs the system it runs inside. Applied AI Architecture fixes that — from strategy to distribution.',
};

export default function AppliedAIArchitectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
