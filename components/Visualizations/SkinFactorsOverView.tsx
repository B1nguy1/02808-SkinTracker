import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { View, Text, FlatList } from "react-native";
import { PieChart } from "react-native-gifted-charts";


interface ISkinValues{
    acne: number;
    blackHead: number;
    darkCircle: number;
    dehydration: number;
    fineLines: number;
    pores: number;
    spot: number;
}

interface ISkinFactors{
    skinValues: ISkinValues[];
}

export type ColorData = {
    name: string;
    color: string;
}

export type ColorProps = {
    data: ColorData;
}

export const skinValueWithColor:ColorData[] = [
    {name: "acne",color:'#177AD5'},
    {name: "blackHead", color:'#79D2DE'},
    {name: "darkCircle",color:'#ED6665'},
    {name: "dehydration", color:'lightgray'},
    {name: "fineLines",color:'#177AD5'},
    {name: "pores", color: 'orange'},
    {name: "spot", color: "red"}
]



const SkinFactorsOverview = () => {

    const [skinFactorsData, setSkinFactorsData] = React.useState<Array<ISkinFactors>>([]);
    const skinCollection = collection(db, "skinData")
    const skinQuery = query(skinCollection,where("userRef", "==", getAuth().currentUser?.uid));

    React.useEffect(() => {
        getSkinsFactorsData();
    },[]);

    const getSkinsFactorsData = () => {
        const unsubscribe = onSnapshot(skinQuery,(snapshot) => {
            const data: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setSkinFactorsData(data);
        })
        return unsubscribe;
    }
    
    const convertDataToArrayOfObjects = () => {
        const data = skinFactorsData.map((data) => {
            return Object.keys(data.skinValues).map(key => ({[key]: data.skinValues[key]}));
        })
        return data;
    }

    const liste = convertDataToArrayOfObjects();
    const convert2DtoSingleArray = liste.reduce((acc,curr) => [...acc,...curr],[])

    
    const newVizData = convert2DtoSingleArray.map((obj) => {
        const name = Object.keys(obj)[0];
        return { name, score: obj[name] }
    })
    
    const mergeTwoArrays = newVizData.map(obj => {
        const obj1 = skinValueWithColor.find(obj1 => obj1.name === obj.name);
            return { ...obj, ...obj1 };
    })
    

    const updatedData = mergeTwoArrays.map(({score,name,color}) => ({
        value: score,
        name: name,
        color:color
    })) 
    
    const renderDot = (color:string) => {
        return (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: color,
              marginRight: 10,
            }}
          />
        );
      };
      
    const SkinValueCard = ({data} : ColorProps) => {
        return (
            <View style={{            
                flexDirection: 'row',
                alignItems: 'center',
                width: 120,
            }}
            >
                {renderDot(data.color)}
                <Text style={{color:"black"}}>{data.name}</Text>
            </View>
        );
    }
 
    const renderItem = ({item}: {item: ColorData}) => {
        return <SkinValueCard data={item} {...item} />;
    }
      
      const renderLegends = () => {
        return (
          <>
          <FlatList
            numColumns={2}
            data={skinValueWithColor}
            keyExtractor={item => item.name.length + "#"}
            renderItem = {renderItem}
          />
        </>
        )}
    
    return (
        <View>
            <View style={{justifyContent:"center",alignItems:"center",paddingHorizontal:10}}>
            <PieChart
                strokeColor="white"
                strokeWidth={4}
                data={updatedData}
             //   innerCircleColor="#414141"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={'white'}
                showValuesAsLabels={true}
                textSize={18}
                donut
                showText
                showTextBackground={true}
               showGradient
            />
            </View>
            <View style={{marginBottom:10,alignItems:"center"}}>
            {renderLegends()}
            </View>
        </View>
    )
};

export default SkinFactorsOverview;