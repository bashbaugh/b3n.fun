import clsx from 'clsx'
import Link from 'components/Link'

const BasicLayout: React.FC<{
  title: string
  series?: string
  fullWidth?: boolean
  className?: string
}> = ({ children, series, title, fullWidth, className }) => {
  return (
    <div className={clsx("w-full", className)}>
      <nav className="w-full border-b-1 border-gray-200 py-2 px-4 md:px-16 text-gray-600">
        <Link href="/">b3n.fun</Link>
        {series && (
          <>
            <span className="mx-2 text-xl">|</span>
            <Link href={`/#${series.toLowerCase().replace(/ /g, '-')}`}>
              {series}
            </Link>
          </>
        )}
        <span className="mx-2 text-xl">|</span>
        <span className="font-bold">{title}</span>
      </nav>
      <main
        className={clsx(
          'mx-auto min-h-[90vh]',
          !fullWidth && 'max-w-6xl px-4 md:px-16'
        )}
      >
        {children}
      </main>
      <nav className="w-full border-t-1 border-gray-200 bg-gray-100 py-4 px-4 text-gray-600 text-center">
        <span>
          made by{' '}
          <Link colored external href="https://benjaminashbaugh.me">
            benjamin ashbaugh
          </Link>
        </span>
        {` • `}
        <span>
          <Link colored external href={'mailto:hi' + '@' + 'b3n.fun'}>
            contact
          </Link>
        </span>
        {` • `}
        <span>
          <Link colored href="/">
            more
          </Link>
        </span>
      </nav>
    </div>
  )
}

export default BasicLayout
