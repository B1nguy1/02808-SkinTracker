import { FontAwesome,SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

type IconProps = {
    iconName: string;
    size: number;
}

export const HandleIconType: React.FC<IconProps> = (props) => {
    let Icon;
    switch(props.iconName){
        case 'camera':
            Icon = <FontAwesome name="camera" size={props.size} color="#e76f51"/>;
            break;
        case 'graph':
            Icon = <SimpleLineIcons name="graph" size={props.size} color="#f72585" />
            break;
        case 'face-woman':
            Icon = <MaterialCommunityIcons name="face-woman" size={props.size} color="#f72585" />
            break;
        case 'sleep':
            Icon = <MaterialCommunityIcons name="sleep" size={props.size} color="black" />
            break;
        case 'running':
            Icon = <FontAwesome5 name="running" size={props.size} color="black" />
            break;
        default:
            Icon = <MaterialIcons name="error" size={24} color="black" />
            break;
    };
    return Icon;
};