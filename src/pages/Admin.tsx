import { AdminDashboard } from "../components/AdminDashboard";
import AdminNav from "../components/AdminNav";
import { getAllUsersPosts } from "../lib/services/userService";
import { useQuery } from "@tanstack/react-query";

const Admin = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["allUsersPosts"],
    queryFn: getAllUsersPosts,
  });

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
