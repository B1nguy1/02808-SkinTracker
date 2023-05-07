import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import DropDownMenu from "../components/DropDownMenu";
import { db } from "../firebase";
import { skinConditionsData } from "../utils/DropDownMenuData";


const DailySkinScreen = () => {
  const [skinValue, setSkinValue] = React.useState("");
  const SkinDataRef = collection(db, "skinData");
  const userID = getAuth().currentUser?.uid;

  function assignScoreToValue(value: string){
    let score;
    switch(value){
      case "Mild":
        score = 1;
        break;
      case "Moderate":
        score = 2;
        break;
      case "Severe":
        score = 3;
        break;
      default:
        score = 0;
        break;
    }
    return score;
  }

  const addSkinType = async () => {
    try {
      if (userID != null) {
        await addDoc(SkinDataRef, {
          skinType: skinValue,
          timeStamp: serverTimestamp(),
          userRef: userID,
        });
        setSkinValue("");
        Alert.alert("Skin type saved!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}> How is your skin feeling today? </Text>
      <View style={styles.subContainer}>
        <DropDownMenu
          data={skinConditionsData}
          setSelected={(value: string) => setSkinValue(value)}
        />
      </View>
      <Pressable style={styles.button} onPress={addSkinType}>
        <Text style={styles.buttonTextStyle}>Save your choice</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    margin: 20,
  },
  button: {
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f5cac3",
    elevation: 3,
  },
  buttonTextStyle: {
    lineHeight: 20,
    letterSpacing: 0.2,
    color: "white",
  },
  textStyle: {
    letterSpacing: 0.1,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default DailySkinScreen;
