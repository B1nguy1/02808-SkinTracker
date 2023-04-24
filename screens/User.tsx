import React from "react";
import { View, Text } from "react-native";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import UserProfile from "../components/UserProfile";
import { ISkinArray, IUserSkin } from "../utils/interfaces";
import Test from "../components/Visualizations/Test";


const User = () => {
  const [userSkins, setuserSkins] = React.useState<Array<IUserSkin>>([]);
  const [skins, setSkins] = React.useState<Array<ISkinArray>>([]);
  const skinDataRef = collection(db, "skinData");
  const userQuery = query(
    skinDataRef,
    where("userRef", "==", getAuth().currentUser?.uid),
    orderBy("timeStamp", "desc"),
    limit(1)
  );

  const fetchData = () => {
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setuserSkins(data);
    });
    return unsubscribe;
  };

  const fetchSkins = () => {
    const unsubs = onSnapshot(collection(db, "skinCollection"), (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSkins(data);
    });
    return unsubs;
  };


  React.useEffect(() => {
    fetchData();
    fetchSkins();
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Test />
      {userSkins &&
        userSkins.map((element) => {
          return (
            <View style={{ margin: 20 }} key={element.id}>
              {skins
                .filter((skin) => skin.type === element.skinType)
                .map((skin) => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                      key={skin.id}
                    >
                      <UserProfile
                        type={skin.type}
                        id={skin.id}
                        description={skin.description}
                      />
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