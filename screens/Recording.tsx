import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import CalendarComponent from "../components/CalendarComponent";

const Recording = () => {

  const [startDate,setDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());


  const date_format = (date: Date) => {
    return moment(date).format("MMMM Do YYYY h:mm:ss a")
  }

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setDate(currentDate);
  }

  const onChange2 = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  }

  const dateConverter = (startDate:Date,endDate:Date) => {
    return moment.utc(moment(endDate,"DD/MM/YYYY HH:mm:ss").diff(moment(startDate,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
  }

  const testFunction = (date: string) => {
    return parseInt(date.split(":")[0]) < 8;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Start date</Text>
      <CalendarComponent modeType={"date"} date={startDate} onChange={onChange} />
      <CalendarComponent modeType={"time"} date={startDate} onChange={onChange} />
      <Text>End date</Text>
      <Text>{date_format(startDate)}</Text>
      <CalendarComponent modeType={"date"} date={endDate} onChange={onChange2} />
      <CalendarComponent modeType={"time"} date={endDate} onChange={onChange2} />
      <Text>You have slept in {dateConverter(startDate,endDate)} hours</Text>
      <Text>{testFunction(dateConverter(startDate,endDate)) ? "You need more sleep": "Well done"}</Text>
      <Text>{date_format(endDate)}</Text>
    </View>
  );
};

export default Recording;