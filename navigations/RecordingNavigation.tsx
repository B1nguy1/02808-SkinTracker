import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Recording from "../screens/Recording";
import SleepTrackingScreen from "../screens/SleepTrackingScreen";
import DailySkinScreen from "../screens/DailySkinScreen";
import ActivityScreen from "../screens/ActivityScreen";

export type RecordingNavigationParamList = {
    RecordingScreen: {};
    SleepTracking:undefined;
    DailySkinScreen:undefined;
    ActivityScreen:undefined;
}

const Stack = createStackNavigator<RecordingNavigationParamList>();

// Lets a user to navigate between screens in recording tab
export const RecordingNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RecordingScreen"
                component={Recording}
                options={{
                    headerShown:false,
                    headerBackTitleVisible:false,
                    gestureEnabled:false
                }}
            />
            <Stack.Screen
                name="DailySkinScreen"
                component={DailySkinScreen}
                options={{
                    headerTitle:"Self Assessment",
                    headerTintColor:"grey",
                    headerBackTitleVisible:false,
                    gestureEnabled:false,
                    
                    headerStyle:{
                        backgroundColor:"white"
                    },
                    headerTitleStyle:{
                        color:"#FF757A",
                        fontSize:23,
                    }
                }}
            />

            <Stack.Screen
                name="SleepTracking"
                component={SleepTrackingScreen}
                options={{
                    headerTitle:"Sleep tracking",
                    gestureEnabled:false,
                    headerBackTitleVisible:false,
                    headerTintColor:"grey",
                    headerStyle:{
                        backgroundColor:"white"
                    },
                    headerTitleStyle:{
                        color:"#FF757A",
                        fontSize:23,
                    }
                }}
            />
            <Stack.Screen 
                name="ActivityScreen"
                component={ActivityScreen}
                options={{
                    headerTitle:"Activity tracking",
                    headerBackTitleVisible:false,
                    gestureEnabled:false,
                    headerTintColor:"grey",
                    headerStyle:{
                        backgroundColor:"white"
                    },
                    headerTitleStyle:{
                        color:"#FF757A",
                        fontSize:23,
                    }
                }}
            />
        </Stack.Navigator>
    )
}