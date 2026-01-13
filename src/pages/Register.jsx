import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT BRAND */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-10 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Mini Bank</h1>
        <p className="text-lg opacity-90">
          Join modern, secure digital banking.
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={submit}
          className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          {/* Name */}
          <div className="relative mb-4">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full h-11 border rounded-lg pl-11 pr-4
           focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-11 border rounded-lg pl-11 pr-4
           focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-11 border rounded-lg pl-11 pr-4
           focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </span>
          </div>

          <button type="submit" className="btn-blue w-full">
            Register
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
