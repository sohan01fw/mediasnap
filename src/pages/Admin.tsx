import { AdminDashboard } from "../components/AdminDashboard";
import AdminNav from "../components/AdminNav";
import { getAllUsersPosts, getUser } from "../lib/services/userService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthContext } from "../lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { user } = useAuthContext();
  const email = user?.email || "";
  const navigate = useNavigate();
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["allUsersPosts"],
    queryFn: getAllUsersPosts,
  });

  const setUserRole = async () => {
    const data = await getUser(email);
    if (data?.role !== "ADMIN") {
      navigate("/");
    }
  };

  useEffect(() => {
    setUserRole();
  }, [email]);

  if (error) {
    console.log(error);
    return;
  }

  return (
    <div>
      <AdminNav />
      <div>
        {isLoading && <div>Loading...</div>}

        {isSuccess && <AdminDashboard data={data} />}
      </div>
    </div>
  );
};

export default Admin;
