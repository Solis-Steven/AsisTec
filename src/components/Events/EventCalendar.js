import React, { useState } from "react";
import {Calendar, Agenda, LocaleConfig} from "react-native-calendars";
import moment from 'moment';
import { 
  View, 
  Text,
  TouchableOpacity
} from "react-native";
import EventListItem from "./EventListItem";
import EventItem from "./EventItem";
import { useEffect } from "react";

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
  changeModalVisible, setSelectedEvent, itemInfo, setItemInfo}) => {
    
    const [selectedDayEvents, setSelectedDayEvents] = useState(new Date());
    const [unselectedEvent, setUnselectedEvent] = useState(true);

    
    return (
      <>
        <Calendar
          onDayPress={day => {
            setDaySelected(day.dateString);
            setUnselectedEvent(true);
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
            calendarBackground: "#F4F4F4",
            // dotColor: "#F10B0B"
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
              renderItem={ item => (
                <TouchableOpacity onPress={() => {
                  setUnselectedEvent(false)
                  setItemInfo(item)
                  setSelectedDayEvents(item.date)
                }}>
                  <EventListItem 
                    item={item} />
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