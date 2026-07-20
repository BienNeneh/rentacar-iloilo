import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCar from "./pages/AddCar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ListCar from "./pages/ListCar";
import CarDetails from "./pages/CarDetails";
import NotFound from "./pages/NotFound";
import MyCars from "./pages/MyCars";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditCar from "./pages/EditCar";
import ManageCar from "./pages/ManageCar";
import BookingRequests from "./pages/BookingRequests";
import Availability from "./pages/Availability";

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
<Route
    path="/booking-requests"
    element={
        <ProtectedRoute>
            <BookingRequests />
        </ProtectedRoute>
    }
/>

<Route
  path="/availability/:id"
  element={<Availability />}
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

        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route
  path="/add-car"
  element={
    <ProtectedRoute>
      <AddCar />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />
        <Route
  path="/my-cars"
  element={
    <ProtectedRoute>
      <MyCars />
    </ProtectedRoute>
  }
/>
        <Route path="/register" element={<Register />} />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

        <Route path="/list-car" element={<ListCar />} />

        <Route path="/car/:id" element={<CarDetails />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;