import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors, Typography } from "../../src/constants/theme";
import { MaterialIcon, IonIcon } from "../../src/components/common";

const tabConfig = {
  index: { label: "Học tập", icon: (focused: boolean) => <MaterialIcon name="home" size="md" color={focused ? Colors.primary : Colors.textLight} /> },
  review: { label: "Ôn tập", icon: (focused: boolean) => <MaterialIcon name="autorenew" size="md" color={focused ? Colors.primary : Colors.textLight} /> },
  profile: { label: "Cá nhân", icon: (focused: boolean) => <IonIcon name={focused ? "person-circle" : "person-circle-outline"} size="md" color={focused ? Colors.primary : Colors.textLight} /> },
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      {Object.entries(tabConfig).map(([name, config]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: config.label,
            tabBarIcon: ({ focused }) => config.icon(focused),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 0,
    elevation: 0,
    paddingTop: 6,
    height: 64,
  },
  tabLabel: {
    ...Typography.caption,
    fontSize: 10,
    marginTop: 2,
  },
  tabItem: {
    gap: 0,
  },
});
