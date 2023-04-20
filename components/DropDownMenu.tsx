import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

export interface ISingleDropDown{
    key: string;
    value: string;
    disabled?:boolean;
}

export interface DropDownValue{
    value:string;
}

export interface IDropDown{
    data: ISingleDropDown[];
    setSelected: (val: string) => void;
}

const DropDownMenu:React.FC<IDropDown> = ({data,setSelected}) => {
 

    return (
        <SelectList
            setSelected={(val:string) => setSelected(val)}
            data={data}
            save="value"
        />
    )
}


export default DropDownMenu;