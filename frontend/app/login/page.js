"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/api";
import TokenService from "../../services/tokenService";
import { LoaderCircle } from "lucide-react";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const [triedLogin, setTriedLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    TokenService.removeToken();
  }, [])

  async function handleLogin() {
    setTriedLogin(true);

    let newError = { email: "", password: "" };

    if (!email) {
      newError.email = "Please fill email field";
    } else if ((!/\S+@\S+\.\S+/.test(email))) {
      newError.email = "Please enter a valid email";
    }
    if (!password) {
      newError.password = "Please fill password field";
    } else if (password.length < 6) {
      newError.password = "Password must be at least 6 characters long";
    }

    setError(newError);

    if (newError.email || newError.password) return;

    setLoading(true);
    try {
      const res = await login({ email, password });

      const { token } = res?.data?.data || {};

      if (token) {
        toast.success("Login successful");
        TokenService.setToken(token);
        router.push("/");
      } else {
        const msg = res?.data?.message || "Login failed";
        toast.error(msg);
        setError({ ...newError, general: msg });
      }

    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.message || "Something went wrong";
      toast.error(msg);
      setError({ ...newError, general: msg });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setTriedLogin(false);
    setError({ email: "", password: "", general: "" });
  }, [])

  useEffect(() => {

    if (triedLogin) {
      let newError = { email: "", password: "" };

      if (!email) {
        newError.email = "Please fill email field";
      } else if ((!/\S+@\S+\.\S+/.test(email))) {
        newError.email = "Please enter a valid email";
      }
      if (!password) {
        newError.password = "Please fill password field";
      } else if (password.length < 6) {
        newError.password = "Password must be at least 6 characters long";
      }

      setError(newError);
    }

  }, [email, password])

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md animate-[fadeIn_0.4s_ease]">
        <h1 className="text-3xl text-center font-semibold text-white tracking-wide mb-8">
          Sign In
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          autoComplete="off"
        >
          <div className="mb-5">
            <input
              className={`w-full px-4 py-3 bg-black/40 backdrop-blur-md text-white rounded-xl border transition-all duration-300 placeholder-gray-300 ${error.email ? "border-red-600" : "border-white/20 focus:border-blue-500"}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              autoComplete="off"
              name="email"
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              className={`w-full px-4 py-3 bg-black/40 backdrop-blur-md text-white rounded-xl border transition-all duration-300 placeholder-gray-300 ${error.password || error.general ? "border-red-600" : "border-white/20 focus:border-blue-500"}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="new-password"
              name="password"
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-500 active:scale-95 transition-all duration-300"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
