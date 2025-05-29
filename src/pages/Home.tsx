import { useEffect } from "react";
import { useAuthContext } from "../lib/hooks/useAuth";
import MediaPost from "../components/MediaPost";
import Navbar from "../components/Navbar";
import { getUser, saveUser } from "../lib/services/userService";
import { useUserStore } from "../lib/stores/useUserStore";

const Home = () => {
  const { user } = useAuthContext();
  const { setRole } = useUserStore((state) => state);
  const email = user?.email || "";

  const checkUserInDb = async () => {
    try {
      const data = await getUser(email);
      setRole(data?.role);
      if (data === null) {
        //save user to db
        const userData = {
          id: user?.id || "",
          email: user?.email || "",
          name: user?.user_metadata.name || "",
          pic: user?.user_metadata.avatar_url || "",
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
      <MediaPost avatarUrl={user.user_metadata.avatar_url} />
    </div>
  );
};

export default Home;
