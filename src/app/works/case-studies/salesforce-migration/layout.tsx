import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seamless Salesforce Migration | BFL Design',
  description:
    'A healthcare SaaS company needed to consolidate fragmented systems into Salesforce — without losing data, disrupting teams, or sacrificing usability. 1.2M+ records migrated at 98.9% fidelity.',
};

export default function SalesforceMigrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
