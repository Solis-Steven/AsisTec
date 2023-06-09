
import moment from "moment";
import { useState, useEffect, createContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [eventItems, setEventItems] = useState({"init": "init"});
    const [listaComponents, setListaComponents] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const getNotifications = () => {
        const currenDate = moment().format('YYYY-MM-DD');;

        const events = Object.entries(eventItems).map(([date, events]) => ({
            date,
            events
        }));
        const currentNotifications = events?.filter(
            event => event.date === currenDate
        );
    
        if(currentNotifications.length > 0) {
        
            setNotifications(currentNotifications);
        }
            
    }

    useEffect(() => {
        getNotifications();
    }, [eventItems]);



    return (

        <DataContext.Provider value={{ 
            eventItems, 
            setEventItems, 
            listaComponents, 
            setListaComponents,
            notifications }}>
            {children}
        </DataContext.Provider>
    );

};

export { DataProvider };
export default DataContext;