import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // =========================
  // Not Logged In
  // =========================

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =========================
  // Email Not Verified
  // =========================

  if (!user.emailVerified) {
    return (
      <Navigate
        to="/verify-email"
        replace
        state={{
          email: user.email,
        }}
      />
    );
  }

  // =========================
  // Verified User
  // =========================

  return children;
}

export default ProtectedRoute;