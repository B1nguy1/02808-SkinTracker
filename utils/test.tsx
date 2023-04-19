import React from "react";
import firebase from "firebase/app";
import { View } from "react-native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export type Home = {
    id: string;
    title: string;
    icon: string;

};


export const Test = () => {

    
    const [cards, setCards] = React.useState<Home[]>([]);
    const [loading,setLoading] = React.useState(false);
    
    const fetchData = async() => {
        await getDocs(collection(db,"homecards"))
        .then((qs) => {
            const data: any = qs.docs.map((doc) => ({...doc.data(),id:doc.id}));
            setCards(data);
        })
    }

    React.useEffect(() => {
        fetchData();
    },[])
    
    console.log("This works?")
    console.log(cards);
    return (
        <View>
        </View>
    )

}
