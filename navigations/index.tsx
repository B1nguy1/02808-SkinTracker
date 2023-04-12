import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/StartScreen";
import Recording from "../screens/Recording";
import User from "../screens/User";
import { SafeAreaProvider } from "react-native-safe-area-context";


const bottomTab = createBottomTabNavigator();

export const BottomTapNavigator = () => {

    return (
        <SafeAreaProvider>
            <bottomTab.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <bottomTab.Screen
                    name= "HomeScreen"
                    component={HomeScreen}
                />
            <bottomTab.Screen
                    name= "RecScreen"
                    component={Recording}
                />
            <bottomTab.Screen
                    name= "UserScreen"
                    component={User}
                />
            </bottomTab.Navigator>
            </SafeAreaProvider>
    )
}

