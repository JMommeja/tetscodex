import type { Metadata } from 'next';
import './globals.css';
import './ui.css';

export const metadata: Metadata = {
  title: 'Ye Alt Archive',
  description: 'Archive communautaire des versions alternatives de morceaux Kanye West'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
