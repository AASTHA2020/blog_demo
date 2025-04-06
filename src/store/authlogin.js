import { create } from "zustand";

const useAuthLogin = create((set) => ({
    user: null,
    token: null,
    isLoggedIn: false,
    error: "",
    isLoading: false,

    login: async (username, password, navigate) => {
        set({ isLoading: true, error: "" });

        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.token) {
                set({
                    token: data.token,
                    user: { username },
                    isLoggedIn: true,
                    isLoading: false,
                });
                navigate("/home");
            } else {
                set({ error: "Invalid username or password", isLoading: false });
            }
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    },

    logout: () => {
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
