import clsx from 'clsx'
import NLink from 'next/link'

const Link: React.FC<{
  href: string
  className?: string
  colored?: boolean
  external?: boolean
}> = ({ href, children, colored, external, ...aProps }) => {
  return (
    <NLink href={href}>
      <a
        className={clsx(colored && 'text-site-primary')}
        {...aProps}
        target={external && '_blank'}
        rel={external && 'noopener noreferrer'}
      >
        {children}
      </a>
    </NLink>
  )
}

export default Link
