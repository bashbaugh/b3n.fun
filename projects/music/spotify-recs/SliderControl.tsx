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

// interface TrackProps {
//   source: SliderItem
//   target: SliderItem
//   getTrackProps: GetTrackProps
//   disabled?: boolean
// }

// export const Track: React.FC<TrackProps> = ({
//   source,
//   target,
//   getTrackProps,
//   disabled = false,
// }) => {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         transform: 'translate(0%, -50%)',
//         height: 14,
//         zIndex: 1,
//         backgroundColor: disabled ? '#999' : '#607E9E',
//         borderRadius: 7,
//         cursor: 'pointer',
//         left: `${source.percent}%`,
//         width: `${target.percent - source.percent}%`,
//       }}
//       {...getTrackProps()}
//     />
//   )
// }

interface HandleProps {
  domain: number[]
  handle: SliderItem
  getHandleProps: GetHandleProps
  disabled?: boolean
}

export const SliderControl: React.FC<{
  text: string
  description: string
  active: boolean
  onCheck: (checked: boolean) => void
  value: number
  onChange: (val: number) => void
}> = ({ text, active, value, onCheck, onChange, description }) => (
  <div className="flex flex-col w-80">
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
        <p className="my-4 text-gray-700 text-sm">{description}</p>
        <Slider
          mode={1}
          step={0.05}
          domain={[0, 1]}
          onChange={(vals) => onChange(vals[0])}
          values={[value]}
          className="pt-5 relative"
        >
          <Rail>
            {({ getRailProps }) => (
              <div
                {...getRailProps()}
                className="absolute w-full h-1 bg-gray-600 -translate-y-1/2"
              />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div>
                {handles.map((handle) => (
                  <div
                    {...getHandleProps(handle.id)}
                    key={handle.id}
                    role="slider"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={handle.percent}
                    className="cursor-pointer absolute bg-music-spotify -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
                    style={{
                      left: `${handle.percent}%`,
                    }}
                  />
                ))}
              </div>
            )}
          </Handles>
        </Slider>
      </div>
    )}
  </div>
)
