# LearnFlow - API Integration & Testing Guide

**Version**: 1.0  
**Last Updated**: January 2026

---

## Quick Reference

### Base URL
```
Development: http://localhost:8000/api/v1
Production: https://api.learnflow.com/api/v1
```

### Authentication
```
Header: Authorization: Bearer {access_token}
Token Type: JWT (JSON Web Token)
Token Lifetime: 15 minutes
Refresh Token: 7 days
```

---

## Authentication Flow - Complete Example

### 1. User Registration

**Request**:
```bash
curl -X POST http://localhost:8000/api/v1/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

**Response (201)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_instructor": false,
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM2NzI0MTAwLCJpYXQiOjE2MzY3MjM4MDAsImp0aSI6IjExZTMyOTAwLWE0MGEtNGM3Ni04YzJiLWUwOGI5YjQxODc4YyIsInVzZXJfaWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAifQ.example_signature_here",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzNzMyOTgwMCwiaWF0IjoxNjM2NzI0MDAwLCJqdGkiOiJmZjc1YTMwMC1hNDBhLTRkYzYtOGMyYi1lMDhiOWI0MTg3ZjMiLCJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIn0.another_signature_here"
}
```

### 2. User Login

**Request**:
```bash
curl -X POST http://localhost:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePassword123!"
  }'
```

**Response (200)**:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_instructor": false
  }
}
```

### 3. Get Current User

**Request**:
```bash
curl -X GET http://localhost:8000/api/v1/auth/me/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

**Response (200)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_instructor": false,
  "profile": {
    "bio": "Software developer",
    "profile_picture": "https://api.learnflow.com/media/profiles/john_doe.jpg",
    "phone": "+1 (555) 123-4567",
    "country": "United States",
    "timezone": "America/Los_Angeles",
    "total_hours_learned": 248,
    "courses_completed": 5,
    "certificates_earned": 5,
    "current_streak_days": 15,
    "last_activity": "2026-01-27T14:30:00Z"
  }
}
```

---

## Course Discovery - Complete Examples

### 1. Get All Courses with Filters

**Basic Request** (Get first page):
```bash
curl "http://localhost:8000/api/v1/courses/" \
  -H "Authorization: Bearer {token}"
```

**With Filtering**:
```bash
curl "http://localhost:8000/api/v1/courses/?category=Development&level=beginner&min_price=0&max_price=100&rating_min=4.0&page=1" \
  -H "Authorization: Bearer {token}"
```

**With Search and Sorting**:
```bash
curl "http://localhost:8000/api/v1/courses/?search=web%20development&ordering=-rating&page_size=20" \
  -H "Authorization: Bearer {token}"
```

**Full Response (200)**:
```json
{
  "count": 1234,
  "next": "http://localhost:8000/api/v1/courses/?page=2",
  "previous": null,
  "total_pages": 62,
  "current_page": 1,
  "results": [
    {
      "id": "a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c",
      "title": "Complete Web Development Bootcamp 2026",
      "slug": "complete-web-development-bootcamp-2026",
      "short_description": "From Zero to Full-Stack Developer - HTML, CSS, JavaScript, React, Node.js, and More",
      "category": "Development",
      "instructor": {
        "id": "instr-001",
        "first_name": "Angela",
        "last_name": "Yu"
      },
      "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      "rating": 4.8,
      "rating_count": 45280,
      "student_count": 234567,
      "review_count": 45280,
      "duration_hours": 52,
      "level": "Beginner",
      "language": "English",
      "price": 89.99,
      "original_price": 129.99,
      "discount_percent": 30,
      "is_bestseller": true,
      "is_new": false,
      "is_published": true,
      "last_updated": "2026-01-20T10:00:00Z",
      "enrolled": false,
      "in_cart": false,
      "in_wishlist": false
    },
    {
      "id": "b2c3d4e5-f6a7-48b9-0c1d-2e3f4a5b6c7d",
      "title": "React & Next.js - The Complete Guide",
      "slug": "react-nextjs-complete-guide",
      "short_description": "Learn React and Next.js from scratch and build production-ready applications",
      "category": "Development",
      "instructor": {
        "id": "instr-002",
        "first_name": "Maximilian",
        "last_name": "Schwarzmüller"
      },
      "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      "rating": 4.9,
      "rating_count": 41230,
      "student_count": 198765,
      "review_count": 41230,
      "duration_hours": 48,
      "level": "Intermediate",
      "language": "English",
      "price": 89.99,
      "original_price": 129.99,
      "discount_percent": 30,
      "is_bestseller": false,
      "is_new": true,
      "is_published": true,
      "last_updated": "2026-01-25T10:00:00Z",
      "enrolled": true,
      "in_cart": false,
      "in_wishlist": false
    }
  ]
}
```

### 2. Get Course Detail

**Request**:
```bash
curl "http://localhost:8000/api/v1/courses/a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c/" \
  -H "Authorization: Bearer {token}"
