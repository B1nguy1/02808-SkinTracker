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

const Test = () => {
  const [dataGraph, setDataGraph] = React.useState<Array<skinTypes>>([]);
  const [graphData, setGraphData] = React.useState<Array<skinTypes>>([]);
  const skinCollection = collection(db, "skinData");
  const testGraph: { skinType: string; amount: number }[] = [];
  const query1 = query(skinCollection,where("userRef", "==", getAuth().currentUser?.uid));
  
  React.useEffect(() => {
    fetchSkins();
  }, []);

  React.useEffect(() => {
    getData();
  },[dataGraph])

  const fetchSkins = () => {
    const unsubs = onSnapshot(query1, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDataGraph(data);
    });
    return () => unsubs();
  };

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
       testGraph.push({ skinType: uSkin, amount: count });
       setGraphData(testGraph);

    });
  }
  
  const updatedArray = graphData.map(({ skinType, amount }) => ({x:skinType, y:amount }));  
  const tickLabels = updatedArray.map((d) => d.x);

  return (
    <View>
      <VictoryChart width={350} domainPadding={20}>
      <VictoryBar
          data={updatedArray}
          x="x"
          y="y"
          style={{ data: { fill: "orange" } }}
          barWidth={10}
        />
        <VictoryAxis dependentAxis={false} tickFormat={tickLabels}/>
        <VictoryAxis dependentAxis/>
      </VictoryChart>
    </View>
  );
};

export default Test;