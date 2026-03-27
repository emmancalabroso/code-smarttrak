import os
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from django.core.exceptions import ImproperlyConfigured


BASE_DIR = Path(__file__).resolve().parent.parent


def env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def env_list(name: str, default: list[str] | None = None) -> list[str]:
    value = os.getenv(name)
    if not value:
        return list(default or [])
    return [item.strip() for item in value.split(",") if item.strip()]


def env_int(name: str, default: int = 0) -> int:
    value = os.getenv(name)
    if value is None:
        return default
    return int(value)


def postgres_database_from_url(database_url: str) -> dict[str, object]:
    parsed = urlparse(database_url)
    query = parse_qs(parsed.query)

    database_config: dict[str, object] = {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": parsed.path.lstrip("/") or "smarttrak",
        "USER": parsed.username or "",
        "PASSWORD": parsed.password or "",
        "HOST": parsed.hostname or "",
        "PORT": str(parsed.port or "5432"),
    }

    sslmode = query.get("sslmode", [""])[0]
    if sslmode:
        database_config["OPTIONS"] = {"sslmode": sslmode}

    return database_config


IS_VERCEL = env_bool("VERCEL", default=False)
DEBUG = env_bool("DEBUG", default=not IS_VERCEL)
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = "django-insecure-smarttrak-dev-key"
    else:
        raise ImproperlyConfigured("SECRET_KEY must be set when DEBUG is False.")
ALLOWED_HOSTS = env_list("ALLOWED_HOSTS", default=["127.0.0.1", "localhost"])
CSRF_TRUSTED_ORIGINS = env_list("CSRF_TRUSTED_ORIGINS")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

database_url = os.getenv("DATABASE_URL")
if database_url:
    DATABASES = {"default": postgres_database_from_url(database_url)}
elif os.getenv("POSTGRES_DB") or os.getenv("PGDATABASE"):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("POSTGRES_DB") or os.getenv("PGDATABASE", "smarttrak"),
            "USER": os.getenv("POSTGRES_USER") or os.getenv("PGUSER", "smarttrak"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD")
            or os.getenv("PGPASSWORD", "smarttrak"),
            "HOST": os.getenv("POSTGRES_HOST") or os.getenv("PGHOST", "localhost"),
            "PORT": os.getenv("POSTGRES_PORT") or os.getenv("PGPORT", "5432"),
            "OPTIONS": {
                "sslmode": os.getenv("POSTGRES_SSLMODE")
                or os.getenv("PGSSLMODE", "require")
            },
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env_bool("SECURE_SSL_REDIRECT", default=not DEBUG)
SECURE_HSTS_SECONDS = env_int("SECURE_HSTS_SECONDS", default=0)
SECURE_HSTS_INCLUDE_SUBDOMAINS = env_bool(
    "SECURE_HSTS_INCLUDE_SUBDOMAINS", default=False
)
SECURE_HSTS_PRELOAD = env_bool("SECURE_HSTS_PRELOAD", default=False)
SESSION_COOKIE_SECURE = env_bool("SESSION_COOKIE_SECURE", default=not DEBUG)
CSRF_COOKIE_SECURE = env_bool("CSRF_COOKIE_SECURE", default=not DEBUG)

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
