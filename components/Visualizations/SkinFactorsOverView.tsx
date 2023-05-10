import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

interface ISkinValues {
  acne: number;
  blackHead: number;
  darkCircle: number;
  dehydration: number;
  fineLines: number;
  pores: number;
  spot: number;
}

interface ISkinFactors {
  skinValues: ISkinValues[];
}

type ColorData = {
  name: string;
  color: string;
};

type ColorProps = {
  data: ColorData;
};

export const skinValueWithColor: ColorData[] = [
  { name: "acne", color: "#177AD5" },
  { name: "blackHead", color: "#79D2DE" },
  { name: "darkCircle", color: "#ED6665" },
  { name: "dehydration", color: "lightgray" },
  { name: "fineLines", color: "green" },
  { name: "pores", color: "orange" },
  { name: "spot", color: "red" },
];

const SkinFactorsOverview = () => {
  const [skinFactorsData, setSkinFactorsData] = React.useState<
    Array<ISkinFactors>
  >([]);
  const skinCollection = collection(db, "skinData");
  const skinQuery = query(
    skinCollection,
    where("userRef", "==", getAuth().currentUser?.uid),
    orderBy("timeStamp", "desc"),
    limit(1)
  );

  React.useEffect(() => {
    getSkinsFactorsData();
  }, []);

  const getSkinsFactorsData = () => {
    const unsubscribe = onSnapshot(skinQuery, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSkinFactorsData(data);
    });
    return unsubscribe;
  };

  const convertDataToArrayOfObjects = () => {
    const data = skinFactorsData.map((data) => {
      return Object.keys(data.skinValues).map((key) => ({
        [key]: data.skinValues[key],
      }));
    });
    return data;
  };

  const updatedSkinFactorsData = convertDataToArrayOfObjects();
  const convert2DtoSingleArray = updatedSkinFactorsData.reduce(
    (acc, curr) => [...acc, ...curr],
    []
  );

  // Splits an array with single object to an array of multiple objects
  const newVizData = convert2DtoSingleArray.map((obj) => {
    const name = Object.keys(obj)[0];
    return { name, score: obj[name] };
  });

  // Matches the name of skin factor with another array and merges into one array of object
  const mergeTwoArrays = newVizData.map((obj) => {
    const obj1 = skinValueWithColor.find((obj1) => obj1.name === obj.name);
    return { ...obj, ...obj1 };
  });

  //Update keys of objects in an array to be value, name and color
  const updatedData = mergeTwoArrays.map(({ score, name, color }) => ({
    value: parseInt(score),
    name: name,
    color: color?.toString(),
  }));

  // Sums the value of the skin score(s)
  let skinScore = updatedData.reduce(function (prev, current) {
    return prev + +current.value;
  }, 0);

  // Inspiration from:  https://gifted-charts.web.app/piechart
  const renderDot = (color: string) => {
    return (
      <View
        style={[
          styles.renderDotViewStyle,
          {
            backgroundColor: color,
          },
        ]}
      />
    );
  };

  // A reusable component that will be render in renderItem function
  const SkinValueCard = ({ data }: ColorProps) => {
    return (
      <View style={styles.skinValueCardView}>
        {renderDot(data.color)}
        <Text style={{ color: "black" }}>{data.name}</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: ColorData }) => {
    return <SkinValueCard data={item} {...item} />;
  };

  const renderLegends = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          data={skinValueWithColor}
          keyExtractor={(item) => "#" + item.name.toString()}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  };

  return (
    <View>
      <View style={styles.subContainer}>
        <PieChart
          strokeColor="white"
          strokeWidth={4}
          data={updatedData}
          innerCircleBorderWidth={4}
          innerCircleBorderColor={"white"}
          showValuesAsLabels={true}
          textSize={18}
          donut
          showText
          showTextBackground={true}
          showGradient
        />
      </View>
      <Text style={styles.healthScoreTextStyle}>
        Your skin health score is:{" "}
        <Text style={styles.skinScoreTextStyle}>{skinScore} / 21 </Text>{" "}
      </Text>
      <View style={styles.renderLegendsView}>{renderLegends()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  healthScoreTextStyle: {
    fontSize: 15,
  },
  skinScoreTextStyle: {
    fontWeight: "bold",
  },
  renderLegendsView: {
    marginBottom: 10,
    alignItems: "center",
  },
  renderDotViewStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  skinValueCardView: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
  },
});

export default SkinFactorsOverview;
