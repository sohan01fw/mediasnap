import { supabase } from "../supabase/supabaseClient";

interface UserType {
  id: string;
  email: string;
  name: string;
  pic?: string;
}

const getUser = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Check user error:", error.message);
    throw new Error("Check user error");
  }
  return data;
};

//save user to db
const saveUser = async (user: UserType) => {
  const { data, error } = await supabase.from("users").insert(user);
  if (error) {
    console.error("Save user error:", error.message);
    throw new Error("Save user error");
  }
  return data;
};

const getAllUsersPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, user:users(*)");

  if (error) {
    console.log(error);
    throw new Error("Error fetching posts");
  }

  return data;
};

export { getUser, saveUser, getAllUsersPosts };
