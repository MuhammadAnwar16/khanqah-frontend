# Khanqah Yaseen Zai (Khanqah Site)

This repository contains:

- **Frontend**: React + Vite + Tailwind (bilingual Urdu/English UI)
- **Backend**: Django + Django REST Framework (media, publications, photos, contact)

## Requirements

- Node.js (for frontend)
- Python 3.10+ (recommended) (for backend)
- PostgreSQL (for backend DB)

## Frontend (React/Vite)

From the repo root:

```bash
npm install
npm run dev
```

### Frontend Environment

Copy `env.example` to your local Vite env file (for example `.env.local`) and edit as needed:

```
VITE_API_BASE_URL=http://localhost:8000
```

## Backend (Django)

From the repo root:

```bash
cd khanqah-backend
python -m venv .venv
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt  # (if present) otherwise install deps listed in settings/apps
python manage.py migrate
python manage.py runserver
```

### Backend Environment

Create `khanqah-backend/.env` (see `khanqah-backend/env.example`) and set:

- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`
- Postgres: `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT`
- Email (contact form): `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`

## Documentation

For detailed documentation, see:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment guide
- **[DEPLOYMENT_CHECKLIST.md](../DEPLOYMENT_CHECKLIST.md)** - Production deployment checklist
- **[UTILITIES_GUIDE.md](./UTILITIES_GUIDE.md)** - Frontend utilities and components guide
- **[PROJECT_ANALYSIS.md](../PROJECT_ANALYSIS.md)** - Complete project analysis
- **[IMPROVEMENTS_COMPLETED.md](../IMPROVEMENTS_COMPLETED.md)** - List of improvements made

## Notes

- The frontend expects the backend to serve media files (images/pdfs/audio) via `MEDIA_URL`.
- For production, you should restrict CORS and configure proper static/media hosting.
- Check `DEPLOYMENT_CHECKLIST.md` before deploying to production.
