import { useState } from "react";
import moment from 'moment';
import { addDays, format, addHours } from 'date-fns';
 // Funcion para obtener las fechas
 const obtenerFechas = (startDate, lastDate, horaInicio, horaFin) => {

    // Definir las fechas de inicio y fin del rango
    var fechaInicio = moment(startDate).format('YYYY-MM-DD');
    var fechaFin = moment(lastDate).format('YYYY-MM-DD');
    console.log("fechaInicio: "+ fechaInicio)
    console.log("fechaFin: "+ fechaFin)
    // Definir las horas de inicio y fin del rango
    var horaInicioLocal = moment(horaInicio, 'HH:mm').format('HH:mm');
    var horaFinLocal = moment(horaFin, 'HH:mm').format('HH:mm');
    console.log("Hora Inicio: "+ horaInicioLocal)
    console.log("Hora Fin: "+horaFinLocal)

    var ListaFechas = []; // Array para almacenar la lista fechas

    var fechaActual = startDate; // Fecha actual
    DaysList = [2, 3]; // Lista de dias de la semana
    while (fechaActual <= lastDate) {
        if (DaysList.includes(fechaActual.getDay())) {
          
            var fechas = []; // Array para almacenar las fechas
            var formato = format(fechaActual, 'yyyy-MM-dd');
            var dateTimeI = formato + " "+ format(horaInicio, 'hh:mm');
            var dateTimeF = formato + " "+ format(horaFin, 'hh:mm');
            
            fechas.push(dateTimeI); // Agregar la fecha al array
            fechas.push(dateTimeF); // Agregar la fecha al array
            

            ListaFechas.push(fechas);
        }
         fechaActual = addDays(fechaActual, 1);
    }
    console.log(ListaFechas);
    return ListaFechas;

}


const Handler = ({ initialDate, finalDate, courseName, professorName, classroom, modalityType, initialHour, finalHour, selectDays }) => {
    
    console.log("----------------------------------------Handler----------------------------------------");
    console.log("initialDate:" + initialDate);
    console.log("finalDate:" + finalDate);
    console.log("courseName:" + courseName);
    console.log("professorName:" + professorName);
    console.log("classroom:" + classroom);
    console.log("modalityType:" + modalityType);
    console.log("initialHour:" + initialHour);
    console.log("finalHour:" + finalHour);
    obtenerFechas(initialDate,finalDate,initialHour,finalHour)


    return (
        
        console.log("---------------------------- Handler return ----------------------------")
    )

}

export default Handler;