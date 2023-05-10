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
  VictoryTheme,
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

// This component fetches data from Firebase Firestore and 
// visualize the data using a bar chart. 

const SleepOverview = () => {
  const sleepQuery = query(
    collection(db, "sleepData"),
    where("userRef", "==", getAuth().currentUser?.uid)
  );
  const [sleepData, setSleepData] = React.useState<Array<ISleepDataFirebase>>(
    []
  );
  const [sleepVisualizations, setSleepVisualizations] = React.useState<
    Array<sleepVizLabels>
  >([]);

  React.useEffect(() => {
    fetchSleepData();
  }, []);

  React.useEffect(() => {
    modifySleepData();
  }, [sleepData]);

  const fetchSleepData = () => {
    const unsubscribe = onSnapshot(sleepQuery, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSleepData(data);
    });
    return unsubscribe;
  };

  /**
   * Changes Timestamp format of the date form Firebase to a Date format in React Native
   * and calculates sleep duration 
   * 
   * @returns an updated array of objects with date tracked and sleep duration
   */
  const modifySleepData = () => {
    const updatedSleepData: { date: Date; hoursOfSleep: number }[] = [];
    sleepData.forEach((sleep) => {
      const start = new Date(sleep.date_from.toDate().toUTCString());
      const end = new Date(sleep.end_date.toDate().toUTCString());
      const timeDiff = (end.getTime() - start.getTime()) / 1000;
      let diffDuration = timeDiff / (60 * 60);
      updatedSleepData.push({
        date: start,
        hoursOfSleep: Math.abs(Math.round(diffDuration)),
      });
      setSleepVisualizations(updatedSleepData);
    });
    return updatedSleepData;
  };

  const formatDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  //C hanges the key of objects to x and y for visualization
  const vizData = sleepVisualizations.map(({ date, hoursOfSleep }) => ({
    x: formatDate(date),
    y: hoursOfSleep,
  }));

  /**
   * Updates the modified sleep data array by merging 
   * objects with same date into one object and sums the 
   * hoursOfSleep if the date is equal to each other
   */
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

  // Sorts dates in correct order
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

  /**
   * 
   * @param list the list which is sleep data list
   * @param column the column of the list
   * @returns text based on average hour of sleep 
   */
  const sleepHourConditions = (list: any, column: string) => {
    const sleepAverageHour = getSleepAverageHour(list, column);
    let displayText;
    if (sleepAverageHour >= 7 && sleepAverageHour <= 8.5) {
      displayText = (
        <Text>
          You got optimum number of sleep. Your average sleep hour is{" "}
          {Math.round(sleepAverageHour)} which is between 7 and 8 hours
        </Text>
      );
    } else if (sleepAverageHour < 7) {
      displayText = (
        <Text>
          You don't get optimum number of sleep. Your average sleep hour is{" "}
          {Math.round(sleepAverageHour)}. Average sleep hour should be between 7
          and 8 hours.
        </Text>
      );
    } else {
      displayText = (
        <Text>
          {" "}
          Your optimum number of sleep which is {Math.round(
            sleepAverageHour
          )}{" "}
          hours, is too much
        </Text>
      );
    }
    return displayText;
  };

  return (
    <View>
      <View style={styles.subContainer}>
        {sorted_dates.length > 0 ? (
          <View style={styles.graphViewStyle}>
            <Text style={styles.titleTextStyle}>
              Sleep overview in{" "}
              {new Date().toLocaleDateString("en-us", { month: "long" })}
            </Text>
            <Text style={styles.sleepHourConditionTextStyle}>
              {sorted_dates.length > 0
                ? sleepHourConditions(newVizData, "y")
                : null}
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
                style={{ labels: { fill: "black" }, data: { fill: "#FF75A7" } }}
                x="x"
                y="y"
              />
              <VictoryAxis
                dependentAxis={false}
                tickLabelComponent={<VictoryLabel angle={-45} y={300} />}
                tickFormat={tickLabels}
              />
              <VictoryAxis dependentAxis />
            </VictoryChart>
          </View>
        ) : (
          <View>
            <Text style={styles.titleTextStyle}>Sleep Overview</Text>
            <Text style={styles.noDataTextStyle}>
              {" "}
              You have not tracked your sleep(s)!{" "}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTextStyle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
  },
  graphViewStyle: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  sleepHourConditionTextStyle:{
    marginLeft:10
  },
  noDataTextStyle:{
    color: "red", 
    marginLeft: 9 
  }
});

export default SleepOverview;
