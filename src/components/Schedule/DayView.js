import React from 'react'
import { View, Text } from 'react-native'

const DayView = ({event}) => {
  return (
    <View style={{
      flex: 1, 
      alignItems: "stretch",
      justifyContent: "center",
      flexDirection: "row",
      padding: 5,
      flexWrap: "wrap",
      gap: 5
  }}>
      <Text style={{
          fontSize: 20, 
          maxWidth: "50%", 
          textAlign: "center",
          color: "#5B83B0",
          alignSelf: "flex-end",
            fontWeight: "bold"
      }}>
          {event.title}
      </Text>

      <View style={{alignItems: "center", justifyContent: "center"}}>
          <Text style={{ textAlign: "center"}}>
              {event.type == "Actividad" ? event.description: event.professorName}
          </Text>
          <Text style={{textAlign: "center"}}>
              {event.modalityType}
          </Text>
          <Text style={{textAlign: "center"}}>
              {event.type == "Actividad" ? null: event.location}
          </Text>
      </View>
  </View>
  )
}

export default DayView