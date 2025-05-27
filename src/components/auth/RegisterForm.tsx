import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GoogleBtn from "../ui/button";
import { useSignUp } from "../../lib/hooks/useAuth";
import { toast } from "sonner";
import { redirect } from "react-router-dom";
import { supabase } from "../../lib/supabase/supabaseClient";

const schema = z.object({
  name: z.string().min(2, "Name required"),
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

  const { mutateAsync: signUp } = useSignUp();

  const onSubmit = async (data: RegisterInput) => {
    try {
      await signUp(data);

      await supabase.from("users").insert({
        name: data.name,
        email: data.email,
      });

      toast.success("Successfully registered!");
      redirect("/");
    } catch (err) {
      console.error((err as Error).message);
      toast.error("error occurred! please try again");
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

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>

        <div className="divider">OR</div>
      </form>
      <div>
        <GoogleBtn />
      </div>
    </div>
  );
}
