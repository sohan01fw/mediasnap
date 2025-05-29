import { useEffect } from "react";
import { useAuthContext } from "../lib/hooks/useAuth";
import MediaPost from "../components/MediaPost";
import Navbar from "../components/Navbar";
import { getUser, saveUser } from "../lib/services/userService";
import { useUserStore } from "../lib/stores/useUserStore";
import { Posts } from "../components/Posts";

const Home = () => {
  const { user } = useAuthContext();
  const { setRole } = useUserStore((state) => state);
  const email = user?.email || "";

  const checkUserInDb = async () => {
    try {
      const data = await getUser(email);
      setRole(data?.role);
      if (!data || data.length === 0) {
        console.log(data);
        //save user to db
        const userData = {
          id: user?.id || "",
          email: user?.email || "",
          name: user?.user_metadata.name || "",
          pic: user?.user_metadata.avatar_url || "",
          role: "USER",
        };
        await saveUser(userData);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    checkUserInDb();
  }, [user]);

  if (!user) {
    return;
  }

  return (
    <div>
      <Navbar />
      <MediaPost />
      <Posts />
    </div>
  );
};

export default Home;
