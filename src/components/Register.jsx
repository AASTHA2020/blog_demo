import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();

  // Local state for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Zustand store hooks
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password, navigate, setError); // Pass everything to the store
  };

  return (
    <div className="mt-44 lg:mt-28 mb-28 justify-items-center">
      <h1 className="text-2xl font-bold flex justify-center tracking-widest mb-4">
        Register your Account
      </h1>

      <div className="max-w-lg mx-auto border p-8 border-gray-300 rounded-lg shadow-lg">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      <p className="text-center mt-6">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 text-lg underline hover:text-blue-800"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
