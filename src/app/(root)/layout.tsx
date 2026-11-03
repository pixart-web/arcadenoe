import type { ReactNode } from 'react';

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
