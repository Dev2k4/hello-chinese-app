import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Colors, Spacing, Typography } from "../src/constants/theme";
import { Button } from "../src/components/common";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😅</Text>
      <Text style={styles.title}>Trang không tìm thấy</Text>
      <Text style={styles.subtitle}>
        Có vẻ như bạn đã lạc đường rồi!
      </Text>
      <Link href="/(tabs)" asChild>
        <Button title="Về trang chủ" onPress={() => {}} variant="primary" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    ...Typography.h1,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});
