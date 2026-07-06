import { BsGift } from "react-icons/bs";
import { LuShieldCheck } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { PiSignInBold } from "react-icons/pi";

import bgImage from "../../../assets/login-bg.png";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFeatureText, AuthFeatureTile, AuthLeftLogo } from "../components";
import { ROUTES } from "../../../app/router/routes";
import { useAuth } from "../hooks/authHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const signupSchema = z.object({
  name: z.string().min(4, {
    message: "Full name should be min atleast 4 characters long",
  }),
  phone: z.string().length(10, {
    error: "Mobile number should be 10 digits long",
  }),
  email: z.email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
type SignupFormData = z.infer<typeof signupSchema>;

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
      toast.success("Welcome back!");
    } catch {
      // error is handled by the error useEffect
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-bg text-text">
      {/* LEFT SIDE */}
      <div
        className="flex-1 min-h-screen px-7 py-5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <AuthLeftLogo />

        <AuthFeatureText feature1="Join." feature2="Shop." feature3="Save." />

        <p className="max-w-xs text-text-muted mb-10">
          Create your account to unlock exclusive deals, faster checkout, and
          easy order tracking.
        </p>

        <AuthFeatureTile
          icon={BsGift}
          title="Best Deals"
          desc="Exclusive offers just for you"
        />

        <AuthFeatureTile
          icon={LuShieldCheck}
          title="Secure Shopping"
          desc="Your data is always protected"
        />

        <AuthFeatureTile
          icon={TbTruckDelivery}
          title="Fast Delivery"
          desc="Quick and reliable shipping"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 h-screen overflow-y-auto bg-surface rounded-l-xl py-5">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 mx-10">
          <p className="text-5xl font-semibold mb-2">Create your account</p>
          <p className="text-lg text-text-muted mb-10">
            Sign up to get started with ShopHub
          </p>

          {/* FULL NAME */}
          <p className="mb-2">Full Name</p>
          <div className="relative mb-2">
            <BsPerson
              size={22}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              type="text"
              placeholder="Andrew Patel"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* EMAIL */}
          <p className="mb-2 mt-3">Email</p>
          <div className="relative mb-2">
            <HiOutlineMail
              size={22}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              type="email"
              placeholder="hello@example.com"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Phone */}
          <p className="mb-2 mt-3">Phone Number</p>
          <div className="relative mb-2">
            <HiOutlineMail
              size={22}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input type="tel" placeholder="1234567890" {...register("phone")} />
          </div>

          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          {/* PASSWORD */}
          <p className="mb-2 mt-3">Password</p>
          <div className="relative mb-2">
            <MdOutlineLock
              size={22}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
            >
              {showPassword ? (
                <MdOutlineVisibilityOff size={22} />
              ) : (
                <MdOutlineVisibility size={22} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* SIGN IN */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full h-12 rounded-xl mb-5 disabled:opacity-60 mt-10"
          >
            <p className="font-semibold">
              {isLoading ? "Creating..." : "Create Account"}
            </p>
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6 mb-10">
            <div className="flex-1 h-px bg-border" />
            <p className="text-text-muted text-sm whitespace-nowrap">
              Already have an account?
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Login */}
          <button
            type="button"
            className="btn-outline-primary w-full h-12 rounded-xl mb-5"
            onClick={() => navigation.navigate(ROUTES.SIGNIN)}
          >
            <div className="flex justify-center items-center gap-3">
              <PiSignInBold size={27} />
              <p className="font-semibold">Sign in</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
