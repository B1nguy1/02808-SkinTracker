import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const getCardInfo: { cardId: string; cardTitle: string; cardIcon: string }[] = [
  {
    cardId: "1",
    cardTitle: "How is your skin feeling today?",
    cardIcon: "camera",
  },
  {
    cardId: "2",
    cardTitle: "Overview of skin",
    // Should be replace with a real graph later, use this for test purpose
    cardIcon: "graph",
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}> Home </Text>
      {getCardInfo.map((k) => {
        return (
          <View>
            <Card
              cardId={k.cardId}
              cardTitle={k.cardTitle}
              cardIcon={k.cardIcon}
            />
          </View>
        );
      })}
      <View style={styles.homeCardStyle}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="pencil" size={30} color="#f72585" />
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
            Keep your own records
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 100,
  },
  homeCardStyle: {
    margin: 20,
    flexDirection: "column",
    width: 300,
    height: 150,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#f5cac3",
  },
  textStyle: {
    fontWeight: "bold",
    color: "#FF75A7",
    fontSize: 30,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    margin: 30,
    marginTop: 50,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,
  },
});

export default HomeScreen;
