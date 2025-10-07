import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/pkg/libraries/locale/requests.ts',
  experimental: {
    createMessagesDeclaration: './src/translations/en.json',
  },
})

const nextConfig: NextConfig = {
  // your existing config
}

export default withNextIntl(nextConfig)