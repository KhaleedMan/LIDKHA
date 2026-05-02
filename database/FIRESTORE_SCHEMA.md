# LIDKHA Firestore Database Schema

## Collections Overview

### 1. users
```
{
  uid: string (Firebase UID)
  email: string
  fullname: string
  createdAt: timestamp
  role: string ("student", "instructor", "admin")
  profileImage: string (URL)
  bio: string
}
```

### 2. courses
```
{
  id: auto-generated
  name: string
  description: string
  price: number
  instructorId: string (reference to users)
  category: string
  thumbnail: string (URL)
  createdAt: timestamp
  updatedAt: timestamp
  status: string ("draft", "published")
}
```

### 3. videos
```
{
  id: auto-generated
  courseId: string (reference to courses)
  title: string
  description: string
  videoUrl: string (Firebase Storage)
  duration: number (seconds)
  order: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

### 4. subscribers
```
{
  id: auto-generated
  uid: string (Firebase UID)
  email: string
  fullname: string
  subscribedAt: timestamp
  active: boolean
  unsubscribedAt: timestamp (optional)
}
```

### 5. admins
```
{
  id: auto-generated
  email: string
  role: string ("owner", "editor", "viewer", "moderator")
  grantedAt: timestamp
  grantedBy: string (email of owner)
  permissions: array
  active: boolean
}
```

### 6. enrollments
```
{
  id: auto-generated
  userId: string (reference to users)
  courseId: string (reference to courses)
  enrolledAt: timestamp
  progress: number (0-100)
  completed: boolean
  completedAt: timestamp (optional)
}
```

### 7. emailLogs
```
{
  id: auto-generated
  to: array of emails
  subject: string
  body: string
  sentAt: timestamp
  status: string ("sent", "failed")
  error: string (optional)
}
```

### 8. settings
```
{
  id: "platform"
  name: string
  description: string
  logo: string (URL)
  contactEmail: string
  updatedAt: timestamp
}
```

## Security Rules

See `storage.rules` and Firebase Console for detailed security rules.

## Indexes

- users: email (for unique constraint)
- courses: category, status, createdAt
- subscribers: email, active, subscribedAt
- admins: email, active
- enrollments: userId, courseId
