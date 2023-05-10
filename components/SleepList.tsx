import { getAuth } from "firebase/auth";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { db } from "../firebase";
import SleepCard from "./SleepCard";
import moment from "moment";

interface ISleepData {
  id: string;
  date_from: Timestamp;
}

/**
 * SleepList is a component that renders all SleepCard and 
 * displays in ordered way after Dates
 */
const SleepList = () => {
  const sleepQuery = query(
    collection(db, "sleepData"),
    where("userRef", "==", getAuth().currentUser?.uid)
  );
  const [sleepData, setSleepData] = React.useState<Array<ISleepData>>([]);

  React.useEffect(() => {
    fetchData();
  }, []);


  // Fetches sleep data from Firebase firestore
  const fetchData = () => {
    const unsubscribe = onSnapshot(sleepQuery, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSleepData(data);
    });
    return unsubscribe;
  };


  // Formats a date to a format DD/MM/YYYY
  const formatDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  // Maps the data into a format like: [{id: "id321", date: DD/MM/YYYY}]
  const vizData = sleepData.map(({ id, date_from }) => ({
    id: id,
    date: formatDate(new Date(date_from.toDate().toUTCString())),
  }));

  // Deletes a firebase document with a given ID from the database
  const handleDelete = async (id: string) => {
    const reference = doc(db, "sleepData", id);
    await deleteDoc(reference);
  };


  const sorted_dates = vizData.sort((a, b) =>
  a.date
    .split("/")
    .reverse()
    .join()
    .localeCompare(b.date.split("/").reverse().join())
);

  return (
    <View style={styles.container}>
      {sorted_dates.length > 0 ? (
        sorted_dates.map((sleep) => {
          return (
            <View key={sleep.id} style={{margin:5}}>
              <SleepCard
                date_from={sleep.date}
                onPress={() => handleDelete(sleep.id)}
              />
            </View>
          );
        })
      ) : (
        <View>
          <Text> No Data exist..</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SleepList;
