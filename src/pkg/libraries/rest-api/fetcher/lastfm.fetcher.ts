import ky, { type KyInstance } from 'ky'

import { envClient } from '@/config/env'

// Last.fm API fetcher
export const lastFmFetcher: KyInstance = ky.create({
  prefixUrl: 'https://ws.audioscrobbler.com/2.0/',
  timeout: 10000,
  throwHttpErrors: false,
  searchParams: {
    api_key: envClient.NEXT_PUBLIC_LASTFM_API_KEY,
    format: 'json',
  },
})
