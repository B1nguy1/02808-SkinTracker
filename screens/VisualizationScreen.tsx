import React from "react";
import { ScrollView, StatusBar, View, Text, StyleSheet } from "react-native";
import ConditionOverview from "../components/Visualizations/ConditionOverview";
import SleepOverview from "../components/Visualizations/SleepOverview";
import ActivityOverview from "../components/Visualizations/ActivityOverview";

const VisualizationScreen = () => {
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.viewStyle}>
        <View>
          <Text style={styles.titleStyle}>Activity data overview</Text>
        </View>
        <ActivityOverview />
      </View>
      <View style={styles.viewStyle}></View>
      <View style={styles.viewStyle}>
        <SleepOverview />
      </View>
      <View style={styles.viewStyle}>
        <ConditionOverview />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginBottom: 10,
  },
  viewStyle: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleStyle: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default VisualizationScreen;