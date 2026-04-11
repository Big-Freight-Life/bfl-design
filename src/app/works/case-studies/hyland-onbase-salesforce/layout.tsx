import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hyland OnBase Integration for Salesforce | BFL Design',
  description:
    'Enterprise document management meets CRM. A Salesforce AppExchange integration designed to eliminate context switching across Financial Services, Healthcare, and Retail.',
};

export default function HylandOnbaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
