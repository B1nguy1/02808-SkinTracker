import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";
import CalendarComponent from "./CalendarComponent";

interface IActivityModal {
  setVisible: () => void;
  visible: boolean;
  activityHour: number;
  setActivityHour: (hour:number) => void;
  activityDate: Date;
  handleDateChange: (event: any, selectedDate?: Date | undefined) => void;
  save: () => void;
}

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
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              Add activity
            </Text>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", margin:10}}>
                <Text style={{ fontSize: 15 }}>Hours spent: </Text>
                <InputSpinner
                  min={0}
                  width={150}
                  colorMax={"#f04048"}
                  colorMin={"#40c5f4"}
                  value={props.activityHour}
                  onChange={props.setActivityHour}
                />
              </View>
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={{ fontSize: 15,marginLeft:10 }}>Activity date: </Text>
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
                    SAVE ACTIVITY
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
    backgroundColor:"#FF757A",
    borderRadius:5,
    padding:5,
  },
  saveTextColor:{
    color:"black",
    fontSize:15
  },
  cancelButtonStyle:{
    backgroundColor:"red",
    borderRadius:5,
    padding:5,
    marginRight:10,
  },
  cancelTextStyle:{
    color:"black",
    fontSize:15
  }
});

export default ActivityModal;
