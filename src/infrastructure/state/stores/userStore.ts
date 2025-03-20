import { create } from "zustand";
import { storage } from "../storage";
import { AuthState, User } from "./types";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isSignedIn: false,
      isLoading: false,

      login: (user: User, token: string) => {
        set({ user, token, isSignedIn: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, token: null, isSignedIn: false, isLoading: false });
      },

      setLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: "auth-storage",
      storage,
    }
  )
);
