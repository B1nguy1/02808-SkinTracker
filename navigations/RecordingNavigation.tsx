import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Recording from "../screens/Recording";
import SleepTrackingScreen from "../screens/SleepTrackingScreen";
import DailySkinScreen from "../screens/DailySkinScreen";
import ActivityScreen from "../screens/ActivityScreen";

export type RecordingNavigationParamList = {
    Recording: {};
    SleepTracking:undefined;
    DailySkinScreen:undefined;
    ActivityScreen:undefined;
}

const Stack = createStackNavigator<RecordingNavigationParamList>();

export const RecordingNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Recording"
                component={Recording}
                options={{
                    headerShown:false,
                    headerBackTitleVisible:false
                }}
            />
            <Stack.Screen
                name="DailySkinScreen"
                component={DailySkinScreen}
                options={{
                    headerTitle:"Skin condition tracking",
                    headerBackTitleVisible:false,
                    
                    headerStyle:{
                        backgroundColor:"lightgrey"
                    },
                    headerTitleStyle:{
                        color:"white"
                    }
                }}
            />

            <Stack.Screen
                name="SleepTracking"
                component={SleepTrackingScreen}
                options={{
                    headerTitle:"Sleep tracking",
                    headerBackTitleVisible:false,
                    
                    headerStyle:{
                        backgroundColor:"lightgrey"
                    },
                    headerTitleStyle:{
                        color:"white"
                    }
                }}
            />
            <Stack.Screen 
                name="ActivityScreen"
                component={ActivityScreen}
                options={{
                    headerTitle:"Activity tracking",
                    headerBackTitleVisible:false,
                    
                    headerStyle:{
                        backgroundColor:"lightgrey"
                    },
                    headerTitleStyle:{
                        color:"white"
                    }
                }}
            />
        </Stack.Navigator>
    )
}