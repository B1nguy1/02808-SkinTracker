import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import UserScreen from "../screens/UserScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import { HomeNavigation } from "./HomeNavigation";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import VisualizationScreen from "../screens/VisualizationScreen";
import { RecordingNavigation } from "./RecordingNavigation";


export type ScreenStackParamList = {
  Login: {};
  Root: undefined;
  DailySkinScreen: {};
  VisualizationScreen: undefined;
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
        name="VisualizationScreen"
        component={VisualizationScreen}
        options={{
          headerTitle:"Health profile",
          headerTintColor:"grey",
          headerStyle:{
            backgroundColor: 'white'
          },
          headerTitleStyle:{
            color:"#FF75A7",
            fontSize:25,
          },
          headerBackTitleVisible: false
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
          component={UserScreen}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};
