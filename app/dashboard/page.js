"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/me");
      console.log(response);
      setData(response.data.data.email);
    };
    fetchData();
  }, []);

  async function onLogout() {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout successful", response.data);
      router.push("/");
    } catch (error) {
      console.log("Failed to logout", error.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-lime-200">
      <div>Dashboard</div>
      <div>Your email: {data}</div>

      <button
        className="mt-4 bg-blue-300 px-2 py-2 rounded-full hover:bg-blue-500 ml-4 mr-4"
        onClick={onLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
