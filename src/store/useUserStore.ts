import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserSettings } from "../types/user.types";
import { authService } from "../services/authService";
import { API_ROUTES } from "../constants/apiRoutes";
import apiClient from "../services/apiClient";

const TOKEN_KEY = "@hello_chinese_token";
const PROLOGUE_KEY = "@hello_chinese_prologue";

export interface UserProgress {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
  totalReviewsCompleted: number;
}

interface UserState {
  user: User | null;
  token: string | null;
  progress: UserProgress | null;
  settings: UserSettings | null;
  isLoading: boolean;
  hydrated: boolean;
  hasSeenPrologue: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setProgress: (progress: UserProgress) => void;
  setSettings: (settings: UserSettings) => void;
  updateXp: (xp: number) => void;
  clearAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  hydrate: () => Promise<void>;
  markPrologueSeen: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  token: null,
  progress: null,
  settings: null,
  isLoading: false,
  hydrated: false,
  hasSeenPrologue: false,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    AsyncStorage.setItem(TOKEN_KEY, token ?? "");
    set({ token });
  },
  setProgress: (progress) => set({ progress }),
  setSettings: (settings) => set({ settings }),

  updateXp: (xp) =>
    set((state) => ({
      progress: state.progress
        ? { ...state.progress, totalXp: state.progress.totalXp + xp }
        : null,
    })),

  clearAuth: () => {
    AsyncStorage.removeItem(TOKEN_KEY);
    set({ user: null, token: null, progress: null });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await authService.login(email, password);
      await AsyncStorage.setItem(TOKEN_KEY, res.accessToken);
      set({
        user: res.user,
        token: res.accessToken,
        isLoading: false,
      });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  register: async (email, username, password) => {
    set({ isLoading: true });
    try {
      const res = await authService.register({ email, username, password });
      await AsyncStorage.setItem(TOKEN_KEY, res.accessToken);
      set({
        user: res.user,
        token: res.accessToken,
        isLoading: false,
      });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  fetchProfile: async () => {
    try {
      const { data } = await apiClient.get(API_ROUTES.USERS.ME);
      set({
        user: data.user,
        progress: data.progress,
        settings: data.settings,
      });
    } catch {
      // silent fail
    }
  },

  markPrologueSeen: async () => {
    await AsyncStorage.setItem(PROLOGUE_KEY, "true");
    set({ hasSeenPrologue: true });
  },

  hydrate: async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const prologue = await AsyncStorage.getItem(PROLOGUE_KEY);
      if (token) {
        set({ token, hydrated: true, hasSeenPrologue: prologue === "true" });
      } else {
        set({ hydrated: true, hasSeenPrologue: prologue === "true" });
      }
    } catch {
      set({ hydrated: true });
    }
  },
}));
