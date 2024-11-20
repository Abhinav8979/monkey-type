import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { RegisterUser } from "../services/authServices"; // Use your Axios utility here

const CreateAccount: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null); // Clear previous error
      const response = await RegisterUser(
        formData.email,
        formData.password,
        formData.name
      );
      localStorage.setItem("playerName", response.name);
      redirect("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="h-screen flex p-8 bg-bgColor text-textPrimary">
      {/* Left Section - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center relative">
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center text-indigo-300 hover:text-indigo-500 transition duration-200"
        >
          <FaArrowLeft className="mr-2" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <h1 className="md:text-7xl text-3xl font-extrabold mb-6">
          Create Account
        </h1>
        <form className="w-3/4 max-w-sm space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 text-textSecondary block w-full rounded-md focus:outline-none py-2 px-4"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 text-textSecondary block w-full rounded-md focus:outline-none py-2 px-4"
              required
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="mt-1 text-textSecondary block w-full rounded-md focus:outline-none py-2 px-4"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between items-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-300 hover:underline">
                Login
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Right Section - Image */}
      <div
        className="w-1/2 bg-cover bg-center rounded-xl"
        style={{ backgroundImage: "url(/keybord2.jpg)" }}
      ></div>
    </div>
  );
};

export default CreateAccount;
