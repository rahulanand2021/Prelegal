import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prelegal',
  description: 'Draft legal agreements with AI assistance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
