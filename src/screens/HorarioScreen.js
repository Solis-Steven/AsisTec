import {View, Text, TouchableOpacity, Button} from "react-native";
import React from "react";
import { TimelineCalendar, MomentConfig  } from "@howljs/calendar-kit";
import { useState } from "react";
import WeekView from "../components/Schedule/WeekView";
import DayView from "../components/Schedule/DayView";

MomentConfig.updateLocale('es', {
    weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
  });

const HorarioScreen= () => {
    const [viewMode, setViewMode] = useState("week");
    const events = [
        {
            id: 1,
            start: new Date(2023, 3, 3, 8, 0),
            end: new Date(2023, 3, 3, 11, 0),
            title: "Diseño de Software",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#F44336",
        },

        {
            id: 2,
            start: new Date(2023, 3, 4, 9, 0),
            end: new Date(2023, 3, 4, 11, 0),
            title: "Seminario de Estudios Filosoficos",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#66C5E3",
          },

          {
            id: 3,
            start: new Date(2023, 3, 4, 13, 0),
            end: new Date(2023, 3, 4, 16, 0),
            title: "Administración de Proyectos",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#64B149",
          },

          {
            id: 4,
            start: new Date(2023, 3, 6, 13, 0),
            end: new Date(2023, 3, 6, 16, 0),
            title: "Estadística",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#EED91C",
          },

          {
            id: 5,
            start: new Date(2023, 3, 7, 8, 0),
            end: new Date(2023, 3, 7,11, 0),
            title: "Compiladores E interpretes",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#EC7752",
          }
      ];

      
    return (
        <View style={{backgroundColor: "#FFFFFF", height: "100%"}}>
            <View style={{
                flexDirection: "row", 
                justifyContent: "center",
                marginBottom: 10
            }}>
                <TouchableOpacity 
                    onPress={() => {
                        setViewMode("week")
                    }}
                    style={{
                    backgroundColor: "#C8D6B9",
                    padding: 5,
                    width: 100
                }}>
                    <Text style={{
                        fontSize: 15, 
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>
                        Semana
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => {
                        setViewMode("day")
                    }}
                    style={{
                    backgroundColor: "#FAF3DD",
                    padding: 5,
                    width: 100
                }}>
                    <Text style={{
                        fontSize: 15, 
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>
                        Día
                    </Text>
                </TouchableOpacity>
            </View>
            <TimelineCalendar 
                events={events}
                renderEventContent={(event) => {
                    return viewMode === "week"
                        ? (<WeekView key={event.id} event={event}/>)
                        : (<DayView key={event.id} event={event}/>)
                }} 
                viewMode={viewMode}
                allowPinchToZoom={true}
                allowDragToCreate={true}
                locale="es"

                theme={{
                    cellBorderColor: "transparent",
                    dayName:{
                        color: "#8FC1A9",
                    },
                    todayName: {
                        color: "#8FC1A9"
                    },
                    todayNumberContainer: {
                        backgroundColor: "#8FC1A9",
                        borderRadius: 8
                    },
                    saturdayName: {
                        color: "#8FC1A9"
                    },
                    sundayName: {
                        color: "#8FC1A9"
                    },
                    dragHourContainer: {
                        backgroundColor:"#000000"
                    }

                }}
            />
        </View>
    );
}
export default HorarioScreen;