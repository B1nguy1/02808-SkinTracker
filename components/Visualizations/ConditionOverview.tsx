import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

type skinTypes = {
  skinType: string;
  amount: number;
};

/**
 * This component fetches skin data from Firebase Firestore and
 *  visualizes the skin types through a bar chart
 */

const ConditionOverview = () => {
  const [dataGraph, setDataGraph] = React.useState<Array<skinTypes>>([]);
  const [graphData, setGraphData] = React.useState<Array<skinTypes>>([]);
  const skinCollection = collection(db, "skinData");
  const skinGraphData: { skinType: string; amount: number }[] = [];
  const skinQuery = query(
    skinCollection,
    where("userRef", "==", getAuth().currentUser?.uid)
  );

  React.useEffect(() => {
    fetchSkins();
  }, []);

  React.useEffect(() => {
    getData();
  }, [dataGraph]);

  //Fetches skin data from Firebase firestore
  const fetchSkins = () => {
    const unsubs = onSnapshot(skinQuery, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDataGraph(data);
    });
    return () => unsubs();
  };


  /**
   * Modifies the retrieved data from backend and calculates
   * percentage of tracked skin types
   */
  const getData = () => {
    const skins: string[] = dataGraph.map(
      (skin: { skinType: string }) => skin.skinType
    );
    const uniqueSkins = Array.from(new Set(skins));

    uniqueSkins.forEach((uSkin: string) => {
      let count = 0;
      skins.forEach((skin) => {
        if (uSkin === skin) {
          count++;
        }
      });
      skinGraphData.push({
        skinType: uSkin,
        amount: (count / skins.length) * 100,
      });
      setGraphData(skinGraphData);
    });
  };

  // Updates the modified data to an array of object with keys x,y to use for visualization
  const updatedGraphData = graphData.map(({ skinType, amount }) => ({
    x: skinType,
    y: amount,
  }));
  const tickLabels = updatedGraphData.map((d) => d.x);

  return (
    <View>
      {updatedGraphData.length > 0 ? (
        <View style={styles.graphViewStyle}>
          <Text style={styles.textStyle}>Skin type overview</Text>
          <VictoryChart
            width={340}
            domainPadding={20}
            theme={VictoryTheme.material}
          >
            <VictoryBar
              data={updatedGraphData}
              x="x"
              y="y"
              style={{ data: { fill: "#FF75A7" } }}
              barWidth={10}
            />
            <VictoryAxis dependentAxis={false} tickFormat={tickLabels} />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </View>
      ) : (
        <Text>Track your skin condition to see the graph! </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  graphViewStyle: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  textStyle: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ConditionOverview;
