import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Recording from "../screens/Recording";
import User from "../screens/User";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import HomeScreen from "../screens/HomeScreen";

export type ScreenStackParamList = {
    Login: {};
    Home: undefined;
}

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
        name="Home"
        component={BottomTabNavigator}
        options={{
            headerShown:false
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
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="RecScreen" component={Recording} />
        <Tab.Screen name="UserScreen" component={User} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};
