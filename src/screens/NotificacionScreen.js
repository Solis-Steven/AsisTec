import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity ,
    StyleSheet
} from 'react-native';
import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { ProgressBar } from 'react-native-paper';

import PushNotification from '../components/Notification/PushNotification';
import { calculatePercentage } from '../helpers/CalculatePercentage';


const NotificationScreen = () => {
    // TODO traer los items

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
                                {moment(item.date).format('ddd')}
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
                                    const {percentage, color, notification} = calculatePercentage(event.date);

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
                                                progress={percentage} 
                                                color={color}
                                                style={styles.progressBar}
                                            />

                                            {/* Display the name of the event */}
                                            <Text style={{fontSize: 15, marginBottom: 5}}>{event.name}</Text>

                                            <Text style={{fontSize: 12, color: "#5B83B0"}}>Ver mas</Text>

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