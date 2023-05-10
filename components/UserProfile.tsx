import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IUserProfile } from "../utils/interfaces";
import { Button } from "react-native-paper";
import SkinFactorsOverview from "./Visualizations/SkinFactorsOverView";

const UserProfile: React.FC<IUserProfile> = ({
  type,
  id,
  description,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text>{`\u2022 ${"The test results are affected by the information we get from your answers. If they are not consistent with the actual situation, they can be modified to recommend a more suitable solution for you."}`}</Text>
      <View key={id} style={styles.subContainer}>
        <Text style={{fontWeight:"bold",color:"grey",fontSize:20, marginBottom:5, right: 7}}> Summary </Text>
        <Text style={styles.typeTextStyle}>{type}</Text>
        <Text style={styles.descriptionTextStyle}>{description}</Text>
        <View style={styles.skinFactorsView}>
          <SkinFactorsOverview />
          <Text style={{marginBottom: 10}}> 
            For each skin factors in the skin-assessment, you will get a score based on chosen value.
            Mild will give 1 as score, Moderate gives 2 and Severe gives 3. The score is calculated by
            summing up the scores from the skin factors.
          </Text>
          <Button textColor="white" buttonColor="#d1809d" onPress={onPress}>
            Visualization of health data{" "}
          </Button>
          <Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
  },
  subContainer: {
    borderWidth: 2,
    borderColor: "slategrey",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  typeTextStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  descriptionTextStyle: {
    fontSize: 14,
  },
  skinFactorsView:{
    marginTop:30
  }
});

export default UserProfile;
