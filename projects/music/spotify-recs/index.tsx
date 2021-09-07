import axios from 'axios'
import clsx from 'clsx'
import BasicLayout from 'components/BasicLayout'
import Heading from 'components/Heading'
import { useEffect, useReducer, useState } from 'react'
import BigLoader from '../BigLoader'
import { FaPlayCircle, FaStopCircle } from 'react-icons/fa'
import NImage from 'next/image'

import spotifyImage from '../assets/spotify.png'

const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const isProd = process.env.NODE_ENV === 'production'
const redirectUri = 'https://b3n.fun/spotify-recommendations'

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

const Input: React.FC<{
  placeholder: string
  onChange: (val: string) => void
}> = ({ onChange, ...inputProps }) => (
  <input
    type="text"
    className="w-full rounded-xl outline-none border-2 border-gray-500 p-2 focus:shadow-lg"
    {...inputProps}
    onChange={(e) => onChange(e.target.value)}
  />
)

const Button: React.FC<{
  children: string
  big?: boolean
  onClick?: () => void
}> = ({ onClick, children, big }) => (
  <button
    onClick={onClick}
    className={clsx(
      'rounded-full px-3 py-2 bg-music-spotify text-white font-bold',
      big && 'text-xl px-5 py-3 hover:animate-vibrate'
    )}
  >
    {children}
  </button>
)

interface Config {
  seedSongs: string[]
}

type ConfigAction = {
  type: 'setSong'
  i: number
  song: string
}

function configReducer(state: Config, action: ConfigAction): Config {
  switch (action.type) {
    case 'setSong':
      const seedSongs = state.seedSongs
      seedSongs[action.i] = action.song
      return { ...state, seedSongs }
  }
}

let audioInstance: HTMLAudioElement

const PlayPauseIcon = ({ isStop, ...props }) =>
  isStop ? <FaStopCircle {...props} /> : <FaPlayCircle {...props} />

export default function SpotifyRecs() {
  const [spotifyToken, setSpotifyToken] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState<any>()
  const [currentPreview, setPreview] = useState<string>()
  const [config, dispatch] = useReducer(configReducer, {
    seedSongs: [],
  })

  if (spotifyToken)
    spotifyApi.defaults.headers['Authorization'] = 'Bearer ' + spotifyToken

  useEffect(() => {
    setSpotifyToken(
      new URL(window.location.href.replace(/#/g, '?')).searchParams.get(
        'access_token'
      )
    )
    if (isProd) history.replaceState(null, null, ' ')
  }, [])

  useEffect(() => {
    if (!audioInstance) audioInstance = new Audio()
    if (audioInstance) audioInstance.pause()
    if (currentPreview) {
      audioInstance.setAttribute('src', currentPreview)
      audioInstance.play()
    }
  }, [currentPreview])

  const getRecs = async () => {
    setProcessing(true)

    let seedSongIds = []
    for (const song of config.seedSongs) {
      const { data } = await spotifyApi.get(
        `/search?q=${encodeURIComponent(song)}&type=track&limit=1`
      )
      seedSongIds.push(data.tracks.items[0].id)
    }

    const { data } = await spotifyApi.get(
      `/recommendations?limit=20&seed_artists=&seed_genres=&seed_tracks=${seedSongIds.join(
        ','
      )}`
    )
    setProcessing(false)
    setResults(data.tracks)
  }

  return (
    <BasicLayout title="Spotify Recommendations">
      <div className="w-full py-16">
        {!processing && !results && (
          <>
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
                  To generate recommendations, you&apos;ll first need to
                  authorize me to use your spotify account to fetch song data on
                  your behalf.
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
            {spotifyToken && (
              <div className="my-12 flex flex-col items-center gap-8">
                <div className="flex flex-col gap-2 w-96">
                  <p className="font-medium text-center">
                    Enter up to 5 <b>songs</b> you like
                  </p>
                  <Input
                    placeholder="song 1"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 0, song })
                    }
                  />
                  <Input
                    placeholder="song 2"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 1, song })
                    }
                  />
                  <Input
                    placeholder="song 3"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 2, song })
                    }
                  />
                  <Input
                    placeholder="song 4"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 3, song })
                    }
                  />
                  <Input
                    placeholder="song 5"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 4, song })
                    }
                  />
                </div>
                <Button big onClick={getRecs}>
                  Run the Magic ✨
                </Button>
              </div>
            )}
          </>
        )}

        {processing && (
          <div>
            <BigLoader />
            <p className="text-xl text-gray-700 text-center">
              Analyzing the tunes...
            </p>
          </div>
        )}

        {results && (
          <div className="w-full flex flex-col gap-8 items-center">
            <Heading>🎧 The Results are In! 🎹</Heading>
            <div className="w-full max-w-lg flex flex-col">
              {results.map((track, i) => (
                <div
                  key={track.id}
                  className="group flex items-center py-2 border-b-1 border-gray-200 hover:bg-gray-50 hover:py-3 transition-all"
                >
                  <span className="text-gray-400 mx-3">{i + 1}</span>
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden flex-grow"
                  >
                    <div className="font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {track.name}
                    </div>
                    <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-sm font-medium text-gray-400">
                      {track.artists.map((a) => a.name).join(', ')}
                    </div>
                  </a>
                  {track.preview_url && (
                    <button
                      type="button"
                      className="z-50"
                      onClick={(e) => {
                        setPreview(
                          currentPreview === track.preview_url
                            ? null
                            : track.preview_url
                        )
                      }}
                    >
                      <PlayPauseIcon
                        isStop={currentPreview === track.preview_url}
                        size={28}
                        className={clsx(
                          'mx-3 text-music-spotify fill-current group-hover:opacity-100 transition-all',
                          currentPreview !== track.preview_url && 'opacity-0'
                        )}
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="w-32">
              <div className="text-lg text-gray-600 text-center py-2">
                Powered By
              </div>
              <NImage src={spotifyImage} alt="spotify" layout="responsive" />
            </div>
          </div>
        )}
      </div>
    </BasicLayout>
  )
}
