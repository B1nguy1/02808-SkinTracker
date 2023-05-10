import React from 'react';
import { Modal, Pressable, View, Text, StyleSheet } from 'react-native';
import { IHealthDataModal } from '../utils/interfaces';

/**
 * 
 * HealthDataModal is a modal that will be displayed to 
 * the user when pressing on synchronizing local data
 * and allows the user to synchronize local data from Health Apps.
 * This is not implemented yet due to the lack of knowledge of connecting
 * React Native with other apps. 
 */

const HealthDataModal: React.FC<IHealthDataModal> = (props) => {
    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={props.visible}
                onRequestClose={() => props.setVisible()}
            >
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.synchronizeTextStyle}>Do you want to synchronize local data?</Text>
                    <View style={styles.buttonContainer}>
                    <View>
                    <Pressable onPress={() => props.setVisible()}>
                        <Text style={styles.noTextStyle}> NO </Text>
                    </Pressable>
                    </View>
                    <View>
                        <Pressable onPress={() => props.setVisible()}>
                            <Text style={styles.yesTextStyle}>YES</Text>
                        </Pressable>
                    </View>
                </View>
                </View>
            </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginTop:22
    },
    subContainer:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonContainer:{
        marginTop:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
    },
    noTextStyle:{
        color:"red", 
        fontSize:15, 
        marginRight: 20
    },
    yesTextStyle:{
        color:"#2194FF", 
        fontSize: 15
    },
    synchronizeTextStyle:{
        fontSize:15
    }
})


export default HealthDataModal;