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
} from "victory-native";

interface testRecording {
  date_from: Timestamp;
  end_date: Timestamp;
}

type sleepArray = {
  date: Date;
  hoursOfSleep: number;
};

export type testI = {
  x: string;
  y: number;
}

export const format_date = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};

  /*
  Inspiration:
  https://stackoverflow.com/questions/19233283/sum-javascript-object-propertya-values-with-the-same-object-propertyb-in-an-arra
  */
export const updateData = (dataList:any,dataObject:{[key:string]:number}) => {
  dataList.forEach((d:any) => {
    if(dataObject.hasOwnProperty(d.x)){
      dataObject[d.x] = dataObject[d.x]+ d.y
    }
    else{
      dataList[d.x] = d.y
    }
  })
  const updated_dataList:testI[] =[];
  for (const prop in dataObject){
    updated_dataList.push({ x: prop, y: dataObject[prop]})
  }
  return updated_dataList;
}


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
      data1.push({
        date: start,
        hoursOfSleep: Math.abs(Math.round(diffDuration)),
      });
      setSleepData1(data1);
    });
    return data1;
  };

  // Data for visualization
  const vizData = sleepData1.map(({ date, hoursOfSleep }) => ({
    x: format_date(date),
    y: hoursOfSleep,
  }));

  const vizDataObject: { [key: string]: number } = {};

  const newVizData = updateData(vizData,vizDataObject);

  const sorted_dates = newVizData.sort((a, b) =>
    a.x
      .split("/")
      .reverse()
      .join()
      .localeCompare(b.x.split("/").reverse().join())
  );
  const tickLabels = newVizData.map((d) => d.x);

  return (
    <View
      style={{
        backgroundColor: "lightgrey",
        flex: 1,
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Text>
        Current month:{" "}
        {new Date().toLocaleDateString("en-us", { month: "long" })}
      </Text>
      <VictoryChart width={350} domainPadding={20}>
        <VictoryBar
          labels={({ datum }) => `Hour: ${datum.y}`}
          data={sorted_dates}
          style={{ labels: { fill: "white" } }}
          x="x"
          y="y"
        />
        <VictoryAxis
          dependentAxis={false}
          tickLabelComponent={<VictoryLabel angle={-45} y={263} />}
          tickFormat={tickLabels}
        />
        <VictoryAxis dependentAxis />
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
          y={() => 6}
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
      </VictoryChart>
    </View>
  );
};

export default SleepOverview;