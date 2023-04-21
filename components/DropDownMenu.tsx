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
            search={false}
            placeholder="Select skin type"
            dropdownTextStyles={{fontSize:16}}
            boxStyles={{width:"70%",margin:10, marginLeft:50}}
            inputStyles={{width:"90%",borderRadius:0}}
            save="value"
        />
    )
}


export default DropDownMenu;