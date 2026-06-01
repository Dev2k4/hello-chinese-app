import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Typography, Spacing, BorderRadius } from "../../src/constants/theme";
import { Button } from "../../src/components/common";
import { useUserStore } from "../../src/store/useUserStore";

export default function AuthScreen() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, isLoading } = useUserStore();

  const handleSubmit = async () => {
    if (!email || !password || (mode === "register" && !username)) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, username, password);
      }
      router.replace("/onboarding");
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Đã có lỗi xảy ra, vui lòng thử lại";
      Alert.alert("Lỗi", msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <LinearGradient
          colors={[Colors.primaryDark, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.emoji}>🐱🐉</Text>
          <Text style={styles.title}>Chinese4VN</Text>
          <Text style={styles.subtitle}>Học tiếng Trung cùng Mèo Long</Text>
        </LinearGradient>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, mode === "login" && styles.tabActive]}
            onPress={() => setMode("login")}
          >
            <Text style={[styles.tabText, mode === "login" && styles.tabTextActive]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, mode === "register" && styles.tabActive]}
            onPress={() => setMode("register")}
          >
            <Text style={[styles.tabText, mode === "register" && styles.tabTextActive]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.textLight}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {mode === "register" && (
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
            placeholderTextColor={Colors.textLight}
            value={username}
            onChangeText={setUsername}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor={Colors.textLight}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title={mode === "login" ? "Đăng nhập" : "Đăng ký"}
          onPress={handleSubmit}
          loading={isLoading}
          variant="gradient"
          size="lg"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: "center",
    gap: Spacing.md,
  },
  hero: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
    borderRadius: BorderRadius.xxl,
    marginBottom: Spacing.md,
  },
  emoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h1,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    ...Typography.bodySmall,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginTop: 4,
  },
  tabs: {
    flexDirection: "row",
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: Colors.cardShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
    }),
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: BorderRadius.md,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    ...Typography.body,
    color: Colors.textLight,
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.cardShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
    }),
  },
});