```

**Response (200)** - Extensive Detail:
```json
{
  "id": "a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c",
  "title": "Complete Web Development Bootcamp 2026",
  "slug": "complete-web-development-bootcamp-2026",
  "description": "Learn web development from complete beginner to full-stack developer. This comprehensive bootcamp covers everything you need to know to start a career in web development...",
  "short_description": "From Zero to Full-Stack Developer - HTML, CSS, JavaScript, React, Node.js, and More",
  "category": "Development",
  "instructor": {
    "id": "instr-001",
    "first_name": "Angela",
    "last_name": "Yu",
    "email": "angela@example.com",
    "profile": {
      "bio": "10+ years of experience teaching web development to over 500,000 students worldwide",
      "profile_picture": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      "courses_count": 12,
      "students_count": 523456,
      "rating": 4.8
    }
  },
  "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
  "preview_video_url": "https://player.vimeo.com/video/xxxxx",
  "rating": 4.8,
  "rating_count": 45280,
  "student_count": 234567,
  "review_count": 45280,
  "duration_hours": 52,
  "level": "Beginner",
  "language": "English",
  "price": 89.99,
  "original_price": 129.99,
  "discount_percent": 30,
  "is_bestseller": true,
  "is_new": false,
  "is_published": true,
  "last_updated": "2026-01-20T10:00:00Z",
  "certificate_included": true,
  
  "outcomes": [
    "Build 16+ real-world projects including full-stack web applications",
    "Master HTML5, CSS3, JavaScript, React, and Node.js from scratch",
    "Understand modern web development workflows and best practices",
    "Deploy your applications to production using cloud platforms",
    "Learn responsive design and mobile-first development",
    "Build RESTful APIs and work with databases"
  ],
  
  "requirements": [
    "No programming experience needed - beginner friendly",
    "A computer with internet connection",
    "Willingness to learn and practice coding"
  ],
  
  "curriculum": [
    {
      "id": "curr-001",
      "title": "Introduction to Web Development",
      "description": "Get started with the fundamentals of web development",
      "order": 1,
      "total_lessons": 12,
      "total_duration_minutes": 120,
      "lessons": [
        {
          "id": "lesson-001",
          "title": "What is Web Development?",
          "description": "Learn what web development is and what it takes to become a developer",
          "duration_minutes": 10,
          "order": 1,
          "is_preview": true,
          "video_url": "https://player.vimeo.com/video/xxxxx",
          "resources": [
            "https://..../handout.pdf",
            "https://..../code-samples.zip"
          ],
          "completed": false,
          "watch_time_seconds": 0
        },
        {
          "id": "lesson-002",
          "title": "Setting Up Your Development Environment",
          "description": "Install and configure the tools you'll need",
          "duration_minutes": 15,
          "order": 2,
          "is_preview": true,
          "video_url": "https://player.vimeo.com/video/xxxxx",
          "resources": [],
          "completed": false,
          "watch_time_seconds": 0
        }
      ]
    },
    {
      "id": "curr-002",
      "title": "HTML & CSS Fundamentals",
      "description": "Master the building blocks of web pages",
      "order": 2,
      "total_lessons": 24,
      "total_duration_minutes": 360,
      "lessons": [...]
    }
  ],
  
  "reviews": {
    "count": 45280,
    "average_rating": 4.8,
    "distribution": {
      "5": 35000,
      "4": 8000,
      "3": 1500,
      "2": 500,
      "1": 280
    },
    "recent": [
      {
        "id": "review-001",
        "author": {
          "id": "user-001",
          "first_name": "John",
          "last_name": "Smith",
          "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
        },
        "rating": 5,
        "title": "Best course on the internet!",
        "comment": "Absolutely fantastic course! Angela explains everything so clearly and the projects are engaging and practical. I went from zero coding knowledge to building my own web applications in just 3 months.",
        "helpful_count": 234,
        "created_at": "2 days ago"
      },
      {
        "id": "review-002",
        "author": {
          "id": "user-002",
          "first_name": "Sarah",
          "last_name": "Johnson",
          "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
        },
        "rating": 5,
        "title": "Life changing course",
        "comment": "Best investment I've made in my career. The course is comprehensive, up-to-date, and the support from the instructor is amazing.",
        "helpful_count": 189,
        "created_at": "1 week ago"
      }
    ]
  },
  
  "user_status": {
    "enrolled": false,
    "progress": null,
    "in_cart": false,
    "in_wishlist": false,
    "enrollment_date": null
  }
}
```

### 3. Get Course Reviews

**Request** (Paginated, filtered by rating):
```bash
curl "http://localhost:8000/api/v1/courses/a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c/reviews/?page=1&page_size=10&rating=5&ordering=-helpful_count" \
  -H "Authorization: Bearer {token}"
