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
import DailySkinScreen from "../screens/DailySkinScreen";
import ConditionOverview from "../components/Visualizations/ConditionOverview";

export type ScreenStackParamList = {
  Login: {};
  Root: undefined;
  ConditionOverview: undefined;
};

const Stack = createStackNavigator<ScreenStackParamList>();

export const ScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConditionOverview"
        component={ConditionOverview}
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
          tabBarInactiveTintColor: "#f72585",
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: "none",
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome name="home" size={30} color={focused ? "red" : "#f72585"} />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons name="pencil" size={30} color={focused ? "red" : "#f72585"} />
            ),
          }}
          name="Recording"
          component={DailySkinScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome5 name="user" size={24} color={focused ? "red" : "#f72585"} />
            ),
          }}
          name="User"
          component={User}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};
