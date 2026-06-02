import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors, Spacing, BorderRadius, Shadows } from "../../constants/theme";
import { MaterialIcon } from "./Icons";

type BackButtonProps = {
  fallbackHref?: string;
};

export function BackButton({}: BackButtonProps) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <TouchableOpacity onPress={handleBack} activeOpacity={0.88} style={styles.btn}>
        <MaterialIcon name="arrow-back" size="sm" color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    top: Spacing.lg + 5,
    left: Spacing.md,
    zIndex: 20,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.sm,
  },
});
