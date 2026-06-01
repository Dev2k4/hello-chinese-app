export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000";

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    REFRESH: `${API_BASE_URL}/api/auth/refresh`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`,
  },
  LESSONS: {
    SUBMIT_PROGRESS: (id: string) =>
      `${API_BASE_URL}/api/progress/lessons/${id}`,
  },
  REVIEWS: {
    DUE: `${API_BASE_URL}/api/reviews/due`,
    SUBMIT: `${API_BASE_URL}/api/reviews/submit`,
  },
  USER: {
    PROGRESS: `${API_BASE_URL}/api/progress/summary`,
    STREAK: `${API_BASE_URL}/api/progress/streak`,
  },
  USERS: {
    ME: `${API_BASE_URL}/api/users/me`,
    SETTINGS: `${API_BASE_URL}/api/users/me/settings`,
    ONBOARDING: `${API_BASE_URL}/api/users/onboarding`,
  },
  CONTENT: {
    CATALOG: `${API_BASE_URL}/api/content/catalog`,
    LESSON: (id: string) => `${API_BASE_URL}/api/content/lessons/${id}`,
    PATHS: `${API_BASE_URL}/api/content/paths`,
    PATH_BY_CODE: (code: string) => `${API_BASE_URL}/api/content/paths/${code}`,
    VOCABULARY_BY_LEVEL: (levelId: string, page = 1, limit = 50) =>
      `${API_BASE_URL}/api/content/levels/${levelId}/vocabulary?page=${page}&limit=${limit}`,
    GRAMMAR_BY_LEVEL: (levelId: string) =>
      `${API_BASE_URL}/api/content/levels/${levelId}/grammar`,
    VOCABULARY_SEARCH: (q: string) =>
      `${API_BASE_URL}/api/content/vocabulary/search?q=${encodeURIComponent(q)}`,
  },
} as const;
