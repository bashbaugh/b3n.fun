import clsx from 'clsx'
import Meta from 'components/Meta'
import type { NextPage } from 'next'
import Link from 'next/link'

interface Project {
  name: string
  image: string
  slug: string
}

const Project: React.FC<{ name: string; image: string; href: string }> = ({
  name,
  image,
  href,
}) => {
  return (
    <Link href={href}>
      <a>
        <div
          className={clsx(
            'relative group overflow-hidden w-72 h-44 rounded-lg flex items-center justify-center text-center bg-black',
            'transition-all hover:w-80 bg-opacity-30 hover:bg-opacity-10 p-2'
          )}
        >
          <div
            className="absolute w-full h-full bg-cover bg-center z-[-1]"
            style={{
              backgroundImage: `url("/img/${image}")`,
            }}
          />
          <h3 className="text-2xl font-medium text-white">{name}</h3>
        </div>
      </a>
    </Link>
  )
}

const Series: React.FC<{
  id: string
  name: string
  projects: Project[]
  className: string
}> = ({ name, projects, id, className }) => {
  return (
    <div id={id} className="py-4">
      <Meta />
      <div
        className={clsx(
          'w-full border-2 p-4 rounded-md overflow-x-auto',
          className
        )}
      >
        <div className={clsx('absolute mt-[-30px] bg-white px-2', className)}>
          {name}
        </div>
        <div className="flex gap-4">
          {projects.map((p) => (
            <Project
              key={p.name}
              name={p.name}
              image={p.image}
              href={`/${p.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <div className="inline-block p-4 text-gray-600 text-lg">b3n.fun</div>
      <div className="w-full p-4 md:px-32 md:py-16 flex flex-col gap-8 items-center">
        <p className="text-center text-lg text-gray-500">
          ✌🏼 Interactive stories, visualizations and other creations made with
          💖 by{' '}
          <a
            href="https://benjaminashbaugh.me"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-700"
          >
            Benjamin Ashbaugh
          </a>
        </p>
        {/* <p className="p-5 rounded-lg border text-center text-lg font-bold text-gray-600">
          ⌚️ Coming soon
        </p> */}
        <Series
          name="Climate & Earth"
          id="earth"
          projects={[
            {
              name: 'CO2 Emissions',
              image: 'co2_emission.jpeg',
              slug: 'co2-emissions',
            },
            {
              name: 'Climate Corruption',
              image: 'money_burning.jpeg',
              slug: 'climate-corruption',
            },
            {
              name: 'Deforestation',
              image: 'deforestation.jpeg',
              slug: 'deforestation',
            },
          ]}
          className="border-yellow-600 text-yellow-600"
        />
        {/* <Series
          name="Computers & Technology"
          id="computers"
          projects={[
            {
              name: 'How do collaborative text editing applications work?',
              image: 'yarn_network.jpeg',
              slug: 'co2-emissions',
            },
          ]}
          className="border-green-600 text-green-600"
        /> */}
        <Series
          name="Fun"
          id="fun"
          projects={[
            {
              name: '🎵 Rain',
              image: 'rain.jpeg',
              slug: 'rain',
            },
            {
              name: 'Lifetime',
              image: 'hourglass.jpeg',
              slug: 'lifetime',
            },
            {
              name: 'Spotify Recommendations',
              image: 'headphones.jpeg',
              slug: 'spotify-recommendations',
            },
          ]}
          className="border-blue-600 text-blue-600"
        />
        <p className="p-5 rounded-lg border text-center text-sm font-bold text-gray-500">
          More coming soon 😌
        </p>
        <p className="text-gray-500 text-sm"></p>
      </div>
    </>
  )
}

export default Home
