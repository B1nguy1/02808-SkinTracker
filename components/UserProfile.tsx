import React from 'react';
import { View, Text } from 'react-native';

interface Skin{
    type: string;
    id: string;
    description: string;
}

const UserProfile:React.FC<Skin> = ({type,id,description}) => {
    
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