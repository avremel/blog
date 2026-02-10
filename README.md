# avikaminetzky.dev

Personal blog built with Next.js + MDX.

## Scripts

- `npm run dev`: Start local development server.
- `npm run build`: Validate post metadata and build production assets.
- `npm run start`: Serve the production build.
- `npm run validate:posts`: Validate MDX frontmatter against the post schema.
- `npm run new:post -- "Your Post Title"`: Scaffold a new MDX post with valid frontmatter.

## Post Workflow

### 1) Create a new post

```bash
npm run new:post -- "Your Post Title"
```

This creates `pages/posts/<slug>.mdx` with frontmatter + a default MDX layout wrapper.

### 2) Fill in frontmatter

Each post must include:

- `title`
- `description`
- `date` (display label, for example `Feb 2026`)
- `publishedAt` (ISO date: `YYYY-MM-DD`)
- `slug` (must match the filename)
- `ogImage` (optional)

### 3) Build safely

`npm run build` runs schema validation first. Validation enforces:

- strict frontmatter schema (via `zod`)
- slug filename sync
- unique slugs across posts

## Why this is manageable

- The homepage post list is generated from frontmatter (`utils/posts.mjs`) instead of hardcoded links.
- Blog JSON-LD schema is generated from the same metadata used to render posts.
- New posts can be added with one command and validated automatically in builds.
