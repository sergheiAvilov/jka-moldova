# JKA Moldova — Official Website

Official website of the JKA Moldova National Karate Federation.

## Tech Stack

**Backend**
- Node.js + Express
- SQLite (better-sqlite3)
- JWT authentication
- Multer (image uploads)

**Frontend**
- React 18 + Vite
- React Router v6
- Trilingual support (RO / RU / EN)
- Dark / Light theme switching
- CSS Modules

## Project Structure

```
JKAM/
├── backend/
│   ├── src/
│   │   ├── db/          # Database schema and seed
│   │   ├── middleware/  # JWT authorization
│   │   └── routes/      # API routes
│   ├── data/            # SQLite file (not in git)
│   ├── uploads/         # Uploaded images (not in git)
│   └── package.json
└── frontend/
    ├── public/
    │   └── flag-md.png  # Moldova flag image (add manually)
    ├── src/
    │   ├── components/
    │   │   ├── Header/      # Header with theme-aware logo
    │   │   ├── Footer/      # Footer
    │   │   └── Logo/
    │   │       └── JKALogo.jsx  # SVG logo component (no external file)
    │   ├── pages/
    │   │   ├── admin/       # Admin panel (News, Events, Gallery, Instructors, Contacts)
    │   │   ├── AboutPage
    │   │   ├── SchedulePage
    │   │   ├── ClubsPage
    │   │   └── CampsPage
    │   ├── api/             # HTTP client
    │   ├── context/
    │   │   ├── LangContext  # Language (ro/ru/en)
    │   │   └── ThemeContext # Dark/light theme
    │   ├── hooks/
    │   │   ├── useT         # Translation hook
    │   │   └── useLang      # Language hook
    │   └── i18n/
    │       └── translations.js  # All UI strings (RO/RU/EN, incl. admin panel)
    └── package.json
```

## Setup & Running

### 1. Clone the repository

```bash
git clone <repo-url>
cd JKAM
```

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Seed the database (creates admin user and sample data):

```bash
npm run seed
```

Start the server:

```bash
# Development
npm run dev

# Production
npm start
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on **http://localhost:3000**, backend on **http://localhost:5000**

### 4. Moldova flag image

The logo component references `/flag-md.png`. Place the flag image at:

```
frontend/public/flag-md.png
```

## API

All routes are available at base URL `http://localhost:5000`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/news` | List news |
| GET | `/api/events` | List events |
| GET | `/api/gallery` | Gallery |
| GET | `/api/instructors` | Instructors |
| POST | `/api/contacts` | Contact form |
| POST | `/api/upload` | Upload image |
| GET | `/api/health` | Server status |

## Admin Panel

Available at `/admin`. Login with credentials from `.env`.

Manages:
- News
- Events
- Gallery
- Instructors
- Contact requests

The admin panel interface is fully trilingual (RO / RU / EN) with a language switcher in the sidebar.

## Multilingual System

Translations live in `frontend/src/i18n/translations.js`.

```js
// In any component:
const t = useT();
const { lang, changeLang } = useLang();

t.nav.about        // navigation
t.home.hero.title  // page content
t.admin.news.title // admin panel
```

Supported languages: **RO** (default) · **RU** · **EN**

## Theme System

The site supports dark and light themes via `ThemeContext`.

```js
const { theme, toggle } = useTheme(); // 'dark' | 'light'
```

CSS variables are defined in `src/styles/variables.css` with `[data-theme="light"]` overrides.
The footer always stays dark in both themes.

## Logo Component

The logo is a pure SVG React component — no external image file required.

```jsx
import JKALogo from './components/Logo/JKALogo';

// On dark background (white text):
<JKALogo dark className={styles.logoImg} />

// On light background (dark text):
<JKALogo className={styles.logoImg} />

// Theme-aware (Header):
<JKALogo dark={theme === 'dark'} className={styles.logoImg} />
```

## Database

The SQLite database is created automatically on first run at `backend/data/jka.db`.

Tables: `news`, `events`, `contacts`, `admins`, `gallery`, `instructors`

To reset and re-seed data:

```bash
cd backend
npm run seed
```
