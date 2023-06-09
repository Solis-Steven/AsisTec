import {
  View,
} from "react-native";

import React from "react";

import Dialog from "react-native-dialog";

const Messages = ({
  changeModalVisible,
  EditMessageVisible,
  setEditRelationComponent,
  setTypeExitMessage,
}) => {
  return (
    <View>
      <Dialog.Container visible={EditMessageVisible}>
        <Dialog.Title>Confirmación</Dialog.Title>
        <Dialog.Description>
          ¿Desea eliminar todos los eventos relacionados?
        </Dialog.Description>
        <Dialog.Button label="Cancelar" onPress={() => { changeModalVisible(), setTypeExitMessage(false) }} />
        <Dialog.Button label="SI" onPress={() => { setEditRelationComponent(true), changeModalVisible(), setTypeExitMessage(true) }} />
        <Dialog.Button label="NO" onPress={() => {
          setEditRelationComponent(false),
            changeModalVisible(), setTypeExitMessage(true)
        }} />
      </Dialog.Container>
    </View>
  );
};

export default Messages;
