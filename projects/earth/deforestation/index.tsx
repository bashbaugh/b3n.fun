import clsx from 'clsx'
import BasicLayout from 'components/BasicLayout'
import Heading from 'components/Heading'
import Image from 'components/Image'
import { useEffect, useState } from 'react'
import { FaRegArrowAltCircleDown } from 'react-icons/fa'
import { GiStopwatch } from 'react-icons/gi'

// Sections:
// Brief history
// Rate of deforestation
// Before/after
// Consequences

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
      <div className="my-12 max-w-6xl grid grid-cols-2 font-mono gap-16">
        {/* <div className="p-4 flex flex-col gap-2 rounded-xl bg-green-100">
        <div className="text-6xl font-bold">{Math.floor(timePassed / 1000 * 60)}</div>
        <div className='text-xl'>Trees planted</div>
      </div> */}
        <div className="p-4 flex flex-col gap-2 rounded-xl">
          <div className="text-6xl font-bold">
            {Math.floor((timePassed / 1000) * 29)}
          </div>
          <div className="text-xl">Trees cut down</div>
          <span className="text-xs text-gray-600">globally</span>
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
          <div className="text-[5rem] font-bold animate-vibrate-slow text-yellow-500 animate-pulse">
            46%
          </div>
          <div className="text-xl">Of Earth&apos;s forests destroyed</div>
          <span className="text-xs text-gray-600">
            in the last 12,000 years
          </span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="mx-auto text-5xl font-bold flex gap-2 mb-4 text-red-500">
            <GiStopwatch />
            {Math.floor(
              ((new Date(2100, 0).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24 * 365)) *
                100000000
            ) / 100000000}
          </div>
          <div className="text-xl">Years until there is no rainforest left</div>
          <span className="text-xs text-gray-600">
            at our current rate of deforestation
          </span>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default function Deforestation() {
  return (
    <BasicLayout fullWidth title="Deforestation" series="Earth" className='bg-bg-brown'>
      <div className="story w-full py-16 gap-16">
        {/* <Heading>Deforestation</Heading> */}
        <StatsGrid />
      </div>
      <hr className='border-gray-400 w-3/4 mx-auto' />
      <div className="story gap-16 my-16 max-w-4xl mx-auto">
        <p>
          <strong>Enormous sections of forest are destroyed each day.</strong>
        </p>
        <p>
          But forests are <i>extremely</i> important for the survival of people,
          animals, and our planet.
        </p>
        <div className="w-full p-8 bg-green-700 text-white rounded-xl">
          <div className="inline-block mx-auto">
          <h3 className='text-2xl font-bold mb-6'>Forests:</h3>
            <ul className="">
              <li className='flex items-center'>Are home to <span className='rounded-lg p-1 bg-white text-green-700 text-2xl font-bold mx-3'>80%</span> of the world&apos;s terrestrial biodiversity</li>
            </ul>
          </div>
        </div>
        <div className="w-full p-8 bg-red-700 text-white rounded-xl">
          <div className="inline-block mx-auto">
            <h3 className='text-2xl font-bold mb-6'>If We Don&apos;t Protect Them:</h3>
            <ul className="">
              <li className='flex items-center'>We&apos;ll lose<span className='rounded-lg p-1 bg-white text-yellow-600 text-xl font-bold mx-3'>~28,000 species</span> forever, in the next&nbsp;<strong>25 years</strong>.</li>
            </ul>
          </div>
        </div>
        <p></p>
      </div>
    </BasicLayout>
  )
}

// Sources
// https://www.pnas.org/content/117/32/19122
// https://www.epa.gov/ghgemissions/global-greenhouse-gas-emissions-data
// https://www.climatewatchdata.org/ghg-emissions (CAIT)
// https://www.sciencedirect.com/science/article/pii/S1674927818300376

// https://www.theworldcounts.com/challenges/climate-change/global-warming/global-co2-emissions/story
// https://www.climateneutralgroup.com/en/news/what-exactly-is-1-tonne-of-co2/
