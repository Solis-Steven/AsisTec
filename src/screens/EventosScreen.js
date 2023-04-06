import { 
  View, 
  SafeAreaView, 
  Text, 
  TouchableOpacity, 
  Modal
} from "react-native";
import React, {useEffect, useState} from "react";
import {Calendar} from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";
import EventModal from "../components/Events/EventModal";

const EventosScreen = () => {
  const [daySelected, setDaySelected] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <View style={{
      position: "relative",
      flex: 1,
      backgroundColor: isModalVisible ? "rgba(0,0,0,0.5)" : "white"
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
          calendarBackground: "#F4F4F4"
        }}
      />
      <TouchableOpacity 
        onPress={changeModalVisible}
        style={{
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

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={changeModalVisible}>
          <EventModal 
            changeModalVisible={changeModalVisible}
            daySelected={daySelected}/>
      </Modal>
    </View> 
  );
};
export default EventosScreen;
