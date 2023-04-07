import React from "react";
import { useState } from "react";
import {
    Text, View,
    TouchableOpacity, Dimensions,
    TextInput
} from "react-native"
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const WIDTH = Dimensions.get("window").width - 80;
const HEIGHT = Dimensions.get("window").height - 150;

const EventModal = ({changeModalVisible, daySelected}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [initialHour, setInitialHour] = useState(new Date());
    const [initialHourText, setInitialHourText] = useState("Seleccionar hora");
    const [finalHour, setFinalHour] = useState(new Date());
    const [finalHourText, setFinalHourText] = useState("Seleccionar hora");
    const [showPicker, setShowPicker] = useState(false);

    const onInitialHourChange = (event, selectedHour) => {
        const currentHour = selectedHour || initialHour
        const formatedHour = moment(selectedHour || initialHour).format('hh:mm a');
        setShowPicker(Platform.OS === 'ios');
        setInitialHour(currentHour);
        setInitialHourText(formatedHour);
    };

    const onFinalHourChange = (event, selectedHour) => {
        const currentHour = selectedHour || finalHour
        const formatedHour = moment(selectedHour || finalHour).format('hh:mm a');
        setShowPicker(Platform.OS === 'ios');
        setFinalHour(currentHour);
        setFinalHourText(formatedHour);
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const handleTimePicker = () => {
        setTimePickerVisibility(!isTimePickerVisible);
      };
      

    const closeModal = () => {
        changeModalVisible()
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
                        padding: 10,
                        backgroundColor: "#8FC1A9",
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        position: "relative"
                    }}>
                        <TouchableOpacity 
                            onPress={closeModal}
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 10
                            }}>
                            <Icon
                                name="close"
                                size={30}
                                color="white"
                                style={{ 
                                    
                                }}
                            />
                        </TouchableOpacity>

                        <Text 
                            style={{
                                margin: 5,
                                fontSize: 12,
                                fontWeight: "bold",
                                opacity: 0.4
                            }}>
                                {daySelected}
                        </Text>
  
                        <Text
                            style={{
                                margin: 5,
                                marginStart: 9,
                                fontSize: 26,
                                fontWeight: "bold",
                                color: "white"
                            }}>
                                Crear Evento
                        </Text>

                        <Text 
                            style={{
                                margin: 5,
                                marginStart: 9,
                                fontSize: 12,
                                fontWeight: "bold",
                                opacity: 0.4
                            }}>
                                Titulo
                        </Text>

                        <Input
                            value={title}
                            onChange={(event) => setTitle(event.nativeEvent.text)}
                            type="text"
                            placeholder="Titulo del Evento" 
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
                        margin: 5,
                        fontSize: 12,
                        fontWeight: "bold",
                        opacity: 0.4
                        }}>
                        Descripcion
                    </Text>

                    <TextInput
                        multiline
                        numberOfLines={4}
                        onChangeText={setDescription}
                        value={description}
                        style={{
                        borderWidth: 1,
                        borderColor: "#00000066",
                        borderRadius: 5,
                        margin: 5,
                        padding: 8,
                        textAlignVertical: "top"
                        }}
                    />

                    <View style={{flexDirection: "row", marginTop: 10}}>
                        <View style={{flex: 1}}>
                            <Text style={{margin: 5, fontSize: 12, fontWeight: "bold", opacity: 0.4}}>
                            Inicio
                            </Text>

                            <TouchableOpacity 
                                onPress={showDatepicker}
                                style={{
                                width: "90%",
                                borderBottomWidth: 1,
                                borderColor: "#00000066",
                                marginLeft: 5
                                }}>
                                <Text style={{fontSize: 16}}>{initialHourText}</Text>
                            </TouchableOpacity>
                            {
                                showPicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={initialHour}
                                        mode="time"
                                        is24Hour={false}
                                        display="default"
                                        onChange={onInitialHourChange}
                                    />
                                )
                            }
                        </View>

                        <View style={{flex: 1}}>
                            <Text style={{margin: 5, fontSize: 12, fontWeight: "bold", opacity: 0.4}}>
                            Fin
                            </Text>

                            <TouchableOpacity 
                                onPress={showDatepicker}
                                style={{
                                width: "90%",
                                borderBottomWidth: 1,
                                borderColor: "#00000066",
                                marginLeft: 5
                                }}>
                                <Text style={{fontSize: 16}}>{finalHourText}</Text>
                            </TouchableOpacity>
                            {
                                showPicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={finalHour}
                                        mode="time"
                                        is24Hour={false}
                                        display="default"
                                        onChange={onFinalHourChange}
                                    />
                                )
                            }
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={closeModal}
                        style={{
                        backgroundColor: "#8FC1A9",
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

                </View>
            </View>

        </TouchableOpacity>
    )

}

export default EventModal;