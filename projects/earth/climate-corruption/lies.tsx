import TheLies from './sections/TheLies'
import Layout from './components/Layout'

export default function Lies() {
  return (
    <Layout
      title={'The Lies'}
      pageTitle={'Deception'}
      pageSubtitle={''}
      activeTab={'lies'}
      navClass="bg-red-700"
    >
      {/* <SmokeEffect /> */}
      <div className="story w-full py-16 gap-16 min-h-screen justify-center -mt-10">
        {/* <SectionHeading
          title={'Lies'}
          subtitle='How do fossil fuel companies influence politics?'
          className="text-red-600 rotate-3"
        /> */}
        <div>
          <TheLies />
        </div>
      </div>
    </Layout>
  )
}

// Sources
// https://www.eia.gov/energyexplained/energy-and-the-environment/where-greenhouse-gases-come-from.php
// https://www.whistleblowers.org/stop-corruption-in-fossil-fuels/
