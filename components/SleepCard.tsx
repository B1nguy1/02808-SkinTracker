import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export interface ISleep {
  date_from: string;
  onPress: () => void;
}

const SleepCard: React.FC<ISleep> = ({ date_from, onPress }) => {
  return (
    <View style={styles.cardStyle}>
      <View>
        <View style={{ bottom: 10 }}>
          <Text style={styles.cardTextStyle}>{date_from}</Text>
        </View>
        <View style={styles.iconViewStyle}>
          <Button onPress={onPress} textColor="white" buttonColor="red">
            DELETE
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 2,
    borderRadius: 10,
    width: 350,
    height: 80,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cardTextStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 50,
    marginTop: 20,
    textAlignVertical: "center",
  },
  iconViewStyle: {
    position: "absolute",
    left: 250,
  },
});

export default SleepCard;
