
import React from "react";
import { ConfirmDialog } from "react-native-simple-dialogs/dist";
const Messages = ({
  changeModalVisible,
  EditMessageVisible,
  setEditRelationComponent,
  setTypeExitMessage,
}) => {
  return (
    <ConfirmDialog
      title="Confirmación"
      message="¿Desea modificar todos los eventos relacionados ?"
      visible={EditMessageVisible}
      onTouchOutside={() => {changeModalVisible(), setTypeExitMessage(false)}}
      positiveButton={{
        title: "SÍ",
        onPress: () => {
          
          setEditRelationComponent(true), changeModalVisible(), setTypeExitMessage(true) 
        },
      }}
      negativeButton={{
        title: "NO",
        onPress: () => {
          setEditRelationComponent(false), 
          changeModalVisible(), setTypeExitMessage(true)
        },
      }}
    />
  );
};

export default Messages;
