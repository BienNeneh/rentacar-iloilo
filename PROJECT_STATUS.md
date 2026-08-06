# 🚗 Rent a Car Iloilo

## Overview

Community-based car rental platform for Iloilo.

Owners can:
- List vehicles
- Manage availability
- Accept bookings

Renters can:
- Browse vehicles
- Request bookings
- Track booking status

## Tech Stack

Frontend
- React
- Vite
- Tailwind CSS

Backend
- Firebase Authentication
- Cloud Firestore
- Firebase Storage

## Folder
src
│
├── components
│
├── pages
│
├── firebase
│
├── context
│
├── hooks
│
└── data

## cars

Purpose:
Stores vehicle listings.

Important fields:

- ownerId
- ownerEmail
- brand
- model
- location
- price
- blockedDates
- availabilityType

## bookings

Purpose:
Stores rental requests.

Important fields:

- carId
- ownerId
- renterId
- pickupDate
- returnDate
- rentalDays
- totalPrice
- status

## Authentication

✅ Register

✅ Login

✅ Protected Routes

---

## Cars

✅ Add Car

✅ Edit Car

✅ Delete Car

✅ My Cars

---

## Booking

✅ Booking Request

✅ Approve Booking

✅ Reject Booking

✅ My Bookings

---

## Availability

✅ Manual blocked dates

⬜ Calendar visualization

⬜ Booking cancellation

⬜ Booking history

# Current Sprint

Booking System Improvements

- [ ] Show approved bookings on owner calendar
- [ ] Owner cancellation
- [ ] Renter cancellation
- [ ] Booking history

## Future

- Payments
- Messaging
- Reviews
- Notifications
- Admin Panel

# Development Rules

- Booking documents are never deleted.
- Booking status changes instead of deleting records.
- blockedDates are only for manual owner blocks.
- Approved bookings come from the bookings collection.
- Firestore is the single source of truth.