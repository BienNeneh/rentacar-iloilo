# 🚗 Rent a Car Iloilo

## Overview

Community-based peer-to-peer car rental platform for Iloilo Province.

### Owners can:
- List vehicles
- Manage vehicle information
- Manage availability
- Accept or reject booking requests
- Cancel approved bookings
- Mark rentals as completed
- Receive booking notifications

### Renters can:
- Browse available vehicles
- Request bookings
- Cancel pending bookings
- Track booking status
- View upcoming, active, and completed rentals
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

# Firestore Collections

## `cars`

Stores vehicle listings.

Key fields:
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

## `bookings`

Stores rental requests and permanent booking history.

Key fields:
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

### Booking Status
- Pending
- Approved
- Rejected
- Cancelled
- Completed

## `notifications`

Stores in-app notifications.

Key fields:
- userId
- type
- title
- subtitle
- message
- bookingId
- carId
- isRead
- createdAt

### Notification Types
- bookingRequested
- bookingApproved
- bookingRejected
- bookingCancelled
- bookingCancelledByRenter
- rentalCompleted

---

# Authentication

- [x] Registration
- [x] Login
- [x] Protected Routes
- [x] Firebase Email Verification
- [x] Verification Email During Registration
- [x] Dedicated Verification Page
- [x] Resend Verification Email
- [x] Verification Status Checking
- [x] Unverified Login Protection
- [x] Verified User Access
- [x] Authentication Error Handling

---

# Cars

- [x] Add Car
- [x] Edit Car
- [x] Delete Car
- [x] My Cars
- [x] Browse Cars
- [x] Car Details
- [x] Availability Management

---

# Booking System

- [x] Booking Requests
- [x] Approve Booking
- [x] Reject Booking
- [x] Renter Cancel Pending Booking
- [x] Owner Cancel Approved Booking
- [x] Booking Status Synchronization
- [x] Upcoming Bookings
- [x] Active Rentals
- [x] Manual Rental Completion
- [x] Completion Confirmation
- [x] Completed Rental History
- [x] Permanent Booking History
- [x] Deleted-Car Booking History Handling
- [x] Real-Time My Bookings Updates

---

# Availability

- [x] Manual Blocked Dates
- [x] Approved Bookings on Owner Calendar
- [x] Approved Bookings on Renter Calendar
- [x] Blocked Date Protection
- [x] Approved Booking Date Protection
- [x] Automatic Date Release After Cancellation

---

# Notification System

- [x] Notification Service
- [x] Notification Dropdown
- [x] Notification Bell Badge
- [x] Read / Unread Notifications
- [x] Notification History
- [x] Smart Notification Icons
- [x] Relative Timestamps
- [x] Notification Grouping
- [x] Vehicle-Aware Notifications
- [x] Unread Counter
- [x] Clickable Notifications
- [x] Notification Navigation
- [x] Exact Booking Highlighting
- [x] Booking Request Notifications
- [x] Booking Approval Notifications
- [x] Booking Rejection Notifications
- [x] Renter Cancellation Notifications
- [x] Owner Cancellation Notifications
- [x] Rental Completion Notifications
- [x] Mobile Notification Bell
- [x] Responsive Notification Dropdown

---

# Mobile UX

- [x] Responsive My Cars
- [x] Mobile Dashboard Navbar
- [x] Mobile Add Car Navbar
- [x] Mobile Notification Bell
- [x] Mobile Notification Badge
- [x] Mobile Notification Dropdown
- [x] Responsive Notification Panel
- [x] Notification Panel Scrolling
- [x] Mobile Navigation Drawer
- [x] Responsive Login Page
- [x] Responsive Registration Page
- [x] Responsive Email Verification Page
- [x] Mobile Hero Layout
- [x] Mobile Hero Background Positioning
- [x] Mobile Hero CTA Layout
- [x] Mobile Hero Statistics Layout
- [x] Mobile Homepage Responsiveness

---

# Architecture

## Navbar
- [x] NavbarLogo
- [x] DesktopNavigation
- [x] MobileDrawer
- [x] NotificationBell
- [x] NotificationDropdown
- [x] UserMenu

## Notification Architecture
- [x] Notification Service
- [x] Reusable Notification Utilities
- [x] Notification Icons
- [x] Relative Timestamp Utility
- [x] Booking Navigation Utilities

### Utilities
- `formatTimeAgo.js`
- `notificationIcon.jsx`
- `dateUtils.js`
- `bookingUtils.js`

---

# Deployment

- [x] GitHub Repository
- [x] Vercel Deployment
- [x] React Router SPA Routing
- [x] Vercel Refresh / 404 Fix

---

# Current Sprint

## Version 0.8.5 — "Authentication & Mobile UX"

### Completed

- [x] Firebase Email Verification
- [x] Registration Verification Flow
- [x] Dedicated Verification Page
- [x] Verification Resend
- [x] Verification Status Checking
- [x] Unverified Login Protection
- [x] Verified Login Flow
- [x] Authentication Error Improvements
- [x] Redesigned Login Page
- [x] Redesigned Registration Page
- [x] Redesigned Verification Page
- [x] Improved Mobile Hero
- [x] Improved Mobile Hero Background
- [x] Improved Mobile CTAs
- [x] Improved Mobile Statistics
- [x] Improved Homepage Responsiveness

### Testing

- [x] Registration
- [x] Verification Email Delivery
- [x] Verification Email Resend
- [x] Unverified Login
- [x] Verification Status Check
- [x] Verified Login
- [x] Mobile Hero
- [x] Authentication Responsiveness

---

# Version History

## Version 0.8.5 — "Authentication & Mobile UX"

**Status:** 🟢 Completed

Major improvements:
- Complete email verification system
- Protected unverified accounts
- Redesigned authentication pages
- Improved mobile homepage experience
- Improved responsive Hero section

---

## Version 0.8.4 — "Notification Completion"

**Status:** 🟢 Completed

Major improvements:
- Completed booking notification system
- Rental completion notifications
- Booking approval/rejection/cancellation notifications
- Real-time notification updates
- Mobile notification experience
- Exact booking navigation and highlighting
- Responsive notification dropdown

---

# Development Rules

- Booking documents are never deleted.
- Booking status changes instead of deleting records.
- `blockedDates` are only for manual owner blocks.
- Approved bookings are read from the `bookings` collection.
- Cancelled bookings immediately release reserved dates.
- Completed bookings remain permanently stored.
- Firestore is the single source of truth.
- Notification documents are never deleted.
- Notification types determine icon and behavior.
- Notifications can navigate to related bookings.
- Rental completion is manually confirmed by the owner.
- Unverified users cannot access protected application features.
- React Router is configured for Vercel SPA routing.

---

# Future Roadmap

## Version 0.9

- [ ] Payment System
- [ ] Messaging System
- [ ] Reviews
- [ ] Admin Panel

---

# Latest Stable Version

**Version 0.8.5 — "Authentication & Mobile UX"**

### Current Status

🟢 **Stable**

### Major Features

- Peer-to-peer car listings
- Vehicle management
- Availability management
- Complete booking lifecycle
- Booking history
- Real-time booking synchronization
- Notification system
- Responsive notification system
- Firebase authentication
- Email verification
- Protected routes
- Responsive authentication pages
- Mobile navigation
- Responsive mobile homepage
- Vercel deployment
- Vercel SPA routing