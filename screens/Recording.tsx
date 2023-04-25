import React from "react";
import { View, Text } from "react-native";
import RecordCard from "../components/RecordCard";


// Just fake data used for testing purpose
const getCardInfo: { cardId: number; cardTitle: string; cardIcon: string }[] = [
  {
    cardId: 1,
    cardTitle: "Skin condition",
    cardIcon: "face-woman",
  },
  {
    cardId: 2,
    cardTitle: "Fitness record",
    cardIcon: "running",
  },
  {
    cardId: 3,
    cardTitle: "Sleep",
    cardIcon: "sleep",
  },
];

/*
const navigateTo = (screenName: string) => {
    if(screenName === "Fitness record"){
        console.log("Halla");
    }
    else if(screenName === "Skin condition"){
     // navigation.navigate("/");
     console.log("Test");
    }
    else if(screenName === "Sleep"){
        console.log("You need some sleep");
    }
    else{
      console.log("K")
      //Change this soon
     //  navigation.navigate("HomeScreen");
    }
}
*/


const Recording = () => {


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> WIP </Text>
    </View>
  );
};

export default Recording;


/*

<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {getCardInfo.map((prop) => {
        return (
          <View>
            <RecordCard
              onPress={() => navigateTo(prop.cardTitle)}
              rcId={prop.cardId}
              rcTitle={prop.cardTitle}
              rcIcon={prop.cardIcon}
            />
          </View>
        );
      })}
    </View>
  );
};
*/