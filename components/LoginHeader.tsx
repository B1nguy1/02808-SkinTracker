import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginHeader = () => {
    return (
        <View>
            <Text style={styles.titleStyle}> Skin Tracker </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle:{
        color:"#FF75A7",
        alignSelf:"flex-start",
        textAlign:"left",
        fontSize:30,
        fontWeight:"bold",
    }
})

export default LoginHeader;