```

**Response (200)**:
```json
{
  "count": 34500,
  "next": "http://localhost:8000/api/v1/courses/.../reviews/?page=2",
  "previous": null,
  "results": [
    {
      "id": "review-001",
      "author": {
        "id": "user-001",
        "first_name": "John",
        "last_name": "Smith",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
      },
      "rating": 5,
      "title": "Best course on the internet!",
      "comment": "Absolutely fantastic course!",
      "helpful_count": 234,
      "created_at": "2 days ago"
    }
  ]
}
```

### 4. Post Course Review

**Request**:
```bash
curl -X POST "http://localhost:8000/api/v1/courses/a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c/reviews/" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "title": "Excellent course!",
    "comment": "I learned so much from this course. The instructor is fantastic and explains everything clearly."
  }'
```

**Response (201)**:
```json
{
  "id": "review-new-001",
  "rating": 5,
  "title": "Excellent course!",
  "comment": "I learned so much from this course...",
  "helpful_count": 0,
  "created_at": "2026-01-27T15:30:00Z"
}
```

---

## Shopping Cart - Complete Examples

### 1. Get Cart

**Request**:
```bash
curl "http://localhost:8000/api/v1/cart/" \
  -H "Authorization: Bearer {token}"
```

**Response (200)**:
```json
{
  "id": "cart-001",
  "items": [
    {
      "id": "item-001",
      "course": {
        "id": "course-001",
        "title": "Complete Web Development Bootcamp 2026",
        "price": 89.99,
        "original_price": 129.99,
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80"
      },
      "added_at": "2026-01-27T10:00:00Z"
    },
    {
      "id": "item-002",
      "course": {
        "id": "course-002",
        "title": "UI/UX Design Fundamentals",
        "price": 79.99,
        "original_price": 119.99,
        "thumbnail": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80"
      },
      "added_at": "2026-01-27T11:00:00Z"
    }
  ],
  "total_items": 2,
  "total_price": 169.98,
  "total_original_price": 249.98,
  "total_discount": 80.00,
  "updated_at": "2026-01-27T15:30:00Z"
}
```

### 2. Add to Cart

**Request**:
```bash
curl -X POST "http://localhost:8000/api/v1/cart/items/" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": "b2c3d4e5-f6a7-48b9-0c1d-2e3f4a5b6c7d"
  }'
```

**Response (201)**:
```json
{
  "id": "item-003",
  "course": {
    "id": "b2c3d4e5-f6a7-48b9-0c1d-2e3f4a5b6c7d",
    "title": "React & Next.js - The Complete Guide",
    "price": 89.99
  },
  "added_at": "2026-01-27T16:00:00Z"
}
```

**Possible Error (409 - Conflict)**:
```json
{
  "error": {
    "code": "ITEM_ALREADY_IN_CART",
    "message": "This course is already in your cart",
    "status": 409
  }
}
```

### 3. Remove from Cart

**Request**:
```bash
curl -X DELETE "http://localhost:8000/api/v1/cart/items/item-003/" \
  -H "Authorization: Bearer {token}"
```

**Response (204)** - No content returned

### 4. Clear Cart

**Request**:
```bash
curl -X DELETE "http://localhost:8000/api/v1/cart/" \
  -H "Authorization: Bearer {token}"
