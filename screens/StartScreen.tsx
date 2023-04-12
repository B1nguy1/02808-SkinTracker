import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';


const StartScreen = () => {
    const navigation = useNavigation();
    const [userName,setUserName] = React.useState("");
    const [password,setPassword] = React.useState("");
    
    return(
        <View style={styles.input}>
            <Text> Skin Tracker </Text>
            
            <Text style={styles.textStyle}> Welcome! </Text>
        <View style={{margin:10}}>
            <TextInput
                label="Enter username"
                value={userName}
                onChangeText={val => setUserName(val)}
            />
        </View>
        <View style={{margin:10}}>
            <TextInput
                label="Enter password"
                value={password}
                secureTextEntry={true}
                onChangeText={val => setPassword(val)}
            />
        </View>
        <View style={styles.buttonStyle}>
            <View style={styles.button1}>
            <Button 
                textColor='white'
                buttonColor='#FF75A7'
                onPress={() => console.log(userName + " " + password)}
            >
                Login!
            </Button>
            </View>
            <View style={{margin:10,marginLeft:10}}>
            <Button           
                textColor='white'
                buttonColor='#FF75A7'
                onPress={() => console.log("Test")}
                
            >
                Sign up
            </Button>
            </View>
            </View>
        
        </View>
    )
}


const styles = StyleSheet.create({
    input:{
        height: 100,
        margin: 50,
        marginTop:100,
        marginRight:20,
        borderColor:"black",
        width:250
    },
    buttonStyle:{
        marginTop:30,
        width:200
    },
    button1:{
        margin:5,
        marginLeft:10
    },
    textStyle:{
        color:"black",
        fontFamily:"Archivo",
        fontSize:40,
        fontWeight:"bold"
    }
})

export default StartScreen;