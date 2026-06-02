import { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/theme";
import { useUserStore } from "../store/useUserStore";

export default function SplashScreen() {
  const hydrate = useUserStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primaryDark, Colors.primary, Colors.secondary]}
      style={styles.container}
    >
      <View style={styles.brandMark}>
        <Text style={styles.brandMarkText}>中</Text>
      </View>
      <Text style={styles.title}>Chinese4VN</Text>
      <Text style={styles.subtitle}>
        Học tiếng Trung hiệu quả hơn mỗi ngày
      </Text>

      <View style={styles.loadingRow}>
        <ActivityIndicator size="small" color="#fff" />
        <Text style={styles.loadingText}>
          Đang kiểm tra phiên đăng nhập...
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  brandMark: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  brandMarkText: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.6,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(255,255,255,0.82)",
    textAlign: "center",
  },
  loadingRow: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  loadingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
