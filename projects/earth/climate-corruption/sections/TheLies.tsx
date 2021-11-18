import headlines from 'projects/earth/data/climate_deception'

const TheLies = ({}) => {
  return (
    <div className='my-10'>
      {headlines.map((h) => (
        <a key={h.title} href={h.url} rel="noreferrer" target={'_blank'}>
          <div className="p-2 m-6 rounded-lg bg-red-900 text-left w-1/2 hover:scale-105 transition-all -rotate-1">
            <div className="opacity-75 font-bold">{h.summary} &bull; {h.date}</div>
            <h4 className="text-3xl my-3">&quot;{h.title}&quot;</h4>
            <div className="text-sm pl-1 border-l-2 border-yellow-600">
              &quot;{h.quote}&quot;
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default TheLies
