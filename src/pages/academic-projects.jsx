import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import { BookOpen } from 'lucide-react' // Import BookOpen icon for fallback
import Link from 'next/link'
import clsx from 'clsx'

// Import specific icons from react-icons
import {
  SiOpenai,
  SiNeo4J, // Corrected casing
  SiHuggingface,
  SiNvidia,
} from 'react-icons/si'
import { IoLogoTableau, IoBarChart } from 'react-icons/io5'
import { MdBusiness, MdCode, MdTimeline } from 'react-icons/md'
import { FaRProject, FaMicrosoft } from 'react-icons/fa' // Added FaMicrosoft
import { PiGraphFill } from 'react-icons/pi' // Added PiGraphFill

import { Card } from '@/components/Card'
import ContactSection from '@/components/section/contact-section'
import BlurFade from '@/components/magicui/blur-fade'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllProjectsContent } from '@/lib/getAllProjectsContent'
import { projectData as rawProjectData } from '@/lib/projectData' // Import projectData from the new utility file

const BLUR_FADE_DELAY = 0.04

// Map iconComponent strings back to actual React components
const iconComponentsMap = {
  SiOpenai,
  SiTableau: IoLogoTableau,
  SiNeo4J, // Corrected casing
  SiHuggingface,
  SiPowerBI: IoBarChart,
  SiNvidia,
  MdBusiness,
  MdCode,
  MdTimeline,
  FaRProject,
  FaMicrosoft,
  PiGraphFill,
};

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ProjectsIndex({ mdxProjectsMeta }) {
  const [activeFilter, setActiveFilter] = useState('All')

  // Combine the static project data with the MDX metadata
  const combinedProjects = rawProjectData.map(project => {
    const fetchedMeta = mdxProjectsMeta.find(p => p.slug === project.slug);
    return { 
      ...project, 
      ...fetchedMeta,
      iconComponent: iconComponentsMap[project.iconComponent] || BookOpen // Map string to component
    };
  });

  const filterCategories = ['All', 'Data Analysis', 'Data science & AI', 'Software Development']

  const filteredProjects = combinedProjects.filter((project) => {
    if (activeFilter === 'All') {
      return true
    }
    return project.category === activeFilter
  })

  return (
    <>
      <Head>
        <title>Projects - Pouya Sattari</title>
        <meta
          name="description"
          content="Things I’ve made during my Master's studies"
        />
      </Head>
      <SimpleLayout
        title="Things I’ve made during my Master's studies"
        intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
      >
        {/* Filter buttons */}
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            {filterCategories.map((category) => (
              <span
                key={category}
                onClick={() => setActiveFilter(category)}
                className={clsx(
                  'cursor-pointer transition-colors duration-200',
                  activeFilter === category
                    ? 'text-foreground'
                    : 'hover:text-foreground'
                )}
              >
                {category}
              </span>
            ))}
          </div>
        </BlurFade>

        <ul
          key={activeFilter}
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, id) => (
            <li key={project.slug} className="list-none">
              <BlurFade delay={BLUR_FADE_DELAY * 4 + id * 0.05} className="h-full">
                <Card as="div" className="h-full">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-card shadow ring-2 ring-border/20">
                    {project.iconComponent ? (
                      <project.iconComponent className="h-8 w-8 text-muted-foreground" />
                    ) : project.logo ? (
                      <Image
                        src={project.logo}
                        alt=""
                        className="h-8 w-8"
                        unoptimized
                      />
                    ) : (
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <h2 className="mt-6 text-base font-semibold text-foreground">
                    <Card.Link href={`/projects-content/${project.slug}`}>{project.title}</Card.Link>
                  </h2>
                  <Card.Description>{project.description}</Card.Description>
                  {/*
                  {project.externalLink && (
                    <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                      <LinkIcon className="h-6 w-6 flex-none" />
                      <Link href={project.externalLink.href} target="_blank" rel="noopener noreferrer" className="ml-2">
                        {project.externalLink.label}
                      </Link>
                    </p>
                  )}
                  */}
                </Card>
              </BlurFade>
            </li>
          ))}
        </ul>
        <div className="mt-20">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <ContactSection />
          </BlurFade>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const mdxProjectsMeta = (await getAllProjectsContent()).map(({ component, ...meta }) => meta);

  return {
    props: {
      mdxProjectsMeta,
    },
  }
}
