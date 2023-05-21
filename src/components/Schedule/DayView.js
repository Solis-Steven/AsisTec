import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'

const DayView = ({ event }) => {
    return (
        event.type == "Actividad" ? (
            <View style={styles.container}>

                {/* Titulo */}
                <Text style={styles.tittle}> {event.title}</Text>

                {/* Descripcion */}
                <Text style={styles.datos}>{event.description}</Text>

                {/* Modalidad */}
                <Text style={styles.datos}> {event.modalityType}</Text>
            </View>
        ) : (
            <View style={styles.container}>

                {/* Titulo */}
                <Text style={styles.tittle}> {event.title}</Text>

                {/* Profesor */}
                <Text style={styles.datos}> {event.professorName}</Text>

                {/* Lugar */}
                <Text style={styles.datos}> {event.location}</Text>

                {/* Modalidad */}
                <Text style={styles.datos}> {event.modalityType}</Text>
            </View>
        )
    )
}

export default DayView

styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    tittle: {
        fontSize: 30,
        textAlign: "center",
        color: "#5B83B0",
        fontWeight: "bold",
        top: -40,
    },
    datos: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        margin : 10,
    },
});