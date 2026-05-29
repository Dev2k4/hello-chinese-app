import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";

interface SafeAreaProps {
  children: ReactNode;
  topColor?: string;
  bottomColor?: string;
}

export function SafeArea({
  children,
  topColor = Colors.background,
  bottomColor = Colors.background,
}: SafeAreaProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.topPlaceholder, { height: insets.top, backgroundColor: topColor }]} />
      <View style={styles.content}>{children}</View>
      <View style={[styles.bottomPlaceholder, { height: insets.bottom, backgroundColor: bottomColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topPlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  bottomPlaceholder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
});
