import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.role);

      if (res.data.role === "ROLE_ADMIN") navigate("/admin");
      else navigate("/dashboard");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT BRAND */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-900 to-blue-700 text-white p-10 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Mini Bank</h1>
        <p className="text-lg opacity-90">
          Secure online banking made simple.
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Login
          </h2>

          {/* EMAIL */}
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
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-11 border rounded-lg pl-11 pr-4
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700
                       text-white py-2.5 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
