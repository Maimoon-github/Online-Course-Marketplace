# LearnFlow - Django Backend Implementation Plan

**Version**: 1.0  
**Last Updated**: January 2026  
**Status**: Complete Architecture Design

---

## Executive Summary

This document provides a comprehensive backend implementation blueprint for the LearnFlow online course marketplace React frontend. The Django backend will provide a robust, scalable, and secure API that supports all frontend features including user authentication, course management, shopping cart functionality, payments, and user progress tracking.

---

## Table of Contents

1. [Analysis & Overview](#analysis--overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Database Design](#database-design)
4. [API Specification](#api-specification)
5. [Authentication & Authorization](#authentication--authorization)
6. [Error Handling & Validation](#error-handling--validation)
7. [Integration Guide](#integration-guide)
8. [Deployment & DevOps](#deployment--devops)
9. [Security Considerations](#security-considerations)
10. [Performance & Scalability](#performance--scalability)

---

## 1. Analysis & Overview

### 1.1 Frontend Features Identified

The React frontend implements:

#### **Public Features**
- **Home Page**: Featured courses, categories, search, hero section
- **Course Listing**: Browsable course catalog with filters (category, level, rating, price range)
- **Course Detail**: Comprehensive course information, curriculum, reviews, related courses
- **Search & Discovery**: Search by topic, category browsing, popular searches
- **About, Contact, FAQ**: Static/informational pages

#### **E-Commerce Features**
- **Shopping Cart**: Add/remove courses, cart persistence
- **Checkout**: Payment processing, order summary, order confirmation
- **Order Success**: Purchase confirmation with receipt details

#### **User Authentication & Dashboard**
- **Login/Signup**: Email/password authentication, form validation
- **Dashboard**: User stats (enrolled courses, completed courses, hours learned, streak), continue learning section
- **My Courses**: Manage enrolled courses with progress tracking, completed courses with certificates, wishlist/saved courses
- **Course Progress**: Track enrollment progress, access curriculum

#### **Key Data Entities**
- **Courses**: Title, instructor, thumbnail, rating, reviews, student count, duration, level, price, category, curriculum
- **Users**: Email, password, profile info, enrollment status
- **Cart Items**: Course reference, quantity, pricing
- **Orders**: Cart checkout, payment info, order confirmation
- **Reviews**: Course ratings and comments
- **Progress**: Enrollment tracking, completion status, lessons watched

### 1.2 Frontend Architecture Observations

- **State Management**: Basic React state (no Redux/Context API for global state visible)
- **Routing**: Simple page-based routing in App.tsx via state management
- **API Assumptions**:
  - RESTful endpoints expected
  - JSON request/response format
  - Authentication via JWT or session cookies
  - Pagination for course listings
  - Filtering and search capabilities

---

## 2. Architecture & Tech Stack

### 2.1 Technology Selection

```
Backend Framework: Django 4.2+ (LTS)
REST API: Django REST Framework (DRF) 3.14+
Database: PostgreSQL 14+ (primary), Redis for caching
Authentication: JWT (djangorestframework-simplejwt)
Payment Processing: Stripe API integration
Real-time Features: Celery + Redis for async tasks
Documentation: drf-spectacular (OpenAPI/Swagger)
Testing: pytest + pytest-django + factory-boy
Deployment: Docker, Docker Compose, Gunicorn, Nginx
```

### 2.2 Project Structure

```
learnflow-backend/
├── learnflow/                      # Django project settings
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── asgi.py
│   └── settings/
│       ├── base.py                 # Shared settings
│       ├── development.py           # Dev-specific
│       ├── production.py            # Prod-specific
│       └── testing.py              # Test-specific
│
├── core/                           # Core app - shared utilities
│   ├── models.py                   # Base abstract models
│   ├── serializers.py              # Base serializers
│   ├── utils.py                    # Utility functions
│   ├── middleware.py
│   └── exceptions.py               # Custom exceptions
│
├── users/                          # User management app
│   ├── models.py                   # User, UserProfile
│   ├── views.py                    # Auth views, profile endpoints
│   ├── serializers.py              # User serializers
│   ├── permissions.py              # Custom permissions
│   ├── signals.py                  # User creation signals
│   ├── urls.py
│   └── tests/
│
├── courses/                        # Course management app
│   ├── models.py                   # Course, Curriculum, Lesson, Review
│   ├── views.py                    # Course CRUD, filtering
│   ├── serializers.py              # Course serializers
│   ├── filters.py                  # Course filtering logic
│   ├── urls.py
│   └── tests/
│
├── enrollments/                    # Course enrollments
│   ├── models.py                   # Enrollment, Progress
│   ├── views.py                    # Enrollment endpoints
│   ├── serializers.py
│   ├── signals.py                  # Enrollment signals
│   ├── urls.py
│   └── tests/
│
├── orders/                         # Order/Purchase management
│   ├── models.py                   # Order, OrderItem
│   ├── views.py                    # Order CRUD
│   ├── serializers.py
│   ├── urls.py
│   └── tests/
│
├── cart/                           # Shopping cart
│   ├── models.py                   # Cart, CartItem
│   ├── views.py                    # Cart operations
│   ├── serializers.py
│   ├── urls.py
│   └── tests/
│
├── payments/                       # Payment processing
│   ├── models.py                   # Payment, Transaction
│   ├── views.py                    # Payment endpoints, webhooks
│   ├── serializers.py
│   ├── stripe_service.py           # Stripe integration
│   ├── urls.py
│   └── tests/
│
├── reviews/                        # Course reviews/ratings
│   ├── models.py                   # Review, Rating
│   ├── views.py                    # Review CRUD
│   ├── serializers.py
│   ├── urls.py
│   └── tests/
│
├── notifications/                  # Email & notifications
│   ├── models.py                   # Notification, Email templates
│   ├── services.py                 # Email sending logic
│   ├── tasks.py                    # Celery tasks
│   ├── urls.py
│   └── tests/
│
├── analytics/                      # Analytics & reporting
│   ├── models.py                   # Analytics data
│   ├── views.py                    # Analytics endpoints
│   ├── services.py                 # Analytics calculations
│   └── tests/
│
├── api/                            # API configuration
│   ├── urls.py                     # API routing
│   ├── pagination.py               # Custom pagination
│   ├── permissions.py              # API-level permissions
│   └── versioning.py               # API versioning
│
├── tests/                          # Integration tests
│   ├── factories.py                # Test data factories
│   ├── test_api.py
│   └── test_integration.py
│
├── requirements/
│   ├── base.txt                    # Shared dependencies
│   ├── development.txt
│   ├── production.txt
│   └── testing.txt
│
├── docker/
│   ├── Dockerfile
│   ├── entrypoint.sh
│   └── nginx.conf
│
├── .env.example
├── manage.py
├── docker-compose.yml
├── pytest.ini
├── .gitignore
└── README.md
```

---

## 3. Database Design

### 3.1 ER Diagram Overview

```
User (1) ──────────────────────────────────── (M) UserProfile
  ├─ (1) ──────────────────────────────────── (M) Course (instructor)
  ├─ (1) ──────────────────────────────────── (M) Enrollment
  ├─ (1) ──────────────────────────────────── (M) Review
  ├─ (1) ──────────────────────────────────── (M) Order
  └─ (1) ──────────────────────────────────── (M) Cart

Course (1) ──────────────────────────────────── (M) Curriculum
Course (1) ──────────────────────────────────── (M) Lesson
Course (1) ──────────────────────────────────── (M) Review
Course (1) ──────────────────────────────────── (M) Category

Enrollment (M) ────────────────────────────── (1) User
Enrollment (M) ────────────────────────────── (1) Course
Enrollment (1) ──────────────────────────────── (M) LessonProgress

Order (M) ────────────────────────────────── (1) User
Order (1) ──────────────────────────────────── (M) OrderItem
OrderItem (M) ────────────────────────────── (1) Course

Cart (M) ────────────────────────────────── (1) User
Cart (1) ──────────────────────────────────── (M) CartItem
CartItem (M) ────────────────────────────── (1) Course

Payment (M) ────────────────────────────────── (1) Order
```

### 3.2 Core Models

#### **User Model**

```python
class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model using email as unique identifier
    """
    email = EmailField(unique=True)
    first_name = CharField(max_length=150)
    last_name = CharField(max_length=150)
    is_active = BooleanField(default=True)
    is_staff = BooleanField(default=False)
    is_instructor = BooleanField(default=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            Index(fields=['email']),
            Index(fields=['is_instructor']),
        ]
```

#### **UserProfile Model**

```python
class UserProfile(Model):
    """
    Extended user profile with learning information
    """
    user = OneToOneField(User, on_delete=CASCADE, related_name='profile')
    bio = TextField(blank=True)
    profile_picture = ImageField(upload_to='profiles/')
    phone = CharField(max_length=20, blank=True)
    country = CharField(max_length=100, blank=True)
    timezone = CharField(max_length=50, blank=True)
    total_hours_learned = DecimalField(max_digits=8, decimal_places=2, default=0)
    courses_completed = IntegerField(default=0)
    certificates_earned = IntegerField(default=0)
    current_streak_days = IntegerField(default=0)
    last_activity = DateTimeField(null=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```

#### **Course Model**

```python
class Category(Model):
    """Course categories"""
    name = CharField(max_length=100, unique=True)
    slug = SlugField(unique=True)
    description = TextField(blank=True)
    icon = CharField(max_length=50)  # Lucide icon name
    count = IntegerField(default=0)  # Denormalized course count
    created_at = DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Categories'

class Course(Model):
    """
    Core course model
    """
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    title = CharField(max_length=255)
    slug = SlugField(unique=True)
    description = TextField()
    short_description = CharField(max_length=500)
    category = ForeignKey(Category, on_delete=SET_NULL, null=True, related_name='courses')
    instructor = ForeignKey(User, on_delete=CASCADE, related_name='courses_taught')
    
    # Media
    thumbnail = ImageField(upload_to='course_thumbnails/')
    preview_video_url = URLField(blank=True)
    
    # Course Details
    level = CharField(max_length=20, choices=LEVEL_CHOICES)
    language = CharField(max_length=50, default='English')
    duration_hours = DecimalField(max_digits=6, decimal_places=2)
    
    # Pricing
    price = DecimalField(max_digits=10, decimal_places=2)
    original_price = DecimalField(max_digits=10, decimal_places=2, null=True)
    discount_percent = IntegerField(default=0)
    
    # Stats (denormalized for performance)
    rating = DecimalField(max_digits=3, decimal_places=2, default=0)
    rating_count = IntegerField(default=0)
    student_count = IntegerField(default=0)
    review_count = IntegerField(default=0)
    
    # Status
    is_published = BooleanField(default=True)
    is_bestseller = BooleanField(default=False)
    is_new = BooleanField(default=False)
    last_updated = DateTimeField(auto_now=True)
    created_at = DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            Index(fields=['category', 'is_published']),
            Index(fields=['instructor', 'is_published']),
            Index(fields=['slug']),
        ]

class Curriculum(Model):
    """Section/Module within a course"""
    course = ForeignKey(Course, on_delete=CASCADE, related_name='curriculum')
    title = CharField(max_length=255)
    description = TextField(blank=True)
    order = IntegerField()
    total_lessons = IntegerField(default=0)
    total_duration_minutes = IntegerField(default=0)
    created_at = DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order']
        unique_together = ['course', 'order']

class Lesson(Model):
    """Individual lesson/lecture"""
    curriculum = ForeignKey(Curriculum, on_delete=CASCADE, related_name='lessons')
    title = CharField(max_length=255)
    description = TextField(blank=True)
    video_url = URLField()
    duration_minutes = IntegerField()
    order = IntegerField()
    is_preview = BooleanField(default=False)
    resources = JSONField(default=list)  # URLs to downloadable materials
    created_at = DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order']
```

#### **Enrollment Model**

```python
class Enrollment(Model):
    """
    Student enrollment in courses
    """
    user = ForeignKey(User, on_delete=CASCADE, related_name='enrollments')
    course = ForeignKey(Course, on_delete=CASCADE, related_name='enrollments')
    enrolled_at = DateTimeField(auto_now_add=True)
    
    # Progress
    progress_percent = IntegerField(default=0)
    lessons_completed = IntegerField(default=0)
    total_lessons = IntegerField()
    
    # Status
    is_completed = BooleanField(default=False)
    completed_at = DateTimeField(null=True)
    
    # Certificate
    certificate_url = URLField(blank=True)
    
    class Meta:
        unique_together = ['user', 'course']
        indexes = [
            Index(fields=['user', 'is_completed']),
            Index(fields=['course']),
        ]

class LessonProgress(Model):
    """Track individual lesson completion"""
    enrollment = ForeignKey(Enrollment, on_delete=CASCADE, related_name='lesson_progress')
    lesson = ForeignKey(Lesson, on_delete=CASCADE)
    is_completed = BooleanField(default=False)
    watch_time_seconds = IntegerField(default=0)
    completed_at = DateTimeField(null=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['enrollment', 'lesson']
```

#### **Cart & Order Models**

```python
class Cart(Model):
    """Shopping cart"""
    user = OneToOneField(User, on_delete=CASCADE, related_name='cart')
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    
    @property
    def total_price(self):
        return sum(item.course.price for item in self.items.all())

class CartItem(Model):
    """Item in cart"""
    cart = ForeignKey(Cart, on_delete=CASCADE, related_name='items')
    course = ForeignKey(Course, on_delete=CASCADE)
    added_at = DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['cart', 'course']

class Order(Model):
    """Purchase order"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    user = ForeignKey(User, on_delete=SET_NULL, null=True, related_name='orders')
    status = CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Pricing
    subtotal = DecimalField(max_digits=10, decimal_places=2)
    discount_amount = DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = DecimalField(max_digits=10, decimal_places=2)
    
    # Payment info
    payment_method = CharField(max_length=50)  # 'stripe', 'paypal', etc.
    transaction_id = CharField(max_length=255, blank=True)
    payment_id = CharField(max_length=255, blank=True)
    
    # Dates
    created_at = DateTimeField(auto_now_add=True)
    completed_at = DateTimeField(null=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            Index(fields=['user', 'status']),
            Index(fields=['created_at']),
        ]

class OrderItem(Model):
    """Items in an order"""
    order = ForeignKey(Order, on_delete=CASCADE, related_name='items')
    course = ForeignKey(Course, on_delete=SET_NULL, null=True)
    price_at_purchase = DecimalField(max_digits=10, decimal_places=2)
    created_at = DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['order', 'course']
```

#### **Review Model**

```python
class Review(Model):
    """Course reviews and ratings"""
    course = ForeignKey(Course, on_delete=CASCADE, related_name='reviews')
    user = ForeignKey(User, on_delete=CASCADE, related_name='reviews')
    rating = IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    title = CharField(max_length=255, blank=True)
    comment = TextField()
    helpful_count = IntegerField(default=0)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['course', 'user']
        ordering = ['-created_at']
        indexes = [
            Index(fields=['course', '-created_at']),
            Index(fields=['user']),
        ]
```

#### **Payment Model**

```python
class Payment(Model):
    """Payment transaction records"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('succeeded', 'Succeeded'),
        ('failed', 'Failed'),
    ]
    
    order = ForeignKey(Order, on_delete=CASCADE, related_name='payments')
    stripe_payment_id = CharField(max_length=255, unique=True)
    amount = DecimalField(max_digits=10, decimal_places=2)
    status = CharField(max_length=20, choices=STATUS_CHOICES)
    metadata = JSONField(default=dict)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
```

---

## 4. API Specification

### 4.1 API Base URL & Versioning

```
Base URL: https://api.learnflow.com/api/v1/

Versioning: URL path versioning (/api/v1/, /api/v2/)
Content-Type: application/json
Authentication: Bearer <JWT_TOKEN>
```

### 4.2 Authentication Endpoints

#### **POST /auth/register/**
```json
// Request
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "first_name": "John",
  "last_name": "Doe"
}

// Response (201)
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### **POST /auth/login/**
```json
// Request
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

// Response (200)
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_instructor": false
  }
}
```

#### **POST /auth/refresh/**
```json
// Request
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

// Response (200)
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### **POST /auth/logout/**
```json
// Request (no body needed, auth header required)

// Response (200)
{
  "message": "Successfully logged out"
}
```

#### **GET /auth/me/**
```json
// Response (200)
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_instructor": false,
  "profile": {
    "bio": "Software developer",
    "profile_picture": "https://...",
    "country": "USA",
    "total_hours_learned": 248,
    "courses_completed": 5,
    "current_streak_days": 15
  }
}
```

### 4.3 Course Endpoints

#### **GET /courses/** (List all courses)
```json
// Query Parameters
?page=1
&page_size=20
&category=development
&level=beginner
&min_price=0
&max_price=200
&rating_min=4.0
&search=web%20development
&ordering=popular  // popular, newest, rating, price_low, price_high

// Response (200)
{
  "count": 1234,
  "next": "https://api.learnflow.com/api/v1/courses/?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "title": "Complete Web Development Bootcamp 2026",
      "slug": "complete-web-development-bootcamp-2026",
      "instructor": {
        "id": "uuid",
        "first_name": "Angela",
        "last_name": "Yu"
      },
      "thumbnail": "https://...",
      "rating": 4.8,
      "rating_count": 45280,
      "student_count": 234567,
      "duration_hours": 52,
      "level": "beginner",
      "price": 89.99,
      "original_price": 129.99,
      "discount_percent": 30,
      "category": "Development",
      "is_bestseller": true,
      "is_new": false,
      "enrolled": false,
      "in_cart": false,
      "in_wishlist": false
    }
  ]
}
```

#### **GET /courses/{id}/** (Get course detail)
```json
// Response (200)
{
  "id": "uuid",
  "title": "Complete Web Development Bootcamp 2026",
  "slug": "complete-web-development-bootcamp-2026",
  "description": "Learn web development from scratch...",
  "short_description": "From Zero to Full-Stack Developer",
  "instructor": {
    "id": "uuid",
    "first_name": "Angela",
    "last_name": "Yu",
    "profile": {
      "bio": "10+ years of teaching experience",
      "profile_picture": "https://...",
      "courses_count": 12,
      "students_count": 523456,
      "rating": 4.8
    }
  },
  "category": "Development",
  "thumbnail": "https://...",
  "preview_video_url": "https://...",
  "rating": 4.8,
  "rating_count": 45280,
  "student_count": 234567,
  "review_count": 45280,
  "duration_hours": 52,
  "level": "beginner",
  "language": "English",
  "price": 89.99,
  "original_price": 129.99,
  "discount_percent": 30,
  "is_bestseller": true,
  "last_updated": "2026-01-27T10:00:00Z",
  "is_published": true,
  
  // Learning outcomes
  "outcomes": [
    "Build 16+ real-world projects including full-stack web applications",
    "Master HTML5, CSS3, JavaScript, React, and Node.js from scratch",
    "Understand modern web development workflows and best practices",
    "Deploy your applications to production using cloud platforms"
  ],
  
  // Requirements
  "requirements": [
    "No programming experience needed - beginner friendly",
    "A computer with internet connection"
  ],
  
  // Curriculum
  "curriculum": [
    {
      "id": "uuid",
      "title": "Introduction to Web Development",
      "description": "Get started with the fundamentals",
      "order": 1,
      "total_lessons": 12,
      "total_duration_minutes": 120,
      "lessons": [
        {
          "id": "uuid",
          "title": "What is Web Development?",
          "duration_minutes": 10,
          "order": 1,
          "is_preview": true,
          "video_url": "https://...",
          "completed": false
        }
      ]
    }
  ],
  
  // Reviews
  "reviews": {
    "count": 45280,
    "rating": 4.8,
    "distribution": {
      "5": 35000,
      "4": 8000,
      "3": 1500,
      "2": 500,
      "1": 280
    },
    "recent": [
      {
        "id": "uuid",
        "author": "John Smith",
        "avatar": "https://...",
        "rating": 5,
        "date": "2 days ago",
        "comment": "Absolutely fantastic course!",
        "helpful_count": 234
      }
    ]
  },
  
  // User status
  "enrolled": false,
  "progress": null,
  "in_cart": false,
  "in_wishlist": false
}
```

#### **GET /courses/{id}/reviews/** (Get course reviews)
```json
// Query Parameters
?page=1
&page_size=10
&rating=5  // Filter by rating
&ordering=-helpful_count

// Response (200)
{
  "count": 45280,
  "next": "https://...",
  "results": [
    {
      "id": "uuid",
      "author": {
        "id": "uuid",
        "first_name": "John",
        "last_name": "Smith",
        "avatar": "https://..."
      },
      "rating": 5,
      "title": "Best course ever!",
      "comment": "Excellent course with great projects",
      "helpful_count": 234,
      "created_at": "2 days ago"
    }
  ]
}
```

#### **POST /courses/{id}/reviews/** (Create review)
```json
// Request
{
  "rating": 5,
  "title": "Amazing course",
  "comment": "The instructor explains everything clearly"
}

// Response (201)
{
  "id": "uuid",
  "rating": 5,
  "title": "Amazing course",
  "comment": "The instructor explains everything clearly",
  "helpful_count": 0,
  "created_at": "2026-01-27T10:00:00Z"
}
```

#### **GET /courses/related/{id}/** (Get related courses)
```json
// Response (200)
{
  "results": [
    // Similar to course listing response
  ]
}
```

### 4.4 Cart Endpoints

#### **GET /cart/**
```json
// Response (200)
{
  "id": "uuid",
  "items": [
    {
      "id": "uuid",
      "course": {
        "id": "uuid",
        "title": "Complete Web Development Bootcamp 2026",
        "price": 89.99,
        "original_price": 129.99,
        "thumbnail": "https://..."
      },
      "added_at": "2026-01-27T10:00:00Z"
    }
  ],
  "total_items": 2,
  "total_price": 169.98,
  "total_original_price": 249.98,
  "total_discount": 80.00
}
```

#### **POST /cart/items/**
```json
// Request
{
  "course_id": "uuid"
}

// Response (201)
{
  "id": "uuid",
  "course": {
    "id": "uuid",
    "title": "Complete Web Development Bootcamp 2026",
    "price": 89.99
  },
  "added_at": "2026-01-27T10:00:00Z"
}
```

#### **DELETE /cart/items/{id}/**
```json
// Response (204) - No content
```

#### **DELETE /cart/**
```json
// Request (no body)

// Response (204) - Clears entire cart
```

### 4.5 Order Endpoints

#### **GET /orders/**
```json
// Query Parameters
?page=1
&page_size=10
&status=completed  // pending, completed, failed, refunded

// Response (200)
{
  "count": 5,
  "results": [
    {
      "id": "uuid",
      "order_number": "ORD-2026-00001",
      "status": "completed",
      "created_at": "2026-01-27T10:00:00Z",
      "completed_at": "2026-01-27T10:05:00Z",
      "total_amount": 169.98,
      "items_count": 2,
      "items": [
        {
          "id": "uuid",
          "course": {
            "id": "uuid",
            "title": "Complete Web Development Bootcamp 2026"
          },
          "price_at_purchase": 89.99
        }
      ]
    }
  ]
}
```

#### **GET /orders/{id}/**
```json
// Response (200)
{
  "id": "uuid",
  "order_number": "ORD-2026-00001",
  "status": "completed",
  "subtotal": 169.98,
  "discount_amount": 0,
  "total_amount": 169.98,
  "created_at": "2026-01-27T10:00:00Z",
  "completed_at": "2026-01-27T10:05:00Z",
  "items": [
    {
      "id": "uuid",
      "course": {
        "id": "uuid",
        "title": "Complete Web Development Bootcamp 2026"
      },
      "price_at_purchase": 89.99
    }
  ],
  "payment": {
    "method": "stripe",
    "status": "succeeded",
    "transaction_id": "ch_xxxxx"
  }
}
```

#### **POST /orders/create-from-cart/**
```json
// Request
{
  "billing_address": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "address_line1": "123 Main St",
    "address_line2": "Apt 4B",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94105",
    "country": "US",
    "phone": "+1234567890"
  }
}

// Response (201)
{
  "id": "uuid",
  "order_number": "ORD-2026-00001",
  "status": "pending",
  "total_amount": 169.98,
  "items": [...]
}
```

### 4.6 Payment Endpoints

#### **POST /payments/create-payment-intent/**
```json
// Request
{
  "order_id": "uuid"
}

// Response (201)
{
  "client_secret": "pi_xxxxx_secret_xxxxx",
  "publishable_key": "pk_live_xxxxx",
  "amount": 16998,  // in cents
  "currency": "usd"
}
```

#### **POST /payments/confirm-payment/**
```json
// Request
{
  "order_id": "uuid",
  "payment_intent_id": "pi_xxxxx"
}

// Response (200)
{
  "order_id": "uuid",
  "status": "succeeded",
  "message": "Payment processed successfully"
}
```

#### **POST /payments/webhook/stripe/**
```
// Stripe Webhook Handler - No auth required
// Handles:
// - payment_intent.succeeded
// - payment_intent.payment_failed
// - charge.dispute.created
```

### 4.7 Enrollment Endpoints

#### **GET /enrollments/**
```json
// Query Parameters
?page=1
&page_size=10
&status=active  // active, completed

// Response (200)
{
  "count": 12,
  "results": [
    {
      "id": "uuid",
      "course": {
        "id": "uuid",
        "title": "Complete Web Development Bootcamp 2026",
        "thumbnail": "https://...",
        "duration_hours": 52
      },
      "progress_percent": 45,
      "lessons_completed": 18,
      "total_lessons": 40,
      "enrolled_at": "2025-06-15T10:00:00Z",
      "is_completed": false,
      "certificate_url": null
    }
  ]
}
```

#### **GET /enrollments/{id}/**
```json
// Response (200)
{
  "id": "uuid",
  "course": {
    "id": "uuid",
    "title": "Complete Web Development Bootcamp 2026",
    "instructor": { ... },
    "curriculum": [
      {
        "id": "uuid",
        "title": "Introduction to Web Development",
        "lessons": [
          {
            "id": "uuid",
            "title": "What is Web Development?",
            "completed": false,
            "watch_time_seconds": 0,
            "duration_minutes": 10
          }
        ]
      }
    ]
  },
  "progress_percent": 45,
  "lessons_completed": 18,
  "total_lessons": 40,
  "enrolled_at": "2025-06-15T10:00:00Z",
  "is_completed": false,
  "certificate_url": null
}
```

#### **POST /courses/{id}/enroll/**
```json
// Request (no body needed)

// Response (201)
{
  "id": "uuid",
  "course_id": "uuid",
  "enrolled_at": "2026-01-27T10:00:00Z",
  "progress_percent": 0,
  "is_completed": false
}
```

#### **POST /enrollments/{id}/mark-lesson-complete/**
```json
// Request
{
  "lesson_id": "uuid"
}

// Response (200)
{
  "lesson_id": "uuid",
  "enrollment_id": "uuid",
  "is_completed": true,
  "enrollment_progress": 45
}
```

### 4.8 Dashboard Endpoints

#### **GET /dashboard/stats/**
```json
// Response (200)
{
  "courses_enrolled": 12,
  "courses_completed": 5,
  "total_hours_learned": 248,
  "current_streak_days": 15,
  "average_rating_given": 4.6,
  "certificates_earned": 5
}
```

#### **GET /dashboard/continue-learning/**
```json
// Response (200)
{
  "results": [
    {
      "enrollment_id": "uuid",
      "course": {
        "id": "uuid",
        "title": "Complete Web Development Bootcamp 2026",
        "thumbnail": "https://...",
        "instructor": "Dr. Angela Yu"
      },
      "progress_percent": 45,
      "lessons_completed": 18,
      "total_lessons": 40,
      "current_lesson": {
        "id": "uuid",
        "title": "JavaScript Fundamentals",
        "order": 15
      }
    }
  ]
}
```

#### **GET /dashboard/recommendations/**
```json
// Response (200)
{
  "results": [
    // List of recommended courses based on user's enrollments
  ]
}
```

### 4.9 User Profile Endpoints

#### **GET /users/profile/**
```json
// Response (200)
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "profile": {
    "bio": "Software developer",
    "profile_picture": "https://...",
    "phone": "+1234567890",
    "country": "USA",
    "timezone": "America/Los_Angeles",
    "total_hours_learned": 248,
    "courses_completed": 5,
    "current_streak_days": 15,
    "certificates_earned": 5,
    "last_activity": "2026-01-27T10:00:00Z"
  }
}
```

#### **PUT /users/profile/**
```json
// Request
{
  "first_name": "John",
  "last_name": "Doe",
  "bio": "Updated bio",
  "phone": "+1234567890",
  "country": "USA",
  "timezone": "America/Los_Angeles"
}

// Response (200)
{
  "id": "uuid",
  "first_name": "John",
  "last_name": "Doe",
  "profile": { ... }
}
```

#### **PUT /users/change-password/**
```json
// Request
{
  "old_password": "CurrentPassword123!",
  "new_password": "NewPassword123!"
}

// Response (200)
{
  "message": "Password changed successfully"
}
```

### 4.10 Search & Filter Endpoints

#### **GET /search/**
```json
// Query Parameters
?q=web%20development
&type=course  // course, instructor, category
&page=1

// Response (200)
{
  "courses": {
    "count": 234,
    "results": [...]
  },
  "instructors": {
    "count": 12,
    "results": [...]
  }
}
```

#### **GET /categories/**
```json
// Response (200)
{
  "results": [
    {
      "id": "uuid",
      "name": "Development",
      "slug": "development",
      "icon": "BookOpen",
      "course_count": 1234
    }
  ]
}
```

---

## 5. Authentication & Authorization

### 5.1 JWT Implementation

```python
# Settings configuration for JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': settings.SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

# CORS settings for frontend integration
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # Dev frontend
    'https://learnflow.com',  # Production
]

CORS_ALLOW_CREDENTIALS = True
```

### 5.2 Permission Classes

```python
class IsOwnerOrReadOnly(BasePermission):
    """Allow owner to edit, others can only read"""
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user

class IsInstructor(BasePermission):
    """Only instructors can access"""
    def has_permission(self, request, view):
        return request.user and request.user.is_instructor

class IsEnrolled(BasePermission):
    """User must be enrolled in course"""
    def has_object_permission(self, request, view, obj):
        return Enrollment.objects.filter(
            user=request.user,
            course=obj
        ).exists()

class CanAccessLesson(BasePermission):
    """User can access if enrolled or lesson is preview"""
    def has_permission(self, request, view):
        lesson = view.get_lesson()
        if lesson.is_preview:
            return True
        return Enrollment.objects.filter(
            user=request.user,
            course=lesson.curriculum.course
        ).exists()
```

### 5.3 Authentication Flow

```
1. User registers/logs in
   → POST /auth/login/
   ← Returns access_token + refresh_token

2. Client stores both tokens (access in memory, refresh in httpOnly cookie)

3. For subsequent requests:
   Authorization: Bearer {access_token}

4. When access_token expires (15 mins):
   POST /auth/refresh/
   → Returns new access_token

5. If refresh_token expires (7 days):
   → User must log in again

6. Logout:
   POST /auth/logout/
   → Adds refresh token to blacklist
```

---

## 6. Error Handling & Validation

### 6.1 Standard Error Response Format

```json
{
  "error": {
    "code": "COURSE_NOT_FOUND",
    "message": "The requested course does not exist",
    "status": 404,
    "details": {
      "course_id": "invalid-uuid"
    }
  }
}
```

### 6.2 HTTP Status Codes

| Status | Usage | Example |
|--------|-------|---------|
| 200 OK | Successful request | GET /courses/, POST /cart/items/ |
| 201 Created | Resource created | POST /auth/register/, POST /orders/ |
| 204 No Content | Successful delete | DELETE /cart/items/{id}/ |
| 400 Bad Request | Invalid input | Missing required fields |
| 401 Unauthorized | Auth required | Missing JWT token |
| 403 Forbidden | Permission denied | Non-instructor accessing instructor endpoints |
| 404 Not Found | Resource not found | GET /courses/invalid-id/ |
| 409 Conflict | Duplicate resource | User already enrolled in course |
| 422 Unprocessable Entity | Validation error | Invalid email format |
| 429 Too Many Requests | Rate limiting | Too many login attempts |
| 500 Internal Server Error | Server error | Unexpected exception |
| 503 Service Unavailable | Maintenance | Planned downtime |

### 6.3 Custom Exception Handling

```python
class CourseNotFound(APIException):
    status_code = 404
    default_code = 'course_not_found'
    default_detail = 'The requested course does not exist'

class AlreadyEnrolled(APIException):
    status_code = 409
    default_code = 'already_enrolled'
    default_detail = 'User is already enrolled in this course'

class InvalidPayment(APIException):
    status_code = 400
    default_code = 'invalid_payment'
    default_detail = 'Payment processing failed'

# Exception handler in settings
EXCEPTION_HANDLER = 'core.exception_handler.custom_exception_handler'
```

### 6.4 Input Validation

```python
from rest_framework import serializers

class CourseFilterSerializer(serializers.Serializer):
    """Validate course filter parameters"""
    search = serializers.CharField(max_length=200, required=False)
    category = serializers.CharField(max_length=100, required=False)
    level = serializers.ChoiceField(
        choices=['beginner', 'intermediate', 'advanced'],
        required=False
    )
    min_price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0,
        required=False
    )
    max_price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0,
        required=False
    )
    rating_min = serializers.DecimalField(
        max_digits=3,
        decimal_places=1,
        min_value=0,
        max_value=5,
        required=False
    )
    
    def validate(self, data):
        if 'min_price' in data and 'max_price' in data:
            if data['min_price'] > data['max_price']:
                raise serializers.ValidationError(
                    "min_price cannot be greater than max_price"
                )
        return data
```

---

## 7. Integration Guide

### 7.1 Frontend-Backend API Integration Example

```typescript
// Frontend API client setup
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${API_BASE_URL}/auth/refresh/`,
            { refresh: refreshToken }
          );
          localStorage.setItem('access_token', data.access);
          // Retry original request
          return apiClient(error.config);
        } catch {
          // Refresh failed, redirect to login
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 7.2 Service Layer Example

```typescript
// Frontend course service
import apiClient from './api';

export const courseService = {
  async getCourses(params: CourseFilterParams) {
    const { data } = await apiClient.get('/courses/', { params });
    return data;
  },

  async getCourseDetail(id: string) {
    const { data } = await apiClient.get(`/courses/${id}/`);
    return data;
  },

  async enrollCourse(id: string) {
    const { data } = await apiClient.post(`/courses/${id}/enroll/`);
    return data;
  },

  async submitReview(courseId: string, review: ReviewPayload) {
    const { data } = await apiClient.post(
      `/courses/${courseId}/reviews/`,
      review
    );
    return data;
  },
};

// Frontend cart service
export const cartService = {
  async getCart() {
    const { data } = await apiClient.get('/cart/');
    return data;
  },

  async addToCart(courseId: string) {
    const { data } = await apiClient.post('/cart/items/', {
      course_id: courseId,
    });
    return data;
  },

  async removeFromCart(itemId: string) {
    await apiClient.delete(`/cart/items/${itemId}/`);
  },

  async clearCart() {
    await apiClient.delete('/cart/');
  },
};
```

### 7.3 React Hook Example

```typescript
// Custom hook for fetching courses
import { useEffect, useState } from 'react';
import { courseService } from '../services/courseService';

export function useCourses(filters?: CourseFilterParams) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await courseService.getCourses(filters);
        setCourses(data.results);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [filters]);

  return { courses, loading, error };
}

// Usage in component
function CoursesPage() {
  const [filters, setFilters] = useState<CourseFilterParams>({});
  const { courses, loading, error } = useCourses(filters);

  if (loading) return <CoursesSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <CourseGrid
      courses={courses}
      onFilterChange={setFilters}
    />
  );
}
```

---

## 8. Deployment & DevOps

### 8.1 Docker Configuration

**Dockerfile**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements/production.txt .
RUN pip install --no-cache-dir -r production.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "learnflow.wsgi:application", "--bind", "0.0.0.0:8000"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: learnflow
      POSTGRES_USER: learnflow
      POSTGRES_PASSWORD: secure_password_here
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U learnflow"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  web:
    build: .
    command: gunicorn learnflow.wsgi:application --bind 0.0.0.0:8000 --workers 4
    ports:
      - "8000:8000"
    environment:
      DEBUG: "False"
      SECRET_KEY: ${SECRET_KEY}
      DATABASE_URL: postgresql://learnflow:secure_password_here@db:5432/learnflow
      REDIS_URL: redis://redis:6379/0
      ALLOWED_HOSTS: localhost,127.0.0.1,api.learnflow.com
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media

  celery:
    build: .
    command: celery -A learnflow worker -l info
    environment:
      DEBUG: "False"
      SECRET_KEY: ${SECRET_KEY}
      DATABASE_URL: postgresql://learnflow:secure_password_here@db:5432/learnflow
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - db
      - redis

  celery-beat:
    build: .
    command: celery -A learnflow beat -l info
    environment:
      DEBUG: "False"
      SECRET_KEY: ${SECRET_KEY}
      DATABASE_URL: postgresql://learnflow:secure_password_here@db:5432/learnflow
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - db
      - redis

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx.conf:/etc/nginx/nginx.conf:ro
      - static_volume:/app/staticfiles:ro
      - media_volume:/app/media:ro
      - ./docker/ssl:/etc/nginx/ssl:ro
    depends_on:
      - web

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

### 8.2 Environment Configuration

**.env.example**
```
# Django Settings
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,api.learnflow.com
ENVIRONMENT=production

# Database
DATABASE_URL=postgresql://learnflow:password@db:5432/learnflow

# Redis
REDIS_URL=redis://redis:6379/0

# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Stripe
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# AWS S3 (for media files)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=learnflow-media

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://learnflow.com

# JWT
JWT_SECRET=your-jwt-secret
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# API
API_BASE_URL=https://api.learnflow.com
FRONTEND_URL=https://learnflow.com
```

### 8.3 Database Migrations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load fixtures (if needed)
python manage.py loaddata initial_data.json
```

### 8.4 Production Deployment Checklist

- [ ] Set `DEBUG = False`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Use environment variables for secrets
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Configure email service
- [ ] Set up monitoring and logging
- [ ] Configure CDN for static files
- [ ] Set up database replication
- [ ] Configure load balancing
- [ ] Set up health checks
- [ ] Configure rate limiting
- [ ] Set up API versioning strategy

---

## 9. Security Considerations

### 9.1 Authentication & Authorization

```python
# Enforce strong password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 12,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Implement rate limiting
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
        'auth_login': '5/hour',  # Strict limit for login
    }
}
```

### 9.2 Data Protection

```python
# HTTPS enforcement
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_SECURITY_POLICY = {
    'DEFAULT_SRC': ("'self'",),
    'SCRIPT_SRC': ("'self'", "'unsafe-inline'"),
    'STYLE_SRC': ("'self'", "'unsafe-inline'"),
    'IMG_SRC': ("'self'", "data:", "https:"),
}

# Input validation and sanitization
from django.utils.text import slugify
from bleach import clean

def sanitize_user_input(text):
    """Sanitize user input"""
    clean_text = clean(text, strip=True)
    return clean_text[:500]  # Max length

# SQL Injection prevention (using ORM)
# ✓ Use QuerySet API (automatic parameterization)
# ✓ Use select_related() and prefetch_related() for optimization
# ✓ Avoid raw() unless absolutely necessary
```

### 9.3 Payment Security

```python
# PCI DSS Compliance
PAYMENT_SETTINGS = {
    'PCI_DSS_COMPLIANT': True,
    'STRIPE_VERSION': '2023-10-16',
    'WEBHOOK_SIGNING': True,
}

# Never store full credit card numbers
class PaymentSerializer(serializers.Serializer):
    """
    Stripe token should come from frontend
    Backend never handles raw card data
    """
    stripe_payment_method_id = serializers.CharField()

# Webhook signature verification
from stripe.error import SignatureVerificationError

def verify_stripe_webhook(request):
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    
    try:
        event = stripe.Webhook.construct_event(
            request.body,
            sig_header,
            settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        return Response({'error': 'Invalid payload'}, status=400)
    except SignatureVerificationError:
        return Response({'error': 'Invalid signature'}, status=400)
    
    return process_webhook_event(event)
```

### 9.4 API Security

```python
# API Key rotation
class APIKey(Model):
    key = CharField(max_length=40, unique=True)
    user = ForeignKey(User, on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created_at = DateTimeField(auto_now_add=True)
    expires_at = DateTimeField()

# Request signing
import hmac
import hashlib
from datetime import datetime, timedelta

def sign_request(payload, secret_key):
    """Sign API request"""
    timestamp = int(datetime.now().timestamp())
    message = f"{payload}{timestamp}".encode()
    signature = hmac.new(
        secret_key.encode(),
        message,
        hashlib.sha256
    ).hexdigest()
    return signature, timestamp

# Implement endpoint-level rate limiting for sensitive operations
class PaymentThrottle(UserRateThrottle):
    scope = 'payment'
    THROTTLE_RATES = {'payment': '5/hour'}
```

---

## 10. Performance & Scalability

### 10.1 Database Optimization

```python
# Use select_related() and prefetch_related()
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.select_related(
        'category', 'instructor'
    ).prefetch_related(
        'enrollments',
        Prefetch(
            'reviews',
            queryset=Review.objects.order_by('-created_at')[:5]
        )
    )

# Add database indexes
class Course(Model):
    class Meta:
        indexes = [
            Index(fields=['category', 'is_published']),
            Index(fields=['instructor', '-created_at']),
            Index(fields=['rating', '-student_count']),
        ]

# Query optimization
def get_user_dashboard_stats(user):
    """Efficiently fetch dashboard stats"""
    from django.db.models import Count, Sum, F, Case, When
    
    stats = {
        'courses_enrolled': Enrollment.objects.filter(
            user=user
        ).count(),
        'courses_completed': Enrollment.objects.filter(
            user=user,
            is_completed=True
        ).count(),
        'total_hours': Enrollment.objects.filter(
            user=user
        ).aggregate(
            total=Sum('course__duration_hours')
        )['total'] or 0,
    }
    return stats
```

### 10.2 Caching Strategy

```python
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from functools import wraps

# Cache course list (1 hour)
@cache_page(60 * 60)
def get_courses(request):
    """Public course listing"""
    return CourseListView.as_view()(request)

# Cache with custom key
def get_course_detail(course_id):
    cache_key = f'course:{course_id}'
    course = cache.get(cache_key)
    
    if course is None:
        course = Course.objects.get(id=course_id)
        cache.set(cache_key, course, 60 * 60)  # 1 hour
    
    return course

# Invalidate cache on updates
def invalidate_course_cache(course_id):
    cache.delete(f'course:{course_id}')
    cache.delete('courses:list')  # Invalidate list cache too

# Cache user dashboard
@cache.cached(timeout=300, key_prefix='dashboard')  # 5 minutes
def get_user_dashboard(user_id):
    return {
        'stats': get_user_dashboard_stats(user_id),
        'enrollments': get_user_enrollments(user_id),
    }
```

### 10.3 Async Tasks with Celery

```python
# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string

@shared_task
def send_enrollment_confirmation(enrollment_id):
    """Send enrollment confirmation email"""
    enrollment = Enrollment.objects.get(id=enrollment_id)
    
    context = {
        'user': enrollment.user,
        'course': enrollment.course,
    }
    
    html_message = render_to_string(
        'emails/enrollment_confirmation.html',
        context
    )
    
    send_mail(
        subject=f'Welcome to {enrollment.course.title}',
        message='',
        from_email='noreply@learnflow.com',
        recipient_list=[enrollment.user.email],
        html_message=html_message,
    )

@shared_task
def generate_certificate(enrollment_id):
    """Generate completion certificate"""
    enrollment = Enrollment.objects.get(id=enrollment_id)
    # Generate PDF certificate
    certificate_url = create_pdf_certificate(enrollment)
    enrollment.certificate_url = certificate_url
    enrollment.save()

@shared_task
def update_course_analytics(course_id):
    """Update course rating and stats"""
    course = Course.objects.get(id=course_id)
    
    reviews = course.reviews.all()
    if reviews.exists():
        course.rating = reviews.aggregate(
            avg_rating=Avg('rating')
        )['avg_rating']
        course.rating_count = reviews.count()
    
    course.student_count = course.enrollments.count()
    course.review_count = reviews.count()
    course.save()

# Use in views
def create_enrollment(request, course_id):
    enrollment = Enrollment.objects.create(
        user=request.user,
        course_id=course_id
    )
    
    # Send async tasks
    send_enrollment_confirmation.delay(enrollment.id)
    update_course_analytics.delay(course_id)
    
    return Response({'enrollment_id': enrollment.id})
```

### 10.4 Pagination Configuration

```python
class CustomPagination(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
    
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data
        })

# Use in views
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.filter(is_published=True)
    serializer_class = CourseSerializer
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'level']
    search_fields = ['title', 'description']
    ordering_fields = ['rating', 'student_count', 'price']
    ordering = '-student_count'
```

### 10.5 Search Optimization

```python
# Use Elasticsearch for advanced search
from elasticsearch_dsl import Document, Text, Keyword

class CourseDocument(Document):
    title = Text(analyzer='standard')
    description = Text()
    category = Keyword()
    instructor = Keyword()
    rating = Text()
    
    class Index:
        name = 'courses'

# Search view
class CourseSearchView(generics.ListAPIView):
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        
        if query:
            # Use Elasticsearch
            search = CourseDocument.search()
            search = search.query(
                'multi_match',
                query=query,
                fields=['title^2', 'description', 'category']
            )
            course_ids = [hit.meta.id for hit in search]
            return Course.objects.filter(id__in=course_ids)
        
        return Course.objects.filter(is_published=True)
```

---

## 11. Monitoring & Logging

### 11.1 Logging Configuration

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {asctime} {message}',
            'style': '{',
        },
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/learnflow/django.log',
            'maxBytes': 1024 * 1024 * 100,  # 100MB
            'backupCount': 10,
            'formatter': 'verbose',
        },
        'error_file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/learnflow/errors.log',
            'maxBytes': 1024 * 1024 * 100,
            'backupCount': 10,
            'formatter': 'verbose',
            'level': 'ERROR',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file', 'error_file'],
            'level': 'INFO',
            'propagate': False,
        },
        'learnflow': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'stripe': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}
```

### 11.2 Application Monitoring

```python
# Sentry integration for error tracking
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="https://your-sentry-dsn@sentry.io/project-id",
    integrations=[DjangoIntegration()],
    traces_sample_rate=0.1,
    send_default_pii=False,
    environment='production',
)

# Health check endpoint
from django.http import JsonResponse

def health_check(request):
    """Health check for monitoring"""
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute('SELECT 1')
        
        cache_result = cache.get('health_check_test')
        
        return JsonResponse({
            'status': 'healthy',
            'database': 'ok',
            'cache': 'ok' if cache_result is not None else 'ok',
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return JsonResponse({
            'status': 'unhealthy',
            'error': str(e)
        }, status=500)
```

---

## Summary

This comprehensive Django backend implementation plan provides:

1. **Complete Architecture**: Modular, scalable Django structure aligned with the React frontend
2. **Database Design**: Normalized schema supporting all features (courses, enrollments, orders, payments)
3. **RESTful API**: Detailed endpoint specifications with request/response examples
4. **Authentication**: JWT-based auth with refresh token rotation
5. **Security**: PCI DSS compliance, input validation, rate limiting
6. **Performance**: Caching, database optimization, Celery async tasks
7. **Deployment**: Docker containerization, production checklist
8. **Monitoring**: Logging, error tracking, health checks

The backend is designed to seamlessly integrate with the LearnFlow React frontend, supporting all user features including course discovery, enrollment, cart checkout, payment processing, and progress tracking.

---

**Next Steps for Implementation**:

1. Set up Django project structure
2. Implement core models and migrations
3. Create serializers and views
4. Integrate Stripe payment processing
5. Set up Celery for async tasks
6. Implement Redis caching
7. Configure Docker and deployment
8. Write comprehensive tests
9. Set up monitoring and logging
10. Deploy to production infrastructure

