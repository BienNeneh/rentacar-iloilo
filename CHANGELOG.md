# Changelog

## Version 0.8.1 — UI & Architecture Polish

Release Date: August 7, 2026

---

### ✨ New Features

#### Notification System

- Added Notification Service for centralized notification creation.
- Added Notification Bell with unread badge counter.
- Added Notification Dropdown.
- Added Notification History.
- Added Read / Unread notifications.
- Added Smart Notification Icons.
- Added Relative Notification Timestamps (Just now, Minutes ago, Yesterday).
- Added Vehicle Subtitle to notifications.
- Added Notification Types:
  - bookingApproved
  - bookingRejected
  - bookingCancelled

---

### 🚗 Booking Improvements

- Booking approval now sends notifications.
- Booking rejection now sends notifications.
- Booking cancellation now sends notifications.
- Notification documents now include:
  - title
  - subtitle
  - message
  - bookingId
  - carId
  - type
  - createdAt

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

- notificationService.js

Notification creation is now centralized through:

```javascript
createNotification(...)
```

instead of directly writing to Firestore throughout the application.

---

#### New Utilities

Added:

- formatTimeAgo.js
- notificationIcon.jsx

These utilities provide reusable functionality across the application.

---

### 🎨 UI Improvements

- Improved notification layout.
- Added unread notification highlighting.
- Added read notification styling.
- Added notification icons by type.
- Added vehicle name as notification subtitle.
- Improved notification spacing.
- Improved notification readability.

---

### 🧹 Code Quality

- Refactored notification logic into reusable service.
- Improved component separation.
- Reduced duplicate notification code.
- Improved project architecture.
- Improved code readability.
- Added reusable utility functions.

---

### 📌 Current Status

Current Stable Version:

**Version 0.8.1 — UI & Architecture Polish**

Major Features Completed:

- Booking Management
- Availability Calendar
- Notification System
- Modular Navbar Architecture
- Notification Service
- Smart Notification Icons
- Notification History
- Relative Time Formatting
- Vehicle-aware Notifications

---

## Next Planned Version

### Version 0.8.2

Planned Features:

- Clickable Notifications
- Notification Grouping (Today / Yesterday / Older)
- Real-time Notifications (Firestore onSnapshot)
- Booking History
- Automatic Booking Archive

---

## Future Versions

### Version 0.9

- Payment System
- Messaging
- Reviews
- Admin Panel