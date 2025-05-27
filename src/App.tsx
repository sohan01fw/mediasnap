import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import ProtectedRoute from "./lib/protectedRoutes";
import { Toaster } from "sonner";
import { useAuthContext } from "./lib/hooks/useAuth";

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

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
