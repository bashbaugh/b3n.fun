import NImage from 'next/image'
import clsx from 'clsx'

const Image: React.FC<{
  src: string | StaticImageData
  alt: string
  className?: string
  attribution?: string
}> = ({ src, alt, className, attribution }) => (
  // Why do we need this flex???
  <div className="flex">
    <div className="max-w-xl w-full">
      <NImage
        src={src}
        alt={alt}
        layout="intrinsic"
        className={clsx('rounded-md', className)}
        title={attribution}
      />
      {/* <span className='text-xs text-gray-400'>{attribution}</span> */}
    </div>
  </div>
)

export default Image
