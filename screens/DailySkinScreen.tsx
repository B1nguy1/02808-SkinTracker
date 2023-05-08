import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import DropDownMenu from "../components/DropDownMenu";
import { db } from "../firebase";
import { conditionsValues, skinConditionsData } from "../utils/DropDownMenuData";


const DailySkinScreen = () => {
  const [skinValue, setSkinValue] = React.useState("");
  const [darkCircleValue,setDarkCircleValue] = React.useState("");
  const [blackHeadValue, setBlackHeadValue] = React.useState("");
  const [dehydrationValue, setDehydrationValue] = React.useState("");
  const [acneValue, setAcneValue] = React.useState("");
  const [poresValue, setPoresValue] = React.useState("");
  const [fineLinesValue, setFineLinesValue] = React.useState("");
  const [spotValue, setSpotValue] = React.useState("");
  
  
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
          darkCircle: assignScoreToValue(darkCircleValue),
          blackHead: assignScoreToValue(blackHeadValue),
          dehydration: assignScoreToValue(dehydrationValue),
          acne: assignScoreToValue(acneValue),
          pores: assignScoreToValue(poresValue),
          fineLines: assignScoreToValue(fineLinesValue),
          spot: assignScoreToValue(spotValue),
          timeStamp: serverTimestamp(),
          userRef: userID,
        });
        setSkinValue("");
        Alert.alert("Skin answers saved!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
      <Text style={styles.textStyle}> How is your skin feeling today? </Text>
        <DropDownMenu
          placeholder={"Select skin value"}
          data={skinConditionsData}
          setSelected={(value: string) => setSkinValue(value)}
        />
        <DropDownMenu
          placeholder={"Select dark circle"}
          data={conditionsValues}
          setSelected={(darkCircle:string) => setDarkCircleValue(darkCircle)}
        />
        <DropDownMenu
          placeholder={"Select black head"}
          data={conditionsValues}
          setSelected={(blackHead: string) => setBlackHeadValue(blackHead)}
        />
        <DropDownMenu
          placeholder={"Select dehydration"}
          data={conditionsValues}
          setSelected={(dehydration: string) => setDehydrationValue(dehydration)}
        />
        <DropDownMenu
          placeholder={"Select acne"}
          data={conditionsValues}
          setSelected={(acne:string) => setAcneValue(acne)}
        />
        <DropDownMenu
          placeholder={"Select enlarged pores"}
          data={conditionsValues}
          setSelected={(pores:string) => setPoresValue(pores)}
        />
        <DropDownMenu
          placeholder={"Select fine lines"}
          data={conditionsValues}
          setSelected={(fineLines: string) => setFineLinesValue(fineLines)}
        />
        <DropDownMenu
          placeholder={"Select spot"}
          data={conditionsValues}
          setSelected={(spot:string) => setSpotValue(spot)}
        />
      </View>
      <Pressable style={styles.button} onPress={addSkinType}>
        <Text style={styles.buttonTextStyle}>Save your choice</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    margin: 20,
    justifyContent: "center",
   
  },
  button: {
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf:"center",
    backgroundColor: "#f5cac3",
    elevation: 3,
  },
  buttonTextStyle: {
    fontWeight:"bold",
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