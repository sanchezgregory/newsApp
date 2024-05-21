/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['c.biztoc.com','images.frandroid.com','securityaffairs.com', 'i0.wp.com', 'img.huffingtonpost.es'], // Agrega aquí los dominios desde donde cargarás imágenes
  },
}

module.exports = nextConfig
