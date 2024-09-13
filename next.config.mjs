/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.sabornamesa.com.br',
            port: '',
          },
        ],
      },
};

export default nextConfig;
