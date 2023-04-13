import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { LoginNavigationProp } from "../utils/navigation.props";
import { FontAwesome5 } from "@expo/vector-icons";

const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.input}>
      <Text> Skin Tracker </Text>
      <View>
        <Text style={styles.textStyle}> Welcome! </Text>

        <View style={{ margin: 10 }}>
          <TextInput
            label="Enter username"
            value={userName}
            onChangeText={(val) => setUserName(val)}
            mode="outlined"
            outlineColor="#FF75A7"
            activeOutlineColor="#FF75A7"
          />
        </View>

        <View style={{ margin: 10 }}>
          <TextInput
            label="Enter password"
            value={password}
            secureTextEntry={true}
            onChangeText={(val) => setPassword(val)}
            mode="outlined"
            outlineColor="#FF75A7"
            activeOutlineColor="#FF75A7"
          />
        </View>

        <View style={styles.buttonStyle}>
          <View style={styles.button1}>
            <Button
              textColor="white"
              buttonColor="#FF75A7"
              onPress={() => navigation.navigate("Home")}
            >
              Login!
            </Button>
          </View>
          <View style={{ margin: 10, marginLeft: 10 }}>
            <Button
              textColor="white"
              buttonColor="#FF75A7"
              onPress={() => console.log("Test")}
            >
              Sign up
            </Button>
          </View>
        </View>
      </View>
      <View>
        <Text> Or login with </Text>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-around",
              width: "50%",
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Pressable>
                <FontAwesome5 name="facebook" size={35} color="#FF75A7" />
              </Pressable>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Pressable>
                <FontAwesome5 name="google" size={35} color="#FF75A7" />
              </Pressable>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Pressable>
                <FontAwesome5 name="twitter" size={35} color="#FF75A7" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 100,
    margin: 50,
    marginTop: 100,
    marginRight: 20,
    borderColor: "black",
    width: 250,
  },
  buttonStyle: {
    marginTop: 30,
    width: 200,
  },
  button1: {
    margin: 5,
    marginLeft: 10,
  },
  textStyle: {
    color: "black",
    fontFamily: "Arial",
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default Login;
