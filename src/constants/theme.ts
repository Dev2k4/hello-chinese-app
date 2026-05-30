import { Platform } from "react-native";

export const Colors = {
  // Xianxia chủ đạo: xanh ngọc + vàng kim
  primary: "#0F766E",
  primaryDark: "#064E3B",
  primaryLight: "#14B8A6",
  secondary: "#D4A843",
  secondaryDark: "#B8860B",
  accent: "#F5D77A",

  // Ngũ hành
  wood: "#2E7D32",
  fire: "#DC2626",
  earth: "#8D6E63",
  metal: "#B0BEC5",
  water: "#0288D1",

  cultivation: "#7C3AED",
  cultivationLight: "#EDE9FE",

  // Ngữ nghĩa
  success: "#059669",
  successLight: "#D1FAE5",
  error: "#DC2626",
  errorLight: "#FEE2E2",
  warning: "#D97706",
  warningLight: "#FEF3C7",
  info: "#0288D1",
  infoLight: "#E0F2FE",

  // Nền + surface
  background: "#F5F0E8",
  surface: "#FFFAF0",
  surfaceAlt: "#EFE6D8",
  paperLight: "#FFF8E7",

  // Text
  textPrimary: "#2C1810",
  textSecondary: "#6B5B4E",
  textLight: "#A09283",

  border: "#D4C5B0",
  borderLight: "#E8DDD0",
  disabled: "#D1C5B8",
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",

  // Game stats
  streak: "#DC2626",
  xp: "#7C3AED",

  cardShadow: "rgba(0, 0, 0, 0.08)",

  // Gradient cũ (giữ để không break code cũ)
  gradientStart: "#0F766E",
  gradientEnd: "#14B8A6",

  // Màu đặc biệt cho các nhân vật
  boss: "#7F1D1D",
  bossLight: "#FEE2E2",
  rival: "#B91C1C",
  sister: "#BE185D",
  scholar: "#1E3A5F",
  immortal: "#5B21B6",
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
} as const;

const fontFamily = Platform.select({
  ios: "System",
  android: "Roboto",
  default: "System",
});

export const Typography = {
  hero: {
    fontFamily,
    fontSize: 34,
    fontWeight: "800" as const,
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily,
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 36,
  },
  h2: {
    fontFamily,
    fontSize: 22,
    fontWeight: "700" as const,
    lineHeight: 30,
  },
  h3: {
    fontFamily,
    fontSize: 18,
    fontWeight: "600" as const,
    lineHeight: 26,
  },
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily,
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: "500" as const,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: "700" as const,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  label: {
    fontFamily,
    fontSize: 11,
    fontWeight: "700" as const,
    lineHeight: 14,
    letterSpacing: 1.2,
  },
};

export const Shadows = {
  sm: {
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 12,
  },
};
