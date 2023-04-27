import React from "react";
import { View, Text, Button } from "react-native";
import moment from "moment";
import CalendarComponent from "../components/CalendarComponent";
import { getAuth } from "firebase/auth";
import { Timestamp, addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory-native";

interface testRecording {
  date_from:Timestamp;
  end_date: Timestamp;
}

const Recording = () => {
  const [sleepData, setSleepData] = React.useState<Array<testRecording>>([]);
  const [startDate, setDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const userQuery = query(
    collection(db,"sleepData"),
    where("userRef", "==", getAuth().currentUser?.uid));
  
  
  React.useEffect(() => {
    fetchData();
  },[]);

  const date_format = (date: Date) => {
    return moment(date).format("MMMM Do YYYY h:mm:ss a");
  };

  const fetchData = () => {
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSleepData(data);
    });
    return unsubscribe;
  };

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

  const dateConverter = (startDate: Date, endDate: Date) => {
    return moment
      .utc(
        moment(endDate, "DD/MM/YYYY HH:mm:ss").diff(
          moment(startDate, "DD/MM/YYYY HH:mm:ss")
        )
      )
      .format("HH:mm:ss");
  };


  const addSleepData = async () => {
    try{
      if (getAuth().currentUser?.uid != null){
        if(startDate > endDate){
          console.error("Start cannot be before end")
        }
        else{
          await addDoc(collection(db,"sleepData"),{
            date_from: startDate,
            end_date: endDate,
            userRef: getAuth().currentUser?.uid
          });
        }
      }
      setDate(new Date());
      setEndDate(new Date());
    }
    catch(error){ console.error(error)}
  }

  const dataForViz = () => {
    const data1:{date:Date,hoursOfSleep:number}[] = [];
    sleepData.forEach((sleep) => {
      const start = new Date(sleep.date_from.toDate().toUTCString());
      const end = new Date(sleep.end_date.toDate().toUTCString());
      const timeDiff = ((end.getTime())-(start.getTime()))/1000;
      const diffDuration = timeDiff/(60*60)
      data1.push({date: start,hoursOfSleep: Math.abs(Math.round(diffDuration))});
    })
    return data1;
  }



  const data = [
    { x: new Date(2023, 0, 1), y: 10 },
    { x: new Date(2023, 0, 2), y: 20 },
    { x: new Date(2023, 0, 3), y: 15 },
    { x: new Date(2023, 0, 4), y: 25 },
    { x: new Date(2023, 0, 5), y: 30 },
    { x: new Date(2023, 0, 6), y: 28 },
    { x: new Date(2023, 0, 7), y: 35 }
  ];
  
  const preFix = [
    { x: 0, y:8}
  ];
  

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Start date:</Text>
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
      <Text>End date:</Text>
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
      <Button title="ADD" onPress={addSleepData} />
      <VictoryChart>
      
      <VictoryLine data={data} x="x" y="y" />
      
      </VictoryChart>
    </View>
  );
};

export default Recording;