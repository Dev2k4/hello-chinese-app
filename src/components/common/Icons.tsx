import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { ViewStyle } from "react-native";

type IconSize = "sm" | "md" | "lg" | "xl" | "xxl";

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 22,
  lg: 28,
  xl: 36,
  xxl: 48,
};

export function MaterialIcon({
  name,
  size = "md",
  color = Colors.textPrimary,
  style,
}: {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: IconSize;
  color?: string;
  style?: ViewStyle;
}) {
  return (
    <MaterialIcons
      name={name}
      size={sizeMap[size]}
      color={color}
      style={style}
    />
  );
}

export function IonIcon({
  name,
  size = "md",
  color = Colors.textPrimary,
  style,
}: {
  name: keyof typeof Ionicons.glyphMap;
  size?: IconSize;
  color?: string;
  style?: ViewStyle;
}) {
  return (
    <Ionicons
      name={name}
      size={sizeMap[size]}
      color={color}
      style={style}
    />
  );
}

export function MCIcon({
  name,
  size = "md",
  color = Colors.textPrimary,
  style,
}: {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: IconSize;
  color?: string;
  style?: ViewStyle;
}) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={sizeMap[size]}
      color={color}
      style={style}
    />
  );
}
