"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1 className="mb-4 text-lg">Signup</h1>
      <hr />
      <label>Email</label>
      <input
        type="text"
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
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
        onClick={onSignup}
      >
        Signup
      </button>
    </div>
  );
};

export default SignUp;
