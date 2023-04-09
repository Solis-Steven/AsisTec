import React from "react";
import { 
  View, 
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { ProgressBar } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from 'moment';
import { useState } from "react";
import { useEffect } from "react";

const spanishWeekDays = {
    "Sun": "Dom",
    "Mon": "Lun",
    "Tue": "Mar",
    "Wed": "Mié",
    "Thu": "Jue",
    "Fri": "Vie",
    "Sat": "Sáb"
}
    
const EventItem = ({itemInfo, selectedDayEvents}) => {
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState("#64B149");
    
    const currentDate = new Date(moment().format('YYYY-MM-DD'));
    const calculatePercentage = () => {
        let days = Math.round((new Date(itemInfo.date) - currentDate) / (1000 * 60 * 60 * 24));

        console.log("Desde el item", itemInfo, days);
        if(days <= 0) {
            setProgress(1);
            setColor("#F10B0B");
            return
        }
        if(days > 21) {
            days = 21;
        }

        const percentageChange = Math.abs( 1 - ((days / 20)).toFixed(2) );
        setProgress(parseFloat(percentageChange));
        if(percentageChange > 0.75) {
            setColor("#F10B0B");
            return;
        }
        if(percentageChange > 0.25 && percentageChange <= 0.5) {
            setColor("#E3D447");
            return;
        }
        if(percentageChange <= 0.75 && percentageChange > 0.5) {
            setColor("#EC7752");
            return;
        }
        setColor("#64B149");
    }

    useEffect(() => {
        calculatePercentage()
    }, [])

    const day = moment(selectedDayEvents).format('ddd')

    return (
        <>
            <View style={{
                paddingHorizontal: 20, 
                marginHorizontal: 5,
                marginVertical: 20,
                borderRadius: 10, 
                flexDirection: "row", 
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <View>
                        <Text style={{
                            fontSize: 15, 
                            textAlign: "center",
                            color: "#8FC1A9"
                        }}>
                            {spanishWeekDays[day]}
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
                                {moment(selectedDayEvents).date()}
                            </Text>
                        </View>
        
                    </View>

                    <View style={{
                        flex: 1,
                        marginLeft: 20,
                        gap: 10,
                        justifyContent: "center"
                    }}>
                        <ProgressBar 
                            progress={progress} 
                            color={color}
                            style={{ 
                                height: 10,
                                borderRadius: 10,
                                maxWidth: "80%"
                        }} 
                        />
                        <Text style={{fontWeight: "600", fontSize: 15, alignSelf: "flex-start"}}>{itemInfo.name}</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <Ionicons 
                        name="pencil" size={30} 
                        color="black"/>
                </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 20}}>
                <View style={{marginVertical: 10, gap: 5}}>
                    <Text>Hora inicial: {itemInfo.initialHour}</Text>
                    <Text>Hora final: {itemInfo.finalHour}</Text>
                </View>
                        <Text style={{color: "#5B83B0", marginTop: 10, marginBottom: 3}}>Descripcion</Text>
                        <TextInput
                            editable={false}
                            multiline
                            numberOfLines={4}
                            value="Prueba"
                            style={{
                                borderColor: "#00000066",
                                borderRadius: 5,
                                padding: 8,
                                textAlignVertical: "top",
                                backgroundColor: "#FAF3DD"
                        }}
                        />
            </View>
        </>
    );
  };
export default EventItem;
  