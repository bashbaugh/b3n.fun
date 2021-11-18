import CO2ProducerCompanies, { source } from '../../data/ff-companies'
import Image from 'next/image'
import { useLayer, useHover, Arrow } from 'react-laag'
import { motion, AnimatePresence } from 'framer-motion'
import { cloneElement } from 'react'

const CompanyPopover: React.FC<{ company: typeof CO2ProducerCompanies[0] }> = ({
  children,
  company,
}) => {
  const [isOver, hoverProps] = useHover({ delayEnter: 50, delayLeave: 50 })

  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen: isOver,
    placement: 'right-center',
    auto: true,
    triggerOffset: 8,
  })

  const trigger = cloneElement(children as any, {
    ...triggerProps,
    ...hoverProps,
  })

  return (
    <>
      {trigger}
      {renderLayer(
        <AnimatePresence>
          {isOver && (
            <motion.div
              className="tooltip-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              {...layerProps}
            >
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <h3 className="text-lg font-bold">{company.name}</h3>
                <p>
                  {company.country} &bull;{' '}
                  {company.ownership === 'state'
                    ? 'Majority state-owned'
                    : 'Investor-owned'}
                </p>
              </div>
              <Arrow
                {...arrowProps}
                // backgroundColor={BG_COLOR}
                // borderColor={BORDER_COLOR}
                borderWidth={1}
                size={6}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}

const CO2ProducersGrid = ({}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center" id="companies">
      <p className="font-bold text-lg">
        Over a third of all carbon and methane emissions can be traced back to
        just ~20 companies.
      </p>

      <div className="my-5 grid grid-cols-5 grid-rows-4 gap-8">
        {CO2ProducerCompanies.map((p) => (
          <CompanyPopover company={p} key={p.id}>
            <div className="bg-white p-1 shadow-lg rounded-lg hover:-translate-y-1 transition-all cursor-pointer">
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
          </CompanyPopover>
        ))}
      </div>

      <p className="text-left text-xs">
        {source.title} - source: {source.source}
      </p>
    </div>
  )
}

export default CO2ProducersGrid
