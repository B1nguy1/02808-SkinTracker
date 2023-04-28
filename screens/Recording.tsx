import React from "react";
import { View, Text, Button } from "react-native";
import moment from "moment";
import CalendarComponent from "../components/CalendarComponent";
import { getAuth } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
} from "victory-native";

interface testRecording {
  date_from: Timestamp;
  end_date: Timestamp;
}

type sleepArray = {
  date: Date;
  hoursOfSleep: number;
};

const Recording = () => {
  const [sleepData, setSleepData] = React.useState<Array<testRecording>>([]);
  const [startDate, setDate] = React.useState(new Date());
  const [sleepData1, setSleepData1] = React.useState<Array<sleepArray>>([]);
  const [endDate, setEndDate] = React.useState(new Date());
  const userQuery = query(
    collection(db, "sleepData"),
    where("userRef", "==", getAuth().currentUser?.uid)
  );

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    dataForViz();
  }, [sleepData]);

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

  const addSleepData = async () => {
    try {
      if (getAuth().currentUser?.uid != null) {
        if (startDate > endDate) {
          console.error("Start cannot be before end");
        } else if (
          sleepData.some(
            (item) =>
              startDate.toLocaleString().split(",")[0] ===
              item.date_from.toDate().toLocaleString().split(",")[0]
          )
        ) {
          console.error("You cannot add for same date!");
        } else {
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

  const dataForViz = () => {
    const data1: { date: Date; hoursOfSleep: number }[] = [];
    sleepData.forEach((sleep) => {
      const start = new Date(sleep.date_from.toDate().toUTCString());
      const end = new Date(sleep.end_date.toDate().toUTCString());
      const timeDiff = (end.getTime() - start.getTime()) / 1000;
      const diffDuration = timeDiff / (60 * 60);
      data1.push({
        date: start,
        hoursOfSleep: Math.abs(Math.round(diffDuration)),
      });
      setSleepData1(data1);
    });
    return data1;
  };

  const date_format = (date: Date) => {
    return moment(date).format("MMMM Do YYYY");
  };

  const updatedVizData = sleepData1.map(({ date, hoursOfSleep }) => ({
    x: date_format(date).slice(0, 10),
    y: hoursOfSleep,
  }));
  const tickLabels = updatedVizData.map((d) => d.x);

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
      <Text>
        Current month:{" "}
        {new Date().toLocaleDateString("en-us", { month: "long" })}
      </Text>
      <VictoryChart
        width={350}
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryLine data={updatedVizData} x="x" y="y" />
        <VictoryAxis
          dependentAxis={false}
          tickLabelComponent={<VictoryLabel angle={-90} y={310} />}
          tickFormat={tickLabels}
        />
        <VictoryAxis dependentAxis />
        <VictoryLine
          y={() => 8}
          samples={1}
          labels={["", "50%"]}
          labelComponent={
            <VictoryLabel renderInPortal={false} dx={20} dy={-20} />
          }
        />
        <VictoryLine
          y={() => 6}
          samples={1}
          labels={["", "50%"]}
          labelComponent={
            <VictoryLabel renderInPortal={false} dx={20} dy={-20} />
          }
        />
      </VictoryChart>
    </View>
  );
};

export default Recording;
