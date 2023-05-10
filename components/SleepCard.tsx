import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons'; 

interface ISleep {
  date: string;
  onPress: () => void;
}

/**
 * Component that creates a card for single sleep data
 * 
 * @param date the date of sleep tracked
 * @param onPress a function to delete a given sleep data 
 */
const SleepCard: React.FC<ISleep> = ({ date, onPress }) => {
  return (
    <View style={styles.cardStyle}>
      <View>
        <View style={{ bottom: 10 }}>
          <Text style={styles.cardTextStyle}>{date}</Text>
        </View>
        <View style={styles.iconViewStyle}>
          <Button onPress={onPress} textColor="white" buttonColor="red">
          <FontAwesome name="trash-o" size={23} color="white" />
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
    left: 240,
  },
});

export default SleepCard;