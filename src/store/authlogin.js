// src/store/authlogin.js
import { create } from "zustand";

const authlogin = create((set) => ({
  token: null,
  username: "",
  password: "",
  error: "",
  isLoading: false,

  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),

  login: async (navigate) => {
    set({ isLoading: true, error: "" });

    const { username, password } = authlogin.getState();

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        set({ token: data.token, isLoading: false });
        navigate("/home"); 
      } else {
        set({ error: "Invalid username or password", isLoading: false });
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  logout: () =>
    set({
      token: null,
      username: "",
      password: "",
      error: "",
    }),
}));

export default authlogin;
