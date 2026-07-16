import { useState } from 'react'

interface FlagProps {
  code: string
  emoji: string
  className?: string
  /** Fill the parent as background artwork (object-cover). */
  fill?: boolean
}

/**
 * Country flag artwork from flagcdn. Falls back to the emoji flag if the
 * image fails to load (e.g. fully offline before it was ever cached).
 */
export function Flag({ code, emoji, className = '', fill = false }: FlagProps) {
  const [failed, setFailed] = useState(false)

  if (!code || failed) {
    return (
      <span
        className={`grid place-items-center ${fill ? 'h-full w-full text-5xl' : 'text-xl'} ${className}`}
        aria-hidden
      >
        {emoji}
      </span>
    )
  }

  return (
    <img
      src={`https://flagcdn.com/w320/${code}.png`}
      srcSet={`https://flagcdn.com/w320/${code}.png 1x, https://flagcdn.com/w640/${code}.png 2x`}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${fill ? 'h-full w-full object-cover' : ''} ${className}`}
    />
  )
}
