import clsx from 'clsx'
import BasicLayout from 'components/BasicLayout'
import Heading from 'components/Heading'
import Image from 'components/Image'

import tonImage from '../assets/thetonbomb.jpeg'

// https://www.climateneutralgroup.com/en/news/what-exactly-is-1-tonne-of-co2/

const DotGrid = ({ num, className = null }) => {
  const dots = new Array(num).fill(null)

  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${Math.ceil(
          Math.sqrt(num)
        )}, minmax(0, 1fr))`,
      }}
    >
      {dots.map((_, i) => (
        <div key={i} className={clsx('w-1 h-1 rounded-full', className)} />
      ))}
    </div>
  )
}

export default function HowMuchCO2() {
  return (
    <BasicLayout title="Scale of Global CO2 Emissions" series="Climate">
      <div className="story w-full flex flex-col items-center py-16 gap-16">
        {/* <Heading>How Much?</Heading> */}
        {/* TODO note about ton vs tonne */}
        <p>This is one ton of CO2 (slightly less than a metric tonne).</p>
        <div className="flex gap-4">
          <Image src={tonImage} alt="A ton of CO2" />
        </div>
        {/* Provide examples of a tonne */}
        <p>We&apos;ll represent that tonne with one blue dot.</p>
        <DotGrid num={1} className="bg-blue-600 w-4 h-4" />
        <p>
          Every year, the US generates approximately 16 tonnes of CO2 per capita
          {/* (TODO per person not per capita) */}
        </p>
        <DotGrid num={16} className="bg-blue-600 w-4 h-4" />
        <p>One thousand tonnes looks like this:</p>
        <DotGrid num={1000} className="bg-blue-600" />
        <p>This is 10,000:</p>
        <DotGrid num={10000} className="bg-blue-600" />
        <p>
          We&apos;ll represent that with an orange dot; otherwise the next part
          wouldn&apos;t fit on your screen.
        </p>
        <DotGrid num={1} className="bg-yellow-600 w-4 h-4" />
        <p>Thus, a million tonnes of CO2 is:</p>
        <DotGrid num={100} className="bg-yellow-600" />
        <p>
          The US <i>alone</i> generates approximately 13.7 <i>million</i> tonnes
          of CO2 <strong>per day</strong>:{/* TODO show daily progress   */}
        </p>
        <DotGrid num={100 * 13.7} className="bg-yellow-600" />
        <p className="!text-[3rem] font-bold">x 365 days =</p>
        <div className="text-center">
          <div className="!text-[2rem] font-bold text-yellow-500">
            ~4,980,000,000 tonnes
          </div>
          <p>of man-made CO2 released per year (2018) by the US alone.</p>
        </div>
        <p>
          China generates over twice that much... 10.31 billion tons in 2018
        </p>
        <p>
          <strong>
            Globally, we generated 35.2 billion tons of greenhouse gases in
            2018.
          </strong>
        </p>
        <hr className="text-gray-300 w-3/4" />
        aa
        {/* trees can capture this much, but we are cutting down trees */}
      </div>
    </BasicLayout>
  )
}

// Sources
// https://www.pnas.org/content/117/32/19122
// https://www.climatewatchdata.org/ghg-emissions (CAIT)
// https://www.sciencedirect.com/science/article/pii/S1674927818300376
