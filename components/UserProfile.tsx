import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IUserProfile } from '../utils/interfaces';
import { Button } from 'react-native-paper';

const UserProfile:React.FC<IUserProfile> = ({type,id,description,onPress}) => {
    
    return (
        <View style={styles.container}>
            <View key={id} style={styles.subContainer}>
                <Text style={styles.typeTextStyle}>{type}</Text>
                <Text style={styles.descriptionTextStyle}>{description}</Text>
                <Button onPress={onPress}>See your stats </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        alignContent:"center",
        justifyContent:"center",
        margin:2,
    },
    subContainer:{
        borderWidth:2,
        borderColor:"black",
        width:"100%",
        justifyContent:"space-between"
    },
    typeTextStyle:{
        fontSize:20,
        fontWeight:"bold",
    },
    descriptionTextStyle:{
        fontSize:14
    }
})

export default UserProfile;