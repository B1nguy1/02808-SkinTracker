import React from 'react';
import { View, Text } from 'react-native';
import { IUserProfile } from '../utils/interfaces';

const UserProfile:React.FC<IUserProfile> = ({type,id,description}) => {
    
    return (
        <View>
            <View key={id}>
                <Text>{type}</Text>
                <Text>{description}</Text>
            </View>
        </View>
    )
}

export default UserProfile;