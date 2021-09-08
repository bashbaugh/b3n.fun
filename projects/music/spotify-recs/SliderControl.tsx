import clsx from 'clsx'
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

export const SliderControl: React.FC<{
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
