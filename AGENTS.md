# AGENTS.md

Instructions for AI coding agents (and humans) working on a fresh clone of this repo.

## First run: replace the original owner's personal content

This repo is Pouya Sattari's personal portfolio. All personal content in it belongs to him. When someone clones it to build **their own** site, the first job is to remove his content and replace it with the new owner's content, or with clear placeholders if they don't have it yet.

**Before anything else, ask the new owner** for their name, short bio, links and which sections they want to keep. Do not publish or deploy while any of the original owner's content is still there.

### Checklist

**Profile and resume data**
- [ ] `src/data/resume.tsx`: replace everything in `DATA`: name, initials, url, location, description, summary, avatar, skills, contact email, social links, `work`, `education`, `publications`, `writings`, `projects`, `hackathons`, `workshops`, `volunteering`, `digitalResources`. Empty the arrays for sections the new owner doesn't need.

**Site titles and metadata**
- [ ] `src/app/layout.tsx`: `browserTitle` and any metadata
- [ ] `src/components/ArticleLayout.jsx`: `<title>` suffix
- [ ] `src/pages/academic-projects.jsx`: `<title>`
- [ ] `src/components/json-ld.tsx`, `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`: check for the old name, domain or structured data
- [ ] `src/components/ui/anchor-heading.tsx`: example URL in the comment
- [ ] `public/llms.txt`, `public/llms-full.txt`: rewrite for the new owner, or delete

**Projects and writings**
- [ ] `src/pages/projects-content/*.mdx`: these are the original owner's project articles. Delete them, or replace them with the new owner's own
- [ ] `src/lib/projectData.js`: project list (it links to the MDX pages above and labels them `sattari.org`)

**User manual** (`/user-manual`)
- [ ] `src/data/user-manual.ts` and `src/data/user-manual-translations.ts`: this describes how the original owner likes to work. Rewrite it for the new owner, or remove the page and its navbar link (`src/components/navbar.tsx`). Keep the license notice in `public/licenses/` if any of the original text remains

**Images and files**
- [ ] `public/me.jpg`: profile photo
- [ ] `public/uploads/**`: images used by project articles
- [ ] `public/writings/*`: writing cover images
- [ ] `public/logos/*` and the company, university and event images in `public/` (`*.jpeg`, `*.png`, `*.webp`): logos and photos tied to the original owner's experience
- [ ] `public/favicon.ico`: replace with the new owner's icon
- [ ] Keep `public/fonts/*` and `public/licenses/*`

**Analytics and deployment**
- [ ] Analytics is Vercel Analytics (cookie-free), tied to your own Vercel project. No IDs to change
- [ ] Use your own domain; replace every `sattari.org` reference

**Final check**
- [ ] Search the whole repo (case-insensitive) for `sattari`, `pouya`, `peter` and the old employers and universities. Nothing should remain except the credit lines below
- [ ] `npm run build` passes
- [ ] Update `README.md` to describe the new owner's site

### Keep these credits

- `LICENSE`: keep Dillion Verma's copyright line (MIT requires it). You may add your own line below it.
- README credits to the original template ([dillionverma/portfolio](https://github.com/dillionverma/portfolio)). A short "based on" credit for this repo is appreciated too.

## Project notes

- Next.js App Router (`src/app`) plus a few Pages Router pages (`src/pages`) for MDX projects
- Run locally: `npm install && npm run dev`
- Language URLs on the user manual: English is `/user-manual`, others use `?lang=<code>` (codes in `manualLanguages`)
