# 🚗 Rent a Car Iloilo

## Overview

Community-based peer-to-peer car rental platform for Iloilo.

Owners can:

- List vehicles
- Manage vehicle information
- Manage availability
- Accept booking requests
- Reject booking requests
- Cancel approved bookings
- Mark rentals as completed
- Receive booking notifications

Renters can:

- Browse available vehicles
- Request bookings
- Cancel pending bookings
- Track booking status
- View upcoming bookings
- View active rentals
- View completed rentals
- Receive booking notifications

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS

## Backend

- Firebase Authentication
- Cloud Firestore
- Firebase Storage

## Deployment

- Vercel

## Image Hosting

- Cloudinary

---

# Folder Structure

src
│
├── components
├── pages
├── services
├── utils
├── firebase
├── context
├── hooks
└── data

---

# Firestore Collections

## cars

Purpose:
Stores vehicle listings.

Important fields:

- ownerId
- ownerEmail
- brand
- model
- year
- location
- vehicleType
- transmission
- fuelType
- price
- image
- blockedDates
- availabilityType
- createdAt

---

## bookings

Purpose:
Stores rental requests and permanent booking history.

Important fields:

- carId
- ownerId
- ownerEmail
- renterId
- renterEmail
- renterName
- pickupDate
- returnDate
- rentalDays
- totalPrice
- status
- createdAt

Booking Status Values:

- Pending
- Approved
- Rejected
- Cancelled
- Completed

---

## notifications

Purpose:
Stores in-app notifications for renters and owners.

Important fields:

- userId
- type
- title
- subtitle
- message
- bookingId
- carId
- isRead
- createdAt

Notification Types:

- bookingRequested
- bookingApproved
- bookingRejected
- bookingCancelled
- bookingCancelledByRenter
- rentalCompleted

---

# Authentication

- [x] Register
- [x] Login
- [x] Protected Routes
- [x] Firebase Email Verification
- [x] Verification Email Sent on Registration
- [x] Verification Email Resend
- [x] Verification Status Checking
- [x] Unverified Users Redirected to Verification Page
- [x] Unverified Login Session Preserved During Verification
- [x] Verified Email Detection
- [x] Verified User Redirect to Application
- [x] User-Friendly Verification Error Messages

### Authentication Flow

```text
Register
   ↓
Firebase Account Created
   ↓
Verification Email Sent
   ↓
Verify Your Email
   ↓
User Logs In
   ↓
Email Verification Check
   ↓
 ┌───────────────────────┐
 │                       │
 ▼                       ▼
Verified             Not Verified
 │                       │
 ▼                       ▼
Application          Verify Email
                         │
                         ▼
                  Check Verification
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
          Verified              Not Verified
              │                     │
              ▼                     ▼
        Application          Show Verification
                             Error Message