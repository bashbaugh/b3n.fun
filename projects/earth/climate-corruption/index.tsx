import BasicLayout from 'components/BasicLayout'
import { useViewportScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import CO2ProducersGrid from './sections/CO2ProducersGrid'
import LobbyingGraph from './sections/LobbyingGraph'
import SmokeEffect from './components/SmokeEffect'
import TheLies from './sections/TheLies'
import SectionHeading from './components/SectionHeading'
import Meta from 'components/Meta'

export default function FFCorruption() {
  const { scrollY } = useViewportScroll()

  const [percentageAboveFoldScrolled, _setAFS] = useState(0)

  useEffect(() => {
    scrollY.onChange((val) => {
      _setAFS(Math.min(1, scrollY.get() / window.innerHeight))
    })
    _setAFS(Math.min(1, scrollY.get() / window.innerHeight))
  }, [])

  const aboveFoldScrollCssVal = percentageAboveFoldScrolled * 3 * 255

  return (
    <div
      className="w-full relative"
      style={{
        background: `rgba(0, 0, 0, ${percentageAboveFoldScrolled * 1})`,
        color: `rgba(${aboveFoldScrollCssVal}, ${aboveFoldScrollCssVal}, ${aboveFoldScrollCssVal})`,
      }}
    >
      <Meta title='Climate Corruption' description="Exploring how fossil fuel companies have maintained support from investors and politicians and controlled the public narrative about climate change for decades." />
      <SmokeEffect />
      <BasicLayout title="Climate Corruption" series="Earth">
        <div className="story w-full py-16 gap-12 min-h-screen justify-center -mt-10">
          {/* <Heading>Corruption in the Fossil Fuels Industry</Heading> */}
          <h1 className="text-red-600 text-[4rem] md:text-[7rem] font-broken-glass">
            Climate Corruption
          </h1>
          <p className="font-bold">
            In recent years, fossil fuels have been the source more than 70% of
            US human-caused greenhouse gas emissions
          </p>
          <p>
            Yet, the majority of the fossil fuels industry is not willing to
            shift towards decarbonization.
          </p>
          <p className="">
            But how do they manage to attract so much investment and political
            support when all the evidence shows that they won&apos;t be
            sustainable for much longer?
          </p>
        </div>
        <div className="story w-full py-16 gap-16 min-h-screen justify-center -mt-10">
          {/* <Heading>Corruption in the Fossil Fuels Industry</Heading> */}
          <div>
            <CO2ProducersGrid />
          </div>
          <SectionHeading
            title={'Lies'}
            subtitle={'How have fossil fuel companies tricked investors?'}
            className="text-red-600 -rotate-6"
          />
          <div>
            <TheLies />
          </div>

          <SectionHeading
            title={'Money'}
            subtitle={'How do fossil fuel companies influence politics?'}
            className="text-[#889b73] rotate-3"
          />
          <div>
            <LobbyingGraph />
          </div>
        </div>
      </BasicLayout>
    </div>
  )
}

// Sources
// https://www.eia.gov/energyexplained/energy-and-the-environment/where-greenhouse-gases-come-from.php
// https://www.whistleblowers.org/stop-corruption-in-fossil-fuels/
