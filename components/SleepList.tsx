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

const SleepList = () => {
  const userQuery = query(
    collection(db, "sleepData"),
    where("userRef", "==", getAuth().currentUser?.uid)
  );
  const [sleepData, setSleepData] = React.useState<Array<ISleepData>>([]);

  React.useEffect(() => {
    fetchData();
  }, []);

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

  const formatDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  // Data for visualization
  const vizData = sleepData.map(({ id, date_from }) => ({
    id: id,
    date: formatDate(new Date(date_from.toDate().toUTCString())),
  }));

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
