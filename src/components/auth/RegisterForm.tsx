import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GoogleBtn from "../ui/button";
import { toast } from "sonner";
import { signInWithGoogle, signUp } from "../../lib/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useToggleStore } from "../../lib/stores/useAuthStore";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  pic: z.string().optional(),
});

type RegisterInput = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(schema) });

  const { toggle } = useToggleStore();
  const mutation = useMutation({ mutationFn: signUp });
  const googleMutation = useMutation({ mutationFn: signInWithGoogle });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await mutation.mutateAsync(data);
      toast.success("Successfully registered!");
      toggle();
    } catch {
      toast.error("error occurred! please try again");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleMutation.mutateAsync();
    } catch {
      toast.error("error occurred while login! please try again");
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          placeholder="Full Name"
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-error text-sm">{errors.name.message}</p>
        )}

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
          {mutation.isPending ? "Loading..." : "Register"}
        </button>

        <div className="divider">OR</div>
      </form>
      <div>
        <GoogleBtn handleGoogleSignIn={handleGoogleSignIn} />
      </div>
    </div>
  );
}
