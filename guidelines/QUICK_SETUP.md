# Django Backend - Quick Setup Guide

**For**: LearnFlow Online Course Marketplace  
**Status**: Ready for Implementation  
**Last Updated**: January 2026

---

## Quick Start (Development)

### Prerequisites
- Python 3.11+
- PostgreSQL 14+
- Redis 7+
- Git

### Step 1: Project Setup

```bash
# Create project directory
mkdir learnflow-backend && cd learnflow-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Clone/Initialize Django project
django-admin startproject learnflow .

# Create apps
python manage.py startapp core
python manage.py startapp users
python manage.py startapp courses
python manage.py startapp enrollments
python manage.py startapp orders
python manage.py startapp cart
python manage.py startapp payments
python manage.py startapp reviews
python manage.py startapp notifications
python manage.py startapp analytics
```

### Step 2: Install Dependencies

**Create `requirements/base.txt`**:
```
Django==4.2.8
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.2
psycopg2-binary==2.9.9
redis==5.0.1
celery==5.3.4
stripe==7.4.0
Pillow==10.1.0
django-cors-headers==4.3.1
drf-spectacular==0.26.5
python-decouple==3.8
django-filter==23.5
channels==4.0.0
channels-redis==4.1.0
pytest==7.4.3
pytest-django==4.7.0
factory-boy==3.3.0
```

```bash
pip install -r requirements/base.txt
```

### Step 3: Configure Settings

**`learnflow/settings.py`**:
```python
import os
from pathlib import Path
from datetime import timedelta
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', 'your-secret-key-here')
DEBUG = config('DEBUG', False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

INSTALLED_APPS = [
    'daphne',  # For WebSockets (optional)
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',
    'django_filters',
    
    # Local apps
    'core.apps.CoreConfig',
    'users.apps.UsersConfig',
    'courses.apps.CoursesConfig',
    'enrollments.apps.EnrollmentsConfig',
    'orders.apps.OrdersConfig',
    'cart.apps.CartConfig',
    'payments.apps.PaymentsConfig',
    'reviews.apps.ReviewsConfig',
    'notifications.apps.NotificationsConfig',
    'analytics.apps.AnalyticsConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Add CORS
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'learnflow.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', 'learnflow'),
        'USER': config('DB_USER', 'learnflow'),
        'PASSWORD': config('DB_PASSWORD', 'password'),
        'HOST': config('DB_HOST', 'localhost'),
        'PORT': config('DB_PORT', '5432'),
    }
}

# Custom User Model
AUTH_USER_MODEL = 'users.User'

# JWT Configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

# DRF Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
    }
}

# CORS Configuration
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:5173,http://localhost:3000'
).split(',')
CORS_ALLOW_CREDENTIALS = True

# Stripe Configuration
STRIPE_PUBLIC_KEY = config('STRIPE_PUBLIC_KEY', '')
STRIPE_SECRET_KEY = config('STRIPE_SECRET_KEY', '')

# Redis Configuration
REDIS_URL = config('REDIS_URL', 'redis://localhost:6379/0')

# Celery Configuration
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'

# Cache Configuration
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': REDIS_URL,
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', 587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', 'noreply@learnflow.com')

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 12}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {'class': 'logging.StreamHandler'},
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs' / 'django.log',
            'maxBytes': 1024 * 1024 * 100,
            'backupCount': 10,
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
}
```

### Step 4: Create Models

**`users/models.py`**:
```python
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_instructor = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.email

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True)
    country = models.CharField(max_length=100, blank=True)
    total_hours_learned = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    courses_completed = models.IntegerField(default=0)
    current_streak_days = models.IntegerField(default=0)
    last_activity = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.email} Profile"
```

**`courses/models.py`**:
```python
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name

class Course(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='courses')
    instructor = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='courses_taught')
    
    thumbnail = models.ImageField(upload_to='course_thumbnails/')
    preview_video_url = models.URLField(blank=True)
    
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    duration_hours = models.DecimalField(max_digits=6, decimal_places=2)
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    rating_count = models.IntegerField(default=0)
    student_count = models.IntegerField(default=0)
    
    is_published = models.BooleanField(default=True)
    is_bestseller = models.BooleanField(default=False)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
```

### Step 5: Create Migrations and Database

```bash
# Create superuser for Admin
python manage.py createsuperuser

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Run development server
python manage.py runserver
```

### Step 6: Create Initial Fixtures

**`courses/fixtures/categories.json`**:
```json
[
  {
    "model": "courses.category",
    "pk": 1,
    "fields": {
      "name": "Development",
      "slug": "development",
      "icon": "BookOpen"
    }
  },
  {
    "model": "courses.category",
    "pk": 2,
    "fields": {
      "name": "Design",
      "slug": "design",
      "icon": "Award"
    }
  },
  {
    "model": "courses.category",
    "pk": 3,
    "fields": {
      "name": "Business",
      "slug": "business",
      "icon": "TrendingUp"
    }
  }
]
```

Load fixtures:
```bash
python manage.py loaddata courses/fixtures/categories.json
```

---

## Docker Deployment

### Create Docker Files

**`Dockerfile`**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY requirements/production.txt .
RUN pip install --no-cache-dir -r production.txt

