import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity ,
    StyleSheet
} from 'react-native';
import React, { useState } from 'react';

import moment from 'moment';
import { ProgressBar } from 'react-native-paper';

import PushNotification from '../components/Notification/PushNotification';
import { calculatePercentage } from '../helpers/CalculatePercentage';

// Map of abbreviated weekday names in English to their Spanish equivalents
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
    // Initial state for the list of events
    const [items, setItems] = useState({
        "2023-04-06": [
        { name: "Admin Meeting", initialHour: "10:00 AM", finalHour: "11:00 AM", date: "2023-04-06" },
        { name: "Hospital Appointment", initialHour: "1:00 PM", finalHour: "5:00 PM", date: "2023-04-06" }
        ],
        "2023-04-07": [{ name: "Work on Design", initialHour: "9:00 AM", finalHour: "6:00 PM", date: "2023-04-07" }],
        "2023-04-15": [{ name: "Compilers Progress", initialHour: "1:00 PM", finalHour: "2:00 PM", date: "2023-04-15" }],
        "2023-04-28": [{ name: "Admin Progress", initialHour: "7:00 PM", finalHour: "8:00 PM", date: "2023-04-28" }]
    });

    // Convert the object of events into an array of {date, events} objects
    const events = Object.entries(items).map(([date, events]) => ({
        date,
        events
    }));

    return (
        <View style={{backgroundColor: "#FFFFFF", height: "100%"}}>
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <View style={styles.listContainer}>

                        <View>
                            {/* Display the abbreviated weekday name in Spanish */}
                            <Text style={styles.dayText}>
                                {spanishWeekDays[moment(item.date).format('ddd')]}
                            </Text>

                            {/* Display the day of the month */}
                            <View style={styles.dayNumber}>
                                <Text style={{
                                    textAlign: "center",
                                    fontSize: 20,
                                    color: "white"
                                }}>
                                    {moment(item.date).date()}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.NotificationContainer}>
                            {
                                item.events.map((event, index) => {
                                    // Calculate the percentage of the day that has elapsed since the start of the event
                                    const info = calculatePercentage(event.date);

                                    return (
                                        <TouchableOpacity 
                                            key={index}
                                            style={{
                                                marginVertical: 5,
                                                width: "70%"
                                            }}
                                        >
                                            {/* Display a progress bar showing the percentage of the day that has elapsed */}
                                            <ProgressBar 
                                                progress={info.percentage} 
                                                color={info.color}
                                                style={styles.progressBar}
                                            />

                                            {/* Display the name of the event */}
                                            <Text style={{fontSize: 15, marginBottom: 5}}>{event.name}</Text>

                                            <Text style={{fontSize: 12, color: "#5B83B0"}}>Ver mas</Text>

                                            <PushNotification body={event.name} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        
                </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: "row"
    },

    dayText: {
        fontSize: 15, 
        textAlign: "center",
        color: "#8FC1A9"
    },

    dayNumber: {
        backgroundColor: "#8FC1A9",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",                    
    },

    NotificationContainer: {
        gap: 10,
        marginLeft: 10,
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1,
    },

    progressBar: { 
        height: 10,
        borderRadius: 10,
        backgroundColor: "#F3F3F3",
        marginBottom: 5
    }
})

export default NotificationScreen;