import BasicLayout from 'components/BasicLayout'
import { useViewportScroll } from 'framer-motion'
import { useEffect, useState } from 'react'


export default function FFCorruption() {
  const { scrollY } = useViewportScroll()

  const [percentageAboveFoldScrolled, _setAFS] = useState(0)

  useEffect(() => scrollY.onChange(val => {
    _setAFS(Math.min(1, scrollY.get() / window.innerHeight))
  }), [])

  const aboveFoldScrollCssVal = (percentageAboveFoldScrolled * 3) * 255

  return (
    <div className="w-full" style={{
      background: `rgba(0, 0, 0, ${percentageAboveFoldScrolled * 2})`,
      color: `rgba(${aboveFoldScrollCssVal}, ${aboveFoldScrollCssVal}, ${aboveFoldScrollCssVal})`
    }}>
      <BasicLayout fullWidth title="Fossil Fuel Fraud" series="Earth">
        <div className="story w-full py-16 gap-16 min-h-screen justify-center -mt-10">
          {/* <Heading>Corruption in the Fossil Fuels Industry</Heading> */}
          <p className='font-bold'>In recent years, fossil fuels have been the source more than 70% of US human-caused greenhouse gas emissions</p>
          <p>Yet, for clear reasons, the majority of the fossil fuels industry is not willing to shift towards decarbonization.</p>
          <p>But how do they manage to attract so much investment and political support while raising relatively little public pushback?</p>
        </div>
        <div className="story w-full py-16 gap-16 min-h-screen justify-center -mt-10">
          {/* <Heading>Corruption in the Fossil Fuels Industry</Heading> */}
          <p className='font-bold'>Over a third of all carbon emissions can be traced back to just 20 companies.</p>

        </div>
      </BasicLayout>
    </div>
  )
}

// Sources
// https://www.eia.gov/energyexplained/energy-and-the-environment/where-greenhouse-gases-come-from.php
// https://www.whistleblowers.org/stop-corruption-in-fossil-fuels/
