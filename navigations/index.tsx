import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Recording from "../screens/Recording";
import User from "../screens/User";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import HomeScreen from "../screens/HomeScreen";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export type ScreenStackParamList = {
  Login: {};
  Root: undefined;
};

const Stack = createStackNavigator<ScreenStackParamList>();

export const ScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "red",
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: "none",
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <FontAwesome name="home" size={30} color="#f72585" />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="pencil" size={30} color="#f72585" />
            ),
          }}
          name="Recording"
          component={Recording}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <FontAwesome5 name="user" size={24} color="#f72585" />
            ),
          }}
          name="User"
          component={User}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};
