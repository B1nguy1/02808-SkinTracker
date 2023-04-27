import RNDateTimePicker, {
  AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";

type test = {
  modeType: "date" | "time";
  date: Date;
  onChange: (event: any, selectedDate?: Date | undefined) => void;
};



const CalendarComponent: React.FC<test> = ({ modeType, date, onChange }) => {
  return (
    <View>
      <RNDateTimePicker
        mode={modeType}
        value={date}
        is24Hour={true}
        onChange={onChange}
      />
    </View>
  );
};

export default CalendarComponent;
