import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

import AddCar from "./pages/AddCar";
import MyCars from "./pages/MyCars";
import EditCar from "./pages/EditCar";
import ManageCar from "./pages/ManageCar";
import Availability from "./pages/Availability";

import ListCar from "./pages/ListCar";
import CarDetails from "./pages/CarDetails";

import BookingRequests from "./pages/BookingRequests";
import MyBookings from "./pages/MyBookings";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
     <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/list-car" element={<ListCar />} />
        <Route path="/car/:id" element={<CarDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/my-cars"
          element={
            <ProtectedRoute>
              <MyCars />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-car"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-car/:id"
          element={
            <ProtectedRoute>
              <EditCar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-car/:id"
          element={
            <ProtectedRoute>
              <ManageCar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/availability/:id"
          element={
            <ProtectedRoute>
              <Availability />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-requests"
          element={
            <ProtectedRoute>
              <BookingRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;