import clsx from 'clsx'

const Heading: React.FC<{
  as?: string
  className?: string
  small?: boolean
}> = ({ as: asComp = 'h2', className, children }) => {
  const Component: any = asComp
  return (
    <Component className={clsx('text-4xl font-bold', className)}>
      {children}
    </Component>
  )
}

export default Heading
