import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import { Input } from "react-native-elements";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";

import { HandlerEditOneActivity } from "./HandlerEditOneActivity";
import { useEffect } from "react";
import { set } from "date-fns";

const EditActivityModal = ({
  event,
  changeOpenEditModal,
  modalityValues,
  modalityType,
  setModalityType,
  WIDTH,
  HEIGHT,
  DAYS_OF_WEEK,
  listaComponents,
  setListaComponents,
  openEditModal,
  setTypeExitMessage,
  editRelationComponent,
}) => {
  // Define state variables with their initial values
  const [activityName, setActivityName] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  // state for TimePicker component
  const [initialHour, setInitialHour] = useState(new Date(event.start));
  const [finalHour, setFinalHour] = useState(new Date(event.end));
  const [initialDate, setInitialDate] = useState(new Date(event.start));
  const [finalDate, setFinalDate] = useState(new Date(event.end));

  const [initialHourText, setInitialHourText] = useState(
    moment(event.start).format("hh:mm a")
  );
  const [finalHourText, setFinalHourText] = useState(
    moment(event.end).format("hh:mm a")
  );
  //fechas
  const [initialDateText, setInitialDateText] = useState(
    moment(event.start).format("YYYY-MM-DD")
  );
  const [finalDateText, setFinalDateText] = useState(
    moment(event.end).format("YYYY-MM-DD")
  );
  const [showInitialHour, setShowInitialHour] = useState(false);
  const [showFinalHour, setShowFinalHour] = useState(false);
  //fechas
  const [showInitialDate, setShowInitialDate] = useState(false);
  const [showFinalDate, setShowFinalDate] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);
  const [Days, setDays] = useState([event.day]);
  const selectDays = [];

  // Function that handles the change of the initial hour
  const onInitialHourChange = (event, selectedHour) => {
    setShowInitialHour(false);
    // Get the current selected hour or the initial hour if none is selected
    const currentHour = selectedHour || initialHour;
    // Format the selected hour to a string
    const formattedHour = moment(selectedHour || initialHour).format("hh:mm a");
    // Update the initial hour state variable and the initial hour text variable
    setInitialHour(currentHour);
    setInitialHourText(formattedHour);
  };

  // Function that handles the change of the final hour
  const onFinalHourChange = (event, selectedHour) => {
    setShowFinalHour(false);
    // Get the current selected hour or the final hour if none is selected
    const currentHour = selectedHour || finalHour;
    // Format the selected hour to a string
    const formattedHour = moment(selectedHour || finalHour).format("hh:mm a");
    // Update the final hour state variable and the final hour text variable
    setFinalHour(currentHour);
    setFinalHourText(formattedHour);
  };

  // handler to show the initial datepicker
  const showInitialHourpicker = () => {
    setShowInitialHour(true);
  };

  // handler to show the final datepicker
  const showFinalHourpicker = () => {
    setShowFinalHour(true);
  };

  // handler to show the initial datepicker
  const showInitialDatepicker = () => {
    setShowInitialDate(true);
  };

  // handler to show the final datepicker
  const showFinalDatepicker = () => {
    setShowFinalDate(true);
  };
  // handler for initial Date change
  const onInitialDateChange = (event, selectedDate) => {
    setShowInitialDate(false);
    const currentDate = selectedDate || initialDate;
    const formatedDate = moment(selectedDate || initialDate).format(
      "YYYY-MM-DD"
    );
    if (editRelationComponent == false) {
      setFinalDate(currentDate);
      setFinalDateText(formatedDate);
    }
    setInitialDate(currentDate);
    setInitialDateText(formatedDate);
  };

  // handler for final Date change
  const onFinalDateChange = (event, selectedDate) => {
    setShowFinalDate(false);
    const currentDate = selectedDate || finalDate;
    const formatedDate = moment(selectedDate || finalDate).format("YYYY-MM-DD");
    if (editRelationComponent == false) {
      setInitialDate(currentDate)
      setInitialDateText(formatedDate);
    }
    setFinalDate(currentDate);
    setFinalDateText(formatedDate);
  };
  // Function that closes the modal
  const OnCreateActivity = () => {
    //cambiar por onCreateActivity
    changeOpenEditModal();
    setTypeExitMessage(false);

    if (
      [
        activityName,
        description,
        initialHour,
        finalHour,
        initialDate,
        finalDate,
      ].includes("") ||
      Days.length === 0
    ) {
      alert("Por favor llena todos los espacios");
      return;
    } else if (finalDate < initialDate) {
      alert("La fecha final  inicia antes que la fecha inicial");
      return;
    } else if (finalHour < initialHour) {
      alert("La hora final  inicia antes que la hora inicial");
      return;
    } else {
      if (editRelationComponent == false) {
        setDays([]);
        var day = initialDate.getDay();
        if (day == 0) {
          day = 6;
        } else {
          day = day + 1;
        }
        setDays([day]);
      }
      HandlerEditOneActivity({
        event,
        initialDate,
        finalDate,
        activityName,
        modalityType,
        description,
        initialHour,
        finalHour,
        Days,
        listaComponents,
        setListaComponents,
      });
      setActivityName("");
      setDescription("");
      setInitialDateText("Seleccionar una fecha");
      setFinalDateText("Seleccionar una fecha");
      setInitialHourText("Seleccionar hora");
      setFinalHourText("Seleccionar hora");
      setSelectedDays([]);
      return;
    }
  };

  // Function that handles the selection of days
  const handleDaysSelected = (index) => {
    var indexPersonal = index;
    if (index == 6) {
      indexPersonal = 0;
    } else {
      indexPersonal = index + 1;
    }
    if (Days.includes(indexPersonal)) {
      const nuevaLista = Days.filter((item) => item !== indexPersonal);
      setDays(nuevaLista);
    } else {
      selectDays.push(indexPersonal);
      setDays(Days.concat(selectDays));
    }
    // Create a copy of the days of week array
    const updatedDays = [...DAYS_OF_WEEK];
    // Toggle the selected state of the selected day
    updatedDays[index].selected = !updatedDays[index].selected;
    // Update the selected days state variable with the selected days only
    setSelectedDays(updatedDays.filter((day) => day.selected));
  };

  const closeModal = () => {
    setTypeExitMessage(false);
    changeOpenEditModal();
  };

  const returnKey = () => {

    if (event.modalityType == "Presencial") {
      return 1;
    } else if (event.modalityType == "Virtual") {
      return 2;
    } else if (event.modalityType == "Semipresencial") {
      return 3;
    }

  }
  return (
    // Modal
    <TouchableOpacity
      disabled={true}
      style={{
        ...styles.container,
        backgroundColor: openEditModal ? "rgba(0,0,0,0.4)" : "transparent", // Cambia el fondo a oscuro cuando el modal está abierto
      }}
    >
      {/* Modal content */}
      <View style={{ ...styles.modal, height: HEIGHT, width: WIDTH }}>
        {/* Modal header */}
        <View style={styles.modalHeader}>
          {/* Close modal button */}
          <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
            <Icon name="close" size={30} color="white" style={{}} />
          </TouchableOpacity>

          {/* Activity name input */}
          <Text style={styles.text}>Nombre</Text>
          <Input
            value={activityName}
            onChange={(event) => setActivityName(event.nativeEvent.text)}
            type="text"
            placeholder={event.title}
            placeholderTextColor={"white"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.input}
          />
        </View>

        {/* Modal body */}
        <ScrollView style={styles.modalBody}>
          {/* Description Input*/}
          <Text style={styles.text}>Descripción</Text>
          <Input
            value={description}
            onChange={(event) => setDescription(event.nativeEvent.text)}
            type="text"
            placeholder={event.description}
            placeholderTextColor={"black"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.bodyInputs}
          />
          {/* Modality select */}
          <Text style={styles.bodyText}>Modalidad</Text>
          <SelectList
            data={modalityValues}
            setSelected={setModalityType}
            dropdownStyles={{
              width: "100%",
              backgroundColor: "#F6F6F6",
              borderWidth: 0,
            }}
            inputStyles={{
              fontSize: 18,
              textAlign: "left",
              color: "#000000",
            }}
            placeholder={event.modalityType}
            search={false}
            boxStyles={{
              borderWidth: 0,
              width: "90%",
              fontSize: 26,
            }}
            defaultOption={{ key: returnKey(), value: event.modalityType }}
            maxHeight={150}
          />
          {/* Start and end date */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              {/* Start date */}
              <Text style={styles.selectHourText}>Fecha inicio</Text>
              <TouchableOpacity
                onPress={showInitialDatepicker}
                style={styles.selectHour}
              >
                <Text style={{ fontSize: 16 }}>{initialDateText}</Text>
              </TouchableOpacity>

              {/* Initial date picker */}
              {showInitialDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={initialDate}
                  mode="date"
                  is24Hour={false}
                  display="default"
                  onChange={onInitialDateChange}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              {/* End date */}
              <Text style={styles.selectHourText}>Fecha final</Text>
              <TouchableOpacity
                onPress={showFinalDatepicker}
                style={styles.selectHour}
              >
                <Text style={{ fontSize: 16 }}>{finalDateText}</Text>
              </TouchableOpacity>

              {/* Final date picker */}
              {showFinalDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={finalDate}
                  mode="date"
                  is24Hour={false}
                  display="default"
                  onChange={onFinalDateChange}
                />
              )}
            </View>
          </View>
          {/* Start and end times */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              {/* Start time */}
              <Text style={styles.bodyText}>Hora Inicial</Text>
              <TouchableOpacity
                onPress={showInitialHourpicker}
                style={styles.selectHour}
              >
                <Text style={{ fontSize: 16 }}>{initialHourText}</Text>
              </TouchableOpacity>

              {/* Initial hour picker */}
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
              {/* End time */}
              <Text style={styles.bodyText}>Hora Final</Text>
              <TouchableOpacity
                onPress={showFinalHourpicker}
                style={styles.selectHour}
              >
                <Text style={{ fontSize: 16 }}>{finalHourText}</Text>
              </TouchableOpacity>

              {/* Final hour picker */}
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
          {/* Select days */}
          {editRelationComponent == true ? (
            <View>
              <Text style={{ ...styles.bodyText, marginTop: 20 }}>Día/s</Text>
              <View style={styles.selectDaysContainer}>
                {DAYS_OF_WEEK.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDaysSelected(index)}
                    style={{
                      ...styles.selectDay,
                      borderColor: (Days.includes(day.id)) ? day.selected = true : "",
                      borderColor: day.selected ? "#8FC1A9" : "#000000",
                    }}
                  >
                    <Text style={{ padding: 2 }}>{day.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            null
          )}


          {/* Create button */}
          <TouchableOpacity
            onPress={OnCreateActivity}
            style={styles.createButton}
          >
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Crear
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    paddingTop: 0,
    backgroundColor: "white",
    borderRadius: 24,
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
    opacity: 0.4,
  },

  input: {
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#00000066",
  },

  modalBody: {
    width: "100%",
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },
  bodyInputs: {
    color: "black",
    borderBottomWidth: 2,
    borderBottomColor: "#00000066",
  },
  bodyText: {
    marginStart: 9,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },
  selectHourText: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
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

  selectHour: {
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "#00000066",
    marginLeft: 5,
  },

  createButton: {
    backgroundColor: "#769ECB",
    margin: 5,
    marginBottom: 30,
    padding: 15,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
    //position: "absolute",
    bottom: -5,
    right: -160,
  },
});

export default EditActivityModal;
