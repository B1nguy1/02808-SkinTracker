import {
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryScatter } from "victory-native";
import { IActivityData } from "../../utils/interfaces";

//Types to be able to display the graph using Victory library
type victoryGraphLabel = {
  x: string;
  y: number;
};

const ActivityOverview = () => {
  const [activityData, setActivityData] = React.useState<Array<IActivityData>>(
    []
  );
  //  const [activityList, setActivityList] = React.useState<Array<IActivityObject>>([]);
  const activityQuery = query(
    collection(db, "activityData"),
    where("userRef", "==", getAuth().currentUser?.uid)
  );

  React.useEffect(() => {
    getActivityData();
  }, []);


  const getActivityData = () => {
    const unsubs = onSnapshot(activityQuery, (snapshot) => {
      const firebaseData: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setActivityData(firebaseData);
    });
    return unsubs;
  };

  // Formates the date to a format: DD/MM/YYYY
  function dateFormat(activityDate: any) {
    return moment(new Date(activityDate.toDate().toUTCString())).format(
      "DD/MM/YYYY"
    );
  }

  const newActivityDataList = activityData.map(
    ({ activity_date, activity_calories }) => ({
      x: dateFormat(activity_date),
      y: activity_calories,
    })
  );

  const activityDataObject: { [key: string]: number } = {};

  newActivityDataList.forEach((d) => {
    if (activityDataObject.hasOwnProperty(d.x)) {
      activityDataObject[d.x] = activityDataObject[d.x] + d.y;
    } else {
      activityDataObject[d.x] = d.y;
    }
  });

  const updatedActivityData: victoryGraphLabel[] = [];

  for (const prop in activityDataObject) {
    updatedActivityData.push({ x: prop, y: activityDataObject[prop] });
  }

  const sortedDates = updatedActivityData.sort((a, b) =>
    a.x
      .split("/")
      .reverse()
      .join()
      .localeCompare(b.x.split("/").reverse().join())
  );
  
  const tickLabels = sortedDates.map((d) => d.x)

  const getAverageCalories = (list: any, column: string) => {
    let count = list.map((item: any) => item[column]);
    return (
      count.reduce((prev: number, curr: number) => prev + curr, 0) / list.length
    );
  };

  const averageCalories = (list: any, column: string) => {
    const averageCalory = getAverageCalories(list, column);
    let displayText;
    if (averageCalory >= 2000 && averageCalory <= 2500) {
      displayText = (
        <Text>
          Overall most of the time the activity consumption was up to standard. Your average  
          activity consumption is {averageCalory}
        </Text>
      );
    } else if (averageCalory < 2000) {
      displayText = (
        <Text>
          Your currently average activity consumption {averageCalory} does not meet the standard. Average activity consumption
          should be around 2000-2500. 
        </Text>
      );
    } else {
      displayText = <Text> Your average activity consumption is way over the standard</Text>;
    }
    return displayText;
  };

  return (
    <View>
      <View>
        {sortedDates.length > 0 ? (
        <View style={{backgroundColor:"white",borderRadius:10}}>
          <Text style={styles.textStyle}>Activity overview: Calories burned in {new Date().toLocaleDateString("en-us", { month: "long" })} </Text>
          <Text style={{marginLeft:10}}>{averageCalories(updatedActivityData, "y")}</Text>
        <VictoryChart width={350} domainPadding={20}>
          <VictoryLine
            y={() => 2500}
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
            y={() => 2000}
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
          <VictoryLine
            data={sortedDates}
            style = {{ labels: { fill: "white"},data: { stroke: "#FF75A7" } }}
            x="x"
            y="y"
          />
           <VictoryScatter 
            style={{ data: { fill: "black" } }}
            size={3}
            data={sortedDates}
           />
          <VictoryAxis
            dependentAxis={false}
            tickLabelComponent={<VictoryLabel angle={-90} y={263} />}
            tickFormat={tickLabels}
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>
        </View>
        ) : (
          <View>
            <Text style={{color:"red"}}>No activity data tracked!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle:{
      fontWeight:"bold",
      marginLeft:10,
      fontSize:16,
  }
})
export default ActivityOverview;
