import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import ConditionOverview from "../components/Visualizations/ConditionOverview";
import Recording from "./Recording";

const VisualizationScreen = () => {
    return (
        <ScrollView style={{flex:1,paddingTop: StatusBar.currentHeight,}}>
            <View style={{marginHorizontal: 20,marginTop:20}}>
                <ConditionOverview />
            </View>
            <View>
                <Recording />
            </View>
        </ScrollView>
    )
}

export default VisualizationScreen;