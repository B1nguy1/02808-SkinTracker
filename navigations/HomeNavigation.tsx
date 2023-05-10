import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import DailySkinScreen from "../screens/DailySkinScreen";

export type HomeNavigationParamList = {
    HomeScreen: {};
    DailySkinScreen: undefined;
}

const Stack = createStackNavigator<HomeNavigationParamList>();

export const HomeNavigation = () => {
    return(
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerShown:false,
            }  
         }
        />
        <Stack.Screen
            name="DailySkinScreen"
            component={DailySkinScreen}
            options={{
                headerBackTitleVisible:false,
                headerTitle:"Self Assessment",
                headerTintColor:"grey",
                headerStyle:{
                    backgroundColor:"white"
                },
                headerTitleStyle:{
                     color:"#FF75A7",
                     fontSize:23,
                }
            }}
        />
    </Stack.Navigator>
    );
};