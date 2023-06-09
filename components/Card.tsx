import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { IHomeCard } from "../utils/interfaces";
import { HandleIconType } from "../utils/IconFinder";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, UserNavigationProp } from "../utils/navigation.props";


/**
 * Component that creates a pressable card for different categories in HomePage
 * @param id the id of the category
 * @param title the title of the category
 * @param icon the icon of the category
 * @param screenName the screenName of the category that will be navigated to
 */
const Card: React.FC<IHomeCard> = ({ id, title, icon, screenName }) => {
  
  const navigation = useNavigation<HomeNavigationProp & UserNavigationProp>();

  // Navigates to a screen based on a given name of the screen
  const navigateToScreen = (screenName: string) => {
    if (screenName === "DailySkinScreen") {
      navigation.navigate(screenName);
    } 
    else if (screenName === "UserScreen"){
      navigation.navigate(screenName)
    }
    else {
      Alert.alert(screenName + " does not exist!");
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigateToScreen(screenName)}>
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
    backgroundColor: "#f5cac3",
    borderRadius: 10,
  },
  iconViewStyle: {
    alignItems: "center",
    marginTop: 20,
  },
  iconTitleStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default Card;
