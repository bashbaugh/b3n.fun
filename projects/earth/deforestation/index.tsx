import clsx from 'clsx'
import BasicLayout from 'components/BasicLayout'
import { useEffect, useState } from 'react'
import { FaRegArrowAltCircleDown } from 'react-icons/fa'
import { GiStopwatch } from 'react-icons/gi'
import InView, { useInView } from 'react-intersection-observer'
import { useSpring } from 'react-spring'

// Sections:
// Rate of deforestation
// Before/after (history of deforestation)
// Consequences & Importance

function StatsGrid() {
  const [startTime] = useState(new Date().getTime())
  const [timePassed, setTimePassed] = useState<number>(0)

  useEffect(() => {
    const i = setInterval(() => {
      setTimePassed(new Date().getTime() - startTime)
    }, 50)

    return () => {
      clearInterval(i)
    }
  }, [])

  return (
    <div>
      <div className="inline-block text-center sticky top-2 bg-bg-brown rounded-lg p-4  border-1 border-gray-200">
        It has been{' '}
        <span className="inline-block w-12 font-bold">
          {Math.floor(timePassed / 1000) / 1}
        </span>{' '}
        seconds.
      </div>
      <div className="my-12 max-w-6xl grid md:grid-cols-2 font-mono gap-16">
        {/* <div className="p-4 flex flex-col gap-2 rounded-xl bg-green-100">
        <div className="text-6xl font-bold">{Math.floor(timePassed / 1000 * 60)}</div>
        <div className='text-xl'>Trees planted</div>
      </div> */}
        <div className="p-4 flex flex-col gap-2 rounded-xl">
          <div className="text-6xl font-bold">
            {Math.floor((timePassed / 1000) * 29).toLocaleString()}
          </div>
          <div className="text-xl">Trees cut down</div>
          <span className="text-xs text-gray-600">
            globally, since you opened this page
          </span>
        </div>
        <div className="p-4 flex flex-col gap-2 rounded-xl">
          <div className="text-6xl font-bold">
            {Math.floor(timePassed / 1000 / 6)}
          </div>
          <div className="text-xl">
            Football-field sized areas of forest destroyed
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="text-7xl font-bold text-yellow-500 animate-pulse">
            46%
          </div>
          <div className="text-xl">Of Earth&apos;s forests destroyed</div>
          <span className="text-xs text-gray-600">
            in the last 12,000 years
          </span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="text-7xl font-bold text-yellow-500 animate-pulse">
            53%
          </div>
          <div className="text-xl">
            Of Earth&apos;s forest animal population gone
          </div>
          <span className="text-xs text-gray-600">since 1970</span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="mx-auto text-5xl font-bold flex gap-2 mb-4 text-red-500">
            <GiStopwatch />
            {Math.floor(
              ((new Date(2100, 0).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24 * 365)) *
                10000000
            ) / 10000000}
          </div>
          <div className="text-xl">Years until there is no rainforest left</div>
          <span className="text-xs text-gray-600">
            at our current rate of deforestation
          </span>
        </div>
        <div className="p-4 flex flex-col gap-2 rounded-xl">
          <div className="text-6xl font-bold text-red-900">
            {Math.floor((timePassed / 1000) * 0.93)}
          </div>
          <div className="text-xl">Acres of animal habitat destroyed</div>
          <span className="text-xs text-gray-600">
            due to deforestation since you opened this page
          </span>
        </div>
        <div className="p-4 flex flex-col gap-2 rounded-xl">
          <div className="text-6xl font-bold text-yellow-700">
            {Math.floor(
              ((timePassed / 1000) * 15000000000) / 365 / 24 / 60 / 60
            ).toLocaleString()}{' '}
            Tonnes
          </div>
          <div className="text-xl">Of CO2 released from fallen trees</div>
          <span className="text-xs text-gray-600">
            due to deforestation since you opened this page
          </span>
        </div>
        <div className="p-4 flex flex-col gap-2 rounded-xl">
          <div className="text-6xl font-bold text-yellow-700">
            {(Math.floor((timePassed / 1000) * 29) * 48).toLocaleString()} Lbs
          </div>
          <div className="text-xl">Less CO2 absorbed over the next year</div>
          <span className="text-xs text-gray-600">
            as a result of trees killed since you opened this page
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Deforestation() {
  return (
    <div className="w-full bg-bg-brown">
      <BasicLayout fullWidth title="Deforestation" series="Earth">
        <div className="story w-full py-16 gap-16">
          {/* <Heading>Deforestation</Heading> */}
          <StatsGrid />
        </div>
        <hr className="border-gray-400 w-3/4 mx-auto" />
        <div className="story gap-16 my-16 max-w-4xl mx-auto">
          {/* <p>
            <strong>Enormous sections of forest are destroyed each day.</strong>
          </p>
          <p>
            But forests are <i>extremely</i> important for the survival of
            people, animals, and our planet.
          </p> */}
          <div className="w-full p-8 bg-green-700 text-white rounded-xl">
            <div className="inline-block mx-auto">
              <h3 className="text-2xl font-bold mb-6">Forests:</h3>
              <ul className="">
                <li className="flex items-center">
                  Are home to{' '}
                  <span className="rounded-lg p-1 bg-white text-green-700 text-2xl font-bold mx-3">
                    80%
                  </span>{' '}
                  of the world&apos;s terrestrial biodiversity
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-8 bg-red-700 text-white rounded-xl">
            <div className="inline-block mx-auto">
              <h3 className="text-2xl font-bold mb-6">
                If We Don&apos;t Protect Them:
              </h3>
              <ul className="">
                <li className="flex items-center">
                  We&apos;ll lose
                  <span className="rounded-lg p-1 bg-white text-yellow-600 text-xl font-bold mx-3">
                    ~28,000 species
                  </span>{' '}
                  forever, in the next&nbsp;<strong>25 years</strong>.
                </li>
              </ul>
            </div>
          </div>
          <p></p>
        </div>
      </BasicLayout>
    </div>
  )
}

// Sources
// https://blog.tentree.com/fact-check-are-there-really-more-trees-today-than-100-years-ago/
// https://onetreeplanted.org/pages/tree-facts
// https://sites.psu.edu/rcl2jacobsciosciaissues/2016/02/19/deforestation/
// https://wwf.panda.org/discover/our_focus/forests_practice/importance_forests/?
// https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/when-will-the-rainforests-be-gone/story
// https://www.conservation.org/stories/11-deforestation-facts-you-need-to-know