```

**Response (204)** - Cart cleared

---

## Orders & Checkout - Complete Examples

### 1. Create Order from Cart

**Request**:
```bash
curl -X POST "http://localhost:8000/api/v1/orders/create-from-cart/" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "billing_address": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "address_line1": "123 Main Street",
      "address_line2": "Apt 4B",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94105",
      "country": "US",
      "phone": "+1 (555) 123-4567"
    }
  }'
```

**Response (201)**:
```json
{
  "id": "order-001",
  "order_number": "ORD-2026-00001",
  "status": "pending",
  "created_at": "2026-01-27T16:05:00Z",
  "total_amount": 169.98,
  "subtotal": 169.98,
  "discount_amount": 0,
  "items_count": 2,
  "items": [
    {
      "id": "order-item-001",
      "course": {
        "id": "course-001",
        "title": "Complete Web Development Bootcamp 2026"
      },
      "price_at_purchase": 89.99
    },
    {
      "id": "order-item-002",
      "course": {
        "id": "course-002",
        "title": "UI/UX Design Fundamentals"
      },
      "price_at_purchase": 79.99
    }
  ],
  "billing_address": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "address_line1": "123 Main Street",
    "address_line2": "Apt 4B",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94105",
    "country": "US",
    "phone": "+1 (555) 123-4567"
  }
}
```

### 2. Create Payment Intent (Stripe)

**Request**:
```bash
curl -X POST "http://localhost:8000/api/v1/payments/create-payment-intent/" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "order-001"
  }'
```

**Response (201)**:
```json
{
  "client_secret": "pi_1234567890_secret_abcdefghijklmnop",
  "publishable_key": "pk_live_1234567890abcdefghij",
  "amount": 16998,
  "currency": "usd",
  "order_id": "order-001"
}
```

### 3. Confirm Payment

**Frontend Implementation (using Stripe.js)**:
```javascript
// After user confirms payment in Stripe modal
const { error, paymentIntent } = await stripe.confirmCardPayment(
  clientSecret,
  {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: billingAddress.first_name + ' ' + billingAddress.last_name,
        email: billingAddress.email,
      }
    }
  }
);

if (error) {
  console.error('Payment failed:', error);
} else if (paymentIntent.status === 'succeeded') {
  // Confirm with backend
  const response = await apiClient.post('/payments/confirm-payment/', {
    order_id: orderId,
    payment_intent_id: paymentIntent.id
  });
}
```

**Backend Confirmation Request**:
```bash
curl -X POST "http://localhost:8000/api/v1/payments/confirm-payment/" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "order-001",
    "payment_intent_id": "pi_1234567890_secret_abcdefghijklmnop"
  }'
```

**Response (200)**:
```json
{
  "order_id": "order-001",
  "status": "completed",
  "message": "Payment processed successfully",
  "receipt_url": "https://api.learnflow.com/receipts/order-001.pdf",
  "courses_now_available": [
    {
      "id": "course-001",
      "title": "Complete Web Development Bootcamp 2026",
      "access_url": "/dashboard/courses/course-001"
    },
    {
      "id": "course-002",
      "title": "UI/UX Design Fundamentals",
      "access_url": "/dashboard/courses/course-002"
    }
  ]
}
```

### 4. Get Orders

**Request**:
```bash
curl "http://localhost:8000/api/v1/orders/?status=completed&page=1&page_size=10" \
  -H "Authorization: Bearer {token}"
```

**Response (200)**:
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "order-001",
      "order_number": "ORD-2026-00001",
      "status": "completed",
      "created_at": "2026-01-27T16:05:00Z",
      "completed_at": "2026-01-27T16:10:00Z",
      "total_amount": 169.98,
      "items_count": 2,
      "items": [
        {
          "id": "order-item-001",
          "course": {
            "id": "course-001",
            "title": "Complete Web Development Bootcamp 2026"
          },
          "price_at_purchase": 89.99
        }
      ]
    }
  ]
}
```

---

## Enrollments & Learning - Complete Examples

### 1. Get My Enrollments

**Request**:
```bash
curl "http://localhost:8000/api/v1/enrollments/?status=active&page=1&page_size=10" \
  -H "Authorization: Bearer {token}"
```

