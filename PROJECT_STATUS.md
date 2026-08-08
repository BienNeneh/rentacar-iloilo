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
- Receive booking notifications

Renters can:
- Browse available vehicles
- Request bookings
- Cancel pending bookings
- Track booking status
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
Stores rental requests.

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

- bookingApproved
- bookingRejected
- bookingCancelled

---

# Authentication

✅ Register

✅ Login

✅ Protected Routes

---

# Cars

✅ Add Car

✅ Edit Car

✅ Delete Car

✅ My Cars

✅ Browse Cars

✅ Car Details

---

# Booking System

✅ Booking Request

✅ Approve Booking

✅ Reject Booking

✅ Renter Cancel Pending Booking

✅ Owner Cancel Approved Booking

✅ My Bookings

✅ Booking Status Synchronization

---

# Availability

✅ Manual blocked dates

✅ Approved bookings shown on owner calendar

✅ Approved bookings shown on renter calendar

✅ Blocked dates cannot be selected

✅ Approved booking dates cannot be selected

✅ Automatically free dates after booking cancellation

---

# Notification System

✅ Notification Service

✅ Modular Notification Components

✅ Notification Dropdown

✅ Notification Bell Badge

✅ Read / Unread Notifications

✅ Notification History

✅ Smart Notification Icons

✅ Relative Time (Just now / Minutes ago / Yesterday)

✅ Notification Types

✅ Vehicle Subtitle

✅ Unread Counter

---

# Architecture Improvements

✅ Navbar refactored into modular components

- NavbarLogo
- DesktopNavigation
- MobileDrawer
- NotificationBell
- NotificationDropdown
- UserMenu

✅ Notification system extracted into Notification Service

✅ Reusable utility functions

- formatTimeAgo.js
- notificationIcon.jsx

---

# Deployment

✅ GitHub Repository

✅ Vercel Deployment

✅ React Router refresh fixed (No more 404 on page refresh)

---

# Current Sprint

## Version 0.8.1 — "UI & Architecture Polish"

### Completed

- [x] Navbar component refactor
- [x] Notification Service
- [x] Notification History
- [x] Read / Unread notifications
- [x] Notification badge counter
- [x] Smart notification icons
- [x] Relative timestamps
- [x] Vehicle subtitle in notifications
- [x] Notification types
- [x] Modular notification components
- [x] Utility functions for notifications
- [x] Booking approval notifications
- [x] Booking rejection notifications
- [x] Booking cancellation notifications

### Remaining

- [ ] Clickable notifications
- [ ] Group notifications (Today / Yesterday / Older)
- [ ] Real-time notifications (Firestore onSnapshot)
- [ ] Booking History
- [ ] Automatically archive completed rentals

---

# Future Roadmap

## Version 0.9

- Payment System
- Messaging System
- Reviews
- Admin Panel
- Real-time Notifications

---

# Development Rules

- Booking documents are never deleted.
- Booking status changes instead of deleting records.
- blockedDates are only for manual owner blocks.
- Approved bookings are read from the bookings collection.
- Cancelled bookings immediately free reserved dates.
- Firestore is the single source of truth.
- Notification documents are never deleted.
- Notifications use a reusable Notification Service.
- Notification types determine icon and behavior.
- React Router is configured for Vercel SPA routing.

---

# Latest Stable Version

**Version 0.8.1 — "UI & Architecture Polish"**

Current Status:

🟢 Stable Development Build

Latest Major Features:

- Modular Navbar Architecture
- Notification Service
- Notification History
- Smart Notification Icons
- Relative Notification Timestamps
- Vehicle-aware Notifications
- Booking Approval / Rejection / Cancellation Notifications
- Availability Synchronization
- Booking Management
- Vercel SPA Routing Fix