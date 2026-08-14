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

---

# Cars

- [x] Add Car
- [x] Edit Car
- [x] Delete Car
- [x] My Cars
- [x] Browse Cars
- [x] Car Details

---

# Booking System

- [x] Booking Request
- [x] Approve Booking
- [x] Reject Booking
- [x] Renter Cancel Pending Booking
- [x] Owner Cancel Approved Booking
- [x] My Bookings
- [x] Booking Status Synchronization
- [x] Upcoming Bookings
- [x] Active Rentals
- [x] Manual Mark as Completed
- [x] Completion Confirmation
- [x] Completed Rental History
- [x] Completed Bookings Permanently Stored
- [x] Deleted-car Booking History Handling
- [x] Real-time My Bookings Updates

---

# Availability

- [x] Manual blocked dates
- [x] Approved bookings shown on owner calendar
- [x] Approved bookings shown on renter calendar
- [x] Blocked dates cannot be selected
- [x] Approved booking dates cannot be selected
- [x] Automatically free dates after booking cancellation

---

# Notification System

- [x] Notification Service
- [x] Modular Notification Components
- [x] Notification Dropdown
- [x] Notification Bell Badge
- [x] Read / Unread Notifications
- [x] Notification History
- [x] Smart Notification Icons
- [x] Relative Time (Just now / Minutes ago / Yesterday)
- [x] Notification Types
- [x] Vehicle Subtitle
- [x] Unread Counter
- [x] Notification Grouping (Today / Yesterday / Older)
- [x] Clickable Notifications
- [x] Notification Navigation
- [x] Exact Booking Highlighting
- [x] Owner New Booking Request Notifications
- [x] Renter Cancellation Notifications
- [x] Rental Completion Notifications
- [x] Mobile Notification Bell
- [x] Responsive Mobile Notification Dropdown

---

# Mobile UX

- [x] Responsive My Cars layout
- [x] Mobile Dashboard Navbar
- [x] Mobile Add Car Navbar
- [x] Mobile Notification Bell
- [x] Mobile Notification Badge
- [x] Mobile Notification Dropdown
- [x] Responsive Notification Panel
- [x] Notification Panel Scrolling
- [x] Mobile Navigation Drawer

---

# Architecture Improvements

## Navbar Component Refactor

- [x] NavbarLogo
- [x] DesktopNavigation
- [x] MobileDrawer
- [x] NotificationBell
- [x] NotificationDropdown
- [x] UserMenu

## Notification Architecture

- [x] Notification system extracted into Notification Service
- [x] Reusable notification utilities
- [x] Notification icons extracted
- [x] Relative timestamp utility
- [x] Booking navigation through notification state

Utilities:

- formatTimeAgo.js
- notificationIcon.jsx
- dateUtils.js
- bookingUtils.js

---

# Deployment

- [x] GitHub Repository
- [x] Vercel Deployment
- [x] React Router refresh fixed (No more 404 on page refresh)

---

# Current Sprint

## Version 0.8.4 — "Notification Completion"

### Completed

- [x] Renter cancellation → Owner notification
- [x] Renter cancellation → Owner booking navigation
- [x] Exact cancelled booking highlighting
- [x] Rental completion → Renter notification
- [x] Rental completion notification icon
- [x] Rental completion → Renter booking navigation
- [x] Exact completed booking highlighting
- [x] Booking approval → Renter notification
- [x] Booking approval → Renter booking navigation
- [x] Real-time notifications
- [x] Notification grouping
- [x] Notification read / unread behavior
- [x] Notification dropdown navigation
- [x] Booking Requests refresh when navigating with booking ID
- [x] `bookingCancelledByRenter` notification type
- [x] Mobile notification bell
- [x] Responsive mobile notification dropdown
- [x] Mobile Add Car navbar
- [x] Mobile My Cars improvements

### Remaining

- [ ] Verify cancelled booking notification → exact Booking Request navigation
- [ ] Booking Rejected → Renter notification/navigation
- [ ] Owner cancellation → Renter notification/navigation
- [ ] Final regression testing
- [ ] Vercel production testing

---

## Version 0.8.4 Status

🟡 Testing / Stabilization

---

# Future Roadmap

## Version 0.9

- Payment System
- Messaging System
- Reviews
- Admin Panel

---

# Development Rules

- Booking documents are never deleted.
- Booking status changes instead of deleting records.
- blockedDates are only for manual owner blocks.
- Approved bookings are read from the bookings collection.
- Cancelled bookings immediately free reserved dates.
- Completed bookings remain permanently stored.
- Firestore is the single source of truth.
- Notification documents are never deleted.
- Notifications use a reusable Notification Service.
- Notification types determine icon and behavior.
- Notifications can navigate to related bookings.
- Rental completion is manually confirmed by the owner.
- React Router is configured for Vercel SPA routing.

---

# Latest Stable Version

**Version 0.8.4 — "Notification Completion"**

Current Status:

🟡 Testing / Stabilization

Latest Major Features:

- Modular Navbar Architecture
- Notification Service
- Notification History
- Smart Notification Icons
- Relative Notification Timestamps
- Vehicle-aware Notifications
- Notification Grouping
- Clickable Notifications
- Exact Booking Navigation
- Exact Booking Highlighting
- Owner New Booking Request Notifications
- Booking Approval / Rejection / Cancellation Notifications
- Rental Completion Notifications
- Real-time Booking Synchronization
- Availability Synchronization
- Booking Management
- Upcoming / Active / Completed Booking Organization
- Manual Rental Completion
- Completion Confirmation
- Permanent Booking History
- Deleted-car Booking Handling
- Responsive Mobile Navbar
- Responsive Mobile Notifications
- Mobile Navigation Drawer
- Vercel SPA Routing Fix