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
          alignSelf: "flex-end"
      }}>
          {event.title}
      </Text>

      <View style={{alignItems: "center", justifyContent: "center"}}>
          <Text style={{opacity:0.5, textAlign: "center"}}>
              {event.description}
          </Text>
          <Text style={{textAlign: "center"}}>
              {event.location}
          </Text>
      </View>
  </View>
  )
}

export default DayView