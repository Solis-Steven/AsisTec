import { useState } from "react";
import moment from 'moment';
import { addDays, format, addHours } from 'date-fns';
import { useEffect } from "react";
import { da } from "date-fns/locale";

// Funcion para obtener las fechas
const obtenerFechas = (startDate, lastDate, horaInicio, horaFin) => {


    var ListaFechas = []; // Array para almacenar la lista fechas

    var fechaActual = startDate; // Fecha actual
    DaysList = [2, 3]; // Lista de dias de la semana
    while (fechaActual <= lastDate) {
        if (DaysList.includes(fechaActual.getDay())) {

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
    // console.log(ListaFechas);

    return ListaFechas;

}

// Funcion para verificar si ya existe la fecha en la lista de componentes
const verificarFechas = (ListaFechas, listaComponents) => {

    if (listaComponents.length == 0) {
        console.log("No hay componentes");
        return true;

    }
    else {
        listaComponents.forEach(componet => {

            for (let index = 0; index < ListaFechas.length; index++) {
                const element = ListaFechas[index]; // [fechaInicio, fechaFinal]
                //console.log("firstDate: " + element[0] + " lastDate: " + element[1]);
                //console.log("start: " + new Date(componet.start).toLocaleString() + " end: " + new Date(componet.end).toLocaleString());
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
// necesito saber cual es el ultimo id de la lista de componentes
const agregarComponente = (ListaFechas, listaComponents, setListaComponents, courseName,
    professorName, classroom, modalityType, ultimoId, setUltimoId, ultimoIdRelacion, setUltimoIdRelacion) => {

    //console.log("ultimoId: " + ultimoId + " ultimoIdRelacion: " + ultimoIdRelacion);
    // Obtener el ultimo id de la lista de componentes  
    var ultimoIdTemp = ultimoId;
    var ultimoIdRelacionTemp = ultimoIdRelacion + 1;

    lista = [];

    // Agregar el componente
    for (let index = 0; index < ListaFechas.length; index++) {
        const element = ListaFechas[index]; // [fechaInicio, fechaFinal] [fechaInicio, fechaFinal] 

        // Dates
        //console.log("firstDate: " + element[0] + " lastDate: " + element[1]);
        

        // de tipo clase 
        var componente = {
            id: ultimoIdTemp + 1,
            idRelacion: ultimoIdRelacionTemp,
            start: element[0],
            end: element[1],
            title: courseName,
            professorName: professorName,
            location: classroom,
            modalityType: modalityType,
            type: "Clase",
            color: "#F44336", // Color por defecto se debe cambiar a un color aleatorio de una lista de colores     
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

const Handler = ({ initialDate, finalDate, courseName, professorName, classroom,
    modalityType, initialHour, finalHour, selectDays, listaComponents,
    setListaComponents, ultimoId, setUltimoId, ultimoIdRelacion, setUltimoIdRelacion }) => {


    // Variables para obtener las fechas
    ListaFechas = obtenerFechas(initialDate, finalDate, initialHour, finalHour);

    // Verificar si ya existe la fecha en la lista de componentes
    validacion = verificarFechas(ListaFechas, listaComponents, setListaComponents);

    // Si no hay choque de horarios entonces se agrega el componente
    if (validacion) {
        agregarComponente(ListaFechas, listaComponents, setListaComponents, courseName,
            professorName, classroom, modalityType, ultimoId, setUltimoId, ultimoIdRelacion, setUltimoIdRelacion);
    } else {
        console.log("Choque de horarios");
    }

    return (
        console.log("---------------------------- Handler return ----------------------------")
    )

}

export default Handler;