import {
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import moment from "moment";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
} from "victory-native";

interface ISleepDataFirebase {
  date_from: Timestamp;
  end_date: Timestamp;
}

type sleepVizLabels = {
  date: Date;
  hoursOfSleep: number;
};

type graphDataLabels = {
  x: string;
  y: number;
};

const SleepOverview = () => {
  const userQuery = query(
    collection(db, "sleepData"),
    where("userRef", "==", getAuth().currentUser?.uid)
  );
  const [sleepData, setSleepData] = React.useState<Array<ISleepDataFirebase>>([]);
  const [sleepVisualizations, setSleepVisualizations] = React.useState<Array<sleepVizLabels>>([]);

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
      data1.push({
        date: start,
        hoursOfSleep: Math.abs(Math.round(diffDuration)),
      });
      setSleepVisualizations(data1);
    });
    return data1;
  };

  const formatDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  // Data for visualization
  const vizData = sleepVisualizations.map(({ date, hoursOfSleep }) => ({
    x: formatDate(date),
    y: hoursOfSleep,
  }));

  const vizDataObject: { [key: string]: number } = {};

  vizData.forEach((d) => {
    if (vizDataObject.hasOwnProperty(d.x)) {
      vizDataObject[d.x] = vizDataObject[d.x] + d.y;
    } else {
      vizDataObject[d.x] = d.y;
    }
  });

  const newVizData: graphDataLabels[] = [];

  for (const prop in vizDataObject) {
    newVizData.push({ x: prop, y: vizDataObject[prop] });
  }

  const sorted_dates = newVizData.sort((a, b) =>
    a.x
      .split("/")
      .reverse()
      .join()
      .localeCompare(b.x.split("/").reverse().join())
  );
  const tickLabels = newVizData.map((d) => d.x);

  const getSleepAverageHour = (list: any, column: string) => {
    let count = list.map((item: any) => item[column]);
    return (
      count.reduce((prev: number, curr: number) => prev + curr, 0) / list.length
    );
  };

  const sleepHourConditions = (list: any, column: string) => {
    const sleepAverageHour = getSleepAverageHour(list, column);
    let displayText;
    if (sleepAverageHour >= 7 && sleepAverageHour <= 8) {
      displayText = (
        <Text>
          You got optimum number of sleep. Your average sleep hour is{" "}
          {sleepAverageHour} which is between 7 and 8 hours
        </Text>
      );
    } else if (sleepAverageHour < 7) {
      displayText = (
        <Text>
          You don't get optimum number of sleep. Your average sleep hour is{" "}
          {sleepAverageHour}. Average sleep hour should be between 7 and 8
          hours.
        </Text>
      );
    } else {
      displayText = <Text>Your optimum number of sleep is too much</Text>;
    }
    return displayText;
  };

  return (
    <View>
      <Text style={styles.titleTextStyle}>Sleep overview</Text>
      <Text>{sleepHourConditions(newVizData, "y")}</Text>
      <View style={styles.subContainer}>
        <Text>
          Current month:{" "}
          {new Date().toLocaleDateString("en-us", { month: "long" })}
        </Text>
        <VictoryChart width={350} domainPadding={20}>
          <VictoryLine
            y={() => 8}
            samples={1}
            labels={["", "50%"]}
            style={{
              data: { stroke: "red" },
              parent: { border: "1px solid #ccc" },
            }}
            labelComponent={
              <VictoryLabel renderInPortal={false} dx={20} dy={-20} />
            }
          />
          <VictoryLine
            y={() => 7}
            samples={1}
            style={{
              data: { stroke: "red" },
              parent: { border: "1px solid #ccc" },
            }}
            labels={["", "50%"]}
            labelComponent={
              <VictoryLabel renderInPortal={false} dx={20} dy={-20} />
            }
          />
          <VictoryBar
            labels={({ datum }) => `Hour: ${datum.y}`}
            data={sorted_dates}
            style={{ labels: { fill: "white" } }}
            x="x"
            y="y"
          />
          <VictoryAxis
            dependentAxis={false}
            tickLabelComponent={<VictoryLabel angle={45} y={263} />}
            tickFormat={tickLabels}
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTextStyle:{
    fontWeight:"bold",
    fontSize:16
  },
  subContainer:{
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightgrey",
    marginTop: 10
  }
});

export default SleepOverview;