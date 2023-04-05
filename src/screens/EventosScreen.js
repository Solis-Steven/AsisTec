import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import React, {useEffect, useState} from "react";
import {Calendar} from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";

const EventosScreen = () => {
  const [daySelected, setDaySelected] = useState('');

  return (
    <View style={{
      position: "relative",
      flex: 1
    }}>
      <Calendar
        onDayPress={day => {
          setDaySelected(day.dateString);
        }}
        markedDates={{
          [daySelected]: {
            selected: true, 
            disableTouchEvent: true, 
            selectedDotColor: "green"
          }
        }}
        theme={{
          selectedDayBackgroundColor: "#8BB8A6",
          selectedDayTextColor: "#ffffff",
          arrowColor: "#8FC1A9",
          todayTextColor: "#ffffff",
          todayBackgroundColor: "#54C18C",
          dayTextColor: "#000000",
        }}
      />
      <TouchableOpacity style={{
        position: "absolute",
        backgroundColor: "#5B83B0",
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        bottom: 15,
        right: 15,
      }}>
        <Icon name="plus" type="font-awesome" color="#ffffff" size={24} />
      </TouchableOpacity>
    </View> 
  );
};
export default EventosScreen;
