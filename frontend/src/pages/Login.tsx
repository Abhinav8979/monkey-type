import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { loginUser } from "../services/authServices";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userDeatil = await loginUser(email, password);
      localStorage.setItem("playerName", userDeatil.name);
      redirect("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="h-screen flex p-8 bg-bgColor text-textPrimary">
      <div className="w-1/2 flex flex-col justify-center items-center relative">
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center text-textSecondary hover:text-textPrimary transition duration-200"
        >
          <FaArrowLeft className="mr-2" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <h1 className="md:text-8xl text-4xl font-extrabold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="w-3/4 max-w-sm space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 text-textSecondary block w-full rounded-md focus:outline-none py-2 px-4"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 text-textSecondary block w-full rounded-md focus:outline-none py-2 px-4"
            />
          </div>
          <div className="flex justify-between items-center">
            <Link to="#" className="text-sm text-indigo-300 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>

      <div
        className="w-1/2 bg-cover bg-center rounded-xl"
        style={{ backgroundImage: "url(/keyboard.jpg)" }}
      ></div>
    </div>
  );
};

export default Login;
