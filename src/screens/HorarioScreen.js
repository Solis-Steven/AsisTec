import {
    View, Text, TouchableOpacity,
    Modal, StyleSheet
} from "react-native";
import React, { useState } from "react";

import { TimelineCalendar, MomentConfig } from "@howljs/calendar-kit";
import Icon from "react-native-vector-icons/FontAwesome";

import WeekView from "../components/Schedule/WeekView";
import DayView from "../components/Schedule/DayView";
import ModalControls from "../components/Schedule/ModalControls";

MomentConfig.updateLocale('es', { // setting moment.js locale to Spanish
    weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
});

const HorarioScreen = () => {

    const [ultimoId, setUltimoId] = useState(2); // Ultimo id de la lista de componentes
    const [ultimoIdRelacion, setUltimoIdRelacion] = useState(2); // Ultimo id de la lista de componentes

    const events = [
        {
            id: 1,
            idRelacion: 1,
            start: new Date(2023, 4, 17, 8, 30),
            end: new Date(2023, 4, 17, 11, 30),
            title: "Diseño de Software",
            professorName: "Juan Carlos Cubero",
            location: "Oficina principal",
            modalityType: "Presencial",
            color: "#F44336",
            type: "Clase",
        },
        {
            id: 2,
            idRelacion: 2,
            start: new Date(2023, 4, 15, 7, 30),
            end: new Date(2023, 4, 15, 12, 30),
            title: "Salir a correr",
            description: "Cada dia a las 7:00 AM",
            modalityType: "Presencial",
            color: "#64B149",
            type: "Actividad",
        },

    ];
    // Define state variables with their initial values
    const [viewMode, setViewMode] = useState("week");
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Variables para obtener las fechas
    const [listaComponents, setListaComponents] = useState(events); // Array para almacenar la lista de componentes

    // Variable para actualizar la lista de componentes
    const [estado, setEstado] = useState(false); // Estado para actualizar la lista de componentes

    const changeModalVisible = () => {
        setIsModalVisible(!isModalVisible);
    }

    return (
        //listaComponents.forEach(objeto => console.log(JSON.stringify(objeto))),
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Week view button */}
                <TouchableOpacity
                    onPress={() => {
                        setViewMode("week")
                    }}
                    style={{ ...styles.viewModeHeader, backgroundColor: "#C8D6B9" }}>
                    <Text style={styles.viewModeText}>
                        Semana
                    </Text>
                </TouchableOpacity>

                {/* Day view button */}
                <TouchableOpacity
                    onPress={() => {
                        setViewMode("day")
                    }}
                    style={{ ...styles.viewModeHeader, backgroundColor: "#FAF3DD" }}>
                    <Text style={styles.viewModeText}>
                        Día
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Calendar */}
            <TimelineCalendar

                onPressEvent={(event) => {
                    // se debe recibir el id del evento
                    console.log("Evento presionado: " + event.id);
                    //console.log("Evento presionado: " + JSON.stringify(event));
                    // se debe abrir el modal con los datos del evento
                    // se debe identificar si es un curso o una actividad
                    // se debe actualizar el evento
                    // se debe actualizar la lista de componentes
                }}

                // Para eliminar un evento
                onLongPressEvent={(event) => {
                    // se debe recibir el id del evento
                    console.log("Evento presionado constantemente:  " + event.id);
                    //console.log("Evento presionadoconstantemente: " + JSON.stringify(event));
                    // Se debe buscar el evento en la lista de componentes
                    // Se deben eliminar los eventos relacionados con el evento
                    // se debe eliminar el evento de la lista de componentes
                    // se debe actualizar la lista de componentes

                }}
                events={listaComponents}
                renderEventContent={(event) => {
                    return viewMode === "week"
                        ? (<WeekView key={event.id} event={event} />)
                        : (<DayView key={event.id} event={event} />)
                }}
                viewMode={viewMode}
                allowPinchToZoom={true}
                allowDragToCreate={true}
                locale="es"
                theme={{
                    cellBorderColor: "transparent",
                    dayName: {
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
                        backgroundColor: "#000000"
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
                <ModalControls
                    changeModalVisible={changeModalVisible}
                    listaComponents={listaComponents}
                    setListaComponents={setListaComponents}
                    ultimoId={ultimoId}
                    setUltimoId={setUltimoId}
                    ultimoIdRelacion={ultimoIdRelacion}
                    setUltimoIdRelacion={setUltimoIdRelacion}
                />
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    container: { backgroundColor: "#FFFFFF", height: "100%" },

    header: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10
    },

    viewModeHeader: { padding: 5, width: 100 },

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