import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Colors } from "../src/constants/theme";
import { useUserStore } from "../src/store/useUserStore";

export default function AppEntry() {
  const token = useUserStore((s) => s.token);
  const settings = useUserStore((s) => s.settings);
  const hydrated = useUserStore((s) => s.hydrated);
  const fetchProfile = useUserStore((s) => s.fetchProfile);
  const hydrate = useUserStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const init = async () => {
      if (token) {
        await fetchProfile();
        router.replace(settings ? "/(tabs)" : "/onboarding");
      } else {
        router.replace("/auth");
      }
    };
    const timer = setTimeout(init, 100);
    return () => clearTimeout(timer);
  }, [hydrated, token, settings]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.primaryDark }}>
      <ActivityIndicator size="large" color={Colors.secondary} />
    </View>
  );
}
