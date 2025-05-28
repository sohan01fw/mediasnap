// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";
import { useUserStore } from "./stores/useUserStore";

const ProtectedRouteFromAuth = () => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;

  return <Outlet />;
};

const ProtectRouteFromRole = () => {
  const { role } = useUserStore((state) => state);

  if (role === "ADMIN") {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
  // return <Navigate to="/" replace />;
};

export { ProtectedRouteFromAuth, ProtectRouteFromRole };
