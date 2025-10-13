import ky, { type KyInstance } from 'ky'

// music api fetcher (iTunes API)
export const musicApiFetcher: KyInstance = ky.create({
  prefixUrl: 'https://itunes.apple.com',
  throwHttpErrors: false,
})

