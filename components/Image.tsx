import NImage from 'next/image'
import clsx from 'clsx'

const Image: React.FC<{
  src: string | StaticImageData
  alt: string
  className?: string
}> = ({ src, alt, className }) => (
  <div className={clsx('w-[500px] overflow-hidden rounded-md', className)}>
    <NImage src={src} alt={alt} layout="responsive" />
  </div>
)

export default Image
