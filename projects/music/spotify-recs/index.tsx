import axios from 'axios'
import clsx from 'clsx'
import BasicLayout from 'components/BasicLayout'
import Heading from 'components/Heading'
import { useEffect, useReducer, useState } from 'react'
import BigLoader from '../BigLoader'
import { FaPlayCircle, FaStopCircle, FaArrowLeft, FaRedo } from 'react-icons/fa'
import NImage from 'next/image'
import {
  GetHandleProps,
  GetRailProps,
  GetTrackProps,
  Handles,
  Rail,
  Slider,
  SliderItem,
  Tracks,
} from 'react-compound-slider'
import { selectRandom } from 'util/array'

import spotifyImage from '../assets/spotify.png'

const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const isProd = process.env.NODE_ENV === 'production'
const redirectUri = 'https://b3n.fun/spotify-recommendations'

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

const Input: React.FC<{
  placeholder: string
  defaultValue?: string
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
  big?: boolean
  onClick?: () => void
}> = ({ onClick, children, big }) => (
  <button
    onClick={onClick}
    className={clsx(
      'flex items-center rounded-full px-3 py-2 bg-music-spotify text-white font-bold',
      big && 'text-xl px-5 py-3 hover:animate-vibrate'
    )}
  >
    {children}
  </button>
)

const railOuterStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  height: 42,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  cursor: 'pointer',
}

const railInnerStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  height: 14,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none' as 'none',
  backgroundColor: 'rgb(155,155,155)',
}

interface TrackProps {
  source: SliderItem
  target: SliderItem
  getTrackProps: GetTrackProps
  disabled?: boolean
}

export const Track: React.FC<TrackProps> = ({
  source,
  target,
  getTrackProps,
  disabled = false,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        height: 14,
        zIndex: 1,
        backgroundColor: disabled ? '#999' : '#607E9E',
        borderRadius: 7,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

interface HandleProps {
  domain: number[]
  handle: SliderItem
  getHandleProps: GetHandleProps
  disabled?: boolean
}

const Handle: React.FC<HandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled = false,
  getHandleProps,
}) => {
  return (
    <>
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 28,
          height: 42,
          cursor: 'pointer',
          backgroundColor: 'none',
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 24,
          height: 24,
          borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: disabled ? '#666' : '#9BBFD4',
        }}
      />
    </>
  )
}

interface SliderRailProps {
  getRailProps: GetRailProps
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </>
  )
}

