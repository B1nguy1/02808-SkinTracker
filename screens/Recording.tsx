import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import RecordCard from "../components/RecordCard";
import { useNavigation } from "@react-navigation/native";
import { TestNavigationProp } from "../utils/navigation.props";

export const getCardInfo: { cardId: number; cardTitle: string; cardIcon: string }[] = [
  {
    cardId: 1,
    cardTitle: "Skin condition",
    cardIcon: "face-woman",
  },
  {
    cardId: 2,
    cardTitle: "Fitness record",
    cardIcon: "running",
  },
  {
    cardId: 3,
    cardTitle: "Sleep",
    cardIcon: "sleep",
  },
]

const Recording = () => {

  return (
    <View style={styles.container}>
    <View style={styles.textViewStyle}>
      <Text style={styles.recordingTextStyle}>Recording</Text>
    </View>
    {getCardInfo.map((prop) => {
        return (
          <View id={prop.cardId.toString()}>
            <RecordCard
              onPress={() => console.log("Test")}
              rcId={prop.cardId}
              rcTitle={prop.cardTitle}
              rcIcon={prop.cardIcon}
            />
          </View>
        );
      })}
    <Text style={styles.moreTextStyle}> More options ... </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:0.65,
    alignItems: "center",
    marginTop: 100,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  sleepTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textViewStyle:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20,    
  },
  recordingTextStyle: {
    fontWeight: "bold",
    color: "#FF75A7",
    fontSize: 30,
    textAlign: "left",
    marginRight: 200,
    marginBottom: 20,
  },
  moreTextStyle:{
    fontWeight:"bold",
    fontSize:15,
  }

});

export default Recording;
