import { useState } from "react";
import moment from 'moment';

const Handler = (props) => {

    const [lastId, setLastId] = useState(0);
    const [event, setEvent] = useState({});
    const [eventsList, setEventsList] = useState([{
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
    },
    {
        id: 2,
        idRelational: 1,
        start: new Date(2023, 4, 24, 7, 0),
        end: new Date(2023, 4, 24, 11, 0),
        title: "Diseño de Software",
        description: "Presentación de nuevos productos",
        location: "Oficina principal",
        color: "#F44336",
        horaInicio: "10:00 AM",
        horaFin: "11:00 AM",
    },
    {
        id: 3,
        idRelational: 1,
        start: new Date(2023, 4, 31, 7, 0),
        end: new Date(2023, 4, 31, 11, 0),
        title: "Diseño de Software",
        description: "Presentación de nuevos productos",
        location: "Oficina principal",
        color: "#F44336",
        horaInicio: "10:00 AM",
        horaFin: "11:00 AM",
    },
    {
        id: 4,
        idRelational: 1,
        start: new Date(2023, 5, 7, 7, 0),
        end: new Date(2023, 5, 7, 11, 0),
        title: "Diseño de Software",
        description: "Presentación de nuevos productos",
        location: "Oficina principal",
        color: "#F44336",
        horaInicio: "10:00 AM",
        horaFin: "11:00 AM",
    },]);


    convertirAEventos(props.eventos, eventos);
    /*
    {
        id: 1,
        start: new Date(2023, 4, 17),
        end: new Date(2023, 5, 7),
        title: "Diseño de Software",
        description: "Presentación de nuevos productos",
        location: "Oficina principal",
        color: "#F44336",
        horaInicio: "10:00 AM",
        horaFin: "11:00 AM",
        dia: 3,
    },
    {
        id: 2,
        start: new Date(2023, 4, 16, 0, 0),
        end: new Date(2023, 5, 6, 0, 0),
        title: "Diseño de Software",
        description: "Presentación de nuevos productos",
        location: "Oficina principal",
        color: "#F44336",
        horaInicio: "10:00 AM",
        horaFin: "11:00 AM",
        },
    */


    // Funcion para obtener las fechas
    const obtenerFechas = (startDate, lastDate, DaysList, horaInicio, horaFin) => {
        // Definir las fechas de inicio y fin del rango
        var fechaInicio = moment(startDate).format('YYYY-MM-DD');
        var fechaFin = moment(lastDate).format('YYYY-MM-DD');

        var fechas = []; // Array para almacenar las fechas
        var ListaFechas = []; // Array para almacenar la lista fechas

        var fechaActual = moment(fechaInicio); // Fecha actual

        while (fechaActual.isSameOrBefore(fechaFin)) {
            if (DaysList.includes(fechaActual.day())) {

                var dateTimeI = moment(fechaActual + ' ' + horaInicio, 'DD/MM/YYYY HH:mm');
                var dateTimeF = moment(fechaActual + ' ' + horaFin, 'DD/MM/YYYY HH:mm');

                fechas.push(dateTimeI.format('YYYY-MM-DD hh:mm a')); // Agregar la fecha al array
                fechas.push(dateTimeF.format('YYYY-MM-DD hh:mm a')); // Agregar la fecha al array

                ListaFechas.push(fechas);
                fechas = [];
            }
            fechaActual.add(1, 'day');
        }
        return ListaFechas;
    }

    // crear un evento por cada fecha
    // agregar el evento a la lista de eventos
    // enviar la lista de eventos al componente de HorarioScreen
    // HorarioScreen recibe la lista de eventos y los muestra en el calendario

    const convertirAEventos = (listaEventos, eventos) => {

        for (let i = 0; i < listaEventos.length; i++) {



        }

        return eventos;
    }



    const buscarSiExiste = (id) => {

        for (let i = 0; i < props.events.length; i++) {
            if (props.events[i].id === id) {
                return true;
            }
        }

        return false;
    }


}

export default Handler;