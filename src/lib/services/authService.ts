import { supabase } from "../supabase/supabaseClient";

interface Auth {
  email: string;
  password: string;
  name?: string;
}

const signUp = async ({ email, password, name }: Auth) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: import.meta.env.VITE_DEV_SITE_URL,
      data: { name },
    },
  });
  if (error) {
    console.error("Sign up error:", error.message);
    throw new Error("Sign up error");
  }
  return data;
};

const signIn = async ({ email, password }: Auth) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Sign in error:", error.message);
    throw new Error("Sign in error");
  }
};

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: import.meta.env.VITE_DEV_SITE_URL,
    },
  });
  if (error) {
    console.error("Google sign in error:", error.message);
    throw new Error("Google sign in error");
  }
  return true;
};

const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Get session error:", error.message);
    throw new Error("Get session error");
  } else {
    console.log("Current session:", session);
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
    throw new Error("Sign out error");
  }
};

export { signUp, signIn, signInWithGoogle, getSession, signOut };
