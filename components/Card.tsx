import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { IHomeCard } from "../utils/interfaces";
import { HandleIconType } from "../utils/IconFinder";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavigationParamList } from "../navigations/HomeNavigation";
import { useNavigation } from "@react-navigation/native";
import { TestNavigationProp } from "../utils/navigation.props";

const Card: React.FC<IHomeCard> = ({ id, title, icon,screenName}) => {

  const navigation = useNavigation<TestNavigationProp>();

  if(!navigation){
    console.log("Does not exist");
  }
    const handleTest = (screenName:string) => {
      if(screenName === "DailySkinScreen"){
        navigation.navigate(screenName);
      }
      console.log("Does not work!")
    }
  
  return (
    <View>
      <TouchableOpacity onPress={() => handleTest(screenName)}>
        <View key={id} style={styles.homeCardStyle}>
          <Text style={styles.iconTitleStyle}>{title}</Text>
          <View style={styles.iconViewStyle}>
            <HandleIconType iconName={icon} size={50} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeCardStyle: {
    margin: 20,
    flexDirection: "column",
    width: 300,
    height: 140,
    borderColor: "#808080",
    borderWidth: 2,
    backgroundColor:"#f5cac3",
    borderRadius:10
  },
  iconViewStyle:{
    alignItems:"center",
    marginTop:20
  },
  iconTitleStyle:{
    color:"black",
    fontWeight:"bold",
    fontSize:20,
    marginLeft:10,
    marginTop:10
  }
});

export default Card;
