import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GoogleBtn from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { signIn, signInWithGoogle } from "../../lib/services/authService";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInput = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(schema) });

  const mutation = useMutation({ mutationFn: signIn });
  const googleMutation = useMutation({ mutationFn: signInWithGoogle });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginInput) => {
    try {
      await mutation.mutateAsync(data);
      toast.success("Successfully login!");
      navigate("/");
    } catch {
      toast.error("Invalid login credentials!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleMutation.mutateAsync();
    } catch {
      toast.error("error occurred! please try again");
    }
  };
  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-error text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {errors.password && (
          <p className="text-error text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Loading..." : "Login"}
        </button>

        <div className="divider">OR</div>
      </form>
      <div>
        <GoogleBtn handleGoogleSignIn={handleGoogleSignIn} />
      </div>
    </div>
  );
}
