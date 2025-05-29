import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Toaster } from "sonner";
import { useAuthContext } from "./lib/hooks/useAuth";
import Admin from "./pages/Admin";
import { ProtectedRouteFromAuth } from "./lib/protectedRoutes";

function App() {
  const { user, isLoading } = useAuthContext();
  if (isLoading) {
    return;
  }
  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route element={<ProtectedRouteFromAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
