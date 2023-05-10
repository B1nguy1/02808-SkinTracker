import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";

type CalendarProps = {
  modeType: "date" | "time";
  date: Date;
  onChange: (event: any, selectedDate?: Date | undefined) => void;
};

const CalendarComponent: React.FC<CalendarProps> = ({ modeType, date, onChange }) => {
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
