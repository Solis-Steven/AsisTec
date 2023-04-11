import React, { useEffect, useState } from "react";
import { 
  View, 
  Text,
  TouchableOpacity
} from "react-native";
import { ProgressBar } from 'react-native-paper';
import moment from 'moment';
    
const EventListItem = ({item}) => {
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState("#64B149");
    
    const currentDate = new Date(moment().format('YYYY-MM-DD'));
    const calculatePercentage = () => {
        let days = Math.round((new Date(item.date) - currentDate) / (1000 * 60 * 60 * 24));

        console.log("Desde la lista", item.name, days);
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

    return (
        <View style={{ 
            backgroundColor: "#FAF3DD", 
            padding: 20, 
            margin: 10,
            borderRadius: 10, 
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5
        }}>
            <View style={{
            flex: 1,
            gap: 10
            }}>
                <ProgressBar 
                    progress={progress} 
                    color={color}
                    style={{ 
                    height: 10,
                    borderRadius: 10
                    }} />
                <Text style={{fontSize: 15}}>{item.name}</Text>
            </View>
            <Text style={{
                flex: 1, 
                textAlign: "center",
                fontSize: 13
                }}>
                {item.initialHourText} - {item.finalHourText}
            </Text>
        </View>
    )
};
export default EventListItem;
