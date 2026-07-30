# Internship Tracker — Tech Requirements & Information Architecture

## 1. Tech Stack (MERN, kept light)

### Frontend
| Tech | Used for |
|---|---|
| React.js | Core UI, pages, components |
| Tailwind CSS (or custom CSS matching your neo-brutalism system) | Styling |
| Axios | API calls to Express backend |
| react-hot-toast | Toast notifications |
| react-router-dom | Routing between screens |
| Context API (skip Redux/Zustand unless state gets genuinely complex) | Auth state, current user |
| recharts *(optional, later)* | Status breakdown chart on dashboard |

> Note: your neo-brutalism design doc mentions Bootstrap, but you were originally planning Tailwind. Doesn't matter much — neo-brutalism is mostly custom CSS variables and utility classes either way, so pick whichever you're faster in and stay consistent across the team.

### Backend
| Tech | Used for |
|---|---|
| Node.js + Express | REST API |
| MongoDB + Mongoose | Database + schema validation |
| Nodemon | Dev auto-restart |
| JWT (jsonwebtoken) | Auth tokens |
| bcrypt | Password hashing |
| cors | Frontend-backend communication |
| dotenv | Env variables |
| multer + Cloudinary (or just Cloudinary direct upload) | Resume file upload for Profile |
| cheerio + axios | Extracting title/company/deadline from a pasted internship link (static pages only) |

### Deployment
| Piece | Where |
|---|---|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway |
| Database | MongoDB Atlas |
| Resume/file storage | Cloudinary (free tier) |

---

## 2. Core Entities (light data model — no schema code, just what needs to exist)

- **User** — auth info, name, email
- **Profile** — linked to User: resume (file URL), portfolio links (Behance, Dribbble, LinkedIn, personal site), bio/summary
- **Internship** — linked to User: company, role, JD text, source link, status (applied / screening / interview / rejected / selected), applied date, deadline
- **Resource** — linked to an Internship: type (link / note / question), content, title
- **PrepItem** — linked to an Internship: a mock interview question + your notes/answer

Keeping Resource and PrepItem as separate small collections (rather than cramming everything into one array on Internship) makes the workspace screen much easier to build — you can just fetch/add/delete resources independently instead of rewriting a giant internship document every time someone adds a note.

**In practice, this means:**
```js
Internship: { _id: "123", company: "Google", role: "SWE Intern", status: "interview" }

Resource:   { _id: "r1", internshipId: "123", title: "System design notes", link: "..." }
Resource:   { _id: "r2", internshipId: "123", title: "Interviewer's LinkedIn", link: "..." }

PrepItem:   { _id: "p1", internshipId: "123", question: "Tell me about a time...", myAnswer: "..." }
```
Each Resource/PrepItem just stores an `internshipId` pointing back to its parent. Adding one is a simple `POST` with that ID attached — no need to fetch and rewrite the whole Internship document. API routes stay clean too: `/resources/:id` and `/prepitems/:id`, rather than nested paths like `/internships/:id/resources/:resourceId`.

---

## 3. Information Architecture

```
Login / Register
      |
      v
   Dashboard  (search bar, status filter tabs, list/kanban of all internships)
      |
      |-- Internship Workspace  (click any card)
      |       |-- Overview tab: JD, dates, status dropdown
      |       |-- Resources tab: links/notes to study
      |       |-- Prep Q&A tab: mock interview questions + your notes
      |
      |-- Add Internship  (paste link → auto-extract, or manual form + JD paste)
      |
      |-- Profile  (resume, portfolio links, bio)
```

Dashboard is the hub — everything else is one click away from it and one click back.

---

## 4. App Flow (user journey)

1. **Auth** — login/register, redirected to Dashboard on success
2. **Dashboard** — sees all internships as cards/rows, grouped or filterable by status (Applied / Screening / Interview / Rejected / Selected). Search bar filters by company/role.
3. **Add an internship** — via nav button, two paths:
   - Paste a link → backend fetches the page → extracts title/company/deadline where possible → pre-fills a form → user confirms/edits → saves
   - Manual entry → user fills company, role, JD, deadline directly
4. **New card appears** in the dashboard list under "Applied" (or whatever status is set)
5. **Click a card** → opens the Internship Workspace (separate route, e.g. `/internship/:id`)
   - Update status as it moves through the pipeline
   - Add resources (a study link, a note about the interviewer, a doc)
   - Add prep questions and their answers/notes as the user researches
6. **Visit Profile** — add/update resume file, portfolio links, short bio — this is what they'd eventually share or reference when applying
7. **Logout**

---

## 5. Build order suggestion (given 4 people, mixed skill levels)

1. Auth + User/Profile schema first — everything else depends on a logged-in user existing
2. Dashboard + basic Internship CRUD (manual add only) — get the core loop working end to end
3. Internship Workspace (Resources + Prep Q&A) — this is the differentiator, worth dedicated time
4. Paste-link auto-extract — treat as a stretch feature layered on top of manual add, not a blocker
5. Polish pass — toasts, empty states, loading states, neo-brutalist styling consistency
