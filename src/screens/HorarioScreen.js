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

import useData from "../hooks/useData";


MomentConfig.updateLocale("es", {
  // setting moment.js locale to Spanish
  weekdaysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
});

const HorarioScreen = () => {
  const {ultimoId, setUltimoId} = useData(0); // Ultimo id de la lista de componentes
  const {ultimoIdRelacion, setUltimoIdRelacion} = useData(0); // Ultimo id de la lista de componentes


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


  // Define state variables with their initial values
  const [viewMode, setViewMode] = useState("week");

  // Variables para obtener las fechas
  const {listaComponents, setListaComponents} = useData([]); // Array para almacenar la lista de componentes

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
    (

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

            setObjectEvento(event);
            changeEditMessageVisible();

          }}
          // Para eliminar un evento
          onLongPressEvent={(event) => {

            setObjectEvento(event);
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
  information: {
    backgroundColor: "#5B83B0",
    borderRadius: 30,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    left: 65,
    top: 4,
  },
});

export default HorarioScreen;
