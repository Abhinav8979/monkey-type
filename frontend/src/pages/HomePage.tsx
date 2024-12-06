import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // You can remove this as back button is no longer needed
import { loginUser } from "../services/authServices";

const Login: React.FC = () => {
  const [name, setName] = useState(""); // State for the name input field
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // To navigate to /speed-test

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    try {
      sessionStorage.setItem("userName", name); // Save name in sessionStorage
      navigate("/speed-test"); // Navigate to /speed-test
    } catch (err: any) {
      setError("An error occurred while creating the player name.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
      <div className="w-3/4 max-w-md bg-white text-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-600">
          Create Player Name
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Player Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 text-gray-800 block w-full rounded-md focus:outline-none py-2 px-4 border border-gray-300"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
