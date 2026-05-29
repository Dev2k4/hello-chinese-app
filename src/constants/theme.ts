import { Platform } from "react-native";

export const Colors = {
  primary: "#E53935",
  primaryDark: "#C62828",
  primaryLight: "#FF6F60",
  secondary: "#FFD700",
  secondaryDark: "#F9A825",
  accent: "#FF6F00",
  success: "#43A047",
  successLight: "#E8F5E9",
  error: "#E53935",
  errorLight: "#FFEBEE",
  warning: "#FB8C00",
  warningLight: "#FFF3E0",
  info: "#1E88E5",
  infoLight: "#E3F2FD",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  surfaceAlt: "#FAFAFA",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  disabled: "#D1D5DB",
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",
  streak: "#FF6B35",
  xp: "#7C4DFF",
  cardShadow: "rgba(0, 0, 0, 0.08)",
  gradientStart: "#E53935",
  gradientEnd: "#FF6F60",
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
