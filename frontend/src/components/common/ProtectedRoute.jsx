import { Navigate, useLocation } from "react-router-dom";
import { useProtectedRoute } from "../../hooks/useAuth";
import Loading from "./Loading";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading, hasRequiredRole } =
    useProtectedRoute(requiredRole);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRequiredRole) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
};

export const ManagerRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="manager">{children}</ProtectedRoute>;
};

export const AuthenticatedRoute = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default ProtectedRoute;
