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
- React Router
- Bilingual support (RO / RU)

## Project Structure

```
JKAM/
├── backend/
│   ├── src/
│   │   ├── db/          # Database and schema
│   │   ├── middleware/  # JWT authorization
│   │   └── routes/      # API routes
│   ├── data/            # SQLite file (not in git)
│   ├── uploads/         # Uploaded images (not in git)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  # UI components
    │   ├── pages/       # Pages + admin panel
    │   ├── api/         # HTTP client
    │   ├── context/     # React Context
    │   ├── hooks/       # Custom hooks
    │   └── i18n/        # Translations
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

Available at `/admin`. Allows managing:
- News
- Events
- Gallery
- Instructors
- Contact requests

## Database

The SQLite database is created automatically on first run at `backend/data/jka.db`.

Tables: `news`, `events`, `contacts`, `admins`, `gallery`, `instructors`

To reset and re-seed data:

```bash
cd backend
npm run seed
```
