import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';



const Home = () => {
    const navigation = useNavigation();
    const [userName,setUserName] = React.useState("");
    const [password,setPassword] = React.useState("");
    
    return(
        <View style={styles.input}>
            <Text> Welcome! </Text>
            <TextInput
                label="Enter username"
                value={userName}
                onChangeText={val => setUserName(val)}
            />
            <TextInput
                label="Enter password"
                value={password}
                secureTextEntry={true}
                onChangeText={val => setPassword(val)}
            />
        <View style={styles.buttonStyle}>
            <Button 
                textColor='white'
                buttonColor='#FF75A7'
                onPress={() => console.log(userName + " " + password)}
            >
                Login!
            </Button>
        </View>
            <Button           
                textColor='white'
                buttonColor='#FF75A7'
                onPress={() => console.log("Halla bro!")}
            >
                Sign up
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    input:{
        height: 50,
        margin: 5,
        marginRight:10,
        borderColor:"black",
        width:250
    },
    buttonStyle:{
        margin:10,
    }
})

export default Home;