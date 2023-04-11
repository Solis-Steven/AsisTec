import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
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
    "2023-04-06": [{name: "Reunion de Admin", initialHour: [new Date()], initialHourText: "10:00 AM" , finalHour: [new Date()], finalHourText: "2:00 PM",
    date: "2023-04-06", description: "Reunion de admin para discutir el avance del proyecto", isAllDay: false, reminder: 1, reminderText: "5 minutos antes"
  }, 
    {name: "Cita en el hospital", date: "2023-04-06", description: "Cita en el hospital para revisar el avance de la cirugia", 
    isAllDay: false, reminder: 1, reminderText: "5 minutos antes", initialHour: [new Date()], initialHourText: "3:00 PM", finalHour: [new Date()], 
    finalHourText: "4:00 PM"}],
    "2023-04-07": [{name: "Trabajar en diseno", date: "2023-04-07", description: "Trabajar en el diseno de la aplicacion", isAllDay: false, 
    reminder: 1, reminderText: "5 minutos antes", initialHour: [new Date()], initialHourText: "10:00 AM", finalHour: [new Date()], finalHourText: "2:00 PM"}],
    "2023-04-15": [{name: "Avance de compi", date: "2023-04-15", description: "Avance de compi", isAllDay: false, reminder: 1, reminderText: "5 minutos antes", 
    initialHour: [new Date()], initialHourText: "10:00 AM", finalHour: [new Date()], finalHourText: "2:00 PM"}],
    "2023-04-28": [{name: "Avance de admin", date: "2023-04-28",
    description: "Avance de admin", isAllDay: false, reminder: 1, reminderText: "5 minutos antes", initialHour: [new Date()], initialHourText: "10:00 AM",
    finalHour: [new Date()], finalHourText: "2:00 PM"}],
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventCreated = (event) => {


    const eventDate = Object.keys(event)[0];
    const eventsDates = Object.keys(eventItems);


    // Si ya hay un evento en la fecha seleccionada, se agrega el nuevo evento
    if(eventsDates.includes(eventDate) && selectedEvent === null) {

      setEventItems({...eventItems, [eventDate] : [...eventItems[eventDate], event[eventDate][0]]});
      
      
    
    }
    // Si ya hay un evento en la fecha seleccionada y se esta editando, se actualiza el evento
    else if(eventsDates.includes(eventDate) && selectedEvent !== null) {
      // Se actualiza el evento
      const newEventItems = eventItems[eventDate].map((item) => {
        // Si el nombre del evento es igual al nombre del evento seleccionado, se actualiza el evento esto en caso de que se haya cambiado el nombre
        if(item.name === selectedEvent.name) {
          return event[eventDate][0];
        }
        return item;
  
      });
      setEventItems({...eventItems, [eventDate] : newEventItems});

    }
    else {
      
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
        changeModalVisible={changeModalVisible}
        setSelectedEvent={setSelectedEvent}
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
          selectedEvent={selectedEvent}

        />
      </Modal>
    </View>
  );
};
export default EventosScreen;
