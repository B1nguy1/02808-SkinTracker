import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screens/Home";
import Recording from "../screens/Recording";
import User from "../screens/User";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";


const bottomTab = createBottomTabNavigator();

export const BottomTapNavigator = () => {

    return (
        <SafeAreaProvider>
            <bottomTab.Navigator>
                <bottomTab.Screen
                    name= "HomeScreen"
                    component={Home}
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

