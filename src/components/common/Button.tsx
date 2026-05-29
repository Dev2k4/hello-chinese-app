import React, { useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  Animated,
} from "react-native";
import { Colors, Spacing, BorderRadius, Typography, Shadows } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  icon,
}: ButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isDisabled = disabled || loading;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      tension: 150,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 150,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const sizeStyles = {
    sm: { py: Spacing.xs + 2, px: Spacing.md, iconSize: 16 },
    md: { py: Spacing.sm + 4, px: Spacing.lg, iconSize: 18 },
    lg: { py: Spacing.md + 2, px: Spacing.xl, iconSize: 20 },
  }[size];

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" || variant === "ghost" ? Colors.primary : "#fff"}
          size={size === "sm" ? "small" : "small"}
        />
      ) : (
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.sm,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {icon}
          <Text
            style={[
              styles.text,
              styles[`text_${variant}` as keyof typeof styles] as any,
              styles[`textSize_${size}` as keyof typeof styles] as any,
              isDisabled && styles.textDisabled,
            ]}
          >
            {title}
          </Text>
        </Animated.View>
      )}
    </>
  );

  if (variant === "gradient") {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={1}
        style={[{ borderRadius: BorderRadius.md }, isDisabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.base,
            { paddingVertical: sizeStyles.py, paddingHorizontal: sizeStyles.px },
          ]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      activeOpacity={1}
      style={[
        styles.base,
        styles[variant],
        { paddingVertical: sizeStyles.py, paddingHorizontal: sizeStyles.px },
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.md,
    flexDirection: "row",
    gap: Spacing.sm,
  },
  primary: {
    backgroundColor: Colors.primary,
    ...Shadows.sm,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    ...Shadows.sm,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  gradient: {},
  disabled: {
    opacity: 0.4,
  },
  text: {
    ...Typography.button,
  },
  text_primary: {
    color: "#FFFFFF",
  },
  text_secondary: {
    color: Colors.textPrimary,
  },
  text_outline: {
    color: Colors.primary,
  },
  text_ghost: {
    color: Colors.primary,
  },
  text_gradient: {
    color: "#FFFFFF",
  },
  textSize_sm: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  textSize_md: {
    fontSize: 15,
  },
  textSize_lg: {
    fontSize: 17,
  },
  textDisabled: {
    color: Colors.textLight,
  },
});
