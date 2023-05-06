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
import { View, Text } from "react-native";

interface IActivityData {
  activity_date: Timestamp;
  activity_calories: number;
}

interface IActivityObject {
  date: Date;
  calories: number;
}

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

  return (
    <View>
      {newActivityDataList.map((item, index) => {
        return (
          <View key={index}>
            <Text>{item.x}</Text>
            <Text>{item.y}</Text>
          </View>
        );
      })}
    </View>
  );
};
export default ActivityOverview;
