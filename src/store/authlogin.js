import { create } from "zustand";
import useCartStore from "./cartStore";

const useAuthLogin = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  error: "",
  isLoading: false,

  // Login Logic
  login: async (username, password, navigate) => {
    set({ isLoading: true });

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        set({
          user: { username, password },
          token: data.token,
          isLoggedIn: true,
          isLoading: false,
        });

        // ✅ On login, restore the cart (if exists)
        // useCartStore.getState().restoreCart();

        // Redirect to the home page
        navigate("/home");
      } else {
        set({ error: "Invalid username or password", isLoading: false });
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Logout Logic
  logout: () => {
    // useCartStore.getState().clearCart();  // Clear cart on logout
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      error: "",
      isLoading: false,
    });
  },
}));

export default useAuthLogin;
