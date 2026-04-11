import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Is Not a Feature | BFL Design',
  description:
    'Why treating AI as a bolt-on leads to fragile systems — and what to design instead. Architecture patterns, case studies, and implementation frameworks for AI-first system design.',
};

export default function AIIsNotAFeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