COPY . .

RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "learnflow.wsgi:application", "--bind", "0.0.0.0:8000"]
```

**`docker-compose.yml`**:
```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: learnflow
      POSTGRES_USER: learnflow
      POSTGRES_PASSWORD: password123
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

  web:
    build: .
    command: gunicorn learnflow.wsgi:application --bind 0.0.0.0:8000 --workers 4
    ports:
      - "8000:8000"
    environment:
      DEBUG: "False"
      SECRET_KEY: your-secret-key
      DATABASE_URL: postgresql://learnflow:password123@db:5432/learnflow
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - db
      - redis
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media

  celery:
    build: .
    command: celery -A learnflow worker -l info
    environment:
      DEBUG: "False"
      SECRET_KEY: your-secret-key
      DATABASE_URL: postgresql://learnflow:password123@db:5432/learnflow
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

Run with Docker:
```bash
docker-compose up
```

---

## Testing

**`pytest.ini`**:
```ini
[pytest]
DJANGO_SETTINGS_MODULE = learnflow.settings
python_files = tests.py test_*.py *_tests.py
```

**`tests/test_courses.py`**:
```python
import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from courses.models import Course, Category

User = get_user_model()

@pytest.mark.django_db
class TestCourseAPI:
    def setup_method(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        self.category = Category.objects.create(
            name='Development',
            slug='development',
            icon='BookOpen'
        )
    
    def test_list_courses(self):
        """Test retrieving course list"""
        response = self.client.get('/api/v1/courses/')
        assert response.status_code == 200
        assert 'results' in response.data
    
    def test_create_course_authenticated(self):
        """Test authenticated user can create course"""
        self.client.force_authenticate(user=self.user)
        # Test course creation...
```

Run tests:
```bash
pytest
pytest -v  # Verbose
pytest --cov=.  # With coverage
```

---

## Environment Variables (`.env.example`)

```
# Django
DEBUG=False
SECRET_KEY=your-super-secret-key-change-this
ALLOWED_HOSTS=localhost,127.0.0.1,api.learnflow.com
ENVIRONMENT=development

# Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=learnflow
DB_USER=learnflow
DB_PASSWORD=secure_password
DB_HOST=localhost
DB_PORT=5432
DATABASE_URL=postgresql://learnflow:secure_password@localhost:5432/learnflow

# Redis
REDIS_URL=redis://localhost:6379/0

# Stripe
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_STORAGE_BUCKET_NAME=learnflow
```

---

## Project Structure Check

After setup, verify:
```
learnflow-backend/
├── learnflow/
│   ├── settings.py          ✓ Configured
│   ├── urls.py              ✓ API routes
│   └── wsgi.py              ✓ WSGI app
├── users/                   ✓ User management
├── courses/                 ✓ Course management
├── enrollments/             ✓ Enrollment tracking
├── orders/                  ✓ Order management
├── cart/                    ✓ Shopping cart
├── payments/                ✓ Payment processing
├── reviews/                 ✓ Reviews
├── notifications/           ✓ Email notifications
├── analytics/               ✓ Analytics
├── requirements.txt         ✓ Dependencies
├── manage.py                ✓ Django CLI
├── docker-compose.yml       ✓ Docker setup
├── .env.example             ✓ Environment template
└── README.md                ✓ Documentation
```

---

## Common Commands

```bash
# Development
python manage.py runserver                    # Start dev server
python manage.py shell                       # Django shell
python manage.py dbshell                     # Database shell

# Migrations
python manage.py makemigrations               # Create migrations
python manage.py migrate                      # Apply migrations
python manage.py migrate --fake-initial       # Fake initial migration

# Testing
pytest                                        # Run all tests
pytest tests/test_courses.py                 # Run specific test file
pytest -k test_list_courses                  # Run specific test

# Admin
python manage.py createsuperuser              # Create admin user
python manage.py changepassword username      # Change password
python manage.py loaddata fixture.json        # Load fixtures

# Production
gunicorn learnflow.wsgi:application           # Run with Gunicorn
python manage.py collectstatic                # Collect static files
python manage.py createdump db.json           # Backup database

# Celery
celery -A learnflow worker -l info            # Start worker
celery -A learnflow beat -l info              # Start scheduler
```

---

## Next Steps

1. **Implement all models** - Complete models for all apps
2. **Create serializers** - DRF serializers for all models
3. **Build views & viewsets** - REST endpoints
4. **Implement authentication** - JWT login/register
5. **Add Stripe integration** - Payment processing
6. **Setup Celery tasks** - Async email, certificate generation
7. **Write tests** - Comprehensive test coverage
8. **Configure production** - Environment, HTTPS, security
9. **Deploy** - Docker, cloud platform (AWS, DigitalOcean, Heroku)
10. **Monitor** - Logging, error tracking, analytics

---

## Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [DRF JWT Guide](https://django-rest-framework-simplejwt.readthedocs.io/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/docs/)
- [Celery Documentation](https://docs.celeryproject.org/)

---

**Status**: Ready for implementation  
**Estimated Development Time**: 4-6 weeks (with experienced team)  
**Deployment**: Docker-ready, production-grade architecture

