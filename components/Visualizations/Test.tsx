import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { View, Text, Dimensions } from "react-native";
import { getAuth } from "firebase/auth";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";

// Playing around with charts

type skinTypes = {
  skinType: string;
  amount: number;
};

type testTypes = {
  x: string;
  y: number;
};

const Test = () => {
  const [dataGraph, setDataGraph] = React.useState<Array<skinTypes>>([]);
  const [testData, setTestData] = React.useState<testTypes[]>([]);
  const skinCollection = collection(db, "skinData");
  const testGraph: { skinType: string; amount: number }[] = [];
  const query1 = query(
    skinCollection,
    where("userRef", "==", getAuth().currentUser?.uid)
  );

  React.useEffect(() => {
    fetchSkins();
  }, []);

  const fetchSkins = () => {
    const unsubs = onSnapshot(query1, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDataGraph(data);
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
        testGraph.push({ skinType: uSkin, amount: count });
        setDataGraph(testGraph);
      });
    });
    return () => unsubs();
  };

  console.log(dataGraph);

  return (
    <View>
      <VictoryChart width={350}>
        <VictoryAxis tickFormat={dataGraph.map((d) => d.skinType)} />
        <VictoryAxis dependentAxis={true} />
        <VictoryBar
          data={dataGraph}
          x="skinType"
          y="amount"
          alignment="start"
          style={{ data: { fill: "orange" } }}
          barWidth={10}
        />
      </VictoryChart>
    </View>
  );
};

export default Test;
