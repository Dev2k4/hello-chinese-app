import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../src/constants/theme";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/index" options={{ animation: "fade" }} />
          <Stack.Screen name="onboarding/index" />
          <Stack.Screen
            name="learning-path/[level]"
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="lesson/[id]"
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
