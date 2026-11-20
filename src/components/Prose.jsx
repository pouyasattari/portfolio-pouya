import clsx from 'clsx'

export function Prose({ children, className }) {
  return (
    <div
      className={clsx(
        className,
        'prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert'
      )}
    >
      {children}
    </div>
  )
}
