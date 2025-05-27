// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
