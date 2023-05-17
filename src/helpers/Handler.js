import { useState } from "react";
import moment from 'moment';
import { addDays, format, addHours } from 'date-fns';
import { useEffect } from "react";
 // Funcion para obtener las fechas
 const obtenerFechas = (startDate, lastDate, horaInicio, horaFin, setListaComponents) => {


    var ListaFechas = []; // Array para almacenar la lista fechas

    var fechaActual = startDate; // Fecha actual
    DaysList = [2, 3]; // Lista de dias de la semana
    while (fechaActual <= lastDate) {
        if (DaysList.includes(fechaActual.getDay())) {
          
            var fechas = []; // Array para almacenar las fechas
            var formato = format(fechaActual, 'yyyy-MM-dd');
            var dateTimeI = formato + " "+  moment(horaInicio, 'HH:mm').format('HH:mm');
            var dateTimeF = formato + " "+ moment(horaFin, 'HH:mm').format('HH:mm');

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


const Handler = ({ initialDate, finalDate, courseName, professorName, classroom, modalityType, initialHour, finalHour, selectDays, listaComponents, setListaComponents}) => {
    
    console.log("----------------------------------------Handler----------------------------------------");
    console.log("initialDate:" + initialDate);
    console.log("finalDate:" + finalDate);
    console.log("courseName:" + courseName);
    console.log("professorName:" + professorName);
    console.log("classroom:" + classroom);
    console.log("modalityType:" + modalityType);
    console.log("initialHour:" + initialHour);
    console.log("finalHour:" + finalHour);

    obtenerFechas(initialDate,finalDate,initialHour,finalHour, setListaComponents);
    

    return (
        console.log("---------------------------- Handler return ----------------------------")
    )

}

export default Handler;