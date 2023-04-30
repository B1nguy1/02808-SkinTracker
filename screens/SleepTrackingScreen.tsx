import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import CalendarComponent from "../components/CalendarComponent";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";


const SleepTrackingScreen = () => {
  const [startDate, setDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleStartDateChange = (
    event: any,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || startDate;
    setDate(currentDate);
  };

  const handleEndDateChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  const addSleepData = async () => {
    try {
      if (getAuth().currentUser?.uid != null) {
        if (startDate > endDate) {
          Alert.alert("Start cannot be before end");
        }
        else if(startDate > new Date()) {
          Alert.alert("You cannot track sleep data in advance")
        }
        else {
          await addDoc(collection(db, "sleepData"), {
            date_from: startDate,
            end_date: endDate,
            userRef: getAuth().currentUser?.uid,
          });
        }
      }
      setDate(new Date());
      setEndDate(new Date());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.sleepTextStyle}>Sleeping time:</Text>
      <View style={styles.container}>
        <CalendarComponent
          modeType={"date"}
          date={startDate}
          onChange={handleStartDateChange}
        />
        <CalendarComponent
          modeType={"time"}
          date={startDate}
          onChange={handleStartDateChange}
        />
      </View>
      <Text style={styles.sleepTextStyle}>Wake up date:</Text>
      <View style={styles.container}>
        <CalendarComponent
          modeType={"date"}
          date={endDate}
          onChange={handleEndDateChange}
        />
        <CalendarComponent
          modeType={"time"}
          date={endDate}
          onChange={handleEndDateChange}
        />
      </View>
      <Button textColor="black" buttonColor="#FF75A7" onPress={addSleepData}>
        Save your sleep data{" "}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginBottom: 20,
  },
  sleepTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SleepTrackingScreen;