import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import { useUserStore } from "../store/useUserStore";
import { RootStackParamList } from "./types";
import SplashScreen from "../screens/SplashScreen";
import AuthScreen from "../screens/AuthScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import TabNavigator from "./TabNavigator";
import LearningPathScreen from "../screens/LearningPathScreen";
import LessonScreen from "../screens/LessonScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

function AuthScreens() {
  const hydrated = useUserStore((s) => s.hydrated);
  const token = useUserStore((s) => s.token);
  const settings = useUserStore((s) => s.settings);

  if (!hydrated) return <SplashScreen />;

  const initialRoute =
    token && !settings ? "Onboarding" : token ? "MainTabs" : "Auth";

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ animation: "fade" }}
      />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="LearningPath"
        component={LearningPathScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const hydrate = useUserStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer>
          <AuthScreens />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
