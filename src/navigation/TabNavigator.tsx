import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { Colors, Typography } from "../constants/theme";
import { MaterialIcon, IonIcon } from "../components/common";
import { TabParamList } from "./types";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import ReviewScreen from "../screens/ReviewScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator<TabParamList>();

const tabConfig: Record<
  keyof TabParamList,
  { label: string; icon: (focused: boolean) => React.ReactNode }
> = {
  Home: {
    label: "Học tập",
    icon: (focused: boolean) => (
      <MaterialIcon
        name="home"
        size="md"
        color={focused ? Colors.primary : Colors.textLight}
      />
    ),
  },
  Map: {
    label: "Lộ trình",
    icon: (focused: boolean) => (
      <MaterialIcon
        name="map"
        size="md"
        color={focused ? Colors.primary : Colors.textLight}
      />
    ),
  },
  Review: {
    label: "Ôn tập",
    icon: (focused: boolean) => (
      <MaterialIcon
        name="autorenew"
        size="md"
        color={focused ? Colors.primary : Colors.textLight}
      />
    ),
  },
  Profile: {
    label: "Cá nhân",
    icon: (focused: boolean) => (
      <IonIcon
        name={focused ? "person-circle" : "person-circle-outline"}
        size="md"
        color={focused ? Colors.primary : Colors.textLight}
      />
    ),
  },
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      {(["Home", "Map", "Review", "Profile"] as const).map((name) => {
      const components = {
        Home: HomeScreen,
        Map: MapScreen,
        Review: ReviewScreen,
        Profile: ProfileScreen,
      };
      return (
        <Tab.Screen
          key={name}
          name={name}
          component={components[name]}
          options={{
            title: tabConfig[name].label,
            tabBarIcon: ({ focused }) => tabConfig[name].icon(focused),
          }}
        />
      );
    })}
    </Tab.Navigator>
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