const ControlGroup: React.FC<{
  text: string
  description: string
  active: boolean
  onCheck: (checked: boolean) => void
  value: number
  onChange: (val: number) => void
}> = ({ text, active, value, onCheck, onChange, description }) => (
  <div className="flex flex-col gap-2 w-80">
    <label
      className={clsx(
        'flex items-center gap-2 font-bold text-gray-500',
        active ? 'text-gray-700' : 'text-gray-500'
      )}
    >
      <input
        type="checkbox"
        className="w-6 h-6"
        defaultChecked={active}
        onChange={(e) => onCheck(e.target.checked)}
      />
      {text}
    </label>
    {active && (
      <div>
        <p>{description}</p>
        <div className="relative my-4" style={{ height: 120, width: '100%' }}>
          <Slider
            mode={1}
            step={0.05}
            domain={[0, 1]}
            // rootStyle={{
            //   position: 'relative',
            //   width: '100%',
            //   touchAction: 'none',
            // }}
            onChange={(vals) => onChange(vals[0])}
            values={[value]}
          >
            <Rail>
              {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                  {handles.map((handle) => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={[0, 1]}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
                  {tracks.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>
        </div>
      </div>
    )}
  </div>
)

// TODO integers
const controls = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'loudness',
  'speechiness',
  'valence',
] as const
type Control = typeof controls[number]

type Config = {
  seedSongs: string[]
} & Record<
  Control,
  {
    enabled: boolean
    target: number
  }
>

type ConfigAction =
  | {
      type: 'setSong'
      i: number
      song: string
    }
  | {
      type: 'enableControl'
      control: Control
      enable: boolean
    }
  | {
      type: 'setControlValues'
      control: Control
      target: number
    }

function configReducer(state: Config, action: ConfigAction): Config {
  switch (action.type) {
    case 'setSong':
      const seedSongs = state.seedSongs
      seedSongs[action.i] = action.song
      return { ...state, seedSongs }
    case 'enableControl':
      return {
        ...state,
        [action.control]: { ...state[action.control], enabled: action.enable },
      }
    case 'setControlValues':
      const { type, control, ...values } = action
      return { ...state, [control]: { ...state[control], ...values } }
  }
  return state
}

let audioInstance: HTMLAudioElement

const PlayPauseIcon = ({ isStop, ...props }) =>
  isStop ? <FaStopCircle {...props} /> : <FaPlayCircle {...props} />

export default function SpotifyRecs() {
  const [spotifyToken, setSpotifyToken] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState<any>()
  const [currentPreview, setPreview] = useState<string>()

  const initialConfig = {
    seedSongs: [],
  }
  for (const c of controls)
    initialConfig[c] = {
      enabled: false,
      target: 0.5,
    }
  const [config, dispatch] = useReducer(configReducer, initialConfig as any)

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
    if (currentPreview) {
      audioInstance.setAttribute('src', currentPreview)
      audioInstance.play()
    }

    return () => {
      audioInstance.pause()
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

    const targetsConfigQuery = controls.reduce((query, c) => {
      return config[c].enabled ? query + `&target_${c}=${config[c].target}` : query
    }, '')

    const { data } = await spotifyApi.get(
      `/recommendations?limit=20&seed_artists=&seed_genres=&seed_tracks=${seedSongIds.join(
        ','
      )}` + targetsConfigQuery
    )
    setProcessing(false)
    setResults(data.tracks)
    window.scrollTo(0, 0)
  }

  return (
    <BasicLayout title="Music Recommendations">
      <div className="w-full py-16">
        {!processing && !results && (
          <>
            <div className="flex flex-col items-center gap-4">
              <Heading>🎵🎤 Music Recommendation Machine 🥁🎸</Heading>
              <p className="font-bold text-gray-600">
                Get spotify recommendations based on other songs or artists you
                like and specified characteristics like tempo, energy, and more.
              </p>
            </div>

            {!spotifyToken && (
              <div className="max-w-lg text-center mx-auto my-8 flex flex-col items-center gap-4">
                <p>
                  To generate recommendations, you&apos;ll first need to sign
                  into your spotify account.
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
                    defaultValue={config.seedSongs[0]}
                    placeholder="song 1"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 0, song })
                    }
                  />
                  <Input
                    defaultValue={config.seedSongs[1]}
                    placeholder="song 2"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 1, song })
                    }
                  />
                  <Input
                    defaultValue={config.seedSongs[2]}
                    placeholder="song 3"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 2, song })
                    }
                  />
                  <Input
                    defaultValue={config.seedSongs[3]}
                    placeholder="song 4"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 3, song })
                    }
                  />
                  <Input
                    defaultValue={config.seedSongs[4]}
                    placeholder="song 5"
                    onChange={(song) =>
                      dispatch({ type: 'setSong', i: 4, song })
                    }
                  />
                </div>
                <ControlGroup
                  text="Choose a target acousticness"
                  description="This value describes how acoustic recommendations should be"
                  active={config.acousticness.enabled}
                  value={config.acousticness.target}
                  onCheck={(enable) =>
                    dispatch({
                      type: 'enableControl',
                      control: 'acousticness',
                      enable,
                    })
                  }
                  onChange={(target) => {
                    dispatch({
                      type: 'setControlValues',
                      control: 'acousticness',
                      target,
                    })
                  }}
                />
                <ControlGroup
                  text="Choose a target danceability"
                  description="This value describes how suitable recommendations should be for dancing, based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity."
                  active={config.danceability.enabled}
                  value={config.danceability.target}
                  onCheck={(enable) =>
                    dispatch({
                      type: 'enableControl',
                      control: 'danceability',
                      enable,
                    })
                  }
                  onChange={(target) => {
                    dispatch({
                      type: 'setControlValues',
                      control: 'danceability',
                      target,
                    })
                  }}
                />
                <ControlGroup
                  text="Choose a target energy"
                  description="This value represents a perceptual measure of the intensity and activity of recommended songs."
                  active={config.energy.enabled}
                  value={config.energy.target}
                  onCheck={(enable) =>
                    dispatch({
                      type: 'enableControl',
                      control: 'energy',
                      enable,
                    })
                  }
                  onChange={(target) => {
                    dispatch({
                      type: 'setControlValues',
                      control: 'energy',
                      target,
                    })
                  }}
                />
                <ControlGroup
                  text="Choose a target instrumentalness"
                  description="This value describes how instrumental recommendations are."
                  active={config.instrumentalness.enabled}
                  value={config.instrumentalness.target}
                  onCheck={(enable) =>
                    dispatch({
                      type: 'enableControl',
                      control: 'instrumentalness',
                      enable,
                    })
                  }
                  onChange={(target) => {
                    dispatch({
                      type: 'setControlValues',
                      control: 'instrumentalness',
                      target,
                    })
                  }}
                />
                <Button big onClick={getRecs}>
                  ✨ Generate Recommendations ✨
                </Button>
              </div>
            )}
          </>
        )}

        {processing && (
          <div>
            <BigLoader />
            <p className="text-xl text-gray-700 text-center">
              {selectRandom([
                'Analyzing the tunes...',
                'Finding your next favorite song...',
                'Playing some music...',
              ])}
            </p>
          </div>
        )}

        {results && (
          <div className="w-full flex flex-col gap-8 items-center">
            <Heading>🎧 The Results are In! 🎹</Heading>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setResults(null)
                  setPreview(null)
                }}
              >
                <FaArrowLeft className="mr-1" /> <span>Adjust Settings</span>
              </Button>
              <Button
                onClick={() => {
                  setResults(null)
                  setPreview(null)
                  getRecs()
                }}
              >
                <span>Refresh List</span> <FaRedo className="ml-1" />
              </Button>
            </div>
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
