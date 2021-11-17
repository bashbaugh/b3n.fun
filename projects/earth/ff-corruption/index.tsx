import BasicLayout from 'components/BasicLayout'
import { useViewportScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import CO2ProducersGrid from './components/CO2ProducersGrid'
import SmokeEffect from './components/SmokeEffect'

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
      style={
        {
          background: `rgba(0, 0, 0, ${percentageAboveFoldScrolled * 1})`,
          color: `rgba(${aboveFoldScrollCssVal}, ${aboveFoldScrollCssVal}, ${aboveFoldScrollCssVal})`,
        }
      }
    >
      <SmokeEffect />
      <BasicLayout title="Climate Corruption" series="Earth">
        <div className="story w-full py-16 gap-12 min-h-screen justify-center -mt-10">
          {/* <Heading>Corruption in the Fossil Fuels Industry</Heading> */}
          <h1 className='text-red-600 text-[4rem] md:text-[7rem] font-broken-glass'>Climate Corruption</h1>
          <p className="font-bold">
            In recent years, fossil fuels have been the source more than 70% of
            US human-caused greenhouse gas emissions
          </p>
          <p>
            Yet, for clear reasons, the majority of the fossil fuels industry is
            not willing to shift towards decarbonization.
          </p>
          <p>
            But how do they manage to attract so much investment and political
            support while raising relatively little public pushback?
          </p>
        </div>
        <div className="story w-full py-16 gap-16 min-h-screen justify-center -mt-10">
          {/* <Heading>Corruption in the Fossil Fuels Industry</Heading> */}
          <div>
            <p className="font-bold text-lg">
              Over a third of all carbon and methane emissions can be traced
              back to just ~20 companies.
            </p>
            <CO2ProducersGrid />
          </div>
        </div>
      </BasicLayout>
    </div>
  )
}

// Sources
// https://www.eia.gov/energyexplained/energy-and-the-environment/where-greenhouse-gases-come-from.php
// https://www.whistleblowers.org/stop-corruption-in-fossil-fuels/
