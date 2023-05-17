import {
    View, Text, TouchableOpacity, 
    Modal, StyleSheet
} from "react-native";
import React, { useState } from "react";

import { TimelineCalendar, MomentConfig  } from "@howljs/calendar-kit"; 
import Icon from "react-native-vector-icons/FontAwesome"; 

import WeekView from "../components/Schedule/WeekView"; 
import DayView from "../components/Schedule/DayView"; 
import ModalControls from "../components/Schedule/ModalControls";

MomentConfig.updateLocale('es', { // setting moment.js locale to Spanish
    weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
});

const HorarioScreen= () => {

    // Define state variables with their initial values
    const [viewMode, setViewMode] = useState("week"); 
    const [isModalVisible, setIsModalVisible] = useState(false); 

    const changeModalVisible = () => { 
        setIsModalVisible(!isModalVisible);
    }
    
    const events = [ 
        {
            id: 1,
            start: new Date(2023, 4, 17, 6, 0),
            end: new Date(2023, 4, 17, 11, 0),
            title: "Diseño de Software",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#F44336",

        },
          {
            id: 3,
            start: new Date(2023, 4, 15, 1, 0),
            end: new Date(2023, 4, 15, 12, 0),
            title: "Administración de Proyectos",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#64B149",
          },

          {
            id: 4,
            start: new Date(2023, 4, 15, 13, 0),
            end: new Date(2023, 4, 15, 20, 0),
            title: "Estadística",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#EED91C",
          },

          {
            id: 5,
            start: new Date(2023, 4, 16, 8, 0),
            end: new Date(2023, 4, 16, 11, 0),
            title: "Compiladores E interpretes",
            description: "Presentación de nuevos productos",
            location: "Oficina principal",
            color: "#EC7752",
          },

      ];

      return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Week view button */}
                <TouchableOpacity  
                onPress={() => {
                    setViewMode("week")
                }}
                style={{...styles.viewModeHeader, backgroundColor: "#C8D6B9"}}>
                <Text style={styles.viewModeText}>
                    Semana
                </Text>
                </TouchableOpacity>
        
                {/* Day view button */}
                <TouchableOpacity 
                onPress={() => {
                    setViewMode("day")
                }}
                style={{...styles.viewModeHeader, backgroundColor: "#FAF3DD"}}>
                <Text style={styles.viewModeText}>
                    Día
                </Text>
                </TouchableOpacity>
            </View>
        
            {/* Calendar */}
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
                },
                }}
            />
        
            {/* Add button */}
            <TouchableOpacity 
                onPress={changeModalVisible}
                style={styles.addCA}>
                <Icon name="plus" type="font-awesome" color="#ffffff" size={24} />
            </TouchableOpacity>
        
            {/* Add event modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={changeModalVisible}>
                <ModalControls changeModalVisible={changeModalVisible}/>
            </Modal>
        </View>
      );
      
}

const styles = StyleSheet.create({
    container: {backgroundColor: "#FFFFFF", height: "100%"},

    header: {
        flexDirection: "row", 
        justifyContent: "center",
        marginBottom: 10
    },

    viewModeHeader: {padding: 5, width: 100},

    viewModeText: {
        fontSize: 15, 
        textAlign: "center",
        fontWeight: "bold"
    },

    addCA: {
        position: "absolute",
        backgroundColor: "#5B83B0",
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        bottom: 15,
        right: 15,
    }
})

export default HorarioScreen;