# Adding a project

All projects live in **one file**: [`src/app/data/projects.ts`](src/app/data/projects.ts).

## 1. Copy an entry and edit it

```ts
{
  title: 'My New App',                         // must be unique
  tagline: 'One short line',
  description: 'Two or three sentences about what it does and your role.',
  category: 'web',                             // 'mobile' | 'web' | 'fullstack'
  stack: ['Angular', 'NestJS', 'PostgreSQL'],  // the first 4 show on the card
  highlights: ['Something impressive', 'A measurable result'],
  links: {                                     // all optional, but include at least one
    website: 'https://…',
    appStore: 'https://…',
    playStore: 'https://…',
    github: 'https://…',
  },
  accent: '#5ab0ff',                           // card glow colour
  featured: true,                              // optional: pins it to the top with a badge
},
```

Put it anywhere in the `PROJECTS` array. Featured projects are sorted to the top automatically.

## 2. Check it locally

```bash
npm start          # opens http://localhost:4200
npm test           # checks every project has a title, a description, a stack and a link
```

## 3. Publish it

```bash
git add -A && git commit -m "Add My New App" && git push
```

Vercel redeploys automatically from GitHub within about a minute.

---

To change your bio, experience, skills or contact details, edit [`src/app/data/profile.ts`](src/app/data/profile.ts) the same way.
