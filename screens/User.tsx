import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { LoginNavigationProp } from "../utils/navigation.props";

interface User {
  userText: string;
  id: string;
}

const User = () => {
  const [text, setText] = React.useState("");
  const [posts, setPosts] = React.useState<User[]>([]);
  const postCollectionRef = collection(db, "posts");
  const navigation = useNavigation<LoginNavigationProp>();

  const handleAdd = async () => {
    try {
      if (getAuth().currentUser?.uid != null) {
        await addDoc(postCollectionRef, {
          userText: text,
          timestamp: serverTimestamp(),
          userRef: getAuth().currentUser?.uid,
        });
        setText("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPosts = async () => {
    const userQuery = query(
      postCollectionRef,
      where("userRef", "==", getAuth().currentUser?.uid)
    );
    await getDocs(userQuery).then((querySnapshot) => {
      const data: any = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(data);
    });
  };

  React.useEffect(() => {
    getPosts();
  }, []);

  const sign_out = () => {
    getAuth()
      .signOut()
      .then(() => {
        navigation.navigate("Login", {} as never);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{ height: 40, margin: 12, borderWidth: 2, padding: 10 }}
        onChangeText={setText}
        value={text}
      />

      <Button onPress={handleAdd} title="ADD" />
      <Button onPress={sign_out} title="SAVE" />
      {posts.map((post) => {
        return (
          <View style={{ flex: 1 }} key={post.id}>
            <Text> {post.userText} </Text>
          </View>
        );
      })}
    </View>
  );
};

export default User;
