import clsx from 'clsx'
import headlines from 'projects/earth/data/climate_deception'

function HeadlineCard({ h, right }) {
  return (
    <a href={h.url} rel="noreferrer" target={'_blank'}>
      <div
        className={clsx(
          'p-2 m-6 rounded-lg bg-red-900 text-left w-1/2 hover:scale-105 transition-all',
          right ? 'rotate-1 ml-auto' : '-rotate-1'
        )}
      >
        <div className="opacity-75 font-bold">
          {h.summary} &bull; {h.date}
        </div>
        <h4 className="text-3xl my-3">&quot;{h.title}&quot;</h4>
        <div className="text-sm pl-1 border-l-2 border-yellow-600">
          &quot;{h.quote}&quot;
        </div>
      </div>
    </a>
  )
}

const TheLies = ({}) => {
  return (
    <div className="my-10">
      {/* <div className='flex'>
        
      </div> */}
      <div>
        {headlines.map((h, i) => (
          <HeadlineCard key={h.title} h={h} right={i % 2} />
        ))}
      </div>
    </div>
  )
}

export default TheLies
