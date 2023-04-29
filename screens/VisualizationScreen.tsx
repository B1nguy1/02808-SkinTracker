import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import ConditionOverview from "../components/Visualizations/ConditionOverview";
import SleepOverview from "../components/Visualizations/SleepOverview";

const VisualizationScreen = () => {
    return (
        <ScrollView style={{flex:1,paddingTop: StatusBar.currentHeight, marginBottom:10,}}>
            <View style={{marginHorizontal: 20,marginTop:20}}>
                <ConditionOverview />
            </View>
            <View>
                <SleepOverview />
            </View>
        </ScrollView>
    )
}

export default VisualizationScreen;