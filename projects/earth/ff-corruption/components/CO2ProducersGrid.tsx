import CO2ProducerCompanies, { source } from '../../data/ff-companies'
import Image from 'next/image'

const CO2ProducersGrid = ({}) => {
  return (
    <div>
      <div className="my-5 grid grid-cols-5 grid-rows-4 gap-8">
        {CO2ProducerCompanies.map((p) => (
          <div
            key={p.name}
            className="bg-white p-1 shadow-lg rounded-lg hover:-translate-y-1 transition-all cursor-pointer"
          >
            <Image
              // sizes='200px'
              title={p.name}
              src={p.image}
              alt={p.name}
              width={200}
              height={100}
              objectFit="contain"
              objectPosition="center"
              className=""
            />
          </div>
        ))}
      </div>

      <p className="text-left text-xs">
        {source.title} - source: {source.source}
      </p>
    </div>
  )
}

export default CO2ProducersGrid
