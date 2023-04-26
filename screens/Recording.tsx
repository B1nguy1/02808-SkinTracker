import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import CalendarComponent from "../components/CalendarComponent";

const Recording = () => {

  const [startDate,setDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  function checkDate(startDate:Date,endDate:Date){
    if(startDate > endDate){
     return <Text>start date cannot override the end date</Text>
    }
    else{
     return <Text> OK! </Text>
    };
  }

  const date_format = (date: Date) => {
    return moment(date).format("MMMM Do YYYY h:mm:ss a")
  }

  const handleStartDateChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setDate(currentDate);
  }

  const handleEndDateChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  }

  const dateConverter = (startDate:Date,endDate:Date) => {
    return moment.utc(moment(endDate,"DD/MM/YYYY HH:mm:ss").diff(moment(startDate,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
  }

  const getHour = (date: string) => {
    if(parseInt(date.split(":")[0]) < 8){
      return <Text>You need more sleep</Text>;
    }
    else{
      return <Text>You have slept enough :) </Text>
    }  
  }

  // Get all days for a given month
  const getDaysMonth = (month:number,year:number) => {
    var date = new Date(Date.UTC(year,month,1));
    var days = []
    while(date.getUTCMonth() === month){
      days.push(new Date(date));
      date.setUTCDate(date.getUTCDate() + 1)
    }
    return days;
  }

  // Format dates in a list to a given format
  function updateDateFormat(dates: Date[]){
    var formatted_days = []
    for (let i = 0; i < dates.length; i++){
      formatted_days.push(dates[i].toLocaleDateString());
    }
    return formatted_days;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Start date</Text>
      <CalendarComponent modeType={"date"} date={startDate} onChange={handleStartDateChange} />
      <CalendarComponent modeType={"time"} date={startDate} onChange={handleEndDateChange} />
      <Text>End date</Text>
      <Text>{date_format(startDate)}</Text>
      <CalendarComponent modeType={"date"} date={endDate} onChange={handleStartDateChange} />
      <CalendarComponent modeType={"time"} date={endDate} onChange={handleEndDateChange} />
      <Text>You have slept in {dateConverter(startDate,endDate)} hours</Text>
      <Text>{getHour(dateConverter(startDate,endDate))}</Text>
      <Text>{date_format(endDate)}</Text>
      <Text>{checkDate(startDate,endDate)}</Text>
    </View>
  );
};

export default Recording;