import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
  } from "react-native";
  import { Dimensions } from "react-native";
  import moment from "moment";
  import React, { useState } from "react";
import EditActivityModal from "./EditActivityModal";
  const EditControls = ({event,listaComponents, setListaComponents, ultimoId, setUltimoId , ultimoIdRelacion, setUltimoIdRelacion,setTypeExitMessage,editRelationComponent,changeOpenEditModal,openEditModal}) => {
    const [modalityType, setModalityType] = useState(1);
    console.log("día del evento: "+ event.day)
    const WIDTH = Dimensions.get("window").width - 80;
    const HEIGHT = Dimensions.get("window").height - 150;
    const DAYS_OF_WEEK = [
        { id: 1, name: 'LUN', selected: false },
        { id: 2, name: 'MAR', selected: false },
        { id: 3, name: 'MIÉ', selected: false },
        { id: 4, name: 'JUE', selected: false },
        { id: 5, name: 'VIE', selected: false },
        { id: 6, name: 'SÁB', selected: false },
        { id: 7, name: 'DOM', selected: false }
    ];
    
    // Possible values for the modality type
    const modalityValues = [
        { key: 1, value: "Presencial" },
        { key: 2, value: "Virtual" },
        { key: 3, value: "Semipresencial" }
    ];
    return(
        event.type == "Actividad" ?(
            <EditActivityModal
            event = {event}
            changeOpenEditModal = {changeOpenEditModal}
            modalityValues={modalityValues}
            modalityType={modalityType}
            setModalityType={setModalityType}
            WIDTH={WIDTH}
            HEIGHT={HEIGHT}
            DAYS_OF_WEEK={DAYS_OF_WEEK}
            listaComponents={listaComponents}
            setListaComponents={setListaComponents}
            ultimoId={ultimoId}
            setUltimoId={setUltimoId}
            ultimoIdRelacion={ultimoIdRelacion}
            setUltimoIdRelacion={setUltimoIdRelacion}
            openEditModal = {openEditModal}
            setTypeExitMessage = {setTypeExitMessage}
            />
        ): console.log("Course")
    )

  };
  
  export default EditControls;