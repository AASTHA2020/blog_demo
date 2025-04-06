import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  register: async (username, email, password, navigate, setError) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok && data?.username) {
        set({
          user: {
            id: data.id || Date.now(),
            username,
            email,
            password,
          },
          isLoading: false,
        });
        navigate("/home");
      } else {
        set({ isLoading: false });
        setError?.("Registration failed. Please try again.");
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
      setError?.(err.message);
    }
  },

  logout: () => set({ user: null }),
}));

export default useAuthStore;
