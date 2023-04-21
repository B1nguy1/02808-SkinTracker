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
  skinType: string;
  id: string;
}

interface ISkin {
  type: string;
  id: string;
  description: string;
}

const User = () => {
  const [userSkins, setuserSkins] = React.useState<Array<User>>([]);
  const [skins, setSkins] = React.useState<Array<ISkin>>([]);
  const skinDataRef = collection(db, "skinData");
  const userQuery = query(
    skinDataRef,
    where("userRef", "==", getAuth().currentUser?.uid),
    orderBy("timeStamp", "desc"),
    limit(1)
  );

  const fetchData = async () => {
    await getDocs(userQuery).then((querySnapshot) => {
      const data: any = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setuserSkins(data);
    });
  };

  const fetchSkins = async () => {
    await getDocs(collection(db, "skinCollection")).then((querySnapshot) => {
      const data: any = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSkins(data);
    });
  };

  React.useEffect(() => {
    fetchData();
    fetchSkins();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userSkins &&
        userSkins.map((element) => {
          return (
            <View style={{ margin: 20 }} key={element.id}>
              <Text>{element.skinType}</Text>
              {skins
                .filter((skin) => skin.type === element.skinType)
                .map((skin) => {
                  return (
                    <View style={{justifyContent:"center",alignContent:"center"}} key={skin.id}>
                      <Text>{skin.description}</Text>
                    </View>
                  );
                })}
            </View>
          );
        })}
    </View>
  );
};

export default User;