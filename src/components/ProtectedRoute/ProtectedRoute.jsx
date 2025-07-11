// components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  // Not logged in? Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If role-based protection is required
  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // All checks passed
  return children;
};

export default ProtectedRoute;
