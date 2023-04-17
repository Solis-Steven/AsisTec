import React, { useState, useRef, useEffect } from "react";
import {Calendar, Agenda, LocaleConfig} from "react-native-calendars";
import moment from 'moment';
import { TouchableOpacity, View, Text } from 'react-native';
import EventListItem from "./EventListItem";
import EventItem from "./EventItem";
import Ionicons from 'react-native-vector-icons/Ionicons';


LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May.', 'Jun', 'Jul.', 'Ago', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy'
};

LocaleConfig.defaultLocale = 'es';
    
const EventCalendar = ({
  daySelected, setDaySelected, eventCalendarItems, 
  changeModalVisible, setSelectedEvent, itemInfo, setItemInfo,
  onDelete}) => {
    
    const [selectedDayEvents, setSelectedDayEvents] = useState(new Date());
    const [unselectedEvent, setUnselectedEvent] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedEventName, setSelectedEventName] = useState("");

    const handleDelete = (item) => {
      onDelete(item);
      setIsDeleting(false);
    }

    const handleLongPress = (item) => {
      console.log(item["name"]);
      setIsDeleting(true);
      setItemInfo(item)
      setSelectedEventName(item["name"]);
    }

    return (
      <>
        <Calendar
          onDayPress={day => {
            setDaySelected(day.dateString);
            setUnselectedEvent(true);
            setIsDeleting(false);
          }}
          markingType={"custom"}
          markedDates={Object.keys(eventCalendarItems).reduce((obj, date) => {
            obj[date] = {
              marked: true
            }
            obj[daySelected] = {
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
            }
            obj[moment().format('YYYY-MM-DD')] = {
              customStyles: {
                container: {
                  backgroundColor: "#8FC1A9",
                  borderRadius: 7
                },
                text: {
                  color: "#FFFFFF",
                  fontWeight: "bold"
                },
              }
            }
            return obj;
          }, {})}
          theme={{
            arrowColor: "#8FC1A9",
            calendarBackground: "#F4F4F4"
          }}
        />

        {
          unselectedEvent
          ? (
            <Agenda
              items={eventCalendarItems}
              selected={daySelected}
              hideKnob={true}
              hideDayNames={true}
              hideExtraDays={true}
              hideArrows={true}
              theme={{
                backgroundColor: "#FFFFFF",
                selectedDayBackgroundColor: "#FFFFFF",
                calendarBackground: "#FFFFFF",
                agendaDayNumColor: "#5B83B0",
                agendaTodayColor: "#8FC1A9",
                agendaDayTextColor: "#5B83B0",
                selectedDayTextColor: "#FFFFFF",
                textSectionTitleColor:"#FFFFFF",
                headerText: "#FFFFFF",
                dotColor: "#FFFFFF",
                dayTextColor: "#FFFFFF",
                todayTextColor: "#FFFFFF",

              }}
              renderEmptyData={() => (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Text>No hay eventos para mostrar</Text>
                </View>
              )}
              renderItem={(items) => (
                <TouchableOpacity
                  key={items["name"]}
                  onLongPress={() => handleLongPress(items)}
                  onPress={() => {
                    setIsDeleting(false);
                    setUnselectedEvent(false);
                    setItemInfo(items);
                    setSelectedDayEvents(items.date);
                  }}
                >
                {/* {console.log("Items name:  ", items["name"], " , itemInfo: ", itemInfo["name"], " , selectedEventName: ", selectedEventName)} */}
                {
                  isDeleting && itemInfo["name"] === selectedEventName
                    ? (
                      <>
                      
                        <TouchableOpacity onPress={() => handleDelete(items)}>
                          <View 
                            style={{ 
                                backgroundColor: "#FF0000", 
                                padding: 20, 
                                margin: 10,
                                borderRadius: 10, 
                                flexDirection: "row", 
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 5
                            }}>
                            <Ionicons name="trash-bin-outline" size={24} color="white" />
                          </View>
                        </TouchableOpacity>
                      </>
                    )
                    : (
                        <EventListItem 
                          item={items} />
                    )
                  
                }
                </TouchableOpacity>
                )}
              
              />
          )
          : (
            <EventItem 
              itemInfo={itemInfo}
              selectedDayEvents={selectedDayEvents}
              changeModalVisible={changeModalVisible}
              setSelectedEvent={setSelectedEvent}
              />
          )
        }

        
      </>
    );
  };

export default EventCalendar;

