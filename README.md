# The Party Partner

A static kids’ birthday party planning website. The intake form validates the details and shows a summary in the browser. Entries are held only on the open page and are lost on reload.

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Run `npm run build` to generate the site in `dist/`. Run `npm run preview` to check the production build locally.

## Vercel

Import the Git repository in Vercel and select the repository root as the project root. The Vite framework, build command, and output directory are set in `vercel.json`. Select Node.js 24 for the project. The site requires no environment variables.
