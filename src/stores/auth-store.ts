/**
 * Zustand store برای مدیریت احراز هویت
 */

import { create } from "zustand";
import { User, getUser, setUser, removeUser, getToken, setToken, removeToken } from "@/lib/cookies";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    setUser(user);
    setToken(token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    removeUser();
    removeToken();
    set({ user: null, token: null, isAuthenticated: false });
  },

  initialize: () => {
    const user = getUser();
    const token = getToken();
    set({
      user,
      token,
      isAuthenticated: !!(user && token),
    });
  },
}));

