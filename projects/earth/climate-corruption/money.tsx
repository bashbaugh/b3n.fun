import Layout from './components/Layout'
import LobbyingGraph from './sections/LobbyingGraph'

export default function Money() {
  return (
    <Layout
      title={'The Money'}
      pageTitle={'Money'}
      pageSubtitle={''}
      activeTab={'money'}
      navClass="bg-[#85bb65]"
    >
      {/* <SmokeEffect /> */}
      <div className="story w-full py-16 gap-16 min-h-screen justify-center -mt-10">
        {/* <SectionHeading
          title={'Lies'}
          subtitle='How do fossil fuel companies influence politics?'
          className="text-red-600 rotate-3"
        /> */}
        <div>
          <LobbyingGraph />
        </div>
      </div>
    </Layout>
  )
}

// Sources
// https://www.eia.gov/energyexplained/energy-and-the-environment/where-greenhouse-gases-come-from.php
// https://www.whistleblowers.org/stop-corruption-in-fossil-fuels/
