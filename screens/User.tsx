import React from "react";
import { View, Text } from "react-native";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

interface User {
  skinType:string;
  id: string;
}

const User = () => {
  const [userSkins, setuserSkins] = React.useState<Array<User>>([]);
  const skinDataRef  = collection(db, "skinData");
  const userQuery = query(skinDataRef, where("userRef", "==", getAuth().currentUser?.uid),orderBy("timeStamp","desc"),limit(1));

  const fetchData = async () => {
    await getDocs(userQuery).then((querySnapshot) => {
      const data: any = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setuserSkins(data);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, [userQuery]);


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userSkins ? (userSkins.map((element) => {
        return (
          <View style={{ margin: 20 }} key={element.id}>
            <Text>Your currently condition: {element.skinType} </Text>
          </View>
        );
      })):(
        <Text>No tracked skin condition</Text>
      )}
    </View>
  );
};

export default User;