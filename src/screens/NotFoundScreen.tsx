import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors, Spacing, Typography } from "../constants/theme";
import { Button } from "../components/common";
import { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function NotFoundScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😅</Text>
      <Text style={styles.title}>Trang không tìm thấy</Text>
      <Text style={styles.subtitle}>Có vẻ như bạn đã lạc đường rồi!</Text>
      <Button
        title="Về trang chủ"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
          })
        }
        variant="primary"
      />
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
