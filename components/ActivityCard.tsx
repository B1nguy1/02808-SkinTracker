import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { IRecordCard } from "../utils/interfaces";
import { HandleIconType } from "../utils/IconFinder";
import ActivityModal from "./ActivityModal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

/**
 * A component that creates a card for an activity
 * 
 * @param rcId the rcId of the activity
 * @param rcTitle the title of the activity
 * @param rcIcon the icon of the activity
 */
const ActivityCard = ({ rcId, rcTitle, rcIcon }: IRecordCard): JSX.Element => {

  const [ActivityModalVisible, setActivityModalVisible] = React.useState(false);
  const activityDataRef = collection(db, "activityData");
  const [activityDate, setActivityDate] = React.useState(new Date());
  const [activityHour, setActivityHour] = React.useState(0);
  const userID = getAuth().currentUser?.uid;

  const handleDateChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || activityDate;
    setActivityDate(currentDate);
  };

  /**
   * @param activity the activity chosen
   * @param hour the hour spent on the activity
   * @returns calculation of calories based on activity and hour spent
   */
  const calculateActivityCalories = (activity: string, hour: number) => {
    let caloriesBurnt;
    switch (activity) {
      case "Jogging":
        caloriesBurnt = 436 * hour;
        break;
      case "Riding":
        caloriesBurnt = 626 * hour;
        break;
      case "Yoga":
        caloriesBurnt = 120 * hour;
        break;
      default:
        caloriesBurnt = 0;
        break;
    }
    return caloriesBurnt;
  };

  /*
  Adds an activity object to the database in Firebase Firestore
  If the user does not exist or the date is tracked in advance,
  then a user will get an error message. 
  */
  const addActivityToFirebase = async () => {
    try {
      if (userID != null  && activityDate < new Date()) {
        await addDoc(activityDataRef, {
          activity_name: rcTitle,
          activity_date: activityDate,
          activity_calories: calculateActivityCalories(rcTitle, activityHour),
          activity_hour: activityHour,
          userRef: userID,
        });
        setActivityDate(new Date()), setActivityHour(0);
        Alert.alert("Activity saved!");
      }
      else{
        Alert.alert("Cannot track in advance...")
      }
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <View style={styles.cardStyle}>
      <View key={rcId}>
        <TouchableOpacity
          onPress={() => {
            setActivityModalVisible(true);
          }}
          style={{ width: 350 }}
        >
          <View style={{ position: "absolute", left: 2, marginTop: 20 }}>
            <HandleIconType iconName={rcIcon} size={34} />
          </View>
          <Text style={styles.cardTextStyle}>{rcTitle}</Text>
          <ActivityModal
            setVisible={() => setActivityModalVisible(false)}
            visible={ActivityModalVisible}
            activityHour={activityHour}
            setActivityHour={(hour) => hour > 0 ? setActivityHour(hour) : Alert.alert("Hour(s) cannot be negative!")}
            activityDate={activityDate}
            handleDateChange={handleDateChange}
            save={() => addActivityToFirebase()}
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