import React, { ReactNode, useRef } from "react";
import { View, Animated, Pressable, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Colors, BorderRadius, Shadows } from "../../constants/theme";

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  onPress?: () => void;
  flat?: boolean;
}

export function Card({ children, style, padded = true, onPress, flat }: CardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  if (onPress) {
    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.97,
        tension: 150,
        friction: 5,
        useNativeDriver: true,
      }).start();
    };
    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        tension: 150,
        friction: 5,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={[
            styles.card,
            flat && styles.flat,
            padded && styles.padded,
            { transform: [{ scale }] },
            style,
          ]}
        >
          {children}
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, flat && styles.flat, padded && styles.padded, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  flat: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  padded: {
    padding: 16,
  },
});