**Response (200)**:
```json
{
  "count": 3,
  "results": [
    {
      "id": "enrollment-001",
      "course": {
        "id": "course-001",
        "title": "Complete Web Development Bootcamp 2026",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        "duration_hours": 52,
        "level": "Beginner"
      },
      "progress_percent": 45,
      "lessons_completed": 18,
      "total_lessons": 40,
      "enrolled_at": "2025-06-15T10:00:00Z",
      "is_completed": false,
      "certificate_url": null,
      "current_lesson": {
        "id": "lesson-015",
        "title": "JavaScript Fundamentals - Part 1",
        "order": 15
      }
    },
    {
      "id": "enrollment-002",
      "course": {
        "id": "course-002",
        "title": "UI/UX Design Fundamentals",
        "thumbnail": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        "duration_hours": 24,
        "level": "Intermediate"
      },
      "progress_percent": 78,
      "lessons_completed": 31,
      "total_lessons": 40,
      "enrolled_at": "2025-08-20T10:00:00Z",
      "is_completed": false,
      "certificate_url": null,
      "current_lesson": {
        "id": "lesson-032",
        "title": "Advanced Design Systems",
        "order": 32
      }
    }
  ]
}
```

### 2. Get Enrollment Detail

**Request**:
```bash
curl "http://localhost:8000/api/v1/enrollments/enrollment-001/" \
  -H "Authorization: Bearer {token}"
```

**Response (200)**:
```json
{
  "id": "enrollment-001",
  "course": {
    "id": "course-001",
    "title": "Complete Web Development Bootcamp 2026",
    "instructor": {
      "id": "instr-001",
      "first_name": "Angela",
      "last_name": "Yu"
    },
    "curriculum": [
      {
        "id": "curr-001",
        "title": "Introduction to Web Development",
        "lessons": [
          {
            "id": "lesson-001",
            "title": "What is Web Development?",
            "duration_minutes": 10,
            "order": 1,
            "is_preview": true,
            "video_url": "https://player.vimeo.com/video/xxxxx",
            "completed": false,
            "watch_time_seconds": 0
          },
          {
            "id": "lesson-002",
            "title": "Setting Up Your Development Environment",
            "duration_minutes": 15,
            "order": 2,
            "is_preview": true,
            "completed": true,
            "watch_time_seconds": 900
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

### 3. Mark Lesson as Complete

**Request**:
```bash
curl -X POST "http://localhost:8000/api/v1/enrollments/enrollment-001/mark-lesson-complete/" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "lesson_id": "lesson-015"
  }'
```

**Response (200)**:
```json
{
  "lesson_id": "lesson-015",
  "enrollment_id": "enrollment-001",
  "is_completed": true,
  "completed_at": "2026-01-27T17:00:00Z",
  "enrollment_progress": 46,
  "message": "Lesson completed! You've completed 19 out of 40 lessons."
}
```

### 4. Enroll in Course

**Request**:
```bash
curl -X POST "http://localhost:8000/api/v1/courses/course-003/enroll/" \
  -H "Authorization: Bearer {token}"
```

**Response (201)**:
```json
{
  "id": "enrollment-003",
  "course_id": "course-003",
  "course_title": "Python Programming Masterclass",
  "enrolled_at": "2026-01-27T17:05:00Z",
  "progress_percent": 0,
  "lessons_completed": 0,
  "total_lessons": 35,
  "is_completed": false,
  "message": "You are now enrolled in Python Programming Masterclass"
}
```

---

## Dashboard - Complete Examples

### 1. Get Dashboard Stats

**Request**:
```bash
curl "http://localhost:8000/api/v1/dashboard/stats/" \
  -H "Authorization: Bearer {token}"
```

**Response (200)**:
```json
{
  "courses_enrolled": 12,
  "courses_completed": 5,
  "total_hours_learned": 248.5,
  "current_streak_days": 15,
  "average_rating_given": 4.6,
  "certificates_earned": 5,
  "last_activity": "2026-01-27T17:00:00Z",
  "this_month_hours": 22.5,
  "goals": {
    "target_hours_per_month": 40,
    "progress_percent": 56
  }
}
```

### 2. Get Continue Learning

**Request**:
```bash
curl "http://localhost:8000/api/v1/dashboard/continue-learning/" \
  -H "Authorization: Bearer {token}"
