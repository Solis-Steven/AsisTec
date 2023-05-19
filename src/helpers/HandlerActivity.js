import { useState } from "react";
import moment from 'moment';
import { addDays, format, addHours } from 'date-fns';
import { useEffect } from "react";
import { da } from "date-fns/locale";

const obtenerFechas = (startDate, lastDate, horaInicio, horaFin, Days) => {


    var ListaFechas = []; // Array para almacenar la lista fechas

    var fechaActual = startDate; // Fecha actual
    while (fechaActual <= lastDate) {
        if (Days.includes(fechaActual.getDay())) {

            var fechas = []; // Array para almacenar las fechas
            var formato = format(fechaActual, 'yyyy-MM-dd');
            var dateTimeI = formato + " " + moment(horaInicio, 'HH:mm').format('HH:mm');
            var dateTimeF = formato + " " + moment(horaFin, 'HH:mm').format('HH:mm');

            var dateObject1 = new Date(dateTimeI).toISOString();
            var dateObject2 = new Date(dateTimeF).toISOString();
            fechas.push(dateObject1); // Agregar la fecha al array
            fechas.push(dateObject2); // Agregar la fecha al array
            //
            ListaFechas.push(fechas);
        }
        fechaActual = addDays(fechaActual, 1);
    }

    return ListaFechas;

};

const verificarFechas = (ListaFechas, listaComponents) => {

    if (listaComponents.length == 0) {
        console.log("No hay componentes");
        return true;
    }
    else {
        listaComponents.forEach(componet => {

            for (let index = 0; index < ListaFechas.length; index++) {
                const element = ListaFechas[index]; // [fechaInicio, fechaFinal]
                // Verificar si ya existe
                if (componet.start == element[0] || componet.end == element[1]) {
                    console.log("Ya existe");
                    return false;
                }
            }
        }); console.log("No hay choque de horarios")
        return true;
    }

}
// Funcion para agregar el componente
const agregarComponente = (ListaFechas, listaComponents, setListaComponents, title, description,
    modalityType, ultimoId, setUltimoId, ultimoIdRelacion, setUltimoIdRelacion) => {

    // Obtener el ultimo id de la lista de componentes  
    var ultimoIdTemp = ultimoId;
    var ultimoIdRelacionTemp = ultimoIdRelacion + 1;

    lista = [];

    // Agregar el componente
    for (let index = 0; index < ListaFechas.length; index++) {
        const element = ListaFechas[index]; // [fechaInicio, fechaFinal] [fechaInicio, fechaFinal] 

        // de tipo clase 
        var componente = {
            id: ultimoIdTemp + 1,
            idRelacion: ultimoIdRelacionTemp,
            start: element[0],
            end: element[1],
            title: title,
            description: description,
            modalityType: modalityType,
            color: "#F44336",
            type: "Actividad",
        }
        ultimoIdTemp = ultimoIdTemp + 1;
        lista.push(componente);

    }

    // Actualizar el ultimo id de la lista de componentes
    setUltimoId(ultimoIdTemp);
    setUltimoIdRelacion(ultimoIdRelacionTemp);

    //lista.forEach(objeto => console.log(JSON.stringify(objeto)));
    setListaComponents(listaComponents.concat(lista));
    //listaComponents.forEach(objeto => console.log(JSON.stringify(objeto)));
    console.log("Componente agregado");
}

const HandlerActivity = ({ initialDate, finalDate, title, description,
    modalityType, initialHour, finalHour, Days, listaComponents,
    setListaComponents, ultimoId, setUltimoId, ultimoIdRelacion, setUltimoIdRelacion }) => {

    // Variables para obtener las fechas
    ListaFechas = obtenerFechas(initialDate, finalDate, initialHour, finalHour, Days);

    // Variable para verificar si ya existe la fecha en la lista de componentes
    var validacion = verificarFechas(ListaFechas, listaComponents);

    if (validacion) {
        agregarComponente(ListaFechas, listaComponents, setListaComponents, title, description,
            modalityType, ultimoId, setUltimoId, ultimoIdRelacion, setUltimoIdRelacion);
    } else {
        console.log("Choque de horarios");
    }

    return (
        console.log("HandlerActivity")
    );
}

export default HandlerActivity;