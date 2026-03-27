# SmartTrak

Simple starter application for SmartTrak using:

- Next.js + React + Tailwind CSS for the frontend
- Django + Python for the backend

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

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
