import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { ConfirmDialog } from "react-native-simple-dialogs/dist";

export const Messages = () => {
const [dialogVisible, setDialogVisible] = useState(false);    
return(
    console.log('Estoy en Message'),
    <ConfirmDialog
    title="Consulta"
    message="Desea cambiar todos los eventos relacionados con el evento seleccionado?"
    visible={dialogVisible}
    onTouchOutside={() => setDialogVisible(false)}
    positiveButton={{
        title: "Aceptar",
        onPress: () => alert("Yes touched!")
    }}
    negativeButton={{
        title: "Rechazar",
        onPress: () => alert("No touched!")
    }}
/>
);
}
