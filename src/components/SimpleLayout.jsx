import BlurFade from '@/components/magicui/blur-fade'
import { Container } from '@/components/Container'

const BLUR_FADE_DELAY = 0.04

export function SimpleLayout({ title, intro, children }) {
  return (
    <Container className="mt-0">
      <header className="max-w-2xl">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="mt-6 text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
            {intro}
          </p>
        </BlurFade>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  )
}
