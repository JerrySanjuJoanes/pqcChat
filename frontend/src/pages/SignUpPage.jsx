import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 animate-fadeInLeft">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg
              transition-all duration-300"
              >
                <MessageSquare className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h1 className="text-3xl font-bold mt-4 gradient-text">Create Account</h1>
              <p className="text-base-content/60 text-lg">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <label className="label">
                <span className="label-text font-semibold text-base">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-primary/60" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 input-enhanced rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <label className="label">
                <span className="label-text font-semibold text-base">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-primary/60" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 input-enhanced rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <label className="label">
                <span className="label-text font-semibold text-base">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-primary/60" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 input-enhanced rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-base-300/50 rounded-r-xl transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-primary/60 hover:text-primary transition-colors" />
                  ) : (
                    <Eye className="size-5 text-primary/60 hover:text-primary transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full btn-enhanced rounded-xl h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 animate-fadeInUp"
              style={{animationDelay: '0.4s'}}
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center animate-fadeInUp" style={{animationDelay: '0.5s'}}>
            <p className="text-base-content/60 text-lg">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-semibold hover:scale-105 transition-transform duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;
