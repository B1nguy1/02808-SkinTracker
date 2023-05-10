import React from "react";
import { View, StyleSheet } from "react-native";
import ActivityCard from "../components/ActivityCard";

export const getInfo: {
  cardId: number;
  cardTitle: string;
  cardIcon: string;
}[] = [
  {
    cardId: 1,
    cardTitle: "Jogging",
    cardIcon: "running",
  },
  {
    cardId: 2,
    cardTitle: "Riding",
    cardIcon: "cycling",
  },
  {
    cardId: 3,
    cardTitle: "Yoga",
    cardIcon: "yoga",
  },
];

const ActivityScreen = () => {


  return (
    <View style={styles.container}>
      {getInfo.map((item) => {
        return (
          <View key={item.cardId}>
            <ActivityCard
              rcId={item.cardId}
              rcTitle={item.cardTitle}
              rcIcon={item.cardIcon}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.65,
    alignItems: "center",
    marginTop: 100,
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

export default ActivityScreen;
