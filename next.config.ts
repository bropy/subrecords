import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'


import { envServer } from '@/config/env'

// i18n
const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/pkg/libraries/locale/request.ts',
  experimental: {
    createMessagesDeclaration: './translations/en.json',
  },
})

// next config
const nextConfig: NextConfig = {
  output: 'standalone',

  poweredByHeader: false,
  cacheMaxMemorySize: 100 * 1024 * 1024,

  logging: {
    fetches: {
      fullUrl: envServer.NODE_ENV !== 'production',
    },
  },

  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    minimumCacheTTL: 3600,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 1080, 1920, 3840],
    imageSizes: [16, 64, 128, 384],
  },

  serverExternalPackages: ['pino', 'pino-pretty'],

  experimental: {
    reactCompiler: true,
    optimizeServerReact: true,
    optimizePackageImports: [
      'zod',
      'luxon',
      'react-hook-form',
      'usehooks-ts',
      '@heroui/react',
      '@heroui/accordion',
      '@heroui/autocomplete',
      '@heroui/avatar',
      '@heroui/badge',
      '@heroui/button',
      '@heroui/card',
      '@heroui/chip',
      '@heroui/divider',
      '@heroui/dropdown',
      '@heroui/input',
      '@heroui/link',
      '@heroui/modal',
      '@heroui/navbar',
      '@heroui/radio',
      '@heroui/scroll-shadow',
      '@heroui/select',
      '@heroui/skeleton',
      '@heroui/spinner',
      '@heroui/system',
      '@heroui/table',
      '@heroui/tabs',
      '@heroui/theme',
      '@heroui/tooltip',
      'zustand',
      'framer-motion',
    ],
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 25,
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },

  redirects: async () => {
    return [
      {
        source: `/:locale/admin/:path*`,
        destination: '/admin/:path*',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)