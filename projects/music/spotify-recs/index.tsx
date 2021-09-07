import clsx from 'clsx'
import BasicLayout from 'components/BasicLayout'
import Heading from 'components/Heading'
import { useEffect, useState } from 'react'

const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const redirectUri = 'https://b3n.fun/fun/spotify-recommendations'

const Button: React.FC<{ children: string }> = ({ children }) => (
  <button className="rounded-full px-3 py-2 bg-music-spotify text-white font-bold">
    {children}
  </button>
)

export default function SpotifyRecs() {
  const [spotifyToken, setSpotifyToken] = useState(null)

  useEffect(() => {
    setSpotifyToken(
      new URL(window.location.href.replace(/#/g, '?')).searchParams.get(
        'access_token'
      )
    )
    history.replaceState(null, null, ' ')
  }, [])

  return (
    <BasicLayout title="Spotify Recommendations">
      <div className="w-full py-16">
        <div className="flex flex-col items-center gap-4">
          <Heading>🎵🎤 Spotify Recommendation Machine 🥁🎸</Heading>
          <p className="font-bold text-gray-600">
            Get recommendations based on other songs you like and specified
            characteristics like tempo, &quot;danceability&quot;, etc.
          </p>
        </div>

        {!spotifyToken && (
          <div className="max-w-lg text-center mx-auto my-8 flex flex-col items-center gap-4">
            <p>
              To generate recommendations, you&apos;ll first need to authorize
              me to use your spotify account to fetch song data on your behalf.
            </p>
            <a
              href={`https://accounts.spotify.com/authorize?response_type=token&client_id=${spotifyClientId}&redirect_uri=${encodeURIComponent(
                redirectUri
              )}&show_dialog=false`}
            >
              <Button>Sign in with Spotify</Button>
            </a>
          </div>
        )}
        {spotifyToken && <div className="flex flex-col items-center"></div>}
      </div>
    </BasicLayout>
  )
}
