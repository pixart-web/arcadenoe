/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportação estática: o preview pode ser servido por qualquer servidor de ficheiros.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
