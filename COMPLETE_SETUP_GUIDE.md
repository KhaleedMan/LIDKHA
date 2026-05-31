# SKILWHOP - Complete Setup Guide

This guide covers all features added to the SKILWHOP platform including Firebase integration, Stripe payments, email notifications, advanced landing page, and automated testing.

## 📋 Table of Contents

1. [Features Added](#features-added)
2. [Firebase Setup](#firebase-setup)
3. [Stripe Payment Integration](#stripe-payment-integration)
4. [Email Notifications](#email-notifications)
5. [Video Upload System](#video-upload-system)
6. [Testing Setup](#testing-setup)
7. [Deployment](#deployment)

---

## ✨ Features Added

### 1. **Firebase Real-Time Database** 🔥
- User authentication with email/password
- Firestore database for storing:
  - User profiles
  - Courses and lessons
  - Enrollments
  - Referrals
- Cloud Storage for video uploads
- Real-time sync across devices

### 2. **Stripe Payment Integration** 💳
- Secure payment processing
- Support for card payments
- Payment modal with form validation
- Multiple pricing tiers
- Invoice tracking

### 3. **Email Notifications** 📧
- Welcome emails for new users
- Course enrollment confirmations
- Referral bonus notifications
- Contact form responses
- Powered by EmailJS (no backend needed)

### 4. **Enhanced Video Upload** 📹
- Direct upload to Firebase Storage
- Progress tracking
- Thumbnail support
- Video management in admin dashboard

### 5. **Optimized Landing Page** 🚀
- SEO-friendly design
- Conversion optimization
- Scroll animations
- Pricing showcase
- FAQ section
- Testimonials
- Mobile-responsive

### 6. **Automated Testing** 🧪
- Unit tests for services
- Integration tests
- Coverage reports
- Vitest configuration

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Name: `skilwhop-learning-platform`
4. Enable Analytics (optional)
5. Create project

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method

### Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create Database**
3. Select **Start in Test Mode** (change to production rules later)
4. Choose region closest to your users

### Step 4: Create Storage Bucket

1. Go to **Storage**
2. Click **Get Started**
3. Accept default settings
4. Storage rules will be deployed later

### Step 5: Get Firebase Config

1. Click **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click **Web** icon
4. Copy the config object

### Step 6: Update Environment Variables

Create `.env.local` file in `client/` folder:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

### Step 7: Update Firestore Rules

1. Go to **Firestore Database** → **Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth != null; // Anyone can see public profiles
    }
    
    // Courses are public, only admins can write
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
      
      match /lessons/{lessonId} {
        allow read: if request.auth != null;
        allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
      }
    }
    
    // Enrollments - users can read their own
    match /enrollments/{enrollmentId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if request.auth.uid == resource.data.userId;
    }
    
    // Referrals - users can read their own
    match /referrals/{referralId} {
      allow read: if request.auth.uid == resource.data.referrerId;
      allow write: if request.auth.uid == resource.data.referrerId;
    }
  }
}
```

3. Click **Publish**

### Step 8: Update Storage Rules

1. Go to **Storage** → **Rules**
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /courses/{courseId}/lessons/{lessonId}/video_{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid != null && 
                      get(/databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    match /courses/{courseId}/thumbnail {
      allow read: if request.auth != null;
      allow write: if request.auth.uid != null && 
                      get(/databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

3. Click **Publish**

---

## 💳 Stripe Payment Integration

### Step 1: Create Stripe Account

1. Go to [Stripe](https://stripe.com)
2. Sign up or log in
3. Complete your account setup

### Step 2: Get API Keys

1. Go to **Developers** → **API Keys**
2. Copy your **Publishable Key**
3. Add to `.env.local`:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
```

### Step 3: Install Stripe Dependencies

```bash
cd client
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Step 4: Import Payment Modal

In your app, import and use:

```jsx
import StripePaymentModal from './components/StripePaymentModal';

// In your component
const [paymentOpen, setPaymentOpen] = useState(false);

<StripePaymentModal
  isOpen={paymentOpen}
  coursePrice={9999}
  courseName="Make Money with Facebook & WhatsApp"
  onClose={() => setPaymentOpen(false)}
  onSuccess={(paymentIntentId) => {
    console.log('Payment successful!', paymentIntentId);
    // Handle successful payment
  }}
/>
```

### Step 5: Backend Payment Intent (Optional)

If you have a backend, create a `/api/create-payment-intent` endpoint:

```javascript
// Node.js/Express example
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // in cents
      currency: 'ngn', // Nigerian Naira
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

---

## 📧 Email Notifications

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com)
2. Sign up with Gmail
3. Connect your Gmail account

### Step 2: Create Email Service

1. Go to **Email Services**
2. Click **Create New Service**
3. Select **Gmail**
4. Name it "Gmail Service"
5. Save Service ID

### Step 3: Create Email Templates

Create 3 templates in EmailJS:

**Template 1: Welcome Email**
- Template ID: `template_welcome`
- Subject: `Welcome to SKILWHOP, {{user_name}}!`
- Content:
```
Hi {{user_name}},

Welcome to SKILWHOP! We're excited to have you on board.

Start your first course now and begin your journey to earning online income.

Best regards,
SKILWHOP Team
```

**Template 2: Course Enrollment**
- Template ID: `template_course_enrolled`
- Subject: `You're Enrolled in {{course_name}}!`
- Content:
```
Hi {{user_name}},

Congratulations! You've enrolled in {{course_name}}.

Start learning now: https://skilwhop.com.ng/dashboard
```

**Template 3: Referral Bonus**
- Template ID: `template_referral`
- Subject: `You Earned ₦{{commission_amount}} from {{referred_user}}!`
- Content:
```
Hi {{user_name}},

Great news! {{referred_user}} signed up using your referral link.

You've earned ₦{{commission_amount}} commission!

Check your earnings: https://skilwhop.com.ng/dashboard/affiliate
```

### Step 4: Update Environment Variables

```env
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
VITE_EMAILJS_SERVICE_ID=service_XXXXX
VITE_EMAILJS_TEMPLATE_WELCOME=template_welcome
VITE_EMAILJS_TEMPLATE_COURSE_ENROLLED=template_course_enrolled
VITE_EMAILJS_TEMPLATE_REFERRAL=template_referral
```

### Step 5: Use Email Service

```javascript
import { sendWelcomeEmail } from './services/emailService';

// Send welcome email
await sendWelcomeEmail('user@example.com', 'John Doe');
```

---

## 📹 Video Upload System

### Features

- **Direct Upload**: Upload videos directly from admin dashboard
- **Progress Tracking**: See upload percentage in real-time
- **Thumbnail Support**: Add custom thumbnails
- **Storage Management**: Delete videos from storage
- **Automatic Optimization**: Firebase Storage handles optimization

### Usage

```javascript
import { uploadVideo } from './services/storageService';

// Upload with progress tracking
const result = await uploadVideo(
  videoFile,
  courseId,
  lessonId,
  (progress) => {
    console.log(`Upload progress: ${progress}%`);
  }
);

if (result.success) {
  console.log('Video URL:', result.url);
}
```

---

## 🧪 Testing Setup

### Step 1: Install Test Dependencies

```bash
cd client
npm install --save-dev vitest @vitest/ui @vitest/coverage-v8
```

### Step 2: Create Tests

Tests are located in `client/src/__tests__/`:

```
client/src/__tests__/
├── authService.test.js
├── courseService.test.js
└── // Add more tests here
```

### Step 3: Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# With UI
npm run test:ui

# Coverage report
npm run coverage
```

### Step 4: Write Tests

Example test:

```javascript
import { describe, it, expect } from 'vitest';

describe('My Feature', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

---

## 🚀 Optimized Landing Page

The new landing page includes:

- **Hero Section**: Eye-catching headline with mockup
- **Benefits**: 4-column grid of key features
- **Testimonials**: Success stories from real users
- **Pricing**: 3-tier pricing structure
- **FAQ**: Common questions answered
- **Animations**: Scroll-triggered fade-in effects
- **Mobile Responsive**: Works perfectly on all devices

### Usage

```jsx
import OptimizedLandingPage from './components/OptimizedLandingPage';

<OptimizedLandingPage onSignUp={() => setIsLoginOpen(true)} />
```

---

## 🌐 Deployment

### Firebase Hosting Deployment

```bash
# Build the app
cd client
npm run build

# Deploy to Firebase
cd ..
firebase deploy
```

### Vercel Deployment (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel
```

### Environment Variables on Deployment

1. Add all `.env.local` variables to:
   - **Firebase**: Project Settings → Environment Variables
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Build & deploy → Environment

---

## 📊 Database Schema

### Users Collection
```javascript
{
  uid: string,
  email: string,
  username: string,
  country: string,
  language: string,
  isAdmin: boolean,
  isVerified: boolean,
  referrer: string | null,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Courses Collection
```javascript
{
  title: string,
  description: string,
  author: string,
  price: number,
  thumbnail: string (URL),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Lessons Subcollection (under Courses)
```javascript
{
  title: string,
  duration: string,
  videoUrl: string (URL),
  description: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Enrollments Collection
```javascript
{
  userId: string,
  courseId: string,
  enrolledAt: timestamp,
  progress: number (0-100),
  completedLessons: array,
  certificateUrl: string | null
}
```

### Referrals Collection
```javascript
{
  referrerId: string,
  newUserId: string,
  createdAt: timestamp,
  commissionAmount: number,
  commissionPaid: boolean,
  paidAt: timestamp | null
}
```

---

## 🔒 Security Checklist

- [ ] Enable HTTPS (automatic with Firebase)
- [ ] Set up Firestore security rules
- [ ] Set up Storage security rules
- [ ] Enable 2FA on admin accounts
- [ ] Rotate API keys regularly
- [ ] Keep dependencies updated
- [ ] Enable Firebase backups
- [ ] Set up error logging (Firebase Crashlytics)
- [ ] Monitor usage in Firebase Console
- [ ] Regular security audits

---

## 🚀 Next Steps

1. **Complete Firebase Setup**: Follow steps 1-8 above
2. **Add Stripe Keys**: Get your Stripe API keys
3. **Set Up EmailJS**: Create email templates
4. **Install Dependencies**: `npm install`
5. **Add Environment Variables**: Create `.env.local`
6. **Test Locally**: `npm run dev`
7. **Run Tests**: `npm test`
8. **Deploy**: `firebase deploy`

---

## 📞 Support

For issues or questions:
- Check the [Firebase Docs](https://firebase.google.com/docs)
- Check the [Stripe Docs](https://stripe.com/docs)
- Check the [EmailJS Docs](https://www.emailjs.com/docs)
- Open an issue on GitHub

---

**Last Updated**: May 31, 2026
**Version**: 2.0 - Full Stack Complete
