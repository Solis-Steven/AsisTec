import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { TimelineCalendar, MomentConfig } from "@howljs/calendar-kit";
import Icon from "react-native-vector-icons/FontAwesome";

import WeekView from "../components/Schedule/WeekView";
import DayView from "../components/Schedule/DayView";
import ModalControls from "../components/Schedule/ModalControls";
import MessageEdit from "../components/Schedule/Edit/Message";
import MessageDelete from "../components/Schedule/Delete/Message";
import EditControls from "../components/Schedule/Edit/EditModalControls";
import { DeleteModalControls } from "../components/Schedule/Delete/DeleteModalControls";
import { de } from "date-fns/locale";

MomentConfig.updateLocale("es", {
  // setting moment.js locale to Spanish
  weekdaysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
});

const HorarioScreen = () => {
  const [ultimoId, setUltimoId] = useState(2); // Ultimo id de la lista de componentes
  const [ultimoIdRelacion, setUltimoIdRelacion] = useState(2); // Ultimo id de la lista de componentes
  const [isModalVisible, setIsModalVisible] = useState(false); //Al ser TRUE muestra el modal de agregar

  // Variables para mostrar el componente Message de editar
  const [EditMessageVisible, setEditMessageVisible] = useState(false); //Al ser TRUE muestra el componente Message de editar
  const [editRelationComponent, setEditRelationComponent] = useState(false); // Al SER TRUE Cambia todos los eventos relacionados al editar
  const [typeExitMessage, setTypeExitMessage] = useState(false); //Tipo de salida del Message de editar
  const [openEditModal, setOpenEditModal] = useState(false); //Abrir el modal de EDICIÓN
  // Variable para mostrar el componente Message de eliminar
  const [DeleteMessageVisible, setDeleteMessageVisible] = useState(false); //Al ser TRUE muestra el componente Message de eliminar
  const [deleteRelationComponent, setDeleteRelationComponent] = useState(false); // Al SER TRUE Cambia todos los eventos relacionados al eliminar
  const [typeExitMessageDelete, setTypeExitMessageDelete] = useState(false); //Tipo de salida del Message de eliminar
  const [objectEvento, setObjectEvento] = useState({}); //Objeto del evento seleccionado
  const [openDeleteModal, setOpenDeleteModal] = useState(false); //Abrir el modal de EDICIÓN

  const events = [
    {
      id: 1,
      idRelacion: 1,
      start: new Date(2023, 4, 17, 8, 30),
      end: new Date(2023, 4, 17, 11, 30),
      title: "Diseño de Software",
      professorName: "Juan Carlos Cubero",
      location: "Oficina principal",
      modalityType: "Virtual",
      color: "#F44336",
      type: "Clase",
      day: 3,
    },
    {
      id: 2,
      idRelacion: 2,
      start: new Date(2023, 4, 15, 7, 30),
      end: new Date(2023, 4, 15, 12, 30),
      title: "Salir a correr",
      description: "Cada dia a las 7:00 AM",
      modalityType: "Semipresencial",
      color: "#64B149",
      type: "Actividad",
      day: 1,
    },
  ];
  // Define state variables with their initial values
  const [viewMode, setViewMode] = useState("week");

  // Variables para obtener las fechas
  const [listaComponents, setListaComponents] = useState(events); // Array para almacenar la lista de componentes

  // Variable para actualizar la lista de componentes
  const [estado, setEstado] = useState(false); // Estado para actualizar la lista de componentes

  // Funciones para mostrar modals de: Agregar, Editar y Eliminar
  const changeModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Funciones para mostrar el componente Message de editar
  const changeEditMessageVisible = () => {
    setEditMessageVisible(!EditMessageVisible);
  };

  // Funciones para mostrar el componente Message de eliminar
  const changeDeleteMessageVisible = () => {
    setDeleteMessageVisible(!DeleteMessageVisible);
  };
  const changeOpenEditModal = () => {
    setOpenEditModal(!openEditModal);
  };
  const changeOpenDeletetModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  useEffect(() => {
    if (EditMessageVisible == false && typeExitMessage == true) {
      setOpenEditModal(true);
    } else {
      setOpenEditModal(false);
    }

    return () => {
      // Código para limpiar el efecto secundario (opcional)
    };
  }, [EditMessageVisible, typeExitMessage]);
  useEffect(() => {
    if (DeleteMessageVisible == false && typeExitMessageDelete == true) {
      setOpenDeleteModal(true);
    } else {
      setOpenDeleteModal(false);
    }

    return () => {
      // Código para limpiar el efecto secundario (opcional)
    };
  }, [DeleteMessageVisible, typeExitMessageDelete]);

  return (
    console.log("--LISTA COMPONENTES--"),
    listaComponents.forEach((objeto) => console.log(JSON.stringify(objeto))),
    console.log("---------------------"), 
    (
      /*  console.log("---------------------START-----------"),
    console.log("EditMessageVisible: " + EditMessageVisible),
    console.log("--------------------------------"),
    console.log("editRelationComponent: " + editRelationComponent),
    console.log("--------------------------------"),
    console.log("typeExitMessage:  " + typeExitMessage), */

      //console.log("---------------------START-----------"),
      //console.log("deleteRelationComponent: " + deleteRelationComponent),
      //console.log("DeleteMessageVisible: " + DeleteMessageVisible),
      //console.log("typeExitMessageDelete:  " + typeExitMessageDelete),

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Week view button */}
          <TouchableOpacity
            onPress={() => {
              setViewMode("week");
            }}
            style={{ ...styles.viewModeHeader, backgroundColor: "#C8D6B9" }}
          >
            <Text style={styles.viewModeText}>Semana</Text>
          </TouchableOpacity>

          {/* Day view button */}
          <TouchableOpacity
            onPress={() => {
              setViewMode("day");
            }}
            style={{ ...styles.viewModeHeader, backgroundColor: "#FAF3DD" }}
          >
            <Text style={styles.viewModeText}>Día</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <TimelineCalendar
          onPressEvent={(event) => {
            // se debe recibir el id del evento
            console.log("Evento presionado: " + event.id);

            setObjectEvento(event);
            //console.log("Evento presionado: " + JSON.stringify(event));
            // se debe abrir el modal con los datos del evento
            // se debe identificar si es un curso o una actividad
            // se debe actualizar el evento
            // se debe actualizar la lista de componentes
            changeEditMessageVisible();
          }}
          // Para eliminar un evento
          onLongPressEvent={(event) => {
            // se debe recibir el id del evento
            console.log("Evento presionado constantemente:  " + event.id);
            setObjectEvento(event);
            //console.log("Evento presionadoconstantemente: " + JSON.stringify(event));
            // Se debe buscar el evento en la lista de componentes
            // Se deben eliminar los eventos relacionados con el evento
            // se debe eliminar el evento de la lista de componentes
            // se debe actualizar la lista de componentes
            changeDeleteMessageVisible();
          }}
          events={listaComponents}
          renderEventContent={(event) => {
            return viewMode === "week" ? (
              <WeekView key={event.id} event={event} />
            ) : (
              <DayView key={event.id} event={event} />
            );
          }}
          viewMode={viewMode}
          allowPinchToZoom={true}
          allowDragToCreate={true}
          locale="es"
          theme={{
            cellBorderColor: "transparent",
            dayName: {
              color: "#8FC1A9",
            },
            todayName: {
              color: "#8FC1A9",
            },
            todayNumberContainer: {
              backgroundColor: "#8FC1A9",
              borderRadius: 8,
            },
            saturdayName: {
              color: "#8FC1A9",
            },
            sundayName: {
              color: "#8FC1A9",
            },
            dragHourContainer: {
              backgroundColor: "#000000",
            },
          }}
        />

        {/* Add button */}
        <TouchableOpacity onPress={changeModalVisible} style={styles.addCA}>
          <Icon name="plus" type="font-awesome" color="#ffffff" size={24} />
        </TouchableOpacity>

        {/* Add event modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={changeModalVisible}
        >
          <ModalControls
            changeModalVisible={changeModalVisible}
            listaComponents={listaComponents}
            setListaComponents={setListaComponents}
            ultimoId={ultimoId}
            setUltimoId={setUltimoId}
            ultimoIdRelacion={ultimoIdRelacion}
            setUltimoIdRelacion={setUltimoIdRelacion}
            isModalVisible={isModalVisible}
          />
        </Modal>
        {/* SHOW EDIT MESSAGE */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={EditMessageVisible}
          onRequestClose={changeEditMessageVisible}
        >
          <MessageEdit
            changeModalVisible={changeEditMessageVisible}
            EditMessageVisible={EditMessageVisible}
            setEditRelationComponent={setEditRelationComponent}
            setTypeExitMessage={setTypeExitMessage}
          />
        </Modal>

        {/* SHOW DELETE MESSAGE */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={DeleteMessageVisible}
          onRequestClose={changeDeleteMessageVisible}
        >
          <MessageDelete
            changeModalVisible={changeDeleteMessageVisible}
            EditMessageVisible={DeleteMessageVisible}
            setEditRelationComponent={setDeleteRelationComponent}
            setTypeExitMessage={setTypeExitMessageDelete}
          />
        </Modal>
        {/* SHOW EDIT MODAL */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={openEditModal}
          onRequestClose={changeOpenEditModal}
        >
          <EditControls
            event={objectEvento}
            setTypeExitMessage={setTypeExitMessage}
            editRelationComponent={editRelationComponent}
            listaComponents={listaComponents}
            setListaComponents={setListaComponents}
            changeOpenEditModal={changeOpenEditModal}
            openEditModal={openEditModal}
            ultimoId={ultimoId}
            setUltimoId={setUltimoId}
          />
        </Modal>
        {/* Handler DELETE  */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={openDeleteModal}
          onRequestClose={changeOpenDeletetModal}
        >
          <DeleteModalControls
            event={objectEvento}
            setTypeExitMessageDelete={setTypeExitMessageDelete}
            editRelationComponent={deleteRelationComponent}
            listaComponents={listaComponents}
            setListaComponents={setListaComponents}
            changeOpenDeletetModal={changeOpenDeletetModal}
            openDeleteModal={openDeleteModal}
          />
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFFFF", height: "100%" },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  viewModeHeader: { padding: 5, width: 100 },

  viewModeText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },

  addCA: {
    position: "absolute",
    backgroundColor: "#5B83B0",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 15,
    right: 15,
  },
});

export default HorarioScreen;
