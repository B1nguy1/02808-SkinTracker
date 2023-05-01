import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { IRecordCard } from "../utils/interfaces";
import { HandleIconType } from "../utils/IconFinder";
import ActivityModal from "./ActivityModal";

const ActivityCard = ({ rcId, rcTitle, rcIcon }: IRecordCard): JSX.Element => {
  const [HealthDataModalVisible, setHealthDataModalVisible] =
    React.useState(false);
  const [activityDate, setActivityDate] = React.useState(new Date());
  const [activityHour, setActivityHour] = React.useState(0);

  const handleDateChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || activityDate;
    setActivityDate(currentDate);
  };

  const activityCalories = (activity: string,hour:number) => {
    let caloriesBurnt;
    switch(activity){
        case "Jogging":
            caloriesBurnt = 436*hour;
            break;
        case "Riding":
            caloriesBurnt = 626*hour;
            break;
        case "Yoga":
            caloriesBurnt=120*hour;
            break;
        default:
            caloriesBurnt = 0;
            break;
    };
    return caloriesBurnt;
  }

  
  return (
    <View style={styles.cardStyle}>
      <View key={rcId}>
        <TouchableOpacity
          onPress={() => {
            setHealthDataModalVisible(true);
          }}
          style={{ width: 350 }}
        >
          <View style={{ position: "absolute", left: 2, marginTop: 20 }}>
            <HandleIconType iconName={rcIcon} size={34} />
          </View>
          <Text style={styles.cardTextStyle}>{rcTitle}</Text>
          <ActivityModal
                      setVisible={() => setHealthDataModalVisible(false)}
                      visible={HealthDataModalVisible}
                      activityHour={activityHour}
                      setActivityHour={(hour) => setActivityHour(hour)}
                      activityDate={activityDate}
                      handleDateChange={handleDateChange} 
                      save={() =>  console.log(activityCalories(rcTitle,activityHour))}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 2,
    borderColor: "slategrey",
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
  iconView: {
    position: "relative",
    right: 10,
    bottom: 20,
  },
  iconViewStyle: {
    position: "absolute",
    right: 0,
  },
});

export default ActivityCard;
