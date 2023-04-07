import React, { useState } from "react";
import {Calendar, Agenda} from "react-native-calendars";
import moment from 'moment';
import { 
  View, 
  Text
} from "react-native";
import { ProgressBar } from 'react-native-paper';
    
const EventCalendar = () => {
    const [daySelected, setDaySelected] = useState("");
    const [eventItems, setEventItems] = useState({
      "2023-04-06": [{name: "Evento 1", time: "10:00 AM - 11:00 AM"}, {name: "Evento 2", time: "1:00 PM - 2:00 PM"}],
      "2023-04-07": [{name: "Evento 3", time: "9:00 AM - 10:00 AM"}],
    });

    const loadEvents = (day) => {
      // Aquí es donde debe cargar los eventos correspondientes a la fecha seleccionada y agregarlos a la variable de estado "eventItems".
      // Por ahora, simplemente agregaremos un evento de prueba a la fecha seleccionada.
      const event = {name: "Mi evento de prueba", time: "12:00 PM - 1:00 PM"};
      setEventItems({[day.dateString]: [event]});
      console.log("Estoyu", day);
    }


    return (
      <>
        {/* <Calendar
          onDayPress={day => {
            setDaySelected(day.dateString);
            loadEvents(day.dateString);
          }}
          markingType={"custom"}
          markedDates={{
            [daySelected]: {
              selected: true, 
              disableTouchEvent: true, 
              selectedDotColor: "green",
              customStyles: {
                container: {
                  backgroundColor: "#F4F4F4",
                  borderRadius: 7,
                  borderColor: "#8FC1A9",
                  borderWidth: 1
                },
                text: {
                  fontWeight: "600",
                  color: "#8FC1A9"
                }
              }
            },
            [moment().format('YYYY-MM-DD')]: {
              customStyles: {
                container: {
                  backgroundColor: "#8FC1A9",
                  borderRadius: 7,
                },
                text: {
                  color: "#FFFFFF"
                }
              }
            }
          }}
          theme={{
            arrowColor: "#8FC1A9",
            calendarBackground: "#F4F4F4"
          }}
        /> */}

        
        <Agenda
          items={eventItems}
          markingType={"custom"}
          markedDates={{
            [daySelected]: {
              selected: true, 
              disableTouchEvent: true, 
              selectedDotColor: "green",
              customStyles: {
                container: {
                  backgroundColor: "#F4F4F4",
                  borderRadius: 7,
                  borderColor: "#8FC1A9",
                  borderWidth: 1
                },
                text: {
                  fontWeight: "600",
                  color: "#8FC1A9"
                }
              }
            },
            [moment().format('YYYY-MM-DD')]: {
              customStyles: {
                container: {
                  backgroundColor: "#8FC1A9",
                  borderRadius: 7,
                },
                text: {
                  color: "#FFFFFF"
                }
              }
            }
          }}
          theme={{
            arrowColor: "#8FC1A9",
            backgroundColor: "#FFFFFF"
          }}
          renderItem={(item) => {
            return (
              <View style={{
                  backgroundColor: "#FAF3DD", 
                  padding: 10, 
                  margin: 10,
                  borderRadius: 10
                }}>
                  <ProgressBar progress={0.5} color={'red'} />
                <Text style={{fontWeight: "600"}}>{item.name}</Text>
                <Text>{item.time}</Text>
              </View>
            )
          }}
        />
      </>
    );
  };
export default EventCalendar;
  