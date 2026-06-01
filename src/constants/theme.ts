import { Platform } from "react-native";

export const Colors = {
  // Mèo Long: cam mèo + đỏ vàng kim Tết
  primary: "#F97316",
  primaryDark: "#C2410C",
  primaryLight: "#FB923C",
  secondary: "#EAB308",
  accent: "#F43F5E",

  success: "#10B981",
  successLight: "#D1FAE5",
  error: "#EF4444",
  errorLight: "#FEE2E2",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  info: "#3B82F6",
  infoLight: "#DBEAFE",

  background: "#FFF7ED",
  surface: "#FFFFFF",
  surfaceAlt: "#FFEDD5",

  textPrimary: "#1C1917",
  textSecondary: "#57534E",
  textLight: "#A8A29E",

  border: "#E7E5E4",
  borderLight: "#F5F5F4",
  disabled: "#D6D3D1",
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",

  streak: "#EF4444",
  xp: "#8B5CF6",

  cardShadow: "rgba(0, 0, 0, 0.06)",
  gradientStart: "#F97316",
  gradientEnd: "#FB923C",
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
