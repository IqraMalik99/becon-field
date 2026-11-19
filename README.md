# Making Tech Awesome

A responsive React website for Making Tech Awesome, covering IT support, web and
software development, mobile apps, AI automation, CRM and lead generation, and
cybersecurity and maintenance.

## Run locally

```bash
npm install
npm run db:up   # start MongoDB in Docker (or use your own MongoDB)
npm run dev
```

Vite prints the local URL. The dev server also serves the contact API, so form
submissions are saved to MongoDB and emailed as soon as `.env` is configured
(see below). Open the admin panel at `/admin`.

## Build and check

```bash
npm run lint
npm run build
npm start
```

`npm run preview` still works for previewing the built static files, but it does
**not** run the contact API — use `npm start` to test real saving and email.

## Contact and consultation form

The "Get a Free Consultation" buttons open an accessible popup form instead of
navigating away from the page. The same shared form also appears on the Contact
section of the homepage.

When a valid request is submitted, the browser `POST`s it as JSON to
`/api/contact`. A small Node server sends it to your inbox with **Nodemailer**
over SMTP. The visitor's own email address is used as the reply-to, so replying
in your inbox answers the visitor directly. The email address is never shown on
the site.

### 1. Configure email (one-time)

Copy `.env.example` to `.env` and fill it in. For Gmail:

1. Turn on 2-Step Verification for the account.
2. Create an App Password at <https://myaccount.google.com/apppasswords>.
3. Put the 16-character password in `SMTP_PASS`.

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=im4356927@gmail.com
SMTP_PASS=your-16-character-app-password
CONTACT_TO=im4356927@gmail.com
```

`.env` is git-ignored. Never commit real credentials.

### 2. Run it

```bash
npm install
npm run dev
```

During development the Vite dev server handles `POST /api/contact` itself, so a
single command is enough.

For a production-style run, build the site and start the Node server, which
serves `dist/` and the API together:

```bash
npm run build
npm start
```

`npm start` reads `.env` automatically (`--env-file-if-exists`). Deploy the site
to any host that can run Node (Render, Railway, Fly.io, a VPS, etc.) and set the
same `SMTP_*` variables there.

### How the request is delivered

The server sends a plain-text and HTML email with this content:

```json
{
  "name": "Visitor name",
  "email": "visitor@example.com",
  "phone": "Optional phone number",
  "service": "Selected service",
  "date": "YYYY-MM-DD or empty",
  "time": "Selected time or empty",
  "details": "Optional project details"
}
```

A hidden honeypot field (`website`) silently drops bot submissions. No API keys
or secrets are ever sent to the browser.

## Admin panel

Every valid request is also saved to **MongoDB**, so nothing is lost if email is
down. A simple password-protected admin panel lists the leads and lets you review
them.

- URL: `/admin` (for example <http://localhost:5174/admin>)
- Password: `ADMIN_PASSWORD` in `.env` (defaults to `stricklyadmin987`)

Features:

- Pending / Reviewed / All filters with live counts.
- Mark a lead as reviewed, or move it back to pending.
- Reply (opens your mail app to the visitor) and Delete.
- Session lasts 12 hours; **Sign out** clears it.

### Database setup

Leads are stored in the `leads` collection of the `becon_field` database.

The quickest local option is Docker:

```bash
npm run db:up     # starts MongoDB on localhost:27017
npm run db:down   # stops it
```

> If Docker Hub is slow or the `mongo:7` pull stalls, grab it from Google's
> mirror instead: `docker pull mirror.gcr.io/library/mongo:7` then
> `docker tag mirror.gcr.io/library/mongo:7 mongo:7`.

Or point `MONGODB_URI` at any MongoDB — a local install or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster:

```bash
MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net
MONGODB_DB=becon_field
```

If MongoDB is unreachable, the contact form still sends the email and the admin
panel shows a clear "cannot reach the database" message.

### Admin API

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/login` | Exchange the password for a session token |
| `POST` | `/api/admin/logout` | End the session |
| `GET` | `/api/admin/leads?status=pending` | List leads + counts |
| `PATCH` | `/api/admin/leads/:id` | Set `status` (`pending` / `reviewed`) |
| `DELETE` | `/api/admin/leads/:id` | Delete a lead |

Admin requests send `Authorization: Bearer <token>`.

> Change `ADMIN_PASSWORD` before deploying anywhere public, and serve the site
> over HTTPS so the password and token are encrypted in transit.

## Project structure

- `server/` — the backend: `contact.js` (validation, MongoDB save, Nodemailer
  email), `db.js` (MongoDB), `auth.js` (admin sessions), `api.js` (shared route
  handler), `viteContactPlugin.js` (dev middleware), and `index.js` (production
  server that serves `dist/` and the API).
- `src/pages/` — page-level routes: home and the admin panel.
- `src/components/` — shared navigation, footer, page hero, CTA, FAQ, reveal,
  consultation form/modal, and illustration components. Homepage sections live in
  `src/components/home/`.
- `src/context/` — the global consultation modal state and provider.
- `src/lib/consultation.js` — validation, payload creation, and API submission helpers.
- `src/data/categories/` — the six service categories and all 44 service entries.
  Each service has a summary, description, benefits, and included work.
- `src/data/site.js` — navigation, business problems, process, differentiators,
  technologies, and FAQs.
- `src/styles/` — design tokens and layout. `base.css` holds the blue, cream, and
  orange colour tokens; `layout.css`, `home.css`, `pages.css`, `modal.css`, and
  `responsive.css` cover the respective surfaces.

## Content and deployment notes

- The recipient inbox is set with `CONTACT_TO` in `.env` (defaults to
  `im4356927@gmail.com`). The address is never rendered on the site.
- Set `ADMIN_PASSWORD` to something private before going live, and deploy to a
  Node host with access to your MongoDB.
- Service content is intentionally centralised in the category modules so the
  services overview and detail pages stay in sync.
- The portfolio section describes solution blueprints rather than inventing client
  names or results. Testimonials are only published with permission, and the site
  avoids fabricated statistics, logos, and claims.
- When deploying to a static host, configure a fallback to `index.html` for
  client-side routes such as `/services/ai-automation/ai-chatbot-development`.
- `public/robots.txt` allows crawling. Add a sitemap once the production domain is
  known.
