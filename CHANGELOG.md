# Changelog

## Version 0.8.5 — Authentication & Mobile UX

Release Date: August 14, 2026

---

### 🔐 Authentication

- Added Firebase email verification.
- Verification email is automatically sent during registration.
- Added dedicated email verification page.
- Added resend verification email.
- Added verification status checking.
- Unverified users are redirected to `/verify-email`.
- Unverified users cannot complete the normal login flow.
- Verified users can continue into the application.
- Improved authentication error messages.
- Tested complete registration → verification → login flow.

---

### 📱 Mobile UX

- Improved responsive Hero section.
- Improved mobile Hero background positioning.
- Improved mobile Hero content layout.
- Improved mobile CTA buttons.
- Improved mobile statistics layout.
- Improved homepage responsiveness.

---

### 🎨 UI Improvements

- Redesigned Login page.
- Redesigned Registration page.
- Added dedicated Email Verification UI.
- Improved RentACar branding and authentication screens.
- Improved responsive layouts across authentication pages.

---

### 🧪 Testing

Successfully tested:

- Registration
- Verification email delivery
- Verification email resend
- Unverified login handling
- Verification status checking
- Verified login
- Mobile Hero layout
- Responsive authentication pages

---

### 📌 Version Status

**Version 0.8.5 — Authentication & Mobile UX**

Status:

🟢 Major Features Completed

---

# Version 0.8.4 — Notification Completion

Release Date: August 13, 2026

---

### 🔔 Notifications

- Added renter cancellation notifications for owners.
- Added rental completion notifications for renters.
- Added `bookingCancelledByRenter` notification type.
- Added `rentalCompleted` notification type.
- Added notification icons and navigation.
- Added exact booking identification and highlighting.
- Preserved real-time notification delivery.

---

### 📱 Mobile Notifications

- Added mobile notification bell.
- Added unread notification badge.
- Added responsive notification dropdown.
- Added notification panel scrolling.
- Improved mobile notification positioning.
- Improved mobile Add Car navbar.
- Improved My Cars mobile layout.

---

### 🔄 Booking Synchronization

- Improved Booking Requests refresh from notifications.
- Added direct navigation to newly received booking requests.
- Improved notification-based booking navigation.

---

### 🧪 Testing

Tested:

- Booking approval notifications
- Booking rejection notifications
- Renter cancellation notifications
- Owner cancellation notifications
- Rental completion notifications
- Booking navigation
- Booking highlighting
- Real-time notifications
- Mobile notifications

---

### 📌 Version Status

**Version 0.8.4 — Notification Completion**

Status:

🟡 Testing / Stabilization

---

# Version 0.8.3 — Booking History & Manual Completion

Release Date: August 8, 2026

---

### 📚 Booking History

- Added Upcoming Bookings.
- Added Active Rentals.
- Added Completed Rentals.
- Added Cancelled Bookings.
- Added Rejected Bookings.
- Preserved completed bookings permanently.
- Preserved booking history when vehicles are deleted.

---

### ✅ Rental Completion

- Added manual rental completion.
- Added completion confirmation.
- Added `Completed` booking status.
- Completed bookings remain permanently stored.

---

### 🔔 Notification Improvements

- Added clickable booking notifications.
- Added booking-specific navigation.
- Added automatic booking scrolling.
- Added temporary booking highlighting.
- Added Today / Yesterday / Older notification grouping.

---

### 🏗 Architecture

- Added `bookingLifecycleService.js`.
- Added `BookingLifecycle.jsx`.
- Improved booking status organization.
- Improved separation of active and completed rentals.

---

### 📌 Version Status

**Version 0.8.3 — Booking History & Manual Completion**

Status:

🟢 Completed

---

# Version 0.8.2 — Notification Interaction

Release Date: August 8, 2026

---

### 🔔 Notification Interaction

- Added clickable notifications.
- Added notification navigation.
- Added booking-specific routing.
- Added notification grouping.
- Added automatic booking scrolling.
- Added booking highlighting.

---

### 📚 Booking Organization

- Added upcoming rental classification.
- Added active rental classification.
- Added completed rental classification.

---

### 📌 Version Status

**Version 0.8.2 — Notification Interaction**

Status:

🟢 Completed

---

# Version 0.8.1 — UI & Architecture Polish

Release Date: August 7, 2026

---

### 🔔 Notification System

- Added centralized Notification Service.
- Added Notification Bell.
- Added unread notification badge.
- Added Notification Dropdown.
- Added Notification History.
- Added Read / Unread notifications.
- Added Smart Notification Icons.
- Added Relative Notification Timestamps.
- Added vehicle information to notifications.

---

### 🚗 Booking Notifications

Added notifications for:

- Booking Approval
- Booking Rejection
- Booking Cancellation

---

### 🏗 Architecture

Refactored the Dashboard Navbar into:

- `NavbarLogo`
- `DesktopNavigation`
- `MobileDrawer`
- `NotificationBell`
- `NotificationDropdown`
- `UserMenu`

Added:

- `notificationService.js`

---

### 📌 Version Status

**Version 0.8.1 — UI & Architecture Polish**

Status:

🟢 Completed