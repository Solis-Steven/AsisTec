import {
    Text, View,
    TouchableOpacity,
    StyleSheet
} from "react-native"
import React, { useState } from "react";

import { Input } from "react-native-elements";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";

const CourseModal = ({
    changeModalVisible, 
    setActivityType, 
    activityTypeValues, 
    activityType,
    modalityValues,
    modalityType,
    setModalityType,
    WIDTH,
    HEIGHT,
    DAYS_OF_WEEK
}) => {
    // Define state variables with their initial values
    const [courseName, setCourseName] = useState("");
    const [professorName, setProfessorName] = useState("");
    const [classroom, setClassroom] = useState("");

    // state for TimePicker component
    const [initialHour, setInitialHour] = useState(new Date());
    const [finalHour, setFinalHour] = useState(new Date());
    const [initialHourText, setInitialHourText] = useState("Seleccionar hora");
    const [finalHourText, setFinalHourText] = useState("Seleccionar hora");
    const [showInitialHour, setShowInitialHour] = useState(false);
    const [showFinalHour, setShowFinalHour] = useState(false);

    const [selectedDays, setSelectedDays] = useState([]);

    // handler for initial hour change
    const onInitialHourChange = (event, selectedHour) => {
        setShowInitialHour(false);
        const currentHour = selectedHour || initialHour;
        const formatedHour = moment(selectedHour || initialHour).format("hh:mm a");
        setInitialHour(currentHour);
        setInitialHourText(formatedHour);
    };

    // handler for final hour change
    const onFinalHourChange = (event, selectedHour) => {
        setShowFinalHour(false);
        const currentHour = selectedHour || finalHour;
        const formatedHour = moment(selectedHour || finalHour).format("hh:mm a");
        setFinalHour(currentHour);
        setFinalHourText(formatedHour);
    };

    // handler to show the initial datepicker
    const showInitialDatepicker = () => {
        setShowInitialHour(true);
    };

    // handler to show the final datepicker
    const showFinalDatepicker = () => {
        setShowFinalHour(true);
    };

    // handler for selected days
    const handleDaysSelected = (index) => {
        const updatedDays = [...DAYS_OF_WEEK];
        updatedDays[index].selected = !updatedDays[index].selected;

        setSelectedDays(updatedDays.filter((day) => day.selected));
    };

    const onCreateCourse = () => {
        if([courseName, professorName, classroom,
        initialHour, finalHour].includes("")
        || selectedDays.length === 0) {
            alert("Por favor llena todos los espacios");
            return;
        }

    }

    return (
        // Modal
        <TouchableOpacity 
            disabled={true}
            style={styles.container}>
            
            {/* Modal content */}
            <View style={{...styles.modal, height: HEIGHT, width: WIDTH,}}>
                
                {/* Modal header */}
                <View style={styles.modalHeader}>

                    {/* Close modal button */}
                    <TouchableOpacity
                        onPress={changeModalVisible}
                        style={styles.closeModal}
                    >
                        <Icon name="close" size={30} color="white" style={{}} />
                    </TouchableOpacity>
  
                    {/* Activity type select */}
                    <SelectList
                        data={activityTypeValues}
                        setSelected={setActivityType}
                        dropdownStyles={{
                          width: "90%",
                          backgroundColor: "#F6F6F6",
                          borderWidth: 0,
                        }}
                        inputStyles={{ 
                            fontSize: 22, 
                            textAlign: "left",
                            color: "#FFFFFF",
                        }}
                        placeholder={activityType}
                        search={false}
                        boxStyles={{  
                            borderWidth: 0, 
                            width: "80%"
                        }}
                        defaultOption={{ key: 1, value: "Agregar Curso" }}
                        maxHeight={150} />

                    {/* Course name input */}
                    <Text style={styles.text}>Nombre</Text>
                    <Input
                        value={courseName}
                        onChange={(event) => setCourseName(event.nativeEvent.text)}
                        type="text"
                        placeholder="Nombre del curso" 
                        placeholderTextColor={"white"}
                        inputContainerStyle={{borderBottomWidth:0}} 
                        style={styles.courseNameInput} />
                </View>

                {/* Modal body */}
                <View style={styles.modalBody}>

                    {/* Teacher name input */}
                    <Text style={styles.text}>Profesor/a</Text>
                    <Input
                        value={professorName}
                        onChange={(event) => setProfessorName(event.nativeEvent.text)}
                        type="text"
                        placeholder="Nombre del profesor/a" 
                        placeholderTextColor={"black"}
                        inputContainerStyle={{borderBottomWidth:0}} 
                        style={styles.bodyInputs} />

                    {/* Classroom input */}
                    <Text style={styles.text}>Aula</Text>
                    <Input
                        value={classroom}
                        onChange={(event) => setClassroom(event.nativeEvent.text)}
                        type="text"
                        placeholder="Numero del aula" 
                        placeholderTextColor={"black"}
                        inputContainerStyle={{borderBottomWidth:0}} 
                        style={styles.bodyInputs} />

                    {/* Modality select */}
                    <Text style={styles.text}>Modalidad</Text>
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

                    {/* Start and end times */}
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flex: 1 }}>

                            {/* Start time */}
                            <Text style={styles.selectHourText}>Inicio</Text>
                            <TouchableOpacity
                                onPress={showInitialDatepicker}
                                style={styles.selectHour}
                            >
                                <Text style={{ fontSize: 16 }}>{initialHourText}</Text>
                            </TouchableOpacity>

                            {/* Initial hour picker */}
                            {
                                showInitialHour && (
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
                        <View style={{ flex: 1 }}>

                            {/* End time */}
                            <Text style={styles.selectHourText}>Fin</Text>
                            <TouchableOpacity
                                onPress={showFinalDatepicker}
                                style={styles.selectHour}
                            >
                                <Text style={{ fontSize: 16 }}>{finalHourText}</Text>
                            </TouchableOpacity>

                            {/* Final hour picker */}
                            {
                                showFinalHour && (
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

                    {/* Select days */}
                    <Text style={{...styles.text, marginTop: 20}}>Día/s</Text>
                    <View style={styles.selectDaysContainer}>

                        {
                            DAYS_OF_WEEK.map((day, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    onPress={() => handleDaysSelected(index)}
                                    style={{...styles.selectDay, borderColor: day.selected ? "#8FC1A9": "#000000"}}>
                                    <Text style={{padding: 2}}>{day.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        
                    </View>

                    {/* Create button */}
                    <TouchableOpacity
                        onPress={changeModalVisible}
                        style={styles.createButton}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
    },

    modal: {
        paddingTop: 0,
        backgroundColor:"white",
        borderRadius: 24
    },

    modalHeader: {
        alignItems: "flex-start",
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: "#769ECB",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },

    closeModal: {
        position: "absolute",
        top: 10,
        right: 10,
    },

    text: {
        marginStart: 9,
        fontSize: 12,
        fontWeight: "bold",
        opacity: 0.4
    },

    courseNameInput: {
        color:"white",
        borderBottomWidth: 2,
        borderBottomColor: "#00000066",
    },

    modalBody: {
        width: "100%",
        flexDirection: "column",
        padding: 15,
        flex: 1
    },

    bodyInputs: {
        color:"white",
        borderBottomWidth: 2,
        borderBottomColor: "#00000066",
    },

    selectHourText: {
        margin: 5,
        fontSize: 12,
        fontWeight: "bold",
        opacity: 0.4,
    },

    selectHour: {
        width: "90%",
        borderBottomWidth: 1,
        borderColor: "#00000066",
        marginLeft: 5,
    },

    selectDaysContainer: {
        flexDirection: "row", 
        flexWrap: "wrap",
        gap: 5,
        justifyContent: "space-evenly",
        alignItems: "center",
        marginHorizontal: 5,
        marginTop: 10,
    },

    selectDay: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    createButton: {
        backgroundColor: "#769ECB",
        margin: 5,
        padding: 15,
        borderRadius: 20,
        width: "40%",
        alignItems: "center",
        position: "absolute",
        bottom: 15,
        right: 15,
    }
})

export default CourseModal;