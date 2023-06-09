
import { useState, useEffect, createContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [eventItems, setEventItems] = useState({"init": "init"});
    const [listaComponents, setListaComponents] = useState([]);

    return (

        <DataContext.Provider value={{ eventItems, setEventItems, listaComponents, setListaComponents }}>
            {children}
        </DataContext.Provider>
    );

};

export { DataProvider };
export default DataContext;