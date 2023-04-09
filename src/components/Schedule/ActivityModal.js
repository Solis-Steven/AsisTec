import React from "react";
import { useState } from "react";
import {
    Text, View,
    TouchableOpacity, Dimensions,
    TextInput
} from "react-native"
import { Input } from "react-native-elements";

const WIDTH = Dimensions.get("window").width - 80;
const HEIGHT = Dimensions.get("window").height - 150;

const ActivityModal = ({changeModalVisible}) => {
    const [title, setTitle] = useState("");

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
                        backgroundColor: "#769ECB",
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                    }}>
  
                    <Text
                        style={{
                            margin: 5,
                            marginStart: 9,
                            fontSize: 26,
                            fontWeight: "bold",
                            color: "white"
                        }}>
                            Agregar Actividad
                    </Text>

                    <Text 
                        style={{
                            margin: 5,
                            marginStart: 9,
                            fontSize: 12,
                            fontWeight: "bold",
                            opacity: 0.4
                        }}>
                            Nombre
                    </Text>

                    <Input
                        value={title}
                        onChange={(event) => setTitle(event.nativeEvent.text)}
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

                    <Input
                        value={title}
                        onChange={(event) => setTitle(event.nativeEvent.text)}
                        type="text"
                        placeholder="Presencial/Virtual/Semipresencial" 
                        placeholderTextColor={"black"}
                        inputContainerStyle={{borderBottomWidth:0}} 
                        style={{
                            color:"white",
                            borderBottomWidth: 2,
                            borderBottomColor: "#00000066",
                    }} />

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

                </View>
            </View>

        </TouchableOpacity>
    )

}

export default ActivityModal;