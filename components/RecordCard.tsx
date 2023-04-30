import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { IRecordCard } from "../utils/interfaces";
import { HandleIconType } from "../utils/IconFinder";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RecordingNavigationProp } from "../utils/navigation.props";


const RecordCard = ({ rcId, rcTitle, rcIcon }: IRecordCard): JSX.Element => {
  
  const navigation = useNavigation<RecordingNavigationProp>();
  
  const navigateTo = (screenName: string) => {
    if (screenName === "Sleep") {
      navigation.navigate("SleepTracking");
    } 
    else if(screenName === "Skin condition"){
      navigation.navigate("DailySkinScreen");
    }
    else {
      Alert.alert(screenName + " does not exist!");
    }
  };
  
  return (
    <View style={styles.cardStyle}>
      <View>
        <TouchableOpacity onPress={() => navigateTo(rcTitle)} key={rcId.toString()} style={{width:350}}>
          <View style={{position:"absolute",left:2, marginTop:20}}>
          <HandleIconType iconName={rcIcon} size={34} />
          </View>
          <Text style={styles.cardTextStyle}>
            {rcTitle}
          </Text>
          <View style={styles.iconView}>
          <AntDesign name="right" size={24} color="black" style={styles.iconViewStyle} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle:{
    borderWidth:2,
    borderRadius:10,
    width:350,
    height:80,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  cardTextStyle:{
    color:"black",
    fontWeight:"bold",
    fontSize:15,
    marginLeft:50,
    marginTop:20,
    textAlignVertical: 'center',
  },
  iconView:{
    position:"relative",
    right:10,
    bottom:20,
  },
  iconViewStyle:{
    position:"absolute",
    right:0,
  }
  
})

export default RecordCard;
