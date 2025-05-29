import { Link } from "react-router-dom";
import { useAuthContext } from "../lib/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase/supabaseClient";
import { toast } from "sonner";

export default function AdminNav() {
  const { user } = useAuthContext();
  const mutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      window.location.reload();
    },
  });
  const handleLogout = async () => {
    mutation.mutate();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end"></div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                src={user?.user_metadata?.picture}
                alt="Tailwind CSS Navbar component"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
