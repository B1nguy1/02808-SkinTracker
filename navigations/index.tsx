import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import { HomeNavigation } from "./HomeNavigation";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RecordingNavigation } from "./RecordingNavigation";
import { UserNavigation } from "./UserNavigation";


export type ScreenStackParamList = {
  Login: {};
  Root: undefined;
  DailySkinScreen: {};
};

const Stack = createStackNavigator<ScreenStackParamList>();

/**
 * https://reactnavigation.org/docs/stack-navigator/
 */

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
          gestureEnabled:false
        }}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

//Bottom tab that displays different tabs that shows different screens
export const BottomTabNavigator = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="Root"
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
          component={HomeNavigation}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons name="pencil" size={30} color={focused ? "red" : "#f72585"} />
            ),
          }}
          name="Recording"
          component={RecordingNavigation}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome5 name="user" size={24} color={focused ? "red" : "#f72585"} />
            ),
          }}
          name="User"
          component={UserNavigation}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};
