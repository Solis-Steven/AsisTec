import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Switch,
} from "react-native";
import { Input} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {SelectList}  from "react-native-dropdown-select-list";

const WIDTH = Dimensions.get("window").width - 70;
const HEIGHT = Dimensions.get("window").height - 160;

const EventModal = ({ changeModalVisible, daySelected }) => {
  //States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //TimePicker
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [initialHour, setInitialHour] = useState(new Date());
  const [initialHourText, setInitialHourText] = useState("Seleccionar hora");
  const [finalHour, setFinalHour] = useState(new Date());
  const [finalHourText, setFinalHourText] = useState("Seleccionar hora");
  const [showPicker, setShowPicker] = useState(false);
  //DropDownPicker
  const [selectedReminder, setSelectedReminder] = useState("1 dia antes");
  //Switcher
  const [isAllDay, setIsAllDay] = useState(false);

  //Functions
  const onInitialHourChange = (event, selectedHour) => {
    setShowPicker(!showPicker);
    const currentHour = selectedHour || initialHour;
    const formatedHour = moment(selectedHour || initialHour).format("hh:mm a");
    setShowPicker(Platform.OS === "ios");
    setInitialHour(currentHour);
    setInitialHourText(formatedHour);
  };

  const onFinalHourChange = (event, selectedHour) => {
    setShowPicker(!showPicker);
    const currentHour = selectedHour || finalHour;
    const formatedHour = moment(selectedHour || finalHour).format("hh:mm a");
    setShowPicker(Platform.OS === "ios");
    setFinalHour(currentHour);
    setFinalHourText(formatedHour);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };



  const closeModal = () => {
    changeModalVisible();
  };


  //ReminderValues
  const reminderValues = [
    { key: 1, value: "5 minutos antes" },
    { key: 2, value: "30 minutos antes" },
    { key: 3, value: "1 dia antes" },
    { key: 4, value: "1 semana antes" },
  ];

  return (
    <TouchableOpacity
      disabled={true}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: HEIGHT,
          width: WIDTH,
          paddingTop: 0,
          backgroundColor: "white",
          borderRadius: 24,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            padding: 10,
            backgroundColor: "#8FC1A9",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={{
              position: "absolute",
              top: 5,
              right: 10,
            }}
          >
            <Icon name="close" size={30} color="white" style={{}} />
          </TouchableOpacity>

          <Text
            style={{
              margin: 5,
              fontSize: 12,
              fontWeight: "bold",
              opacity: 0.4,
            }}
          >
            {daySelected}
          </Text>

          <Text
            style={{
              margin: 5,
              marginStart: 9,
              fontSize: 26,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Crear Evento
          </Text>

          <Text
            style={{
              margin: 5,
              marginStart: 9,
              fontSize: 12,
              fontWeight: "bold",
              opacity: 0.4,
            }}
          >
            Titulo
          </Text>

          <Input
            value={title}
            onChange={(event) => setTitle(event.nativeEvent.text)}
            type="text"
            placeholder="Titulo del Evento"
            placeholderTextColor={"white"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{
              color: "white",
              borderBottomWidth: 2,
              borderBottomColor: "#00000066",
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "column",
            padding: 15,
            flex: 1,
          }}
        >
          <Text
            style={{
              margin: 5,
              fontSize: 12,
              fontWeight: "bold",
              opacity: 0.4,
            }}
          >
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
              textAlignVertical: "top",
            }}
          />

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
                onPress={showDatepicker}
                style={{
                  width: "90%",
                  borderBottomWidth: 1,
                  borderColor: "#00000066",
                  marginLeft: 5,
                }}
              >
                <Text style={{ fontSize: 16 }}>{initialHourText}</Text>
              </TouchableOpacity>
              {showPicker && (
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
                onPress={showDatepicker}
                style={{
                  width: "90%",
                  borderBottomWidth: 1,
                  borderColor: "#00000066",
                  marginLeft: 5,
                }}
              >
                <Text style={{ fontSize: 16 }}>{finalHourText}</Text>
              </TouchableOpacity>
              {showPicker && (
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
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="ios-notifications"
                  size={20}
                  color="#808080"
                  style={{ marginTop: 15 }}
                />
                <SelectList 
                    data={reminderValues}
                    setSelected={setSelectedReminder}
                    dropdownStyles={{ width: 150, backgroundColor: '#F6F6F6', borderWidth: 0}}
                    inputStyles={{fontSize: 16, textAlign:'left'}}
                    placeholder={selectedReminder}
                    search={false}
                    boxStyles={{width: 150,borderWidth: 0}}
                    defaultOption={{ key: 3, value: "1 dia antes" }}
                    maxHeight={150}
                />
              </View>
            </View>
            <View style={{ flex: 1 , flexDirection: 'row'}}>

              <Text style={{marginTop:10, fontSize:16}}>Todo el dia</Text>
              <Switch style={{marginLeft: 10, position: 'absolute', right: 0}}
                trackColor={{ false: "grey", true: "green" }}
                ios_backgroundColor={"grey"}
                thumbColor={isAllDay ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={setIsAllDay}
                value={isAllDay}
              
              />
              

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
            }}
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventModal;
