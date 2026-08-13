# Changelog

## Version 0.8.4 — Notification Completion

Release Date: August 11, 2026

---

### 🔔 Notification Completion

- Added renter cancellation notifications for vehicle owners.
- Added rental completion notifications for renters.
- Added `bookingCancelledByRenter` notification type.
- Added `rentalCompleted` notification type.
- Added rental completion notification icon.
- Added renter cancellation notification icon support.
- Continued using the centralized Notification Service for notification creation.
- Preserved real-time notification delivery using Firestore listeners.

---

### 🚗 Booking Lifecycle Notifications

Notification flows now support:

- Booking Requested
- Booking Approved
- Booking Rejected
- Owner Booking Cancellation
- Renter Booking Cancellation
- Rental Completion

Notification direction:

- Renter → Owner
  - New Booking Request
  - Renter Cancellation

- Owner → Renter
  - Booking Approval
  - Booking Rejection
  - Owner Cancellation
  - Rental Completion

Notifications include:

- `userId`
- `type`
- `title`
- `subtitle`
- `message`
- `bookingId`
- `carId`
- `isRead`
- `createdAt`

---

### 🎯 Notification Navigation

- Added navigation for renter cancellation notifications received by owners.
- Added `bookingCancelledByRenter` navigation to `/booking-requests`.
- Existing `bookingCancelled` notifications continue navigating renters to `/my-bookings`.
- Rental completion notifications navigate renters to `/my-bookings`.
- Booking approval notifications navigate renters to `/my-bookings`.
- Booking rejection notifications navigate renters to `/my-bookings`.
- Booking request notifications navigate owners to `/booking-requests`.
- Notification navigation carries the related `bookingId`.
- Added exact booking identification during notification navigation.
- Existing temporary booking highlighting is preserved.

---

### 🔄 Booking Request Synchronization

- Improved Booking Requests synchronization when opened from notifications.
- Booking Requests now refreshes booking data when a notification supplies a booking ID.
- Owners no longer need to manually refresh the page before opening a newly received booking request.
- New booking requests can now be opened directly from notifications without a page refresh.

---

### 🧪 Testing & Stabilization

Successfully tested:

- Renter cancellation → Owner notification.
- Renter cancellation → Owner booking navigation.
- Exact cancelled booking highlighting.
- Owner approval → Renter notification.
- Owner approval → Renter booking navigation.
- Rental completion → Renter notification.
- Rental completion → Renter booking navigation.
- Exact completed booking highlighting.
- Real-time notification delivery.
- Notification read / unread behavior.
- Notification grouping.
- Notification dropdown navigation.
- New booking request navigation without manual page refresh.

Remaining regression tests:

- [ ] Booking Rejected → Renter notification/navigation.
- [ ] Owner cancellation → Renter notification/navigation.
- [ ] Final Vercel production regression testing.

---

### 📌 Version Status

**Version 0.8.4 — Notification Completion**

Status:

🟡 Testing / Stabilization

---

# Version 0.8.3 — Booking History & Manual Completion

Release Date: August 8, 2026

---

### ✨ New Features

#### 📚 Booking History

- Added organized booking sections for renters.
- Added Upcoming Bookings section.
- Added Active Rentals section.
- Added Completed Rentals section.
- Added Cancelled Bookings tracking.
- Added Rejected Bookings tracking.
- Added permanent completed booking history.
- Booking records are preserved instead of being deleted.

---

#### ✅ Manual Rental Completion

- Added manual "Mark as Completed" functionality for vehicle owners.
- Owners can manually confirm that a rental has finished.
- Added completion confirmation before changing booking status.
- Completed bookings are assigned the `Completed` status.
- Completed bookings remain permanently stored in Firestore.

Manual completion was intentionally chosen instead of automatic completion because:

- Vehicles may be returned late.
- Rentals may be extended.
- Vehicles may experience delays or unexpected problems.
- The owner should confirm when the rental has actually ended.

---

### 🚗 Booking Improvements

Booking lifecycle now supports:

- Pending
- Approved
- Rejected
- Cancelled
- Completed

Approved bookings are separated into:

- Upcoming
- Active

Completed bookings are moved into:

- Completed Rental History

---

### 🔔 Notification Improvements

#### Clickable Notifications

- Notifications are now clickable.
- Clicking a booking notification marks it as read.
- Notification dropdown automatically closes after navigation.
- Booking notifications navigate directly to `/my-bookings`.

