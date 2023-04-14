import React from 'react';
import { Modal, Pressable, View, Text, StyleSheet } from 'react-native';

interface IHealthDataModal {
    setVisible: () => void;
    visible: boolean;
}

const HealthDataModal: React.FC<IHealthDataModal> = (props) => {


    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={props.visible}
                onRequestClose={() => props.setVisible()}
            >
            <View style={styles.subContainer}>
                <View>
                    <Text>Do you want to synchronize local data?</Text>
                    <View>
                    <Pressable onPress={() => props.setVisible()}>
                        <Text style={{color:"red"}}> NO </Text>
                    </Pressable>
                    </View>
                    <View>
                        <Pressable onPress={() => props.setVisible()}>
                            <Text style={{color:"lightblue"}}>YES</Text>
                        </Pressable>
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
    }
})


export default HealthDataModal;