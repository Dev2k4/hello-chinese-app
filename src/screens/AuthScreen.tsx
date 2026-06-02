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
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "../constants/theme";
import { Button, Card } from "../components/common";
import { useUserStore } from "../store/useUserStore";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export default function AuthScreen({ navigation }: Props) {
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
      navigation.replace("Onboarding");
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Đã có lỗi xảy ra, vui lòng thử lại";
      Alert.alert("Lỗi", msg);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={[Colors.primaryDark, Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>中</Text>
            </View>
            <Text style={styles.title}>Chinese4VN</Text>
            <Text style={styles.subtitle}>
              Cam san hô, teal và nền kem cho hành trình học nhẹ mắt hơn
            </Text>
          </LinearGradient>

          <Card style={styles.formCard}>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, mode === "login" && styles.tabActive]}
                onPress={() => setMode("login")}
              >
                <Text
                  style={[
                    styles.tabText,
                    mode === "login" && styles.tabTextActive,
                  ]}
                >
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, mode === "register" && styles.tabActive]}
                onPress={() => setMode("register")}
              >
                <Text
                  style={[
                    styles.tabText,
                    mode === "register" && styles.tabTextActive,
                  ]}
                >
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor={Colors.textLight}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
            </View>

            {mode === "register" && (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Tên hiển thị</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tên người dùng"
                  placeholderTextColor={Colors.textLight}
                  value={username}
                  onChangeText={setUsername}
                  autoCorrect={false}
                />
              </View>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCorrect={false}
              />
            </View>

            <Button
              title={mode === "login" ? "Đăng nhập" : "Đăng ký"}
              onPress={handleSubmit}
              loading={isLoading}
              variant="gradient"
              size="lg"
            />

            <Text style={styles.helpText}>
              {mode === "login"
                ? "Đăng nhập để tiếp tục vào lộ trình học của bạn"
                : "Tạo tài khoản mới để bắt đầu từ bước đầu tiên"}
            </Text>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  hero: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xxl,
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  heroBadge: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  heroBadgeText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
  },
  title: {
    ...Typography.h1,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    ...Typography.bodySmall,
    color: "rgba(255,255,255,0.82)",
    textAlign: "center",
    marginTop: 6,
  },
  formCard: {
    gap: Spacing.md,
  },
  tabs: {
    flexDirection: "row",
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceAlt,
    padding: 4,
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
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  helpText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
