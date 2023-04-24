import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import UserProfile from "../components/UserProfile";
import { ISkinArray, IUserSkin } from "../utils/interfaces";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

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

  const signOutUser = () => {
    signOut(getAuth()).then(() => {
      navigation.navigate("Login" as never, {} as never);
    }).catch((e) => console.error(e))
  };

  React.useEffect(() => {
    fetchData();
    fetchSkins();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userSkins.length > 0 ? (
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
                        onPress={() => navigation.navigate("Test" as never, {} as never)}
                      />
                    </View>
                  );
                })}
            </View>
          );
        })):(
          <View>
            <Text> Cannot find tracked skin condition(s) </Text>
          </View>
        )}
      <View style={styles.signOutButtonStyle}>
        <Button
          textColor="white"
          buttonColor="#FF75A7"
          onPress={() => signOutUser()}
        >
          Sign out!
        </Button>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  signOutButtonStyle: {
    margin: 5,
    marginleft: 10,
    width: 150,
  },
});

export default User;
