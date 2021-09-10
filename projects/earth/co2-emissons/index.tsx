import clsx from 'clsx'
import BasicLayout from 'components/BasicLayout'
import Image from 'components/Image'
import dynamic from 'next/dynamic'

import tonImage from '../assets/thetonbomb.jpeg'
import swimmingPool from '../assets/olympic_swimming_pool.jpeg'

const AnimatedDotGrid = dynamic(() => import('./AnimatedDotGrid'), {
  ssr: false
})

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
      {/* {dots.map((_, i) => (
        <div key={i} className={clsx('w-1 h-1 rounded-full', className)} />
      ))} */}
    </div>
  )
}

export default function HowMuchCO2() {
  return (
    <BasicLayout title="Scale of Global CO2 Emissions" series="Earth">
      <div className="story w-full py-16 gap-16">
        {/* <Heading>How Much?</Heading> */}
        {/* TODO note about ton vs tonne */}
        <p>This is one ton of CO2 (slightly less than a metric tonne).</p>
        <Image src={tonImage} alt="A ton of CO2" />
        {/* Provide examples of a tonne */}
        <p>We&apos;ll represent a tonne (slightly more than a ton) of CO2 with one blue dot.</p>
        <DotGrid num={1} className="bg-blue-600 w-4 h-4" />
        <p>
          Every year, the US generates approximately 16 tonnes of CO2 per capita
          {/* (TODO per person not per capita) */}
        </p>
        <DotGrid num={16} className="bg-blue-600 w-4 h-4" />
        <p>One thousand tonnes looks like this:</p>
        {/* <DotGrid num={1000} className="bg-blue-600" /> */}
        <AnimatedDotGrid num={1000} fill='blue' />
        <p>
          We&apos;ll represent one thousand tonnes with an orange dot:
        </p>
        <DotGrid num={1} className="bg-yellow-600 w-4 h-4" />
        <p>Thus, a million tonnes of CO2 is:</p>
        <DotGrid num={1000} className="bg-yellow-600" />
        <p>
          The US <i>alone</i> generates approximately 13.7 <i>million</i> tonnes
          of CO2 <strong>per day</strong>:{/* TODO show daily progress   */}
        </p>
        <AnimatedDotGrid num={1000 * 13.7} fill='orange' />
        <p className="!text-[3rem] font-bold">x 365 days =</p>
        <div className="text-center">
          <div className="!text-[2rem] font-bold text-yellow-500">
            ~4,980,000,000 tonnes
          </div>
          <p>of CO2 released per year (2018) by the US alone.</p>
        </div>
        <p>
          China - the top emitter - generates over twice that much... 10.31 billion tonnes in 2018
        </p>
        <p>
          <strong>
            Ang, globally, we generated 35.2 billion tonnes of CO2 in 2018.
          </strong>
          <div className="text-sm text-center">
            Keep in mind that CO2 is <i>far</i> from being the only greenhouse
            gas.
          </div>
        </p>
        <div className="text-center text-base">
          <p>At 15&deg;c, that much CO2 would fill</p>
          <div className="!text-[3rem] font-bold text-red-500 my-3">
            <span className='animate-pulse'>7,529,984,000</span>
          </div>
          <p>olympic swimming pools</p>
        </div>
        <Image
          src={swimmingPool}
          alt="Olympic swimming pool"
          attribution="Buda Mendes / Getty Images"
        />
        <p>
          <i>
            That&apos;s enough water to blanket the entire US with over a foot
          </i>
          .
        </p>
        <hr className="border-gray-500 w-3/4" />
        <p>
          Studies have shown that natural CO2 sinks - like trees - absorb
          roughly the same amount of CO2 as that which is naturally generated
          each year.
        </p>
        <p>
          That doesn&apos;t mean they can absorb an extra 7.5 billion swimming
          pools full of it each year, as evidenced by the average global
          temperature, which has sharply increased over the past several
          decades.
        </p>
        <div className="w-full">chart</div>
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
