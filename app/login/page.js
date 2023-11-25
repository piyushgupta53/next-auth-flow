"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      router.push("/dashboard");
    } catch (error) {
      console.log("Login failed", error.message);
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1 className="mb-4 text-lg">Login</h1>
      <hr />
      <label>Username</label>
      <input
        type="text"
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label>Password</label>
      <input
        type="password"
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        className="bg-blue-300 rounded-full py-2 px-2 hover:bg-blue-500"
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
