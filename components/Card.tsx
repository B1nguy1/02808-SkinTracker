import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { IHomeCard } from "../utils/interfaces";
import { HandleIconType } from "../utils/IconFinder";

const Card: React.FC<IHomeCard> = ({ id, title, icon }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => console.log("This is a test")}>
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
