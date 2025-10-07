# Last.fm API Setup

## Getting Your API Key

1. Go to [Last.fm API](https://www.last.fm/api/account/create)
2. Create a Last.fm account if you don't have one
3. Fill out the application form:
   - **Application name**: SubMusic (or your preferred name)
   - **Application description**: Music discovery platform
   - **Application homepage URL**: Your website URL
4. Accept the terms and create the application
5. Copy your API key

## Environment Setup

Create a `.env.local` file in your project root:

```bash
# Last.fm API Configuration
NEXT_PUBLIC_LASTFM_API_KEY=your_api_key_here

# Existing environment variables
NEXT_PUBLIC_CLIENT_WEB_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_API_URL=http://localhost:3000/api
```

## How It Works

The application now fetches top albums from multiple artists using the Last.fm API:

1. **Fetches Top Artists**: Uses `chart.getTopArtists` to get the most popular artists
2. **Gets Albums per Artist**: For each artist, fetches their top 2 albums using `artist.getTopAlbums`
3. **Displays Combined Results**: Shows up to 16 albums from various artists
4. **Auto-refresh**: Data refreshes every 5 minutes automatically
5. **Caching**: Uses TanStack Query for efficient caching and background updates

## Features

- ✅ **Netflix-style Design**: Dark theme with red accents
- ✅ **Internationalization**: English and German support
- ✅ **Responsive Layout**: Works on all device sizes
- ✅ **Auto-refresh**: Updates every 5 minutes
- ✅ **Error Handling**: Graceful fallbacks for failed requests
- ✅ **Loading States**: Beautiful skeleton loading animations
- ✅ **No Emojis**: Clean, professional design using custom SVG icons
