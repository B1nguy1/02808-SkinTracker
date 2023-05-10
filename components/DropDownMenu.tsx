import React from "react";
import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { IDropDown } from "../utils/interfaces";


const DropDownMenu:React.FC<IDropDown> = ({data,setSelected,placeholder}) => {
    return (
        <SelectList
            setSelected={(val:string) => setSelected(val)}
            data={data}
            search={false}
            placeholder={placeholder}
            dropdownTextStyles={styles.dropDownTextStyle}
            boxStyles={styles.boxStyle}
            inputStyles={styles.inputStyle}
            save="value"
        />
    );
};

const styles = StyleSheet.create({
    dropDownTextStyle:{
        fontSize:16
    },
    boxStyle:{
        width:"70%",
        margin:10,
        marginLeft:50
    },
    inputStyle:{
        width:"80%",
        borderRadius:0
    }
})

export default DropDownMenu;