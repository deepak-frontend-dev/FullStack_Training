"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    // TODO: no proper validation
    const data = await login({ email, password });
    if (data.token) {
      setToken(data.token);
      setUser(data.user);
      router.push("/dashboard");
    } else {
      setMessage(data.message || "Login failed");
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <div className="bg-white rounded border p-4">
        <input
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button
          className="bg-green-700 text-white px-4 py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-red-600 mt-3">{message}</p>
      </div>
    </div>
  );
}
