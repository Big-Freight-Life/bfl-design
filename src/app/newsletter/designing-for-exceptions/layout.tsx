import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Designing for Exceptions, Not the Happy Path | BFL Design',
  description:
    'Why edge cases are the clearest signal of how a system really works. Exception-first design patterns for AI systems.',
};

export default function DesigningForExceptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
