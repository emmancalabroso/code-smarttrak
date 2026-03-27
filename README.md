# SmartTrak

Simple starter application for SmartTrak using:

- Next.js + React + Tailwind CSS for the frontend
- Django + Python for the backend

## Frontend

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

You can also still run it from inside `frontend/` with `npm run dev`.

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

Open `http://localhost:8000/api/hello/`.

The backend will use PostgreSQL when `POSTGRES_DB` and related environment
variables are set. Otherwise it falls back to SQLite for quick local startup.

## Deployment

Deploy this repo as two Vercel projects:

- `frontend` as a Next.js project
- `backend` as a Python project

### Neon + backend

1. Create a Neon database.
2. Connect Neon to Vercel or copy the pooled `DATABASE_URL`.
3. Create a Vercel project with `backend` as the root directory.
4. Add these environment variables:

```bash
SECRET_KEY=your-long-random-secret
DEBUG=False
ALLOWED_HOSTS=your-backend-domain.vercel.app
CSRF_TRUSTED_ORIGINS=https://your-frontend-domain.vercel.app,https://your-backend-domain.vercel.app
DATABASE_URL=postgresql://...
SECURE_SSL_REDIRECT=True
```

The backend includes:

- env-driven Django settings
- Neon-friendly `DATABASE_URL` support
- WhiteNoise static file serving
- `backend/api/index.py` as the Vercel WSGI entrypoint
- `backend/vercel.json` to route all requests through Django

### Frontend

1. Create a second Vercel project for the Next.js app.
2. Preferred: set the Vercel root directory to `frontend`.
3. If the Vercel project is pointed at the repo root instead, this repo now includes a root workspace `package.json` so `npm install` and `npm run build` still resolve to the frontend app.
4. Add:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app
```

5. Deploy the project.
