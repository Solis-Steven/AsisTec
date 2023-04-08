import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity 
} from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import { ProgressBar } from 'react-native-paper';

const spanishWeekDays = {
    "Sun": "Dom",
    "Mon": "Lun",
    "Tue": "Mar",
    "Wed": "Mié",
    "Thu": "Jue",
    "Fri": "Vie",
    "Sat": "Sáb"
}

const NotificationScreen = () => {
    const [items, setItems] = useState({
        "2023-04-06": [
        { name: "Reunion de Admin", initialHour: "10:00 AM", finalHour: "11:00 AM", date: "2023-04-06" },
        { name: "Cita en el hospital", initialHour: "1:00 PM", finalHour: "5:00 PM", date: "2023-04-06" }
        ],
        "2023-04-07": [{ name: "Trabajar en diseno", initialHour: "9:00 AM", finalHour: "6:00 PM", date: "2023-04-07" }],
        "2023-04-15": [{ name: "Avance de compiladores", initialHour: "1:00 PM", finalHour: "2:00 PM", date: "2023-04-15" }],
        "2023-04-28": [{ name: "Avance de admin", initialHour: "7:00 PM", finalHour: "8:00 PM", date: "2023-04-28" }]
    });

    const currentDate = new Date(moment().format('YYYY-MM-DD'));
    const calculatePercentage = (date) => {
        let days = Math.round((new Date(date) - currentDate) / (1000 * 60 * 60 * 24));
    
        if (days <= 0) {
            return { percentage: 1, color: "#F10B0B" };
        }
        if (days >= 20) {
            days = 19;
        }
    
        const percentageChange = Math.abs(1 - ((days / 20)).toFixed(2));
        if (percentageChange > 0.75) {
            return { percentage: percentageChange, color: "#F10B0B" };
        }
        if (percentageChange > 0.25 && percentageChange <= 0.5) {
            return { percentage: percentageChange, color: "#E3D447" };
        }
        if (percentageChange <= 0.75 && percentageChange > 0.5) {
            return { percentage: percentageChange, color: "#EC7752" };
        }
        return { percentage: percentageChange, color: "#64B149" };
    }
    
    const events = Object.entries(items).map(([date, events]) => ({
        date,
        events
    }));

  return (
    <View style={{backgroundColor: "#FFFFFF", height: "100%"}}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
            <View style={{
                backgroundColor: '#FFFFFF',
                padding: 10,
                marginVertical: 5,
                borderRadius: 5,
                flexDirection: "row"
            }}>

                <View>

                    <Text style={{
                        fontSize: 15, 
                        textAlign: "center",
                        color: "#8FC1A9"
                    }}>
                        {spanishWeekDays[moment(item.date).format('ddd')]}
                    </Text>

                    <View style={{
                        backgroundColor: "#8FC1A9",
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",                    
                    }}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "white"
                        }}>
                            {moment(item.date).date()}
                        </Text>
                    </View>
                </View>

                <View style={{
                    gap: 10,
                    marginLeft: 10,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    flex: 1,
                }}>
                    {item.events.map((event, index) => {
                        const info = calculatePercentage(event.date);

                        return (
                            <TouchableOpacity 
                                key={index}
                                style={{
                                    marginVertical: 5,
                                    width: "70%"
                                }}>
                                <ProgressBar 
                                    progress={info.percentage} 
                                    color={info.color}
                                    style={{ 
                                        height: 10,
                                        borderRadius: 10,
                                        backgroundColor: "#F3F3F3",
                                        marginBottom: 5
                                }}/>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom: 5,
                                }}>
                                    {event.name}
                                </Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: "#5B83B0"
                                }}>
                                    Ver mas
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default NotificationScreen;