```

**Response (200)**:
```json
{
  "results": [
    {
      "enrollment_id": "enrollment-001",
      "course": {
        "id": "course-001",
        "title": "Complete Web Development Bootcamp 2026",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        "instructor": "Dr. Angela Yu"
      },
      "progress_percent": 45,
      "lessons_completed": 18,
      "total_lessons": 40,
      "last_accessed": "2026-01-27T14:30:00Z",
      "time_spent_hours": 24.5,
      "current_lesson": {
        "id": "lesson-015",
        "title": "JavaScript Fundamentals - Part 1",
        "order": 15,
        "duration_minutes": 32
      },
      "estimated_completion_date": "2026-03-15"
    },
    {
      "enrollment_id": "enrollment-002",
      "course": {
        "id": "course-002",
        "title": "UI/UX Design Fundamentals",
        "thumbnail": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        "instructor": "Sarah Chen"
      },
      "progress_percent": 78,
      "lessons_completed": 31,
      "total_lessons": 40,
      "last_accessed": "2026-01-26T10:00:00Z",
      "time_spent_hours": 19.3,
      "current_lesson": {
        "id": "lesson-032",
        "title": "Advanced Design Systems",
        "order": 32,
        "duration_minutes": 45
      },
      "estimated_completion_date": "2026-02-10"
    }
  ]
}
```

### 3. Get Recommendations

**Request**:
```bash
curl "http://localhost:8000/api/v1/dashboard/recommendations/" \
  -H "Authorization: Bearer {token}"
```

**Response (200)**:
```json
{
  "results": [
    {
      "id": "course-004",
      "title": "Advanced React Patterns",
      "slug": "advanced-react-patterns",
      "instructor": {
        "id": "instr-003",
        "first_name": "Kent",
        "last_name": "C. Dodds"
      },
      "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      "rating": 4.9,
      "rating_count": 15230,
      "student_count": 67890,
      "duration_hours": 32,
      "level": "Advanced",
      "price": 99.99,
      "original_price": null,
      "is_new": true,
      "recommendation_reason": "You completed Web Development. This is a natural next step.",
      "relevance_score": 0.95
    }
  ]
}
```

---

## Error Handling Examples

### 1. Unauthorized Access (Missing/Invalid Token)

**Request** (without auth header):
```bash
curl "http://localhost:8000/api/v1/dashboard/stats/"
```

**Response (401)**:
```json
{
  "error": {
    "code": "AUTHENTICATION_REQUIRED",
    "message": "Authentication credentials were not provided.",
    "status": 401
  }
}
```

### 2. Invalid Token

**Request** (with expired token):
```bash
curl "http://localhost:8000/api/v1/dashboard/stats/" \
  -H "Authorization: Bearer expired_token_here"
```

**Response (401)**:
```json
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Token is invalid or expired",
    "status": 401
  }
}
```

### 3. Forbidden Access

**Request** (non-instructor trying to create course):
```bash
curl -X POST "http://localhost:8000/api/v1/courses/" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{ "title": "My Course" }'
```

**Response (403)**:
```json
{
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "You do not have permission to perform this action.",
    "status": 403
  }
}
```

### 4. Validation Error

**Request** (missing required fields):
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register/" \
  -H "Content-Type: application/json" \
  -d '{ "email": "test@example.com" }'
```

**Response (422)**:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "status": 422,
    "details": {
      "password": ["This field is required."],
      "first_name": ["This field is required."],
      "last_name": ["This field is required."]
    }
  }
}
```

### 5. Resource Not Found

**Request**:
```bash
curl "http://localhost:8000/api/v1/courses/invalid-course-id/" \
  -H "Authorization: Bearer {token}"
```

**Response (404)**:
```json
{
  "error": {
    "code": "COURSE_NOT_FOUND",
    "message": "The requested course does not exist",
    "status": 404
  }
}
```

### 6. Rate Limiting

**Request** (too many requests):
```bash
curl "http://localhost:8000/api/v1/auth/login/" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "wrong"}'
# ... repeated multiple times
```

**Response (429)**:
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Request rate limit exceeded. Please try again in 3600 seconds.",
    "status": 429,
    "retry_after": 3600
  }
}
```

---

## Testing the API with cURL, Postman, or Python

### Python Example

