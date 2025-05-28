import { useEffect } from "react";
import { useAuthContext } from "../lib/hooks/useAuth";
import { checkUser, saveUser } from "../lib/services/authService";

const Home = () => {
  const { user } = useAuthContext();
  const email = user?.email || "";

  //save user to db

  const checkUserInDb = async () => {
    try {
      const data = await checkUser(email);
      if (data === null) {
        //save user to db
        const userData = {
          id: user?.id || "",
          email: user?.email || "",
          name: user?.user_metadata.name || "",
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
      <h1>Home</h1>
    </div>
  );
};

export default Home;
