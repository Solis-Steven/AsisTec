
import moment from "moment";
import { useState, useEffect, createContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [eventItems, setEventItems] = useState({"init": "init"});
    const [listaComponents, setListaComponents] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const getNotifications = () => {
        try {
            const currenDate = moment().format('YYYY-MM-DD');;
    
            const events = Object.entries(eventItems).map(([date, events]) => ({
                date,
                events
            }));
            const currentNotifications = events?.filter(
                event => event.date === currenDate || event.date < currenDate
            );
            
            if(currentNotifications.length > 0) {
            
                setNotifications(currentNotifications);
            } else {
                setNotifications({})
            }
        } catch (error) {
            console.log("Error getNotifications: ", error);
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