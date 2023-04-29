import {
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { View, Text } from "react-native";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import moment from "moment";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory-native";

interface testRecording {
  date_from: Timestamp;
  end_date: Timestamp;
}

type sleepArray = {
  date: Date;
  hoursOfSleep: number;
};

const SleepOverview = () => {
  const userQuery = query(
    collection(db, "sleepData"),
    where("userRef", "==", getAuth().currentUser?.uid)
  );
  const [sleepData, setSleepData] = React.useState<Array<testRecording>>([]);
  const [sleepData1, setSleepData1] = React.useState<Array<sleepArray>>([]);

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

  const dataForViz = () => {
    const data1: { date: Date; hoursOfSleep: number }[] = [];
    sleepData.forEach((sleep) => {
      const start = new Date(sleep.date_from.toDate().toUTCString());
      const end = new Date(sleep.end_date.toDate().toUTCString());
      const timeDiff = (end.getTime() - start.getTime()) / 1000;
      let diffDuration = timeDiff / (60 * 60);

      sleepData.some((item) => {
        if (item.date_from.toDate().toLocaleString().split(",")[0]) {
          return diffDuration++;
        } else {
          return diffDuration;
        }
      });
      data1.push({
        date: start,
        hoursOfSleep: Math.abs(Math.round(diffDuration)),
      });
      setSleepData1(data1);
    });
    return data1;
  };

  const format_date = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  // Data for visualization
  const vizData = sleepData1.map(({ date, hoursOfSleep }) => ({
    x: format_date(date),
    y: hoursOfSleep,
  }));

  const sorted_dates = vizData.sort((a, b) =>
    a.x
      .split("/")
      .reverse()
      .join()
      .localeCompare(b.x.split("/").reverse().join())
  );
  const tickLabels = sorted_dates.map((d) => d.x);

  return (
    <View style={{backgroundColor:"grey", flex:1, justifyContent:"center",marginTop:10,}}>
      <Text>
        Current month:{" "}
        {new Date().toLocaleDateString("en-us", { month: "long" })}
      </Text>
      <VictoryChart
        width={350}
        domainPadding={20}
        theme={VictoryTheme.material}
      >
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
        <VictoryBar
          labels={({ datum }) => `Hour: ${datum.y}`}
          data={sorted_dates}
          x="x"
          y="y"
        />
        <VictoryAxis
          dependentAxis={false}
          tickLabelComponent={<VictoryLabel angle={-45} y={310} />}
          tickFormat={tickLabels}
        />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    </View>
  );
};

export default SleepOverview;
