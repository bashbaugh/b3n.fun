import BasicLayout from 'components/BasicLayout'
import { useViewportScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import CO2ProducersGrid from './sections/CO2ProducersGrid'
import LobbyingGraph from './sections/LobbyingGraph'
import SmokeEffect from './components/SmokeEffect'
import TheLies from './sections/TheLies'
import SectionHeading from './components/SectionHeading'
import Meta from 'components/Meta'
import Layout from './components/Layout'

export default function FFCorruption() {
  return (
    <Layout>
      <SmokeEffect />
      <div className="story w-full py-16 gap-12 min-h-screen justify-center -mt-10">
        {/* <Heading>Corruption in the Fossil Fuels Industry</Heading> */}
        <h1 className="text-red-600 text-[4rem] md:text-[7rem] font-broken-glass">
          Climate Corruption
        </h1>
        <p className="font-bold">
          In recent years, fossil fuels have been the source more than 70% of US
          human-caused greenhouse gas emissions
        </p>
        <p>
          Yet, the majority of the fossil fuels industry is not willing to shift
          towards decarbonization.
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
        <p className="font-bold"></p>
      </div>
    </Layout>
  )
}

// Sources
// https://www.eia.gov/energyexplained/energy-and-the-environment/where-greenhouse-gases-come-from.php
// https://www.whistleblowers.org/stop-corruption-in-fossil-fuels/
