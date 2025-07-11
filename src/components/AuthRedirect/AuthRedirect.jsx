// components/AuthRedirect/AuthRedirect.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    // If logged in, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in, allow access to login/signup
  return children;
};

export default AuthRedirect;