```python
import requests
from datetime import datetime

BASE_URL = "http://localhost:8000/api/v1"

class LearnFlowAPIClient:
    def __init__(self):
        self.session = requests.Session()
        self.access_token = None
        self.refresh_token = None
    
    def register(self, email, password, first_name, last_name):
        """Register a new user"""
        response = self.session.post(
            f"{BASE_URL}/auth/register/",
            json={
                "email": email,
                "password": password,
                "first_name": first_name,
                "last_name": last_name
            }
        )
        if response.status_code == 201:
            data = response.json()
            self.access_token = data['access_token']
            self.refresh_token = data['refresh_token']
            self.session.headers.update({
                'Authorization': f'Bearer {self.access_token}'
            })
        return response.json()
    
    def login(self, email, password):
        """Login user"""
        response = self.session.post(
            f"{BASE_URL}/auth/login/",
            json={"email": email, "password": password}
        )
        if response.status_code == 200:
            data = response.json()
            self.access_token = data['access_token']
            self.refresh_token = data['refresh_token']
            self.session.headers.update({
                'Authorization': f'Bearer {self.access_token}'
            })
        return response.json()
    
    def get_courses(self, page=1, category=None, level=None, search=None):
        """Get courses with filters"""
        params = {
            'page': page,
            'page_size': 20,
        }
        if category:
            params['category'] = category
        if level:
            params['level'] = level
        if search:
            params['search'] = search
        
        response = self.session.get(
            f"{BASE_URL}/courses/",
            params=params
        )
        return response.json()
    
    def get_course_detail(self, course_id):
        """Get course detail"""
        response = self.session.get(f"{BASE_URL}/courses/{course_id}/")
        return response.json()
    
    def add_to_cart(self, course_id):
        """Add course to cart"""
        response = self.session.post(
            f"{BASE_URL}/cart/items/",
            json={"course_id": course_id}
        )
        return response.json()
    
    def get_cart(self):
        """Get shopping cart"""
        response = self.session.get(f"{BASE_URL}/cart/")
        return response.json()
    
    def create_order(self, billing_address):
        """Create order from cart"""
        response = self.session.post(
            f"{BASE_URL}/orders/create-from-cart/",
            json={"billing_address": billing_address}
        )
        return response.json()
    
    def get_dashboard_stats(self):
        """Get dashboard statistics"""
        response = self.session.get(f"{BASE_URL}/dashboard/stats/")
        return response.json()
    
    def enroll_course(self, course_id):
        """Enroll in a course"""
        response = self.session.post(
            f"{BASE_URL}/courses/{course_id}/enroll/"
        )
        return response.json()

# Example usage
if __name__ == "__main__":
    client = LearnFlowAPIClient()
    
    # Register
    print("Registering...")
    reg_response = client.register(
        email="john.doe@example.com",
        password="SecurePassword123!",
        first_name="John",
        last_name="Doe"
    )
    print(f"Registered: {reg_response}")
    
    # Get courses
    print("\nGetting courses...")
    courses = client.get_courses(category="Development", level="beginner")
    print(f"Found {courses['count']} courses")
    
    # Add to cart
    if courses['results']:
        course_id = courses['results'][0]['id']
        print(f"\nAdding course {course_id} to cart...")
        cart_item = client.add_to_cart(course_id)
        print(f"Added to cart: {cart_item}")
    
    # Get cart
    print("\nGetting cart...")
    cart = client.get_cart()
    print(f"Cart total: ${cart['total_price']}")
    
    # Get dashboard
    print("\nGetting dashboard stats...")
    stats = client.get_dashboard_stats()
    print(f"Enrolled courses: {stats['courses_enrolled']}")
    print(f"Completed courses: {stats['courses_completed']}")
    print(f"Total hours learned: {stats['total_hours_learned']}")
```

---

## Frontend Integration Checklist

- [ ] Setup API client with axios/fetch
- [ ] Implement JWT token storage and retrieval
- [ ] Setup request interceptors for Authorization header
- [ ] Setup response interceptors for token refresh
- [ ] Create service layer for API calls
- [ ] Implement error handling and user feedback
- [ ] Setup environment variables for API URLs
- [ ] Implement loading states
- [ ] Implement pagination
- [ ] Implement search and filtering
- [ ] Implement cart functionality
- [ ] Integrate Stripe payment
- [ ] Track user session
- [ ] Setup analytics tracking
- [ ] Implement offline support (optional)
- [ ] Add request/response logging for debugging

---

## Deployment & Production Ready

- [ ] Use HTTPS in production
- [ ] Configure CORS properly for frontend domain
- [ ] Implement rate limiting
- [ ] Setup request logging and monitoring
- [ ] Configure database backups
- [ ] Setup error tracking (Sentry)
- [ ] Implement API versioning
- [ ] Document API with Swagger/OpenAPI
- [ ] Setup CI/CD pipeline
- [ ] Load testing and optimization
- [ ] Security audit
- [ ] Performance monitoring

