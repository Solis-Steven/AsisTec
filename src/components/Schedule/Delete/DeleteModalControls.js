import { set } from "date-fns";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
const Delete = (
  event,
  editRelationComponent,
  listaComponents,
  setListaComponents,
) => {
  if (!editRelationComponent) {
    const newListaComponents = listaComponents.filter(
      (component) => component.id !== event.id
    );
    setListaComponents([]);
    setListaComponents(newListaComponents);
    return true;
  } else {
    //obtener los componentes que no estan relacionados con el evento
    const newListaComponents = listaComponents.filter(
      (component) =>
        component.id !== event.id && component.id !== event.idRelation
    );
    setListaComponents([]);
    setListaComponents(newListaComponents);
    return true;
  }
};

export const DeleteModalControls = ({
  event,
  setTypeExitMessageDelete,
  editRelationComponent,
  listaComponents,
  setListaComponents,
  changeOpenDeletetModal,
  openDeleteModal,
}) => {
  const OnDeleteActivityorCourse = () => {
    setTypeExitMessageDelete(false);
    changeOpenDeletetModal();
   
  };

  const[valid, setValid] = React.useState(false);
  useEffect(() => {
      if(Delete(event, editRelationComponent, listaComponents, setListaComponents)){
        setValid(true);
      }

  }, [,valid]);
if(valid){
    return (

        <TouchableOpacity
        onPress={OnDeleteActivityorCourse}
        style={styles.createButton }
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Eliminado
        </Text>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  createButton: {
    backgroundColor: "#769ECB",
    margin: 5,
    padding: 15,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
  },
});
