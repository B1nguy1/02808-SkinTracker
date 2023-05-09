import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import UserScreen from "../screens/UserScreen";
import VisualizationScreen from "../screens/VisualizationScreen";
import SleepCard from "../components/SleepCard";
import SleepList from "../components/SleepList";


export type UserNavigationParamList = {
    UserScreen:undefined;
    VisualizationScreen:undefined;
    SleepList:undefined;
}

const Stack = createStackNavigator<UserNavigationParamList>();

export const UserNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{
                    headerShown:false,
                    headerBackTitleVisible:false
                }}
            />
            <Stack.Screen
                name="VisualizationScreen"
                component={VisualizationScreen}
                options={{
                    headerTitle:"Health profile",
                    headerTintColor:"grey",
                    headerBackTitleVisible:false,
                    headerStyle:{
                        backgroundColor:"white"
                    },
                    headerTitleStyle:{
                        color:"#FF757A",
                        fontSize:23
                    }
                }}
            />
            <Stack.Screen
                name="SleepList"
                component={SleepList}
            />

        </Stack.Navigator>
    )
}