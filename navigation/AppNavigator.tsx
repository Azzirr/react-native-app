import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import VideoDetailScreen from "../screens/VideoDetailScreen";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../types/navigation";
import { View, Image, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconSource;

          if (route.name === "Home") {
            iconSource = require("../assets/icons/home-icon.png");
          } else if (route.name === "Search") {
            iconSource = require("../assets/icons/search-icon.png");
          }

          return (
            <View style={styles.iconContainer}>
              <Image
                source={iconSource}
                style={[styles.statIcon, { tintColor: color }]}
              />
            </View>
          );
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#8D99AE",
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          marginBottom: 8,
        },
        tabBarItemStyle: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 2,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoDetail"
          component={VideoDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    marginTop: 8,
  },
  statIcon: {
    width: 24,
    height: 24,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 16,
    textAlign: "center",
  },
});
