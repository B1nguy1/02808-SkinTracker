import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";
import CalendarComponent from "./CalendarComponent";
import { IActivityModal } from "../utils/interfaces";

/**
 * A modal that will be displayed to the user when taps on 
 * a given activity card. The modal displays a calendar, 
 * InputSpinner to track hours spent on the activity. 
 * This allows user to track their activity data
 */

const ActivityModal: React.FC<IActivityModal> = (props) => {

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => props.setVisible()}
      >
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text
              style={styles.addTextStyle}
            >
              Add activity
            </Text>
            <View>
              <View style={styles.inputSpinnerView}>
                <Text style={{ fontSize: 15 }}>Hours spent: </Text>
                <InputSpinner
                  min={0}
                  width={150}
                  colorMax={"#f04048"}
                  colorMin={"#a020f0"}
                  value={props.activityHour}
                  onChange={props.setActivityHour}
                />
              </View>
              <View style={styles.calendarComponentView}>
              <Text style={styles.dateTextStyle}>Activity date: </Text>
              <CalendarComponent 
                modeType={"date"}
                date={props.activityDate}
                onChange={props.handleDateChange} 
                />
            </View>
            </View>
            <View style={styles.buttonContainer}>
              <View>
                <Pressable style={styles.cancelButtonStyle} onPress={() => props.setVisible()}>
                  <Text style={styles.cancelTextStyle}>
                    {" "}
                    CANCEL{" "}
                  </Text>
                </Pressable>
              </View>
              <View>
                <Pressable
                  style={styles.saveButtonStyle}
                  onPress={() => {
                    props.save();
                  }}
                >
                  <Text style={styles.saveTextColor}>
                    SAVE
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  subContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft:10
  },
  saveButtonStyle:{
    backgroundColor:"#FF75A7",
    borderRadius:5,
    padding:5,
    paddingVertical:5,
    paddingHorizontal:10
  },
  saveTextColor:{
    color:"white",
    fontSize:15
  },
  cancelButtonStyle:{
    backgroundColor:"red",
    borderRadius:5,
    padding:5,
    marginRight:10,
  },
  cancelTextStyle:{
    color:"white",
    fontSize:15
  },
  calendarComponentView:{
    flexDirection:"row",
    alignItems:"center"
  },
  addTextStyle:{
    fontSize: 20, 
    fontWeight: "bold",
    marginBottom: 10
  },
  inputSpinnerView:{
    flexDirection: "row", 
    alignItems: "center", 
    margin:10
  },
  dateTextStyle:{
    fontSize: 15,
    marginLeft:10
  }
});

export default ActivityModal;