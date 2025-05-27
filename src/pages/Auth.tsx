import { useState } from "react";
import { AuthImage, LoginForm, RegisterForm } from "../components/auth";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-200 transition-all duration-500">
      <AuthImage />

      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="card shadow-lg bg-base-100 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? "Login" : "Register"}
            </h2>

            {isLogin ? <LoginForm /> : <RegisterForm />}

            <p className="text-sm text-center mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                className="link link-primary ml-1 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
