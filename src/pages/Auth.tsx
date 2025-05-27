import { AuthImage, LoginForm, RegisterForm } from "../components/auth";
import { useToggleStore } from "../lib/stores/useAuthStore";

export default function Auth() {
  const { isOpen, toggle } = useToggleStore();
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-200 transition-all duration-500">
      <AuthImage />

      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="card shadow-lg bg-base-100 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isOpen ? "Login" : "Register"}
            </h2>

            {isOpen ? <LoginForm /> : <RegisterForm />}

            <p className="text-sm text-center mt-6">
              {isOpen ? "Don't have an account?" : "Already have an account?"}
              <span
                className="link link-primary ml-1 cursor-pointer"
                onClick={() => toggle()}
              >
                {isOpen ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
