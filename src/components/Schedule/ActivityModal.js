import React from "react";
import { useState } from "react";
import {
    Text, View,
    TouchableOpacity, Dimensions,
    TextInput
} from "react-native"
import { Input } from "react-native-elements";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width - 80;
const HEIGHT = Dimensions.get("window").height - 150;
const DAYS_OF_WEEK = [
    { name: 'LUN', selected: false },
    { name: 'MAR', selected: false },
    { name: 'MIÉ', selected: false },
    { name: 'JUE', selected: false },
    { name: 'VIE', selected: false },
    { name: 'SÁB', selected: false },
    { name: 'DOM', selected: false }
];

const ActivityModal = ({
    changeModalVisible, 
    setActivityType, 
    activityTypeValues, 
    activityType,
    modalityValues,
    modalityType,
    setModalityType
}) => {
    const [activityName, setActivityName] = useState("");
    const [initialHour, setInitialHour] = useState(new Date());
    const [finalHour, setFinalHour] = useState(new Date());
    const [initialHourText, setInitialHourText] = useState("Seleccionar hora");
    const [finalHourText, setFinalHourText] = useState("Seleccionar hora");
    const [showInitialHour, setShowInitialHour] = useState(false);
    const [showFinalHour, setShowFinalHour] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);

    const onInitialHourChange = (event, selectedHour) => {
        setShowInitialHour(false);
        const currentHour = selectedHour || initialHour;
        const formatedHour = moment(selectedHour || initialHour).format("hh:mm a");
        setInitialHour(currentHour);
        setInitialHourText(formatedHour);
      };
    
      const onFinalHourChange = (event, selectedHour) => {
        setShowFinalHour(false);
        const currentHour = selectedHour || finalHour;
        const formatedHour = moment(selectedHour || finalHour).format("hh:mm a");
        setFinalHour(currentHour);
        setFinalHourText(formatedHour);
      };
    
      const showInitialDatepicker = () => {
        setShowInitialHour(true);
      };
      const showFinalDatepicker = () => {
        setShowFinalHour(true);
      };

    const closeModal = () => {
        changeModalVisible()
    }

    const handleDaysSelected = (index) => {
        const updatedDays = [...DAYS_OF_WEEK];
        updatedDays[index].selected = !updatedDays[index].selected;

        setSelectedDays(updatedDays.filter((day) => day.selected));
    }

    return (
        <TouchableOpacity 
            disabled={true}
            style={{
                flex: 1,
                alignItems:"center",
                justifyContent:"center"
            }}>

            <View style={{
                height: HEIGHT,
                width: WIDTH,
                paddingTop: 0,
                backgroundColor:"white",
                borderRadius: 24
            }}>
                <View
                    style={{
                        alignItems: "flex-start",
                        paddingHorizontal: 10,
                        paddingTop: 10,
                        backgroundColor: "#769ECB",
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                    }}>

                    <TouchableOpacity
                        onPress={closeModal}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }}
                    >
                        <Icon name="close" size={30} color="white" style={{}} />
                    </TouchableOpacity>
  
                    <SelectList
                        data={activityTypeValues}
                        setSelected={setActivityType}
                        dropdownStyles={{
                          width: "100%",
                          backgroundColor: "#F6F6F6",
                          borderWidth: 0
                        }}
                        inputStyles={{ 
                            fontSize: 22, 
                            textAlign: "left",
                            color: "#FFFFFF"
                        }}
                        placeholder={activityType}
                        search={false}
                        boxStyles={{  
                            borderWidth: 0, 
                            width: "80%",
                            fontSize: 26,
                        }}
                        defaultOption={{ key: 2, value: "Agregar Actividad" }}
                        maxHeight={150} />

                    <Text 
                        style={{
                            marginHorizontal: 5,
                            marginStart: 9,
                            fontSize: 12,
                            fontWeight: "bold",
                            opacity: 0.4
                        }}>
                            Nombre
                    </Text>

                    <Input
                        value={activityName}
                        onChange={(event) => setActivityName(event.nativeEvent.text)}
                        type="text"
                        placeholder="Nombre de la actividad" 
                        placeholderTextColor={"white"}
                        inputContainerStyle={{borderBottomWidth:0}} 
                        style={{
                            color:"white",
                            borderBottomWidth: 2,
                            borderBottomColor: "#00000066",
                        }} />
                </View>

                <View
                    style={{
                        width: "100%",
                        flexDirection: "column",
                        padding: 15,
                        flex: 1
                    }}>

                    <Text 
                        style={{
                            marginStart: 9,
                            fontSize: 12,
                            fontWeight: "bold",
                            opacity: 0.4
                        }}>
                            Modalidad
                    </Text>

                    <SelectList
                        data={modalityValues}
                        setSelected={setModalityType}
                        dropdownStyles={{
                          width: "100%",
                          backgroundColor: "#F6F6F6",
                          borderWidth: 0
                        }}
                        inputStyles={{ 
                            fontSize: 18, 
                            textAlign: "left",
                            color: "#000000"
                        }}
                        placeholder={modalityType}
                        search={false}
                        boxStyles={{  
                            borderWidth: 0, 
                            width: "90%",
                            fontSize: 26,
                        }}
                        defaultOption={{ key: 1, value: "Presencial" }}
                        maxHeight={150} />

                    <TouchableOpacity
                        onPress={closeModal}
                        style={{
                        backgroundColor: "#769ECB",
                        margin: 5,
                        padding: 15,
                        borderRadius: 20,
                        width: "40%",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 15,
                        right: 15,
                        }}>
                        <Text 
                        style={{
                            color: "white",
                            fontSize: 22,
                            fontWeight: "bold",
                        }}>
                        Crear
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flex: 1 }}>
                        <Text
                            style={{
                            margin: 5,
                            fontSize: 12,
                            fontWeight: "bold",
                            opacity: 0.4,
                            }}
                        >
                            Inicio
                        </Text>

                        <TouchableOpacity
                            onPress={showInitialDatepicker}
                            style={{
                            width: "90%",
                            borderBottomWidth: 1,
                            borderColor: "#00000066",
                            marginLeft: 5,
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>{initialHourText}</Text>
                        </TouchableOpacity>
                        {showInitialHour && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={initialHour}
                            mode="time"
                            is24Hour={false}
                            display="default"
                            onChange={onInitialHourChange}
                            />
                        )}
                        </View>

                        <View style={{ flex: 1 }}>
                        <Text
                            style={{
                            margin: 5,
                            fontSize: 12,
                            fontWeight: "bold",
                            opacity: 0.4,
                            }}
                        >
                            Fin
                        </Text>

                        <TouchableOpacity
                            onPress={showFinalDatepicker}
                            style={{
                            width: "90%",
                            borderBottomWidth: 1,
                            borderColor: "#00000066",
                            marginLeft: 5,
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>{finalHourText}</Text>
                        </TouchableOpacity>
                        {showFinalHour && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={finalHour}
                            mode="time"
                            is24Hour={false}
                            display="default"
                            onChange={onFinalHourChange}
                            />
                        )}
                        </View>

                    </View>

                    <Text 
                            style={{
                                marginStart: 9,
                                fontSize: 12,
                                fontWeight: "bold",
                                opacity: 0.4,
                                marginTop: 20
                            }}>
                                Día/s
                        </Text>

                        <View style={{
                            flexDirection: "row", 
                            flexWrap: "wrap",
                            gap: 5,
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            marginHorizontal: 5,
                            marginTop: 10,
                        }}>

                            {
                                DAYS_OF_WEEK.map((day, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        onPress={() => handleDaysSelected(index)}
                                        style={{
                                        borderWidth: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderColor: day.selected ? "#8FC1A9": "#000000"
                                    }}>
                                        <Text style={{
                                        padding: 2,
                                        }}>
                                        {day.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        
                        </View>
                </View>
            </View>

        </TouchableOpacity>
    )

}

export default ActivityModal;