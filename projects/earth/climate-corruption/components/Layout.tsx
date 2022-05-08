import clsx from 'clsx'
import Link from 'components/Link'
import Meta from 'components/Meta'
import { active } from 'd3'
import { useViewportScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

const NavButton = ({ activeTab = '', thisTab, href, children }) => (
  <Link
    href={`/climate-corruption/${href}`}
    className={clsx(
      'p-4 transition-all',
      activeTab === thisTab
        ? 'bg-white bg-opacity-10 font-bold'
        : 'hover:bg-white hover:bg-opacity-10'
    )}
  >
    {children}
  </Link>
)

const Layout = ({
  children,
  activeTab = '',
  title = '',
  navClass = 'bg-blue-800',
  pageTitle,
  pageSubtitle,
}) => {
  const { scrollY } = useViewportScroll()

  const [percentageAboveFoldScrolled, _setAFS] = useState(activeTab ? 1 : 0)

  console.log(activeTab, percentageAboveFoldScrolled)

  useEffect(() => {
    if (!activeTab) {
      scrollY.onChange((val) => {
        _setAFS(Math.min(1, scrollY.get() / window.innerHeight))
      })
      _setAFS(Math.min(1, scrollY.get() / window.innerHeight))
    }
  }, [])

  const aboveFoldScrollCssVal = percentageAboveFoldScrolled * 3 * 255

  return (
    <div
      className=""
      style={{
        background: `rgba(0, 0, 0, ${percentageAboveFoldScrolled * 1})`,
        color: `rgba(${aboveFoldScrollCssVal}, ${aboveFoldScrollCssVal}, ${aboveFoldScrollCssVal})`,
      }}
    >
      <Meta
        title={title ? `${title} | Climate Corruption` : 'Climate Corruption'}
        description="Exploring how fossil fuel companies have maintained support from investors and politicians and shaped the public narrative about climate change for decades."
      />
      <div>
        <nav
          className={clsx(
            'w-full px-4 absolute top-0 left-0 text-white',
            navClass
          )}
        >
          <div className="sticky top-0 z-40 flex items-center">
            <div className="opacity-50 hover:-skew-x-6">
              <Link href="/">b3n.fun</Link>
            </div>

            <Link href="/climate-corruption" className={clsx('font-bold px-4')}>
              Climate Corruption
            </Link>

            <NavButton href={'lies'} thisTab={'lies'} activeTab={activeTab}>
              The Lies
            </NavButton>
            <NavButton href={'money'} thisTab={'money'} activeTab={activeTab}>
              The Money
            </NavButton>
          </div>
        </nav>

        {pageTitle && (
          <div className={clsx(navClass, 'p-8 text-center')}>
            <h1 className="text-[10rem] font-before-collapse m-0">
              {pageTitle}
            </h1>
            <p className="my-3 text-lg">{pageSubtitle}</p>
          </div>
        )}

        <main className={clsx('mx-auto min-h-[90vh] max-w-6xl px-4 md:px-16')}>
          {children}
        </main>

        <footer className={clsx('w-full p-2 text-white text-center', navClass)}>
          <p>
            🌎 Made by <a href="https://benjaminashbaugh.me/">Benjamin</a>{' '}
            Ashbaugh &bull;{' '}
            <Link href="/#earth" className="underline">
              More climate-related projects{' '}
            </Link>{' '}
            🌍
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Layout
