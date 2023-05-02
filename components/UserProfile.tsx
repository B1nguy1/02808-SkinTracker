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
                <View style={{marginTop:30}}>
                <Button textColor="white" buttonColor="#d1809d" onPress={onPress}>Visualize your data </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        alignContent:"center",
        justifyContent:"center",
        margin:20,
    },
    subContainer:{
        borderWidth:2,
        borderColor:"slategrey",
        width:"100%",
        justifyContent:"space-between",
        padding:10,
        margin:5,
        marginTop:10,
        borderRadius:10,
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