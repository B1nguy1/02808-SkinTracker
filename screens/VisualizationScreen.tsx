import React from "react";
import { ScrollView, StatusBar, View, Text } from "react-native";
import ConditionOverview from "../components/Visualizations/ConditionOverview";
import SleepOverview from "../components/Visualizations/SleepOverview";
import ActivityOverview from "../components/Visualizations/ActivityOverview";

const VisualizationScreen = () => {
    return (
        <ScrollView style={{flex:1,paddingTop: StatusBar.currentHeight, marginBottom:10,}}>
            <View style={{marginHorizontal: 20,marginTop:20}}>
                <View>
                <Text style={{marginTop:10,marginBottom:10,fontWeight:"bold"}}>Skin type overview</Text>
                </View>
                <ConditionOverview />
            </View>
            <View style={{marginHorizontal: 20,marginTop:10}}>
            </View>
            <View style={{marginHorizontal: 20,marginTop:20}}>
                <SleepOverview />
            </View>
            <View style={{marginHorizontal: 20,marginTop:20}}>
                <ActivityOverview />
            </View>
        </ScrollView>
    )
}

export default VisualizationScreen;