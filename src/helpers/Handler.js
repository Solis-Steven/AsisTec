import { useState } from "react";
import moment from 'moment';
import { addDays, format, addHours } from 'date-fns';
import { useEffect } from "react";

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

            var dateObject1 = new Date(dateTimeI).toLocaleString();
            var dateObject2 = new Date(dateTimeF).toLocaleString();
            fechas.push(dateObject1); // Agregar la fecha al array
            fechas.push(dateObject2); // Agregar la fecha al array
            //
            ListaFechas.push(fechas);
        }
        fechaActual = addDays(fechaActual, 1);
    }
    console.log(ListaFechas);
    setListaComponents(ListaFechas);

}

// Funcion para verificar si ya existe la fecha en la lista de componentes
const verificarFechas = (ListaFechas, setListaComponents,) => {

    setListaComponents.forEach(componet => {

        for (let index = 0; index < ListaFechas.length; index++) {
            const element = ListaFechas[index];

            // Verificar si ya existe
            if (componet.start == element[0] && componet.end == element[1]) {
                console.log("Ya existe");
                return false;
            } else if (componet.start == element[1] && componet.end == element[0]) {
                console.log("Ya existe");
                return false;
            }
        }

    });
    return true;
}

// Funcion para agregar el componente
// necesito saber cual es el ultimo id de la lista de componentes
const agregarComponente = (ListaFechas, setListaComponents) => {

    // Obtener el ultimo id de la lista de componentes
    var ultimoId = 0;
    var ultimoIdRelacion = 0;
    setListaComponents.forEach(componet => {
        if (componet.id > ultimoId) {
            ultimoId = componet.id;
            ultimoIdRelacion = componet.idRelational;
        }
    });

    lista = [];
    // Agregar el componente

    /*
        id: 1,
        idRelational: 1,
        start: new Date(2023, 4, 17, 7, 0),
        end: new Date(2023, 4, 17, 11, 0),
        title: "Diseño de Software",
        description: "Presentación de nuevos productos",
        location: "Oficina principal",
        color: "#F44336",
        horaInicio: "10:00 AM",
        horaFin: "11:00 AM",
    */
    for (let index = 0; index < ListaFechas.length; index++) {
        const element = ListaFechas[index];

        var componente = {
            id: ultimoId + 1,
            idRelational: ultimoIdRelacion,
            start: element[index][0],
            end: element[index][1],
            title: courseName,
            professorName: professorName,
            location: classroom,
            modalityType: modalityType,
            color: "#F44336", // Color por defecto se debe cambiar a un color aleatorio de una lista de colores     
        }
        lista.push(componente);
        ultimoId = ultimoId + 1;

    }

    setListaComponents.push(lista);
    console.log("Componente agregado");
}

const Handler = ({ initialDate, finalDate, courseName, professorName, classroom, modalityType, initialHour, finalHour, selectDays, listaComponents, setListaComponents }) => {


    // Variables para obtener las fechas
    ListaFechas = obtenerFechas(initialDate, finalDate, initialHour, finalHour, listaComponents);

    // Verificar si ya existe la fecha en la lista de componentes
    validacion = verificarFechas(ListaFechas, setListaComponents);

    // Si no hay choque de horarios entonces se agrega el componente
    if (validacion) {
        agregarComponente(ListaFechas, listaComponents, setListaComponents, courseName, professorName, classroom, modalityType);
    } else {
        console.log("Choque de horarios");
    }

    return (
        console.log("---------------------------- Handler return ----------------------------")
    )

}

export default Handler;