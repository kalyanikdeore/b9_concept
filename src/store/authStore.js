import { create } from "zustand";

import axiosInstance from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  role: null, // Add role
  loading: true,

  login: async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      await useAuthStore.getState().checkAuth();
      console.log(response);
      return response.data;
    } catch (error) {
      // console.error("Login failed:", error);
      return error;
    }
  },

  signup: async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      console.log(response);
      await useAuthStore.getState().checkAuth();
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error);
      return error;
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({
        user: res.data.user,
        isAuthenticated: true,
        role: res.data.user?.role,
        loading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, role: null, loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export default useAuthStore;
