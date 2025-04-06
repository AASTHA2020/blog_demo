import React from "react";
import { useNavigate } from "react-router-dom";
import authlogin from "../store/authlogin";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const {
    username,
    password,
    error,
    isLoading,
    setUsername,
    setPassword,
    login,
  } = authlogin();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(navigate); 
  };

  return (
    <div className="mt-44 lg:mt-28 h-60 justify-items-center">
      <h1 className="text-2xl font-bold text-center tracking-widest mb-1">Login</h1>

      {error && <p className="text-center mt-4 text-sm text-red-600">{error}</p>}

      <div className="max-w-lg mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-5 w-96 p-10">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`h-10 w-32 bg-blue-500 text-white py-1 font-medium rounded-md mt-1 ml-8 flex items-center justify-center transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
