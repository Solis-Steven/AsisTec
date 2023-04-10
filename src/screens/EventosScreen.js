import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import EventModal from "../components/Events/EventModal";
import EventCalendar from "../components/Events/EventCalendar";
import moment from "moment";

const EventosScreen = () => {
  const [daySelected, setDaySelected] = useState(moment().format("YYYY-MM-DD"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundColor: "transparent",
  });
  
  const [eventItems, setEventItems] = useState({
    "2023-04-06": [{name: "Reunion de Admin", initialHour: "10:00 AM", finalHour: "11:00 AM", date: "2023-04-06", 
    description: "Reunion de admin para discutir el avance del proyecto", isAllDay: false
  }, 
    {name: "Cita en el hospital", initialHour: "1:00 PM", finalHour: "5:00 PM", date: "2023-04-06", 
    description: "Cita en el hospital para revisar el avance de la cirugia", isAllDay: false}],
    "2023-04-07": [{name: "Trabajar en diseno", initialHour: "9:00 AM", finalHour: "6:00 PM", date: "2023-04-07"}],
    "2023-04-15": [{name: "Avance de compi", initialHour: "1:00 PM", finalHour: "2:00 PM", date: "2023-04-15"}],
    "2023-04-28": [{name: "Avance de admin", initialHour: "7:00 PM", finalHour: "8:00 PM", date: "2023-04-28"}],
  });

  const handleEventCreated = (event) => {


    const eventDate = Object.keys(event)[0];
    const eventsDates = Object.keys(eventItems);

    if(eventsDates.includes(eventDate)){
      setEventItems({...eventItems, [eventDate] : [...eventItems[eventDate], event[eventDate][0]]});
    } else {
      
      setEventItems({...eventItems, [eventDate] : event[eventDate]});
    }
   
  }
  const changeModalVisible = () => {
    setIsModalVisible(!isModalVisible);
    setBackgroundStyle({
      backgroundColor: isModalVisible ? "transparent" : "rgba(0,0,0,0.4)",
    });
  };


  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        backgroundColor: "#FFFFFF",
        ...backgroundStyle, // Copia todas las propiedades de backgroundStyle en el estilo de la vista
      }}
    >
      <EventCalendar
        daySelected={daySelected}
        setDaySelected={setDaySelected}
        eventCalendarItems={eventItems}
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
        }}
      >
        <Icon name="plus" type="font-awesome" color="#ffffff" size={24} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={changeModalVisible}
      >
        <EventModal
          changeModalVisible={changeModalVisible}
          daySelected={daySelected}
          isModalVisible={isModalVisible}
          onEventCreated={handleEventCreated}
        />
      </Modal>
    </View>
  );
};
export default EventosScreen;
