import { FontAwesome,SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
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
        default:
            Icon = <MaterialIcons name="error" size={24} color="black" />
            break;
    }
    return Icon;
}