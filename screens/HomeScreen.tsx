import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HealthDataModal from "../components/HealthDataModal";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { IHomeCard } from "../utils/interfaces";

const HomeScreen = () => {
  const [HealthDataModalVisible, setHealthDataModalVisible] = React.useState(false);
  const [HomeCardInfo, setHomeCardInfo] = React.useState<IHomeCard[]>([]);


  const fetchData = () => {
    const unsubscribe = onSnapshot(collection(db,"homecards"), (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setHomeCardInfo(data);
    });
    return unsubscribe;
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.textStyle}> Home </Text>
      </View>
      {HomeCardInfo.map((k) => {
        return (
          <View key={k.id}>
            <Card id={k.id} title={k.title} icon={k.icon} />
          </View>
        );
      })}
      <View style={styles.homeCardStyle}>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setHealthDataModalVisible(true)}
          >
            <MaterialCommunityIcons name="pencil" size={31} color="#f72585" />
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
              Synchronize to local data
            </Text>
            <HealthDataModal
              setVisible={() => setHealthDataModalVisible(false)}
              visible={HealthDataModalVisible}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="pencil" size={30} color="#f72585" />
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
              Keep your own records
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 100,
  },
  homeCardStyle: {
    margin: 20,
    justifyContent: "space-around",
    flexDirection: "column",
    width: 300,
    height: 150,
    borderColor: "#808080",
    borderWidth: 2,
    backgroundColor: "#f5cac3",
    borderRadius: 10,
  },
  textStyle: {
    fontWeight: "bold",
    color: "#FF75A7",
    fontSize: 30,
    textAlign: "left",
    marginRight: 200,
    marginBottom: 20,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    margin: 30,
    marginTop: 50,
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 15,
  },
});

export default HomeScreen;
