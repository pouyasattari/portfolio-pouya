import glob from 'fast-glob'
import * as path from 'path'

async function importProject(projectFilename) {
  let { meta, default: component } = await import(
    `../pages/projects-content/${projectFilename}`
  )
  return {
    slug: projectFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllProjectsContent() {
  let projectFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/projects-content'),
  })

  let projects = await Promise.all(projectFilenames.map(importProject))

  // Projects might not have a date, so we can sort by title or keep original order
  return projects.sort((a, z) => a.title.localeCompare(z.title))
}