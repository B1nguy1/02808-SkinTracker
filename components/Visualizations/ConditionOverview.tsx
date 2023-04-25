import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { View, Text } from "react-native";
import { getAuth } from "firebase/auth";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

// TODO: Calculate percentage of each "skin type"

type skinTypes = {
  skinType: string;
  amount: number;
};

const ConditionOverview = () => {
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
  
  const updatedGraphData = graphData.map(({ skinType, amount }) => ({x:skinType, y:amount }));  
  const tickLabels = updatedGraphData.map((d) => d.x);
  

  return (
    <View style={{backgroundColor:"grey"}}>
    {updatedGraphData.length > 0 ? (
      <VictoryChart width={350} domainPadding={20} theme={VictoryTheme.material}>
      <VictoryBar
          data={updatedGraphData}
          x="x"
          y="y"
          style={{ data: { fill: "orange" } }}
          barWidth={10}
        />
        <VictoryAxis dependentAxis={false} tickFormat={tickLabels}/>
        <VictoryAxis dependentAxis/>
      </VictoryChart>
  ):(
    <></>
  )}
    </View>
  );
};

export default ConditionOverview;