Supported notification navigation:

- `bookingApproved`
- `bookingRejected`
- `bookingCancelled`

---

#### 🎯 Booking Highlighting

- Added exact booking navigation.
- Added booking ID routing through notification state.
- Added automatic scrolling to the related booking.
- Added temporary visual highlighting for the selected booking.

This allows users to immediately identify which booking a notification refers to.

---

#### 📅 Notification Grouping

Notifications are now organized into:

- TODAY
- YESTERDAY
- OLDER

This improves notification readability and makes notification history easier to navigate.

---

### 👤 Owner Booking Management

- Added manual rental completion action for approved bookings.
- Added completion confirmation.
- Completed rentals are separated from active booking requests.
- Added completed rental count.
- Added completed rental history section.
- Booking request architecture now supports the complete rental lifecycle.

---

### 🏗 Architecture Improvements

#### Booking Lifecycle Service

Added:

- `bookingLifecycleService.js`
- `BookingLifecycle.jsx`

The booking lifecycle service analyzes approved bookings and determines whether rentals are:

- Upcoming
- Ongoing
- Past return date

Automatic completion was intentionally not implemented.

The system waits for manual owner confirmation before marking a booking as completed.

---

### 🎨 UI Improvements

#### My Bookings

Improved renter booking dashboard with:

- Pending count
- Upcoming count
- Active rental count
- Completed rental count
- Cancelled count
- Rejected count

Added organized booking sections:

- 📅 Upcoming
- 🚗 Active Rentals
- 📚 Completed Rentals
- ❌ Cancelled
- 🔴 Rejected

---

#### Booking Requests

Improved owner booking dashboard with:

- Active booking requests
- Completed rentals
- Archived bookings for deleted vehicles
- Manual completion controls

---

### 🧹 Code Quality

- Improved booking lifecycle organization.
- Added reusable booking status logic.
- Improved separation between active and completed bookings.
- Improved notification navigation.
- Added booking highlighting system.
- Improved booking history organization.
- Preserved Firestore booking records permanently.

---

### 📌 Version Status

Current Stable Version at Release:

**Version 0.8.3 — Booking History & Manual Completion**

---

# Version 0.8.2 — Notification Interaction

Release Date: August 8, 2026

---

### 🔔 Notification Interaction

- Added clickable notifications.
- Added notification navigation.
- Added booking-specific notification routing.
- Added notification dropdown close behavior after navigation.
- Added notification grouping:
  - Today
  - Yesterday
  - Older

---

### 🎯 Booking Navigation

- Added booking ID to notification navigation state.
- Notifications navigate users directly to My Bookings.
- Added automatic scrolling to the related booking.
- Added temporary booking highlighting.

---

### 📚 Booking Organization

- Added initial booking history organization.
- Added upcoming rental classification.
- Added active rental classification.
- Added completed rental classification.

---

### 🏗 Architecture

- Improved notification interaction architecture.
- Improved booking navigation flow.
- Improved separation between notification display and navigation logic.

---

### 📌 Version Status

**Version 0.8.2 — Notification Interaction**

Status:

🟢 Completed

---

# Version 0.8.1 — UI & Architecture Polish

Release Date: August 7, 2026

---

### ✨ New Features

#### 🔔 Notification System

- Added Notification Service for centralized notification creation.
- Added Notification Bell with unread badge counter.
- Added Notification Dropdown.
- Added Notification History.
- Added Read / Unread notifications.
- Added Smart Notification Icons.
- Added Relative Notification Timestamps.
- Added Vehicle Subtitle to notifications.
- Added Notification Types:
  - `bookingApproved`
  - `bookingRejected`
  - `bookingCancelled`

---

### 🚗 Booking Improvements

- Booking approval now sends notifications.
- Booking rejection now sends notifications.
- Booking cancellation now sends notifications.
- Notification documents now include:
  - `title`
  - `subtitle`
  - `message`
  - `bookingId`
  - `carId`
  - `type`
  - `createdAt`

---

### 🏗 Architecture Improvements

#### Navbar Refactor

DashboardNavbar was split into reusable components:

- NavbarLogo
- DesktopNavigation
- MobileDrawer
- NotificationBell
- NotificationDropdown
- UserMenu

---

#### New Services

Added:

- `notificationService.js`

Notification creation is now centralized through:

```javascript
createNotification(...)