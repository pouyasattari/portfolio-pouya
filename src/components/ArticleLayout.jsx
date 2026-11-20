import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Github, Linkedin, Mail } from 'lucide-react'

import { Container } from '@/components/Container'
import { formatDate } from '@/lib/formatDate'
import { Prose } from '@/components/Prose'
import { DATA } from '@/data/resume'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  let router = useRouter()

  if (isRssFeed) {
    return children
  }

  return (
    <>
      <Head>
        <title>{`${meta.title} - Pouya Sattari`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-0">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full border bg-card shadow ring-2 ring-border/20 transition lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-muted-foreground transition group-hover:stroke-foreground" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  {meta.title}
                </h1>
                <time
                  dateTime={meta.date}
                  className="order-first flex items-center text-sm text-muted-foreground"
                >
                  <span className="h-4 w-0.5 rounded-full bg-border" />
                  <span className="ml-3">{formatDate(meta.date)}</span>
                </time>
              </header>
              <Prose className="mt-8">{children}</Prose>
              <footer className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/academic-projects"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  <ArrowLeftIcon className="h-4 w-4 stroke-current transition group-hover:-translate-x-0.5" />
                  Back to projects
                </Link>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <a
                    href={`mailto:${DATA.contact.email}`}
                    className="inline-flex items-center gap-1.5 transition hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                  <a
                    href={DATA.contact.social.LinkedIn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition hover:text-foreground"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href={DATA.contact.social.GitHub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition hover:text-foreground"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
