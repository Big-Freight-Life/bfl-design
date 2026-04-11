import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hyland for Workday Integration | BFL Design',
  description:
    'Unified content management embedded directly into Workday screens. No middleware. No custom code. Zero context switching.',
};

export default function HylandForWorkdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
