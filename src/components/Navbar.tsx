import { Link } from "react-router-dom";
import { useUserStore } from "../lib/stores/useUserStore";
import { supabase } from "../lib/supabase/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthContext } from "../lib/hooks/useAuth";

export default function Navbar() {
  const { user } = useAuthContext();
  const { role } = useUserStore();
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
        <a className="btn btn-ghost text-xl">MediaSnap</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end"></div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className=" rounded-full">
              <img src={user?.user_metadata.avatar_url} alt="avatar_url" />
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
            {role === "ADMIN" && (
              <li>
                <Link to="/admin">Admin(dashboard)</Link>
              </li>
            )}
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
