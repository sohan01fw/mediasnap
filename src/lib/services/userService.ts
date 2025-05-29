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

//update user role
const updateUserRole = async (id: string, role: "ADMIN" | "USER") => {
  const { data, error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error updating user role");
  }
  return data;
};

const deletePost = async (id: string) => {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Error deleting post");
  }
  return data;
};
const deleteMultiplePosts = async (ids: string[]) => {
  const { data, error } = await supabase.from("posts").delete().in("id", ids);
  if (error) {
    console.log(error);
    throw new Error("Error deleting posts");
  }
  return data;
};

export {
  getUser,
  saveUser,
  getAllUsersPosts,
  updateUserRole,
  deletePost,
  deleteMultiplePosts,
};
