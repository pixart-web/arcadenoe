import type { Metadata } from 'next';

// Português por defeito: a raiz encaminha para /pt/ (exportação estática, sem servidor).
export const metadata: Metadata = {
  title: 'Centro Veterinário Arca de Noé',
  robots: { index: false, follow: true },
};

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=pt/" />
      <p style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <a href="pt/">Centro Veterinário Arca de Noé — continuar</a>
      </p>
    </>
  );
}
