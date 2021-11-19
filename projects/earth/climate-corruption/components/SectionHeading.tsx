import clsx from 'clsx'
import { tickStep } from 'd3'

const SectionHeading = ({ title, subtitle, className = '' }) => {
  return (
    <div
      className="min-h-screen p-8 flex flex-col justify-center text-center"
      id={title.toLowerCase()}
    >
      <div className="">
        <a href={'#' + title.toLowerCase()}>
          <h2 className={clsx('text-[15rem] font-before-collapse', className)}>
            {title}
          </h2>
        </a>
      </div>
      <p className="">{subtitle}</p>
    </div>
  )
}

export default SectionHeading
